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
        <div className={"base"}>
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
            <div className={"base__main"}>
                <div className={"building"}>
                    <h2 className={"building__name"}>Mainframe &#40;Level {state.mainframeLevel}&#41;</h2>
                    <img src="/imgs/mainframe.png" className={"building__image"} />
                </div>
                <div className={"building"}>
                    <h2 className={"building__name"}>Factory &#40;Level {state.factoryLevel}&#41;</h2>
                    <img src="/imgs/factory.png" className={"building__image"} />
                </div>
                <div className={"building"}>
                    <h2 className={"building__name"}>Armory &#40;Level {state.armoryLevel}&#41;</h2>
                    <img src="/imgs/armory.png" className={"building__image"} />
                </div>
                <div className={"building"}>
                    <h2 className={"building__name"}>ARDC &#40;Level {state.ardcLevel}&#41;</h2>
                    <img src="/imgs/ardc.png" className={"building__image"} />
                </div>
                <div className={"building"}>
                    <h2 className={"building__name"}>Barracks &#40;Level {state.barracksLevel}&#41;</h2>
                    <img src="/imgs/barracks.png" className={"building__image"} />
                </div>
            </div>
        </div>
    );
};

export default Base;