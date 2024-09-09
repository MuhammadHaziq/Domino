import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import Image from 'react-native-scalable-image';
import {Dimensions} from 'react-native';
import FullButton from '../components/FullButton';

const WelcomeScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.body}>
      <View>
        <Image
          width={Dimensions.get('window').width * 0.8}
          source={require('../../assets/images/logo.png')}
        />
        <Text style={styles.welcomeText}>
          WELCOME TO THE{'\n'}DOMINO CHALLENGE SERIES APP!
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <FullButton
          destination={() => navigation.navigate('Login')}
          bgColor="red"
          label="LOG IN"
          spacing="30"
        />
        <FullButton
          destination={() => navigation.navigate('Register')}
          bgColor="yellow"
          label="REGISTER"
        />
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Text style={styles.guestText}>EXPLORE APP AS GUEST</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  welcomeText: {
    fontFamily: 'TitilliumWeb-Regular',
    fontSize: 20,
    marginVertical: 0,
    paddingVertical: 0,
    textAlign: 'center',
    lineHeight: 22,
    marginTop: 35,
  },
  buttonContainer: {
    width: '100%',
  },
  guestText: {
    fontFamily: 'TitilliumWeb-Regular',
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
  },
});

export default WelcomeScreen;
