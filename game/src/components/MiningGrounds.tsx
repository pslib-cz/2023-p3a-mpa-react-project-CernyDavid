import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GameStateContext } from "../providers/GameStateProvider";
import { ActionType } from "../providers/GameStateProvider";
import '../styles/main.css';

const MiningGrounds = () => {
    const {state, dispatch} = useContext(GameStateContext);
    const [miningUnitsToDeploy, setMiningUnitsToDeploy] = useState<number>(0);
    const [sentryDronesToDeploy, setSentryDronesToDeploy] = useState<number>(0);

    useEffect(() => {
        setMiningUnitsToDeploy(state.availableMiningUnits - state.metalMiningUnits - state.crystalMiningUnits - state.gemstoneMiningUnits);
        setSentryDronesToDeploy(state.availableSentryDrones - state.metalSentryDrones - state.crystalSentryDrones - state.gemstoneSentryDrones);

        const serializedState = localStorage.getItem('gameState');
        if (serializedState) {
            dispatch({type: ActionType.SET_GAMESTATE, payload: JSON.parse(serializedState)});
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('gameState', JSON.stringify(state));
    }, [state]);

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

                let metalSDBoostExtra = (metalSDAmount-1) * Math.pow(2, (SDLevel - 1));
                if (metalSDAmount < 2) {
                    metalSDBoostExtra = 0;
                }
                let metalSDBoost = Math.pow(2 ,metalSDAmount * Math.pow(2, (SDLevel - 1)) + metalSDBoostExtra);
                if (metalSDAmount < 1) {
                    metalSDBoost = 1;
                }
                let metalMPSExtra = 10 * (metalMUAmount-1) * Math.pow(2, (MULevel - 1)) * metalSDBoost;
                if (metalMUAmount < 2) {
                    metalMPSExtra = 0;
                }
                let metalMiningAmount = 10 * metalMUAmount * Math.pow(2, (MULevel - 1)) * metalSDBoost + (metalMUAmount * metalMPSExtra);

                let crystalSDBoostExtra = (crystalSDAmount-1) * Math.pow(2, (SDLevel - 1));
                if (crystalSDAmount < 2) {
                    crystalSDBoostExtra = 0;
                }
                let crystalSDBoost = Math.pow(2 ,crystalSDAmount * Math.pow(2, (SDLevel - 1)) + crystalSDBoostExtra);
                if (crystalSDAmount < 1) {
                    crystalSDBoost = 1;
                }
                let crystalMPSExtra = 5 * (crystalMUAmount-1) * Math.pow(2, (MULevel - 1)) * crystalSDBoost;
                if (crystalMUAmount < 2) {
                    crystalMPSExtra = 0;
                }	
                let crystalMiningAmount = 5 * crystalMUAmount * Math.pow(2, (MULevel - 1)) * crystalSDBoost + (crystalMUAmount * crystalMPSExtra);
            
                let gemstoneSDBoostExtra = (gemstoneSDAmount-1) * Math.pow(2, (SDLevel - 1));
                if (gemstoneSDAmount < 2) {
                    gemstoneSDBoostExtra = 0;
                }
                let gemstoneSDBoost = Math.pow(2 ,gemstoneSDAmount * Math.pow(2, (SDLevel - 1)) + gemstoneSDBoostExtra);
                if (gemstoneSDAmount < 1) {
                    gemstoneSDBoost = 1;
                }
                let gemstoneMPSExtra = 2 * (gemstoneMUAmount-1) * Math.pow(2, (MULevel - 1)) * gemstoneSDBoost;
                if (gemstoneMUAmount < 2) {
                    gemstoneMPSExtra = 0;
                }
                let gemstoneMiningAmount = 2 * gemstoneMUAmount * Math.pow(2, (MULevel - 1)) * gemstoneSDBoost + (gemstoneMUAmount * gemstoneMPSExtra);

                const oldState = JSON.parse(localStorage.getItem('gameState') || '{}');
                
                if (state.metalMiningUnits > 0 && state.crystalMiningUnits > 0 && state.gemstoneMiningUnits > 0) {
                    dispatch({type: ActionType.SET_RESOURCES, payload: {metal: prevMetal + metalMiningAmount, crystal: prevCrystal + crystalMiningAmount, gemstone: prevGemstone + gemstoneMiningAmount}});
                    prevMetal += metalMiningAmount;
                    prevCrystal += crystalMiningAmount;
                    prevGemstone += gemstoneMiningAmount;
                }
                else if (state.metalMiningUnits > 0 && state.crystalMiningUnits > 0) {
                    dispatch({type: ActionType.SET_RESOURCES, payload: {metal: prevMetal + metalMiningAmount, crystal: prevCrystal + crystalMiningAmount, gemstone: oldState.resources.gemstone}});
                    prevMetal += metalMiningAmount;
                    prevCrystal += crystalMiningAmount;
                }
                else if (state.metalMiningUnits > 0 && state.gemstoneMiningUnits > 0) {
                    dispatch({type: ActionType.SET_RESOURCES, payload: {metal: prevMetal + metalMiningAmount, crystal: oldState.resources.crystal, gemstone: prevGemstone + gemstoneMiningAmount}});
                    prevMetal += metalMiningAmount;
                    prevGemstone += gemstoneMiningAmount;
                }
                else if (state.crystalMiningUnits > 0 && state.gemstoneMiningUnits > 0) {
                    dispatch({type: ActionType.SET_RESOURCES, payload: {metal: oldState.resources.metal, crystal: prevCrystal + crystalMiningAmount, gemstone: prevGemstone + gemstoneMiningAmount}});
                    prevCrystal += crystalMiningAmount;
                    prevGemstone += gemstoneMiningAmount;
                }
                else if (state.metalMiningUnits > 0) {
                    dispatch({type: ActionType.SET_RESOURCES, payload: {metal: prevMetal + metalMiningAmount, crystal: oldState.resources.crystal, gemstone: oldState.resources.gemstone}});
                    prevMetal += metalMiningAmount;
                }
                else if (state.crystalMiningUnits > 0) {
                    dispatch({type: ActionType.SET_RESOURCES, payload: {metal: oldState.resources.metal, crystal: prevCrystal + crystalMiningAmount, gemstone: oldState.resources.gemstone}});
                    prevCrystal += crystalMiningAmount;
                }
                else if (state.gemstoneMiningUnits > 0) {
                    dispatch({type: ActionType.SET_RESOURCES, payload: {metal: oldState.resources.metal, crystal: oldState.resources.crystal, gemstone: prevGemstone + gemstoneMiningAmount}});
                    prevGemstone += gemstoneMiningAmount;
                }
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [state.metalMiningUnits, state.crystalMiningUnits, state.gemstoneMiningUnits]);

    const mineMetal = (amount: number) => {
        let newMetal;
        newMetal = state.resources.metal + amount;
        dispatch({type: ActionType.SET_RESOURCES, payload: {metal: newMetal, crystal: state.resources.crystal, gemstone: state.resources.gemstone}});
    }
    
    const mineCrystal = (amount: number) => {
        let newCrystal;
        newCrystal = state.resources.crystal + amount;
        dispatch({type: ActionType.SET_RESOURCES, payload: {metal: state.resources.metal, crystal: newCrystal, gemstone: state.resources.gemstone}});
    }
    
    const mineGemstone = (amount: number) => {
        let newGemstone;
        newGemstone = state.resources.gemstone + amount;
        dispatch({type: ActionType.SET_RESOURCES, payload: {metal: state.resources.metal, crystal: state.resources.crystal, gemstone: newGemstone}});
    }

    const addMetalMiningUnit = () => {
        if (miningUnitsToDeploy < 1) {
            return;
        }
        setMiningUnitsToDeploy(miningUnitsToDeploy - 1);
        dispatch({type: ActionType.SET_METAL_MINING_UNITS, value: state.metalMiningUnits + 1});
    }
    const addCrystalMiningUnit = () => {
        if (miningUnitsToDeploy < 1) {
            return;
        }
        setMiningUnitsToDeploy(miningUnitsToDeploy - 1);
        dispatch({type: ActionType.SET_CRYSTAL_MINING_UNITS, value: state.crystalMiningUnits + 1});
    }
    const addGemstoneMiningUnit = () => {
        if (miningUnitsToDeploy < 1) {
            return;
        }
        setMiningUnitsToDeploy(miningUnitsToDeploy - 1);
        dispatch({type: ActionType.SET_GEMSTONE_MINING_UNITS, value: state.gemstoneMiningUnits + 1});
    }
    const addMetalSentryDrone = () => {
        if (sentryDronesToDeploy < 1) {
            return;
        }
        setSentryDronesToDeploy(sentryDronesToDeploy - 1);
        dispatch({type: ActionType.SET_METAL_SENTRY_DRONES, value: state.metalSentryDrones + 1});
    }
    const addCrystalSentryDrone = () => {
        if (sentryDronesToDeploy < 1) {
            return;
        }
        setSentryDronesToDeploy(sentryDronesToDeploy - 1);
        dispatch({type: ActionType.SET_CRYSTAL_SENTRY_DRONES, value: state.crystalSentryDrones + 1});
    }
    const addGemstoneSentryDrone = () => {
        if (sentryDronesToDeploy < 1) {
            return;
        }
        setSentryDronesToDeploy(sentryDronesToDeploy - 1);
        dispatch({type: ActionType.SET_GEMSTONE_SENTRY_DRONES, value: state.gemstoneSentryDrones + 1});
    }
    const removeMetalMiningUnit = () => {
        if (state.metalMiningUnits < 1) {
            return;
        }
        setMiningUnitsToDeploy(miningUnitsToDeploy + 1);
        dispatch({type: ActionType.SET_METAL_MINING_UNITS, value: state.metalMiningUnits - 1});
    }
    const removeCrystalMiningUnit = () => {
        if (state.crystalMiningUnits < 1) {
            return;
        }
        setMiningUnitsToDeploy(miningUnitsToDeploy + 1);
        dispatch({type: ActionType.SET_CRYSTAL_MINING_UNITS, value: state.crystalMiningUnits - 1});
    }
    const removeGemstoneMiningUnit = () => {
        if (state.gemstoneMiningUnits < 1) {
            return;
        }
        setMiningUnitsToDeploy(miningUnitsToDeploy + 1);
        dispatch({type: ActionType.SET_GEMSTONE_MINING_UNITS, value: state.gemstoneMiningUnits - 1});
    }
    const removeMetalSentryDrone = () => {
        if (state.metalSentryDrones < 1) {
            return;
        }
        setSentryDronesToDeploy(sentryDronesToDeploy + 1);
        dispatch({type: ActionType.SET_METAL_SENTRY_DRONES, value: state.metalSentryDrones - 1});
    }
    const removeCrystalSentryDrone = () => {
        if (state.crystalSentryDrones < 1) {
            return;
        }
        setSentryDronesToDeploy(sentryDronesToDeploy + 1);
        dispatch({type: ActionType.SET_CRYSTAL_SENTRY_DRONES, value: state.crystalSentryDrones - 1});
    }
    const removeGemstoneSentryDrone = () => {
        if (state.gemstoneSentryDrones < 1) {
            return;
        }
        setSentryDronesToDeploy(sentryDronesToDeploy + 1);
        dispatch({type: ActionType.SET_GEMSTONE_SENTRY_DRONES, value: state.gemstoneSentryDrones - 1});
    }

    const getClickAmount = () => {
        return Math.pow(2, state.mainframeLevel);
    }

    return (
        <div>
            <header className={"header"}>
                <div className={"location-navigation"}>
                    <Link className={"location-navigation__item" + " location-navigation__item--left" } to="/base">Base</Link>
                    <h1 className={"location-name"}>Mining Grounds</h1>
                    <Link className={"location-navigation__item" + " location-navigation__item--right"} to="/battle">Battlefield</Link>
                </div>
                <div className={"info-bar"}>
                    <div className={"info-bar__item"}>
                        <img src="/imgs/metal.png" className={"info-bar__icon"} /> 
                        <p>{state.resources.metal}</p>
                    </div>
                    <div className={"info-bar__item"}>
                        <img src="/imgs/crystal.png" className={"info-bar__icon"} />
                        <p>{state.resources.crystal}</p>
                    </div>
                    <div className={"info-bar__item"}>
                        <img src="/imgs/gemstone.png" className={"info-bar__icon"} />
                        <p>{state.resources.gemstone}</p>
                    </div>
                </div>
            </header>
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
        </div>
    );
}

export default MiningGrounds;
