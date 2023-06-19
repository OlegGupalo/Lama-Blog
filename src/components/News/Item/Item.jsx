import React, { useEffect, useRef, useState } from 'react'
import Image from 'mui-image';
import styled from 'styled-components';
import { Link as RouterLink} from 'react-router-dom';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import { StyledTypography } from 'components/Content/Content';
import { fireListCurrent } from 'components/Store/current/actions/get';
import StyledWrapped from '../StyledWrapped';
import { Box, Button, Grid, Link, Paper } from '@mui/material';
import {TypographyText as Typography} from 'components/Typography'
import './index.css'

const StyledPosAbsol = styled("div")`
    position: absolute;
    bottom: 18px;
    left: 30px;

    a {
        color: white !important;
        text-decoration: none;
        font-weight: 600;
        font-family: 'Josefin Sans', 'Montserrat', sans-serif !important;
    }

`

let Item = ({
    item,
    index
}) => {

    const [isBooped, setIsBooped] = useState(false);
    const nodeRef = useRef(null)

    let rotation = 0, timing = 800

    const style = {
        display: 'inline-block',
        backfaceVisibility: 'hidden',
        bottom: 0,
        top: 0,
        bottom: 0,
        right: 0,
        height: '100%',
        transition: `all ${timing}ms`,
    };

    const enter = () => {
        setIsBooped(true);
    };

    const leave = () => {
        setIsBooped(false);
    };

    console.log(item[index])

    return <>
        {/*<Image 
            src={`http://localhost:4200/files/${item[index].image}`}
            duration={3000}
            fit="cover"
            height="372px"
            width="100%"
            distance="100px"
            style={{
                borderRadius: '4px',
            }}
        />*/}
        <div style={{
            backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0), #000000), url(http://localhost:4200/files/${item[index].image})`,
            height: '372px',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
        }}></div>
        <StyledPosAbsol>
            <Typography variant='h6' component={RouterLink} to={`${item[index].slug}`}>
                {item[index].title}
            </Typography>
            <span>{item[index].description}</span>
                                    
        </StyledPosAbsol>
        {/* <Grid item md={4} 
            onMouseEnter={enter}
            onMouseLeave={leave}
            sx={{
                margin: '35px 0 0 0',
                textAlign: 'center',
                position: 'relative',
                
            }}>
                <Typography sx={{
                    position: 'absolute',
                    top: '4px',
                    left: '4px'
                }}>Text</Typography>
                
                    <img
                        src='http://localhost:4200/files/1640759581_08316.jpg'
                        style={{
                            display: 'block',
                            width: '100%',
                            margin: 'auto',
                            
                        }}
                    />
                <StyledWrapped style={isBooped ? style : {
                    transition: `all ${timing}ms`,

                }}>
                <Typography 
                    variant='h5'
                    >
                    <Button component={Link} to={`/news/${item.slug}`}>
                        {item.title}
                    </Button>
                </Typography>
                {<CSSTransition
                    in={isBooped}
                    appear
                    unmountOnExit
                    classNames="transition"
                    timeout={300}

                >
                    <div>
                    {
                    item.body.map(t => 
                           t.data && <p style={{
                                textAlign: 'center',

                            }} dangerouslySetInnerHTML={{__html: (() => {
                                const sliced = (t.data.text || '').slice(0, 50);

                                return (sliced.length < t.data.text.length)
                                    ? (sliced +'...')
                                    : sliced;
                            })()}} />
                    )
                }
                    </div>
                </CSSTransition>}
                </StyledWrapped>
            </Grid> */}
    </>
}

Item = React.memo(Item)
export default Item