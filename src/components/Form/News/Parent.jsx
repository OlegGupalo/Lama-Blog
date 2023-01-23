import React, { useState } from 'react'
import Image from 'mui-image'
import { Box, Button } from '@mui/material'
import CreateNews from './CreateNews'

let Parent = () => {

    const [localValue, setLocalValue] = useState(null)
    const [dataImage, setDataImage] = useState(null)
    const handleChange = (e) => {
        setLocalValue(e)
    }

    return <Box sx={{
        marginTop: '4.25rem'
    }}>
        <CreateNews 
            onClicks={e => setDataImage(e)} 
            onGetFile={handleChange} 
            image={localValue}
            dataImage={dataImage} 
        />
    </Box>
}

Parent = React.memo(Parent)
export default Parent