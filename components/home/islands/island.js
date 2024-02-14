import { useEffect, useState, useRef, useContext } from 'react'
import styled from 'styled-components'

import { useRouter } from 'next/router'

import { motion } from "framer-motion";

import { store } from "../../../store";

import splitSlug from "../../../lib/splitSlug"


const Element = styled(motion.div)`
  position: absolute;
  display: flex;
  left: ${props => props.data.islandPositionX }% !important;
  top: ${props => props.data.islandPositionY }% !important;
  width: ${props => props.data.islandWidth }%;
  pointer-events: none;
  z-index: auto;

  transition: opacity 0.5s;

  &.closing-island {
    z-index: 2 !important;
    transition: opacity 0.5s, transform 1s, left 1s, top 1s;
  }

  &.show-island {
    opacity: 1;
  }

  &.hide-island {
    opacity: 0;
    pointer-events: none !important;
  }

  &.hide-island * {
    pointer-events: none !important;
  }

  @media(min-width: 990px) {
    &.open-island {
      // width: 70vw !important;
      left: 50% !important;
      top: 50% !important;
      transform: translate(-50%, -50%) scale(1.7) !important;
      z-index: 2 !important;
      transition: opacity 0.5s, transform 1s, left 1s, top 1s;
    }
  }

  .island-text {
    transition: 0.5s;
  }

  .island-svg {
    position: relative;
    z-index: -1;
    // pointer-events: all;
  }

  .island-svg path, .island-svg image {
    pointer-events: all;
    cursor: pointer;
    // fill: ${props => props.data.color };
  }

  &.open-island .island-text {
    transform: translate(-50%,-50%) scale(0.7);
  }

  img {
    width: 100%;
  }

  > div {
    transition: transform 0.7s;
    height: 100%;
    width: 100%;
  }

  &.hover-island > div {
    transform: scale(1.1) !important
  }

  @media(max-width: 989px) {
    // display: ${props => props.platform === 'desktop' ? 'none' : 'block'};
    // left: ${props => parseInt(props.data.islandPositionX) - 8 }% !important;
    // top: ${props => parseInt(props.data.islandPositionY) + 10 }% !important;
    left: 0 !important;
    top: 0 !important;
    width: 80% !important;
    height: auto;
    transition: opacity 0.5s, transform 0s, left 0s, top 0s;


    > div > div:nth-child(2)
     {
      display: none;
    }
  }
`

const Name = styled.div`
  position: absolute;
  top: ${props => props.y}%;
  left: ${props => props.x}%;
  transform: translate(-50%, -50%);
  font-family: FluxischElse Light;
  font-size: 1.22rem;
  -webkit-text-stroke: 0.4px white;

  @media(max-width: 989px) {
    font-size: 0.9rem;
    -webkit-text-stroke: 0;
  }
`

const Projects = styled.div`
`

const Project = styled.div`
  position: absolute;
  top: ${props => props.y}%;
  left: ${props => props.x}%;
  transform: translate(-50%, -50%);
  font-family: FluxischElse Light;
  font-size: 1rem;
  pointer-events: all;
  -webkit-text-stroke: 0.3px white;

  display: flex;
  align-items: center;

  img {
      width: 10px;
      margin-right: 5px;
  }

  :hover {
    opacity: 0.5;
    cursor: pointer;
  }

  &.show-project {
    opacity: 1;
    transition-duration: 0.3s;
  }

  &.hide-project {
    opacity: 0;
    transition-duration: 0.3s;
    pointer-events: none !important;
  }

  @media(max-width: 989px) {
    font-size: 0.9rem;
  }
`

let variants = {
    "open": {
      width: "70%",
      left: "50%",
      top: "50%",
      x: "-50%",
      y: "-50%",
      zIndex: "2 !important",
      transition: "1s"
    },
    "close": {
      width: "40%",
      transitionEnd: {
        transition: "0s",
      },
    }
  }

let closingIslandTimeout = null;


export default function Component({ data, index, dataAll, allProjects, toggle, prevOpen, platform }) {
    //Context
    const context = useContext(store);
    const { state, dispatch } = context;

    let router = useRouter();

    let elRef = useRef();
    let islandSVGRef = useRef();
    let [isOpen, setIsOpen] = useState(false);

    let mouseEnter = () => {
        elRef.current.style.zIndex = 2;
        elRef.current.classList.add("hover-island")
    }

    let mouseLeave = () => {
        elRef.current.style.zIndex = 'auto';
        elRef.current.classList.remove("hover-island")
    }

    useEffect(() => {

        if(dataAll[index].isOpen === true) {
            setIsOpen(true)
            elRef.current.classList.add("open-island");
        } else if(dataAll[index].isOpen === false && prevOpen === index) {
            clearTimeout(closingIslandTimeout);

            setIsOpen(false)

            elRef.current.classList.add("closing-island");
            elRef.current.classList.remove("open-island");
            
            closingIslandTimeout = setTimeout(() => {
                elRef.current.classList.remove("closing-island");
            }, 1000)
        }

    }, [dataAll])

    useEffect(() => {
      islandSVGRef.current.children[0].addEventListener("mouseenter", mouseEnter)
      islandSVGRef.current.children[0].addEventListener("mouseleave", mouseLeave)
      islandSVGRef.current.children[0].addEventListener("click", toggle)

      // Array.from(islandSVGRef.current.children[0].children).forEach(item => {
      //   item.addEventListener("mouseenter", mouseEnter)
      //   item.addEventListener("mouseleave", mouseLeave)
      //   item.addEventListener("click", toggle)
      // })
    }, [])


    const route = (reference) => {

      // document.querySelectorAll('div').forEach(item => {
      //   item.style.cursor = "progress!important"
      // })

      document.querySelector(".loader").classList.add("show-loader")

      let match = allProjects.filter(item => item._id === reference)


      if(match.length === 0) {
        match = allProjects.filter(item => item._id === `drafts.${reference}`)
      }

      let pathname = `/${splitSlug(match[0].slug, 0)}/${splitSlug(match[0].slug, 1)}`
      router.push(pathname)
    }


  return (
        <Element 
            ref={elRef} 
            data={data} 
            data-depth={data.dataDepth}
            variants={variants}
            className={data.show ? 'show-island' : 'hide-island'}
            platform={platform}
            >
            <div>
                <Name x={data.titlePositionX} y={data.titlePositionY} className='island-text'>{data.title}</Name>
                <Projects>
                    {data.projects?.map(item => 
                    <Project 
                        x={item.titlePositionX} 
                        y={item.titlePositionY}
                        onMouseOver={() => mouseEnter()}
                        onMouseLeave={() => mouseLeave()}
                        onClick={() => route(item.project._ref)}
                        className={`island-text ${item.show ? 'show-project' : 'hide-project'}`}
                        >
                            <img src={`/icons/keys/${2}.svg`} />
                            {item.title}
                    </Project>
                    )}
                </Projects>
                <div                
                  ref={islandSVGRef}
                  className='island-svg'
                  dangerouslySetInnerHTML={{__html: data.svg}}
                />
          </div>
        </Element>
  )
}
