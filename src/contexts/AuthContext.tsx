import React from 'react';
import { useStorageState } from '../hooks/useStorageState';
import { MyAuthContext } from '../types';

const AuthContext = React.createContext<MyAuthContext | null>(null);

// This hook can be used to access the user info.
export function useSession():any {
  const value = React.useContext(AuthContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />');
    }
  }

  return value;
}
//this is the session provider
//it checks if the user is logged in or not
export function SessionProvider(props: React.PropsWithChildren) {
  //setSession is a function that sets the session
  const [[isLoading, session], setSession] = useStorageState('session');
  //isLoading is a boolean that checks if the user is logged in or not
  //session is the token that is stored in the local storage
  return (
    <AuthContext.Provider
      value={{
        signIn: (token) => {
          setSession(token);
        },
        signOut: () => {
          setSession(null);
        },
        session,
        isLoading,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
}
