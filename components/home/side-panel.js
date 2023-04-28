import { useEffect, useRef, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { useMediaQuery } from 'react-responsive';

import styled from "styled-components"

import { store } from '../../store'

import { motion } from 'framer-motion'

import Slices from '../../components/slices'
import { clone } from 'lodash';


const Container = styled(motion.div)`
    position: fixed;
    height: 100%;
    width: calc(100% - 220px);
    right: 0;
    z-index: 999;
    background: white;


    @media(max-width: 989px) {
        height: fit-content;
        width: fit-content;
        background: transparent;
    }
`

const CloseButton = styled.div`
    position: absolute;
    right: 30px;
    top: 40px;
    font-family: "Picnic Regular";
    cursor: pointer;
    transition: 0.2s;
    z-index: 999;

    :hover {
        transform: scale(1.1);
    }

    img {
        width: 43px;
    }

    @media(max-width: 989px) {
        right: 31px;
        top: 41px;

        img {
            width: 30px;
        }
    }
`

let Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh !important;
  width: 100vw !important;
  z-index: 1;
  transform: none !important;
  pointer-events: all;
`

const Name = styled.h1`
    margin-bottom: 0px;

    @media(max-width: 989px) {
        font-size: 2rem;
    }
`

const Title = styled.h1`
    margin-bottom: 30px;
    margin-left: 30px;

    @media(max-width: 989px) {
        font-size: 2rem;
        margin-bottom: 15px;
    }
`


let ContainerInner = styled.div`
    display: flex;
    height: 100%;
    width: 100%;
    background: white;

    > div {
        flex-basis: 50%;
    }

    > div > h1 {
        padding-right: 50px;
    }

    @media(max-width: 989px) {
        position: fixed;
        height: calc(100% - 230px) !important;
        width: calc(100% - 60px) !important;
        top: 90px !important;
        left: 50% !important;
        transform: translateX(-50%)!important;
        z-index: 999;
        box-sizing: border-box;
        pointer-events: all; 
        border-radius: 20px;
        border: 1px solid black;  
        flex-direction: column;

        > div {
            flex-basis: 100%;
            padding: 30px 10px;
        }
    }
`

const ColLeft = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    overflow: scroll;
    padding-left: 30px;

    @media(max-width: 989px) {
        display: none;
    }
`

const ColRight = styled.div`
    overflow: scroll;
    padding: 30px 30px;

    > div {
        padding-bottom: 30px;
    }

    @media(min-width: 989px) {
        .media-slice {
            height: 0;
            overflow: hidden;
        }
    }
`

const SlicesWrapper = styled.div`
    @media(min-width: 990px) {
        margin-top: 150px;
    }
`

const MediaContainer = styled.div`
    > div {
        display: none;
    }

    .show-media-slice {
        display: block !important;
    }
`


let overlayVariants = {
    "visible": {
      opacity: 1,
      display: "block",
    },
    "hidden": {
      opacity: 0,
      transitionEnd: {
        display: "none",
      },
    }
  }


export default ({ preview, data }) => {
    //Context
    const context = useContext(store);
    const { state, dispatch } = context;

    let colLeftRef = useRef();
    let colRightRef = useRef();
    let currentMediaIndex = useRef(-1);

    const isDesktop = useMediaQuery({
        query: '(min-width: 990px)'
    })

    let router = useRouter();

    let containerRef = useRef();

    let [reveal, setReveal] = useState(false);

    let isInViewport = (item, index) => {

        if(item.getBoundingClientRect().y < window.innerHeight / 2 && item.getBoundingClientRect().y > 0)  {

            if(index !== currentMediaIndex.current) {
                Array.from(colLeftRef.current.children[0].children).forEach(item => {
                    item.classList.remove('show-media-slice')
                })
                // let cloneNode = item.cloneNode(true)
                // cloneNode.classList.remove('media-slice')
                // colLeftRef.current.children[0].appendChild(cloneNode)
                colLeftRef.current.children[0].children[index].classList.add('show-media-slice')
                currentMediaIndex.current = index
            }
        }
    }

    useEffect(() => {
        setReveal(true)

        setTimeout(() => {
            Array.from(colLeftRef.current.children[0].children).forEach((item, index) => {
                if(!item.classList.contains('media-slice')) {
                    colLeftRef.current.children[0].removeChild(item)
                }

                item.classList.remove('media-slice')
            })

            document.querySelectorAll('.media-slice').forEach((item, index) => isInViewport(item, index))
        }, 0)

        colRightRef.current.addEventListener('scroll', () => {
            document.querySelectorAll('.media-slice').forEach((item, index) => isInViewport(item, index))
        })

    }, [])

    let hasClicked = () => {
        setReveal(false)

        setTimeout(() => {
            router.push("/")
        }, 300)
    }

    let variants = {
        open: {
            right: 0,
            opacity: 1,
            transition: {
                duration: 0.3
            }
        },
        closed: {
            right: isDesktop ? "-100%" : 0,
            opacity: isDesktop ? 1 : 0,
            transition: {
                duration: 0.3
            }
        }
    }


    return (
        <>
            <Container ref={containerRef} initial="closed" animate={reveal ? "open" : "closed"} variants={variants}>
                <CloseButton onClick={() => hasClicked()}><img src="/icons/close.svg" /></CloseButton>
                <ContainerInner>
                    <ColLeft ref={colLeftRef}>
                        <MediaContainer>
                            <Slices data={ data?.slices } />
                        </MediaContainer>
                    </ColLeft>
                    <ColRight ref={colRightRef}>
                        <div>
                            <Name>{ data?.name }</Name>
                            <Title>{ data?.title }</Title>
                            <SlicesWrapper>
                                <Slices data={ data?.slices } />
                            </SlicesWrapper>
                        </div>
                    </ColRight>
                </ContainerInner>
            </Container>
            <Overlay animate={reveal ? "visible" : "hidden"} variants={overlayVariants} onClick={() => hasClicked()}/>
        </>
    )
}