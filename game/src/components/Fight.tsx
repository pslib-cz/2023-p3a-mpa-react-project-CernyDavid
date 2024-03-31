import { Enemy } from './Battlefield';

type FightProps = {
    enemy: Enemy;
    aaibaDeployed: number;
    slaughterersDeployed: number;
    aaibaLevel: number;
    slaughterersLevel: number;
};

const Fight : React.FC<FightProps> = ({ enemy, aaibaDeployed, slaughterersDeployed, aaibaLevel, slaughterersLevel }) => {
    return (
        <div>
            <h1>Fight</h1>
            <p>Enemy: {enemy.name}, level: {enemy.level}, hp: {enemy.hp}, dmg: {enemy.dmg}, xpDrop: {enemy.xpDrop}</p>
            <h2>Soldiers</h2>
            <p>Aaiba: {aaibaDeployed}, level: {aaibaLevel}</p>
            <p>Slaughterers: {slaughterersDeployed}, level: {slaughterersLevel}</p>
        </div>
    );
};

export default Fight;