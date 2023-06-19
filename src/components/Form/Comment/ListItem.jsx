import { Avatar, Grid, Paper } from "@mui/material"
import { TypographyText } from "components/Typography"
import { useState } from "react"
import { useEffect } from "react"
import TimeAgo from 'react-timeago'

const ListItem = ({comment}) => {
    

    console.log("DONE", comment)
    return <>
    <TypographyText variant="h3" sx={{textAlign: 'center', marginTop: '40px'}}>Комментарии</TypographyText>
    {comment
        ? comment.length > 0 ? comment.map(i => {
            return <Paper key={i.id} sx={{
                padding: '40px 20px',
                marginTop: '10px'
            }}>
                <Grid container wrap="nowrap" spacing={2}>
                    <Grid item>
                        <Avatar src={i.author.image !== null ? `http://localhost:4200/files/avatars/${i.author.image}` : ''} />
                    </Grid>
                    <Grid justifyContent="left" item xs zeroMinWidth>
                        <h4 style={{ margin: 0, textAlign: "left" }}>{i.author.username}</h4>
                        <p style={{ textAlign: "left" }}>
                        {i.text}
                        </p>
                        <p style={{ textAlign: "left", color: "gray" }}>
                            <TimeAgo date={i.createdAt} locale='ru' />
                        </p>
                    </Grid>
                </Grid>
            </Paper>
        })
        : <>Нет комментариев</>
        : <>Загрузка</>
    }
    </>
}

export default ListItem