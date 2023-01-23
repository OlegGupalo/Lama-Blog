import React from 'react'
import {useSnackbar} from 'notistack'
import {useSelector} from 'react-redux'
import {Link, useParams} from 'react-router-dom'
import {ImageList, ImageListItem, Box} from '@mui/material'
import selectorMainExtract from 'components/Store/main/selectors/extract.js'
import {firePersonalGet as personalGet} from 'components/Store/personal/actions/get'
import Loader from 'components/Loader'
import styled from 'styled-components'
import { TypographyText as Typography} from "components/Typography"
import './style.css'


const Img = styled('img')({
    backgroundSize: 'contain',
    maxWidth: '100%',
    maxHeight: '100%',
});

let Private = () => {
	const {username} = useParams('username')
	const {enqueueSnackbar} = useSnackbar()
    const privatePosts = useSelector(selectorMainExtract(['personal', 'list', 'private', 'data', 'articles']))
    React.useEffect(() => {
        personalGet({
            section: 'private',
            url: 'http://localhost:4200',
            author: username
        })()
    }, [username])

	return <React.Fragment>
		<Loader visible={!Array.isArray(privatePosts)} />
        {(Array.isArray(privatePosts))
            ? (privatePosts.length > 0)
                ? <Box sx={{ width: '100%', height: 500, overflowY: 'scroll' }}>
                <ImageList variant="masonry" gap={8} cols={2} >
                    {privatePosts.map(e => 
                	<ImageListItem key={e.id} className='container'>
                    	<img
                    		className='image'
				            src={`http://localhost:4200/files/${e.image}`}
				            alt={e.title}
				            loading="lazy"
			          	/>
			          	<div className="overlay">
				          	<div className="middle">
				          		<Typography 

				          			component={Link}
				          			to={`/news/${e.slug}`} 
				          			className="text">
				          				{e.title}
				          		</Typography>
				          	</div>
			          	</div>
                	</ImageListItem> )}
                </ImageList></Box>
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

Private = React.memo(Private)
export default Private