import { useEffect, useRef, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Layout from '../components/layout'
import { SITE_NAME } from '../lib/constants'
import { homeQuery, previewHomeQuery, aboutQuery, previewAboutQuery, allProjectsQuery, previewAllProjectsQuery,menuQuery, footerQuery } from '../lib/queries'
import { getClient } from '../lib/sanity.server'

import { useMediaQuery } from 'react-responsive';

import { motion } from 'framer-motion'

import styled from 'styled-components'

import Body from "../components/body"

import Grid from "../components/home/grid"

const Container = styled(motion.div)`
    position: fixed;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    height: auto;
    z-index: 2;

    a {
      text-decoration: none;
    }

    @media(min-width: 990px) {
      height: 100vh;
      // background: white;
    }
`

const ContainerInner = styled.div`
  width: 100%;

  @media(max-width: 989px) {
    position: fixed;
    height: calc(100% - 230px) !important;
    width: calc(100% - 60px) !important;
    top: 90px !important;
    left: 50% !important;
    transform: translateX(-50%)!important;
    z-index: 999;
    background: white;
    box-sizing: border-box;
    pointer-events: all; 
    border-radius: 20px;
    border: 1px solid black;  
    flex-direction: column;
    overflow: scroll;
  }
`


const Columns = styled.div`
    position: relative;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    box-sizing: border-box;

    > div:nth-child(1) {
      flex-basis: 20%;
    }

    > div:nth-child(2) {
      display: flex;
      text-align: center;
      justify-content: center;
      flex-basis: 60%;
    }

    > div:nth-child(3) {
      flex-basis: 20%;
      align-self: flex-start;
    }

    > div:nth-child(3) > div {
      width: fit-content;
      margin-left: auto;
      margin-right: 80px;
    }

    > div > div > *:nth-child(1) {
      margin-top: 0 !important;
    }

    @media(max-width: 989px) {
      flex-direction: column;

      > div:nth-child(1) {
        flex-basis: auto;
      }

      > div:nth-child(2) {
        flex-direction: column;
        flex-basis: auto;
        margin-left: 0;
        width: 100%;
      }

      > div:nth-child(2) {
        margin-left: 0;
        text-align: left;
      }

      > div:nth-child(3) {
        margin-top: 50px;
        position: relative;
        right: auto;
      }

      padding: 20px;
    }

    @media(max-width: 1350px) {
      > div:nth-child(1) {
        flex-basis: 0;
      }

      > div:nth-child(2) {
        flex-basis: 75%;
      }

      > div:nth-child(3) {
        flex-basis: 25%;
      }
    }

    @media(min-width: 990px) {
      > div:nth-child(2) > div > *:not(p) {
        display: none;
      }

      > div:nth-child(2) > *:nth-child(2) {
        margin-top: 0 !important;
      }

      > div:nth-child(2) > * {
        width: 80%;
      }
    }

    @media(max-width: 989px) {
      h5 {
        font-size: 2rem;
      }
    }
`;

const GridWrapper = styled.div`

    > div > div {
      filter: blur(5px)
    }

    @media(max-width: 989px) {
      display: none;
    }
`

const CloseButton = styled.div`
    position: absolute;
    right: 31px;
    top: 41px;
    font-family: "Picnic Regular";
    cursor: pointer;
    transition: 0.2s;
    z-index: 999;

    :hover {
        transform: scale(1.1);
    }

    img {
        width: 30px;
    }

    @media(min-width: 990px) {
      display: none;
    }
`

let Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  opacity: 0;
  height: 100vh !important;
  width: 100vw !important;
  z-index: 1;
  transform: none !important;
  pointer-events: all;
  backdrop-filter: blur(2px);

  @media(min-width: 990px) {
    backdrop-filter: blur(20px);
  }
`



export default function About({ data = {}, preview }) {

  const isDesktop = useMediaQuery({
    query: '(min-width: 990px)'
  })

  const router = useRouter()

  let containerRef = useRef();

  let [reveal, setReveal] = useState(false);


  const slug = data?.aboutData?.slug

  if (!router.isFallback && !slug) {
    return <ErrorPage statusCode={404} />
  }

  let preventDefaultClick = (e) => {
      e.preventDefault()
      hasClicked();
  }

  useEffect(() => {
    setReveal(true)

    setTimeout(() => {
      document.querySelector(".filter").classList.add("hide-filter")
    }, 100)

    document.querySelector(".home-button").children[0].children[0].addEventListener("click", preventDefaultClick)

    return () => {
      document.querySelector(".filter").classList.remove("hide-filter")
      document.querySelector(".home-button").children[0].children[0].removeEventListener("click", preventDefaultClick)
    }
  }, []);

  

  let hasClicked = () => {
      setReveal(false)

      setTimeout(() => {
          router.push("/")
      }, 1000)
  } 
  
  let overlayVariants = {
    visible: {
      opacity: 1,
      display: "block",
      transition: {
        duration: 0.3
      },
    },
    hidden: {
      opacity: 0,
      transition: {
        duration: 1
      },
      transitionEnd: {
        display: "none",
      },
    }
  }  

  let variants = {
      open: {
        opacity: 1,
        display: 'flex',
        transition: {
            duration: 1
        }
      },
      closed: {
        opacity: 0,
        transition: {
            duration: 0.3
        },
      }
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
        <Container ref={containerRef} initial="closed" animate={reveal ? "open" : "closed"} variants={variants}>
            <CloseButton onClick={() => hasClicked()}><img src="/icons/close.svg" /></CloseButton>
            <ContainerInner>
              <GridWrapper>
                <Grid />
              </GridWrapper>
              <Columns>
                <div></div>
                <div>
                  <div>
                    <Body content={data?.aboutData?.textcolumnone} />
                  </div>
                </div>
                <div>
                  <div><Body content={data?.aboutData?.textcolumntwo} /></div>
                </div>
              </Columns>
            </ContainerInner>
        </Container>
        <Overlay animate={reveal ? "visible" : "hidden"} variants={overlayVariants} onClick={() => hasClicked()}/>
      </Layout>
    </>
  )
}

export async function getStaticProps({ preview = false, params }) {

  let slug = `about`

  let homeData = await getClient(preview).fetch(homeQuery)

  let aboutData = await getClient(preview).fetch(aboutQuery, {
    slug: slug,
  })

  let allProjectsData = await getClient(preview).fetch(allProjectsQuery)

  if(preview) {
    homeData = await getClient(preview).fetch(previewHomeQuery) 

    aboutData = await getClient(preview).fetch(previewAboutQuery, {
      slug: slug,
    })

    allProjectsData = await getClient(preview).fetch(previewAllProjectsQuery)
  }

  // Get Menu And Footer

  const menuData = await getClient(preview).fetch(menuQuery);

  const footerData = await getClient(preview).fetch(footerQuery);

  return {
    props: {
      preview,
      data: {
        homeData,
        aboutData,
        allProjectsData,
        menuData,
        footerData
      }
    }
  }
}
