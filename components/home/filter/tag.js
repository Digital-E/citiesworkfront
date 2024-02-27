import { useEffect, useState } from 'react';
import { motion } from 'framer-motion'

import styled from 'styled-components'

const Container = styled(motion.div)`
    position: relative;
    border: 1px solid black;
    border-radius: 0.8em;
    background: white;
    transition: background 0.2s;
    width: fit-content;
    margin: 0.3rem;
    cursor: pointer;

    :hover {
        background: var(--light-gray);
    }

    &.is--active {
        background: var(--gray);
    }

    &.is--hidden {
        display: none;
    }

    > span {
        position: relative;
        display: block;
        color: black;
        font-family: FluxischElse Light;
        font-size: 1.22rem;
        text-decoration: none;
        line-height: 1;
        padding: 0.5rem 0.5rem;
        margin: 0;
    }

    @media(max-width: 989px) {
        > span {
            font-size: 0.9rem;
        }
    }
`

let variants = {
    'open': {
        opacity: 1,
        y: 0
    },
    'closed': {
        opacity: 0,
        y: 10,
        transition: {
            opacity: {
                duration: 1
            },
            y: {
                duration: 1.2
            }
        }
    }
}

export default function Component({ data, index, selectTag, children, isClear, clearAll, showClear }) {


    return (
            isClear ?
            <Container className={showClear ? 'is--active' : ''} onClick={() => clearAll()} variants={variants}><span>{ children }</span></Container>
            :
            <Container className={data.isDisplayed ? (data.isActive ? 'is--active' : '') : 'is--hidden'} onClick={() => selectTag(index)} variants={variants}><span>{ data.label }</span></Container>
    )
}