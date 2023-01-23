import React from 'react'
import styled from 'styled-components'
import { ArrowBackIos, Close } from '@mui/icons-material'
import { 
    Button, 
    Dialog, 
    DialogActions, 
    DialogContent, 
    DialogContentText, 
    DialogTitle, 
    IconButton
} from '@mui/material'
import { TypographyText as Typography } from 'components/Typography'
import SignIn from 'components/Form/SignIn'

const StyledDialog = styled(Dialog)`
    position: relative;
    .MuiDialog-container {
        .css-twia2z-MuiPaper-root-MuiDialog-paper {
            border-radius: 0px !important;
            height: 512px !important;     
        }
    }
`

const StyledDialogTitle = styled(DialogTitle)`
    display: flex;
    alignItems: center;
    justify-content: space-between;
    span {
        padding: 8px;
        font-size: 20px;
        font-weight: 800;
        letter-spacing: 1.2px;
        font-family: 'Oswald', sans-serif !important;
        text-transform: uppercase;
    }
`

let DialogForm = ({
    visible,
    onClose
}) => {
    return <React.Fragment>
        <StyledDialog
            open={visible}
            onClose={onClose}
            maxWidth={'xs'}
            fullWidth>
            <StyledDialogTitle>
                <Typography component="span">Войти в lama</Typography>
                <IconButton onClick={onClose}>
                    <Close />
                </IconButton>

            </StyledDialogTitle>
            <DialogContent>
                <DialogContentText component={'span'}>
                    <SignIn change={visible} onClose={(item) => onClose(item)} />
                </DialogContentText>
                
            </DialogContent>
            
        </StyledDialog>
    </React.Fragment>
}

DialogForm = React.memo(DialogForm)
export default DialogForm