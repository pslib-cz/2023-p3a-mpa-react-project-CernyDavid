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

    useEffect(() => {
        const aaibaAvailable = parseInt(localStorage.getItem('aaibaAvailable') || '0');
        const slaughterersAvailable = parseInt(localStorage.getItem('slaughterersAvailable') || '0');
        const aaibaLevel = parseInt(localStorage.getItem('aaibaLevel') || '1');
        const slaughterersLevel = parseInt(localStorage.getItem('slaughterersLevel') || '1');
        const aaibaDeployed = parseInt(localStorage.getItem('aaibaDeployed') || '0');
        const slaughterersDeployed = parseInt(localStorage.getItem('slaughterersDeployed') || '0');
        const enemiesKilled = parseInt(localStorage.getItem('enemiesKilled') || '0');

        if (state.aaibaAvailable === 0 && state.slaughterersAvailable === 0) {
            dispatch({type: ActionType.CREATE_AAIBA, amount: aaibaAvailable});
            dispatch({type: ActionType.CREATE_SLAUGHTERER, amount: slaughterersAvailable});
            console.log('Soldiers loaded');
        }

        if (state.aaibaLevel === 0) {
            dispatch({type: ActionType.UPGRADE_AAIBA, value: aaibaLevel});
        }
        if (state.slaughterersLevel === 0) {
            dispatch({type: ActionType.UPGRADE_SLAUGHTERER, value: slaughterersLevel});
        }

        dispatch({type: ActionType.SET_ENEMIES_KILLED, value: enemiesKilled});

        dispatch({type: ActionType.SET_AAIBA_DEPLOYED, payload: aaibaDeployed});
        dispatch({type: ActionType.SET_SLAUGHTERERS_DEPLOYED, payload: slaughterersDeployed});

    }, []);

    const deployAaiba = () => {
        if (state.aaibaAvailable === 0) {
            return;
        }
        dispatch({type: ActionType.DEPLOY_AAIBA, amount: 1});
        localStorage.setItem('aaibaAvailable', (state.aaibaAvailable - 1).toString());
        localStorage.setItem('aaibaDeployed', (state.aaibaDeployed + 1).toString());
    };
    const deploySlaughterer = () => {
        if (state.slaughterersAvailable === 0) {
            return;
        }
        dispatch({type: ActionType.DEPLOY_SLAUGHTERER, amount: 1});
        localStorage.setItem('slaughterersAvailable', (state.slaughterersAvailable - 1).toString());
        localStorage.setItem('slaughterersDeployed', (state.slaughterersDeployed + 1).toString());
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
                    <h1 className={"location-name" + " location-name--bigger-padding"}>Battlefield</h1>
                    <Link className={"location-navigation__item" + " location-navigation__item--right"} to="/base">Base</Link>
                </div>
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