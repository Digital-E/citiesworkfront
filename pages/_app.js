import 'reset-css';

import '../styles/index.css'

import "../styles/flickity.css";

import { useEffect, useState } from 'react'

import { StateProvider } from "../store"

import Body from "../components/body"
import CookieConsent from "react-cookie-consent"


import Header from '../components/header'
import Footer from '../components/footer'


import Grid from '../components/home/grid'
import Filter from '../components/home/filter'
import Islands from '../components/home/islands'
import Ticker from '../components/ticker'


function MyApp({ Component, pageProps, router }) {

  let [activeTags, setActiveTags] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      document.querySelector("#__next").style.opacity = 1
    }, 250)
  },[])

  return (
    <StateProvider>
      {
        pageProps.data.homeData !== undefined ?
        (
          <>
          <Header data={pageProps.data?.menuData} />
          <Ticker data={pageProps.data?.footerData} />
          <Filter data={pageProps.data?.homeData?.filters} setActiveTags={(data) => setActiveTags(data)}/>
          <Grid />
          <Islands data={pageProps.data?.homeData} allProjects={pageProps.data?.allProjectsData} activeTags={activeTags}/>
          </>
        )
        :
        null
      }
      {/* <CookieConsent
        buttonText={pageProps.data?.menuData.cookieaccept}
        declineButtonText={pageProps.data?.menuData.cookierefuse}
        enableDeclineButton
        cookieName={"ContrechampsCHCookieConsent"}
        onAccept={() => {
          // gtag('consent', 'update', {
          //   'analytics_storage': 'granted'
          // });
        }}
        onDecline={() => {}}
        >
        <Body content={pageProps.data?.menuData.cookietext} />
      </CookieConsent> */}              
      <Component {...pageProps} />
      {/* <Footer data={pageProps.data?.footerData}/> */}
    </StateProvider>
  )
}

export default MyApp
