import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import { firePersonalGet } from "components/Store/personal/actions/get"
import selectorMainExtract from 'components/Store/main/selectors/extract.js'
import Item from "./Item"
import Layout from './Layout'
import Loader from "components/Loader"
import { TypographyText  as Typography} from "components/Typography"
import { Box, ImageList } from "@mui/material"

let Posts = ({
    username
}) => {
    const privatePosts = useSelector(selectorMainExtract(['personal', 'list', 'private', 'data', 'articles']))
    // console.log("privatePosts", privatePosts)
    useEffect(() => {
        firePersonalGet({
            section: 'private',
            url: 'http://localhost:4200',
            author: username
        })()
    }, [])
    return <React.Fragment>
        <Loader visible={!Array.isArray(privatePosts)} />
        {(Array.isArray(privatePosts))
            ? (privatePosts.length > 0)
                ? <ImageList cols={2} rowHeight={500} gap={8}>
                    {privatePosts.map(e => <Item key={e.id} {...e} /> )}
                </ImageList>
                : <Box
                    py={6}>
                    <Typography
                        variant="subtitle2"
                        color="secondary">
                        Не создано ни одной записи
                    </Typography>
                </Box>
            : <React.Fragment />
        }

    </React.Fragment>
}

Posts = React.memo(Posts)
export default Posts