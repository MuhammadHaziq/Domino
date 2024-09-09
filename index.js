import {AppRegistry, Platform} from 'react-native';
import 'react-native-gesture-handler';
import codePush from 'react-native-code-push';

import App from './App';
import {name as appName} from './app.json';

const codePushKeys = Platform.select({
  android: '',
  ios: '',
});

const CodePushifiedApp = codePush({
  deploymentKey: codePushKeys,
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
  installMode: codePush.InstallMode.IMMEDIATE,
  updateDialog: true,
})(App);

AppRegistry.registerComponent(appName, () => CodePushifiedApp);
