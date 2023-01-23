import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import axios from 'axios'
import {useSnackbar} from 'notistack'
import { fireListTest as actionApiTestGet } from 'components/Store/test/actions/lis/get';
import selectorMainExtract from 'components/Store/main/selectors/extract.js'
import { Avatar, Button, Container, Box } from '@mui/material'
import { TypographyText as Typography } from 'components/Typography'
import UpdateProfile from 'components/Form/Update/Profile'
import Loader from 'components/Loader'
import UpdateItem from './Update/UpdateItem'
import DialogMenu from './Followers/Dialog'
import Posts from './Personal'
import Update from './Update'
import './index.css'
import ProfileLayout from './ProfileLayout'

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

let Profile = () => {
    const {enqueueSnackbar} = useSnackbar()
    const navigate = useNavigate()
    const data = useSelector(selectorMainExtract(['test', 'list', 'user', 'data']))
    const flag = useSelector(selectorMainExtract(['auth']))
    const personalPosts = useSelector(selectorMainExtract(['personal', 'private', 'data']))

    const [editFlag, setEditFlag] = useState(false)
    const [test, setTest] = useState(false)
    const handleEdit = (e) => {
        setEditFlag((currentState) => !currentState)
    }
    console.log("profile", data)
    const token = localStorage.getItem('token')
    useEffect(() => {
        if(token) return;
        else navigate('/')
    }, [token, navigate])

    useEffect(() => {
        actionApiTestGet({
            section: 'user',
            url: `http://localhost:4200`
        })(enqueueSnackbar)
        console.log("reload page user")
    }, [enqueueSnackbar, actionApiTestGet])

    return <React.Fragment>
    {data === null || data === undefined
        ? <Loader />
        : <div>
            <div style={{position: 'relative'}}>
                <StyledBack />        
            </div>
            <div style={{backgroundColor: '#ededed', position: 'relative'}}>
            {/*<Typography variant='h3' sx={{textAlign: 'center', fontFamily: 'Oswald, sans-serif !important'}}>
                {editFlag ? 'Редактирование профиля' : 'Профиль'}
            </Typography>*/}
            
                {editFlag
                    ? <UpdateProfile 
                        handleEdit={handleEdit}
                        data={data} />
                    : <ProfileLayout
                        avatar={data.image}
                        username={data.username}
                        email={data.email}
                        followers={data.followers}
                        following={data.followedUsers}
                        buttonAction={handleEdit}
                        buttonActionName={'Редактировать'}
                    />
                    // <Box sx={{
                    //     display: 'flex',
                    //     justifyContent: 'space-around',
                    //     alignItems: 'center'
                    // }}>
                    //     <StyledFlex>
                    //         <div style={{
                    //             display: 'flex',
                    //         }}>
                    //         <Box sx={{
                    //             padding: '5px',
                    //             zIndex: 99,
                    //             backgroundColor: "#ededed",
                    //             borderRadius: '50%',
                    //             position: 'absolute',
                    //             top: '-100px', 
                    //         }}>
                    //             <Avatar
                    //                 sx={{
                    //                     width: 200, 
                    //                     height: 200, 
                                        
                    //                 }}
                    //                 src={!!data.image ? `http://localhost:4200/files/avatars/${data.image}` : ''}
                    //             />
                    //         </Box>
                                
                            
                    //             <div className='information-profile'>
                    //                 <StyledName variant='h1' >{data.username}</StyledName>
                    //                 <Typography sx={{
                    //                     marginBottom: '0.5rem',
                    //                     fontSize: '0.73rem'
                    //                 }}>Почта: {data.email}</Typography>
                    //             </div>
                    //         </div>
                    //         <div style={{height: '71px', paddingTop: '16px',marginLeft: '10px', display: 'flex', justifyContent: 'space-around'}}>
                    //             <DialogMenu followedUsers={data.followers}>
                    //                 {data.followers.followersCount}
                    //                 <span className='followersInfo'>
                    //                     Подписчики
                    //                 </span>
                    //             </DialogMenu>
                    //             <DialogMenu followedUsers={data.followedUsers}>
                    //                 {data.followedUsers.followedByYourFollowedCount}
                    //                 <span className='followersInfo'>
                    //                     Подписки
                    //                 </span>
                    //             </DialogMenu>
                    //         </div>
                    //     </StyledFlex>
                    //     <StyledResponsiveButton 
                    //         variant='contained' 
                    //         onClick={handleEdit}
                    //         sx={{}}>
                    //             Редактировать
                    //     </StyledResponsiveButton>
                    // </Box>
                }
            
            </div>
         
        <Typography variant='h3' sx={{
            fontFamily: 'Oswald, sans-serif !important', 
            letterSpacing: '5px', 
            textAlign: 'center',
            margin: '2rem 0'
        }}>Ваши посты</Typography>
        <Posts username={data.username} />
        </div>
    }
    </React.Fragment>
}

Profile = React.memo(Profile)
export default Profile