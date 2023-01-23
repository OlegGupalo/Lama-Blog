import React, { useState } from "react"
import axios from "axios"
import { Avatar, Button } from "@mui/material"
import UpdateItem from "components/Profile/Update/UpdateItem"
import { fireListTest as actionApiTestGet } from 'components/Store/test/actions/lis/get'

let UpdateProfile = ({
    data,
    handleEdit = () => {}
}) => {
    const [usernameData, setUsernameData] = useState(null)
    const [emailData, setEmailData] = useState(null)
    const [image, setImage] = useState(data.image)
    const [imageUpt, setImageUpt] = useState(null)

    const handleUsername = (name) => {
        setUsernameData(name)
    }

    const handleEmail = (email) => {
        setUsernameData(email)
    }

    const onSubmit = (e) => {
        e.preventDefault()
        const payload = new FormData()
        if(usernameData) payload.append('username', usernameData)
        if(emailData) payload.append('email', emailData)
        payload.append('image', e.target.elements['image'].files[0])
        let token = localStorage.getItem('token')
        axios.delete(`http://localhost:4200/files/avatars/${image}`, {
            headers: {
                'Authorization': `Token ${token}`
            }
        })
        axios.put('http://localhost:4200/api/user', payload, {
            headers: {
                'Authorization': `Token ${token}`
            }
        }).then(response => {
            actionApiTestGet({
                section: 'user',
                url: `http://localhost:4200`
            })()
        })
        
    }

    return <form onSubmit={onSubmit}>
        <UpdateItem 
            // updateAvatar={e => setAvatarUpt(e)} 
            // updateData={e => setDataObject(e)} 
            handleEdit={handleEdit} 
            handleUsername={handleUsername}
            handleEmail={handleEmail}
            updateAvatar={e => setImageUpt(e)}
            {...data} />
            <Button 
                sx={{borderRadius: '0px', fontFamily: 'Oswald, sans-serif'}}
                variant='contained' 
                color='success' 
                type='submit'
                fullWidth>
                    Сохранить
            </Button>
    </form>
}

UpdateProfile = React.memo(UpdateProfile)
export default UpdateProfile