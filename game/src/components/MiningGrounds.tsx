import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GameStateContext } from "../providers/GameStateProvider";
import { ActionType } from "../providers/GameStateProvider";

const MiningGrounds = () => {
    const {state, dispatch} = useContext(GameStateContext);
    const [miningUnitsToDeploy, setMiningUnitsToDeploy] = useState<number>(0);
    const [sentryDronesToDeploy, setSentryDronesToDeploy] = useState<number>(0);

    useEffect(() => {
        const metal = parseInt(localStorage.getItem('metal') || '0');
        const crystal = parseInt(localStorage.getItem('crystal') || '0');
        const gemstone = parseInt(localStorage.getItem('gemstone') || '0');
        const metalMiningUnits = parseInt(localStorage.getItem('metalMiningUnits') || '0');
        const crystalMiningUnits = parseInt(localStorage.getItem('crystalMiningUnits') || '0');
        const gemstoneMiningUnits = parseInt(localStorage.getItem('gemstoneMiningUnits') || '0');
        const availableMiningUnits = parseInt(localStorage.getItem('availableMiningUnits') || '0');
        const availableSentryDrones = parseInt(localStorage.getItem('availableSentryDrones') || '0');
        const metalSentryDrones = parseInt(localStorage.getItem('metalSentryDrones') || '0');
        const crystalSentryDrones = parseInt(localStorage.getItem('crystalSentryDrones') || '0');
        const gemstoneSentryDrones = parseInt(localStorage.getItem('gemstoneSentryDrones') || '0');
        dispatch({type: ActionType.SET_RESOURCES, payload: {metal, crystal, gemstone}});
        setMiningUnitsToDeploy(availableMiningUnits - metalMiningUnits - crystalMiningUnits - gemstoneMiningUnits);
        setSentryDronesToDeploy(availableSentryDrones - metalSentryDrones - crystalSentryDrones - gemstoneSentryDrones);

        if (state.metalMiningUnits === 0) {
            dispatch({type: ActionType.SET_METAL_MINING_UNITS, value: metalMiningUnits});
            localStorage.setItem('metalMiningUnits', (metalMiningUnits).toString());
        }
        if (state.crystalMiningUnits === 0) {
            dispatch({type: ActionType.SET_CRYSTAL_MINING_UNITS, value: crystalMiningUnits});
            localStorage.setItem('crystalMiningUnits', (crystalMiningUnits).toString());
        }
        if (state.gemstoneMiningUnits === 0) {
            dispatch({type: ActionType.SET_GEMSTONE_MINING_UNITS, value: gemstoneMiningUnits});
            localStorage.setItem('gemstoneMiningUnits', (gemstoneMiningUnits).toString());
        }
        if (state.metalSentryDrones === 0) {
            dispatch({type: ActionType.SET_METAL_SENTRY_DRONES, value: metalSentryDrones});
            localStorage.setItem('metalSentryDrones', (metalSentryDrones).toString());
        }
        if (state.crystalSentryDrones === 0) {
            dispatch({type: ActionType.SET_CRYSTAL_SENTRY_DRONES, value: crystalSentryDrones});
            localStorage.setItem('crystalSentryDrones', (crystalSentryDrones).toString());
        }
        if (state.gemstoneSentryDrones === 0) {
            dispatch({type: ActionType.SET_GEMSTONE_SENTRY_DRONES, value: gemstoneSentryDrones});
            localStorage.setItem('gemstoneSentryDrones', (gemstoneSentryDrones).toString());
        }

        if (state.miningUnitsLevel === 0) {
            dispatch({type: ActionType.UPGRADE_MINING_UNITS, value: parseInt(localStorage.getItem('miningUnitsLevel') || '1')});
        }
        if (state.sentryDronesLevel === 0) {
            dispatch({type: ActionType.UPGRADE_SENTRY_DRONES, value: parseInt(localStorage.getItem('sentryDronesLevel') || '1')});
        }

    }, []);

    let prevMetal : number = state.resources.metal;
    let prevCrystal : number = state.resources.crystal;
    let prevGemstone : number = state.resources.gemstone;

    useEffect(() => {
        let interval: number;
        if (state.metalMiningUnits > 0 || state.crystalMiningUnits > 0 || state.gemstoneMiningUnits > 0) {
            interval = setInterval(() => {
                let metalMUAmount = state.metalMiningUnits;
                let crystalMUAmount = state.crystalMiningUnits;
                let gemstoneMUAmount = state.gemstoneMiningUnits;
                let MULevel = state.miningUnitsLevel;
                let metalSDAmount = state.metalSentryDrones;
                let crystalSDAmount = state.crystalSentryDrones;
                let gemstoneSDAmount = state.gemstoneSentryDrones;
                let SDLevel = state.sentryDronesLevel;
            
                let metalMiningAmount = metalMUAmount * Math.pow(2, (MULevel - 1)) * metalSDAmount * Math.pow(2, (SDLevel - 1)) +
                    (metalSDAmount * (Math.pow(2, ((metalSDAmount - 1) * Math.pow(2, (SDLevel - 1)))))) * 10 +
                    metalMUAmount * ((Math.pow(2, ((metalMUAmount - 1) * Math.pow(2, (MULevel - 1)) * metalSDAmount * Math.pow(2, (SDLevel - 1))) +
                    (metalSDAmount * (Math.pow(2, ((metalSDAmount - 1) * Math.pow(2, (SDLevel - 1))))))))) * 10;
                
                let crystalMiningAmount = crystalMUAmount * Math.pow(2, (MULevel - 1)) * crystalSDAmount * Math.pow(2, (SDLevel - 1)) +
                    (crystalSDAmount * (Math.pow(2, ((crystalSDAmount - 1) * Math.pow(2, (SDLevel - 1)))))) * 5 +
                    crystalMUAmount * ((Math.pow(2, ((crystalMUAmount - 1) * Math.pow(2, (MULevel - 1)) * crystalSDAmount * Math.pow(2, (SDLevel - 1))) +
                    (crystalSDAmount * (Math.pow(2, ((crystalSDAmount - 1) * Math.pow(2, (SDLevel - 1))))))))) * 5;

                let gemstoneMiningAmount = gemstoneMUAmount * Math.pow(2, (MULevel - 1)) * gemstoneSDAmount * Math.pow(2, (SDLevel - 1)) +
                    (gemstoneSDAmount * (Math.pow(2, ((gemstoneSDAmount - 1) * Math.pow(2, (SDLevel - 1)))))) * 2 +
                    gemstoneMUAmount * ((Math.pow(2, ((gemstoneMUAmount - 1) * Math.pow(2, (MULevel - 1)) * gemstoneSDAmount * Math.pow(2, (SDLevel - 1))) +
                    (gemstoneSDAmount * (Math.pow(2, ((gemstoneSDAmount - 1) * Math.pow(2, (SDLevel - 1))))))))) * 2;

                
                if (state.metalMiningUnits > 0 && state.crystalMiningUnits > 0 && state.gemstoneMiningUnits > 0) {
                    dispatch({type: ActionType.SET_RESOURCES, payload: {metal: prevMetal + metalMiningAmount, crystal: prevCrystal + crystalMiningAmount, gemstone: prevGemstone + gemstoneMiningAmount}});
                    prevMetal += metalMiningAmount;
                    prevCrystal += crystalMiningAmount;
                    prevGemstone += gemstoneMiningAmount;
                    localStorage.setItem('metal', (prevMetal).toString());
                    localStorage.setItem('crystal', (prevCrystal).toString());
                    localStorage.setItem('gemstone', (prevGemstone).toString());
                }
                else if (state.metalMiningUnits > 0 && state.crystalMiningUnits > 0) {
                    dispatch({type: ActionType.SET_RESOURCES, payload: {metal: prevMetal + metalMiningAmount, crystal: prevCrystal + crystalMiningAmount, gemstone: parseInt(localStorage.getItem('gemstone') || '0')}});
                    prevMetal += metalMiningAmount;
                    prevCrystal += crystalMiningAmount;
                    localStorage.setItem('metal', (prevMetal).toString());
                    localStorage.setItem('crystal', (prevCrystal).toString());
                }
                else if (state.metalMiningUnits > 0 && state.gemstoneMiningUnits > 0) {
                    dispatch({type: ActionType.SET_RESOURCES, payload: {metal: prevMetal + metalMiningAmount, crystal: parseInt(localStorage.getItem('crystal') || '0'), gemstone: prevGemstone + gemstoneMiningAmount}});
                    prevMetal += metalMiningAmount;
                    prevGemstone += gemstoneMiningAmount;
                    localStorage.setItem('metal', (prevMetal).toString());
                    localStorage.setItem('gemstone', (prevGemstone).toString());
                }
                else if (state.crystalMiningUnits > 0 && state.gemstoneMiningUnits > 0) {
                    dispatch({type: ActionType.SET_RESOURCES, payload: {metal: parseInt(localStorage.getItem('metal') || '0'), crystal: prevCrystal + crystalMiningAmount, gemstone: prevGemstone + gemstoneMiningAmount}});
                    prevCrystal += crystalMiningAmount;
                    prevGemstone += gemstoneMiningAmount;
                    localStorage.setItem('crystal', (prevCrystal).toString());
                    localStorage.setItem('gemstone', (prevGemstone).toString());
                }
                else if (state.metalMiningUnits > 0) {
                    dispatch({type: ActionType.SET_RESOURCES, payload: {metal: prevMetal + metalMiningAmount, crystal: parseInt(localStorage.getItem('crystal') || '0'), gemstone: parseInt(localStorage.getItem('gemstone') || '0')}});
                    prevMetal += metalMiningAmount;
                    localStorage.setItem('metal', (prevMetal).toString());
                }
                else if (state.crystalMiningUnits > 0) {
                    dispatch({type: ActionType.SET_RESOURCES, payload: {metal: parseInt(localStorage.getItem('metal') || '0'), crystal: prevCrystal + crystalMiningAmount, gemstone: parseInt(localStorage.getItem('gemstone') || '0')}});
                    prevCrystal += crystalMiningAmount;
                    localStorage.setItem('crystal', (prevCrystal).toString());
                }
                else if (state.gemstoneMiningUnits > 0) {
                    dispatch({type: ActionType.SET_RESOURCES, payload: {metal: parseInt(localStorage.getItem('metal') || '0'), crystal: parseInt(localStorage.getItem('crystal') || '0'), gemstone: prevGemstone + gemstoneMiningAmount}});
                    prevGemstone += gemstoneMiningAmount;
                    localStorage.setItem('gemstone', (prevGemstone).toString());
                }
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [state.metalMiningUnits, state.crystalMiningUnits, state.gemstoneMiningUnits]);

    const mineMetal = (amount: number) => {
        let newMetal;
        newMetal = state.resources.metal + amount;
        localStorage.setItem('metal', (newMetal).toString());
        dispatch({type: ActionType.SET_RESOURCES, payload: {metal: newMetal, crystal: state.resources.crystal, gemstone: state.resources.gemstone}});
    }
    
    const mineCrystal = (amount: number) => {
        let newCrystal;
        newCrystal = state.resources.crystal + amount;
        localStorage.setItem('crystal', (newCrystal).toString());
        dispatch({type: ActionType.SET_RESOURCES, payload: {metal: state.resources.metal, crystal: newCrystal, gemstone: state.resources.gemstone}});
    }
    
    const mineGemstone = (amount: number) => {
        let newGemstone;
        newGemstone = state.resources.gemstone + amount;
        localStorage.setItem('gemstone', (newGemstone).toString());
        dispatch({type: ActionType.SET_RESOURCES, payload: {metal: state.resources.metal, crystal: state.resources.crystal, gemstone: newGemstone}});
    }

    const addMetalMiningUnit = () => {
        if (miningUnitsToDeploy < 1) {
            return;
        }
        setMiningUnitsToDeploy(miningUnitsToDeploy - 1);
        dispatch({type: ActionType.SET_METAL_MINING_UNITS, value: state.metalMiningUnits + 1});
        localStorage.setItem('metalMiningUnits', (state.metalMiningUnits + 1).toString());
    }
    const addCrystalMiningUnit = () => {
        if (miningUnitsToDeploy < 1) {
            return;
        }
        setMiningUnitsToDeploy(miningUnitsToDeploy - 1);
        dispatch({type: ActionType.SET_CRYSTAL_MINING_UNITS, value: state.crystalMiningUnits + 1});
        localStorage.setItem('crystalMiningUnits', (state.crystalMiningUnits + 1).toString());
    }
    const addGemstoneMiningUnit = () => {
        if (miningUnitsToDeploy < 1) {
            return;
        }
        setMiningUnitsToDeploy(miningUnitsToDeploy - 1);
        dispatch({type: ActionType.SET_GEMSTONE_MINING_UNITS, value: state.gemstoneMiningUnits + 1});
        localStorage.setItem('gemstoneMiningUnits', (state.gemstoneMiningUnits + 1).toString());
    }
    const addMetalSentryDrone = () => {
        if (sentryDronesToDeploy < 1) {
            return;
        }
        setSentryDronesToDeploy(sentryDronesToDeploy - 1);
        dispatch({type: ActionType.SET_METAL_SENTRY_DRONES, value: state.metalSentryDrones + 1});
        localStorage.setItem('metalSentryDrones', (state.metalSentryDrones + 1).toString());
    }
    const addCrystalSentryDrone = () => {
        if (sentryDronesToDeploy < 1) {
            return;
        }
        setSentryDronesToDeploy(sentryDronesToDeploy - 1);
        dispatch({type: ActionType.SET_CRYSTAL_SENTRY_DRONES, value: state.crystalSentryDrones + 1});
        localStorage.setItem('crystalSentryDrones', (state.crystalSentryDrones + 1).toString());
    }
    const addGemstoneSentryDrone = () => {
        if (sentryDronesToDeploy < 1) {
            return;
        }
        setSentryDronesToDeploy(sentryDronesToDeploy - 1);
        dispatch({type: ActionType.SET_GEMSTONE_SENTRY_DRONES, value: state.gemstoneSentryDrones + 1});
        localStorage.setItem('gemstoneSentryDrones', (state.gemstoneSentryDrones + 1).toString());
    }
    const removeMetalMiningUnit = () => {
        if (state.metalMiningUnits < 1) {
            return;
        }
        setMiningUnitsToDeploy(miningUnitsToDeploy + 1);
        dispatch({type: ActionType.SET_METAL_MINING_UNITS, value: state.metalMiningUnits - 1});
        localStorage.setItem('metalMiningUnits', (state.metalMiningUnits - 1).toString());
    }
    const removeCrystalMiningUnit = () => {
        if (state.crystalMiningUnits < 1) {
            return;
        }
        setMiningUnitsToDeploy(miningUnitsToDeploy + 1);
        dispatch({type: ActionType.SET_CRYSTAL_MINING_UNITS, value: state.crystalMiningUnits - 1});
        localStorage.setItem('crystalMiningUnits', (state.crystalMiningUnits - 1).toString());
    }
    const removeGemstoneMiningUnit = () => {
        if (state.gemstoneMiningUnits < 1) {
            return;
        }
        setMiningUnitsToDeploy(miningUnitsToDeploy + 1);
        dispatch({type: ActionType.SET_GEMSTONE_MINING_UNITS, value: state.gemstoneMiningUnits - 1});
        localStorage.setItem('gemstoneMiningUnits', (state.gemstoneMiningUnits - 1).toString());
    }
    const removeMetalSentryDrone = () => {
        if (state.metalSentryDrones < 1) {
            return;
        }
        setSentryDronesToDeploy(sentryDronesToDeploy + 1);
        dispatch({type: ActionType.SET_METAL_SENTRY_DRONES, value: state.metalSentryDrones - 1});
        localStorage.setItem('metalSentryDrones', (state.metalSentryDrones - 1).toString());
    }
    const removeCrystalSentryDrone = () => {
        if (state.crystalSentryDrones < 1) {
            return;
        }
        setSentryDronesToDeploy(sentryDronesToDeploy + 1);
        dispatch({type: ActionType.SET_CRYSTAL_SENTRY_DRONES, value: state.crystalSentryDrones - 1});
        localStorage.setItem('crystalSentryDrones', (state.crystalSentryDrones - 1).toString());
    }
    const removeGemstoneSentryDrone = () => {
        if (state.gemstoneSentryDrones < 1) {
            return;
        }
        setSentryDronesToDeploy(sentryDronesToDeploy + 1);
        dispatch({type: ActionType.SET_GEMSTONE_SENTRY_DRONES, value: state.gemstoneSentryDrones - 1});
        localStorage.setItem('gemstoneSentryDrones', (state.gemstoneSentryDrones - 1).toString());
    }

    const getClickAmount = () => {
        return Math.pow(2, state.mainframeLevel);
    }

    return (
        <div>
            <h1>Mining Grounds</h1>
            <p>Metal: {state.resources.metal}</p>
            <button onClick={() => mineMetal(getClickAmount() * 10)}>Mine Metal</button>
            <button onClick={() => addMetalMiningUnit()}>Add Miner</button>
            <button onClick={() => addMetalSentryDrone()}>Add Sentry Drone</button>
            <button onClick={() => removeMetalMiningUnit()}>Remove Miner</button>
            <button onClick={() => removeMetalSentryDrone()}>Remove Sentry Drone</button>
            <p>{state.metalMiningUnits} mining metal.</p>
            <p>Crystal: {state.resources.crystal}</p>
            <button onClick={() => mineCrystal(getClickAmount() * 5)}>Mine Crystal</button>
            <button onClick={() => addCrystalMiningUnit()}>Add Miner</button>
            <button onClick={() => addCrystalSentryDrone()}>Add Sentry Drone</button>
            <button onClick={() => removeCrystalMiningUnit()}>Remove Miner</button>
            <button onClick={() => removeCrystalSentryDrone()}>Remove Sentry Drone</button>
            <p>{state.crystalMiningUnits} mining crystal.</p>
            <p>Gemstone: {state.resources.gemstone}</p>
            <button onClick={() => mineGemstone(getClickAmount()* 2)}>Mine Gemstone</button>
            <button onClick={() => addGemstoneMiningUnit()}>Add Miner</button>
            <button onClick={() => addGemstoneSentryDrone()}>Add Sentry Drone</button>
            <button onClick={() => removeGemstoneMiningUnit()}>Remove Miner</button>
            <button onClick={() => removeGemstoneSentryDrone()}>Remove Sentry Drone</button>
            <p>{state.gemstoneMiningUnits} mining gemstone.</p>
            <h2>Automation</h2>
            <p>Mining units: {miningUnitsToDeploy}, level: {state.miningUnitsLevel}</p>
            <p>Sentry drones: {sentryDronesToDeploy}, level: {state.sentryDronesLevel}</p>
            <Link to="/battle">Battlefield</Link>
            <Link to="/base">Base</Link>
        </div>
    );
}

export default MiningGrounds;
