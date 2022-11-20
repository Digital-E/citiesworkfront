import { useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Layout from '../../components/layout'
import { SITE_NAME } from '../../lib/constants'
import { homeQuery, previewHomeQuery, menuQuery, footerQuery } from '../../lib/queries'
import { getClient, overlayDrafts } from '../../lib/sanity.server'


// Components
import Overlay from "../../components/home/background-dots"
import Carousel from "../../components/home/carousel"
import DrawingTool from "../../components/home/drawing-tool"


export default function Index({ data = {}, preview }) {

  const router = useRouter()

  const slug = data?.homeData?.slug

  if (!router.isFallback && !slug) {
    return <ErrorPage statusCode={404} />
  }

  useEffect(() => {

    document.querySelector("body").classList.add("body-lock");

    return () => {
      document.querySelector("body").classList.remove("body-lock");
    }

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
        <Overlay />
        <Carousel data={data?.homeData} />
        <DrawingTool preview={preview} />
      </Layout>
    </>
  )
}

export async function getStaticProps({ preview = false, params }) {


  let slug = params.lang

  let homeData = await getClient(preview).fetch(homeQuery, {
    slug: slug,
  })

  if(preview) {
    homeData = await getClient(preview).fetch(previewHomeQuery, {
      slug: slug,
    }) 
  }


  // Get Menu And Footer

  const menuData = await getClient(preview).fetch(menuQuery, {
    lang: params.lang
  });

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

export async function getStaticPaths() {
  const paths = ['de', 'fr', 'it', 'en'];

  return {
    paths: paths.map((lang) => ({ params: { lang } })),
    fallback: false,
  }
}
