import { ResourcesContext } from "../providers/ResourcesProvider";
import { useContext, useEffect, useState } from "react";

const MiningGrounds = () => {
    const { resources, updateResources } = useContext(ResourcesContext);
    const [metalMiningUnits, setMetalMiningUnits] = useState<number>(0);

    useEffect(() => {
        const metal = parseInt(localStorage.getItem('metal') || '0');
        const crystal = parseInt(localStorage.getItem('crystal') || '0');
        const gemstone = parseInt(localStorage.getItem('gemstone') || '0');
        updateResources({ metal, crystal, gemstone });
    }, []);

    useEffect(() => {
        let interval: number;
        if (metalMiningUnits > 0) {
            interval = setInterval(() => {
                mineMetal(metalMiningUnits);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [resources.metal, metalMiningUnits]);

    const mineMetal = (amount : number) => {
        const newMetalAmount = resources.metal + amount;
        updateResources({ metal: newMetalAmount, crystal: resources.crystal, gemstone: resources.gemstone });
        localStorage.setItem('metal', newMetalAmount.toString());
    }

    const mineCrystal = (amount : number) => {
        const newCrystalAmount = resources.crystal + amount;
        updateResources({ metal: resources.metal, crystal: newCrystalAmount, gemstone: resources.gemstone });
        localStorage.setItem('crystal', newCrystalAmount.toString());
    }

    const mineGemstone = (amount : number) => {
        const newGemstoneAmount = resources.gemstone + amount;
        updateResources({ metal: resources.metal, crystal: resources.crystal, gemstone: newGemstoneAmount });
        localStorage.setItem('gemstone', newGemstoneAmount.toString());
    }

    return (
        <div>
            <h1>Mining Grounds</h1>
            <p>Metal: {resources.metal}</p>
            <button onClick={() => mineMetal(1)}>Mine Metal</button>
            <button onClick={() => setMetalMiningUnits(metalMiningUnits + 1)}>Add Miner</button>
            <p>Crystal: {resources.crystal}</p>
            <button onClick={() => mineCrystal(1)}>Mine Crystal</button>
            <p>Gemstone: {resources.gemstone}</p>
            <button onClick={() => mineGemstone(1)}>Mine Gemstone</button>
        </div>
    );
}

export default MiningGrounds;
