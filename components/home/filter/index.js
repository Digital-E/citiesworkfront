import { useEffect, useState } from 'react'

import styled from 'styled-components'

import Button from '../../button'
import Tag from './tag'

const Container = styled.div`
    position: fixed;
    bottom: 120px;
    left: 40px;
    z-index: 999;

    > div:nth-child(1) {
        margin-bottom: 0.5rem;
    }
`

const Tags = styled.div`
    display: flex;
    flex-wrap: wrap;
`



export default function Component({ data }) {
    let [tags, setTags] = useState([]);
    let [showClear, setShowClear] = useState(false);

    useEffect(() => {

       let tagObjects = data.map(item => {
        let obj = {};
        obj.label = item;
        obj.isActive = false;

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
    
    return (
        <Container>
            <Button><a><span>Filter</span></a></Button>
            <Tags>
                {tags.map((item, index) => <Tag data={item} index={index} selectTag={(i) => toggleTag(i)}/>)}
                <Tag data={tags} isClear={true} clearAll={() => clearAll()} showClear={showClear}>× Clear </Tag>
            </Tags>
        </Container>
        )
}