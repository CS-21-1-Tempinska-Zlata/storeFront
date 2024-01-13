import { useEffect, useState } from 'react';
import '../App.css';

function GoodCard(props) {

    const [imgSrc, setImgSrc] = useState('');

    useEffect(() => {
        const getImgObj = async () => {
			const resp = await fetch(props.data.thumbImgUrl);
			const blob = await resp.blob();
			return URL.createObjectURL(blob);
		}
		getImgObj()
          .then(res => setImgSrc(res))
          .catch(err => console.log(err));
    }, []);
	return (
		<div className='good-wrapper'>
			<img src={imgSrc} className='good-img' alt=''/>
            <div className='good-info'>
                <h4>{props.data.name}</h4>
                <h3>{props.data.price}</h3>
                <button onClick={() => props.moreHandler(props.data)}>Learn more</button>
            </div>
		</div>
	);
}

export default GoodCard;
