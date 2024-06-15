import React from 'react'
import Arrow from '../assets/right.png'
import { Tooltip } from 'react-tooltip'
import { Link } from 'react-router-dom'

const AnimeCards = ({ anime }) => {
    return (
        <>
            <div className="bg-white rounded-lg m-h-64 p-2 transform hover:translate-y-2 hover:shadow-xl transition duration-300 flex flex-col sm:flex-row items-center justify-between group mb-2">
                <div className='flex flex-col gap-2 md:flex-row flex-1 w-full'>
                    <figure className="md:mr-2">
                        <img src={anime.images.jpg.image_url} alt="" className="h-36 w-36 ml-auto mr-auto object-cover" />
                    </figure>
                    <div className="w-full rounded-lg p-4 bg-gray-700">
                        <div className='h-full flex flex-col gap-2 items-start justify-around'>
                            <h5 className="text-white text-2xl font-bold leading-none">
                                {anime.name}
                            </h5>
                            <div className='flex flex-wrap gap-2'>
                                {
                                    anime.nicknames.length > 0 && anime.nicknames.map((nickname, index) => (
                                        <span key={index} className="inline-block text-xs text-gray-400 leading-none border-2 px-2 py-1 rounded-lg">{nickname}</span>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex justify-center items-center gap-2 px-4'>
                    <div className='text-lg text-slate-500 mr-2'>
                        ❤️{anime.favorites}
                    </div>
                    <Link to={anime.url} target='_blank'>
                        <img
                            className='w-12 h-12 cursor-pointer hover:scale-125 transition-all' src={Arrow}
                            alt="Right arrow"
                            data-tooltip-id="my-tooltip"
                            data-tooltip-content="See details"
                        />
                        <Tooltip id="my-tooltip" />
                    </Link>
                </div>
            </div >
        </>
    )
}

export default AnimeCards;

export const MemoizedCards = React.memo(AnimeCards);