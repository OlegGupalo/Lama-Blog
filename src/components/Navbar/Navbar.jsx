import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useSnackbar } from 'notistack';
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'
import Burger from 'components/Burger'
import Dialog from 'components/Dialog'
import Loader from 'components/Loader'
import MenuParent from 'components/Menu'
import { TypographyText as Typography} from 'components/Typography'
import { Pets, Search } from '@mui/icons-material'
import { AppBar, Avatar, Box, Button, IconButton, InputBase, Toolbar } from '@mui/material'
import selectApiExists from 'components/Store/api/selectors/exists.js'
import { fireProp as propUser} from 'components/Store/test/actions/lis/prop'
import selectorMainExtract from 'components/Store/main/selectors/extract.js';
import { fireProp as propPersonal} from 'components/Store/personal/actions/prop'
import { fireListTest as actionApiTestGet } from 'components/Store/test/actions/lis/get';
import { fireCurrent as actionApiCurrentGet } from 'components/Store/api/actions/current/get'
import 'components/News/Item/index.css'

const StyledAppBar = styled(AppBar)`
    background-color: rgba(0 0 0 / 80%) !important;
`

const StyledToolbar = styled(Toolbar)`
    display: flex;
    justify-content: space-between;

`

const StyledSearch = styled("div")`
    background-color: white;
    padding: 0 10px;
    border-radius: 10px;
    width: 40%;
`

function stringAvatar(name) {
    return {
      children: `${name.split(' ')[0][0]}`,
    };
  }

let Navbar = ({socket}) => {
    const navigate = useNavigate()
    const {enqueueSnackbar} = useSnackbar()
    const [state, setState] = useState(false)
    const [visible, setVisible] = useState(false)
    const apiExists = useSelector(selectApiExists())
    const data = useSelector(selectorMainExtract(['test', 'list', 'user', 'data']))
    const flagData = useSelector(selectorMainExtract(['test', 'list', 'user']))
    const flagAuth = useSelector(selectorMainExtract(['test', 'flag']))
    const loader = useSelector(selectorMainExtract(['test', 'list', 'user', 'loader']))
    const handleClickOpen = () => {
        setVisible(true);
    };

    const handleClose = () => {
        setVisible(false);
    };

    const handleOpen = () => {

    }

    const onLogout = React.useCallback(() => {
		localStorage.removeItem('token');

		propUser('user', '')();
        propPersonal('private', '')()
		// fireProp('flag', false)();
		navigate(`/`);
	}, [
		navigate,
	]);

    useEffect(() => {
        actionApiTestGet({
            section: 'user',
            url: `http://localhost:4200`
        })(enqueueSnackbar)
    }, [
        apiExists,
        enqueueSnackbar
    ])

    console.log(data)

    return <React.Fragment>
        <StyledAppBar>
            <StyledToolbar>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center'
                }}>
                    <Burger />
                    <Typography variant='h6' sx={{display: {xs: 'none', sm: 'block'}}}>Lama</Typography>

                </Box>

                <Pets sx={{display: {xs: 'block', sm: 'none'}}} />
                <CSSTransition
                    in={state}
                    appear
                    unmountOnExit
                    classNames='transition'
                    timeout={300}
                >
                    <StyledSearch sx={{
                        display: state ? 'block' : 'none'
                    }}><InputBase sx={{
                        display: state ? 'block' : 'none'
                    }} placeholder='Search...'/></StyledSearch>
                </CSSTransition>
                {data === null || data === undefined
                    ? <Box sx={{
                        display: 'flex',
                        justifyContent: 'align-center',
                        alignItems: 'center'
                    }}>
                        <IconButton sx={{color: 'white'}} onClick={() => setState(!state)}>
                            <Search />
                        </IconButton>
                        <Button onClick={handleClickOpen}>Log in / Sign up</Button>
                    </Box>
                    : <Box sx={{
                        display: 'flex',
                        justifyContent: 'align-center',
                        alignItems: 'center'
                    }}>
                        <MenuParent onLogout={onLogout}>
                            <Typography sx={{
                                color: 'white',
                                fontWeight: 800,
                                marginRight: '20px'
                            }}>{data.username}</Typography>
                            <Box>
                                <Avatar
                                    src={`http://localhost:4200/files/avatars/${data.image}`}
                                    {...stringAvatar(data.image === '' ? data.username : '')}
                                />
                            </Box>
                        </MenuParent>
                        
                    </Box>
                }
                
                
            </StyledToolbar>
        </StyledAppBar>
        <Dialog visible={visible} onClose={handleClose} />
    </React.Fragment>
}

export default Navbar