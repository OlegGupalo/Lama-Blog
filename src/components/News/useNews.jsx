import React from 'react'
import axios from 'axios'

export const useNews = () => {
	const [news, setNews] = React.useState(null)
	const [loading, setLoading] = React.useState(true)

	React.useEffect(() => {
		(async () => {
			await axios.get('http://localhost:4200/api/articles')
			.then(response => {
				setNews(response.data.articles)
				setLoading(false)
			})
			.catch(err => console.log(err.message))
		})()
		
		
	}, [])

	console.log('load', loading)

	return {news, loading}
}