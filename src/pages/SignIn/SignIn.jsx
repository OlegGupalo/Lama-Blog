import React from "react"
import { Box, Grid, TextField } from "@mui/material"
import FormSignIn from "components/Form/SignIn"
import { useState } from "react"
import getStore from "components/Store"

let SignIn = () => {
    console.log(getStore())
    return <React.Fragment>
        <Box 
            position='fixed'
            top='0px'
            left='0px'
            width='100%'
            height='100%'>
            <Grid
                container
                justifyContent='center'
                alignItems='center'
                sx={{
                    height: '100%'
                }}>
                <Grid
					item
					xs={12}
					sm={10}
					md={8}
					lg={6}>
					<Box >
						<Box>
                            <FormSignIn />
						</Box>
					</Box>
				</Grid>
            </Grid>
        </Box>
    </React.Fragment>
}

SignIn = React.memo(SignIn)

export default SignIn