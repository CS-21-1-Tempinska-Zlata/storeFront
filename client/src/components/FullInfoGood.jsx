import { useEffect, useState } from 'react';
import '../App.css';

function FullInfoGood(props) {

    const [imgSrc, setImgSrc] = useState('');

    useEffect(() => {
        const getImgObj = async () => {
			const resp = await fetch(props.data.imgUrl);
			const blob = await resp.blob();
			return URL.createObjectURL(blob);
		}
		getImgObj()
          .then(res => setImgSrc(res))
          .catch(err => console.log(err));
    }, []);
	return (
		<div className='fullGood-wrapper'>
            <button onClick={() => props.backHandler()}>back</button>
			<img src={imgSrc} className='fullGood-img' alt=''/>
            <div className='fullGood-info'>
                <h3>{props.data.name}</h3>
                <h2>{props.data.price}</h2>
            </div>
		</div>
	);
}

export default FullInfoGood;
