import { useContext, useEffect } from 'react';
import { ResourcesContext } from '../providers/ResourcesProvider';

const Base = () => {
    const resources = useContext(ResourcesContext).resources;
    const updateResources = useContext(ResourcesContext).updateResources;

    useEffect(() => {
        const metal = parseInt(localStorage.getItem('metal') || '0');
        const crystal = parseInt(localStorage.getItem('crystal') || '0');
        const gemstone = parseInt(localStorage.getItem('gemstone') || '0');
        updateResources({ metal, crystal, gemstone });
    }, []);

    return (
        <div>
            <h1>Base</h1>
            <p>Metal: {resources.metal}</p>
            <p>Crystal: {resources.crystal}</p>
            <p>Gemstone: {resources.gemstone}</p>
        </div>
    );
};

export default Base;