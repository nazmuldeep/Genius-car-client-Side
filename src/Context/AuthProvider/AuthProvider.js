import React, { createContext } from 'react';
import { onAuthStateChanged, createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
import app from '../../Firebase/firebase.config';
import { useState } from 'react';
import { useEffect } from 'react';
import { current } from 'daisyui/src/colors';


const AuthContex = createContext();
const auth = getAuth(app)
const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)

    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            console.log(currentUser);
            setUser(currentUser)
        });
        return () => {
            return unsubscribe();
        }
    }, [])
    const authInfo = {
        user,
        loading,
        createUser
    }
    return (

        <AuthContex.Provider
            value={authInfo}>
            {children}
        </AuthContex.Provider>
    );
};

export default AuthProvider;