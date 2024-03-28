import { PropsWithChildren, createContext, useState } from "react";

export type ResourcesType = {
    metal: number;
    crystal: number;
    gemstone: number;
}

type ResourcesContextType = {
    resources: ResourcesType;
    updateResources: (newResources: ResourcesType) => void;
}

export const ResourcesContext = createContext<ResourcesContextType>(
    { resources: { metal: 0, crystal: 0, gemstone: 0 }, updateResources: () => {} }
);

const ResourcesProvider : React.FC<PropsWithChildren> = ({ children }) => {
    const [resources, setResources] = useState<ResourcesType>({ metal: 0, crystal: 0, gemstone: 0 });

    const updateResources = (newResources: ResourcesType) => {
        setResources({...resources, ...newResources});
    };

    return (
        <ResourcesContext.Provider value={{ resources, updateResources }}>
            {children}
        </ResourcesContext.Provider>
    );
}

export default ResourcesProvider;