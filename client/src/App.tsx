import React from 'react';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import MainPage from './Pages/MainPage/MainPage';
import CreateCollectionPage from './Pages/CreateCollection/CreateCollectionPage';
import CreateItem from './Pages/CreateItem/CreateItem';

function App() {
  return (
    <div>
     <BrowserRouter>
     <Navbar/>
     <Routes>
        <Route path='/' element={<MainPage/>}/>
        <Route path='/create' element={<CreateCollectionPage/>}/>
        <Route path='/item/create' element={<CreateItem/>}/>
     </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
