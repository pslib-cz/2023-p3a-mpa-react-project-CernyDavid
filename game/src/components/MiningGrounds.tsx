import { ResourcesContext } from "../providers/ResourcesProvider";
import { useContext, useEffect, useState } from "react";
import { BuildingsContext } from "../providers/BuildingsProvider";
import { Link } from "react-router-dom";

const MiningGrounds = () => {
    const { resources, updateResources } = useContext(ResourcesContext);
    const [factoryLevel, setFactoryLevel] = useContext(BuildingsContext).factory;
    const [ardcLevel, setArdcLevel] = useContext(BuildingsContext).ardc;
    const [mainframeLevel, setMainframeLevel] = useContext(BuildingsContext).mainframe;
    const [metalMiningUnits, setMetalMiningUnits] = useState<number>(0);
    const [crystalMiningUnits, setCrystalMiningUnits] = useState<number>(0);
    const [gemstoneMiningUnits, setGemstoneMiningUnits] = useState<number>(0);
    const [availableMiningUnits, setAvailableMiningUnits] = useState<number>(0);
    const [availabelSentryDrones, setAvailableSentryDrones] = useState<number>(0);
    const [miningUnitsLevel, setMiningUnitsLevel] = useState<number>(0);
    const [sentryDronesLevel, setSentryDronesLevel] = useState<number>(0);


    useEffect(() => {
        const metal = parseInt(localStorage.getItem('metal') || '0');
        const crystal = parseInt(localStorage.getItem('crystal') || '0');
        const gemstone = parseInt(localStorage.getItem('gemstone') || '0');
        updateResources({ metal, crystal, gemstone });
        const factoryLevel = parseInt(localStorage.getItem('factoryLevel') || '0');
        const ardcLevel = parseInt(localStorage.getItem('ardcLevel') || '0');
        const mainframeLevel = parseInt(localStorage.getItem('mainframeLevel') || '0');
        setFactoryLevel(factoryLevel);
        setArdcLevel(ardcLevel);
        setMainframeLevel(mainframeLevel);
        if (factoryLevel > 10) {
            setAvailableMiningUnits(10);
        }
        else if (factoryLevel > 0) {
            setAvailableMiningUnits(factoryLevel);
        }
        if (factoryLevel > 20) {
            setAvailableSentryDrones(10);
        }
        else if (factoryLevel > 10) {
            setAvailableSentryDrones(factoryLevel - 10);
        }
        if (ardcLevel > 0) {
            setMiningUnitsLevel(Math.floor(ardcLevel / 5) + 1);
            setSentryDronesLevel(Math.floor(ardcLevel / 10) + 1);
        }
    }, []);

    useEffect(() => {
        let interval: number;
        if (metalMiningUnits > 0 || crystalMiningUnits > 0 || gemstoneMiningUnits > 0) {
            interval = setTimeout(() => {
                mineMetal(metalMiningUnits);
                const timeout1 = setTimeout(() => {
                    mineCrystal(crystalMiningUnits);
                    const timeout2 = setTimeout(() => {
                        mineGemstone(gemstoneMiningUnits);
                    }, 1000);
                    return () => clearTimeout(timeout2);
                }, 1000);
                return () => clearTimeout(timeout1);
            }, 1000);
        }
        return () => clearTimeout(interval);
    }, [resources.metal, metalMiningUnits, resources.crystal, crystalMiningUnits, resources.gemstone, gemstoneMiningUnits]);

    const mineMetal = (amount: number) => {
        const newMetal = resources.metal + amount;
        updateResources({ metal: newMetal, crystal: resources.crystal, gemstone: resources.gemstone });
        localStorage.setItem('metal', (resources.metal + amount).toString());
    }
    
    const mineCrystal = (amount: number) => {
        const newCrystal = resources.crystal + amount;
        updateResources({ metal: resources.metal, crystal: newCrystal, gemstone: resources.gemstone });
        localStorage.setItem('crystal', (resources.crystal + amount).toString());
    }
    
    const mineGemstone = (amount: number) => {
        const newGemstone = resources.gemstone + amount;
        updateResources({ metal: resources.metal, crystal: resources.crystal, gemstone: newGemstone });
        localStorage.setItem('gemstone', (resources.gemstone + amount).toString());
    }

    const addMetalMiningUnit = () => {
        if (availableMiningUnits < 1) {
            return;
        }
        setMetalMiningUnits(metalMiningUnits + 1);
        setAvailableMiningUnits(availableMiningUnits - 1);
    }
    const addCrystalMiningUnit = () => {
        if (availableMiningUnits < 1) {
            return;
        }
        setCrystalMiningUnits(crystalMiningUnits + 1);
        setAvailableMiningUnits(availableMiningUnits - 1);
    }
    const addGemstoneMiningUnit = () => {
        if (availableMiningUnits < 1) {
            return;
        }
        setGemstoneMiningUnits(gemstoneMiningUnits + 1);
        setAvailableMiningUnits(availableMiningUnits - 1);
    }

    return (
        <div>
            <h1>Mining Grounds</h1>
            <p>Metal: {resources.metal}</p>
            <button onClick={() => mineMetal(mainframeLevel * 10)}>Mine Metal</button>
            <button onClick={() => addMetalMiningUnit()}>Add Miner</button>
            <p>{metalMiningUnits} mining metal.</p>
            <p>Crystal: {resources.crystal}</p>
            <button onClick={() => mineCrystal(mainframeLevel * 5)}>Mine Crystal</button>
            <button onClick={() => addCrystalMiningUnit()}>Add Miner</button>
            <p>{crystalMiningUnits} mining crystal.</p>
            <p>Gemstone: {resources.gemstone}</p>
            <button onClick={() => mineGemstone(mainframeLevel * 2)}>Mine Gemstone</button>
            <button onClick={() => addGemstoneMiningUnit()}>Add Miner</button>
            <p>{gemstoneMiningUnits} mining gemstone.</p>
            <h2>Automation</h2>
            <p>Mining units: {availableMiningUnits}, level: {miningUnitsLevel}</p>
            <p>Sentry drones: {availabelSentryDrones}, level: {sentryDronesLevel}</p>
            <Link to="/battle">Battlefield</Link>
            <Link to="/base">Base</Link>
        </div>
    );
}

export default MiningGrounds;
