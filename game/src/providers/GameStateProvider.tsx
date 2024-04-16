import { PropsWithChildren, createContext, useReducer } from "react";

export type ResourcesType = {
    metal: number;
    crystal: number;
    gemstone: number;
}

export enum ActionType {
    UPGRADE_FACTORY,
    UPGRADE_BARRACKS,
    UPGRADE_MAINFRAME,
    UPGRADE_ARMORY,
    UPGRADE_ARDC,
    RESET,
    CREATE_AAIBA,
    CREATE_SLAUGHTERER,
    UPGRADE_AAIBA,
    UPGRADE_SLAUGHTERER,
    DEPLOY_AAIBA,
    DEPLOY_SLAUGHTERER,
    UPGRADE_MINING_UNITS,
    UPGRADE_SENTRY_DRONES,
    ADD_METAL_MINING_UNITS,
    ADD_CRYSTAL_MINING_UNITS,
    ADD_GEMSTONE_MINING_UNITS,
    ADD_METAL_SENTRY_DRONES,
    ADD_CRYSTAL_SENTRY_DRONES,
    ADD_GEMSTONE_SENTRY_DRONES,
    KILL_ENEMY,
    SET_RESOURCES,
    SET_MINING_UNITS_AVAILABLE,
    SET_SENTRY_DRONES_AVAILABLE
}

type Action = {type: ActionType.UPGRADE_FACTORY} | {type: ActionType.UPGRADE_BARRACKS} | {type: ActionType.UPGRADE_MAINFRAME} | {type: ActionType.UPGRADE_ARMORY} | {type: ActionType.UPGRADE_ARDC} | {type: ActionType.RESET} |
{type: ActionType.CREATE_AAIBA} | {type: ActionType.CREATE_SLAUGHTERER} | {type: ActionType.UPGRADE_AAIBA} | {type: ActionType.UPGRADE_SLAUGHTERER} | {type: ActionType.DEPLOY_AAIBA} | {type: ActionType.DEPLOY_SLAUGHTERER} |
{type: ActionType.UPGRADE_MINING_UNITS} | {type: ActionType.UPGRADE_SENTRY_DRONES} | {type: ActionType.ADD_METAL_MINING_UNITS} | {type: ActionType.ADD_CRYSTAL_MINING_UNITS} | {type: ActionType.ADD_GEMSTONE_MINING_UNITS} |
{type: ActionType.ADD_METAL_SENTRY_DRONES} | {type: ActionType.ADD_CRYSTAL_SENTRY_DRONES} | {type: ActionType.ADD_GEMSTONE_SENTRY_DRONES} | {type: ActionType.KILL_ENEMY} | {type: ActionType.SET_RESOURCES, payload: ResourcesType} |
{type: ActionType.SET_MINING_UNITS_AVAILABLE, payload: number} | {type: ActionType.SET_SENTRY_DRONES_AVAILABLE, payload: number}

type GameState = {
    resources: ResourcesType;
    aaibaAvailable: number;
    slaughterersAvailable: number;
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
    slaughterersAvailable: 0,
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
    switch (action.type) {
        case ActionType.UPGRADE_FACTORY:
            newState.factoryLevel += 1;
            return newState;
        case ActionType.UPGRADE_BARRACKS:
            newState.barracksLevel += 1;
            return newState;
        case ActionType.UPGRADE_MAINFRAME:
            newState.mainframeLevel += 1;
            return newState;
        case ActionType.UPGRADE_ARMORY:
            newState.armoryLevel += 1;
            return newState;
        case ActionType.UPGRADE_ARDC:
            newState.ardcLevel += 1;
            return newState;
        case ActionType.RESET:
            localStorage.clear();
            return initialState;
        case ActionType.CREATE_AAIBA:
            newState.aaibaAvailable += 1;
            return newState;
        case ActionType.CREATE_SLAUGHTERER:
            newState.slaughterersAvailable += 1;
            return newState;
        case ActionType.UPGRADE_AAIBA:
            newState.aaibaLevel += 1;
            return newState;
        case ActionType.UPGRADE_SLAUGHTERER:
            newState.slaughterersLevel += 1;
            return newState;
        case ActionType.DEPLOY_AAIBA:
            newState.aaibaDeployed += 1;
            newState.aaibaAvailable -= 1;
            return newState;
        case ActionType.DEPLOY_SLAUGHTERER:
            newState.slaughterersDeployed += 1;
            newState.slaughterersAvailable -= 1;
            return newState;
        case ActionType.UPGRADE_MINING_UNITS:
            newState.miningUnitsLevel += 1;
            return newState;
        case ActionType.UPGRADE_SENTRY_DRONES:
            newState.sentryDronesLevel += 1;
            return newState;
        case ActionType.ADD_METAL_MINING_UNITS:
            newState.metalMiningUnits += 1;
            return newState;
        case ActionType.ADD_CRYSTAL_MINING_UNITS:
            newState.crystalMiningUnits += 1;
            return newState;
        case ActionType.ADD_GEMSTONE_MINING_UNITS:
            newState.gemstoneMiningUnits += 1;
            return newState;
        case ActionType.ADD_METAL_SENTRY_DRONES:
            newState.metalSentryDrones += 1;
            return newState;
        case ActionType.ADD_CRYSTAL_SENTRY_DRONES:
            newState.crystalSentryDrones += 1;
            return newState;
        case ActionType.ADD_GEMSTONE_SENTRY_DRONES:
            newState.gemstoneSentryDrones += 1;
            return newState;
        case ActionType.KILL_ENEMY:
            newState.enemiesKilled += 1;
            return newState;
        case ActionType.SET_RESOURCES:
            newState.resources = action.payload;
            return newState;
        case ActionType.SET_MINING_UNITS_AVAILABLE:
            newState.availableMiningUnits = action.payload;
            return newState;
        case ActionType.SET_SENTRY_DRONES_AVAILABLE:
            newState.availableSentryDrones = action.payload;
            return newState;
        default: return state;
    }

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