import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import styled from 'styled-components'

import splitSlug from "../../../lib/splitSlug"

import Link from '../../link'

const Container = styled(motion.div)`
`

const ListItem = styled.div`
    border-top: 1px solid black;

    &.show-project {
        opacity: 1;
        transition-duration: 0.2s;
    }

    &#hide-line {
        border-top: none;
    }

    a {
        width: fit-content;
        display: inline-block;
        width: fit-content;
        text-decoration: none;
        margin: 0;
    }

    #disabled {
        display: none;
    }


    &.hide-project {
        opacity: 0.1;
        transition-duration: 0.2s; 
        pointer-events: none;
    }
`

const Title = styled.p`
    margin: 10px 0;
`




const Component = ({ data, allProjects }) => {
    let router = useRouter();

    const route = (reference) => {
      let match = allProjects.filter(item => item._id === reference)

      let pathname = `/${splitSlug(match[0].slug, 0)}/${splitSlug(match[0].slug, 1)}`
      router.push(pathname)
    }    

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
        <Container>
            {data?.projects?.map(item => (
            <ListItem className={item.show ? 'show-project' : 'hide-project'} id={matchProject(item.project?._ref) === null && "hide-line"}>
                <Link href={matchProject(item.project?._ref)}>
                    <Title>{item.title}</Title>
                </Link>
            </ListItem>
            ))}
        </Container>
    )
}

export default Component