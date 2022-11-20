import { useState, useEffect, useRef } from "react";
import styled from "styled-components";

import wheel from 'wheel';
import normalizeWheel from 'normalize-wheel';

import gsap from "gsap"

import Body from '../body'

let Flickity = null

if (typeof window !== "undefined") {
    Flickity = require("flickity");
  }

const Container = styled.div`
    position: fixed;
    z-index: 0;
    top: 0;
    height: 100%;
    width: 100%;
    left: 0;

    .flickity-viewport {
        height: 100vh;
        width: 100vw;
        max-width: 1800px;
        overflow: visible !important;
    }
`

const Carousel = styled.div`
  outline: none !important;
`;


const Slide = styled.div`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    text-align: center;
    padding: 20px;

    * {
        font-size: 10vw !important;
        line-height: 1;
    }

    @media(min-width: 1800px) {
        * {
            font-size: 198px !important;
        } 
    }
`;






export default ({ data }) => {
    let [flickity, setFlickity] = useState(null);
    let gallery = useRef();

    useEffect(() => {

        setTimeout(()=>{
            let flickity = new Flickity(gallery.current, {
                // options, defaults listed
                imagesLoaded: true,
            
                fade: false,
            
                accessibility: true,
                // enable keyboard navigation, pressing left & right keys
            
                adaptiveHeight: false,
                // set carousel height to the selected slide

                setGallerySize: false,
            
                autoPlay: 4000,
                // advances to the next cell
                // if true, default is 3 seconds
                // or set time between advances in milliseconds
                // i.e. `autoPlay: 1000` will advance every 1 second
            
                cellAlign: "center",
                // alignment of cells, 'center', 'left', or 'right'
                // or a decimal 0-1, 0 is beginning (left) of container, 1 is end (right)
            
                cellSelector: undefined,
                // specify selector for cell elements
            
                contain: false,
                // will contain cells to container
                // so no excess scroll at beginning or end
                // has no effect if wrapAround is enabled
            
                draggable: ">1",
                // enables dragging & flicking
                // if at least 2 cells
            
                dragThreshold: 0,
                // number of pixels a user must scroll horizontally to start dragging
                // increase to allow more room for vertical scroll for touch devices
            
                // freeScroll: window.innerWidth > 989 ? true : false,

                // enables content to be freely scrolled and flicked
                // without aligning cells

                selectedAttraction: 0.03,

                friction: 0.4,
                // smaller number = easier to flick farther
            
                groupCells: false,
                // group cells together in slides
            
                initialIndex: 0,
                // zero-based index of the initial selected cell
            
                lazyLoad: false,
                // enable lazy-loading images
                // set img data-flickity-lazyload="src.jpg"
                // set to number to load images adjacent cells
            
                percentPosition: true,
                // sets positioning in percent values, rather than pixels
                // Enable if items have percent widths
                // Disable if items have pixel widths, like images
            
                prevNextButtons: false,
                // creates and enables buttons to click to previous & next cells
            
                pageDots: false,
                // create and enable page dots
            
                resize: window.innerWidth > 989 ? true : false,
                // listens to window resize events to adjust size & positions
            
                rightToLeft: false,
                // enables right-to-left layout
            
                // setGallerySize: true,
                // sets the height of gallery
                // disable if gallery already has height set with CSS
            
                watchCSS: false,
                // watches the content of :after of the element
                // activates if #element:after { content: 'flickity' }
            
                wrapAround: true,
                // at end of cells, wraps-around to first for infinite scrolling
            });

            // introGallery();
        
            setFlickity(flickity);

            // Cancel Page Swipe Back

            gallery.current.addEventListener("wheel", (e) => {
                if(e.deltaX !== 0) {
                    e.preventDefault()
                }
            })

            flickity.on( 'staticClick', function( event, pointer ) {
                flickity.next(true);
            })

            flickity.on('pointerUp', function (event, pointer) {
                flickity.playPlayer();
            });

            // // Mouse swipe

            // wheel.addWheelListener(gallery.current, event => {
            //     const wheelNormalized = normalizeWheel(event);
            //     flickity.applyForce(-wheelNormalized.pixelY / 4);
            //     flickity.applyForce(-wheelNormalized.pixelX / 4);
            //     flickity.startAnimation();
            //     flickity.dragEnd();
            // });

            // // Mobile disable scroll while moving
            // flickity.on( 'dragMove', function( event, pointer ) {
            //     clearTimeout(stopScrollTimeout)

            //     document.body.addEventListener('touchmove', stopScroll, { passive: false });

            //     stopScrollTimeout = setTimeout(() => {
            //         document.body.removeEventListener('touchmove', stopScroll, { passive: false });
            //     }, 100)
            // });

        }, 0);

        let stopScrollTimeout = null;

        let stopScroll = (e) => {
            e.preventDefault()
        };
    
        // return () => {
        //   flickity.destroy();
        // };
      }, []);  
      

    return (
        <Container>
            <Carousel ref={gallery}>
                {data.slides.map((item, index) => {
                return (
                    <Slide key={index} className="carousel-slide">
                        {/* <div><p>{item.slideText}</p></div> */}
                        <div><Body content={item.slideText} /></div>
                    </Slide>
                );
                })}
            </Carousel>
        </Container>
    )
}