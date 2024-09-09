import React, {useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import BackHeader from '../components/BackHeader';
import Image from 'react-native-scalable-image';
import RegisterForm from '../forms/RegisterForm';
import Hide from 'react-native-hide-with-keyboard';

const RegisterScreen = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        stickyHeaderIndices={[0]}
        bounces={false}>
        <BackHeader label="REGISTER" backScreen="Welcome" />
        <Hide>
          <View style={styles.logo}>
            <Image
              width={Dimensions.get('window').width * 0.6}
              source={require('../../assets/images/logo.png')}
            />
          </View>
        </Hide>
        <View style={{flex: 1}} behavior="padding" enabled>
          <Text style={styles.title}>ACCOUNT REGISTRATION</Text>
          <RegisterForm />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  logo: {
    alignSelf: 'center',
    marginTop: 40,
  },
  title: {
    fontFamily: 'TitilliumWeb-Regular',
    fontSize: 25,
    color: '#000000',
    alignSelf: 'center',
    marginTop: 35,
  },
  buttonContainer: {
    margin: 25,
  },
  forgotText: {
    fontFamily: 'TitilliumWeb-Regular',
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
  },
});

export default RegisterScreen;
