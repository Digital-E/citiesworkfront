import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

import styled from 'styled-components'

import Fuse from 'fuse.js'

import Button from '../../button'
import Search from './search'
import Tag from './tag'

const Container = styled.div`
    position: fixed;
    top: 30px;
    right: 40px;
    left: 30px;
    z-index: 2;
    transition: 0.7s;
    pointer-events: none;

    > div:nth-child(1) {
        margin-left: auto;
        margin-bottom: 0.5rem;
        width: fit-content;
        pointer-events: all;
    }

    > div:nth-child(1).filter-open > div {
        background: var(--gray);
    }

    &.hide-filter {
        transform: translateY(-110%);
    }

    @media(max-width: 989px) {
        display: flex;
        flex-direction: column;
        position: fixed;
        bottom: 80px;
        top: auto;
        right: auto;
        left: 0;

        > div:nth-child(1) {
            margin: 0;
            width: fit-content;
        }

        > div:nth-child(1) {
            left: 140px;
            position: relative;
        }

        &.hide-filter {
            transform: translateY(0px);
            opacity: 0;
            pointer-events: none !important;
            transition-duration: 0.3s;
        }

        &.hide-filter * {
            pointer-events: none !important;
        }
    }
`

const TagsAndSearch = styled(motion.div)`
    // > div {
    //     pointer-events: all;
    // }

    @media(max-width: 989px) {
        order: -1;
    }
`


const Tags = styled(motion.div)`
    display: flex;
    flex-wrap: wrap;

    // > div {
    //     pointer-events: all;
    // }

    @media(max-width: 989px) {
        height: 400px;
        overflow: scroll;
        order: -1;
        padding: 0 30px;
        margin-bottom: 10px;
        

        > div {
            margin: 0.3rem;
        }
    }
`

let variants = {
    'open': {
        opacity: 1,
        transition: {
            staggerChildren: 0.02,
            staggerDirection: 1
        },
        pointerEvents: 'all'
    },
    'closed': {
        opacity: 0,
        pointerEvents: 'none'
    }
}



export default function Component({ data, setActiveTags }) {
    let [filterOpen, setFilterOpen] = useState(false);
    let [tags, setTags] = useState([]);
    let [showClear, setShowClear] = useState(false);

    useEffect(() => {

       let tagObjects = data.map(item => {
        let obj = {};
        obj.label = item;
        obj.isActive = false;
        obj.isDisplayed = true;

        return obj;
       })

       setTags(tagObjects)

    }, []);

    useEffect(() => {
        let showClear = false;

        tags.forEach(item => { if(item.isActive) showClear = true })

        if(showClear === true) {
            setShowClear(true)
        } else {
            setShowClear(false)
        }
        
        setActiveTags(tags)
        
    }, [tags])

    let toggleTag = (i) => {
        let tagsObj = JSON.parse(JSON.stringify(tags));

        tagsObj[i].isActive = !tagsObj[i].isActive

        setTags(tagsObj)
        
    }

    let clearAll = () => {
        let tagsObj = JSON.parse(JSON.stringify(tags));

        tagsObj.forEach((item, index) => {
            tagsObj[index].isActive = false
        })

        setTags(tagsObj)
    }

    let onType = (e) => {
        let searchInput = e.currentTarget.value
        let tagsObj = JSON.parse(JSON.stringify(tags));

        const options = {
            includeScore: true,
            keys: ['label'],
            threshold: 0.5
        }        

        const fuse = new Fuse(tags, options)

        const result = fuse.search(searchInput)

        tagsObj.forEach((item, index) => {
            tagsObj[index].isDisplayed = true
        })

        if(searchInput === '' || searchInput === ' ') return setTags(tagsObj)

        tagsObj.forEach((item, index) => {
            tagsObj[index].isDisplayed = false
        })

        result.forEach(itemOne => {
            tagsObj.forEach(itemTwo => {
                if(itemOne.item.label === itemTwo.label) {
                    itemTwo.isDisplayed = true
                }
            })
        })

        setTags(tagsObj)

    }


    
    return (
        <Container className="filter">
            <div 
            className={filterOpen ? 'filter-open' : ''}
            onClick={() => setFilterOpen(!filterOpen)}
            >
                <Button><a><span>Filter</span></a></Button>
            </div>
            <TagsAndSearch
                init='closed'
                animate={filterOpen ? 'open' : 'closed'}
                variants={variants}
            >
                <Search onChange={e => onType(e)}/>
                <Tags

                >
                    {tags.map((item, index) => <Tag data={item} index={index} selectTag={(i) => toggleTag(i)}/>)}
                    <Tag data={tags} isClear={true} clearAll={() => clearAll()} showClear={showClear}>× Clear </Tag>
                </Tags>
            </TagsAndSearch>
        </Container>
        )
}