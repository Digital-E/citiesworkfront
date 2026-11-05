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
  // A real number (not "auto") so this element always establishes its own
  // stacking context. Without one, the -1 z-index on .island-svg below
  // doesn't stay local to this island: it escapes to the nearest ancestor
  // that *does* establish a context (Container, z-index: 1) and gets buried
  // under essentially everything else on the page, so nothing on the actual
  // island shape is hit-testable until something (e.g. a hover-triggered
  // inline z-index) traps it locally.
  z-index: 0;

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

  &.picker-place .island-svg path, &.picker-place .island-svg image {
    cursor: crosshair;
  }

  &.open-island .island-text.legacy {
    transform: translate(-50%,-50%) scale(0.7);
  }

  &.open-island .island-text:not(.legacy) {
    transform: scale(0.7);
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
  ${props => props.legacy ? 'transform: translate(-50%, -50%);' : ''}
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


export default function Component({ data, index, dataAll, allProjects, toggle, prevOpen, platform, pickerMode = false, selectedKey = null, onSelectIsland, onPlace }) {
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

    // Read inside the picker click handler (attached once on mount) so it
    // always sees the latest selection instead of the value from mount time.
    let selectedKeyRef = useRef(selectedKey);
    useEffect(() => {
      selectedKeyRef.current = selectedKey
    }, [selectedKey])

    let mouseEnter = () => {
        elRef.current.style.zIndex = 2;
        elRef.current.classList.add("hover-island")
    }

    let mouseLeave = () => {
        // Clears the inline override rather than setting 'auto': falls back
        // to the stylesheet's z-index: 0, keeping this island's own
        // stacking context (see Element's z-index comment) instead of
        // losing it.
        elRef.current.style.zIndex = ''
        elRef.current.classList.remove("hover-island")
    }

    // Picker mode still needs the z-index bump to raise whichever island is
    // actually under the cursor above overlapping neighbors, but must skip
    // the "hover-island" scale transform: that transform has a 0.7s
    // transition, so a click landing mid-transition reads a
    // getBoundingClientRect() for a box that's still animating, throwing
    // off the x/y percentage computed for the placed title.
    let pickerMouseEnter = () => {
        elRef.current.style.zIndex = 2;
    }

    let pickerMouseLeave = () => {
        elRef.current.style.zIndex = ''
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
      const isPicker = new URLSearchParams(window.location.search).get('picker') === 'true'
      // data.svg can be missing for an island that hasn't had its SVG set in
      // Sanity yet, in which case the dangerouslySetInnerHTML div renders
      // empty and there's no element to attach to.
      const svgEl = islandSVGRef.current.children[0]

      if (!svgEl) {
        // no-op
      } else if (!isPicker) {
        svgEl.addEventListener("mouseenter", mouseEnter)
        svgEl.addEventListener("mouseleave", mouseLeave)
        svgEl.addEventListener("click", toggle)
      } else {
        // Overlapping island shapes are disambiguated the same way normal
        // (non-picker) browsing already does it: hovering bumps this
        // island's Element to z-index 2, so whichever shape the pointer is
        // actually over gets raised above its neighbors before the click is
        // hit-tested. Without this, two overlapping shapes stay tied at the
        // same stacking level and whichever is later in the DOM always wins,
        // regardless of which one is visually under the cursor. Uses the
        // no-zoom variant (see above) so the scale transition can't throw
        // off a click's getBoundingClientRect() mid-placement.
        svgEl.addEventListener("mouseenter", pickerMouseEnter)
        svgEl.addEventListener("mouseleave", pickerMouseLeave)
        svgEl.addEventListener("click", (e) => {
          e.stopPropagation()
          if (!selectedKeyRef.current) {
            onSelectIsland(data._key)
          } else if (selectedKeyRef.current === data._key) {
            const rect = elRef.current.getBoundingClientRect()
            const x = ((e.clientX - rect.left) / rect.width * 100).toFixed(1)
            const y = ((e.clientY - rect.top) / rect.height * 100).toFixed(1)
            onPlace(x, y)
          }
        })
      }

      setWindowWidth(window.innerWidth)
      setWindowHeight(window.innerHeight)

      setIslandHeight(elRef.current.getBoundingClientRect().height)
      setIslandWidth(elRef.current.getBoundingClientRect().width)
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
            className={`${data.show ? 'show-island' : 'hide-island'}${pickerMode && selectedKey === data._key ? ' picker-place' : ''}`}
            platform={platform}
            windowHeight={windowHeight}
            windowWidth={windowWidth}
            islandHeight={islandHeight}
            islandWidth={islandWidth}
            >
            <div>
                <Name x={data?.titlePosition?.x ? data.titlePosition.x : data.titlePositionX} y={data?.titlePosition?.y ? data.titlePosition.y : data.titlePositionY} className='island-text legacy'>{data.title}</Name>
                <Projects>
                    {data.projects?.map(item => 
                    <Project
                        x={item.pickerPosition ? item.pickerPosition.x : item.titlePositionX}
                        y={item.pickerPosition ? item.pickerPosition.y : item.titlePositionY}
                        legacy={!item.pickerPosition}
                        onMouseOver={() => pickerMode ? pickerMouseEnter() : mouseEnter()}
                        onMouseLeave={() => pickerMode ? pickerMouseLeave() : mouseLeave()}
                        className={`island-text ${item.pickerPosition ? '' : 'legacy'} ${item.show ? 'show-project' : 'hide-project'}`}
                        >
                          <Link href={matchProject(item.project?._ref)} prefetch={false}>
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

            {pickerMode && (
              // Purely visual now: dimming + label. The click itself is
              // handled by the listener on the real SVG shape above, so
              // this stays pointer-events: none and never competes with a
              // neighboring island's overlay for the click.
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  zIndex: 10,
                  pointerEvents: 'none',
                  background: selectedKey && selectedKey !== data._key ? 'rgba(0,0,0,0.5)' : 'transparent',
                  transition: 'background 0.3s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {!selectedKey && (
                  <span style={{color: 'white', fontSize: '0.7rem', fontFamily: 'sans-serif', background: 'rgba(0,0,0,0.6)', padding: '3px 8px', borderRadius: 3, pointerEvents: 'none'}}>
                    Select island
                  </span>
                )}
                {selectedKey === data._key && (
                  <span style={{position: 'absolute', top: 8, left: '50%', transform: 'translateX(-50%)', whiteSpace: 'nowrap', color: 'white', fontSize: '0.7rem', fontFamily: 'sans-serif', background: 'rgba(0,0,0,0.6)', padding: '3px 8px', borderRadius: 3, pointerEvents: 'none'}}>
                    Click to place title
                  </span>
                )}
              </div>
            )}
        </Element>
  )
}
