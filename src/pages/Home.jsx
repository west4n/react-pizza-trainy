import qs from 'qs'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import Categories from '../components/Categories'
import Pagination from '../components/Pagination/Pagination'
import PizzaBlock from '../components/PizzaBlock'
import Skeleton from '../components/Skeleton'
import Sort, { list } from '../components/Sort'
import {
	selectFilter,
	setCategoryId,
	setCurrentPage,
	setFilters,
} from '../redux/slices/filterSlice'
import { fetchPizzas, selectPizzaData } from '../redux/slices/pizzaSlice'

const Home = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const isSearch = React.useRef(false)
	const isMounted = React.useRef(false)

	const { categoryId, sort, currentPage, searchValue } =
		useSelector(selectFilter)
	const { items, status } = useSelector(selectPizzaData)

	const onChangeCategory = (id) => {
		dispatch(setCategoryId(id))
	}

	const onChangePage = (number) => {
		dispatch(setCurrentPage(number))
	}

	const getPizzas = async () => {
		const category = categoryId > 0 ? `&category=${categoryId}` : ''
		const sortBy = sort.sortProperty.replace('-', '')
		const order = sort.sortProperty.includes('-') ? 'asc' : 'desc'
		const search = searchValue ? `&search=${searchValue}` : ''

		dispatch(
			fetchPizzas({
				category,
				sortBy,
				order,
				search,
				currentPage,
			})
		)
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

			isSearch.current = false
		}
	}, [])

	// Если был первый рендер, то запрашиваем пиццы
	React.useEffect(() => {
		if (!isSearch.current) {
			getPizzas()
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
			{status === 'error' ? '' : <h2 className='content__title'>Все пиццы</h2>}
			{status === 'error' ? (
				<div className='content__error-info'>
					<h2>Произошла ошибка 😕</h2>
					<p>
						К сожалению, пиццы не смогли загрузиться, попробуйте попытку
						чуть-чуть позже...
					</p>
				</div>
			) : (
				<div className='content__items'>
					{status === 'loading' ? skeletons : pizzas}
				</div>
			)}

			<Pagination currentPage={currentPage} onChangePage={onChangePage} />
		</div>
	)
}

export default Home
