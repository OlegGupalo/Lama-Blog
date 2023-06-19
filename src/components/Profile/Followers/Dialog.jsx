import * as React from 'react';
import axios from "axios"
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Link as RouterLink } from 'react-router-dom'
import { Avatar, Button, Container, Box, Divider } from '@mui/material'
import {TypographyText as Typography} from 'components/Typography'
import { useSnackbar } from "notistack"
import { fireFollowingGet as actionFollowingGet} from "components/Store/following/actions/get"
import './index.css' 

function stringAvatar(name) {
    return {
      children: `${name.split(' ')[0][0]}`,
    };
  }



let DialogMenu = ({
	followedUsers,
  children
}) => {
	console.log("children", children)
	const {enqueueSnackbar} = useSnackbar()
	const [open, setOpen] = React.useState(false);
	const [scroll, setScroll] = React.useState('paper');

	const handleClickOpen = (scrollType) => () => {
		setOpen(true);
		setScroll(scrollType);
	};
	const unfollow = async (username) => {
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
	const handleClose = () => {
		setOpen(false);
	};

	console.log("followers", followedUsers)
	
	const descriptionElementRef = React.useRef(null);
	
	React.useEffect(() => {
		if (open) {
			const { current: descriptionElement } = descriptionElementRef;
			if (descriptionElement !== null) {
				descriptionElement.focus();
			}
		}	
	},[open]);

	  return (
		    <div>
		      <Typography sx={{
		      	cursor: 'pointer',
		      	textAlign: 'center',
		      	letterSpacing: '1.5px',
		      	marginLeft: '15px'
		      }}onClick={handleClickOpen('paper')}>{children}</Typography>
		      <Dialog

		        open={open}
		        onClose={handleClose}
		        scroll={scroll}
		        fullWidth
		        aria-labelledby="scroll-dialog-title"
		        aria-describedby="scroll-dialog-description"
		      >
	        <DialogTitle id="scroll-dialog-title">{children[1].props.children}</DialogTitle>
	        <DialogContent 
						className='image'
	         dividers={scroll === 'paper'}>
	         
          		{followedUsers.item.map((item, key) => {
          			if(item.user) {
          				return <DialogContentText
	            		id="scroll-dialog-description"
	            		key={key}
	            		ref={descriptionElementRef}
	            		sx={{
	            			marginTop: '1.5rem', 
	            		}}
	          		>
	          			<Box sx={{
	          				display: 'flex',
	          				paddingBottom: '15px' 
	          			}}>
	          			<div>
	          				<Avatar
		          				sx={{width: 100, height: 100}} 
		          				src={`http://localhost:4200/files/avatars/${item.user.image}`} 
												{...stringAvatar(item.user.image === '' ? item.user.username : '')}
	          				/>
	          			</div>
	          				<Box sx={{
	          					margin: '1rem 0rem 0rem 1rem'
	          				}}>
		          				<Typography component={RouterLink} to={`/profile/${item.user.username}`} variant='span' sx={{
			          				fontWeight: '600',
			          				color: "black",
			          				textDecoration: 'none',
			          				fontFamily: "'Josefin Sans', sans-serif !important",
			          				fontSize: '25px',
			          			}} onClick={handleClose}>
				          			{item.user.username}          				
			          			</Typography>
			       					<Typography sx={{
			       						fontFamily: "'Josefin Sans', sans-serif !important",
			       					}}>
			       						{item.user.email}
			       					</Typography>
	          				</Box>
		          				
	          			</Box>
	          			
	          		</DialogContentText>
          			}
          			if(item.target) {
          				return <DialogContentText
	            		id="scroll-dialog-description"
	            		key={key}
	            		ref={descriptionElementRef}
	            		sx={{
	            			marginTop: '1.5rem', 
	            		}}
	          		>
	          			<Box sx={{
	          				display: 'flex',
	          				paddingBottom: '15px' 
	          			}}>
	          			<div>
	          				<Avatar
		          				sx={{width: 100, height: 100}} 
		          				src={`http://localhost:4200/files/avatars/${item.target.image}`} 
												{...stringAvatar(item.target.image === '' ? item.target.username : '')}
	          				/>
	          			</div>
	          				<Box sx={{
	          					margin: '1rem 0rem 0rem 1rem'
	          				}}>
		          				<Typography component={RouterLink} to={`/profile/${item.target.username}`} variant='span' sx={{
			          				fontWeight: '600',
			          				color: "black",
			          				textDecoration: 'none',
			          				fontFamily: "'Josefin Sans', sans-serif !important",
			          				fontSize: '25px',
			          			}} onClick={handleClose}>
				          			{item.target.username}          				
			          			</Typography>
			       					<Typography sx={{
			       						fontFamily: "'Josefin Sans', sans-serif !important",
			       					}}>
			       						{item.target.email}
			       					</Typography>
	          				</Box>
		          				
	          			</Box>
	          			
	          		</DialogContentText>
          			}
          			

	          	})}
	        </DialogContent>
	        <DialogActions>
	          <Button sx={{
	          	fontFamily: "'Josefin Sans', sans-serif !important",
	          	textTransform: 'none',
	          	fontWeight: 600,fontSize: "20px", 
	          }} color='error' onClick={handleClose}>Cancel</Button>
	        </DialogActions>
	      </Dialog>
	    </div>
	  );

}

DialogMenu = React.memo(DialogMenu)
export default DialogMenu