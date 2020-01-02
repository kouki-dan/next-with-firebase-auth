import React, { useContext, useEffect } from "react";

export const FirebaseInitialized = React.createContext(false);

/// wait firebase initializing and call callback
const useFirebaseInitialized = callback => {
  const firebaseInitialized = useContext(FirebaseInitialized);
  useEffect(() => {
    if (firebaseInitialized) {
      callback();
    }
  }, [firebaseInitialized]);
};

export default useFirebaseInitialized;
