import axios from 'axios'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SearchContext } from '../App'

import Categories from '../components/Categories'
import Pagination from '../components/Pagination/Pagination'
import PizzaBlock from '../components/PizzaBlock'
import Skeleton from '../components/Skeleton'
import Sort from '../components/Sort'
import { setCategoryId, setCurrentPage } from '../redux/slices/filterSlice'

const Home = () => {
	const dispatch = useDispatch()
	const { categoryId, sort, currentPage } = useSelector((state) => state.filter)
	const sortType = sort.sortProperty

	const { searchValue } = React.useContext(SearchContext)

	const [items, setItems] = React.useState([])
	const [isLoading, setIsLoading] = React.useState(true)

	const onChangeCategory = (id) => {
		dispatch(setCategoryId(id))
	}

	const onChangePage = (number) => {
		dispatch(setCurrentPage(number))
	}

	React.useEffect(() => {
		const category = `${categoryId > 0 ? `&category=${categoryId}` : ''}`
		const sortBy = sortType.replace('-', '')
		const order = sortType.includes('-') ? 'asc' : 'desc'
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
				<Categories value={categoryId} onChangeCategory={onChangeCategory} />
				<Sort />
			</div>
			<h2 className='content__title'>Все пиццы</h2>
			<div className='content__items'>{isLoading ? skeletons : pizzas}</div>
			<Pagination onChangePage={onChangePage} />
		</div>
	)
}

export default Home
