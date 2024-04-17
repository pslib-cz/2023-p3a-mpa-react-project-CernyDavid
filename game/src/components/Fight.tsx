import { useState, useEffect } from 'react';
import { Enemy } from './Battlefield';

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

    useEffect(() => {
        const initialAaibaHP: number[] = [];
        for (let i = 0; i < aaibaDeployed; i++) {
            initialAaibaHP.push(aaibaLevel * 10);
        }
        setAaibaHP(initialAaibaHP);
        const initialSlaughterersHP: number[] = [];
        for (let i = 0; i < slaughterersDeployed; i++) {
            initialSlaughterersHP.push(slaughterersLevel * 10);
        }
        setSlaughterersHP(initialSlaughterersHP);

        const fightRound = setInterval(() => {
            setEnemyHP((prevHP) => prevHP - ((aaibaDeployed * aaibaLevel) + (slaughterersDeployed * slaughterersLevel)));
    
            setAaibaHP((prevHP) => {
                const newHP = [...prevHP];
                for (let i = 0; i < aaibaDeployed; i++) {
                    if (newHP[i] > 0) {
                        const aaibaDamage = Math.floor(Math.random() * enemy.dmg) + 1;
                        newHP[i] -= aaibaDamage;
                    }
                }
                return newHP;
            });
        }, 1000);

        return () => clearInterval(fightRound);
    }, []);

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
        </div>
    );
};

export default Fight;