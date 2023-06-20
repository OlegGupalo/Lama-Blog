import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Box, Drawer, IconButton, ListItem, List, ListItemButton, Grid } from '@mui/material'
import { ChevronLeft, MenuOutlined, ClearAll, Close } from '@mui/icons-material'
import {TypographyText as Typography} from 'components/Typography'


const StyledListItemButton = styled(ListItem)`
    transition: all 0.2s ease-in-out;
    &:hover {
        background: white;
        color: #02173f;
    }
`

const Burger = () => {
    const [open, setOpen] = useState(false)

    const handleClose = () => {
        setOpen(false)
    }

    const handleOpen = () => {
        setOpen(true)
    }

    const lists = () => {
        return <React.Fragment>
            
        </React.Fragment>
    }

    return <React.Fragment>
        <IconButton 
            sx={{color: 'white'}}
            edge='start'
            onClick={handleOpen} 
        >
            <ClearAll />
        </IconButton>

        <Drawer
            anchor="left"
            variant="persistent"
            open={open}
            onClose={handleClose}
            sx={{
                '.MuiPaper-root': {
                    background: '#02173f',
                    color: 'white',
                }
            }}
        >
            <Box sx={{
                display: 'block',
                textAlign: 'right',
                color: 'white',
                cursor: 'pointer',
                margin: '1rem 1rem 0 0'
            }} color='error' onClick={handleClose}>
                <Close />
            </Box>
            <Grid xs={4} md={8}>
                <Grid xs={4} md={8}>
                    <StyledListItemButton>
                        <ListItemButton 
                            component={Link} 
                            to={'/'} onClick={handleClose}>
                            <Typography>
                                Главная
                            </Typography>
                        </ListItemButton>
                    </StyledListItemButton>
                    <StyledListItemButton>
                        <ListItemButton component={Link} to={'/news'} onClick={handleClose}>
                            <Typography>
                                Статьи
                            </Typography>
                        </ListItemButton>
                    </StyledListItemButton>
                    <StyledListItemButton>
                        <ListItemButton component={Link} to={'/chat'} onClick={handleClose}>
                            <Typography>
                                Общий чат
                            </Typography>
                        </ListItemButton>
                    </StyledListItemButton>
                </Grid>
            </Grid>
        </Drawer>
    </React.Fragment>
}

export default Burger