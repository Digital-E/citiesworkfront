import { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'

import { gsap } from "gsap/dist/gsap";

import { motion } from "framer-motion";

import Island from "./island"

import Parallax from 'parallax-js'


const Container = styled.div`
  position: fixed;
  height: 100vh;
  width: 100vw;
  left: 0;
  top: 0;
  overflow: hidden;
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

let images = [
  {
    isOpen: false,
    dataDepth: 0.1,
    url: "images/A.svg",
    name: {
      name: 'Network',
      coords: {
        x: 50,
        y: 50
      }
    },
    initCoords: {
      x: 15,
      y: 10,
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
    },
    projects: [
      {
        name: 'Project One',
        coords: {
          x: 30,
          y: 45
        }
      },
      {
        name: 'Project Two',
        coords: {
          x: 60,
          y: 40
        }
      }
    ]
  },
  {
    isOpen: false,
    dataDepth: 0.1,
    url: "images/B.svg",
    name: {
      name: 'Partnerships',
      coords: {
        x: 50,
        y: 50
      }
    },
    initCoords: {
      x: 50,
      y: 50,
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
    },
    projects: [
      {
        name: 'Project One',
        coords: {
          x: 30,
          y: 45
        }
      },
      {
        name: 'Project Two',
        coords: {
          x: 60,
          y: 40
        }
      }
    ]
  },
  {
    isOpen: false,
    dataDepth: 0.25,
    url: "images/C.svg",
    name: {
      name: 'Research',
      coords: {
        x: 45,
        y: 55
      }
    },
    initCoords: {
      x: 55,
      y: 15,
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
    isOpen: false,
    dataDepth: 0.3,
    url: "images/D.svg",
    name: {
      name: 'Staff Projects',
      coords: {
        x: 50,
        y: 30
      }
    },
    initCoords: {
      x: 20,
      y: 40,
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
    isOpen: false,
    dataDepth: 0.4,
    url: "images/E.svg",
    name: {
      name: 'MA Cities',
      coords: {
        x: 50,
        y: 50
      }
    },
    initCoords: {
      x: 35,
      y: 25,
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

export default function Component() {
  let [all, setAll] = useState([]);
  let [prevOpen, setPrevOpen] = useState(0);
  let [overlayOpen, setOverlayOpen] = useState(false);
  let containerRef = useRef();
  let initWidth = 600;


  useEffect(() => {
    setAll(images)

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

    console.log(copyAll)
  }


  return (
    <Container ref={containerRef} id="scene">
        {all.map((item, index) => <Island data={item} dataAll={all} index={index} toggle={() => toggleIsland(index)} prevOpen={prevOpen}/> )}
        <Overlay animate={overlayOpen ? "visible" : "hidden"} variants={overlayVariants} onClick={() => closeAll()}/>
    </Container>
  )
}
