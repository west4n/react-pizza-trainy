import React from 'react'

function Categories({ value, onChangeCategory }) {
	const categoriesName = [
		'Все',
		'Мясные',
		'Вегетарианская',
		'Гриль',
		'Острые',
		'Закрытые',
	]

	return (
		<div className='categories'>
			<ul>
				{categoriesName.map((categoryName, i) => (
					<li
						key={i}
						onClick={() => onChangeCategory(i)}
						className={value === i ? 'active' : ''}
					>
						{categoryName}
					</li>
				))}
			</ul>
		</div>
	)
}

export default Categories
