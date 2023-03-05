import axios from 'axios'
import qs from 'qs'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { SearchContext } from '../App'

import Categories from '../components/Categories'
import Pagination from '../components/Pagination/Pagination'
import PizzaBlock from '../components/PizzaBlock'
import Skeleton from '../components/Skeleton'
import Sort, { list } from '../components/Sort'
import {
	setCategoryId,
	setCurrentPage,
	setFilters,
} from '../redux/slices/filterSlice'

const Home = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const isSearch = React.useRef(false)
	const isMounted = React.useRef(false)

	const { categoryId, sort, currentPage } = useSelector((state) => state.filter)

	const { searchValue } = React.useContext(SearchContext)

	const [items, setItems] = React.useState([])
	const [isLoading, setIsLoading] = React.useState(true)

	const onChangeCategory = (id) => {
		dispatch(setCategoryId(id))
	}

	const onChangePage = (number) => {
		dispatch(setCurrentPage(number))
	}

	const fetchPizzas = () => {
		const category = `${categoryId > 0 ? `&category=${categoryId}` : ''}`
		const sortBy = sort.sortProperty.replace('-', '')
		const order = sort.sortProperty.includes('-') ? 'asc' : 'desc'
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
	}

	// Если изменили параметры и был первый рендер
	React.useEffect(() => {
		if (isMounted.current) {
			const queryString = qs.stringify({
				sortProperty: sort.sortProperty,
				categoryId,
				currentPage,
			})

			navigate(`?${queryString}`)
		}

		isMounted.current = true
	}, [categoryId, sort.sortProperty, currentPage])

	// Если был первый рендер, то проверяем URL-параметры и сохраняем в редуксе
	React.useEffect(() => {
		if (window.location.search) {
			const params = qs.parse(window.location.search.substring(1))
			const sort = list.find((obj) => obj.sortProperty === params.sortProperty)

			dispatch(
				setFilters({
					...params,
					sort,
				})
			)

			isSearch.current = true
		}
	}, [])

	// Если был первый рендер, то запрашиваем пиццы
	React.useEffect(() => {
		if (!isSearch.current) {
			fetchPizzas()
		}

		isSearch.current = false
	}, [categoryId, sort.sortProperty, searchValue, currentPage])

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
			<Pagination currentPage={currentPage} onChangePage={onChangePage} />
		</div>
	)
}

export default Home
