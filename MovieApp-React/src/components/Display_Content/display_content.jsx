import React from 'react'
import { img_300, unavailable } from "../../config/config";
import "./display_content.css"
import Badge from '@mui/material/Badge';
import ContentModal from '../Modal/modal';

const DisplayContent = ({
    id, 
    poster, 
    title,
    date, 
    media_type, 
    vote_average}) => {
  return (
    <ContentModal media_type={media_type} id={id}>
        <Badge badgeContent={vote_average} color={vote_average > 6 ? "primary" : "secondary"}/>
        <img className="poster" src={poster? `${img_300}/${poster}` : unavailable} alt={title} />
        <strong className='title'>{title}</strong>
        <span className='sub-title'>
            {media_type === "tv" ? "TV Series" : "Movie"}
            <span className='sub-title'>
                {date}
            </span>
        </span>
    </ContentModal>
  )
}

export default DisplayContent;
