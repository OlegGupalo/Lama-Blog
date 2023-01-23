import React from 'react'
import { useSelector } from 'react-redux'
import selectorMainExtract from 'components/Store/main/selectors/extract.js';
import { useEffect } from 'react';
import { fireListCurrent } from 'components/Store/current/actions/get';
import { Link, useParams } from 'react-router-dom';
import { TypographyText } from 'components/Typography';
import Image from 'mui-image';
import styled from 'styled-components';
import { fireFollowingGet } from 'components/Store/following/actions/get';
import { Avatar, Box, Button, Divider } from '@mui/material';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { fireFollowingPost } from 'components/Store/following/actions/follow';

const Unite = styled("div")`
    display: flex;
    height: 87px;
    align-items: center;
    position: relative;
`

const StyledInfoAuthor = styled("div")`
    display: flex;
    align-items: center;

    .info_section {
        margin-left: 0.5rem;
    }

    .name {
        text-decoration: none !important;
        color: black;
        font-weight: 600;
    }
    
`
const StyledFollowBtn = styled(Button)`
    height: 47px;
    background-color: #0f0f0f !important;
    text-transform: none !important;
    border-radius: 20px !important;
    font-weight: 600 !important;
`

let Slug = ({
}) => {
    const {slug} = useParams()
    const { enqueueSnackbar } = useSnackbar()
    const data = useSelector(selectorMainExtract(['current', 'data']))
    const auth = useSelector(selectorMainExtract(['test', 'list', 'user', 'data']))


    const follow = async (username) => {
        try {
            const token = localStorage.getItem('token')
    
            const request = await axios.post(`http://localhost:4200/api/profiles/${username}/follow`, {}, {
                headers: {
                    'Authorization': `Token ${token}`
                }
            })
            
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
}

    useEffect(() => {
        fireListCurrent({
            slug
        })()
    }, [])
    return <React.Fragment>
        {data
            
            ? <div>
                <Unite>
                {!!auth && auth.username === data.author.username
                    ? <React.Fragment>
                            <StyledInfoAuthor>
                                <Avatar
                                    src={`http://localhost:4200/files/avatars/${data.author.image}`}
                                    sx={{height: 60, width: 60}}
                                />
                                <div className='info_section'>
                                    <TypographyText 
                                            component={Link}
                                            to={`/profile`}
                                            className="name">
                                                {data.author.username}
                                            </TypographyText>
                                    <TypographyText sx={{
                                        fontSize: '0.775rem'
                                    }}>
                                        {data.author.followedUsers.length} followers
                                    </TypographyText>
                                </div>
                            </StyledInfoAuthor>
                        <Box sx={{
                            position: 'absolute',
                            right: 0
                        }}>
                            <TypographyText variant="overline" sx={{
                                color: 'grey',
                                fontSize: '0.8rem'
                            }}>
                                Ваш пост
                            </TypographyText>
                        </Box>
                    </React.Fragment>
                    : <React.Fragment>
                        <StyledInfoAuthor>
                            <Avatar
                                src={`http://localhost:4200/files/avatars/${data.author.image}`}
                                sx={{height: 60, width: 60}}
                            />
                            <div className='info_section'>
                                    <TypographyText 
                                        component={Link}
                                        to={`/profile/${data.author.username}`}
                                        className="name">
                                            {data.author.username}
                                    </TypographyText>
                                
                                <TypographyText sx={{
                                    fontSize: '0.775rem'
                                }}>
                                    {data.author.followedUsers.length} followers
                                </TypographyText>
                            </div>
                        </StyledInfoAuthor>
                    </React.Fragment>
                }
                </Unite>
                <Divider />
                
                <TypographyText variant='h2'>{data.title}</TypographyText>
                <Image
                    src={`http://localhost:4200/files/${data.image}`}
                    duration={500}
                    fit="cover"
                    height="500px"
                    width="100%"
                    distance="100px"
                />
                    {JSON.parse(data.body)[0].map((item,key) => {
                    if(item.type === 'header') {
                        return <h1 style={{
                            textAlign: 'center'
                        }} key={key}>{item.data.text}</h1>
                    }
                    if(item.type === 'paragraph') {
                        return <div key={key}>{item.data.text}</div>
                    }
                    if(item.type === 'list') {
                        return <ul>
                            {item.data.items.map((i, index) => {
                                return <li key={index}>{i}</li>
                            })}
                        </ul>
                    }
                    if(item.type === 'quote') {
                        return <q style={{
                            fontStyle: 'italic'
                        }}>
                            {item.data.text}
                        </q>
                    }
                })}
            </div>
            : <React.Fragment />
        }
    </React.Fragment>
}

Slug = React.memo(Slug)
export default Slug