import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { GameStateContext } from '../providers/GameStateProvider';
import { ActionType } from '../providers/GameStateProvider';
import '../styles/main.css';
import { act } from 'react-dom/test-utils';

const Base = () => {
    const {state, dispatch} = useContext(GameStateContext);
    const [canBeUpdated, setCanBeUpdated] = useState(false);
    const [showMainframeMenu, setShowMainframeMenu] = useState(false);
    const [showFactoryMenu, setShowFactoryMenu] = useState(false);
    const [showArmoryMenu, setShowArmoryMenu] = useState(false);
    const [showArdcMenu, setShowArdcMenu] = useState(false);
    const [showBarracksMenu, setShowBarracksMenu] = useState(false);
    const [showSecretMenu, setShowSecretMenu] = useState(false);

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
        const metalCost = 50 * Math.pow(5, state.barracksLevel);
        const crystalCost = 50 * Math.pow(5, state.barracksLevel);
        const gemstoneCost = 50 * Math.pow(5, state.barracksLevel);
        if (state.resources.metal < metalCost || state.resources.crystal < crystalCost || state.resources.gemstone < gemstoneCost) {
            return;
        }
        const newResources = { metal: state.resources.metal - metalCost, crystal: state.resources.crystal - crystalCost, gemstone: state.resources.gemstone - gemstoneCost};
        dispatch({type: ActionType.SET_RESOURCES, payload: newResources});
        const newLevel = state.barracksLevel + 1;
        dispatch({type: ActionType.UPGRADE_BARRACKS, value: newLevel});
    };
    const upgradeMainframe = () => {
        const metalCost = 1000 * Math.pow(2, state.mainframeLevel);
        const crystalCost = 500 * Math.pow(2, state.mainframeLevel);
        const gemstoneCost = 200 * Math.pow(2, state.mainframeLevel);
        if (state.resources.metal < metalCost || state.resources.crystal < crystalCost || state.resources.gemstone < gemstoneCost) {
            return;
        }
        const newResources = { metal: state.resources.metal - metalCost, crystal: state.resources.crystal - crystalCost, gemstone: state.resources.gemstone - gemstoneCost};
        dispatch({type: ActionType.SET_RESOURCES, payload: newResources});
        const newLevel = state.mainframeLevel + 1;
        dispatch({type: ActionType.UPGRADE_MAINFRAME, value: newLevel});
    };
    const upgradeArmory = () => {
        const metalCost = 1000 * Math.pow(5, state.armoryLevel);
        const crystalCost = 10 * Math.pow(5, state.armoryLevel);
        const gemstoneCost = 2 * Math.pow(5, state.armoryLevel);
        if (state.resources.metal < metalCost || state.resources.crystal < crystalCost || state.resources.gemstone < gemstoneCost) {
            return;
        }
        const newResources = { metal: state.resources.metal - metalCost, crystal: state.resources.crystal - crystalCost, gemstone: state.resources.gemstone - gemstoneCost};
        dispatch({type: ActionType.SET_RESOURCES, payload: newResources});
        const newLevel = state.armoryLevel + 1;
        dispatch({type: ActionType.UPGRADE_ARMORY, value: newLevel});
    };
    const upgradeArdc = () => {
        const metalCost = 20 * Math.pow(2, state.ardcLevel);
        const crystalCost = 50 * Math.pow(2, state.ardcLevel);
        const gemstoneCost = 10000 * (state.ardcLevel + 1);
        if (state.resources.metal < metalCost || state.resources.crystal < crystalCost || state.resources.gemstone < gemstoneCost) {
            return;
        }
        const newResources = { metal: state.resources.metal - metalCost, crystal: state.resources.crystal - crystalCost, gemstone: state.resources.gemstone - gemstoneCost};
        dispatch({type: ActionType.SET_RESOURCES, payload: newResources});
        const newLevel = state.ardcLevel + 1;
        dispatch({type: ActionType.UPGRADE_ARDC, value: newLevel});
        if (newLevel % 5 === 0) {
            dispatch({type: ActionType.UPGRADE_MINING_UNITS, value: state.miningUnitsLevel + 1});
        }
        if (newLevel % 10 === 0) {
            dispatch({type: ActionType.UPGRADE_SENTRY_DRONES, value: state.sentryDronesLevel + 1});
        }
    };

    const createAaiba = () => {
        if (state.aaibaAvailable + 1 + state.slaughterersAvailable + state.aaibaDeployed + state.slaughterersDeployed > state.barracksLevel * 2) {
            return;
        }
        if (state.barracksLevel === 0) {
            return;
        }
        const metalCost = 5000 * state.barracksLevel * state.aaibaLevel;
        const crystalCost = 1000 * state.barracksLevel * state.aaibaLevel;
        const gemstoneCost = 1000 * state.barracksLevel * state.aaibaLevel;
        if (state.resources.metal < metalCost || state.resources.crystal < crystalCost || state.resources.gemstone < gemstoneCost) {
            return;
        }
        const newResources = { metal: state.resources.metal - metalCost, crystal: state.resources.crystal - crystalCost, gemstone: state.resources.gemstone - gemstoneCost};
        dispatch({type: ActionType.SET_RESOURCES, payload: newResources});
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
        const metalCost = 50000 * state.barracksLevel * state.slaughterersLevel;
        const crystalCost = 50000 * state.barracksLevel * state.slaughterersLevel;
        const gemstoneCost = 100000 * state.barracksLevel * state.slaughterersLevel;
        if (state.resources.metal < metalCost || state.resources.crystal < crystalCost || state.resources.gemstone < gemstoneCost) {
            return;
        }
        const newResources = { metal: state.resources.metal - metalCost, crystal: state.resources.crystal - crystalCost, gemstone: state.resources.gemstone - gemstoneCost};
        dispatch({type: ActionType.SET_RESOURCES, payload: newResources});
        const newSlaughterersAvailable = state.slaughterersAvailable + 1;
        dispatch({type: ActionType.CREATE_SLAUGHTERER, amount: newSlaughterersAvailable});
    }
    const upgradeAaiba = () => {
        if (state.aaibaLevel + 1 > state.armoryLevel) {
            return;
        }
        const metalCost = 10000 * Math.pow(2, state.aaibaLevel - 1);
        const crystalCost = 5000 * Math.pow(2, state.aaibaLevel - 1);
        const gemstoneCost = 2000 * Math.pow(2, state.aaibaLevel - 1);
        if (state.resources.metal < metalCost || state.resources.crystal < crystalCost || state.resources.gemstone < gemstoneCost) {
            return;
        }
        const newResources = { metal: state.resources.metal - metalCost, crystal: state.resources.crystal - crystalCost, gemstone: state.resources.gemstone - gemstoneCost};
        dispatch({type: ActionType.SET_RESOURCES, payload: newResources});
        const newAaibaLevel = state.aaibaLevel + 1;
        dispatch({type: ActionType.UPGRADE_AAIBA, value: newAaibaLevel});
    }
    const upgradeSlaughterer = () => {
        if (state.slaughterersLevel + 1 > state.armoryLevel) {
            return;
        }
        const metalCost = 10000 * Math.pow(2, state.slaughterersLevel - 1);
        const crystalCost = 5000 * Math.pow(2, state.slaughterersLevel - 1);
        const gemstoneCost = 50000 * Math.pow(2, state.slaughterersLevel - 1);
        if (state.resources.metal < metalCost || state.resources.crystal < crystalCost || state.resources.gemstone < gemstoneCost) {
            return;
        }
        const newResources = { metal: state.resources.metal - metalCost, crystal: state.resources.crystal - crystalCost, gemstone: state.resources.gemstone - gemstoneCost};
        dispatch({type: ActionType.SET_RESOURCES, payload: newResources});
        const newSlaughterersLevel = state.slaughterersLevel + 1;
        dispatch({type: ActionType.UPGRADE_SLAUGHTERER, value: newSlaughterersLevel});
    }

    const nextMultipleOfFive = (number : number) => {
        const remainder = number % 5;
        const nextMultiple = remainder === 0 ? number + 5 : number + (5 - remainder);
        return nextMultiple;
    }
    const nextMultipleOfTen = (number : number) => {
        const remainder = number % 10;
        const nextMultiple = remainder === 0 ? number + 10 : number + (10 - remainder);
        return nextMultiple;
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
                <div className={"info-bar"} onClick={() => setShowSecretMenu(prev => !prev)}>
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
            {showSecretMenu && <div className={"secret-menu"}>
                <button onClick={() => dispatch({type: ActionType.SET_RESOURCES, payload: {metal: state.resources.metal + 100000, crystal: state.resources.crystal + 100000, gemstone: state.resources.gemstone + 100000}})}>Cheat</button>
                <button onClick={() => dispatch({type: ActionType.RESET})}>Reset</button>
            </div>}
            <div className={"base__main"}>
                <div className={"building"} onClick={() => setShowMainframeMenu(true)}>
                    <h2 className={"building__name"}>Mainframe &#40;Level {state.mainframeLevel}&#41;</h2>
                    <img src="/imgs/mainframe.png" className={"building__image"} />
                </div>
                <div className={showMainframeMenu ? "building-menu building-menu--visible" : "building-menu"} onClick={() => setShowMainframeMenu(false)}>
                    <div>
                        <h2 className={"building-menu__heading"}>Mainframe</h2>
                        <p>The mainframe is the heart of your base. The higher the level, the more resources you get from mouse clicks.</p>
                    </div>
                    <div>
                        <p className={"building-menu__level-info"}>Upgrade to level {state.mainframeLevel + 1}:</p>
                        <p className={"building-menu__cost"}>{1000 * Math.pow(2, state.mainframeLevel)} <img src="/imgs/metal.png" className={"cost-icon"} />
                            {500 * Math.pow(2, state.mainframeLevel)} <img src="/imgs/crystal.png" className={"cost-icon"} />
                            {200 * Math.pow(2, state.mainframeLevel)} <img src="/imgs/gemstone.png" className={"cost-icon"} />
                        </p>
                        <button onClick={(e) => { e.stopPropagation(); upgradeMainframe(); }} className={"button button--building-menu"}>Upgrade</button>
                    </div>
                </div>
                <div className={"building"} onClick={() => setShowFactoryMenu(true)}>
                    <h2 className={"building__name"}>Factory &#40;Level {state.factoryLevel}&#41;</h2>
                    <img src="/imgs/factory.png" className={"building__image"} />
                </div>
                <div className={showFactoryMenu ? "building-menu building-menu--visible" : "building-menu"} onClick={() => setShowFactoryMenu(false)}>
                    <div>
                        <h2 className={"building-menu__heading"}>Factory</h2>
                        <p>Produces sophisticated automatons that handle mining for you.</p>
                        <p>You gain a new automaton for each level, up to level 20.</p>
                    </div>
                    <div>
                        <h3>Mining Units</h3>
                        <p>The MU-ACW-X2 is a high-end mining automaton, the latest model from the X-series designed by Avalon CyberWorks. It can be used to mine resources of all kinds, ranging from simple metals to the rarest of gemstones.</p>
                        <p>Currently available: {state.availableMiningUnits}</p>
                    </div>
                    <div>
                        <h3>Sentry Drones</h3>
                        <p>These sentry drones, known profesionally as Quadwing Autopilot Reconnaissance & Defense Drones, ensure safety on your mining site. Each drone increases the effectivity of all currently working mining units.</p>
                        <p>Currently available: {state.availableSentryDrones}</p>
                    </div>
                    <div>
                        <p className={"building-menu__level-info"}>Upgrade to level {state.factoryLevel + 1}:</p>
                        <p className={"building-menu__cost"}>{100 * Math.pow(5, state.factoryLevel)} <img src="/imgs/metal.png" className={"cost-icon"} />
                            {20 * Math.pow(5, state.factoryLevel)} <img src="/imgs/crystal.png" className={"cost-icon"} />
                        </p>
                        <button onClick={(e) => { e.stopPropagation(); upgradeFactory(); }} className={"button button--building-menu"}>Upgrade</button>
                    </div>
                </div>
                <div className={"building"} onClick={() => setShowArmoryMenu(true)}>
                    <h2 className={"building__name"}>Armory &#40;Level {state.armoryLevel}&#41;</h2>
                    <img src="/imgs/armory.png" className={"building__image"} />
                </div>
                <div className={showArmoryMenu ? "building-menu building-menu--visible" : "building-menu"} onClick={() => setShowArmoryMenu(false)}>
                    <div>
                        <h2 className={"building-menu__heading"}>Armory</h2>
                        <p>This place serves as a storage for everything dangerous. Arms, ammunution, explosives... you name it.</p>
                        <p>If you want to elevate your battle androids to new heights, this is the right place.</p>
                        <p>Armory level determines the highest level your battle androids can achieve.</p>
                    </div>
                    <div>
                        <p className={"building-menu__level-info"}>Upgrade AAIBA to level {state.aaibaLevel + 1}:</p>
                        <p className={"building-menu__cost"}>
                            {10000 * Math.pow(2, state.aaibaLevel - 1)} <img src="/imgs/metal.png" className={"cost-icon"} />
                            {5000 * Math.pow(2, state.aaibaLevel - 1)} <img src="/imgs/crystal.png" className={"cost-icon"} />
                            {2000 * Math.pow(2, state.aaibaLevel - 1)} <img src="/imgs/gemstone.png" className={"cost-icon"} />
                        </p>
                        <button onClick={(e) => { e.stopPropagation(); upgradeAaiba(); }} className={"button button--building-menu"}>Upgrade</button>
                    </div>
                    <div>
                        <p className={"building-menu__level-info"}>Upgrade Slaughterers to level {state.slaughterersLevel + 1}:</p>
                        <p className={"building-menu__cost"}>
                            {10000 * Math.pow(2, state.slaughterersLevel - 1)} <img src="/imgs/metal.png" className={"cost-icon"} />
                            {5000 * Math.pow(2, state.slaughterersLevel - 1)} <img src="/imgs/crystal.png" className={"cost-icon"} />
                            {50000 * Math.pow(2, state.slaughterersLevel - 1)} <img src="/imgs/gemstone.png" className={"cost-icon"} />
                        </p>
                        <button onClick={(e) => { e.stopPropagation(); upgradeSlaughterer(); }} className={"button button--building-menu"}>Upgrade</button>
                    </div>
                    <div>
                        <p className={"building-menu__level-info"}>Upgrade Armory to level {state.armoryLevel + 1}:</p>
                        <p className={"building-menu__cost"}>
                            {1000 * Math.pow(5, state.armoryLevel)} <img src="/imgs/metal.png" className={"cost-icon"} />
                            {10 * Math.pow(5, state.armoryLevel)} <img src="/imgs/crystal.png" className={"cost-icon"} />
                            {2 * Math.pow(5, state.armoryLevel)} <img src="/imgs/gemstone.png" className={"cost-icon"} />
                        </p>
                        <button onClick={(e) => { e.stopPropagation(); upgradeArmory(); }} className={"button button--building-menu"}>Upgrade</button>
                    </div>
                </div>
                <div className={"building"} onClick={() => setShowArdcMenu(true)}>
                    <h2 className={"building__name"}>ARDC &#40;Level {state.ardcLevel}&#41;</h2>
                    <img src="/imgs/ardc.png" className={"building__image"} />
                </div>
                <div className={showArdcMenu ? "building-menu building-menu--visible" : "building-menu"} onClick={() => setShowArdcMenu(false)}>
                    <div>
                        <h2 className={"building-menu__heading"}>Automaton Research & Development Center</h2>
                        <p>This place is constantly occupied by lab rats, engineers and self-proclaimed mad scientists who try to raise your automatons to the next level. Automatons' levels depends on the ARDC level.</p>
                    </div>
                    <div>
                        <p>Reach level {nextMultipleOfFive(state.ardcLevel)} to upgrade Mining Units to level {state.miningUnitsLevel + 1}.</p>
                        <p>Reach level {nextMultipleOfTen(state.ardcLevel)} to upgrade Sentry Drones to level {state.sentryDronesLevel + 1}.</p>
                    </div>
                    <div>
                        <p className={"building-menu__level-info"}>Upgrade to level {state.ardcLevel + 1}:</p>
                        <p className={"building-menu__cost"}>
                            {20 * Math.pow(2, state.ardcLevel)} <img src="/imgs/metal.png" className={"cost-icon"} />
                            {50 * Math.pow(2, state.ardcLevel)} <img src="/imgs/crystal.png" className={"cost-icon"} />
                            {10000 * (state.ardcLevel + 1)} <img src="/imgs/gemstone.png" className={"cost-icon"} />
                        </p>
                        <button onClick={(e) => { e.stopPropagation(); upgradeArdc(); }} className={"button button--building-menu"}>Upgrade</button>
                    </div>
                </div>
                <div className={"building"} onClick={() => setShowBarracksMenu(true)}>
                    <h2 className={"building__name"}>Barracks &#40;Level {state.barracksLevel}&#41;</h2>
                    <img src="/imgs/barracks.png" className={"building__image"} />
                </div>
                <div className={showBarracksMenu ? "building-menu building-menu--visible" : "building-menu"} onClick={() => setShowBarracksMenu(false)}>
                    <div>
                        <h2 className={"building-menu__heading"}>Barracks</h2>
                        <p>This is the place where your battle androids are produced, trained and maintained.</p>
                        <p>Each level increases the capacity of the barracks.</p>
                        <p>Current capacity: {state.barracksLevel * 2} androids</p>
                    </div>
                    <div>
                        <h3>AAIBA</h3>
                        <p>The AAIBA &#40;short for Advanced Armament Infantry Battle Android&#41; are easy-to-maintain, yet deadly battle androids that can deal with most obstacles and defeat various enemies.</p>
                        <p>Currently available: {state.aaibaAvailable}</p>
                        <p className={"building-menu__cost"}>
                            {5000 * state.barracksLevel * state.aaibaLevel} <img src="/imgs/metal.png" className={"cost-icon"} />
                            {1000 * state.barracksLevel * state.aaibaLevel} <img src="/imgs/crystal.png" className={"cost-icon"} />
                            {1000 * state.barracksLevel * state.aaibaLevel} <img src="/imgs/gemstone.png" className={"cost-icon"} />
                        </p>
                        <button onClick={(e) => { e.stopPropagation(); createAaiba(); }} className={"button button--building-menu"}>Create</button>
                    </div>
                    <div>
                        <h3>Slaughterers</h3>
                        <p>The Slaughterers are the heavy hitters of your army. Covered from head to toe in nigh-indestructible armor made from the chrysalises of a recently discovered butterfly species from the planet Inui and equipped with G-89 ion rifles, they can neutralize most threats with ease.</p>
                        <p>Currently available: {state.slaughterersAvailable}</p>
                        <p className={"building-menu__cost"}>
                            {50000 * state.barracksLevel * state.slaughterersLevel} <img src="/imgs/metal.png" className={"cost-icon"} />
                            {50000 * state.barracksLevel * state.slaughterersLevel} <img src="/imgs/crystal.png" className={"cost-icon"} />
                            {100000 * state.barracksLevel * state.slaughterersLevel} <img src="/imgs/gemstone.png" className={"cost-icon"} />
                        </p>
                        <button onClick={(e) => { e.stopPropagation(); createSlaughterer(); }} className={"button button--building-menu"}>Create</button>
                    </div>
                    <div>
                        <p className={"building-menu__level-info"}>Upgrade to level {state.barracksLevel + 1}:</p>
                        <p className={"building-menu__cost"}>
                            {50 * Math.pow(5, state.barracksLevel)} <img src="/imgs/metal.png" className={"cost-icon"} />
                            {50 * Math.pow(5, state.barracksLevel)} <img src="/imgs/crystal.png" className={"cost-icon"} />
                            {50 * Math.pow(5, state.barracksLevel)} <img src="/imgs/gemstone.png" className={"cost-icon"} />
                        </p>
                        <button onClick={(e) => { e.stopPropagation(); upgradeBarracks(); }} className={"button button--building-menu"}>Upgrade</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Base;