import { useEffect } from "react"
import styled from "styled-components"
import Plyr from 'plyr';

import Image from "../image"
import Video from "../video"

let Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin: 0 -10px;

    @media(max-width: 989px) {
        margin: 0;
    }
`

const Media = styled.div`
    padding: 10px;
    flex-basis: 50%;

    @media(max-width: 989px) {
        padding: 10px 0;
        flex-basis: 100%;
    }

    &#image > div {
        padding-top: 66%;
    }

    // &#video > div {
    //     padding-top: 66%;
    // }

    &#image img {
        object-fit: cover;
    }

    &#image > div > div:nth-child(1) {
        padding-top: initial !important;
    }
    

`



export default function Component ({ data }) {

    useEffect(() => {
        const players = Plyr.setup('.player', {
            controls: ['play', 'progress', 'mute']
        });
        
    },[])

    let renderSlice = (item,index) => {
        switch(item._type) {
            case 'video':
            return <Media id='video'><Video data={item} id={`video-${index}`} /></Media>
            case 'image':
            return <Media id='image'><Image data={item} hasCaption={true} /></Media>
        }    
    }

    return (
        <Container>
            {
                data?.map((item, index) => {
                    return renderSlice(item, index)
                })
            }
        </Container>       
    )
}