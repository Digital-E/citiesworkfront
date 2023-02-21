import { useEffect } from "react"
import styled from "styled-components"
import Plyr from 'plyr';


import Body from "../body"
import Image from "../image"
import Video from "../video"

const SliceWrapper = styled.div`
    margin: 0 0 30px 0;
`


let renderSlice = (slice ,index) => {
    
      switch(slice._type) {
          case 'video':
          return <SliceWrapper key={slice._key}><Video data={slice} id={`video-${index}`}/></SliceWrapper>
          case 'image':
          return <SliceWrapper key={slice._key} className="image-slice"><Image data={slice} hasCaption={true} /></SliceWrapper>
          case 'Text':
          return <SliceWrapper key={slice._key}><Body content={slice.text} /></SliceWrapper>
          default:
          return null
      }
}


export default function Component({ data }) {

    useEffect(() => {
        const players = Plyr.setup('.player');
    },[])

  return (data !== null && data !== undefined) ? data.map((slice, index) => renderSlice(slice, index)) : null
}
