import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GameStateContext } from "../providers/GameStateProvider";
import { ActionType } from "../providers/GameStateProvider";
import '../styles/main.css';
import applyNumberFormatting from "../assets/NumberFormatting";

const MiningGrounds = () => {
    const {state, dispatch} = useContext(GameStateContext);
    const [miningUnitsToDeploy, setMiningUnitsToDeploy] = useState<number>(0);
    const [sentryDronesToDeploy, setSentryDronesToDeploy] = useState<number>(0);
    const [canBeUpdated, setCanBeUpdated] = useState(false);
    const [metalClicked, setMetalClicked] = useState(false);
    const [crystalClicked, setCrystalClicked] = useState(false);
    const [gemstoneClicked, setGemstoneClicked] = useState(false);
    const [showMetalAutomatonsMenu, setShowMetalAutomatonsMenu] = useState(false);
    const [showCrystalAutomatonsMenu, setShowCrystalAutomatonsMenu] = useState(false);
    const [showGemstoneAutomatonsMenu, setShowGemstoneAutomatonsMenu] = useState(false);
    const [viewAutomation, setViewAutomation] = useState(false);

    useEffect(() => {
        const serializedState = localStorage.getItem('gameState');
        if (serializedState) {
            dispatch({type: ActionType.SET_GAMESTATE, payload: JSON.parse(serializedState)});
        }
        const state = JSON.parse(serializedState || '{}');
        setMiningUnitsToDeploy(state.availableMiningUnits - state.metalMiningUnits - state.crystalMiningUnits - state.gemstoneMiningUnits);
        setSentryDronesToDeploy(state.availableSentryDrones - state.metalSentryDrones - state.crystalSentryDrones - state.gemstoneSentryDrones);
        setCanBeUpdated(true);
        applyNumberFormatting();
    }, []);

    useEffect(() => {
        if (!canBeUpdated) {
            return;
        }
        localStorage.setItem('gameState', JSON.stringify(state));
        applyNumberFormatting();
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
        <div className={"mining"}>
            <header className={"header"}>
                <div className={"location-navigation"}>
                    <Link className={"location-navigation__item" + " location-navigation__item--left" } to="/base">Base</Link>
                    <h1 className={"location-name" + " location-name--desktop-only"}>Mining Grounds</h1>
                    <Link className={"location-navigation__item" + " location-navigation__item--right"} to="/battle">Battlefield</Link>
                </div>
                <h1 className={"location-name" + " location-name--mobile-only"}>Mining Grounds</h1>
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
            <div className={"resources-container"}>
                <div className={"resource"}>
                    <div className={"resource__automatons"} onClick={() => setShowMetalAutomatonsMenu(prev => !prev)}>
                        <div className={"automatons__item"}>
                            <img src="/imgs/mining_unit.png" className={"automatons__image"} />
                            <p className={"automatons__amount"}>{state.metalMiningUnits}</p>
                        </div>
                        <div className={"automatons__item"}>
                            <img src="/imgs/sentry_drone.png" className={"automatons__image"} />
                            <p className={"automatons__amount"}>{state.metalSentryDrones}</p>
                        </div>
                    </div>
                    <div className={showMetalAutomatonsMenu ? "automatons__menu automatons__menu--visible" : "automatons__menu"} onClick={() => setShowMetalAutomatonsMenu(false)}>
                        <button onClick={(e) => { e.stopPropagation(); addMetalMiningUnit(); }}>Add Mining Unit</button>
                        <button onClick={(e) => { e.stopPropagation(); addMetalSentryDrone(); }}>Add Sentry Drone</button>
                        <button onClick={(e) => { e.stopPropagation(); removeMetalMiningUnit(); }}>Remove Mining Unit</button>
                        <button onClick={(e) => { e.stopPropagation(); removeMetalSentryDrone(); }}>Remove Sentry Drone</button>
                    </div>
                    <div className={metalClicked ? "resource__main resource__main--animated" : "resource__main"} onClick={() => {mineMetal(getClickAmount() * 10);
                        setMetalClicked(true);
                    }} onAnimationEnd={() => setMetalClicked(false)}>
                        <img src="/imgs/metal.png" className={"resource__image"} draggable="false"/> 
                    </div>
                </div>
                <div className={"resource"}>
                    <div className={"resource__automatons"} onClick={() => setShowCrystalAutomatonsMenu(prev => !prev)}>
                        <div className={"automatons__item"}>
                            <img src="/imgs/mining_unit.png" className={"automatons__image"} />
                            <p className={"automatons__amount"}>{state.crystalMiningUnits}</p>
                        </div>
                        <div className={"automatons__item"}>
                            <img src="/imgs/sentry_drone.png" className={"automatons__image"} />
                            <p className={"automatons__amount"}>{state.crystalSentryDrones}</p>
                        </div>
                    </div>
                    <div className={showCrystalAutomatonsMenu ? "automatons__menu automatons__menu--visible" : "automatons__menu"} onClick={() => setShowCrystalAutomatonsMenu(false)}>
                        <button onClick={(e) => { e.stopPropagation(); addCrystalMiningUnit(); }}>Add Mining Unit</button>
                        <button onClick={(e) => { e.stopPropagation(); addCrystalSentryDrone(); }}>Add Sentry Drone</button>
                        <button onClick={(e) => { e.stopPropagation(); removeCrystalMiningUnit(); }}>Remove Mining Unit</button>
                        <button onClick={(e) => { e.stopPropagation(); removeCrystalSentryDrone(); }}>Remove Sentry Drone</button>
                    </div>
                    <div className={crystalClicked ? "resource__main resource__main--animated" : "resource__main"} onClick={() => {mineCrystal(getClickAmount() * 5);
                        setCrystalClicked(true);
                    }} onAnimationEnd={() => setCrystalClicked(false)}>
                        <img src="/imgs/crystal.png" className={"resource__image"} draggable="false"/> 
                    </div>
                </div>
                <div className={"resource"}>
                    <div className={"resource__automatons"} onClick={() => setShowGemstoneAutomatonsMenu(prev => !prev)}>
                        <div className={"automatons__item"}>
                            <img src="/imgs/mining_unit.png" className={"automatons__image"} />
                            <p className={"automatons__amount"}>{state.gemstoneMiningUnits}</p>
                        </div>
                        <div className={"automatons__item"}>
                            <img src="/imgs/sentry_drone.png" className={"automatons__image"} />
                            <p className={"automatons__amount"}>{state.gemstoneSentryDrones}</p>
                        </div>
                    </div>
                    <div className={showGemstoneAutomatonsMenu ? "automatons__menu automatons__menu--visible" : "automatons__menu"} onClick={() => setShowGemstoneAutomatonsMenu(false)}>
                        <button onClick={(e) => { e.stopPropagation(); addGemstoneMiningUnit(); }}>Add Mining Unit</button>
                        <button onClick={(e) => { e.stopPropagation(); addGemstoneSentryDrone(); }}>Add Sentry Drone</button>
                        <button onClick={(e) => { e.stopPropagation(); removeGemstoneMiningUnit(); }}>Remove Mining Unit</button>
                        <button onClick={(e) => { e.stopPropagation(); removeGemstoneSentryDrone(); }}>Remove Sentry Drone</button>
                    </div>
                    <div className={gemstoneClicked ? "resource__main resource__main--animated" : "resource__main"} onClick={() => {mineGemstone(getClickAmount() * 2);
                        setGemstoneClicked(true);
                    }} onAnimationEnd={() => setGemstoneClicked(false)}>
                        <img src="/imgs/gemstone.png" className={"resource__image"} draggable="false"/> 
                    </div>
                </div>
            </div>
            <div className={"automation"} onClick={() => setViewAutomation(prev => !prev)}>
                <h2 className={"automation__heading"}>Automation</h2>
                <div className={viewAutomation ? "automation__main automation__main--visible" : "automation__main"}>
                    <div className={"automation__item"}>
                        <h3 className={"automation__item-heading"}>Mining Units &#40;Level {state.miningUnitsLevel}&#41;</h3>
                        <div className={"automation__info"}>
                            <img src="/imgs/mining_unit.png" className={"automation__image"} />
                            <div className={"automation__stats"}>
                                <p>{state.metalMiningUnits + state.crystalMiningUnits + state.gemstoneMiningUnits} deployed</p>
                                <p>{state.availableMiningUnits - state.metalMiningUnits - state.crystalMiningUnits - state.gemstoneMiningUnits} available</p>
                            </div>
                        </div>
                    </div>
                    <div className={"automation__item"}>
                        <h3 className={"automation__item-heading"}>Sentry Drones &#40;Level {state.sentryDronesLevel}&#41;</h3>
                        <div className={"automation__info"}>
                            <img src="/imgs/sentry_drone.png" className={"automation__image"} />
                            <div className={"automation__stats"}>
                                <p>{state.metalSentryDrones + state.crystalSentryDrones + state.gemstoneSentryDrones} deployed</p>
                                <p>{state.availableSentryDrones - state.metalSentryDrones - state.crystalSentryDrones - state.gemstoneSentryDrones} available</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MiningGrounds;
