import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GameStateContext } from '../providers/GameStateProvider';
import { ActionType } from '../providers/GameStateProvider';

const Base = () => {
    const {state, dispatch} = useContext(GameStateContext);

    useEffect(() => {
        const metal = parseInt(localStorage.getItem('metal') || '0');
        const crystal = parseInt(localStorage.getItem('crystal') || '0');
        const gemstone = parseInt(localStorage.getItem('gemstone') || '0');
        const factoryLevel = parseInt(localStorage.getItem('factoryLevel') || '0');
        const barracksLevel = parseInt(localStorage.getItem('barracksLevel') || '0');
        const mainframeLevel = parseInt(localStorage.getItem('mainframeLevel') || '0');
        const armoryLevel = parseInt(localStorage.getItem('armoryLevel') || '0');
        const ardcLevel = parseInt(localStorage.getItem('ardcLevel') || '0');

        console.log(state.mainframeLevel);

        if (state.factoryLevel === 0 && state.barracksLevel === 0 && state.mainframeLevel === 0 && state.armoryLevel === 0 && state.ardcLevel === 0) {
            dispatch({type: ActionType.UPGRADE_FACTORY, value: factoryLevel});
            dispatch({type: ActionType.UPGRADE_BARRACKS, value: barracksLevel});
            dispatch({type: ActionType.UPGRADE_MAINFRAME, value: mainframeLevel});
            dispatch({type: ActionType.UPGRADE_ARMORY, value: armoryLevel});
            dispatch({type: ActionType.UPGRADE_ARDC, value: ardcLevel});
            console.log('Base upgrades loaded');
        }

        if (state.miningUnitsLevel === 0) {
            dispatch({type: ActionType.UPGRADE_MINING_UNITS, value: parseInt(localStorage.getItem('miningUnitsLevel') || '1')});
        }
        if (state.sentryDronesLevel === 0) {
            dispatch({type: ActionType.UPGRADE_SENTRY_DRONES, value: parseInt(localStorage.getItem('sentryDronesLevel') || '1')});
        }

        dispatch({type: ActionType.SET_RESOURCES, payload: {metal, crystal, gemstone}});

    }, []);

    const upgradeFactory = () => {
        const metalCost = 100 * Math.pow(5, state.factoryLevel);
        const crystalCost = 20 * Math.pow(5, state.factoryLevel);
        if (state.resources.metal < metalCost || state.resources.crystal < crystalCost) {
            return;
        }
        const newResources = { metal: state.resources.metal - metalCost, crystal: state.resources.crystal - crystalCost, gemstone: state.resources.gemstone };
        localStorage.setItem('metal', newResources.metal.toString());
        localStorage.setItem('crystal', newResources.crystal.toString());
        dispatch({type: ActionType.SET_RESOURCES, payload: newResources});
        const newLevel = state.factoryLevel + 1;
        dispatch({type: ActionType.UPGRADE_FACTORY, value: newLevel});
        localStorage.setItem('factoryLevel', newLevel.toString());
        console.log(newLevel);
        if (newLevel > 10) {
            dispatch({type: ActionType.SET_MINING_UNITS_AVAILABLE, payload: 10});
            localStorage.setItem('availableMiningUnits', "10");
        }
        else if (newLevel > 0) {
            dispatch({type: ActionType.SET_MINING_UNITS_AVAILABLE, payload: newLevel});
            localStorage.setItem('availableMiningUnits', newLevel.toString());
        }
        if (newLevel > 20) {
            dispatch({type: ActionType.SET_SENTRY_DRONES_AVAILABLE, payload: 10});
            localStorage.setItem('availableSentryDrones', "10");
        }
        else if (newLevel > 10) {
            dispatch({type: ActionType.SET_SENTRY_DRONES_AVAILABLE, payload: newLevel - 10});
            localStorage.setItem('availableSentryDrones', (newLevel - 10).toString());
        }
    };
    const upgradeBarracks = () => {
        const newLevel = state.barracksLevel + 1;
        dispatch({type: ActionType.UPGRADE_BARRACKS, value: newLevel});
        localStorage.setItem('barracksLevel', newLevel.toString());
    };
    const upgradeMainframe = () => {
        const newLevel = state.mainframeLevel + 1;
        dispatch({type: ActionType.UPGRADE_MAINFRAME, value: newLevel});
        localStorage.setItem('mainframeLevel', newLevel.toString());
        console.log("level:" + newLevel);
    };
    const upgradeArmory = () => {
        const newLevel = state.armoryLevel + 1;
        dispatch({type: ActionType.UPGRADE_ARMORY, value: newLevel});
        localStorage.setItem('armoryLevel', newLevel.toString());
    };
    const upgradeArdc = () => {
        const newLevel = state.ardcLevel + 1;
        dispatch({type: ActionType.UPGRADE_ARDC, value: newLevel});
        localStorage.setItem('ardcLevel', newLevel.toString());
    };

    const createAaiba = () => {
        if (state.aaibaAvailable + 1 + state.slaughterersAvailable > state.barracksLevel * 2) {
            return;
        }
        if (state.barracksLevel === 0) {
            return;
        }
        const newAaibaAvailable = state.aaibaAvailable + 1;
        dispatch({type: ActionType.CREATE_AAIBA});
        localStorage.setItem('aaibaAvailable', newAaibaAvailable.toString());
    }

    const createSlaughterer = () => {
        if (state.aaibaAvailable + state.slaughterersAvailable + 1 > state.barracksLevel * 2) {
            return;
        }
        if (state.barracksLevel === 0) {
            return;
        }
        const newSlaughterersAvailable = state.slaughterersAvailable + 1;
        dispatch({type: ActionType.CREATE_SLAUGHTERER});
        localStorage.setItem('slaughterersAvailable', newSlaughterersAvailable.toString());
    }
    const upgradeAaiba = () => {
        if (state.aaibaLevel + 1 > state.armoryLevel) {
            return;
        }
        const newAaibaLevel = state.aaibaLevel + 1;
        dispatch({type: ActionType.UPGRADE_AAIBA, value: newAaibaLevel});
        localStorage.setItem('aaibaLevel', newAaibaLevel.toString());
    }
    const upgradeSlaughterer = () => {
        if (state.slaughterersLevel + 1 > state.armoryLevel) {
            return;
        }
        const newSlaughterersLevel = state.slaughterersLevel + 1;
        dispatch({type: ActionType.UPGRADE_SLAUGHTERER, value: newSlaughterersLevel});
        localStorage.setItem('slaughterersLevel', newSlaughterersLevel.toString());
    }

    return (
        <div>
            <h1>Base</h1>
            <p>Metal: {state.resources.metal}</p>
            <p>Crystal: {state.resources.crystal}</p>
            <p>Gemstone: {state.resources.gemstone}</p>
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
            <Link to="/battle">Battlefield</Link>
            <Link to="/mining">Mining Grounds</Link>
        </div>
    );
};

export default Base;