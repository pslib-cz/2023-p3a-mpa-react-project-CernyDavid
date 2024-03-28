import { ResourcesContext } from "../providers/ResourcesProvider";
import { useContext, useEffect } from "react";
import { ResourcesType } from "../providers/ResourcesProvider";

const MiningGrounds = (currentResources: ResourcesType ) => {
    const resources = useContext(ResourcesContext).resources;
    const updateResources = useContext(ResourcesContext).updateResources;

    useEffect(() => {
        updateResources(currentResources);
    }, []);

    const mineMetal = () => {
        updateResources({ metal: resources.metal + 1, crystal: resources.crystal, gemstone: resources.gemstone });
    }
    const mineCrystal = () => {
        updateResources({ metal: resources.metal, crystal: resources.crystal + 1, gemstone: resources.gemstone });
    }
    const mineGemstone = () => {
        updateResources({ metal: resources.metal, crystal: resources.crystal, gemstone: resources.gemstone + 1 });
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