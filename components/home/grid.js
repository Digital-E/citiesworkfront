
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
    border: 1px solid black;
`

const Grid = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;

    img {
        position: absolute;
        object-fit: cover;
        height: 100%;
        width: 100%;
    }

    @media(max-width: 989px) {
      
    }
`

const GridInner = styled.div`
    position: absolute;
    height: 2000px;
    width: 2000px;
    object-fit: cover;
`


const Columns = styled.div`
    position: absolute;
    top: -10px;
    left: 0;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    height: 100%;
    width: 100%;

    > div {
        position: relative;
        height: 100%;
        width: calc(100% / 10);
        overflow: hidden;
    }

    > div > div {
        position: relative;
        height: 100%;
        width: 1px;
        overflow: hidden;
    }

    svg {
        height: 100%;
    }
`

const Rows = styled.div`
    position: absolute;
    top: 0;
    left: -10px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: columns;
    justify-content: space-around;
    align-items: space-around;
    height: 100%;
    width: 100%;

    > div {
        position: relative;
        width: calc(100% / 10);
        width: 100%;
        overflow: hidden;
    }

    > div > div {
        position: relative;
        height: 1px;
        width: 100%;
        overflow: hidden;
    }

    svg {
        width: 100%;
    }
`

let strokedasharray = "1 1"


export default ({ data }) => {


    return (
        <>
        <Grid>
            <img src="/images/grid.svg"/>
        </Grid>
        {/* <Grid>
            <GridInner>
                <Columns>
                    <div>
                        <div>
                            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                <line x1="0" y1="0" x2="0" y2="100" stroke="black" stroke-dasharray={strokedasharray} />
                            </svg>                    
                        </div>
                    </div>
                    <div>
                        <div>
                            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                <line x1="0" y1="0" x2="0" y2="100" stroke="black" stroke-dasharray={strokedasharray} />
                            </svg>                    
                        </div>
                    </div>
                    <div>
                        <div>
                            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                <line x1="0" y1="0" x2="0" y2="100" stroke="black" stroke-dasharray={strokedasharray} />
                            </svg>                    
                        </div>
                    </div>
                    <div>
                        <div>
                            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                <line x1="0" y1="0" x2="0" y2="100" stroke="black" stroke-dasharray={strokedasharray} />
                            </svg>                    
                        </div>
                    </div>
                    <div>
                        <div>
                            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                <line x1="0" y1="0" x2="0" y2="100" stroke="black" stroke-dasharray={strokedasharray} />
                            </svg>                    
                        </div>
                    </div>
                    <div>
                        <div>
                            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                <line x1="0" y1="0" x2="0" y2="100" stroke="black" stroke-dasharray={strokedasharray} />
                            </svg>                    
                        </div>
                    </div>
                    <div>
                        <div>
                            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                <line x1="0" y1="0" x2="0" y2="100" stroke="black" stroke-dasharray={strokedasharray} />
                            </svg>                    
                        </div>
                    </div>
                    <div>
                        <div>
                            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                <line x1="0" y1="0" x2="0" y2="100" stroke="black" stroke-dasharray={strokedasharray} />
                            </svg>                    
                        </div>
                    </div>
                    <div>
                        <div>
                            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                <line x1="0" y1="0" x2="0" y2="100" stroke="black" stroke-dasharray={strokedasharray} />
                            </svg>                    
                        </div>
                    </div>
                    <div>
                        <div>
                            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                <line x1="0" y1="0" x2="0" y2="100" stroke="black" stroke-dasharray={strokedasharray} />
                            </svg>                    
                        </div>
                    </div>
                </Columns>
                <Rows>
                    <div>
                        <div>
                            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                <line x1="0" y1="0" x2="100" y2="0" stroke="black" stroke-dasharray={strokedasharray} />
                            </svg>                    
                        </div>
                    </div>
                    <div>
                        <div>
                            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                <line x1="0" y1="0" x2="100" y2="0" stroke="black" stroke-dasharray={strokedasharray} />
                            </svg>                    
                        </div>
                    </div>                
                    <div>
                        <div>
                            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                <line x1="0" y1="0" x2="100" y2="0" stroke="black" stroke-dasharray={strokedasharray} />
                            </svg>                    
                        </div>
                    </div>                
                    <div>
                        <div>
                            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                <line x1="0" y1="0" x2="100" y2="0" stroke="black" stroke-dasharray={strokedasharray} />
                            </svg>                    
                        </div>
                    </div>                
                    <div>
                        <div>
                            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                <line x1="0" y1="0" x2="100" y2="0" stroke="black" stroke-dasharray={strokedasharray} />
                            </svg>                    
                        </div>
                    </div>                
                    <div>
                        <div>
                            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                <line x1="0" y1="0" x2="100" y2="0" stroke="black" stroke-dasharray={strokedasharray} />
                            </svg>                    
                        </div>
                    </div>                
                    <div>
                        <div>
                            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                <line x1="0" y1="0" x2="100" y2="0" stroke="black" stroke-dasharray={strokedasharray} />
                            </svg>                    
                        </div>
                    </div>                
                    <div>
                        <div>
                            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                <line x1="0" y1="0" x2="100" y2="0" stroke="black" stroke-dasharray={strokedasharray} />
                            </svg>                    
                        </div>
                    </div>                
                    <div>
                        <div>
                            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                <line x1="0" y1="0" x2="100" y2="0" stroke="black" stroke-dasharray={strokedasharray} />
                            </svg>                    
                        </div>
                    </div>                
                    <div>
                        <div>
                            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                <line x1="0" y1="0" x2="100" y2="0" stroke="black" stroke-dasharray={strokedasharray} />
                            </svg>                    
                        </div>
                    </div>             
                </Rows>
            </GridInner>
        </Grid>         */}
        <Container>
        </Container>
        </>
    )
}