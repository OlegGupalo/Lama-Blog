import React from 'react'
import { Link as RouterLink} from 'react-router-dom';
import { 
    AddCircle, 
    Create, 
    LogoutOutlined, 
    PersonAdd, 
    Settings, 
    WifiProtectedSetup
} from '@mui/icons-material';
import { 
    Avatar, 
    Button, 
    Divider, 
    Link, 
    ListItemIcon, 
    Menu, 
    MenuItem, 
Tooltip } from '@mui/material'

let MenuParent = ({
    children,
    onLogout = () => {}
}) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return <React.Fragment>
        <Tooltip title='Settings'>
        <Button
            
            onClick={handleClick}
            size="small"
            sx={{ ml: 2, width: '167px',borderRadius: '0px',
            backgroundColor: 'rgba(101 101 101 / 25%) !important' }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
        >
            {children}
        </Button>
        </Tooltip>
        
        <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            borderRadius: '0px',
            '& .MuiAvatar-root': {
              width: 40,
              height: 40,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem component={RouterLink} to='/profile'>
              <Avatar /> Профиль          
        </MenuItem>
        
        <Divider />
        <MenuItem component={RouterLink} to='/create'>
            <ListItemIcon>
                <Create fontSize='small' />
          </ListItemIcon>
          Создать пост
        </MenuItem>
        <MenuItem onClick={onLogout}>
            <ListItemIcon>
                <LogoutOutlined fontSize="small" />
            </ListItemIcon>
          Выйти
        </MenuItem>
      </Menu>
    </React.Fragment>

}

MenuParent = React.memo(MenuParent)
export default MenuParent