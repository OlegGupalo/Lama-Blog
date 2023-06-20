import React, { useEffect } from 'react';
import styled from 'styled-components'
import {Box, Grid, useMediaQuery} from  '@mui/material'
import Loader from 'components/Loader';
import { Scrollbar } from 'react-scrollbars-custom';

const Item = styled("div")`
    flex: 0 1 100%;
    position: relative;
    padding: 1vw;
    background-color: rgba(0, 0, 0, 0.9);
    color: white;
    cursor: pointer;
    display: flex;
    span {
        font-size: 0.725rem;
        text-transform: uppercase;
    }

    p {
        font-size: 0.75rem;
    }


    img {
        object-fit: cover;
        width: 44px;
        height: 100%;
    }
`

const MainPosts = ({
    data = []
}) => {
    const isMobile = useMediaQuery('(max-width:600px)')
    console.log("isMobile", isMobile)
    
    return <React.Fragment>
        <div style={{
        position: 'absolute',
        left: 0,
        bottom: `${isMobile ? '-270px' : '0px'}`,
        width: '100%',
    }}>
        
            {(Array.isArray(data))
            ? isMobile 
                ? <Scrollbar style={{ width: '100%', height: '250px' }}>
                    <Box sx={{ display: 'flex' }}>
                        {data.length > 0
                            ? data.map((item, key) => (
                                <Item key={key} sx={{width: '100%'}}>
                                  <div style={{}}>
                                    <img src={`http://localhost:4200/files/${item.image}`} />
                                  </div>
                                  <div style={{ width: '100%', paddingLeft: '0.5vw' }}>
                                    <span>{item.title}</span>
                                    <p>{!item.description.length ? 'Какой-то description' : item.description}</p>
                                  </div>
                                </Item>
                              ))
                            : <React.Fragment></React.Fragment>
                        }
                    </Box>
                </Scrollbar>
                : <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                }}>
                    {data.length > 0
                        ? (data.map((item, key) => 
                        <Item key={key}>
                        <div style={{
                            }}>
                                <img src={`http://localhost:4200/files/${item.image}`} />
                            </div>
                            <div style={{
                                width: '100%',
                                paddingLeft: '0.5vw'
                            }}>
                                <span>{item.title}</span>
                                <p>{!item.description.length ? 'Какой-то description' : item.description}</p>
                            </div>
                        </Item>
                        ))
                        : <React.Fragment></React.Fragment>
                    }
                </Box> 
                
            : <Loader visible={!Array.isArray(data)} />
        }
            
            
            
    </div>
    </React.Fragment>
}

export default MainPosts