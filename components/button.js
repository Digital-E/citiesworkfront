import styled from "styled-components"
import { motion } from "framer-motion"


const Container = styled(motion.div)`
    border: 1px solid black;
    border-radius: 999px;
    background: white;
    transition: background 0.2s;

    // :hover {
    //     background: black;
    //     transition: background 0.2s;
    // }

    // :hover a {
    //     color: white;
    //     transition: color 0.2s;
    // }

    > a {
        position: relative;
        top: -2px;
        display: block;
        color: black;
        font-family: Picnic Regular;
        font-size: 2rem;
        text-decoration: none;
        line-height: 0.8;
        transition: color 0.2s;
        padding: 0.5rem 0.5rem;
        margin: 0;
    }
`


export default function Component ({ children }) {
    return (
        <Container whileHover={{scale: 1.05}}>
            {children}
        </Container>
    )
}