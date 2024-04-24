import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { GameStateContext } from '../providers/GameStateProvider';
import { ActionType } from '../providers/GameStateProvider';
import '../styles/main.css';

const Base = () => {
    const {state, dispatch} = useContext(GameStateContext);
    const [canBeUpdated, setCanBeUpdated] = useState(false);

    useEffect(() => {
        const serializedState = localStorage.getItem('gameState');
        if (serializedState) {
            console.log(serializedState);
            dispatch({type: ActionType.SET_GAMESTATE, payload: JSON.parse(serializedState)});
        }
        setCanBeUpdated(true);
    }, []);

    useEffect(() => {
        if (!canBeUpdated) {
            return;
        }
        localStorage.setItem('gameState', JSON.stringify(state));
    }, [state]);

    const upgradeFactory = () => {
        const metalCost = 100 * Math.pow(5, state.factoryLevel);
        const crystalCost = 20 * Math.pow(5, state.factoryLevel);
        if (state.resources.metal < metalCost || state.resources.crystal < crystalCost) {
            return;
        }
        const newResources = { metal: state.resources.metal - metalCost, crystal: state.resources.crystal - crystalCost, gemstone: state.resources.gemstone };
        dispatch({type: ActionType.SET_RESOURCES, payload: newResources});
        const newLevel = state.factoryLevel + 1;
        dispatch({type: ActionType.UPGRADE_FACTORY, value: newLevel});
        console.log(newLevel);
        if (newLevel > 10) {
            dispatch({type: ActionType.SET_MINING_UNITS_AVAILABLE, payload: 10});
        }
        else if (newLevel > 0) {
            dispatch({type: ActionType.SET_MINING_UNITS_AVAILABLE, payload: newLevel});
        }
        if (newLevel > 20) {
            dispatch({type: ActionType.SET_SENTRY_DRONES_AVAILABLE, payload: 10});
        }
        else if (newLevel > 10) {
            dispatch({type: ActionType.SET_SENTRY_DRONES_AVAILABLE, payload: newLevel - 10});
        }
    };
    const upgradeBarracks = () => {
        const newLevel = state.barracksLevel + 1;
        dispatch({type: ActionType.UPGRADE_BARRACKS, value: newLevel});
    };
    const upgradeMainframe = () => {
        const newLevel = state.mainframeLevel + 1;
        dispatch({type: ActionType.UPGRADE_MAINFRAME, value: newLevel});
    };
    const upgradeArmory = () => {
        const newLevel = state.armoryLevel + 1;
        dispatch({type: ActionType.UPGRADE_ARMORY, value: newLevel});
    };
    const upgradeArdc = () => {
        const newLevel = state.ardcLevel + 1;
        dispatch({type: ActionType.UPGRADE_ARDC, value: newLevel});
    };

    const createAaiba = () => {
        if (state.aaibaAvailable + 1 + state.slaughterersAvailable + state.aaibaDeployed + state.slaughterersDeployed > state.barracksLevel * 2) {
            return;
        }
        if (state.barracksLevel === 0) {
            return;
        }
        const newAaibaAvailable = state.aaibaAvailable + 1;
        dispatch({type: ActionType.CREATE_AAIBA, amount: newAaibaAvailable});
    }

    const createSlaughterer = () => {
        if (state.aaibaAvailable + state.slaughterersAvailable + 1 + state.aaibaDeployed + state.slaughterersDeployed > state.barracksLevel * 2) {
            return;
        }
        if (state.barracksLevel === 0) {
            return;
        }
        const newSlaughterersAvailable = state.slaughterersAvailable + 1;
        dispatch({type: ActionType.CREATE_SLAUGHTERER, amount: newSlaughterersAvailable});
    }
    const upgradeAaiba = () => {
        if (state.aaibaLevel + 1 > state.armoryLevel) {
            return;
        }
        const newAaibaLevel = state.aaibaLevel + 1;
        dispatch({type: ActionType.UPGRADE_AAIBA, value: newAaibaLevel});
    }
    const upgradeSlaughterer = () => {
        if (state.slaughterersLevel + 1 > state.armoryLevel) {
            return;
        }
        const newSlaughterersLevel = state.slaughterersLevel + 1;
        dispatch({type: ActionType.UPGRADE_SLAUGHTERER, value: newSlaughterersLevel});
    }

    return (
        <div>
            <header className={"header"}>
                <div className={"location-navigation"}>
                    <Link className={"location-navigation__item" + " location-navigation__item--left" } to="/battle">Battlefield</Link>
                    <h1 className={"location-name" + " location-name--desktop-only"}>Base</h1>
                    <Link className={"location-navigation__item" + " location-navigation__item--right"} to="/mining">Mining Grounds</Link>
                </div>
                <h1 className={"location-name" + " location-name--mobile-only"}>Base</h1>
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
            <h2>Buildings</h2>
            <p>Factory Level: {state.factoryLevel}</p>
            <button onClick={() => upgradeFactory()}>Upgrade Factory</button>
            <p>Barracks Level: {state.barracksLevel}</p>
            <button onClick={() => upgradeBarracks()}>Upgrade Barracks</button>
            <p>AAIBA: {state.aaibaAvailable}</p>
            <button onClick={() => createAaiba()}>Create AAIBA</button>
            <p>Slaughterers: {state.slaughterersAvailable}</p>
            <button onClick={() => createSlaughterer()}>Create Slaughterer</button>
            <p>Mainframe Level: {state.mainframeLevel}</p>
            <button onClick={() => upgradeMainframe()}>Upgrade Mainframe</button>
            <p>Armory Level: {state.armoryLevel}</p>
            <button onClick={() => upgradeArmory()}>Upgrade Armory</button>
            <p>ARDC Level: {state.ardcLevel}</p>
            <button onClick={() => upgradeArdc()}>Upgrade ARDC</button>
            <p>AAIBA level: {state.aaibaLevel}</p>
            <button onClick={() => upgradeAaiba()}>Upgrade AAIBA</button>
            <p>Slaughterers level: {state.slaughterersLevel}</p>
            <button onClick={() => upgradeSlaughterer()}>Upgrade Slaughterer</button>
            <button onClick={() => {dispatch({type: ActionType.RESET})}}>Reset</button>
        </div>
    );
};

export default Base;