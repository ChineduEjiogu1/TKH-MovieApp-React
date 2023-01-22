import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import DisplayContent from '../../components/Display_Content/display_content';
import Pagination from '../../components/Pagination/pagination';
import Genres from '../../components/Genres';
import UseGenre from '../../components/Hooks/use_genre';


const API_KEY = import.meta.env.VITE_APP_MOVIE_API_KEY;

const Movies = () => {

    const [page, setPage] = useState(1);
    const [content, setContent] = useState([]);
    const [numOfPages, setNumOfPages] = useState(); 
    const [selectedGenres, setSelectedGenres] = useState([]); 
    const [genres, setGenres] = useState([]);
    const genreURL = UseGenre(selectedGenres);

    const fetchMovies = async () => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/discover/movie/?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreURL}`);
    
        setContent(data.results);
        setNumOfPages(data.total_pages);

        console.log(data);
    };


    useEffect(() => {
        fetchMovies();
    }, [page, genreURL]);

  return (
    <div>
        <span className="page-title">Movies</span>
        <Genres 
        type="movie" 
        selectedGenres={selectedGenres} 
        setSelectedGenres={setSelectedGenres} 
        genres={genres} 
        setGenres={setGenres}
        setPage={setPage}
        />
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
                        media_type="movie" 
                        vote_average={c.vote_average}/>
                        ))
                    }
            </div>
            {numOfPages > 1 && (
                <Pagination setPage={setPage} numOfPages={numOfPages}/>
            )}
        
    </div>
  )
}

export default Movies;