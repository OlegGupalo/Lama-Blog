import { Container } from "@mui/material"
import FollowingPage from "components/FollowingPage"
import { BackgroundAvatar } from "pages/Profile/Profile"
import React from "react"
import { useParams } from "react-router-dom"
import styled from 'styled-components'

const ContainerWioutPad = styled(Container)`
    padding-left: 0px !important;
    padding-right: 0px !important;
`

let Following = () => {
    return <BackgroundAvatar>
        <ContainerWioutPad maxWidth="lg" sx={{
            backgroundColor: "#ededed",
        }}>
            <FollowingPage />
        </ContainerWioutPad>
    </BackgroundAvatar>
}

Following = React.memo(Following)
export default Following