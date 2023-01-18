import { useEffect, useState, useRef, useContext } from 'react'
import styled from 'styled-components'

import { gsap } from "gsap/dist/gsap";

import { motion } from "framer-motion";

import { store } from "../../../store";




const Element = styled(motion.div)`
  position: absolute;
  display: flex;
  left: ${props => props.data.initCoords.x }% !important;
  top: ${props => props.data.initCoords.y }% !important;
  width: 30%;
  pointer-events: all;
  z-index: auto;

  transition: 0.1s;

  &.closing-island {
    transition: 1s;
    z-index: 2 !important;
  }

  &.open-island {
    // width: 70vw !important;
    left: 50% !important;
    top: 50% !important;
    transform: translate(-50%, -50%) scale(1.7) !important;
    z-index: 2 !important;
    transition: 1s;
  }

  .island-text {
    transition: 0.5s;
  }

  &.open-island .island-text {
    transform: translate(-50%,-50%) scale(0.7);
  }


  img {
    width: 100%;
  }

  > div {
    transition: transform 0.7s;
  }

  :hover > div {
    transform: scale(1.1);
  }
`

const Name = styled.div`
  position: absolute;
  top: ${props => props.y}%;
  left: ${props => props.x}%;
  transform: translate(-50%, -50%);
  font-family: FluxischElse Light;
  font-size: 1rem;
`

const Projects = styled.div`
`

const Project = styled.div`
  position: absolute;
  top: ${props => props.y}%;
  left: ${props => props.x}%;
  transform: translate(-50%, -50%);
  font-family: FluxischElse Light;
  font-size: 0.8rem;
  pointer-events: all;

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
      width: "30%",
      transitionEnd: {
        transition: "0s",
      },
    }
  }

let closingIslandTimeout = null;

export default function Component({ data, index, dataAll, toggle, prevOpen }) {
    //Context
    const context = useContext(store);
    const { state, dispatch } = context;

    let elRef = useRef();
    let [isOpen, setIsOpen] = useState(false);

    let mouseEnter = () => {
        elRef.current.style.zIndex = 2;
    }

    let mouseLeave = () => {
        elRef.current.style.zIndex = 'auto';
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

    const toggleSidepanel = () => {
        dispatch({type: "sidepanel open", value: true})
      }

  return (
        <Element 
            ref={elRef} 
            data={data} 
            onMouseEnter={() => mouseEnter()} 
            onMouseLeave={() => mouseLeave()} 
            onClick={() => toggle()} 
            data-depth={data.dataDepth}
            // className={isOpen ? "open-island" : ""}
            // animate={isOpen ? "open" : "close"} 
            variants={variants}
            >
            <div>
                <Name x={data.name.coords.x} y={data.name.coords.y} className='island-text'>{data.name.name}</Name>
                <Projects>
                    {data.projects?.map(item => 
                    <Project 
                        x={item.coords.x} 
                        y={item.coords.y}
                        onClick={() => toggleSidepanel()}
                        className='island-text'
                        >
                            <img src={`/icons/keys/${index + 1}.svg`} />
                            {item.name}
                    </Project>
                    )}
                </Projects>
                <img src={data.url} />
          </div>
        </Element>
  )
}
