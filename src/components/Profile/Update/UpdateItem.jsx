import React, { useState } from 'react'
import styled from 'styled-components'
import Update from './Update'
import { Avatar, Button } from '@mui/material'
import { TypographyText as Typography } from 'components/Typography'

const StyledFlex = styled("div")`
    
    display: flex;
    gap: 40px;
    width: 100%;
    height: 300px;
    padding: 25px 0px 0px 40px;
    box-sizing: border-box;
`

const StyledInput = styled("input")`
    height: 25px;
    border: 0px;
    background-color: #ededed;
    font-family: 'Montserrat', sans-serif;
    width: 100%;
    border-bottom: 1px solid black;

    &:focus {
        outline: none;
    }
`

const StyledResponsiveButton = styled(Button)`
    position: relative;
    left: 195px;
    bottom: 50px;
    font-family: 'Oswald', sans-serif !important;
    width: 150px;
    height: 50px;
    border-radius: 10px !important;
    font-size: 15px !important;
    font-weight: 600 !important;
    margin: 0px !important;
`

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
                <div>
                <Avatar
                    sx={{width: 160, height: 160}}
                    src={!!image ? `http://localhost:4200/files/avatars/${image}` : ''}
                />
                    <Update onChange={e => updateAvatar(e.target)} />
                    <StyledResponsiveButton 
                        variant='outlined' 
                        color='error'
                        onClick={handleEdit}>
                            Отмена
                    </StyledResponsiveButton>
                </div>
                <div style={{width: '70%'}}>
                    <StyledInput 
                        onChange={changeInputName} 
                        value={usrname} />
                    <StyledInput 
                        onChange={changeInputEmail} 
                        value={eml} />
                    <Typography sx={{
                        marginTop: '0.5rem',
                        borderBottom: '1px solid black',

                    }}>Друзья: 0</Typography>
                    <Typography sx={{
                        marginTop: '0.5rem',
                        borderBottom: '1px solid black',

                    }}>Понравившиеся посты: 0</Typography>
                </div>
            </StyledFlex>
    </React.Fragment>
}

UpdateItem = React.memo(UpdateItem)
export default UpdateItem