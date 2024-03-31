import { useContext, useEffect } from 'react';
import { ResourcesContext } from '../providers/ResourcesProvider';
import { BuildingsContext } from '../providers/BuildingsProvider';

const Base = () => {
    const resources = useContext(ResourcesContext).resources;
    const updateResources = useContext(ResourcesContext).updateResources;
    const [factoryLevel, setFactoryLevel] = useContext(BuildingsContext).factory;
    const [barracksLevel, setBarracksLevel] = useContext(BuildingsContext).barracks;
    const [mainframeLevel, setMainframeLevel] = useContext(BuildingsContext).mainframe;
    const [armoryLevel, setArmoryLevel] = useContext(BuildingsContext).armory;
    const [ardcLevel, setArdcLevel] = useContext(BuildingsContext).ardc;

    useEffect(() => {
        const metal = parseInt(localStorage.getItem('metal') || '0');
        const crystal = parseInt(localStorage.getItem('crystal') || '0');
        const gemstone = parseInt(localStorage.getItem('gemstone') || '0');
        updateResources({ metal, crystal, gemstone });
        setFactoryLevel(parseInt(localStorage.getItem('factoryLevel') || '0'));
        setBarracksLevel(parseInt(localStorage.getItem('barracksLevel') || '0'));
        setMainframeLevel(parseInt(localStorage.getItem('mainframeLevel') || '0'));
        setArmoryLevel(parseInt(localStorage.getItem('armoryLevel') || '0'));
        setArdcLevel(parseInt(localStorage.getItem('ardcLevel') || '0'));
    }, []);

    const upgradeFactory = () => {
        const metalCost = 100 * Math.pow(5, factoryLevel);
        const crystalCost = 20 * Math.pow(5, factoryLevel);
        if (resources.metal < metalCost || resources.crystal < crystalCost) {
            return;
        }
        const newResources = { metal: resources.metal - metalCost, crystal: resources.crystal - crystalCost, gemstone: resources.gemstone };
        updateResources(newResources);
        const newLevel = factoryLevel + 1;
        setFactoryLevel(newLevel);
        localStorage.setItem('factoryLevel', newLevel.toString());
    };
    const upgradeBarracks = () => {
        const newLevel = barracksLevel + 1;
        setBarracksLevel(newLevel);
        localStorage.setItem('barracksLevel', newLevel.toString());
    };
    const upgradeMainframe = () => {
        const newLevel = mainframeLevel + 1;
        setMainframeLevel(newLevel);
        localStorage.setItem('mainframeLevel', newLevel.toString());
    };
    const upgradeArmory = () => {
        const newLevel = armoryLevel + 1;
        setArmoryLevel(newLevel);
        localStorage.setItem('armoryLevel', newLevel.toString());
    };
    const upgradeArdc = () => {
        const newLevel = ardcLevel + 1;
        setArdcLevel(newLevel);
        localStorage.setItem('ardcLevel', newLevel.toString());
    };

    const reset = () => {
        localStorage.clear();
        updateResources({ metal: 0, crystal: 0, gemstone: 0 });
        setFactoryLevel(0);
        setBarracksLevel(0);
        setMainframeLevel(0);
        setArmoryLevel(0);
        setArdcLevel(0);
    };

    return (
        <div>
            <h1>Base</h1>
            <p>Metal: {resources.metal}</p>
            <p>Crystal: {resources.crystal}</p>
            <p>Gemstone: {resources.gemstone}</p>
            <h2>Buildings</h2>
            <p>Factory Level: {factoryLevel}</p>
            <button onClick={() => upgradeFactory()}>Upgrade Factory</button>
            <p>Barracks Level: {barracksLevel}</p>
            <button onClick={() => upgradeBarracks()}>Upgrade Barracks</button>
            <p>Mainframe Level: {mainframeLevel}</p>
            <button onClick={() => upgradeMainframe()}>Upgrade Mainframe</button>
            <p>Armory Level: {armoryLevel}</p>
            <button onClick={() => upgradeArmory()}>Upgrade Armory</button>
            <p>ARDC Level: {ardcLevel}</p>
            <button onClick={() => upgradeArdc()}>Upgrade ARDC</button>
            <button onClick={() => reset()}>Reset</button>
        </div>
    );
};

export default Base;