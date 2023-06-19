import React, { useEffect } from 'react'
import axios from 'axios'
import ImageTool from '../Image'
import ReactEditor from './utils/Editor'
import { Box, Button, Tab } from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { SaveOutlined } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { StyledInput } from '../SignIn/SignIn'

const postDefaultValue = () => ({ id: 0, created_at: new Date(), nb_views: 0 });


let CreateNews = ({
    dataImage,
    image = '',
    onClicks = () => {},
    onGetFile = () => {}
}) => {
    const navigate = useNavigate()
    const [value, setValue] = React.useState('1');
    const [dataText, setDataText] = React.useState(null)
    const [imageSave, setImageSave] = React.useState(null)
    const [title, setTitle] = React.useState('')
    console.log(dataText)
    console.log(imageSave)
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    // const onSaved = (e) => {
    //     e.preventDefault()
    //     console.log("e", e)
    //     onClicks(e.target.elements['image'].files[0])
    // }
    const token = localStorage.getItem('token')

    const onSubmit = (e) => {
      
      e.preventDefault()
      const payload = new FormData()
      payload.append('title', title)
      payload.append('body', JSON.stringify(dataText))
      payload.append('image', imageSave)

      axios.post('http://localhost:4200/api/articles', payload, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }).then(response => navigate('/news'))
      
  }

    useEffect(() => {
        if(token) return;
        else navigate('/')
    }, [token, navigate])


    return <Box sx={{ width: '100%', typography: 'body1', marginTop: '4.25rem' }}>
        <StyledInput 
          fullWidth sx={{margin: '1.5rem 0'}} 
          type='text'
          value={title}
          onChange={e => setTitle(e.target.value)} 
          placeholder='Заголовок' />

        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange}>
              <Tab label="Изображение статьи" value="1" />
              <Tab label="Ваша статья" value="2" />
            </TabList>
          </Box>
      <form onSubmit={onSubmit}>
          <TabPanel value="1">
          
              <ImageTool 
                name="image"
                helperText={"Превью изображения"} 
                value={image} 
                onGetFile={file => onGetFile(file)} 
                onLoad={file => setImageSave(file)}
              />
          
          </TabPanel>
          <TabPanel value="2">
              <ReactEditor onGetText={e => setDataText([e.blocks])} />
          </TabPanel>
        <Button type="submit" variant='contained' fullWidth>Создать</Button>

      </form>
        
        </TabContext>
        
    </Box>
}

CreateNews = React.memo(CreateNews)
export default CreateNews