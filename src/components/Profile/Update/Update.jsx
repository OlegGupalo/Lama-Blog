import React from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { Button } from '@mui/material'
import { PhotoCamera } from '@mui/icons-material'

const StyledInput = styled(Button)`
    background-color: 
`

const DropContainer = styled("label")`
    position: relative;
    display: flex;
    gap: 10px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 10px;
    width: 120px;
    padding: 20px;
    background: #1565c0;
    border-radius: 10px;
    color: #444;
    cursor: pointer;
    transition: background .2s ease-in-out, border .2s ease-in-out;

    &:hover {
        color: white;
        background: #05489d;
        border-color: #111;
    }

    span {
        color: white;
        font-size: 15px;
        font-weight: bold;
        margin: 0px;
        text-align: center;
        transition: color .2s ease-in-out;
    }

`

const DropTitle = styled("span")`
    color: #444;
    font-size: 15px;
    font-weight: bold;
    margin: 0px;
    text-align: center;
    transition: color .2s ease-in-out;

    &:hover {
        color: white;
    }
`

let Update = ({
    onChange = () => {},
    uptAvatar = () => {}
}) => {
    const [ loaclValue, setLocalValue ] = React.useState('');
	const [ updateFlag, setUpdateFlag ] = React.useState(() => false);
	const onFile = React.useCallback((e) => {
		const reader = new FileReader();

		reader.readAsDataURL(e.target.files[0]);
		reader.addEventListener('load', (e) => {
			onChange({
				target: {
					value: e.target.result,
					currentValue: e.target.result,
				}
			});
			setLocalValue(e.target.result);
			setUpdateFlag(true);
		});
	}, [
		onChange,
		setLocalValue,
	]);
    
    return <div style={{marginLeft: '220px',marginTop: '3rem'}}>
            <DropContainer>
                <span>Обновить</span>
                <input 
                    id={`input-file`}
                    name='image'
                    type="file"
                    accept="image/png, image/jpeg"
                    onChange={onFile}
                    style={{display: 'none'}}
                />
            </DropContainer>
    </div>
}

Update = React.memo(Update)
export default Update