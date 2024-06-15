import React from 'react'
import Arrow from '../assets/right.png'
import { Link, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import axios from 'axios';
import Loading from '../components/Loading';

const AnimeDetails = () => {

    const { id } = useParams();

    async function getDetails() {
        let response = await axios(`https://api.jikan.moe/v4/characters/${id}`);
        return response.data.data;
    }

    const {
        isLoading,
        error,
        data: details,
    } = useQuery({
        queryKey: ["details", id],
        queryFn: getDetails,
    });

    if (isLoading) {
        return <div className='min-h-screen flex items-center justify-center'>
            <Loading />
        </div>
    }


    if (error) {
        return <div className='min-h-screen flex items-center justify-center'>
            <h1>Error: {error.message}</h1>
        </div>
    }

    const aboutLines = details?.about.split('\n').filter(line => line.trim() !== '');

    return (
        <div className='container min-h-screen bg-zinc-800 text-white'>
            <Link to={-1} className='text-lg text-blue-200 inline-block pb-4 underline'>back to home</Link>
            <section className='flex flex-col md:flex-row gap-8 overflow-hidden'>
                <aside className='w-96 h-1/3'>
                    <img className='w-full h-full' src={details?.images?.jpg?.image_url} alt="" />
                </aside>
                <div className='w-full'>
                    <h2 className='text-2xl font-medium'>{details?.name} <span className='text-lg'>({details?.name_kanji})</span></h2>
                    <hr className='' />
                    <div className='text-justify text-md text-light mt-4'>
                        {aboutLines?.map((line, index) => (
                            <p key={index}>{line}</p>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default AnimeDetails