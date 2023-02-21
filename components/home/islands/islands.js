import { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'

import { gsap } from "gsap/dist/gsap";

import { motion } from "framer-motion";

import Island from "./island"

import MobileList from "../mobile-list"

import Parallax from 'parallax-js'

import { useMediaQuery } from 'react-responsive';


const Container = styled.div`
  position: fixed;
  height: 100vh;
  width: 100vw;
  left: 0;
  top: 0;
  overflow: hidden;
  z-index: 1;
`

let Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh !important;
  width: 100vw !important;
  backdrop-filter: blur(10px);
  z-index: 1;
  transform: none !important;
  pointer-events: all;
`

let overlayVariants = {
  "visible": {
    opacity: 1,
    display: "block",
  },
  "hidden": {
    opacity: 0,
    transitionEnd: {
      display: "none",
    },
  }
}

var parallaxInstance = null;

let parallaxTimeout = null;

export default function Component({ data, allProjects, activeTags }) {
  let [all, setAll] = useState([]);
  let [prevOpen, setPrevOpen] = useState(0);
  let [overlayOpen, setOverlayOpen] = useState(false);
  let containerRef = useRef();

  const isDesktop = useMediaQuery({
    query: '(min-width: 990px)'
  })

  useEffect(() => {
    if(isDesktop) {
      parallaxInstance?.enable()
    } else {
      parallaxInstance?.disable()
    }
  }, [isDesktop])


  useEffect(() => {
    
    setAll(data.islands)

    setTimeout(() => {
      var scene = document.getElementById('scene');
      parallaxInstance = new Parallax(scene, {
        // relativeInput: true
        // scalarX: 100,
        // scalarY: 100,
      });
    }, 0)

  }, []);


  useEffect(() => {

    let openCount = 0;

    all.forEach((item) => {

      if(item.isOpen) {
        openCount += 1;
      }

    })

    if(openCount > 0) {

      setOverlayOpen(true)

    } else {
      setOverlayOpen(false)

      clearTimeout(parallaxTimeout)

      parallaxInstance?.disable()
      
      parallaxTimeout = setTimeout(() => {
        parallaxInstance?.enable()
      }, 1000)
    }
  },[all])

  let toggleIsland = (index) => {
    setPrevOpen(index);
    let copyAll = JSON.parse(JSON.stringify(all))
    copyAll[index].isOpen = true
    setAll(copyAll)
  }

  let closeAll = () => {
    let copyAll = JSON.parse(JSON.stringify(all))

    copyAll.forEach(item => item.isOpen = false)

    setAll(copyAll)
  }


  return (
    <Container ref={containerRef} id="scene">
        {all.map((item, index) => 
        <Island data={item} dataAll={all} index={index} toggle={() => toggleIsland(index)} prevOpen={prevOpen} allProjects={allProjects} activeTags={activeTags}/>
        )}
        <MobileList dataAll={all} allProjects={allProjects} closeAll={() => closeAll()}/>
        <Overlay animate={overlayOpen ? "visible" : "hidden"} variants={overlayVariants} onClick={() => closeAll()}/>
    </Container>
  )
}
