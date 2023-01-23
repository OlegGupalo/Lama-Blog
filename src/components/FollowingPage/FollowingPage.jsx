import React, { useEffect, useState } from "react"
import axios from "axios"
import styled from "styled-components"
import { useSnackbar } from "notistack"
import { useSelector } from "react-redux"
import { useParams, useNavigate } from "react-router-dom"
import selectorMainExtract from 'components/Store/main/selectors/extract.js';
import { fireListTest as actionApiTestGet } from 'components/Store/test/actions/lis/get';
import { fireFollowingGet as actionFollowingGet} from "components/Store/following/actions/get"
import { firePersonalGet } from 'components/Store/personal/actions/get'
import Private from './Private'
import Loader from "components/Loader"
import Posts from 'components/Profile/Personal'
import DialogMenu from 'components/Profile/Followers/Dialog'
import ProfileLayout from 'components/Profile/ProfileLayout'
import { TypographyText as Typography } from "components/Typography"
import { Avatar, Box, Button } from "@mui/material"

const StyledBack = styled("div")`
    background-image: url("https://res.cloudinary.com/teepublic/image/private/s--zJct6exc--/t_Preview/b_rgb:191919,c_lpad,f_jpg,h_630,q_90,w_1200/v1523194821/production/designs/2569807_0.jpg");
    background-position: center;
    background-position-y: 45%;
background-repeat: no-repeat;

    height: 350px;
    width: 100%;
`

const StyledName = styled(Typography)`
    font-weight: 600 !important;
    font-family: 'Josefin Sans', sans-serif !important;
    margin: 0px;
    font-size: 2.1rem !important;
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
    // left: calc(100% - 790px);
    // bottom: 50px;
    font-family: 'Oswald', sans-serif !important;
    // width: 150px;
    height: 50px;
    border-radius: 0px !important;
    font-size: 15px !important;
    font-weight: 600 !important;
    margin-left: 15px !important;
`

const StyledFlex = styled("div")`
    
    display: flex;
    align-items: center;
    // gap: 40px;
    // width: 100%;
    // height: 300px;
    // padding: 25px 0px 0px 40px;
    // box-sizing: border-box;
`


let FollowingPage = () => {
    const navigate = useNavigate()
    const {username} = useParams('username')
    const data = useSelector(selectorMainExtract(['following', 'data']))
    const loader = useSelector(selectorMainExtract(['following', 'loader']))
    const {enqueueSnackbar} = useSnackbar()
    const currentUsername = useSelector(selectorMainExtract(['test', 'list', 'user', 'data']))
    
    console.log('DATA', data)

    useEffect(() => {
        if(currentUsername) {
            if(currentUsername.username === username) {
                return navigate('/profile')
            }
        }
        actionFollowingGet({
            username: username,
        })(enqueueSnackbar)
    }, [
        enqueueSnackbar,
        navigate
    ])
    

    const follow = React.useCallback(async (username) => {
        try {
            const token = localStorage.getItem('token')

            const request = await axios.post(`http://localhost:4200/api/${username}/follow`, {}, {
                headers: {
                    'Authorization': `Token ${token}`
                }
            })
            actionFollowingGet({
                username: username,
            })(enqueueSnackbar)
            actionApiTestGet({
                section: 'user',
                url: `http://localhost:4200`
            })(enqueueSnackbar)
            
        } catch (err) {
            const errorMessage = err.response
            ? (err.response.data
                ? err.response.data.message || (err.response.data.error
                    ? err.response.data.error.text
                    : err.message)
                : err.message)
            : err.message

            enqueueSnackbar(`${errorMessage} - ${'http://localhost:4200 '}`, {variant: 'error'})
        
        }
    }, [username])


    const unfollow = React.useCallback(async (username) => {
        try {
            const token = localStorage.getItem('token')

            const request = await axios.delete(`http://localhost:4200/api/${username}/unfollow`, {
                headers: {
                    'Authorization': `Token ${token}`
                }
            })
            actionFollowingGet({
                username: username,
            })(enqueueSnackbar)
            actionApiTestGet({
                section: 'user',
                url: `http://localhost:4200`
            })(enqueueSnackbar)

            
        } catch (err) {
            const errorMessage = err.response
            ? (err.response.data
                ? err.response.data.message || (err.response.data.error
                    ? err.response.data.error.text
                    : err.message)
                : err.message)
            : err.message

            enqueueSnackbar(`${errorMessage} - ${'http://localhost:4200 '}`, {variant: 'error'})
        
        }
    }, [username])


    if(!loader) {
        return <Loader visible={!loader} />
    }
    return <div>
    <div style={{position: 'relative'}}>
        <StyledBack />        
    </div>
        <Box sx={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center'
        }}>
            <StyledFlex>
                <div style={{
                    display: 'flex',
                }}>
                <Box sx={{
                    padding: '5px',
                    zIndex: 99,
                    backgroundColor: "#ededed",
                    borderRadius: '50%',
                    position: 'absolute',
                    top: '250px', 
                }}>
                    <Avatar
                        sx={{
                            width: 200, 
                            height: 200, 
                            
                        }}
                        src={!!data.image ? `http://localhost:4200/files/avatars/${data.image}` : ''}
                    />
                </Box>
                    
                
                    <div className='information-profile'>
                        <StyledName variant='h1' >{data.username}</StyledName>
                        <Typography sx={{
                            marginBottom: '0.5rem',
                            fontSize: '0.73rem'
                        }}>Почта: {data.email}</Typography>
                    </div>
                </div>
                <div style={{height: '71px', paddingTop: '16px',marginLeft: '10px', display: 'flex', justifyContent: 'space-around'}}>
                    <DialogMenu followedUsers={data.followers}>
                        {data.followers.followersCount}
                        <span className='followersInfo'>
                            Подписчики
                        </span>
                    </DialogMenu>
                    <DialogMenu followedUsers={data.followedUsers}>
                        {data.followedUsers.followedByYourFollowedCount}
                        <span className='followersInfo'>
                            Подписки
                        </span>
                    </DialogMenu>
                </div>
            </StyledFlex>
            {data.isFollowingUser
                ? <StyledResponsiveButton 
                    variant='contained' 
                    color='error'
                    onClick={(e) => {
                        e.preventDefault()
                        unfollow(data.username)
                    }}>
                        Отписаться
                </StyledResponsiveButton>
                : <StyledResponsiveButton 
                    variant='contained'
                    color='success'
                    onClick={(e) => {
                        e.preventDefault()
                        follow(data.username)
                    }}>
                        Подписаться
                </StyledResponsiveButton>
            }
        </Box>
        <Box sx={{
            marginTop: '90px'
        }}>
        <Typography align="center" mb={1} variant='h3'>Публикации</Typography>
            <Private />
        </Box>
    </div>
}
FollowingPage = React.memo(FollowingPage)
export default FollowingPage