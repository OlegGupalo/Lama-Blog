import React from 'react'
import { Container } from '@mui/material'
import {Profile as ProfilePage} from 'components/Profile'
import styled from 'styled-components'

export const BackgroundAvatar = styled("div")`
    background: url("https://shikimori.one/assets/background/cartographer-3820675e1384f3b19db3a84589f82c666474e97c7300455468a94a1a3e041298.png");
    min-height: 100vh;
    display: grid;
`
const ContainerWioutPad = styled(Container)`
    padding-left: 0px !important;
    padding-right: 0px !important;
`

const Profile = () => {
    return <BackgroundAvatar>
        <ContainerWioutPad maxWidth="lg" sx={{
            backgroundColor: "#ededed",
            paddingBottom: '1rem'
        }}>
            <ProfilePage />
        </ContainerWioutPad>
    </BackgroundAvatar>
}

export default Profile