import { useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Layout from '../../../../components/layout'
import { SITE_NAME } from '../../../../lib/constants'
import { artistsQuery, allArtistsQuery, previewArtistsQuery, yearsQuery, menuQuery, footerQuery } from '../../../../lib/queries'
import { getClient } from '../../../../lib/sanity.server'
import styled from 'styled-components'

import Link from "../../../../components/link"

import Filter from "../../../../components/archive/filter"

const Container = styled.div`
`

const List = styled.div`
  display: flex;
  flex-direction: row;

  @media(max-width: 989px) {
    flex-direction: column;
  }
`

const ListItem = styled.div`
  p {
    margin: 5px 0;
  }
`

const Letter = styled.div`
  p {
    font-size: 12vw !important;
    line-height: 1;
  }

  margin-bottom: 30px;
`

const ListElement = styled.div`
  margin-bottom: 50px;
`

let currOrderLetter = "";

const Col = styled.div`
  :nth-child(1), :nth-child(2) {
    flex-basis: 35%;
  }
`;



export default function ArtistPage({ data = {}, preview }) {

  let [list, setList] = useState([])

  const router = useRouter()

  const slug = data?.artistsData?.slug


  if (!router.isFallback && !slug) {
    return <ErrorPage statusCode={404} />
  }

  useEffect(() => {

    if(data?.allArtistsData?.length === 0) return

    data = data?.allArtistsData?.filter(item => item.slug !== null)

    let sort = data?.sort((a, b) => {
      let aName = ""
      let bName = ""

      if(a.orderByLetter !== null) {
        aName = a.orderByLetter.toUpperCase() 
      } else if (a.title.split(" ")[1] !== undefined) {
        aName = a.title.split(" ")[1]
      } else {
        aName = a.title
      }

      if(b.orderByLetter !== null) {
        bName = b.orderByLetter.toUpperCase() 
      } else if(b.title.split(" ")[1] !== undefined) {
        bName = b.title.split(" ")[1]
      } else {
        bName = b.title
      }

      return aName.localeCompare(bName)
    })


    let listWithOrderLetter = sort.map(item => {
      let newItem = item

      if(item.orderByLetter !== null) {
        newItem.orderLetter = item.orderByLetter.toUpperCase() 
      } else if(item.title.split(" ")[1] !== undefined) {
        newItem.orderLetter = item.title.split(" ")[1].split("")[0]
      } else {
        newItem.orderLetter = item.title.split("")[0]
      }

      return newItem
    })

    currOrderLetter = listWithOrderLetter[0].orderLetter

    let listSortedByLetter = [];

    let letter = {
      letter: '',
      artists: []
    }

    listWithOrderLetter.forEach((item, index) => {

      if(currOrderLetter.toLowerCase() === item.orderLetter.toLowerCase()) {
        letter.letter = item.orderLetter
        letter.artists.push(item)

      } else {
        currOrderLetter = item.orderLetter
        listSortedByLetter.push(letter)

        letter = {
          letter: '',
          artists: [],
        }

        letter.letter = item.orderLetter
        letter.artists.push(item)
      }

      if(index === listWithOrderLetter.length - 1) {
        listSortedByLetter.push(letter)
      }
    })

    
    let listSortedByCol = [];

    let listCol = [];

    let elemsPerCol = Math.ceil(listSortedByLetter.length / 3)

    listSortedByLetter.forEach((item, index) => {
      listCol.push(item)

      if(index % elemsPerCol === elemsPerCol - 1) {
        listSortedByCol.push(listCol)
        listCol = [];
      }

      if(index === listSortedByLetter.length - 1) {
        listSortedByCol.push(listCol)
      }
    })

    setList(listSortedByCol)

  }, []);

  return (
    <>
      <Layout preview={preview}>
        <Head>
          <title>{data?.artistsData?.title} | { SITE_NAME }</title>
          <meta
          name="description"
          content={data?.artistsData?.content}
          />
        </Head>
        <Container>
            <Filter data={data?.yearData} />
            <List>
              {list?.map(item =>
                <Col>
                  {item?.map(item => 
                      <ListElement>
                        <Letter><p>{item.letter}</p></Letter>
                        {item.artists?.map(item => <ListItem><Link href={item.slug}><p>{item.title}</p></Link></ListItem>)}
                      </ListElement>
                  )}
                </Col>
              )}
            </List>
        </Container>
      </Layout>
    </>
  )
}

export async function getStaticProps({ preview = false, params }) {

  let slug = `${params.lang}__archive__artists`

  let yearsSlug = `${params.lang}__archive__years`

  let artistsData = await getClient(preview).fetch(artistsQuery, {
    slug: slug,
  })

  let yearData = await getClient(preview).fetch(yearsQuery, {
    slug: yearsSlug,
  })

  if(preview) {
    artistsData = await getClient(preview).fetch(previewArtistsQuery, {
      slug: slug,
    })
  }


  const allArtistsData = await getClient(preview).fetch(allArtistsQuery, {
    lang: params.lang,
  })

  // Get Menu And Footer

  const menuData = await getClient(preview).fetch(menuQuery, {
    lang: params.lang
  });

  const footerData = await getClient(preview).fetch(footerQuery, {
    lang: params.lang
  });

  return {
    props: {
      preview,
      data: {
        artistsData,
        allArtistsData,
        yearData,
        menuData,
        footerData
      }
    }
  }
}

export async function getStaticPaths() {
  const paths = ['de', 'fr', 'it', 'en'];

  return {
    paths: paths.map((lang) => ({ params: { lang } })),
    fallback: false,
  }
}
