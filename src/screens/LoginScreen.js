import React, {useState, useContext} from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import BackHeader from '../components/BackHeader';
import Image from 'react-native-scalable-image';
import LoginForm from '../forms/LoginForm';
import Hide from 'react-native-hide-with-keyboard';
import {Context as AuthContext} from '../context/AuthContext';

const LoginScreen = ({navigation}) => {
  const {clearErrorMessage} = useContext(AuthContext);
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView
        bounces={false}
        keyboardShouldPersistTaps="handled"
        style={{flex: 1}}
        stickyHeaderIndices={[0]}>
        <BackHeader label="SIGN IN" />
        <Hide>
          <View style={styles.logo}>
            <Image
              width={Dimensions.get('window').width * 0.6}
              source={require('../../assets/images/logo.png')}
            />
          </View>
        </Hide>
        <KeyboardAvoidingView style={{flex: 1}} behavior="padding" enabled>
          <Text style={styles.title}>ACCOUNT LOGIN</Text>
          <LoginForm />
          <TouchableOpacity
            onPress={() => {
              clearErrorMessage();
              navigation.navigate('ForgotPassword');
            }}>
            <Text style={styles.forgotText}>FORGOT YOUR PASSWORD?</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
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
  forgotText: {
    fontFamily: 'TitilliumWeb-Regular',
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
  },
});

export default LoginScreen;
