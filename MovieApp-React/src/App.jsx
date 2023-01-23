 import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/Header/header';
import SimpleBottomNavigation from './components/navbar';
import Container from '@mui/material/Container';
import Trending from './Pages/Trending/trending';
import Movies from './Pages/Movies/movies';
import Series from './Pages/Series/series';
import Search from './Pages/Search/search'


function App() {
  
  return (
    <Router>
    <Header />
    <div className='app'>
      <Container>
        <Routes>
          <Route exact path='/' element={<Trending/>}/>
          <Route exact path='/movies' element={<Movies/>}/>
          <Route exact path='/series' element={<Series/>}/>
          <Route exact path='/search' element={<Search/>}/>
        </Routes>
      </Container>
    </div>
    
    <SimpleBottomNavigation/>
   </Router>
  );
}

export default App;