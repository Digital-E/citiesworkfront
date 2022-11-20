import 'reset-css';

import '../styles/index.css'

import "../styles/flickity.css";

import { useEffect } from 'react'

import Body from "../components/body"
import CookieConsent from "react-cookie-consent"

import Header from '../components/header'
import Footer from '../components/footer'

import { RouterScrollProvider } from '@moxy/next-router-scroll';


function MyApp({ Component, pageProps, router }) {

  useEffect(() => {
    setTimeout(() => {
      document.querySelector("#__next").style.opacity = 1
    }, 250)
  },[])

  return (
    <>
      <Header data={pageProps.data?.menuData} />
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
      <RouterScrollProvider>     
        <Component {...pageProps} />
      </RouterScrollProvider> 
      <Footer data={pageProps.data?.footerData}/>
    </>
  )
}

export default MyApp
