import { useEffect, useRef, useState } from "react"
import styled from "styled-components"

let WaveSurfer = null;

if(typeof window !== "undefined") {
    WaveSurfer = require("wavesurfer.js")
}


const Container = styled.div`

@media(max-width: 989px) {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;

    > div:first-child {
        flex-basis: 15%;
    }
    
    > div:nth-child(2) {
        flex-basis: 85%;
    }
    
    > div:last-child {
        flex-basis: 100%;
    }
}
`

const ContainerInner = styled.div`
    cursor: none;
`

const Cursor = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 80px;
    z-index: 999;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.3s;

    &.show {
        opacity: 1;
    }

    @media(max-width: 989px) {
        position: relative;
        opacity: 1;
        left: 0 !important;
        top: 0 !important;
        pointer-events: all;
    }
`


export default function Component({ data }) {
    let containerRef = useRef()
    let cursorRef = useRef()
    let hasInteracted = useRef(false)
    let [isPlaying, setIsPlaying] = useState(false)
    let isPlayingRef = useRef(false)
    let wavesurfer = null;

    useEffect(() => {
        wavesurfer = WaveSurfer.create({
            container: containerRef.current,
            waveColor: 'gray',
            progressColor: 'black',
            // Set a bar width
            barWidth: 2,
            // Optionally, specify the spacing between bars
            barGap: 1,
            // And the bar radius
            barRadius: 2,            
          })

          wavesurfer.load(data.audioURL);
          
          wavesurfer.on('seek', () => {

            if(window.innerWidth < 990) {
                setIsPlaying(true)
                isPlayingRef.current = true
                return wavesurfer.play()
            }

            if(!isPlayingRef.current) {
                wavesurfer.play()
            } else {
                wavesurfer.pause()
            }

            setIsPlaying(!isPlayingRef.current)
            isPlayingRef.current = !isPlayingRef.current
          })

          containerRef.current.addEventListener('mousemove', audioMouseMove)
          containerRef.current.addEventListener('mouseenter', audioMouseEnter)
          containerRef.current.addEventListener('mouseleave', audioMouseLeave)

          cursorRef.current.addEventListener('click', buttonClick)

          return () => {
            wavesurfer.destroy()
          }
    }, [])

    function buttonClick(e) {
        if(!isPlayingRef.current) {
            wavesurfer.play()
        } else {
            wavesurfer.pause()
        }

        setIsPlaying(!isPlayingRef.current)
        isPlayingRef.current = !isPlayingRef.current
    }

    function audioMouseMove(e) {
        cursorRef.current.style.left = `${e.clientX - 40}px`
        cursorRef.current.style.top = `${e.clientY - 40}px`
    }

    function audioMouseEnter(e) {
        cursorRef.current.classList.add('show')
    }

    function audioMouseLeave(e) {
        cursorRef.current.classList.remove('show')
    }

    return (
        <Container>
            <Cursor ref={cursorRef}>
                {isPlaying ?
                <img src='/icons/audio-pause.svg'/>
                :
                <img src='/icons/audio-play.svg'/>
                }
            </Cursor>
            <ContainerInner id='waveform' ref={containerRef}></ContainerInner>
            {
                data.caption && <span className="caption">{data.caption}</span>
            }
        </Container>
    )
}
