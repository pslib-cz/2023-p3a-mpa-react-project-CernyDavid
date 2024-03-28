import './App.css'
import MiningGrounds from './components/MiningGrounds'
import Base from './components/Base';
import Battlefield from './components/Battlefield';
import {
  BrowserRouter, Routes, Route
} from "react-router-dom";
import { ResourcesContext } from "./providers/ResourcesProvider";
import { useContext } from "react";



function App() {
  const resources = useContext(ResourcesContext).resources;
  const updateResources = useContext(ResourcesContext).updateResources;

  return (
    <>
    {resources.metal}
    {resources.crystal}
    {resources.gemstone}
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Base /> } />
        <Route path="/mining" element={ <MiningGrounds metal={resources.metal} crystal={resources.crystal} gemstone={resources.gemstone}/> } />
        <Route path="/base" element={ <Base /> } />
        <Route path="/battle" element={ <Battlefield /> } />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
