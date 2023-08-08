import { useEffect } from "react"
import styled from "styled-components"
import Plyr from 'plyr';


import Body from "../body"
import Image from "../image"
import Video from "../video"
import Audio from "./audio"

const SliceWrapper = styled.div`
    margin: 0 0 30px 0;
`


let renderSlice = (slice ,index) => {
    
      switch(slice._type) {
          case 'video':
          return <SliceWrapper key={slice._key} className='media-slice'><Video data={slice} id={`video-${index}`}/></SliceWrapper>
          case 'image':
          return <SliceWrapper key={slice._key} className='media-slice'><Image data={slice} hasCaption={true} /></SliceWrapper>
          case 'Text':
          return <SliceWrapper key={slice._key}><Body content={slice.text} /></SliceWrapper>
          case 'audio':
          return <SliceWrapper key={slice._key}><Audio data={slice} /></SliceWrapper>          
          default:
          return null
      }
}


export default function Component({ data }) {


    useEffect(() => {
        setTimeout(() => {
            const players = Plyr.setup('.player');
        }, 0)
    },[])

  return (data !== null && data !== undefined) ? data.map((slice, index) => renderSlice(slice, index)) : null
}
