import './App.css'
import MiningGrounds from './components/MiningGrounds'
import Base from './components/Base';
import Battlefield from './components/Battlefield';
import {
  BrowserRouter, Routes, Route
} from "react-router-dom";


function App() {
  return (
    <>
    <BrowserRouter basename="/2023-p3a-mpa-react-project-CernyDavid/">
      <Routes>
        <Route path="/" element={ <Base /> } />
        <Route path="/mining" element={ <MiningGrounds /> } />
        <Route path="/base" element={ <Base /> } />
        <Route path="/battle" element={ <Battlefield /> } />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
