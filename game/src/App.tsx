import './App.css'
import MiningGrounds from './components/MiningGrounds'
import Base from './components/Base';
import Battlefield from './components/Battlefield';
import {
  Routes, Route, HashRouter
} from "react-router-dom";


function App() {
  return (
    <>
    <HashRouter>
      <Routes>
        <Route path="/" element={ <Base /> } />
        <Route path="/mining" element={ <MiningGrounds /> } />
        <Route path="/base" element={ <Base /> } />
        <Route path="/battle" element={ <Battlefield /> } />
      </Routes>
    </HashRouter>
    </>
  )
}

export default App
