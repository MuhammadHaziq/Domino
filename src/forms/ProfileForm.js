import React, {useContext} from 'react';
import {useFocusEffect} from 'react-navigation-hooks';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Keyboard,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup';
import Image from 'react-native-scalable-image';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Context as AuthContext} from '../context/AuthContext';
import {trackPromise, usePromiseTracker} from 'react-promise-tracker';

const phoneRegExp = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;

const loginSchema = yup.object().shape({
  firstName: yup
    .string()
    .required()
    .label('First Name'),
  lastName: yup
    .string()
    .required()
    .label('Last Name'),
  phone: yup
    .string()
    .required()
    .matches(phoneRegExp, 'Use 10 digit phone number.')
    .label('Phone'),
  playerName: yup
    .string()
    .required()
    .label('Player Name'),
});

const ProfileForm = () => {
  const {state, getProfile, updateProfile, clearErrorMessage} = useContext(
    AuthContext,
  );
  const {promiseInProgress} = usePromiseTracker();

  useFocusEffect(
    React.useCallback(() => {
      getProfile();
    }, []),
  );

  return (
    <Formik
      enableReinitialize
      initialValues={{
        firstName: state.firstName,
        lastName: state.lastName,
        phone: state.phone,
        playerName: state.playerName,
      }}
      validationSchema={loginSchema}
      onReset={clearErrorMessage}
      onSubmit={(values, actions) => {
        Keyboard.dismiss();
        trackPromise(
          updateProfile({
            first_name: values.firstName,
            last_name: values.lastName,
            phone: values.phone,
            player_name: values.playerName,
          }),
        );
      }}>
      {props => {
        return (
          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <View style={styles.iconContainer}>
                <Ionicons
                  style={styles.icon}
                  name="ios-person"
                  size={28}
                  color="#000000"
                />
              </View>
              <TextInput
                value={props.values.firstName}
                style={styles.input}
                onChangeText={props.handleChange('firstName')}
                onBlur={() => props.setFieldTouched('firstName')}
                onFocus={clearErrorMessage}
                placeholder="First Name"
                placeholderTextColor="#666666"
                textContentType="name"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
            {props.touched.firstName && props.errors.firstName && (
              <Text style={styles.error}>{props.errors.firstName}</Text>
            )}
            <View style={styles.inputContainer}>
              <View style={styles.iconContainer}>
                <Ionicons
                  style={styles.icon}
                  name="ios-person"
                  size={28}
                  color="#000000"
                />
              </View>
              <TextInput
                value={props.values.lastName}
                style={styles.input}
                onChangeText={props.handleChange('lastName')}
                onBlur={() => props.setFieldTouched('lastName')}
                onFocus={clearErrorMessage}
                placeholder="Last Name"
                placeholderTextColor="#666666"
                textContentType="name"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
            {props.touched.lastName && props.errors.lastName && (
              <Text style={styles.error}>{props.errors.lastName}</Text>
            )}
            <View style={styles.inputContainer}>
              <View style={styles.iconContainer}>
                <MaterialIcons
                  style={styles.icon}
                  name="phone"
                  size={28}
                  color="#000000"
                />
              </View>
              <TextInput
                value={props.values.phone}
                style={styles.input}
                onChangeText={props.handleChange('phone')}
                onBlur={() => props.setFieldTouched('phone')}
                onFocus={clearErrorMessage}
                placeholder="Phone"
                placeholderTextColor="#666666"
                textContentType="telephoneNumber"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
            {props.touched.phone && props.errors.phone && (
              <Text style={styles.error}>{props.errors.phone}</Text>
            )}
            <View style={styles.inputContainer}>
              <View style={styles.iconContainer}>
                <MaterialIcons
                  style={styles.icon}
                  name="person-pin"
                  size={28}
                  color="#000000"
                />
              </View>
              <TextInput
                value={props.values.playerName}
                style={styles.input}
                onChangeText={props.handleChange('playerName')}
                onBlur={() => props.setFieldTouched('playerName')}
                onFocus={clearErrorMessage}
                placeholder="Player Name"
                placeholderTextColor="#666666"
                textContentType="nickname"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
            {props.touched.playerName && props.errors.playerName && (
              <Text style={styles.error}>{props.errors.playerName}</Text>
            )}
            {state.errorMessage ? (
              <Text style={styles.serverError}>{state.errorMessage}</Text>
            ) : null}
            <TouchableOpacity
              // disabled={props.isSubmitting || !props.isValid}
              style={styles.button}
              onPress={props.handleSubmit}>
              {promiseInProgress ? (
                <ActivityIndicator size="large" color="#FFFFFF" />
              ) : (
                <Text style={styles.buttonText}>SAVE CHANGES</Text>
              )}
            </TouchableOpacity>
          </View>
        );
      }}
    </Formik>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    width: '90%',
    alignSelf: 'center',
    marginVertical: 15,
  },
  inputContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#000',
    paddingBottom: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  iconContainer: {
    width: 50,
    alignItems: 'center',
  },
  icon: {
    marginHorizontal: 10,
  },
  input: {
    flex: 1,
    marginLeft: 5,
    fontSize: 18,
    fontFamily: 'TitilliumWeb-Regular',
    color: '#000000',
  },
  validationText: {
    marginTop: 8,
    marginBottom: 8,
    color: 'red',
  },
  button: {
    marginTop: 25,
    width: '50%',
    backgroundColor: '#EA1D24',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.44,
    shadowRadius: 2.62,
    elevation: 4,
  },
  buttonText: {
    color: '#ffffff',
    fontFamily: 'TitilliumWeb-Bold',
    fontSize: 19,
  },
  error: {
    color: '#EA1D24',
    fontSize: 16,
    fontFamily: 'TitilliumWeb-Regular',
  },
  serverError: {
    marginTop: 15,
    color: '#EA1D24',
    fontSize: 16,
    fontFamily: 'TitilliumWeb-Regular',
    alignSelf: 'center',
    textAlign: 'center',
  },
});

export default ProfileForm;
