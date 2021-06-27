import React, { createContext } from 'react'

export const AuthContext = createContext({
    user: null,
    errorMessage: null // used when user makes mistake signing in or signup (like wrong password)
});

export default AuthContext
