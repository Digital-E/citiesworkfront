import { useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import styled from 'styled-components'
import Layout from '../components/layout'
import { SITE_NAME } from '../lib/constants'
import { homeQuery, previewHomeQuery, menuQuery, footerQuery } from '../lib/queries'
import { getClient } from '../lib/sanity.server'

import Grid from '../components/home/grid'
import Islands from '../components/home/islands/islands'

import Filter from '../components/home/filter'
import Key from '../components/home/key'
import SidePanel from '../components/home/side-panel'

const Container = styled.div`
  position: relative;
  height: 100vh;
`

let tags = [
  'Audio',
  'Text',
  'Video',
  'Climate',
  'Environment',
  'London',
]

let key = [
  'MA Cities',
  'Staff Projects',
  'Research',
  'Partnerships',
  'Network',
]

export default function Index({ data = {}, preview }) {

  const router = useRouter()

  const slug = data?.homeData?.slug

  if (!router.isFallback && !slug) {
    return <ErrorPage statusCode={404} />
  }

  useEffect(() => {

    // document.querySelector("body").classList.add("body-lock");

    // return () => {
    //   document.querySelector("body").classList.remove("body-lock");
    // }

  }, []);



  return (
    <>
      <Layout preview={preview}>
        <Head>
          <title>{data?.homeData?.title} | { SITE_NAME }</title>
          <meta
          name="description"
          content={data?.homeData?.content}
          />
        </Head>
        <Container>
            {/* <Key data={ key } /> */}
            <Filter data={ tags } />
            <Grid />
            <Islands />
            <SidePanel  />
        </Container>
      </Layout>
    </>
  )
}

export async function getStaticProps({ preview = false, params }) {

  let homeData = await getClient(preview).fetch(homeQuery)

  if(preview) {
    homeData = await getClient(preview).fetch(previewHomeQuery, {
      slug: slug,
    }) 
  }


  // Get Menu And Footer

  const menuData = await getClient(preview).fetch(menuQuery);

  // const footerData = await getClient(preview).fetch(footerQuery, {
  //   lang: params.lang
  // });

  return {
    props: {
      preview,
      data: {
        homeData,
        menuData,
        // footerData
      }
    }
  }
}

