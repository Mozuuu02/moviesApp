import React, { useEffect, useState } from 'react';
import {ThreeDots } from 'react-loader-spinner';
import ReactStars from 'react-stars';
import { getDocs } from 'firebase/firestore';
import { moviesref } from './firebase/Firebase';
import { Link } from 'react-router-dom';

const Cards = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
    async function getData(){
        setLoading(true);
        const _data = await getDocs(moviesref);
        _data.forEach((doc)=> {
            setData((prv) => [...prv,{...(doc.data()),id:doc.id}])
        })
        setLoading(false);
    }
    getData();
},[])

return (
        <div className='flex flex-wrap justify-between px-3 mt-2'>
            {loading ? <ThreeDots height={40} color='white' /> :
            data.map((e, i) => {
                return (
                   <Link to={`/Detail/${e.id}`}><div key={i} className='card shadow-lg p-1 
                    hover:-translate-y-3 cursor-pointer mt-5
                     transition-all duration-600'>
                        <img className="h-60 md:h-72" alt="uimg"
                         src={e.image} />
                        <h1>Name: {e.title}</h1>
                        <h1>Rating: {5}
                        <ReactStars>
                            size={20}
                            half={true}
                            value={e.rating/e.rated}
                            edit={false}
                        </ReactStars></h1>
                        <h1>Year: {e.year}</h1>
                    </div>
                    </Link> 
                )
            })}
        </div>
    )
}

export default Cards;