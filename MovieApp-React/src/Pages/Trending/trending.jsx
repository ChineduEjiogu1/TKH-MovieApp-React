import React from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react';
import DisplayContent from '../../components/Display_Content/display_content';
import "./trending.css"
import Pagination from '../../components/Pagination/pagination';

const API_KEY = import.meta.env.VITE_APP_MOVIE_API_KEY;

const Trending = () => {
    
    const [page, setPage] = useState(1);
    const [content, setContent] = useState([]);

    const fetchTrending = async () =>
    {
        const { data } = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}&page=${page}`);

        console.log(data.results);
        setContent(data.results);
    };

    useEffect(() => {
        fetchTrending();

    }, [page]);

  return (
    <div>
       <span className="page-title">Trending</span>
       <div className="trending">
            {
                content && content.map((c) => (
                    <DisplayContent
                    key={c.id} 
                    id={c.id} 
                    poster={c.poster_path} 
                    title={c.title || c.name} 
                    date={c.first_air_date || 
                    c.release_date}
                media_type={c.media_type} 
                vote_average={c.vote_average}/>
                ))
            }
       </div>
       <Pagination setPage={setPage}/>
    </div>
  )
}

export default Trending;