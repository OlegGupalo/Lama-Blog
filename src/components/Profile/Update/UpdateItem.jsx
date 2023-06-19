import React, { useState } from 'react'
import styled from 'styled-components'
import Update from './Update'
import { Avatar, Button,Box } from '@mui/material'
import { TypographyText as Typography } from 'components/Typography'
import {StyledResponsiveButton} from 'components/Profile/ProfileLayout'
import '../index.css'

const StyledFlex = styled("div")`
    
    display: flex;
    justify-content: space-around;
    // gap: 40px;
    // width: 100%;
    // height: 300px;
    // padding: 25px 0px 0px 40px;
    // box-sizing: border-box;
`

const StyledInput = styled("input")`
    font-size: 1.5rem;
    display: block;
    font-weight: 600;
    background-color: #ededed;
    font-family: 'Montserrat', sans-serif;
    border: 0px;
    &:focus {
        outline: none;
    }
`

const StyledInputName = styled("input")`
    border: 0px;
    font-size: 2.1rem;
    font-weight: 600;
    background-color: #ededed;
    font-family: 'Montserrat', sans-serif;

    &:focus {
        outline: none;
    }
`

// const StyledResponsiveButton = styled(Button)`
//     position: relative;
//     left: 195px;
//     bottom: 50px;
//     font-family: 'Oswald', sans-serif !important;
//     width: 150px;
//     height: 50px;
//     border-radius: 10px !important;
//     font-size: 15px !important;
//     font-weight: 600 !important;
//     margin: 0px !important;
// `

let UpdateItem = ({
    username,
    email,
    image,
    handleEdit = () => {},
    handleUsername = () => {},
    handleEmail = () => {},
    updateAvatar = () => {}
}) => {
    const [usrname, setUsername] = useState(username)
    const [eml, setEmail] = useState(email)
    
    const changeInputName = (e) => {
        setUsername(e.target.value)
        handleUsername(e.target.value)
    }

    const changeInputEmail = (e) => {
        setEmail(e.target.value)
        handleEmail(e.target.value)
    }


    return <React.Fragment>
            <StyledFlex>
                <div style={{
                    
                }}>

                    <Box sx={{
                        padding: '5px',
                        zIndex: 99,
                        backgroundColor: "#ededed",
                        borderRadius: '50%',
                        position: 'absolute',
                        top: '-100px', 
                    }}>
                        <Avatar
                            sx={{
                                width: 200, 
                                height: 200, 
                                
                            }}
                            src={!!image ? `http://localhost:4200/files/avatars/${image}` : ''}
                        />
                    </Box>
                    
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-around',
                        alignItems: 'center'
                    }}>
                        
                        <Box className='information-profile'>
                            <div style={{padding: 0}}>
                                <StyledInputName 
                                    onChange={changeInputName} 
                                    value={usrname} />
                            </div>
                            <div>
                                <StyledInput 
                                    onChange={changeInputEmail} 
                                    value={eml} />
                            </div>
                        </Box>
                        <StyledResponsiveButton 
                            variant='contained' 
                            color='error'
                            sx={{
                                width: '140px'
                            }}
                            onClick={handleEdit}>
                                Отмена
                        </StyledResponsiveButton>
                    </Box>
                </div>
            </StyledFlex>
            <Update onChange={e => updateAvatar(e.target)} />
    </React.Fragment>
}

UpdateItem = React.memo(UpdateItem)
export default UpdateItem