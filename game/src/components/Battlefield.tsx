import { useContext, useEffect, useState } from 'react';
import { ResourcesContext } from '../providers/ResourcesProvider';
import { SoldiersContext } from '../providers/SoldiersProvider';
import { Link } from 'react-router-dom';

export type Enemy = {
    name: string;
    level: number;
    hp: number;
    dmg: number;
    xpDrop: number;
    imgUrl: string;
}

const enemies: Enemy[] = [
    {name: "Alien", level: 10, hp: 100, dmg: 10, xpDrop: 100, imgUrl: ""},
    {name: "Stogner Alien", level: 20, hp: 200, dmg: 20, xpDrop: 200, imgUrl: ""}
];

const Battlefield = () => {
    const resources = useContext(ResourcesContext).resources;
    const updateResources = useContext(ResourcesContext).updateResources;
    const [aaibaAvailable, setAaibaAvailable] = useContext(SoldiersContext).aaibaAvailable;
    const [aaibaLevel, setAaibaLevel] = useContext(SoldiersContext).aaibaLevel;
    const [slaughterersAvailable, setSlaughterersAvailable] = useContext(SoldiersContext).slaugheterersAvailable;
    const [slaughterersLevel, setSlaughterersLevel] = useContext(SoldiersContext).slaughterersLevel;
    const [aaibaDeployed, setAaibaDeployed] = useState<number>(0);
    const [slaughterersDeployed, setSlaughterersDeployed] = useState<number>(0);
    const [enemiesKilled, setEnemiesKilled] = useState<number>(0);

    useEffect(() => {
        const metal = parseInt(localStorage.getItem('metal') || '0');
        const crystal = parseInt(localStorage.getItem('crystal') || '0');
        const gemstone = parseInt(localStorage.getItem('gemstone') || '0');
        updateResources({ metal, crystal, gemstone });
        setAaibaAvailable(parseInt(localStorage.getItem('aaibaAvailable') || '0'));
        setAaibaLevel(parseInt(localStorage.getItem('aaibaLevel') || '0'));
        setSlaughterersAvailable(parseInt(localStorage.getItem('slaughterersAvailable') || '0'));
        setSlaughterersLevel(parseInt(localStorage.getItem('slaughterersLevel') || '0'));
    }, []);

    const deployAaiba = () => {
        if (aaibaAvailable === 0) {
            return;
        }
        setAaibaDeployed(aaibaDeployed + 1);
        setAaibaAvailable(aaibaAvailable - 1);
        localStorage.setItem('aaibaAvailable', (aaibaAvailable - 1).toString());
        localStorage.setItem('aaibaDeployed', (aaibaDeployed + 1).toString());
    };
    const deploySlaughterer = () => {
        if (slaughterersAvailable === 0) {
            return;
        }
        setSlaughterersDeployed(slaughterersDeployed + 1);
        setSlaughterersAvailable(slaughterersAvailable - 1);
        localStorage.setItem('slaughterersAvailable', (slaughterersAvailable - 1).toString());
        localStorage.setItem('slaughterersDeployed', (slaughterersDeployed + 1).toString());
    };

    const getCurrentEnemy = () => {
        const currentEnemy = enemies[enemiesKilled];
        return currentEnemy;
    }

    return (
        <div>
            <h1>Battlefield</h1>
            <p>Metal: {resources.metal}</p>
            <p>Crystal: {resources.crystal}</p>
            <p>Gemstone: {resources.gemstone}</p>
            <h2>Soldiers</h2>
            <p>AAIBA: {aaibaAvailable}, level: {aaibaLevel}</p>
            <p>Slaughterers: {slaughterersAvailable}, level: {slaughterersLevel}</p>
            <h2>Deployed</h2>
            <p>AAIBA: {aaibaDeployed}</p>
            <button onClick={() => deployAaiba()}>Deploy AAIBA</button>
            <p>Slaughterers: {slaughterersDeployed}</p>
            <button onClick={() => deploySlaughterer()}>Deploy Slaughterer</button>
            <h2>Enemy</h2>
            <p>{getCurrentEnemy().name}, level: {getCurrentEnemy().level}</p>
            <Link to="/base">Base</Link>
            <Link to="/mining">Mining Grounds</Link>
        </div>
    );
};

export default Battlefield;