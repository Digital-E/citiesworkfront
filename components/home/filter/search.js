import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

import styled from 'styled-components'

const Container = styled.div`
    margin: 0 0 10px auto;
    width: fit-content;

    input {
        border-radius: 0.8em;
        border: 1px solid black;
        font-family: FluxischElse Light;
        padding: 0.5rem;
        font-size: 1.22rem;
        outline: none !important;
    }

    input::placeholder {
        font-family: FluxischElse Light;
        font-size: 1.22rem;
        color: black;
    }

    @media(max-width: 989px) {
        margin: 0 0 10px 35px;

        input, input::placeholder {
            font-size: 0.9rem;
        }
    }
`

let variants = {
    'open': {
        opacity: 1,
        transition: {
            staggerChildren: 0.05,
            staggerDirection: -1
        }
    },
    'closed': {
        opacity: 0,
    }
}



export default function Component({ data, onChange }) {



    
    return (
        <Container>
            <input
                placeholder='Search...' 
                onChange={(e) => onChange(e)}
            />
        </Container>
        )
}