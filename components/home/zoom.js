import { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'

import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);


const Container = styled.div`
  position: fixed;
  height: 100vh;
  width: 100vw;
  left: 0;
  top: 0;
  overflow: hidden;
`

const Image = styled.div`
  position: absolute;
  display: flex;
  left: 50%;
  top: 50%;

  img {
    width: 100%;
  }
`

let images = [
  {
    url: "images/A.svg",
    initCoords: {
      x: 0,
      y: -100,
      xDir: "-",
      yDir: "+",
      height: 0,
      width: 0,
    },
    coords: {
      x: 0,
      y: 0,
      height: 0,
      width: 0,
    }
  },
  {
    url: "images/B.svg",
    initCoords: {
      x: -50,
      y: -50,
      xDir: "+",
      yDir: "+",
      height: 0,
      width: 0,
    },
    coords: {
      x: 0,
      y: 0,
      height: 0,
      width: 0,
    }
  },
  {
    url: "images/C.svg",
    initCoords: {
      x: -100,
      y: -100,
      xDir: "+",
      yDir: "+",
      height: 0,
      width: 0,
    },
    coords: {
      x: 0,
      y: 0,
      height: 0,
      width: 0,
    }
  },
  {
    url: "images/D.svg",
    initCoords: {
      x: 20,
      y: -20,
      xDir: "-",
      yDir: "-",
      height: 0,
      width: 0,
    },
    coords: {
      x: 0,
      y: 0,
      height: 0,
      width: 0,
    }
  },
  {
    url: "images/E.svg",
    initCoords: {
      x: -70,
      y: -10,
      xDir: "+",
      yDir: "-",
      height: 0,
      width: 0,
    },
    coords: {
      x: 0,
      y: 0,
      height: 0,
      width: 0,
    }
  }
]



export default function Component() {
  let [all, setAll] = useState([]);
  let containerRef = useRef();
  let initWidth = 600;


  useEffect(() => {
    setAll(images)

    setTimeout(() => {
        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: "body",
                start: "top top",
                end: "bottom bottom",
                scrub: true,
                // markers: true
              }
        })

        let scale = 10
        let ease = "none"
        let delay = ">-0.2"
        let delayTwo = ">-0.05"
        let delayTranslate = ">-0.5"
        let duration = 0.1
    
        tl.to(containerRef.current.children[0], {scale: scale, zIndex: 999, ease: ease})
        tl.to(containerRef.current.children[0], {x: "-50%", y: "-50%", ease: ease}, delayTranslate)
        tl.to(containerRef.current.children[0], {opacity: 0, duration: duration}, delay)
        tl.to(containerRef.current.children[1], {scale: scale, zIndex: 999, ease: ease}, delayTwo)
        tl.to(containerRef.current.children[1], {x: "-50%", y: "-50%", ease: ease}, delayTranslate)
        tl.to(containerRef.current.children[1], {opacity: 0, duration: duration}, delay)
        tl.to(containerRef.current.children[2], {scale: scale, zIndex: 999, ease: ease}, delayTwo)
        tl.to(containerRef.current.children[2], {x: "-50%", y: "-50%", ease: ease}, delayTranslate)
        tl.to(containerRef.current.children[2], {opacity: 0, duration: duration}, delay)
        tl.to(containerRef.current.children[3], {scale: scale, zIndex: 999, ease: ease}, delayTwo)
        tl.to(containerRef.current.children[3], {x: "-50%", y: "-50%", ease: ease}, delayTranslate)
        tl.to(containerRef.current.children[3], {opacity: 0, duration: duration}, delay)
        tl.to(containerRef.current.children[4], {scale: scale, zIndex: 999, ease: ease}, delayTwo)
        tl.to(containerRef.current.children[4], {x: "-50%", y: "-50%", ease: ease}, delayTranslate)
        // tl.to(containerRef.current.children[4], {opacity: 0, duration: duration}, delay)
    }, 0)


  }, []);


  useEffect(() => {
    Array.from(containerRef.current.children).forEach((item, index) => {

      images[index].initCoords.width = initWidth

      item.style.transform = `translate(${images[index].initCoords.x}%, ${images[index].initCoords.y}%)`

      item.style.width = `${initWidth}px`
    })
  },[all])


  return (
    <Container ref={containerRef}>
        {all.map(item => <Image><img src={item.url} /></Image>)}
    </Container>
  )
}
