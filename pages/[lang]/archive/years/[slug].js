import Head from 'next/head'
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Header from '../../../../components/header'
import Layout from '../../../../components/layout'
import { SITE_NAME } from '../../../../lib/constants'
import { yearSlugsQuery, yearQuery, previewYearQuery, menuQuery, footerQuery } from '../../../../lib/queries'
import { sanityClient, getClient } from '../../../../lib/sanity.server'

import styled from "styled-components"

import splitSlug from "../../../../lib/splitSlug"

import Body from '../../../../components/body'

import MediaGrid from '../../../../components/archive/media-grid'

const Year = styled.div`
  text-align: center;

  span {
    font-size: 40vw;
    line-height: 0.6;
  }
`

const RowOne = styled.div`
  display: flex;
  margin-top: 50px;

  > div {
    padding: 0 20px 0 0;
  }

  > div:nth-child(1) {
    flex-basis: 35%;
  }

  > div:nth-child(2) {
    flex-basis: 35%;
  }

  > div:nth-child(3) {
    flex-basis: 30%;
  }

  @media(max-width: 989px) {
    flex-direction: column;
  }
`;

const RowTwo = styled.div`
  display: flex;
  margin-top: 50px;

  > div {
    padding: 0 20px 0 0;
  }

  > div:nth-child(1) {
    flex-basis: 35%;
  }

  > div:nth-child(2) {
    flex-basis: 65%;
  }

  @media(max-width: 989px) {
    flex-direction: column;
  }
`;

const RowThree = styled.div``




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
              <Year><span>{data.data.title}</span></Year>
              <RowOne>
                <div><Body content={data.data.textFieldOne} /></div>
                <div><Body content={data.data.textFieldTwo} /></div>
                <div><Body content={data.data.textFieldThree} /></div>
              </RowOne>
              <RowTwo>
                <div><Body content={data.data.textFieldFour} /></div>
                <div><Body content={data.data.textFieldFive} /></div>
              </RowTwo>
              <RowThree>
                <MediaGrid data={data.data.images} />
              </RowThree>
          </>
        )}
    </Layout>
  )
}

export async function getStaticProps({ params, preview = false }) {

  let slug = `${params.lang}__archive__years__${params.slug}`

  let data = await getClient(preview).fetch(yearQuery, {
    slug: slug,
  })

  if(preview) {
    data = await getClient(preview).fetch(previewYearQuery, {
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
  const paths = await sanityClient.fetch(yearSlugsQuery)

  
  return {
    paths: paths.map((slug) => ({ params: { lang: splitSlug(slug, 0), slug: splitSlug(slug, 3) } })),
    fallback: false,
  }
}
