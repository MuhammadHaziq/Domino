import React, {useEffect, useContext} from 'react';
import {Context as AuthContext} from '../context/AuthContext';
import SplashScreen from 'react-native-splash-screen';

const ResolveAuthScreen = () => {
  const {tryLocalLogin} = useContext(AuthContext);

  useEffect(() => {
    let didCancel = false;
    if (!didCancel) tryLocalLogin();
    return () => {
      SplashScreen.hide();
      didCancel = true;
    };
  }, []);

  return null;
};

export default ResolveAuthScreen;
