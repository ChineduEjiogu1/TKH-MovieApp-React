import * as React from "react";
import { Box } from "@mui/material";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import { createTheme } from "@mui/material/styles";
import YouTubeIcon from "@mui/icons-material/YouTube";
import axios from "axios";
import { useState, useEffect } from "react";
import Carousel from "../Carousel/carousel";
import {
  IMG_500,
  unavailablePoster,
  unavailablePoster2,
} from "../../config/config";
import "./modal.css";

const theme = createTheme();

const API_KEY = import.meta.env.VITE_APP_MOVIE_API_KEY;

const style = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "90%",
  height: "80%",
  backgroundColor: "#680a00",
  border: "1px solid #282c34",
  color: "white",
  padding: theme.spacing(1, 1, 3),
};

export default function PosterModal({ children, media_type, id }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [content, setContent] = useState();
  const [video, setVideo] = useState();

  const getData = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${API_KEY}&language=en-US`
    );

    setContent(data);
    console.log(data);
  };

  const getVideo = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${API_KEY}&language=en-US`
    );

    console.log(data);
    setVideo(data.results[0]?.key);
  };

  useEffect(() => {
    getData();
    getVideo();
  }, []);

  return (
    <div>
      <div
        className="poster-card"
        style={{ cursor: "pointer" }}
        color="inherit"
        onClick={handleOpen}
      >
        {children}
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
      >
        <Fade in={open}>
          <Box sx={{ backgroundColor: "#680a00" }}>
          <div className={style}>
            {content && (
              <div className={style}>
                <div className="content-modal">
                  <img
                    className="content-display"
                    width="100%"
                    height="600px"
                    src={
                      content.poster_path
                        ? `${IMG_500}/${content.poster_path}`
                        : unavailablePoster
                    }
                    alt={content.name || content.title}
                  />

                  <img
                    className="content-land"
                    src={
                      content.backdrop_path
                        ? `${IMG_500}/${content.backdrop_path}`
                        : unavailablePoster2
                    }
                    alt={content.name || content.title}
                  />

                  <div className="content-about">
                    <span className="content-modal-title">
                      {content.name || content.title} (
                      {(
                        content.first_air_date ||
                        content.release_date ||
                        "-----"
                      ).substring(0, 4)}
                      )
                    </span>

                    {content.tagline && (
                      <i className="tagline">{content.tagline}</i>
                    )}

                    <span className="content-modal-description">
                      {content.overview}
                    </span>

                    <div>
                      <Carousel id={id} media_type={media_type} />
                    </div>

                    <Button
                      variant="container"
                      startIcon={<YouTubeIcon/>}
                      color="secondary"
                      target="_blank"
                      href={`https://www.youtube.com/watch?v=${video}`}
                    >
                      Watch Trailer
                    </Button>
                  </div>
                </div>
              </div>
            )}
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
