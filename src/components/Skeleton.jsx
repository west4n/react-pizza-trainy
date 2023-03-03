import React from 'react';
import ContentLoader from 'react-content-loader';

const MyLoader = (props) => (
	<ContentLoader
		className='pizza-block'
		speed={2}
		width={280}
		height={465}
		viewBox='0 0 280 465'
		backgroundColor='#f3f3f3'
		foregroundColor='#ecebeb'
		{...props}
	>
		<circle cx='134' cy='127' r='127' />
		<rect x='0' y='273' rx='5' ry='5' width='280' height='30' />
		<rect x='0' y='324' rx='5' ry='5' width='280' height='88' />
		<rect x='0' y='424' rx='5' ry='5' width='130' height='32' />
		<rect x='150' y='424' rx='5' ry='5' width='130' height='32' />
	</ContentLoader>
);

export default MyLoader;
