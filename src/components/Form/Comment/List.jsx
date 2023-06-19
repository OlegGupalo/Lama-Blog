import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { Avatar, Grid, Paper } from "@mui/material"
import { fireListCurrent } from "components/Store/current/actions/get"
import selectorMainExtract from 'components/Store/main/selectors/extract.js';
import ListWrapper from "./ListWrapper"
import Comment from "./Comment"

const List = ({slug}) => {
    const data = useSelector(selectorMainExtract(['current', 'data']))
    console.log("List slug", data)
    useEffect(() => {
        fireListCurrent({
            slug
        })()
    }, [slug])

    console.log("LIST", data)
    return <div>
        {data !== undefined && data !== ''
            ? data.id ? <>
                <ListWrapper id={data.id} />
            </>
            : <></>
            : <></>
        }
    </div>
}

export default List