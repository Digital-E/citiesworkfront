import { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'

import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);


const Container = styled.div`
  position: fixed;
  width: calc(100% - 80px);
  left: 50%;
  transform: translateX(-50%);
  bottom: 60px;
  overflow: hidden;
  border-radius: 999px;
  border: 1px solid black;

  font-family: FluxischElse Light;

  // Ticker CSS

  .ticker {
    display: flex;
    background: white;
  }

  .ticker__list {
    display: flex;
    margin: 7px 0;
    animation: ticker 60s infinite linear;
  }

  .ticker:hover .ticker__list {
    animation-play-state: paused;
  }
  
  .ticker__item {
    display: flex;
    align-items: center;
    white-space: nowrap;
  }
  
  @keyframes ticker {
    100% {
      transform translateX(-100%)
    }
  }

  .ticker__item-dot {
    width: 10px;
    height: 10px;
    border-radius: 999px;
    background: black;
    margin: 0 10px;
  }

`



let items = [
  {
    city: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
  },
  {
    city: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
  }
]



export default function Component() {
  let [all, setAll] = useState(items);
  let containerRef = useRef();



  useEffect(() => {
    setAll(items)

    let ticker = document.querySelector('.ticker')
    let list = document.querySelector('.ticker__list')
    let clone = list.cloneNode(true)

    ticker.append(clone)

  }, []);


  return (
    <Container ref={containerRef}>
      <div className='ticker'>
        <div className='ticker__list'>
          {all.map(item => 
            <div className='ticker__item'>
              <div>{item.city}</div>
              <div className='ticker__item-dot'></div>
            </div>
            )}
        </div>
      </div>
    </Container>
  )
}
