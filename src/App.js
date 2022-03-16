import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './pages/nav';
import Main from './pages/main';
import OneSlider from './pages/oneSlider';
import MultipleSlider from './pages/multipleSlider';
import InfiniteCarousel from './pages/infiniteCarousel';

function App() {
  return (
    <div className='App'>
      <div id='appWrapper'>
        <BrowserRouter>
          <header className='App-header'>
            <h1>Carousels</h1>
          </header>
          <Nav />
          <main>
            <Routes>
              <Route path='/' element={<Main />} />
              <Route path='/oneSlider' element={<OneSlider />} />
              <Route path='/multipleSlider' element={<MultipleSlider />} />
              <Route path='/infiniteCarousel' element={<InfiniteCarousel />} />
            </Routes>
          </main>
          <footer>Youngseo Kangg</footer>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
