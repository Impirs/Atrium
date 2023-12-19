import React, { createContext, useContext, useState, ReactNode } from 'react';

interface FloatingWindowData {
    htmlElement: string;
    cssFile: string;
}

interface FloatingWindowContextType {
    floatingWindowData: FloatingWindowData | null;
    openFloatingWindow: (data: FloatingWindowData) => void;
    closeFloatingWindow: () => void;
}

const FloatingWindowContext = createContext<FloatingWindowContextType | undefined>(undefined);

interface FloatingWindowProviderProps {
    children: ReactNode;
}

export const useFloatingWindow = () => {
    const context = useContext(FloatingWindowContext);
    if (!context) {
        throw new Error('useFloatingWindow must be used within a FloatingWindowProvider');
    }
    return context;
};

export const FloatingWindowProvider: React.FC<FloatingWindowProviderProps> = ({ children }) => {
    const [ floatingWindowData, setFloatingWindowData ] = useState<FloatingWindowData | null>(null);

    const openFloatingWindow = (data: FloatingWindowData) => {
        setFloatingWindowData(data);
    };

    const closeFloatingWindow = () => {
        setFloatingWindowData(null);
    };

    return (
        <FloatingWindowContext.Provider value={{ floatingWindowData, openFloatingWindow, closeFloatingWindow }}>
            {children}
        </FloatingWindowContext.Provider>
    );
};
