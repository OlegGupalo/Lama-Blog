import React, { useEffect } from 'react';
import styled from 'styled-components'
import {Box} from  '@mui/material'
import { useSnackbar } from 'notistack';
import selectorMainExtract from 'components/Store/main/selectors/extract.js';
import selectApiExists from 'components/Store/api/selectors/exists.js'
import { fireListGet as actionApiListGet } from 'components/Store/api/actions/list/get';
import Loader from 'components/Loader';

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
    
    return <React.Fragment>
        <div style={{
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: '66.7vw',
    }}>
        
            {(Array.isArray(data))
            ? <Box sx={{
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