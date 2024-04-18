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

    useEffect(() => {

        const fightRound = setInterval(() => {
            console.log('fighting');
            if (aaibaIndex < aaibaDeployed) {
                setEnemyHP((prevHP) => prevHP - 50 * aaibaLevel);
            }
            else if (aaibaIndex === aaibaDeployed) {
                setEnemyHP((prevHP) => prevHP - 100 * slaughterersLevel);
            }
            const aaibaDamage = Math.floor(Math.random() * enemy.dmg) + 1;
            const slaughterersDamage = Math.floor(Math.random() * enemy.dmg) + 1;
            setAaibaHP((prevHP) => prevHP.map((hp, index) => index === aaibaIndex ? hp - aaibaDamage : hp));
            if (aaibaIndex === aaibaDeployed) {
                setSlaughterersHP((prevHP) => prevHP.map((hp, index) => index === slaughterersIndex ? hp - slaughterersDamage : hp));
            }

            const soldiersHP = aaibaHP.reduce((sum, hp) => sum + hp, 0) + slaughterersHP.reduce((sum, hp) => sum + hp, 0);
            console.log(soldiersHP);

        }, 1000);
        
        return () => clearInterval(fightRound);
    }, [aaibaIndex, slaughterersIndex]);

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
        if (enemyHP <= 0) {
            dispatch({type: ActionType.SET_AAIBA_DEPLOYED, payload: 0});
            dispatch({type: ActionType.SET_SLAUGHTERERS_DEPLOYED, payload: 0});
            dispatch({type: ActionType.SET_ENEMIES_KILLED, value: state.enemiesKilled + 1});
            localStorage.setItem('aaibaDeployed', '0');
            localStorage.setItem('slaughterersDeployed', '0');
            localStorage.setItem('enemiesKilled', (state.enemiesKilled + 1).toString());
            setResult(`You have defeated the ${enemy.name}!`);
            setShowEndingScreen(true);
        }
    }, [enemyHP]);

    /*useEffect(() => {
        const soldiersHP = aaibaHP.reduce((sum, hp) => sum + hp, 0) + slaughterersHP.reduce((sum, hp) => sum + hp, 0);
        console.log(soldiersHP);
        if (soldiersHP < 1) {
            dispatch({type: ActionType.SET_AAIBA_DEPLOYED, payload: 0});
            dispatch({type: ActionType.SET_SLAUGHTERERS_DEPLOYED, payload: 0});
            localStorage.setItem('aaibaDeployed', '0');
            localStorage.setItem('slaughterersDeployed', '0');
            setResult('You have lost the battle');
            setShowEndingScreen(true);
        }
    }, [aaibaHP, slaughterersHP]);*/

    const handleSkipFight = () => {
        /*clearInterval(fightRound);
        while (enemyHP > 0 || (aaibaHP > 0 && slaughterersHP > 0)) {
            setEnemyHP((prevHP) => prevHP - ((aaibaDeployed * aaibaLevel) + (slaughterersDeployed * slaughterersLevel)));
            const aaibaDamage = Math.floor(Math.random() * enemy.dmg) + 1;
            const slaughterersDamage = Math.floor(Math.random() * enemy.dmg) + 1;
            setAaibaHP((prevHP) => prevHP - aaibaDamage);
            setSlaughterersHP((prevHP) => prevHP - slaughterersDamage);
        }*/
    };

    return (
        <div>
            <h1>Fight</h1>
            <p>Enemy: {enemy.name}, level: {enemy.level}, hp: {enemyHP}</p>
            <h2>Soldiers</h2>
            <p>Aaiba: {aaibaDeployed}, level: {aaibaLevel}</p>
            {aaibaHP.map((hp, index) => (
                <p key={index}>Aaiba {index + 1}: {hp}</p>
            ))}
            <p>Slaughterers: {slaughterersDeployed}, level: {slaughterersLevel}</p>
            {slaughterersHP.map((hp, index) => (
                <p key={index}>Slaughterer {index + 1}: {hp}</p>
            ))}
            <button onClick={handleSkipFight}>Skip Fight</button>
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