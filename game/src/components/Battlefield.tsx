import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { GameStateContext } from '../providers/GameStateProvider';
import { ActionType } from '../providers/GameStateProvider';
import Fight from './Fight';
import '../styles/main.css';

export type Enemy = {
    name: string;
    level: number;
    description: string;
    hp: number;
    dmg: number;
    imgUrl: string;
}

const enemies: Enemy[] = [
    {name: "Kishilian", level: 10, description: "Kishilians are a sentient carnivorous race inhabiting the planet Kishili and its two moons, Lish I and Lish II.", hp: 1000, dmg: 100, imgUrl: "/imgs/enemy1.jpg"},
    {name: "Waccan", level: 20, description: "Waccans are semi-sentient nocturnal reptilian creatures of unknown origins. They can be found in most parts of the galaxy.", hp: 2000, dmg: 200, imgUrl: "/imgs/enemy2.jpg"},
    {name: "M'Tak Warrior", level: 30, description: "The M'Tak are a highly-intelligent species from the planet Inui, most of which are powerful warriors. Contary to popular beliefs, they are actually not insect nor insectoids, but mammals.", hp: 4000, dmg: 400, imgUrl: "/imgs/enemy3.jpg"},
    {name: "Zanzik", level: 40, description: "Zanziks are an amphibian sentient race originating from the planet Zanzi. Many Zanziks are working either as mercenaries or bounty hunters and they are widely recognized as one of the most dangerous species in the entire galaxy.", hp: 8000, dmg: 800, imgUrl: "/imgs/enemy4.jpeg"},
    {name: "Natarra the Planet Eater", level: 100, description: "Your last words: \"I thought he'd be... bigger.\"", hp: 10000000000, dmg: 2000, imgUrl: "/imgs/enemy5.jpg"}
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
    const undeployAaiba = () => {
        if (state.aaibaDeployed === 0) {
            return;
        }
        dispatch({type: ActionType.DEPLOY_AAIBA, amount: -1});
    }
    const deploySlaughterer = () => {
        if (state.slaughterersAvailable === 0) {
            return;
        }
        dispatch({type: ActionType.DEPLOY_SLAUGHTERER, amount: 1});
    };
    const undeploySlaughterer = () => {
        if (state.slaughterersDeployed === 0) {
            return;
        }
        dispatch({type: ActionType.DEPLOY_SLAUGHTERER, amount: -1});
    }

    const getCurrentEnemy = () => {
        const currentEnemy = enemies[state.enemiesKilled];
        if (currentEnemy === undefined) {
            return enemies[enemies.length - 1];
        }
        return currentEnemy;
    }

    return (
        <div className={"battlefield"}>
            <header className={"header"}>
                <div className={"location-navigation"}>
                    <Link className={"location-navigation__item" + " location-navigation__item--left" } to="/mining">Mining Grounds</Link>
                    <h1 className={"location-name" + " location-name--desktop-only" + " location-name--bigger-padding"}>Battlefield</h1>
                    <Link className={"location-navigation__item" + " location-navigation__item--right"} to="/base">Base</Link>
                </div>
                <h1 className={"location-name" + " location-name--mobile-only" + " location-name--bigger-padding"}>Battlefield</h1>
            </header>
            {showFight === false ? (
                <div className={"battlefield__main"}>
                    <div className={"soldiers"}>
                        <div className={"soldiers__section"}>
                            <h2 className={"soldiers__name"}>AAIBA</h2>
                            <p className={"soldiers__level"}>Level {state.aaibaLevel}</p>
                            <div className={'soldiers__main'}>
                                <img className={"soldiers__image"} src="/imgs/aaiba.png" />
                                <div className={"soldiers__controls"}>
                                    <button onClick={deployAaiba}>Deploy</button>
                                    <p className={"soldiers__amount"}>{state.aaibaDeployed}</p>
                                    <button onClick={undeployAaiba}>Recall</button>
                                </div>
                            </div>
                        </div>
                        <div className={"soldiers__section"}>
                            <h2 className={"soldiers__name"}>Slaughterers</h2>
                            <p className={"soldiers__level"}>Level {state.slaughterersLevel}</p>
                            <div className={'soldiers__main'}>
                                <img className={"soldiers__image"} src="/imgs/slaughterer.png" />
                                <div className={"soldiers__controls"}>
                                    <button onClick={deploySlaughterer}>Deploy</button>
                                    <p className={"soldiers__amount"}>{state.slaughterersDeployed}</p>
                                    <button onClick={undeploySlaughterer}>Recall</button>
                                </div>
                            </div>
                        </div>
                        <button className={"button button--fight"} onClick={() => setShowFight(true)}>Fight</button>
                    </div>
                    <div className={"enemy"}>
                        <img className={"enemy__image"} src={getCurrentEnemy().imgUrl} alt={getCurrentEnemy().name} />
                        <h2 className={"enemy__name"}>{getCurrentEnemy().name}</h2>
                        <p className={"enemy__level"}>Level {getCurrentEnemy().level}</p>
                        <p className={"enemy__desc"}>{getCurrentEnemy().description}</p>
                    </div>
                </div>
            ) : <Fight enemy={getCurrentEnemy()} aaibaDeployed={state.aaibaDeployed} slaughterersDeployed={state.slaughterersDeployed} aaibaLevel={state.aaibaLevel} slaughterersLevel={state.slaughterersLevel} setShowFight={setShowFight}/>}
        </div>
    );
};

export default Battlefield;