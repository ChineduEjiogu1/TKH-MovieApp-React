import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import TheatersIcon from '@mui/icons-material/Theaters';
import TvIcon from '@mui/icons-material/Tv';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


export default function SimpleBottomNavigation() {
  const [page, setPage] = React.useState(0);
  const navigate = useNavigate();


  useEffect(() => {
    if(page === 0 ) navigate("/");
    else if (page === 1) navigate("/movies");
    else if (page === 2) navigate("/series");
    else if (page === 3) navigate("/search");
  }, [page]);

  return (
      <BottomNavigation
        style={{backgroundColor: "#282c34" , position: "fixed", bottom: 0, zIndex: 100, width: "100%"}}
        showLabels
        page={page}
        onChange={(event, newValue) => {
          setPage(newValue);
        }}
      >
        <BottomNavigationAction
            style={{color: "white"}}
            label="Trending"
            icon={<WhatshotIcon/>}
        />

<BottomNavigationAction
            style={{color: "white"}}
            label="Movies"
            icon={<TheatersIcon/>}
        />

<BottomNavigationAction
            style={{color: "white"}}
            label="TV Series"
            icon={<TvIcon/>}
        />

<BottomNavigationAction
            style={{color: "white"}}
            label="Search"
            icon={<SearchIcon/>}
        />

      </BottomNavigation>
  );
}