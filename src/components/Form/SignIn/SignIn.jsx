import React, { useCallback, useEffect, useState } from "react"
import styled from "styled-components";
import { useSnackbar } from "notistack";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { 
	Box, 
	Button, 
	Checkbox, 
	FormControlLabel, 
	TextField
} from "@mui/material"
import Item from "./Item";
import Link from "components/Link";
import Loader from "components/Loader";
import { TypographyText as Typography } from "components/Typography";
import selectorMainExtract from 'components/Store/main/selectors/extract.js';
import { fireProp as actionAuthProp } from "components/Store/auth/actions/prop";
import { fireLogin as actionAuthLogin} from "components/Store/auth/actions/login";
import { fireListTest as actionApiTestGet } from 'components/Store/test/actions/lis/get';
import { fireProp } from "components/Store/auth/actions/prop";
import Registration from './Registration'
import Login from './Login'

export const StyledInput = styled(TextField)`
	.css-md26zr-MuiInputBase-root-MuiOutlinedInput-root {
		border-radius: 0px !important;
		font-family: 'Montserrat', sans-serif !important;
		transition: all 0.2s ease;
		padding-left: 8px;
	}

	.css-md26zr-MuiInputBase-root-MuiOutlinedInput-root:hover {
		background-color: #dfdfdf;
	}
`

const StyledControlLabel = styled(FormControlLabel)`
.css-ahj2mt-MuiTypography-root {
	font-family: 'Montserrat', sans-serif !important;

}
`

const StyledBoxActions = styled(Box)`
	position: relative;
	top: 2.25rem;
	display: flex;
	justify-content: space-between;
`

const StyledButton = styled(Button)`
	width: 157px !important;
	height: 48px !important;
	border-radius: 0px !important;
	font-family: 'Oswald', sans-serif !important;
	font-weight: 800 !important;
	font-size: 1rem !important;
`

const StyledButtonLink = styled(Button)`
	border-radius: 0px !important;
	font-family: 'Oswald', sans-serif !important;
	font-weight: 800 !important;
	background-color: #00D0C8 !important;
	color: #202020 !important;
`

const StyledBottomActions = styled("div")`
	background-color: rgb(241 241 241);
	margin-top: calc(100% - 270px);
	display: flex;
	justify-content: space-around;
	align-items: center;
`

let SignIn = ({ 
	change,
	onClose = () => {}
}) => {
	const navigate = useNavigate()
	const { enqueueSnackbar } = useSnackbar()
	const [visible, setVisible] = useState(() => false)
	const [choice, setChoice] = useState('login')
	const loader = useSelector(selectorMainExtract([ 'auth', 'loader' ]))
	const error = useSelector(selectorMainExtract([ 'auth', 'error' ])) ?? {}
	const email = useSelector(selectorMainExtract(['auth', 'email'])) ?? ''
	const password = useSelector(selectorMainExtract(['auth', 'password'])) ?? ''
    const data = useSelector(selectorMainExtract(['test', 'list', 'user', 'data']))
    const flagData = useSelector(selectorMainExtract(['auth']))
	
	const onEmail = React.useCallback((e) => {
		actionAuthProp('email', e.target.value)()
	},[])

	const onPassword = React.useCallback((e) => {
		actionAuthProp('password', e.target.value)()
	},[])

	const onVisible = React.useCallback(() => {
		setVisible((currentState) => !currentState);
	}, [
		setVisible,
	])


	const onSignIn = React.useCallback((e) => {
		e.preventDefault()
			actionAuthLogin(navigate)(enqueueSnackbar)
			
			onClose(!change)
	}, [
		enqueueSnackbar,
		navigate,
		loader
	])

	console.log('error',error)

	return <React.Fragment>
	{choice === 'login'
		? <Login 
				setChoice={choice => setChoice(choice)} 
				onClose={onClose}
				change={change}
			/>
		: <React.Fragment />
	}
	{choice === 'registration'
		? <Registration 
				setChoice={choice => setChoice(choice)} 
				onClose={onClose}
				change={change}
			/>
		: <React.Fragment />
	}
		
	</React.Fragment>;
};

SignIn = React.memo(SignIn)
export default SignIn