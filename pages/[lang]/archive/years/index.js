import { useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Layout from '../../../../components/layout'
import { SITE_NAME } from '../../../../lib/constants'
import { yearsQuery, previewYearsQuery, menuQuery, footerQuery } from '../../../../lib/queries'
import { getClient } from '../../../../lib/sanity.server'
import styled from 'styled-components'

import Link from "../../../../components/link"

import Filter from "../../../../components/archive/filter"

const Container = styled.div`
`

const Years = styled.div`
    display: flex;
    flex-wrap: wrap;
`

const Year = styled.div`
    display: flex;
    justify-content: flex-start;

    :nth-child(3n + 1) {
        flex-basis: 35%;
    }

    :nth-child(3n + 2) {
        flex-basis: 35%;
    }

    p {
        font-size: 12vw !important;
        line-height: 1;
    }
`


export default function YearPage({ data = {}, preview }) {

  const router = useRouter()

  const slug = data?.yearData?.slug

  if (!router.isFallback && !slug) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <>
      <Layout preview={preview}>
        <Head>
          <title>{data?.yearData?.title} | { SITE_NAME }</title>
          <meta
          name="description"
          content={data?.yearData?.content}
          />
        </Head>
        <Container>
            <Filter data={data?.yearData} />
            <Years>
                {data.yearData.slices?.map(item => <Year><Link href={`/${router.query.lang}/archive/years/${item}`}><p>{item}</p></Link></Year>)}
            </Years>
        </Container>
      </Layout>
    </>
  )
}

export async function getStaticProps({ preview = false, params }) {

  let slug = `${params.lang}__archive__years`

  let yearData = await getClient(preview).fetch(yearsQuery, {
    slug: slug,
  })

  if(preview) {
    yearData = await getClient(preview).fetch(previewYearsQuery, {
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
