import { Button, TextField } from "@mui/material"
import axios from "axios"
import { TypographyText } from "components/Typography"
import { useRef } from "react"
import { useState } from "react"

const CommentItem = ({
    id,
    updatePrevState = () => {},
}) => {
    const refScroll = useRef(null)
    const [text, setText] = useState('')
    const token = localStorage.getItem('token')
    const sendComment = async (e) => {
        e.preventDefault()
        try {
            await axios({
                url: `http://localhost:4200/api/${id}/comments`, 
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                data: {
                    content: text
                }    
            })
            const response = await fetch(`http://localhost:4200/api/${id}/comment`);
            const json = await response.json();
            updatePrevState(json)
            setText('')
            refScroll.current.scrollIntoView({behavior: 'smooth'})
        } catch(err) {
            console.error(err)
        }
    }

    return <div>
        <TypographyText sx={{textAlign: 'center', padding: '20px 0px 20px 0px'}} variant="h4">Вы можете оставить свой комментарий</TypographyText>
        <TextField multiline rows={4} value={text} onChange={e => setText(e.target.value)} variant="outlined" fullWidth placeholder="Введите комментарий" />
        <Button onClick={sendComment}>Оставить комментарий</Button>
        <div ref={refScroll}></div>
    </div>
}

export default CommentItem