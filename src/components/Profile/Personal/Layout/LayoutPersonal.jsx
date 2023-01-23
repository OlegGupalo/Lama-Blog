import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import { firePersonalGet } from "components/Store/personal/actions/get"
import selectorMainExtract from 'components/Store/main/selectors/extract.js'
import Loader from "components/Loader"
import { TypographyText  as Typography} from "components/Typography"
import { Box } from "@mui/material"

let Layout = ({
    children,
    url = '',
    username = ''
}) => {
    const privatePosts = useSelector(selectorMainExtract(['personal', 'list', 'private', 'data', 'articles']))
    console.log("privatePosts", privatePosts)
    useEffect(() => {
        firePersonalGet({
            section: 'private',
            url: 'http://localhost:4200',
            author: username
        })()
    }, [])
    console.log(privatePosts)
    return <React.Fragment>
        <Loader visible={!Array.isArray(privatePosts)} />
        {(Array.isArray(privatePosts))
            ? (privatePosts.length > 0)
                ? <div>
                    {children}
                </div>
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

Layout = React.memo(Layout)
export default Layout