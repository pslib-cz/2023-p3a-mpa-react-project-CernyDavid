import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { GameStateContext } from '../providers/GameStateProvider';
import { ActionType } from '../providers/GameStateProvider';
import Fight from './Fight';
import '../styles/main.css';

export type Enemy = {
    name: string;
    level: number;
    hp: number;
    dmg: number;
    xpDrop: number;
    imgUrl: string;
}

const enemies: Enemy[] = [
    {name: "Alien", level: 10, hp: 1000, dmg: 100, xpDrop: 100, imgUrl: ""},
    {name: "Stonger Alien", level: 20, hp: 2000, dmg: 200, xpDrop: 200, imgUrl: ""}
];

const Battlefield = () => {
    const {state, dispatch} = useContext(GameStateContext);
    const [showFight, setShowFight] = useState(false);
    const [canBeUpdated, setCanBeUpdated] = useState(false);

    useEffect(() => {
        const serializedState = localStorage.getItem('gameState');
        if (serializedState) {
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

    const deployAaiba = () => {
        if (state.aaibaAvailable === 0) {
            return;
        }
        dispatch({type: ActionType.DEPLOY_AAIBA, amount: 1});
    };
    const deploySlaughterer = () => {
        if (state.slaughterersAvailable === 0) {
            return;
        }
        dispatch({type: ActionType.DEPLOY_SLAUGHTERER, amount: 1});
    };

    const getCurrentEnemy = () => {
        const currentEnemy = enemies[state.enemiesKilled];
        if (currentEnemy === undefined) {
            return enemies[enemies.length - 1];
        }
        return currentEnemy;
    }

    return (
        <div>
            <header className={"header"}>
                <div className={"location-navigation"}>
                    <Link className={"location-navigation__item" + " location-navigation__item--left" } to="/mining">Mining Grounds</Link>
                    <h1 className={"location-name" + " location-name--desktop-only" + " location-name--bigger-padding"}>Battlefield</h1>
                    <Link className={"location-navigation__item" + " location-navigation__item--right"} to="/base">Base</Link>
                </div>
                <h1 className={"location-name" + " location-name--mobile-only" + " location-name--bigger-padding"}>Battlefield</h1>
            </header>
            {showFight === false ? (
                <div>
                    <h2>Soldiers</h2>
                    <p>AAIBA: {state.aaibaAvailable}, level: {state.aaibaLevel}</p>
                    <p>Slaughterers: {state.slaughterersAvailable}, level: {state.slaughterersLevel}</p>
                    <h2>Deployed</h2>
                    <p>AAIBA: {state.aaibaDeployed}</p>
                    <button onClick={() => deployAaiba()}>Deploy AAIBA</button>
                    <p>Slaughterers: {state.slaughterersDeployed}</p>
                    <button onClick={() => deploySlaughterer()}>Deploy Slaughterer</button>
                    <h2>Enemy</h2>
                    <p>{getCurrentEnemy().name}, level: {getCurrentEnemy().level}</p>
                    <button onClick={() => setShowFight(true)}>Fight</button>
                </div>
            ) : <Fight enemy={getCurrentEnemy()} aaibaDeployed={state.aaibaDeployed} slaughterersDeployed={state.slaughterersDeployed} aaibaLevel={state.aaibaLevel} slaughterersLevel={state.slaughterersLevel} setShowFight={setShowFight}/>}
            
        </div>
    );
};

export default Battlefield;