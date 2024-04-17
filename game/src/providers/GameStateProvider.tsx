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
    SET_METAL_MINING_UNITS,
    SET_CRYSTAL_MINING_UNITS,
    SET_GEMSTONE_MINING_UNITS,
    SET_METAL_SENTRY_DRONES,
    SET_CRYSTAL_SENTRY_DRONES,
    SET_GEMSTONE_SENTRY_DRONES,
    KILL_ENEMY,
    SET_RESOURCES,
    SET_MINING_UNITS_AVAILABLE,
    SET_SENTRY_DRONES_AVAILABLE,
    SET_AAIBA_DEPLOYED,
    SET_SLAUGHTERERS_DEPLOYED
}

type Action = {type: ActionType.UPGRADE_FACTORY, value: number} | {type: ActionType.UPGRADE_BARRACKS, value: number} | {type: ActionType.UPGRADE_MAINFRAME, value: number} | {type: ActionType.UPGRADE_ARMORY, value: number} | {type: ActionType.UPGRADE_ARDC, value: number} | {type: ActionType.RESET} |
{type: ActionType.CREATE_AAIBA, amount: number} | {type: ActionType.CREATE_SLAUGHTERER, amount: number} | {type: ActionType.UPGRADE_AAIBA, value: number} | {type: ActionType.UPGRADE_SLAUGHTERER, value: number} | {type: ActionType.DEPLOY_AAIBA, amount: number} | {type: ActionType.DEPLOY_SLAUGHTERER, amount: number} |
{type: ActionType.UPGRADE_MINING_UNITS, value: number} | {type: ActionType.UPGRADE_SENTRY_DRONES, value: number} | {type: ActionType.SET_METAL_MINING_UNITS, value: number} | {type: ActionType.SET_CRYSTAL_MINING_UNITS, value: number} | {type: ActionType.SET_GEMSTONE_MINING_UNITS, value: number} |
{type: ActionType.SET_METAL_SENTRY_DRONES, value: number} | {type: ActionType.SET_CRYSTAL_SENTRY_DRONES, value: number} | {type: ActionType.SET_GEMSTONE_SENTRY_DRONES, value: number}
| {type: ActionType.KILL_ENEMY} | {type: ActionType.SET_RESOURCES, payload: ResourcesType} |
{type: ActionType.SET_MINING_UNITS_AVAILABLE, payload: number} | {type: ActionType.SET_SENTRY_DRONES_AVAILABLE, payload: number}
| {type: ActionType.SET_AAIBA_DEPLOYED, payload: number} | {type: ActionType.SET_SLAUGHTERERS_DEPLOYED, payload: number};

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
    aaibaLevel: 1,
    slaughterersLevel: 1,
    factoryLevel: 0,
    barracksLevel: 0,
    mainframeLevel: 0,
    armoryLevel: 0,
    ardcLevel: 0,
    availableMiningUnits: 0,
    availableSentryDrones: 0,
    miningUnitsLevel: 1,
    sentryDronesLevel: 1,
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
            newState.factoryLevel = action.value;
            return newState;
        case ActionType.UPGRADE_BARRACKS:
            newState.barracksLevel = action.value;
            return newState;
        case ActionType.UPGRADE_MAINFRAME:
            newState.mainframeLevel = action.value;
            return newState;
        case ActionType.UPGRADE_ARMORY:
            newState.armoryLevel = action.value;
            return newState;
        case ActionType.UPGRADE_ARDC:
            newState.ardcLevel = action.value;
            return newState;
        case ActionType.RESET:
            localStorage.clear();
            return initialState;
        case ActionType.CREATE_AAIBA:
            newState.aaibaAvailable = action.amount;
            return newState;
        case ActionType.CREATE_SLAUGHTERER:
            newState.slaughterersAvailable = action.amount;
            return newState;
        case ActionType.UPGRADE_AAIBA:
            newState.aaibaLevel = action.value;
            return newState;
        case ActionType.UPGRADE_SLAUGHTERER:
            newState.slaughterersLevel = action.value;
            return newState;
        case ActionType.DEPLOY_AAIBA:
            newState.aaibaDeployed += action.amount;
            newState.aaibaAvailable -= action.amount;
            return newState;
        case ActionType.DEPLOY_SLAUGHTERER:
            newState.slaughterersDeployed += action.amount;
            newState.slaughterersAvailable -= action.amount;
            return newState;
        case ActionType.UPGRADE_MINING_UNITS:
            newState.miningUnitsLevel = action.value;
            return newState;
        case ActionType.UPGRADE_SENTRY_DRONES:
            newState.sentryDronesLevel = action.value;
            return newState;
        case ActionType.SET_METAL_MINING_UNITS:
            newState.metalMiningUnits = action.value;
            return newState;
        case ActionType.SET_CRYSTAL_MINING_UNITS:
            newState.crystalMiningUnits = action.value;
            return newState;
        case ActionType.SET_GEMSTONE_MINING_UNITS:
            newState.gemstoneMiningUnits = action.value;
            return newState;
        case ActionType.SET_METAL_SENTRY_DRONES:
            newState.metalSentryDrones = action.value;
            return newState;
        case ActionType.SET_CRYSTAL_SENTRY_DRONES:
            newState.crystalSentryDrones = action.value;
            return newState;
        case ActionType.SET_GEMSTONE_SENTRY_DRONES:
            newState.gemstoneSentryDrones = action.value;
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
        case ActionType.SET_AAIBA_DEPLOYED:
            newState.aaibaDeployed = action.payload;
            return newState;
        case ActionType.SET_SLAUGHTERERS_DEPLOYED:
            newState.slaughterersDeployed = action.payload;
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