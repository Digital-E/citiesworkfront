import { useEffect, useRef, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { useMediaQuery } from 'react-responsive';

import styled from "styled-components"

import { store } from '../../store'

import { motion } from 'framer-motion'

import Slices from '../../components/slices'


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
    // justify-content: center;
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
            margin: -10px;
            height: 0;
            overflow: hidden;
        }
    }
`

const SlicesWrapper = styled.div`
    @media(max-width: 989px) {
        margin-top: 50px !important;
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

  let isInViewportArray = [];

  let prevScroll = 0;

export default ({ preview, data }) => {
    //Context
    const context = useContext(store);
    const { state, dispatch } = context;

    let colLeftRef = useRef();
    let mediaContainerRef = useRef();
    let colRightRef = useRef();
    let nameAndTitleRef = useRef();
    let slicesWrapperRef = useRef();
    let currentMediaIndex = useRef(-1);

    const isDesktop = useMediaQuery({
        query: '(min-width: 990px)'
    })

    let router = useRouter();

    let containerRef = useRef();

    let [reveal, setReveal] = useState(false);

    let isInViewport = (item, index, direction) => {

        if(item.getBoundingClientRect().y < window.innerHeight && item.getBoundingClientRect().y > 0)  {

            if(!isInViewportArray.includes(index)) {
                if(direction === "up") {
                    isInViewportArray.unshift(index)
                } else {
                    isInViewportArray.push(index)
                }
            }

        } else {
            if(isInViewportArray.includes(index)) {
                let position = isInViewportArray.indexOf(index)
                isInViewportArray.splice(position, 1)
            }
        }

        Array.from(colLeftRef.current.children[0].children).forEach(item => {
            item.classList.remove('show-media-slice')
        })

        if(colRightRef.current.scrollTop >= colRightRef.current.scrollHeight - window.innerHeight) {
            let hasMoreThanOneElementInArray = isInViewportArray.length > 1

            if(hasMoreThanOneElementInArray) {
                colLeftRef.current.children[0].children[isInViewportArray[1]]?.classList.add('show-media-slice')
            } else {
                colLeftRef.current.children[0].children[isInViewportArray[0]]?.classList.add('show-media-slice')
            }
            
        } else {
            colLeftRef.current.children[0].children[isInViewportArray[0]]?.classList.add('show-media-slice')
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

        }, 10)

        colRightRef.current.addEventListener('scroll', () => {
            let scrollDirection = colRightRef.current.scrollTop - prevScroll < 0 ? "up" : "down"
            document.querySelectorAll('.media-slice').forEach((item, index) => isInViewport(item, index, scrollDirection))
            prevScroll = colRightRef.current.scrollTop
        })

    }, [])

    let resize = () => {
        if(window.innerWidth > 989) {
            setTimeout(() => {
                let nameAndTitleHeight = nameAndTitleRef.current.getBoundingClientRect().height

                mediaContainerRef.current.style.marginTop = `${nameAndTitleHeight + 70}px`
    
            }, 10)
        }
    }

    useEffect(() => {
        resize();

        window.addEventListener('resize', resize)

        return () => {
            window.removeEventListener('resize', resize)
        }
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
                        <MediaContainer ref={mediaContainerRef}>
                            <Slices data={ data?.slices } />
                        </MediaContainer>
                    </ColLeft>
                    <ColRight ref={colRightRef}>
                        <div>
                            <div ref={nameAndTitleRef}>
                                <Name>{ data?.name }</Name>
                                <Title>{ data?.title }</Title>
                            </div>
                            <SlicesWrapper ref={slicesWrapperRef}>
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