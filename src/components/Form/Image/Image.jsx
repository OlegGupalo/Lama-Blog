import React, { useCallback, useEffect, useState } from "react"
import Image from "mui-image";
import Link from "components/Link";
import { PhotoCamera } from "@mui/icons-material";
import { TypographyText } from "components/Typography";
import { Box, Button, TextField, Typography } from "@mui/material"

let ImageTool = ({
    name,
	label, 
	helperText,
	value,
	defaultValue,
	onChange = () => {},
	onLoad = () => {},
	onGetFile = () => {}
}) => {
    const [ loaclValue, setLocalValue ] = React.useState(() => value || defaultValue || '');
	const [ updateFlag, setUpdateFlag ] = React.useState(() => false);
	const onFile = React.useCallback((e) => {
		const reader = new FileReader();

		reader.readAsDataURL(e.target.files[0]);
		reader.addEventListener('load', (e) => {
			setLocalValue(e.target.result);
			onGetFile(e.target.result);
			setUpdateFlag(true);
		});
		onLoad(e.target.files[0])

	}, [
		onChange,
		setLocalValue,
	]);

    

    
    return <React.Fragment>
	
        <Box>
			{label
				? <Box pb={helperText
					? 1
					: 2}>
					<Typography
						component="div"
						variant="h6">
						{label}
					</Typography>
				</Box>
				: <React.Fragment />}
			
			{helperText
				? <Box pb={2}>
					<TypographyText variant='h3'>
						{helperText}
					</TypographyText>
				</Box>
				: <React.Fragment />}
			<Box pb={2}>
				<Button
					disableElevation
					component="label"
					variant="contained"
					color="primary"
					endIcon={<PhotoCamera />}
					>
					Выбрать файл
					<input 
						id={`input-file-${name}`}
						name='image'
						type="file"
						accept="image/png, image/jpeg"
						onChange={onFile}
						style={{
							display: 'none',
						}} />
				</Button>
			</Box>
			{loaclValue 
			? <Image
				src={loaclValue}
				duration={500}
				fit="cover"
				height="420px"
				width="100%"
			/>
			: <Image
				src={updateFlag ? loaclValue : ''}
				duration={3000}
				fit="cover"
				height="420px"
				width="100%"
			/>
			}
		</Box>
    </React.Fragment>
}

ImageTool = React.memo(ImageTool)
export default ImageTool