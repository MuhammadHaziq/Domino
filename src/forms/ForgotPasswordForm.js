import React, {useEffect, useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Keyboard,
  KeyboardAvoidingView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Context as AuthContext} from '../context/AuthContext';
import {trackPromise, usePromiseTracker} from 'react-promise-tracker';

const forgotPasswordSchema = yup.object().shape({
  email: yup
    .string()
    .required()
    .email()
    .label('Email'),
});

const ForgotPasswordForm = () => {
  const {state, forgotPassword, clearErrorMessage} = useContext(AuthContext);
  const {promiseInProgress} = usePromiseTracker({area: 'forgot-button'});

  return (
    <KeyboardAvoidingView behavior="padding">
      <Formik
        initialValues={{
          email: '',
        }}
        validationSchema={forgotPasswordSchema}
        onReset={clearErrorMessage}
        onSubmit={(values, actions) => {
          Keyboard.dismiss();
          trackPromise(
            forgotPassword({
              email: values.email,
            }),
            'forgot-button',
          );
        }}>
        {props => {
          return (
            <View style={styles.formContainer}>
              <Text style={styles.title}>What's My Password?</Text>
              <Text style={styles.description}>
                If you have forgotten your password enter your email below and
                we will send instructions on how to reset it.
              </Text>
              <View style={styles.inputContainer}>
                <View style={styles.iconContainer}>
                  <Ionicons
                    style={styles.icon}
                    name="ios-mail"
                    size={28}
                    color="#000000"
                  />
                </View>
                <TextInput
                  value={props.values.email}
                  style={styles.input}
                  onChangeText={props.handleChange('email')}
                  onBlur={() => props.setFieldTouched('email')}
                  onFocus={clearErrorMessage}
                  placeholder="Email Address"
                  placeholderTextColor="#666666"
                  keyboardType="email-address"
                  textContentType="emailAddress"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>
              {props.touched.email && props.errors.email && (
                <Text style={styles.error}>{props.errors.email}</Text>
              )}
              {state.errorMessage && typeof state.errorMessage !== 'object' ? (
                <Text style={styles.serverError}>{state.errorMessage}</Text>
              ) : null}
              <TouchableOpacity
                // disabled={props.isSubmitting || !props.isValid}
                style={styles.button}
                onPress={props.handleSubmit}>
                {promiseInProgress ? (
                  <ActivityIndicator size="small" color="#FFFFFF" />
                ) : (
                  <Text style={styles.buttonText}>Reset My Password</Text>
                )}
              </TouchableOpacity>
            </View>
          );
        }}
      </Formik>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    width: '90%',
    alignSelf: 'center',
    marginVertical: 15,
  },
  title: {
    alignSelf: 'center',
    color: '#000000',
    fontSize: 20,
    fontFamily: 'TitilliumWeb-Bold',
    marginBottom: 10,
  },
  description: {
    alignSelf: 'center',
    color: '#666666',
    fontSize: 16,
    fontFamily: 'TitilliumWeb-Light',
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
    marginTop: 10,
    backgroundColor: '#EA1D24',
    alignSelf: 'center',
    width: '80%',
    padding: 14,
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
    color: '#FFFFFF',
    textAlign: 'center',
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

export default ForgotPasswordForm;
