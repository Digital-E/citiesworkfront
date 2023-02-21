import styled from 'styled-components'

const Container = styled.div`
    position: relative;
`


export default function Component({ data, id }) {

    if(data.videoId === null) return null;

    let videoId = data.videoId;

    let regExp = /[a-zA-Z]/g;

    let isYoutube = regExp.test(videoId);

    return (
        <>
            <Container>
                <div class="plyr__video-embed player" id={id}>
                    <iframe
                    src={
                    isYoutube ?
                    `https://youtube.com/embed/${videoId}`
                    :
                    `https://player.vimeo.com/video/${videoId}?loop=false&amp;byline=false&amp;portrait=false&amp;title=false&amp;speed=true&amp;transparent=0&amp;gesture=media`
                    }
                    allowfullscreen
                    allowtransparency
                    allow="autoplay"
                    ></iframe>
                </div>
            </Container>
            {
                data.caption && <span className="caption">{data.caption}</span>
            }
        </>
    )
}