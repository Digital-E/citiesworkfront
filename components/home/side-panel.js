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
    width: 90%;
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
    }
`


let ContainerInner = styled.div`
    height: 100%;
    overflow: scroll;
    background: white;

    > div {
        padding: 30px 140px;
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
        overflow: scroll;

        > div {
            padding: 30px 10px;
        }
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

    const isDesktop = useMediaQuery({
        query: '(min-width: 990px)'
    })

    let router = useRouter();

    let containerRef = useRef();

    let [reveal, setReveal] = useState(false);


    useEffect(() => {
        setReveal(true)
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
            opacity: isDesktop ? 1 : 1,
            transition: {
                duration: 0.3
            }
        },
        closed: {
            right: isDesktop ? "-90%" : 0,
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
                    <div>
                        <Name>{ data?.name }</Name>
                        <Title>{ data?.title }</Title>
                        <Slices data={ data?.slices } />
                    </div>
                </ContainerInner>
            </Container>
            <Overlay animate={reveal ? "visible" : "hidden"} variants={overlayVariants} onClick={() => hasClicked()}/>
        </>
    )
}