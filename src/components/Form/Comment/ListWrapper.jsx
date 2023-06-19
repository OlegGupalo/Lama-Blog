import { useState } from "react";
import Comment from "./Comment";
import ListItem from "./ListItem";
import { useEffect } from "react";
import { Divider } from "@mui/material";

const ListWrapper = ({id}) => {
    const [comment, setComment] = useState([])

    useEffect(() => {
        const fetchData = async (id) => {
            try {
              const response = await fetch(`http://localhost:4200/api/${id}/comment`);
              const json = await response.json();
              setComment(json);
            } catch (error) {
              console.error(error);
            }
        };
        fetchData(id)
    }, [id])

    const updatePrevState = (state) => {
        setComment(state)
    }

    return <>
        <Divider sx={{marginTop: '20px'}}/>
        <ListItem comment={comment} />
        <Comment updatePrevState={updatePrevState} />
    </>
}

export default ListWrapper