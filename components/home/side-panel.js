import { useEffect, useRef, useState, useContext } from 'react';

import styled from "styled-components"

import { store } from '../../store'

import { motion } from 'framer-motion'

const Container = styled(motion.div)`
    position: fixed;
    height: 100%;
    width: 45%;
    right: 0;
    z-index: 999;
    background: white;
`

const CloseButton = styled.div`
    position: absolute;
    right: 30px;
    top: 30px;
    font-family: "Picnic Regular";
    cursor: pointer;
    transition: 0.2s;

    :hover {
        transform: scale(1.1);
    }

    img {
        width: 30px;
    }
`

let Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh !important;
  width: 100vw !important;
//   backdrop-filter: blur(1px);
  z-index: 1;
  transform: none !important;
  pointer-events: all;
`


let variants = {
    open: {
        right: 0,
        transition: {
            duration: 0.5
        }
    },
    closed: {
        right: "-45%",
        transition: {
            duration: 0.5
        }
    }
}

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


export default ({ data, toggleDrawer }) => {
    //Context
    const context = useContext(store);
    const { state, dispatch } = context; 

    let containerRef = useRef();

    let [reveal, setReveal] = useState(false);

    useEffect(() => {
        if(state.sidepanelOpen) {
            setReveal(true)

        } else {
            setReveal(false)    
        }
    }, [state])

    let hasClicked = () => {
        dispatch({type: "sidepanel open", value: false})
    }


    return (
        <>
            <Container ref={containerRef} initial="closed" animate={reveal ? "open" : "closed"} variants={variants}>
                <CloseButton onClick={() => hasClicked()}><img src="icons/close.svg" /></CloseButton>
            </Container>
            <Overlay animate={reveal ? "visible" : "hidden"} variants={overlayVariants} onClick={() => hasClicked()}/>
        </>
    )
}