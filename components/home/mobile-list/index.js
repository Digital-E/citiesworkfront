import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import styled from 'styled-components'

import List from './list'

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

    @media(min-width: 990px) {
        display: none !important;
    }
`

const InnerContainer = styled.div`
    overflow: scroll;
    height: 100%;

    > div:nth-child(2) {
        padding: 0 20px 20px 20px;
    }
`


const Title = styled.h3`
    margin-bottom: 20px;
    padding: 20px 20px 0 20px;

    @media(max-width: 989px) {
        font-size: 2rem;
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


const Component = ({ dataAll, allProjects, closeAll }) => {
    let [island, setIsland] = useState({});
    let [reveal, setReveal] = useState(false)

    useEffect(() => {
        
        let copyAll = JSON.parse(JSON.stringify(dataAll))

        let openIsland = copyAll.filter(item => item.isOpen === true)

        if(openIsland.length > 0) {
            setReveal(true)
            // document.querySelector(".filter").classList.add("hide-filter")
        } else {
            setReveal(false)
            // document.querySelector(".filter").classList.remove("hide-filter")
        }
    
        if(island === undefined) {
            setIsland(openIsland[0])
        } else {
            setTimeout(() => {
                setIsland(openIsland[0])
            }, 300)
        }

    }, [dataAll])

    return (
        <Container initial="closed" animate={reveal ? "open" : "closed"} variants={variants}>
            <CloseButton onClick={() => closeAll()}><img src="/icons/close.svg" /></CloseButton>
            <InnerContainer>
                <Title>{island?.title}</Title>
                <List data={island} allProjects={allProjects} />
            </InnerContainer>
        </Container>
    )
}

export default Component
