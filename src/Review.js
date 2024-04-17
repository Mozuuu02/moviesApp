import React from 'react'
import ReactStars from 'react-stars'
import { useState, useEffect } from 'react';
import { reviewref, db } from './firebase/Firebase';
import { addDoc, doc, updateDoc, query, where, getDocs } from 'firebase/firestore';
import { TailSpin, ThreeDots } from 'react-loader-spinner';
import swal from 'sweetalert';

const Review = ({id , prevRating, userRated}) => {
    const [rating, setRating] = useState(0);
    const [loading, setLoading]= useState(false);
    const [reviewsloading, setReviewsloading]= useState(true);
    const [form,setForm] = useState("");
    const [data,setData] = useState([]);


    const sendReview  = async () => {
        setLoading(true);
        try{
            await addDoc(reviewref,{
                moviesid: id,
                name:"MOzuuu",
                rating: rating,
                thought: form,
                timestamp: new Date().getTime()
            })
            
            const ref= doc(db, "movies", id);
            await updateDoc(ref,{
                rating: prevRating + rating,
                rated: userRated +1
            })
            setRating(0);
            setForm("");
            
            swal({
                title : 'Review Sent',
                icon: 'success',
                buttons: false,
                timer:3000
            })
        }
        catch(error){
            swal({
                title : error.message,
                icon: 'error',
                buttons: false,
                timer:3000
        })
        }
        setLoading(false);
    }
    useEffect(() => {
        async function getData(){
            setReviewsloading(true);
            let quer = query(reviewref, where('moviesid','==',id))
            const querysnapshot = await getDocs(quer);

            querysnapshot.forEach((doc) => {
                setData((prev) => [...prev, doc.data()])
            })
            setReviewsloading(false);
        }
        getData();
    },[])

  return (
    <div className="mt-4 border-t-2 border-x-gray-500 w-full">
        <ReactStars
            size={20}
            half={true}
            value={rating}
            onChange={(rate) => setRating(rate)}
        />
        <input
        value={form}
        onChange={(e) => setForm(e.target.value)}
        placeholder = "Share Your Thoughts"
        className='w-full p-2 outline-none header'
        />

        <button onClick={sendReview} className='bg-green-600 justify-center w-full p-1'>
        {loading? <TailSpin height={20} color="white" /> : 'Share'}
        </button>

        {reviewsloading?
        <div className='mt-7 flex justify-center'><ThreeDots height={10} color="white" /></div>
        :
        <div>
           {data.map((e,i) => {
            return(
                <div className='p-2 w-full border-b header bg-opacity-50 border-gray-600 mt-2' key={i}>
                    <div className='flex items-center'>
                        <p className='text-blue-500'>{e.name}</p>
                        <p className='ml-3 text-xs'>({new Date(e.timestamp).toLocaleString()})</p>
                    </div>
                    <ReactStars
                    size={15}
                    half={true}
                    value={e.rating}
                    edit={false}
                    />

                    <p>{e.thought}</p>
                </div>
            )
           })}
        </div>
        }
        </div>
  )
}

export default Review