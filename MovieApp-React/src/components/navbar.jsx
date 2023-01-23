import * as React from 'react';
import { Box } from "@mui/material"; 
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import TheatersIcon from '@mui/icons-material/Theaters';
import TvIcon from '@mui/icons-material/Tv';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();


  useEffect(() => {
    if(value === 0 ) navigate("/");
    else if (value === 1) navigate("/movies");
    else if (value === 2) navigate("/series");
    else if (value === 3) navigate("/search");
  }, [value]);

  return (
    // <Box sx={{ width: "100%"}}>
      <BottomNavigation
        style={{backgroundColor: "#2d313a" , position: "fixed", bottom: 0, zIndex: 100, width: "100%"}}
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
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
    // </Box>
  );
}