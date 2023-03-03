import axios from 'axios'
import React from 'react'

import Categories from '../components/Categories'
import PizzaBlock from '../components/PizzaBlock'
import Skeleton from '../components/Skeleton'
import Sort from '../components/Sort'

const Home = () => {
	const [items, setItems] = React.useState([])
	const [isLoading, setIsLoading] = React.useState(true)

	React.useEffect(() => {
		setIsLoading(true)
		axios
			.get('https://63f50aa13f99f5855dbc89db.mockapi.io/items')
			.then((res) => {
				setItems(res.data)
				setIsLoading(false)
			})
	}, [])

	return (
		<>
			<div className='content__top'>
				<Categories />
				<Sort />
			</div>
			<h2 className='content__title'>Все пиццы</h2>
			<div className='content__items'>
				{isLoading
					? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
					: items.map((obj) => <PizzaBlock {...obj} key={obj.id} />)}
			</div>
		</>
	)
}

export default Home
