
import styled from "styled-components"


const Container = styled.div`
    position: fixed;
    height: 100vh;
    width: 100vw;
    max-width: 1800px;
    z-index: -1;
    top: 50%;
    left: 50%;  
    transform: translate(-50%, -50%);
    box-sizing: border-box;
    padding: 180px 20px 80px 20px;
`

const Grid = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    > div {
        position: relative;
        width: 100%;
        height: fit-content;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }

    > div > div > div {
        width: 40px;
        height: 40px;
        background: black;
        border-radius: 999px;
    }

    > div:last-child {
        display: none;
    }

    @media(max-width: 989px) {
        > div > div:nth-child(even) {
            display: none;
        }

        > div > div > div {
            width: 20px;
            height: 20px;
        }


        > div:last-child {
            display: flex;
        }        
    }
`



export default ({ data }) => {


    return (
        <Container>
            <Grid>
                <div>
                    <div><div></div></div>
                    <div><div></div></div>
                    <div><div></div></div>
                    <div><div></div></div>
                    <div><div></div></div>
                </div>
                <div>
                    <div><div></div></div>
                    <div><div></div></div>
                    <div><div></div></div>
                    <div><div></div></div>
                    <div><div></div></div>
                </div>
                <div>
                    <div><div></div></div>
                    <div><div></div></div>
                    <div><div></div></div>
                    <div><div></div></div>
                    <div><div></div></div>
                </div>
                <div>
                    <div><div></div></div>
                    <div><div></div></div>
                    <div><div></div></div>
                    <div><div></div></div>
                    <div><div></div></div>
                </div>
            </Grid>
        </Container>
    )
}