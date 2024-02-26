import { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'

import { gsap } from "gsap/dist/gsap";

import { motion } from "framer-motion";

import Island from "./island"

import MobileList from "../mobile-list"

import Parallax from 'parallax-js'

import Link from '../../link'

import { useMediaQuery } from 'react-responsive';

let Flickity = null;

if(typeof window !== 'undefined') {
    Flickity = require('flickity')
}


const Container = styled.div`
  position: fixed;
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
  overflow: hidden;
  z-index: 1;

  @media(max-width: 989px) {
    display: flex;
    align-items: center;
  }
`

const Carousel = styled.div`
    position: relative;
    width: 100%;
    outline: none !important;
    overflow: hidden;

    .flickity-viewport {
        overflow: visible;
    }

    @media(min-width: 990px) {
      height: 100%;
    }
    
`

let Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  height: 100% !important;
  width: 100% !important;
  backdrop-filter: blur(10px);
  z-index: 1;
  transform: none !important;
  pointer-events: all;

  @media(max-width: 989px) {
    height: 0 !important;
    width: 0 !important;
  }
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

let parallaxInstance = null;

let parallaxTimeout = null;

export default function Component({ data, allProjects, activeTags }) {
  let [all, setAll] = useState([]);
  let [prevOpen, setPrevOpen] = useState(0);
  let [overlayOpen, setOverlayOpen] = useState(false);
  let carouselRef = useRef();

  let allRef = useRef(all);

  const isDesktop = useMediaQuery({
    query: '(min-width: 990px)'
  })

  let scene = null;
  let flickity = null;


  let initCarousel = () => {
      if(flickity !== null) return

      flickity = new Flickity(carouselRef.current, {
          prevNextButtons: false,
          pageDots: false,
          selectedAttraction: 0.07,
          friction: 0.42,
          freeScroll: true,
          cellAlign: "center",
          percentPosition: true,
          wrapAround: true,
      })

      flickity.on('staticClick', (event, pointer, cellElement, cellIndex) => {
        toggleIsland(cellIndex)
      })
  }  

  let destroyCarousel = () => {
      if(flickity === null) return
      flickity.destroy()
      flickity = null
  }  

  let initParallax = () => {
    setTimeout(() => {
      scene = document.getElementById('scene');
      parallaxInstance = new Parallax(scene, {
        // relativeInput: true
        // scalarX: 100,
        // scalarY: 100,
      });
    }, 0)
  }

  let destroyParallax = () => {
    parallaxInstance?.disable()
  }

  useEffect(() => {
    
    setAll(data.islands)

    if(window.innerWidth < 990) {
      setTimeout(() => {
        initCarousel();
      }, 0)
    } else {
      initParallax();
    }

    window.addEventListener("resize", () => {
      if(window.innerWidth > 989) {
          destroyCarousel();
          if(!parallaxInstance) {
            initParallax();
          } else {
            parallaxInstance?.enable()
          }
          // desktopResizeCount += 1
          // hasPositioned = false;
          // positionCards();
      } else {
          // desktopResizeCount = -1
          initCarousel();
          destroyParallax();
      }
    })      

  }, []);

  // useEffect(() => {
  //   setTimeout(() => {
  //     if(isDesktop) {
  //       parallaxInstance?.enable()
  //     } else {
  //       parallaxInstance?.disable()
  //     }
  //   }, 0)
  // }, [isDesktop])


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

  let clickIsland = (index) => {
    if(window.innerWidth < 990) return
      toggleIsland(index)
  }

  let toggleIsland = (index) => {
    setPrevOpen(index);
    let copyAll = JSON.parse(JSON.stringify(allRef.current))
    copyAll[index].isOpen = true

    setAll(copyAll)
    allRef.current = copyAll
  }

  let closeAll = () => {
    let copyAll = JSON.parse(JSON.stringify(all))

    copyAll.forEach(item => item.isOpen = false)

    setAll(copyAll)
    allRef.current = copyAll
  }


  useEffect(() => {
    
      let filteredProjectsArray = [];

      let tags = activeTags.map(item => {
        if(item.isActive === true) {
          return item.label
        }
      })

      tags = tags.filter(item => item !== undefined)

      allProjects?.forEach(item => {
        item.tags?.forEach(tag => {
          tags.forEach(tagTwo => {
            if(tag.trim().toLowerCase() === tagTwo.trim().toLowerCase()) {
              filteredProjectsArray.push(item)
            }
          })
        })
      })

      let copyProjects = []

      copyProjects = JSON.parse(JSON.stringify(all))  
      
      // Hide/Show Island ?

      copyProjects.forEach(item => {
        let show = 0;

        item.projects?.forEach(itemTwo => {
          filteredProjectsArray.forEach(itemThree => {
            if(itemTwo.project?._ref === itemThree._id) {
              show += 1;
            }
          })
        })

        if(show > 0) {
          item.show = true
        } else {
          item.show = false
        }
      })

      
      // Hide/Show Project ?

      copyProjects.forEach(item => {

        item.projects?.forEach(itemTwo => {
          let show = 0;

          filteredProjectsArray.forEach(itemThree => {
            if(itemTwo.project?._ref === itemThree._id) {
              show += 1;
            }
          })

          if(show > 0) {
            itemTwo.show = true
          } else {
            itemTwo.show = false
          }          
        })
      })

      if(tags.length === 0) {
        copyProjects.forEach((item, index) => {
          item.show = true

          item.projects?.forEach(itemTwo => {
              itemTwo.show = true
          })
        })
      }
    
      if(copyProjects.length === 0) return 

      setAll(copyProjects)
      allRef.current = copyProjects

  }, [activeTags])

  return (
    <Container>
      <Carousel id="scene" ref={carouselRef}>
        {all.map((item, index) => 
          <Island data={item} dataAll={all} index={index} toggle={() => clickIsland(index)} prevOpen={prevOpen} allProjects={allProjects} activeTags={activeTags} platform='desktop'/>
        )}
       <Overlay animate={overlayOpen ? "visible" : "hidden"} variants={overlayVariants} onClick={() => closeAll()}/>
      </Carousel>
      <MobileList dataAll={all} allProjects={allProjects} closeAll={() => closeAll()}/>
    </Container>
  )
}
