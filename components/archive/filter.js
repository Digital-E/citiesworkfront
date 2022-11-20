import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import styled from "styled-components"
import Link from "../link"

import { gsap } from "gsap/dist/gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);



let Container = styled.div`
    z-index: 1;

    .season-filters {
        position: relative;
        display: flex;
        background: white;
    }

    .season-filters > div {
        display: flex;
    }

    .season-filter > a {
        display: flex;
        align-items: center;
        cursor: pointer;
        flex-basis: auto;
        margin-right: 40px;
    }

    @media(max-width: 767px) {
        .season-filter > a {
            display: flex;
            justify-content: center;
            margin-right: 0;
        }
    }

    .season-filter > a:hover .season-filter__selector {
        background-color: #70706f;
    }

    .season-filter__selector {
        width: 13px;
        height: 13px;
        border: 1px solid black;
        background: white;
        border-radius: 999px;
    }

    .season-filter__label {
        margin-right: 5px;
        line-height: 1;
        color: black !important;
    }

    .active-link .season-filter__selector  {
        background-color: #70706f !important;
    }

    @media(max-width: 989px) {
        position: fixed;
        width: 100%;
        top: 90px;
        left: 0;

        .season-filters > div {
            flex-wrap: wrap;
            padding: 0 20px;
            flex-wrap: nowrap;
            overflow: scroll;
        } 

        .season-filter {
            margin-right: 30px;
        }

        .season-filters::after {
            content: "";
            position: absolute;
            right: 0;
            top: 0;
            height: 35px;
            width: 30px;
            background: linear-gradient(90deg, transparent 0%, white 90%);
            z-index: 999;
        }
    }
`


export default function Component ({ data }) {
    let filtersRef = useRef();
    const router = useRouter();

    let scrollTriggerInstance = null;

    let init = (reset) => {

        if(reset === true) {
          if(scrollTriggerInstance !== null) {
              if(ScrollTrigger.getById("scroll-trigger") !== undefined) {
                ScrollTrigger.getById("scroll-trigger").kill(true);
              }
          }
        }
    
        if(window.innerWidth > 989) {
            let headerHeight = document.querySelector("header").offsetHeight;

            scrollTriggerInstance = ScrollTrigger.create({
                trigger: filtersRef.current,
                id: "scroll-trigger",
                pin: filtersRef.current,
                start: `top-=${headerHeight} top`,
                end: "max",
                pinSpacing: false,
                resize: window.matchMedia("(any-pointer:coarse)").matches ? false : true
            });
    
        } 
    }

    let initWrapper = () => {
        setTimeout(() => {
            init(true);
        }, 500)
    }

    useEffect(() => {

        if(window.innerWidth > 989) {
            setTimeout(() => {
                init();
            }, 500)
        }

        if(!window.matchMedia("(any-pointer:coarse)").matches) {
            window.addEventListener("resize", initWrapper)
        }

        return () => {
            window.removeEventListener("resize", initWrapper)
        }        
        
    }, []);

    return (
        <Container ref={filtersRef}>
            <div class="season-filters">
                <div>
                <div class="season-filter">
                    <Link href={`/${router.query.lang}/archive/years`}>
                        <div class="season-filter__label p">{data?.years}</div>
                        <div class="season-filter__selector"></div>
                    </Link>
                </div>                
                <div class="season-filter">
                    <Link href={`/${router.query.lang}/archive/artists`}>
                        <div class="season-filter__label p">{data?.artists}</div>
                        <div class="season-filter__selector"></div>
                    </Link>
                </div>
            </div>
            </div> 
    </Container>       
    )
}