import { Typography } from "@mui/material"
import styled from "styled-components"

const TypogText = styled(Typography)`
    font-family: 'Montserrat', sans-serif !important;
`

export const TypographyText = ({
    children,
    ...props
}) => {
    return <>
        <TypogText {...props}>{children}</TypogText>
    </>
}