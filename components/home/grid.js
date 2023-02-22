
import styled from "styled-components"


const Container = styled.div`
    position: fixed;
    height: calc(100% - 40px);
    width: calc(100% - 20px);
    // max-width: 1800px;
    z-index: -1;
    top: 10px;
    left: 10px; 
    box-sizing: border-box;
    padding: 10px;
`

const Grid = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;

    img {
        position: absolute;
        object-fit: cover;
        height: 100%;
        width: 100%;
    }

    @media(max-width: 989px) {
      
    }
`


export default ({ data }) => {


    return (
        <div>
            <Grid>
                <img src="/images/grid2.svg"/>
            </Grid>
            <Container>
            </Container>
        </div>
    )
}