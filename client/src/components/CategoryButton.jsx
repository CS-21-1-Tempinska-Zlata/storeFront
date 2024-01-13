import '../App.css';

function CategoryButton(props) {
	return (
		<button className='category-btn' onClick={() => props.handler(props.data.name)}>{props.data.name}</button>
	);
}

export default CategoryButton;
