import React, { createContext, useState, useContext } from 'react';
import profile1 from './src/assets/profile1.png';
import profile2 from './src/assets/profile2.png';

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
    const [currentProfile, setCurrentProfile] = useState(profile1);

    const toggleProfile = () => {
        setCurrentProfile((prevProfile) => (prevProfile === profile1 ? profile2 : profile1));
    };

    return (
        <ProfileContext.Provider value={{ currentProfile, toggleProfile }}>
            {children}
        </ProfileContext.Provider>
    );
};

export const useProfile = () => {
    return useContext(ProfileContext);
};
