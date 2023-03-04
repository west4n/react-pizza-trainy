import axios from 'axios'
import React from 'react'

import Categories from '../components/Categories'
import Pagination from '../components/Pagination/Pagination'
import PizzaBlock from '../components/PizzaBlock'
import Skeleton from '../components/Skeleton'
import Sort from '../components/Sort'

const Home = ({ searchValue }) => {
	const [items, setItems] = React.useState([])
	const [isLoading, setIsLoading] = React.useState(true)
	const [categoryId, setCategoryId] = React.useState(0)
	const [currentPage, setCurrentPage] = React.useState(1)
	const [sortType, setSortType] = React.useState({
		name: 'популярности',
		sortProperty: 'rating',
	})

	React.useEffect(() => {
		const category = `${categoryId > 0 ? `category=${categoryId}` : ''}`
		const sortBy = sortType.sortProperty.replace('-', '')
		const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc'
		const search = searchValue ? `&search=${searchValue}` : ''

		setIsLoading(true)
		axios
			.get(
				`https://63f50aa13f99f5855dbc89db.mockapi.io/items?page=${currentPage}&limit=4${category}&sortBy=${sortBy}&order=${order}${search}`
			)
			.then((res) => {
				setItems(res.data)
				setIsLoading(false)
			})
	}, [categoryId, sortType, searchValue, currentPage])

	const skeletons = [...new Array(6)].map((_, index) => (
		<Skeleton key={index} />
	))
	const pizzas = items.map((obj) => <PizzaBlock {...obj} key={obj.id} />)

	return (
		<div className='container'>
			<div className='content__top'>
				<Categories
					value={categoryId}
					onChangeCategory={(i) => setCategoryId(i)}
				/>
				<Sort value={sortType} onChangeSort={(obj) => setSortType(obj)} />
			</div>
			<h2 className='content__title'>Все пиццы</h2>
			<div className='content__items'>{isLoading ? skeletons : pizzas}</div>
			<Pagination onChangePage={(number) => setCurrentPage(number)} />
		</div>
	)
}

export default Home
