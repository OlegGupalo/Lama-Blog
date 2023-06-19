import { useEffect } from "react";
import { useSnackbar } from "notistack"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import selectorMainExtract from 'components/Store/main/selectors/extract.js';
import { fireListCurrent } from "components/Store/current/actions/get";
import List from "./List";
import axios from "axios";
import { Avatar, Box, Button, Grid, Paper, TextField, TextareaAutosize } from "@mui/material";
import { TypographyText } from "components/Typography";
import styled from 'styled-components'
import CommentItem from "./CommentItem";


let Comment = ({
    updatePrevState = () => {}
}) => {
    const {slug} = useParams()
    const { enqueueSnackbar } = useSnackbar()
    const data = useSelector(selectorMainExtract(['current', 'data']))

    useEffect(() => {
        fireListCurrent({
            slug
        })()
    }, [slug])
    return <Box sx={{marginBottom: '90px', marginTop: '10px'}}>
        {data !== undefined && data !== ''
            ? <CommentItem id={data.id} updatePrevState={updatePrevState} />
            : <></>
        }
        
    </Box>
}

export default Comment