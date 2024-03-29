import { ResourcesContext } from "../providers/ResourcesProvider";
import { useContext, useEffect } from "react";

const MiningGrounds = () => {
    const resources = useContext(ResourcesContext).resources;
    const updateResources = useContext(ResourcesContext).updateResources;

    useEffect(() => {
        const metal = parseInt(localStorage.getItem('metal') || '0');
        const crystal = parseInt(localStorage.getItem('crystal') || '0');
        const gemstone = parseInt(localStorage.getItem('gemstone') || '0');
        updateResources({ metal, crystal, gemstone });
    }, []);

    const mineMetal = () => {
        updateResources({ metal: resources.metal + 1, crystal: resources.crystal, gemstone: resources.gemstone });
        localStorage.setItem('metal', (resources.metal + 1).toString());
    }
    const mineCrystal = () => {
        updateResources({ metal: resources.metal, crystal: resources.crystal + 1, gemstone: resources.gemstone });
        localStorage.setItem('crystal', (resources.crystal + 1).toString());
    }
    const mineGemstone = () => {
        updateResources({ metal: resources.metal, crystal: resources.crystal, gemstone: resources.gemstone + 1 });
        localStorage.setItem('gemstone', (resources.gemstone + 1).toString());
    }

    return (
        <div>
            <h1>Mining Grounds</h1>
            <p>Metal: {resources.metal}</p>
            <button onClick={mineMetal}>Mine Metal</button>
            <p>Crystal: {resources.crystal}</p>
            <button onClick={mineCrystal}>Mine Crystal</button>
            <p>Gemstone: {resources.gemstone}</p>
            <button onClick={mineGemstone}>Mine Gemstone</button>
        </div>
    );
}

export default MiningGrounds;