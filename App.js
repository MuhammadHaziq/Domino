import React from 'react';

import {SafeAreaView, Easing, Animated} from 'react-native';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';
import CustomDrawer from './src/components/CustomDrawer';
import {Provider as AuthProvider} from './src/context/AuthContext';
import NavigationService from './NavigationService';

import ResolveAuthScreen from './src/screens/ResolveAuthScreen';
import WelcomeScreen from './src/screens/WelcomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import HomeScreen from './src/screens/HomeScreen';
import AccountScreen from './src/screens/AccountScreen';
import ContactScreen from './src/screens/ContactScreen';
import EventListScreen from './src/screens/EventListScreen';
import EventDetailScreen from './src/screens/EventDetailScreen';
import ChangePasswordScreen from './src/screens/ChangePasswordScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import RulesScreen from './src/screens/RulesScreen';
import AppendicesScreen from './src/screens/AppendicesScreen';
import TermsScreen from './src/screens/TermsScreen';
import PaymentScreen from './src/screens/PaymentScreen';

import ForgotPasswordModal from './src/modals/ForgotPasswordModal';
import LogoutModal from './src/modals/LogoutModal';

const loginGroupStack = createStackNavigator({
  Welcome: {
    screen: WelcomeScreen,
    navigationOptions: {
      header: null,
    },
  },
  Login: {
    screen: LoginScreen,
    navigationOptions: {
      header: null,
    },
  },
  Register: {
    screen: RegisterScreen,
    navigationOptions: {
      header: null,
    },
  },
});

const loginFlowStack = createStackNavigator(
  {
    Content: loginGroupStack,
    ForgotPassword: {screen: ForgotPasswordModal},
  },
  {
    headerMode: 'none',
    mode: 'modal',
    transparentCard: true,
    transitionConfig: () => ({
      transitionSpec: {
        duration: 100,
      },
      screenInterpolator: sceneProps => {
        const {position, scene} = sceneProps;
        const thisSceneIndex = scene.index;
        const opacity = position.interpolate({
          inputRange: [thisSceneIndex - 1, thisSceneIndex],
          outputRange: [0, 1],
        });

        return {opacity};
      },
    }),
    initialRouteName: 'Content',
  },
);

const accountFlowStack = createSwitchNavigator({
  Account: {
    screen: AccountScreen,
    navigationOptions: {
      header: null,
    },
  },
  Profile: {
    screen: ProfileScreen,
    navigationOptions: {
      header: null,
    },
  },
  ChangePassword: {
    screen: ChangePasswordScreen,
    navigationOptions: {
      header: null,
    },
  },
});

const mainGroupStack = createDrawerNavigator(
  {
    Home: HomeScreen,
    EventList: EventListScreen,
    EventDetail: EventDetailScreen,
    Contact: ContactScreen,
    Rules: RulesScreen,
    Appendices: AppendicesScreen,
    Terms: TermsScreen,
    Payment: PaymentScreen,
    AccountFlow: {
      screen: accountFlowStack,
      navigationOptions: {
        title: 'Account',
      },
    },
  },
  {
    initialRouteName: 'Home',
    contentComponent: CustomDrawer,
    contentOptions: {
      activeTintColor: '#000000',
      activeBackgroundColor: '#e6e6e6',
    },
  },
);

const mainFlowStack = createStackNavigator(
  {
    Content: mainGroupStack,
    Logout: {screen: LogoutModal},
  },
  {
    headerMode: 'none',
    mode: 'modal',
    transparentCard: true,
    transitionConfig: () => ({
      transitionSpec: {
        duration: 100,
      },
      screenInterpolator: sceneProps => {
        const {position, scene} = sceneProps;
        const thisSceneIndex = scene.index;
        const opacity = position.interpolate({
          inputRange: [thisSceneIndex - 1, thisSceneIndex],
          outputRange: [0, 1],
        });

        return {opacity};
      },
    }),
    initialRouteName: 'Content',
  },
);

const appFlow = createSwitchNavigator({
  loginFlow: {
    screen: loginFlowStack,
    navigationOptions: {
      header: null,
    },
  },
  mainFlow: {
    screen: mainFlowStack,
    navigationOptions: {
      header: null,
    },
  },
});

const TopLevelNavigator = createSwitchNavigator({
  ResolveAuth: ResolveAuthScreen,
  AppFlow: appFlow,
});

const AppContainer = createAppContainer(TopLevelNavigator);

export default App => {
  return (
    <AuthProvider>
      <SafeAreaView style={{flex: 1}}>
        <AppContainer
          ref={navigatorRef => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }}
        />
      </SafeAreaView>
    </AuthProvider>
  );
};
