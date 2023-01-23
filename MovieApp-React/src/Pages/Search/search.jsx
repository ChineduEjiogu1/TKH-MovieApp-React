import React, { useState, useEffect} from 'react'
import TextField from '@mui/material/TextField';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import axios from 'axios';
import Pagination from '../../components/Pagination/pagination';
import DisplayContent from '../../components/Display_Content/display_content';

const API_KEY = import.meta.env.VITE_APP_MOVIE_API_KEY;

const Search = () => {

  const [type, setType] = useState(0);
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [output, setOutput] = useState();
  const [numOfPages, setNumOfPages] = useState();

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: "#fff",
      },
    },
  });

  const fetchSearch = async () => {
    const { data } = await axios.get(`https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${API_KEY}&language=en-US&query=${searchInput}&page=${page}&include_adult=false`);

    setOutput(data.results);
    setNumOfPages(data.total_pages);
  };

  useEffect(() => {
    window.scroll(0,0);
    fetchSearch();
}, [type, page]);

  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <div style={{display: "flex", margin: "15px 0"}}>
          <TextField
          style={{flex: 1}} 
          className="searchBox"
          label="search"
          variant="filled"
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <Button variant="contained" style={{marginLeft: 10}}
        onClick={fetchSearch}
        > 
          <SearchIcon/> 
        </Button>
        </div>

      <Tabs 
      value={type} 
      indicatorColor="primary" 
      textColor="primary"
      onChange={(event, newValue) => {
        setType(newValue);
        setPage(1);
      }}
      style={{ paddingBottom: 7}}
      >
        <Tab style={{width: "50%"}} label="Search Movies"/>
        <Tab style={{width: "50%"}} label="Search TV Series"/>
      </Tabs>

    </ThemeProvider> 
    <div className="trending">
                    {
                        output && output.map((c) => (
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
                    {searchInput && !output && (type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)}
            </div>
            {numOfPages > 1 && (
                <Pagination setPage={setPage} numOfPages={numOfPages}/>
            )}
    </div>
  )
}

export default Search;