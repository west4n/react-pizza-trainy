import React from 'react';

function Categories() {
	const categoriesName = [
		'Все',
		'Мясные',
		'Вегетарианская',
		'Гриль',
		'Острые',
		'Закрытые',
	];

	const [activeCategory, setActiveCategory] = React.useState(0);

	return (
		<div className='categories'>
			<ul>
				{categoriesName.map((item, i) => (
					<li
						key={i}
						onClick={() => setActiveCategory(i)}
						className={activeCategory === i ? 'active' : ''}
					>
						{item}
					</li>
				))}
			</ul>
		</div>
	);
}

export default Categories;
