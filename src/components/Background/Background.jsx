import styled from "styled-components"
import { Image } from "mui-image"

const StyledBackground = styled("img")`
    background: #000 url("https://images4.alphacoders.com/587/thumb-1920-587508.png");
    width: 100%;
`

const Background = ({ children }) => {
    return <>
        <StyledBackground>
            {children}
        </StyledBackground>
    </>
}

export default Background