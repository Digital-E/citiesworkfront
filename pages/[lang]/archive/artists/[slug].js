import Head from 'next/head'
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Header from '../../../../components/header'
import Layout from '../../../../components/layout'
import { SITE_NAME } from '../../../../lib/constants'
import { artistSlugsQuery, artistQuery, previewArtistQuery, menuQuery, footerQuery } from '../../../../lib/queries'
import { sanityClient, getClient } from '../../../../lib/sanity.server'

import styled from "styled-components"

import splitSlug from "../../../../lib/splitSlug"

import Body from '../../../../components/body'

import MediaGrid from '../../../../components/archive/media-grid'

const Title = styled.div`

  span {
    font-size: 10vw;
    line-height: 0.9;
  }
`

const Cols = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 50px;

  div:empty {
    display: none;
  }

  @media(max-width: 989px) {
    flex-direction: column;
  }
`


const ColOne = styled.div`
  display: flex;
  flex-basis: 50%;


  > div {
    padding: 0 20px 0 0;
    margin-top: 50px;
  }
`;

const ColTwo = styled.div`
  display: flex;
  flex-basis: 50%;


  > div {
    padding: 0 20px 0 0;
    margin-top: 50px;
  }
`;



export default function Component({ data = {}, preview }) {
  const router = useRouter()

  const slug = data?.data?.slug


  if (!router.isFallback && !slug) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <Layout preview={preview}>
        <Header />
        {router.isFallback ? (
          <div>Loading…</div>
        ) : (
          <>
              <Head>
                <title>
                  {data.data.title} | {SITE_NAME}
                </title>
                <meta
                  name="description"
                  content={data.data.content}
                />
              </Head>
              <Title><span>{data.data.title}</span></Title>
              <Cols>
                <ColOne>
                  <div><Body content={data.data.textFieldOne} /></div>
                </ColOne>
                <ColTwo>
                  <div><Body content={data.data.textFieldTwo} /></div>
                </ColTwo>
              </Cols>
              <MediaGrid data={data.data.images} />
          </>
        )}
    </Layout>
  )
}

export async function getStaticProps({ params, preview = false }) {

  let slug = `${params.lang}__archive__artists__${params.slug}`

  let data = await getClient(preview).fetch(artistQuery, {
    slug: slug,
  })

  if(preview) {
    data = await getClient(preview).fetch(previewArtistQuery, {
      slug: slug,
    })
  }

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
        data,
        menuData,
        footerData
      },
    },
  }
}

export async function getStaticPaths() {
  const paths = await sanityClient.fetch(artistSlugsQuery)

  
  return {
    paths: paths.map((slug) => ({ params: { lang: splitSlug(slug, 0), slug: splitSlug(slug, 3) } })),
    fallback: false,
  }
}
