import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { noPicture, img_300 } from '../../config/config';
import './carousel.css';

const API_KEY = import.meta.env.VITE_APP_MOVIE_API_KEY;

const handleDragStart = (e) => e.preventDefault();

const Carousel = ({ id, media_type }) => {

  const [credits, setCredits] = useState();
  
  const items = credits?.map((c) => (

    <div className='carousel-items'>
      <img width="200px" height="250px" src={c.profile_path ? `${img_300}/${c.profile_path}` : noPicture}
      alt={c?.name}
      onDragStart={handleDragStart}
      className="carousel-item-img"
      />
      <b className='carousel-item-txt'>{c?.name}</b>
    </div>
  ));

  const responsiveCarousel = {
    0: {
      items: 3,
    },
    512: {
      items: 5,
    },
    1024: {
      items: 7,
    },
  };

  const fetchCredits = async() =>{
    const { data } = await axios.get(`https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=${API_KEY}&language=en-US`)
  
    setCredits(data.cast);
  };
  
  useEffect(() => {
      fetchCredits();
  }, [])
  

  return (
    <AliceCarousel 
    autoPlay 
    responsiveCarousel={responsiveCarousel} 
    infinite 
    disableDotsControls 
    disableButtonControls 
    mouseTracking 
    items={items} />
  );
}

export default Carousel;