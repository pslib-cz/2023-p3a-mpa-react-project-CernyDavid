import { PropsWithChildren, createContext, useReducer } from "react";

export type ResourcesType = {
    metal: number;
    crystal: number;
    gemstone: number;
}

export enum ActionType {}

type Action = {}

type GameState = {
    resources: ResourcesType;
    aaibaAvailable: number;
    slaugheterersAvailable: number;
    aaibaLevel: number;
    slaughterersLevel: number;
    factoryLevel: number;
    barracksLevel: number;
    mainframeLevel: number;
    armoryLevel: number;
    ardcLevel: number;
    availableMiningUnits: number;
    availableSentryDrones: number;
    miningUnitsLevel: number;
    sentryDronesLevel: number;
    metalMiningUnits: number;
    crystalMiningUnits: number;
    gemstoneMiningUnits: number;
    metalSentryDrones: number;
    crystalSentryDrones: number;
    gemstoneSentryDrones: number;
    aaibaDeployed: number;
    slaughterersDeployed: number;
    enemiesKilled: number;
}

const initialState: GameState = {
    resources: { metal: 0, crystal: 0, gemstone: 0 },
    aaibaAvailable: 0,
    slaugheterersAvailable: 0,
    aaibaLevel: 0,
    slaughterersLevel: 0,
    factoryLevel: 0,
    barracksLevel: 0,
    mainframeLevel: 0,
    armoryLevel: 0,
    ardcLevel: 0,
    availableMiningUnits: 0,
    availableSentryDrones: 0,
    miningUnitsLevel: 0,
    sentryDronesLevel: 0,
    metalMiningUnits: 0,
    crystalMiningUnits: 0,
    gemstoneMiningUnits: 0,
    metalSentryDrones: 0,
    crystalSentryDrones: 0,
    gemstoneSentryDrones: 0,
    aaibaDeployed: 0,
    slaughterersDeployed: 0,
    enemiesKilled: 0
}

const reducer = (state: GameState, action: Action ) => {
    const newState = {...state}
    return newState;
}

export type GameStateContextType = {
    state: GameState;
    dispatch: React.Dispatch<Action>;
};

export const GameStateContext = createContext<GameStateContextType>(
    {state: initialState, dispatch: () => {}}
);

const GameStateProvider : React.FC<PropsWithChildren> = ({ children }) => {
    const [state, dispatch] = useReducer<(state: GameState, action: Action) => (GameState)>(reducer, initialState)

    return (
        <GameStateContext.Provider value={{state, dispatch}}>
            {children}
        </GameStateContext.Provider>
    );
}

export default GameStateProvider;