import { useEffect } from "react"
import styled from "styled-components"
import Plyr from 'plyr';

const Container = styled.div``

const Caption = styled.div``


export default function Component({ data }) {

    return (
        <>
            <Container>
                <audio className='player' controls>
                    <source src={data.audioURL} type="audio/mp3"/>
                </audio>
            </Container>
            {
                data.caption && <span className="caption">{data.caption}</span>
            }
        </>
    )
}
