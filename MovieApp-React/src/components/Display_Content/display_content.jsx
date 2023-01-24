import React from 'react'
import { IMG_300, unavailablePoster } from "../../config/config";
import "./display_content.css"
import Badge from '@mui/material/Badge';
import PosterModal from '../Modal/modal';

const DisplayContent = ({
    id, 
    poster, 
    title,
    date, 
    media_type, 
    vote_average}) => {
  return (
    <PosterModal media_type={media_type} id={id}>
        <Badge badgeContent={vote_average} color={vote_average > 6 ? "primary" : "secondary"}/>
        <img className="poster" src={poster? `${IMG_300}/${poster}` : unavailablePoster} alt={title} />
        <strong className='title'>{title}</strong>
        <span className='sub-title'>
            {media_type === "tv" ? "TV Series" : "Movie"}
            <span className='sub-title'>
                {date}
            </span>
        </span>
    </PosterModal>
  )
}

export default DisplayContent;
