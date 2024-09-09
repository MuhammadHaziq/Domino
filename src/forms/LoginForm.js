import React, {useState, useContext, useEffect} from 'react';
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
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Context as AuthContext} from '../context/AuthContext';
import {trackPromise, usePromiseTracker} from 'react-promise-tracker';

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .required()
    .email()
    .label('Email'),
  password: yup
    .string()
    .required()
    .label('Password'),
});

const LoginForm = ({visible}) => {
  const {state, login, clearErrorMessage} = useContext(AuthContext);
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [passwordShowIcon, setPasswordShowIcon] = useState('ios-eye');
  const {promiseInProgress} = usePromiseTracker({area: 'login-button'});

  useEffect(() => {
    state.errorMessage = '';
  }, [visible]);

  handlePasswordVisibility = () => {
    setPasswordShowIcon(
      passwordShowIcon === 'ios-eye' ? 'ios-eye-off' : 'ios-eye',
    );
    setPasswordVisibility(!passwordVisibility);
  };

  return (
    <Formik
      initialValues={{email: '', password: ''}}
      validationSchema={loginSchema}
      onReset={clearErrorMessage}
      onSubmit={(values, actions) => {
        Keyboard.dismiss();
        trackPromise(
          login({username: values.email, password: values.password}),
          'login-button',
        );
      }}>
      {props => {
        return (
          <View style={styles.formContainer}>
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
            <View style={styles.inputContainer}>
              <View style={styles.iconContainer}>
                <Ionicons
                  style={styles.icon}
                  name="ios-lock"
                  size={28}
                  color="#000000"
                />
              </View>
              <TextInput
                value={props.values.password}
                style={styles.input}
                onChangeText={props.handleChange('password')}
                onBlur={() => props.setFieldTouched('password')}
                onFocus={clearErrorMessage}
                placeholder="Password"
                placeholderTextColor="#666666"
                textContentType="password"
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={passwordVisibility}
              />
              <TouchableOpacity onPress={this.handlePasswordVisibility}>
                <Ionicons
                  style={styles.icon}
                  name={passwordShowIcon}
                  size={28}
                  color="#666666"
                />
              </TouchableOpacity>
            </View>
            {props.touched.password && props.errors.password && (
              <Text style={styles.error}>{props.errors.password}</Text>
            )}
            {state.errorMessage.login ? (
              <Text style={styles.serverError}>{state.errorMessage.login}</Text>
            ) : null}
            <TouchableOpacity
              // disabled={props.isSubmitting || !props.isValid}
              style={styles.button}
              onPress={props.handleSubmit}>
              {promiseInProgress ? (
                <ActivityIndicator size="large" color="#FFFFFF" />
              ) : (
                <Text style={styles.buttonText}>Log In</Text>
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

export default LoginForm;
