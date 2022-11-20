import { useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Layout from '../components/layout'
import { SITE_NAME } from '../lib/constants'
import { aboutQuery, previewAboutQuery, menuQuery, footerQuery } from '../lib/queries'
import { getClient } from '../lib/sanity.server'

import styled from 'styled-components'

import Body from "../components/body"

const Container = styled.div`
    display: flex;

    @media(max-width: 989px) {
        flex-direction: column;
    }
`

const Col = styled.div`
    padding: 20px;

    :nth-child(1) {
        flex-basis: 35%;
        padding-left: 0;
    }

    :nth-child(2) {
        flex-basis: 35%;
        padding-left: 0;
    }

    > div {
        width: 80%;
    }

    :nth-child(3) {
        flex-basis: 30%;
    }

    @media(max-width: 989px) {
        > div {
            width: 100%;
        }

        :nth-child(3) {
            margin-left: 0;
            padding-left: 0;
        }
    }
`

export default function About({ data = {}, preview }) {

  const router = useRouter()

  const slug = data?.aboutData?.slug

  if (!router.isFallback && !slug) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <>
      <Layout preview={preview}>
        <Head>
          <title>{data?.aboutData?.title} | { SITE_NAME }</title>
          <meta
          name="description"
          content={data?.aboutData?.content}
          />
        </Head>
        <Container>
            <Col>
                <div>
                    <Body content={data?.aboutData?.textcolumnone} />
                </div>
            </Col>
            <Col>
                <div>
                    <Body content={data?.aboutData?.textcolumntwo} />
                </div>
            </Col>
            <Col>
                <div>
                    <Body content={data?.aboutData?.textcolumnthree} />
                </div>
            </Col>
        </Container>
      </Layout>
    </>
  )
}

export async function getStaticProps({ preview = false, params }) {

  let slug = `about`

  let aboutData = await getClient(preview).fetch(aboutQuery, {
    slug: slug,
  })

  if(preview) {
    aboutData = await getClient(preview).fetch(previewAboutQuery, {
      slug: slug,
    })
  }

  // Get Menu And Footer

  const menuData = await getClient(preview).fetch(menuQuery);

  const footerData = await getClient(preview).fetch(footerQuery);

  return {
    props: {
      preview,
      data: {
        aboutData,
        menuData,
        footerData
      }
    }
  }
}
