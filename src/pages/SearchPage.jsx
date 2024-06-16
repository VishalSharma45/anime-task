import React, { useState } from 'react'
import SearchIcon from '../assets/search.png'
import BgImg from '../assets/bg_image2.jpg'
import axios from 'axios'
import { useQuery } from 'react-query'
import { MemoizedCards } from '../components/AnimeCards'
import useDebounce from '../hooks/useDebounce'
import Loading from '../components/Loading'

const SearchPage = () => {

    const [searchItem, setSearchItem] = useState("");
    const debouncedSearchItem = useDebounce(searchItem, 300);
    const [pageNumber, setPageNumber] = useState(1);

    const {
        isLoading,
        error,
        data: animes
    } = useQuery({
        queryKey: ["animes", debouncedSearchItem, pageNumber],
        queryFn:
            async () => {
                const response = await axios.get(`https://api.jikan.moe/v4/characters`, {
                    params: {
                        page: pageNumber,
                        limit: 15,
                        q: debouncedSearchItem,
                        order_by: 'favorites',
                        sort: 'desc'
                    }
                });
                return await response.data;
            },
    });

    if (error) {
        return (
            <div className='w-full h-screen backdrop-blur-lg bg-white/30 flex items-center justify-center'>
                <h1 className='text-4xl italic'>Error: {error.message}</h1>
            </div>
        )
    }

    const totalAnimes = animes?.pagination?.items?.total;
    const lastVisiblePage = animes?.pagination?.last_visible_page;

    const handlePrevPage = () => {
        if (pageNumber > 1) {
            setPageNumber((prev) => prev - 1);
        }
    };

    const handleNextPage = () => {
        if (pageNumber < lastVisiblePage) {
            setPageNumber((prev) => prev + 1);
        }
    };
    return (
        <div>
            {/* Upper block  */}
            <div className='w-full h-full flex flex-col items-center justify-center container'
                style={{
                    backgroundImage: `url(${BgImg})`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover', backgroundRepeat: 'no-repeat'
                }}>
                <h1 className='text-3xl text-center lg:text-5xl font-semibold mb-4 md:mb-10 text-white'>Search Anime Characters</h1>
                <div className='md:w-2/4 flex items-center justify-start gap-4 border-2  rounded-xl px-2 py-2'>
                    <img className='w-8 h-8' src={SearchIcon} alt="Search the anime character" />
                    <input onChange={(e) => setSearchItem(e.target.value)} value={searchItem} className='bg-transparent placeholder:text-white w-full outline-none text-xl placeholder:white placeholder:italic text-white' type="text" placeholder='Search your favourite anime character' />
                </div>
                <p className='text-gray-300 font-medium mt-6'>Total {animes?.data.length ? totalAnimes : 0} <span className='text-slate-50 font-bold'>{ }</span> matching anime characters found</p>
            </div>

            {/* Lower block  */}
            <div className=''>
                <div className='container bg-indigo-100'>
                    {isLoading ? (
                        <Loading />
                    ) : (
                        animes?.data.length > 0 && animes.data.map((anime, index) => (
                            <MemoizedCards
                                key={index}
                                anime={anime}
                            />
                        ))
                    )}
                    {
                        animes?.data?.length < 1 ? <div className='text-center text-5xl text-gray-700'>No results found😥</div> : ""
                    }
                    <div className='flex items-center justify-center gap-4'>
                        <div className="inline-flex mt-4">
                            <button
                                className={`bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l ${pageNumber === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                                onClick={handlePrevPage}
                                disabled={pageNumber === 1}>
                                Prev
                            </button>
                            <button
                                className={`bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r ${pageNumber === lastVisiblePage
                                    ? 'opacity-50 cursor-not-allowed'
                                    : ''
                                    }`}
                                onClick={handleNextPage}
                                disabled={pageNumber === lastVisiblePage}>
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchPage