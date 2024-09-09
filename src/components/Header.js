import React, {useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import Image from 'react-native-scalable-image';
import {withNavigation} from 'react-navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Context as AuthContext} from '../context/AuthContext';

const Header = ({navigation}) => {
  const {state} = useContext(AuthContext);

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.card}>
          <View>
            <Ionicons name="ios-menu" size={42} color="#FFFFFF" />
          </View>
          <View style={styles.accountContainer}>
            <MaterialIcons name="account-circle" size={42} color="#FFFFFF" />
            <Text style={styles.username}>{state.firstName || 'Guest'}</Text>
          </View>
        </View>
        <SafeAreaView style={styles.logoContainer}>
          <TouchableOpacity
            accessibilityLabel="Open menu"
            accessibilityHint="Opens navigation menu"
            onPress={() => {
              navigation.openDrawer();
            }}
            style={{flex: 1, height: '100%'}}></TouchableOpacity>
          <TouchableOpacity
            accessibilityLabel="Logo"
            accessibilityHint="Navigates to home"
            style={styles.logo}
            onPress={() => {
              navigation.navigate('Home');
            }}>
            <Image
              height={100}
              source={require('../../assets/images/logo.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            accessibilityLabel="Account status"
            accessibilityHint="Shows account status"
            onPress={() => {
              navigation.navigate(
                state.loggedInStatus !== 'guest' ? 'Account' : 'ResolveAuth',
              );
            }}
            style={{flex: 1, height: '100%'}}></TouchableOpacity>
        </SafeAreaView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1b191a',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.44,
    shadowRadius: 2.62,
    height: 134,
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'transparent',
    elevation: 4,
    height: '100%',
  },
  accountContainer: {
    alignItems: 'center',
  },
  username: {
    fontSize: 10,
    fontFamily: 'TitilliumWeb-Light',
    color: '#FFFFFF',
    textTransform: 'uppercase',
  },
  logoContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  logo: {
    paddingTop: 10,
  },
});

export default withNavigation(Header);
