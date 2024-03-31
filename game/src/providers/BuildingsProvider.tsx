import { PropsWithChildren, createContext, useState } from "react";

type BuildingsContextType = {
    factory: [number, React.Dispatch<React.SetStateAction<number>>];
    barracks: [number, React.Dispatch<React.SetStateAction<number>>];
    mainframe: [number, React.Dispatch<React.SetStateAction<number>>];
    armory: [number, React.Dispatch<React.SetStateAction<number>>];
    ardc: [number, React.Dispatch<React.SetStateAction<number>>];
}

export const BuildingsContext = createContext<BuildingsContextType>(
    { factory: [0, () => {}], barracks: [0, () => {}], mainframe: [0, () => {}], armory: [0, () => {}], ardc: [0, () => {}] }
);

const BuildingsProvider : React.FC<PropsWithChildren> = ({ children }) => {
    const [factoryLevel, setFactoryLevel] = useState<number>(0);
    const [barracksLevel, setBarracksLevel] = useState<number>(0);
    const [mainframeLevel, setMainframeLevel] = useState<number>(0);
    const [armoryLevel, setArmoryLevel] = useState<number>(0);
    const [ardcLevel, setArdcLevel] = useState<number>(0);

    return (
        <BuildingsContext.Provider value={{ factory: [factoryLevel, setFactoryLevel], barracks: [barracksLevel, setBarracksLevel], 
            mainframe: [mainframeLevel, setMainframeLevel], armory: [armoryLevel, setArmoryLevel], ardc: [ardcLevel, setArdcLevel]
        }}>
            {children}
        </BuildingsContext.Provider>
    );
}

export default BuildingsProvider;