import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { key } from '../Request';
import { FaHeart, FaRegHeart, FaStar } from 'react-icons/fa';
import { UserAuth } from '../context/AuthContext';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import axios from 'axios';

function Detail() {
    const { id } = useParams();
    const {user} = UserAuth();
    const [movie, setMovie] = useState({});
    const [like, setLike] = useState(false);
    const [saved, setSaved] = useState(false);

    const fetchURL = `https://api.themoviedb.org/3/movie/${id}?api_key=${key}&language=en-US`

    useEffect(() => {
        axios.get(fetchURL).then((response) => {
            setMovie(response?.data)
        })
    },[fetchURL])

    const movieID = doc(db, 'users', `${user?.email}`)
    const saveShow = async () => {
        if(user?.email) {
            setLike(!like)
            setSaved(true)
            await updateDoc(movieID, {
                savedShows: arrayUnion({
                    id: movie.id,
                    title: movie?.title,
                    img: movie.backdrop_path
                })
            })
        } else {
            alert('Please log in to save a movie')
        }
    }

    return (
        <>
            <div className='w-full h-[550px] z-10'>
                <div className='w-full h-full'>
                    <div className='absolute w-full h-[550px] bg-gradient-to-t from-black'></div>
                    <img 
                        className='w-full h-full object-cover'
                        src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`} 
                        alt={movie?.title} 
                    />
                </div>
            </div>
            <div className='absolute w-full top-[50%]'>
                <div className='flex w-full px-10'>
                    <div className='w-[200px] h-[280px]'>
                        <img
                            className='w-full h-full object-cover rounded-lg'
                            src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`} 
                            alt={movie?.title} 
                        />
                    </div>
                    <div className='ps-10'>
                        <h1 className='text-white text-3xl md:text-5xl font-bold mb-2'>{movie?.title}</h1>
                        <div className='text-white flex mb-2'>
                            <span className='me-2'>
                                ({new Date(movie?.release_date).getFullYear()})  |
                            </span>
                            <span className='flex items-center'>
                                <FaStar className='me-2'/>{movie?.vote_average}
                            </span> 
                        </div>
                        <div onClick={saveShow} className='flex items-center'>
                            {like ? <FaHeart className='text-gray-300'/> : <FaRegHeart className='text-gray-300'/>}
                            <h1 className='text-white ms-2'>
                                {!like ? 'Wishlist' : 'Loved It'}
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Detail