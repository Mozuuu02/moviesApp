import React, { useEffect, useState } from 'react'
import ReactStars from 'react-stars'
import { useParams } from 'react-router-dom'
import { db } from './firebase/Firebase'
import { doc, getDoc } from 'firebase/firestore'
import { ThreeCircles } from 'react-loader-spinner'
import Review from "./Review"

const Detail = () => {
  const {id} = useParams();
  const [data,setData] = useState({
    title : "",
    year: "",
    image: "",
    description: "",
    rating : 0,
    rated  : 0
  });

  const [loading, setLoading]= useState(true);

  useEffect(() => {
    async function getData() {
      setLoading(true);
      const _doc = doc(db,"movies", id);
      const _data = await getDoc(_doc);
      setData(_data.data());
      setLoading(false);
    }
    getData();
  },[])

  return (
    <div className='p-4 mt-4 flex flex-col md:flex-row items-center md:items-start w-full justify-center'>
      {loading ?<div className='h-96 flex w-full justify-center items-center'>
        <ThreeCircles height={30} color='white' /></div> : 
        <>
      <img className='h-72 sticky top-24' alt="poster" src={data.image}/>

      <div className='ml-4 mr-6 w-1/2'>
        <h1 className='text-3xl font-bold text-gray-400'>{data.title}<span className='text-xl'> ({data.year})</span></h1>
        <ReactStars
          size={20}
          half={true}
          value={data.rating / data.rated}
          edit={false}
        />
        <p className='mt-2'>{data.description}</p>

        <Review id={id} prevRating={data.rating} userRated={data.rated}/>
    
      </div>
      </>
      }
    </div>
  
  )  
}

export default Detail