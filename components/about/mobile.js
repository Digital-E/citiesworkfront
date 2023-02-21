import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import styled from 'styled-components'


const Container = styled(motion.div)`
    position: fixed;
    height: calc(100% - 230px) !important;
    width: calc(100% - 60px) !important;
    top: 90px !important;
    left: 50% !important;
    transform: translateX(-50%)!important;
    z-index: 999;
    box-sizing: border-box;
    pointer-events: all;

    background: white;
    border-radius: 20px;
    border: 1px solid black;
    padding: 20px;

    @media(min-width: 990px) {
        display: none !important;
    }
`

const CloseButton = styled.div`
    position: absolute;
    right: 0;
    top: -50px;
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
`

let variants = {
    open: {
        opacity: 1,
        display: 'block',
        transition: {
            duration: 0.3
        }
    },
    closed: {
        opacity: 0,
        transition: {
            duration: 0.3
        },
        transitionEnd: {
            display: 'none',
        },
    }
}


const Component = ({ }) => {
    let [island, setIsland] = useState({});
    let [reveal, setReveal] = useState(false)

    return (
        <Container initial="closed" animate={reveal ? "open" : "closed"} variants={variants}>
            <CloseButton onClick={() => closeAll()}><img src="/icons/close.svg" /></CloseButton>
        </Container>
    )
}

export default Component
