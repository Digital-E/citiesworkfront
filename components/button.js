import styled from "styled-components"

const Container = styled.div`
    border: 1px solid black;
    border-radius: 999px;
    padding: 0.3rem 0.5rem;
    background: white;

    > a {
        color: black;
        font-family: Picnic Regular;
        font-size: 2rem;
        text-decoration: none;
        line-height: 0.8;
    }
`


export default function Component ({ children }) {
    return (
        <Container>
            { children }
        </Container>
    )
}