import axios from 'axios'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const FullPizza = () => {
	const { id } = useParams()
	const navigate = useNavigate()

	const [pizza, setPizza] = React.useState([])

	React.useEffect(() => {
		async function fetchPizza() {
			try {
				const { data } = await axios.get(
					`https://63f50aa13f99f5855dbc89db.mockapi.io/items/${id}`
				)

				setPizza(data)
			} catch (error) {
				alert('Ошибка получения пиццы...')
				navigate('/')
			}
		}

		fetchPizza()
	}, [id, navigate])

	if (!pizza) {
		return 'Загрузка...'
	}

	return (
		<div className='container'>
			<h2>{pizza.title}</h2>
			<img src={pizza.imageUrl} alt={pizza.title} />
			<p>{pizza.price}</p>
		</div>
	)
}

export default FullPizza
