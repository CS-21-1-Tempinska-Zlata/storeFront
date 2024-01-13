import { useEffect, useState } from 'react';
import './App.css';
import CategoryButton from './components/CategoryButton';
import GoodCard from './components/GoodCard';
import FullInfoGood from './components/FullInfoGood';

function App() {

	const [categories, setCategories] = useState([]);
	const [goods, setGoods] = useState([]);

	const [showFullGood, setShowFullGood] = useState(false);
	const [fullInfoGoodData, setFullInfoGoodData] = useState({});

	const handleGetGood = async (partitionKey) => {
		setShowFullGood(false);
		const res = await fetch(`http://localhost:3010/goods/${partitionKey}`);
		setGoods(await res.json());
	}

	const handleBackClick = () => {
		setShowFullGood(false);
	}
	const handleShowFull = (goodInfo) => {
		setFullInfoGoodData(goodInfo);
		setShowFullGood(true);
	}

	useEffect(() => {
		const getAllCategories = async () => {
			const res = await fetch('http://localhost:3010/categories');
			return await res.json();
		}

		getAllCategories()
			.then(res => setCategories(res));
	}, []);

	return (
		<div className="App">
			<div className="main">
				<div className="categories-container">
					{
						categories.map(item => (
							<div key={item.partitionKey+item.rowKey} className='category-item'>
								<CategoryButton data={item} handler={handleGetGood}/>
							</div>
						))
					}
				</div>
				{
					showFullGood
					?
					<FullInfoGood backHandler={handleBackClick} data={fullInfoGoodData}/>
					:
					<div className="goods-container">
						{
							goods.map(item => (
								<div key={item.partitionKey+item.rowKey} className='good-item'>
									<GoodCard data={item} moreHandler={handleShowFull}/>
								</div>
							))
						}
					</div>
				}
			</div>
		</div>
	);
}

export default App;
