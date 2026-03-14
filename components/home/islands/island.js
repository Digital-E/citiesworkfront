import { useEffect, useState, useRef, useContext } from 'react'
import styled from 'styled-components'

import { useRouter } from 'next/router'

import { motion } from "framer-motion";

import { store } from "../../../store";

import splitSlug from "../../../lib/splitSlug"

import Link from '../../link'
import { ref } from 'yup';

var _ = require('lodash');


const Element = styled.div`
  position: absolute;
  display: flex;
  width: ${props => props.data.islandWidth}%;
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
    // transform: translate(${props => props.data.islandPositionX / 100 * props.windowWidth }px, ${props => props.data.islandPositionY / 100 * props.windowHeight }px) !important;
    left: ${props => props.data.islandPositionX / 100 * props.windowWidth}px !important;
    top: ${props => props.data.islandPositionY / 100 * props.windowHeight}px !important;

    &.open-island {
      // width: 70vw !important;
      transform: translate(
      ${props => (props.windowWidth / 2) - (props.islandWidth / 2) - (props.data.islandPositionX / 100 * props.windowWidth)}px,
      ${props => (props.windowHeight / 2) - (props.islandHeight / 2) - (props.data.islandPositionY / 100 * props.windowHeight)}px) scale(1.7) !important;
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
    width: 80% !important;
    height: auto;
    transition: opacity 0.5s, transform 0s, left 0s, top 0s;

    &.hide-island {
      opacity: 1;
      filter: blur(5px);
    }


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

  #disabled {
    display: none;
    pointer-events: none;
  }

  display: flex;
  align-items: center;

  a {
    text-decoration: none !important;
    margin: 0;
    padding: 0;
    font-family: FluxischElse Light;
    font-size: 1rem;
    -webkit-text-stroke: 0.3px white;
  }

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


let closingIslandTimeout = null;


export default function Component({ data, index, dataAll, allProjects, toggle, prevOpen, platform }) {
    //Context
    const context = useContext(store);
    const { state, dispatch } = context;

    let [windowHeight, setWindowHeight] = useState(0);
    let [windowWidth, setWindowWidth] = useState(0);

    let [islandHeight, setIslandHeight] = useState(0);
    let [islandWidth, setIslandWidth] = useState(0);

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

      setWindowWidth(window.innerWidth)
      setWindowHeight(window.innerHeight)


      setIslandHeight(elRef.current.getBoundingClientRect().height)
      setIslandWidth(elRef.current.getBoundingClientRect().width)

      // Array.from(islandSVGRef.current.children[0].children).forEach(item => {
      //   item.addEventListener("mouseenter", mouseEnter)
      //   item.addEventListener("mouseleave", mouseLeave)
      //   item.addEventListener("click", toggle)
      // })
    }, [])

    window.addEventListener("resize", _.debounce(() => {
      setWindowWidth(window.innerWidth)
      setWindowHeight(window.innerHeight)
      setIslandHeight(elRef.current.getBoundingClientRect().height)
      setIslandWidth(elRef.current.getBoundingClientRect().width)
    }, 100))

    const matchProject = (reference) => {

      let match = allProjects?.filter(item => item._id === reference)


      if(match?.length === 0) {
        match = allProjects?.filter(item => item._id === `drafts.${reference}`)
      }

      if(match === undefined || match[0] === undefined) return null


      let pathname = `/${splitSlug(match[0].slug, 0)}/${splitSlug(match[0].slug, 1)}`

      return pathname
    }

  return (
        <Element 
            ref={elRef} 
            data={data} 
            data-depth={data.dataDepth}
            className={data.show ? 'show-island' : 'hide-island'}
            platform={platform}
            windowHeight={windowHeight}
            windowWidth={windowWidth}
            islandHeight={islandHeight}
            islandWidth={islandWidth}
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
                        className={`island-text ${item.show ? 'show-project' : 'hide-project'}`}
                        >
                          <Link href={matchProject(item.project?._ref)}>
                            <img src={`/icons/keys/${2}.svg`} />
                            {item.title}
                          </Link>
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
