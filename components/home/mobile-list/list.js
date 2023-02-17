import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import styled from 'styled-components'

import splitSlug from "../../../lib/splitSlug"

const Container = styled(motion.div)`

`

const ListItem = styled.div`
    border-top: 1px solid black;
`

const Title = styled.p``




const Component = ({ data, allProjects }) => {
    let router = useRouter();

    const route = (reference) => {
      let match = allProjects.filter(item => item._id === reference)

      let pathname = `/${splitSlug(match[0].slug, 0)}/${splitSlug(match[0].slug, 1)}`
      router.push(pathname)
    }    

    return (
        <Container>
            {data?.projects?.map(item => (
            <ListItem onClick={() => route(item.project._ref)}>
                <Title>{item.title}</Title>
            </ListItem>
            ))}
        </Container>
    )
}

export default Component