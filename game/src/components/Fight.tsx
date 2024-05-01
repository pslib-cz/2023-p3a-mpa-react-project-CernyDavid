import { useState, useEffect } from 'react';
import { Enemy } from './Battlefield';
import { ActionType } from '../providers/GameStateProvider';
import { useContext } from 'react';
import { GameStateContext } from '../providers/GameStateProvider';

type FightProps = {
    enemy: Enemy;
    aaibaDeployed: number;
    slaughterersDeployed: number;
    aaibaLevel: number;
    slaughterersLevel: number;
    setShowFight: (showFight: boolean) => void;
};

const Fight : React.FC<FightProps> = ({ enemy, aaibaDeployed, slaughterersDeployed, aaibaLevel, slaughterersLevel, setShowFight }) => {
    const [enemyHP, setEnemyHP] = useState(enemy.hp);
    const [aaibaHP, setAaibaHP] = useState<number[]>([]);
    const [slaughterersHP, setSlaughterersHP] = useState<number[]>([]);
    const {state, dispatch} = useContext(GameStateContext);
    const [aaibaIndex, setAaibaIndex] = useState(0);
    const [slaughterersIndex, setSlaughterersIndex] = useState(0);
    const [result, setResult] = useState('');
    const [showEndingScreen, setShowEndingScreen] = useState(false);
    const [canBeEnded, setCanBeEnded] = useState(false);
    const [fightEnded, setFightEnded] = useState(false);

    useEffect(() => {
        const initialAaibaHP: number[] = [];
        for (let i = 0; i < aaibaDeployed; i++) {
            initialAaibaHP.push(aaibaLevel * 500);
        }
        setAaibaHP(initialAaibaHP);
        const initialSlaughterersHP: number[] = [];
        for (let i = 0; i < slaughterersDeployed; i++) {
            initialSlaughterersHP.push(slaughterersLevel * 1000);
        }
        setSlaughterersHP(initialSlaughterersHP);
    }, []);

    let fightRound: number;

    useEffect(() => {

        if (fightEnded) {
            return;
        }

        fightRound = setInterval(() => {
            setCanBeEnded(true);
            if (aaibaIndex < aaibaDeployed) {
                setEnemyHP((prevHP) => prevHP - 50 * aaibaLevel);
            }
            else if (aaibaIndex === aaibaDeployed) {
                setEnemyHP((prevHP) => prevHP - 100 * slaughterersLevel);
            }
            const aaibaDamage = Math.floor(Math.random() * (enemy.dmg - (enemy.dmg / 2) + 1)) + (enemy.dmg / 2);
            const slaughterersDamage = Math.floor(Math.random() * (enemy.dmg - (enemy.dmg / 2) + 1)) + (enemy.dmg / 2);
            setAaibaHP((prevHP) => prevHP.map((hp, index) => index === aaibaIndex ? hp - aaibaDamage : hp));
            if (aaibaIndex === aaibaDeployed) {
                setSlaughterersHP((prevHP) => prevHP.map((hp, index) => index === slaughterersIndex ? hp - slaughterersDamage : hp));
            }

        }, 1000);
        
        return () => clearInterval(fightRound);
    }, [aaibaIndex, slaughterersIndex, fightEnded]);

    useEffect(() => {
        if (aaibaHP[aaibaIndex] < 1) {
            setAaibaIndex((prevIndex) => prevIndex + 1);
        }
    }, [aaibaHP]);
    useEffect(() => {
        if (slaughterersHP[slaughterersIndex] <= 0) {
            setSlaughterersIndex((prevIndex) => prevIndex + 1);
        }
    }, [slaughterersHP]);
    
    useEffect(() => {
        console.log('enemy hp: ', enemyHP);
        if (enemyHP < 1) {
            clearInterval(fightRound);
            setFightEnded(true);
            dispatch({type: ActionType.SET_AAIBA_DEPLOYED, payload: 0});
            dispatch({type: ActionType.SET_SLAUGHTERERS_DEPLOYED, payload: 0});
            dispatch({type: ActionType.SET_ENEMIES_KILLED, value: state.enemiesKilled + 1});
            setResult(`You have defeated the ${enemy.name}!`);
            setShowEndingScreen(true);
        }
    }, [enemyHP]);

    useEffect(() => {
        if (!canBeEnded) {
            return;
        }
        const maxZero = (hp : number) => Math.max(0, hp);
        const soldiersHP = 
        aaibaHP.reduce((sum, hp) => sum + maxZero(hp), 0) +
        slaughterersHP.reduce((sum, hp) => sum + maxZero(hp), 0);
        if (soldiersHP < 1) {
            clearInterval(fightRound);
            setFightEnded(true);
            dispatch({type: ActionType.SET_AAIBA_DEPLOYED, payload: 0});
            dispatch({type: ActionType.SET_SLAUGHTERERS_DEPLOYED, payload: 0});
            setResult('You have lost the battle');
            setShowEndingScreen(true);
        }
    }, [aaibaHP, slaughterersHP, canBeEnded]);

    return (
        <div className={"battlefield__main"}>
            <h1>Fight</h1>
            <p>Enemy: {enemy.name}, hp: {enemyHP}</p>
            <h2>Soldiers</h2>
            <p>Aaiba: {aaibaDeployed}, level: {aaibaLevel}</p>
            {aaibaHP.map((hp, index) => (
                <p key={index}>Aaiba {index + 1}: {hp}</p>
            ))}
            <p>Slaughterers: {slaughterersDeployed}, level: {slaughterersLevel}</p>
            {slaughterersHP.map((hp, index) => (
                <p key={index}>Slaughterer {index + 1}: {hp}</p>
            ))}
            {showEndingScreen && (
                <div>
                    <h2>Result</h2>
                    <p>{result}</p>
                    <button onClick={() => setShowFight(false)}>Back</button>
                </div>
            )}
        </div>
    );
};

export default Fight;