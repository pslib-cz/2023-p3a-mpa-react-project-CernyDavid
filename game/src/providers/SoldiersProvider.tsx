import { PropsWithChildren, createContext, useState } from "react";

type SoldiersContextType = {
    aaibaAvailable: [number, React.Dispatch<React.SetStateAction<number>>];
    slaugheterersAvailable: [number, React.Dispatch<React.SetStateAction<number>>];
    aaibaLevel: [number, React.Dispatch<React.SetStateAction<number>>];
    slaughterersLevel: [number, React.Dispatch<React.SetStateAction<number>>];
}

export const SoldiersContext = createContext<SoldiersContextType>({
    aaibaAvailable: [0, () => {}],
    slaugheterersAvailable: [0, () => {}],
    aaibaLevel: [0, () => {}],
    slaughterersLevel: [0, () => {}],
});

const SoldiersProvider : React.FC<PropsWithChildren> = ({ children }) => {
    const [aaibaAvailable, setAaibaAvailable] = useState<number>(0);
    const [slaugheterersAvailable, setSlaugheterersAvailable] = useState<number>(0);
    const [aaibaLevel, setAaibaLevel] = useState<number>(0);
    const [slaughterersLevel, setSlaughterersLevel] = useState<number>(0);

    return (
        <SoldiersContext.Provider value={{
            aaibaAvailable: [aaibaAvailable, setAaibaAvailable],
            slaugheterersAvailable: [slaugheterersAvailable, setSlaugheterersAvailable],
            aaibaLevel: [aaibaLevel, setAaibaLevel],
            slaughterersLevel: [slaughterersLevel, setSlaughterersLevel]
        }}>
            {children}
        </SoldiersContext.Provider>
    );
}

export default SoldiersProvider;