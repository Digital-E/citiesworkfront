import { useRouter } from "next/router"
import Head from 'next/head'
import Layout from "../components/layout";
import styled from 'styled-components';

import { menuQuery, footerQuery } from '../lib/queries'
import { getClient } from '../lib/sanity.server'


import { SITE_NAME } from "../lib/constants"

import Link from '../components/link'

const Container = styled.div`
    position: absolute;
    top: 0;
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100vw;

    > div {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    a {
        margin-top: 25px;
        color: black;
        text-decoration: none;
    }
`


export default function Custom404({ data = {}, preview }) {
    const router = useRouter();

    return (
    <Layout preview={preview}>
      <Head>
        <title>{SITE_NAME} | 404 - Page Not Found</title>
      </Head>
      <Container>
          <div>
            <h1>404 - Page Not Found 🔴</h1>
            <Link href={`/`} className='p'>Go Home</Link>
          </div>
      </Container>
    </Layout>
    )
  }

export async function getStaticProps({ preview = false, params }) {



    // Get Menu And Footer

    const menuData = await getClient(preview).fetch(menuQuery);


    const footerData = await getClient(preview).fetch(footerQuery);


    return {
        props: {
            preview,
            data: {
              menuData,
              footerData
            }
          }
    };
}