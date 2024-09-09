import React, {useState, useContext} from 'react';
import {
  StyleSheet,
  View,
  Text,
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

const changePasswordSchema = yup.object().shape({
  currentPassword: yup
    .string()
    .required()
    .label('Current Password'),
  newPassword: yup
    .string()
    .required()
    .matches(/^(?=.*[A-Z])/, 'Must contain at least 1 upper case character')
    .matches(/^(?=.*[a-z])/, 'Must contain at least 1 lower case character')
    .matches(/^(?=.*\d)/, 'Must contain at least 1 number')
    .matches(/^(?=.*\W)/, 'Must contain at least 1 special character')
    .min(6, 'Password must be longer than 6 characters')
    .label('Password'),
  confirmPassword: yup
    .string()
    .required()
    .oneOf([yup.ref('newPassword'), null], 'Passwords must match')
    .label('Confirm Password'),
});

const ChangePasswordScreen = () => {
  const {state, changePassword, clearErrorMessage} = useContext(AuthContext);
  const [currentPasswordVisibility, setCurrentPasswordVisibility] = useState(
    true,
  );
  const [currentPasswordShowIcon, setCurrentPasswordShowIcon] = useState(
    'ios-eye',
  );
  const [newPasswordVisibility, setNewPasswordVisibility] = useState(true);
  const [newPasswordShowIcon, setNewPasswordShowIcon] = useState('ios-eye');
  const [confirmPasswordVisibility, setConfirmPasswordVisibility] = useState(
    true,
  );
  const [confirmPasswordShowIcon, setConfirmPasswordShowIcon] = useState(
    'ios-eye',
  );

  const {promiseInProgress} = usePromiseTracker();

  handleCurrentPasswordVisibility = () => {
    setCurrentPasswordShowIcon(
      currentPasswordShowIcon === 'ios-eye' ? 'ios-eye-off' : 'ios-eye',
    );
    setCurrentPasswordVisibility(!currentPasswordVisibility);
  };
  handleNewPasswordVisibility = () => {
    setNewPasswordShowIcon(
      newPasswordShowIcon === 'ios-eye' ? 'ios-eye-off' : 'ios-eye',
    );
    setNewPasswordVisibility(!newPasswordVisibility);
  };
  handleConfirmPasswordVisibility = () => {
    setConfirmPasswordShowIcon(
      confirmPasswordShowIcon === 'ios-eye' ? 'ios-eye-off' : 'ios-eye',
    );
    setConfirmPasswordVisibility(!confirmPasswordVisibility);
  };

  return (
    <Formik
      initialValues={{
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      }}
      validationSchema={changePasswordSchema}
      onReset={clearErrorMessage}
      onSubmit={(values, actions) => {
        Keyboard.dismiss();
        trackPromise(
          changePassword({
            current_password: values.currentPassword,
            password: values.newPassword,
            password_confirmation: values.confirmPassword,
          }),
        );
      }}>
      {props => {
        return (
          <View style={styles.formContainer}>
            <Text style={styles.sectionText}>Enter Your Current Password:</Text>
            <View style={styles.inputContainer}>
              <View style={styles.iconContainer}>
                <Ionicons
                  style={styles.icon}
                  name="ios-key"
                  size={28}
                  color="#000000"
                />
              </View>
              <TextInput
                value={props.values.currentPassword}
                style={styles.input}
                onChangeText={props.handleChange('currentPassword')}
                onBlur={() => props.setFieldTouched('currentPassword')}
                onFocus={clearErrorMessage}
                placeholder="Current Password"
                placeholderTextColor="#666666"
                textContentType="password"
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={currentPasswordVisibility}
              />
              <TouchableOpacity onPress={this.handleCurrentPasswordVisibility}>
                <Ionicons
                  style={styles.icon}
                  name={currentPasswordShowIcon}
                  size={28}
                  color="#666666"
                />
              </TouchableOpacity>
            </View>
            {props.touched.currentPassword && props.errors.currentPassword && (
              <Text style={styles.error}>{props.errors.currentPassword}</Text>
            )}
            {state.errorMessage.current_password ? (
              <Text style={styles.serverError}>
                {state.errorMessage.current_password}
              </Text>
            ) : null}
            <Text style={{...styles.sectionText, marginTop: 30}}>
              Enter Your New Password:
            </Text>
            <Text>
              * Must be 6 characters long and contain at least 1 Uppercase, 1
              Lowercase, 1 Number and 1 special character
            </Text>
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
                value={props.values.newPassword}
                style={styles.input}
                onChangeText={props.handleChange('newPassword')}
                onBlur={() => props.setFieldTouched('newPassword')}
                onFocus={clearErrorMessage}
                placeholder="New Password"
                placeholderTextColor="#666666"
                textContentType="newPassword"
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={newPasswordVisibility}
              />
              <TouchableOpacity onPress={this.handleNewPasswordVisibility}>
                <Ionicons
                  style={styles.icon}
                  name={newPasswordShowIcon}
                  size={28}
                  color="#666666"
                />
              </TouchableOpacity>
            </View>
            {props.touched.newPassword && props.errors.newPassword && (
              <Text style={styles.error}>{props.errors.newPassword}</Text>
            )}
            {state.errorMessage.password ? (
              <Text style={styles.serverError}>
                {state.errorMessage.password}
              </Text>
            ) : null}
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
                value={props.values.confirmPassword}
                style={styles.input}
                onChangeText={props.handleChange('confirmPassword')}
                onBlur={() => props.setFieldTouched('confirmPassword')}
                onFocus={clearErrorMessage}
                placeholder="Confirm New Password"
                placeholderTextColor="#666666"
                textContentType="newPassword"
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={confirmPasswordVisibility}
              />
              <TouchableOpacity onPress={this.handleConfirmPasswordVisibility}>
                <Ionicons
                  style={styles.icon}
                  name={confirmPasswordShowIcon}
                  size={28}
                  color="#666666"
                />
              </TouchableOpacity>
            </View>
            {props.touched.confirmPassword && props.errors.confirmPassword && (
              <Text style={styles.error}>{props.errors.confirmPassword}</Text>
            )}
            {state.errorMessage.password_confirmation ? (
              <Text style={styles.serverError}>
                {state.errorMessage.password_confirmation}
              </Text>
            ) : (
              <Text style={styles.serverError}>
                {typeof state.errorMessage !== 'object'
                  ? state.errorMessage
                  : null}
              </Text>
            )}
            <TouchableOpacity
              // disabled={props.isSubmitting || !props.isValid}
              style={styles.button}
              onPress={props.handleSubmit}>
              {promiseInProgress ? (
                <ActivityIndicator size="large" color="#FFFFFF" />
              ) : (
                <Text style={styles.buttonText}>CHANGE PASSWORD</Text>
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
  sectionText: {
    color: '#000000',
    fontSize: 20,
    fontFamily: 'TitilliumWeb-Regular',
    textDecorationLine: 'underline',
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
    width: '70%',
    backgroundColor: '#EA1D24',
    alignSelf: 'center',
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

export default ChangePasswordScreen;
