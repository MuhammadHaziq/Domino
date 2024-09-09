import React, {useState, useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Keyboard,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {useFocusEffect} from 'react-navigation-hooks';
import {Formik} from 'formik';
import * as yup from 'yup';
import Image from 'react-native-scalable-image';
import {Context as AuthContext} from '../context/AuthContext';
import {trackPromise, usePromiseTracker} from 'react-promise-tracker';
import {TextInputMask} from 'react-native-masked-text';

let valid = require('card-validator');

const loginSchema = yup.object().shape({
  card: yup
    .string()
    .required('Card Number Required')
    .label('Card Number')
    .test(
      'test-number',
      'Credit Card number is invalid',
      value => valid.number(value).isValid,
    ),

  expiration: yup
    .string()
    .required('Exp. Required')
    .label('Exp.')
    .test(
      'test-number',
      'Exp. invalid',
      value => valid.expirationDate(value).isValid,
    ),
  cvv: yup
    .string()
    .required('CVV Required')
    .label('CVV')
    .min(3, '3 Numbers Min.'),
  // .test('test-number', 'CVV invalid', value => valid.cvv(value).isValid),
});

const PaymentForm = () => {
  const {state, submitPayment, clearErrorMessage, verifyStatus} = useContext(
    AuthContext,
  );
  const {promiseInProgress} = usePromiseTracker({area: 'payment-button'});
  const [cardType, setCardType] = useState('visa-or-mastercard');

  useFocusEffect(
    React.useCallback(() => {
      verifyStatus();
    }, []),
  );

  const CardType = val => {
    const number = val[Object.keys(val)[0]];
    const card = valid.number(number);
    let icon = require('../../assets/images/cc-icon.png');
    if (number && typeof card === 'object' && card.card !== null) {
      const type = card.card.type;
      switch (type) {
        case 'visa':
          icon = require('../../assets/images/visa.png');
          setCardType('visa-or-mastercard');
          break;
        case 'mastercard':
          icon = require('../../assets/images/mastercard.png');
          setCardType('visa-or-mastercard');
          break;
        case 'diners-club':
          icon = require('../../assets/images/diners.png');
          setCardType('diners');
          break;
        case 'jcb':
          icon = require('../../assets/images/jcb.png');
          setCardType('visa-or-mastercard');
          break;
        case 'discover':
          icon = require('../../assets/images/discover.png');
          setCardType('visa-or-mastercard');
          break;
        case 'american-express':
          icon = require('../../assets/images/amex.png');
          setCardType('amex');
          break;
        default:
          icon = require('../../assets/images/cc-icon.png');
          setCardType('visa-or-mastercard');
          break;
      }
      return <Image style={styles.cardImage} width={26} source={icon} />;
    }
    return <Image style={styles.cardImage} width={26} source={icon} />;
  };

  return (
    <Formik
      initialValues={{card: '', expiration: '', cvv: ''}}
      validationSchema={loginSchema}
      onReset={clearErrorMessage}
      onSubmit={(values, actions) => {
        Keyboard.dismiss();
        trackPromise(
          submitPayment({
            cardNumber: values.card,
            cardExpiration: values.expiration,
            cardCvv: values.cvv,
          }),
          'payment-button',
        );
      }}>
      {props => {
        return (
          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <View style={styles.iconContainer}>
                <CardType number={props.values.card} />
              </View>
              <TextInputMask
                value={props.values.card}
                type={'credit-card'}
                options={{
                  obfuscated: false,
                  issuer: cardType,
                }}
                style={styles.input}
                onChangeText={props.handleChange('card')}
                onBlur={() => props.setFieldTouched('card')}
                onFocus={clearErrorMessage}
                placeholder="Card Number"
                placeholderTextColor="#666666"
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="number-pad"
                autoCompleteType="cc-number"
                textContentType="creditCardNumber"
              />
            </View>
            {props.touched.card && props.errors.card && (
              <Text style={styles.error}>{props.errors.card}</Text>
            )}
            <View style={styles.cardDetailsContainer}>
              <View style={{width: '45%'}}>
                <View style={styles.inputContainer}>
                  <View style={styles.iconContainer}>
                    <Text style={styles.label}>EXP</Text>
                  </View>
                  <TextInput
                    value={props.values.expiration}
                    style={styles.input}
                    onChangeText={props.handleChange('expiration')}
                    onBlur={() => props.setFieldTouched('expiration')}
                    onFocus={clearErrorMessage}
                    placeholder="XX/XX"
                    placeholderTextColor="#666666"
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType={
                      Platform.OS === 'ios'
                        ? 'numbers-and-punctuation'
                        : 'default'
                    }
                    autoCompleteType="cc-exp"
                    maxLength={7}
                  />
                </View>
                {props.touched.expiration && props.errors.expiration && (
                  <Text style={styles.error}>{props.errors.expiration}</Text>
                )}
              </View>
              <View style={{width: '45%'}}>
                <View style={styles.inputContainer}>
                  <View style={styles.iconContainer}>
                    <View style={styles.iconContainer}>
                      <Text style={styles.label}>CVV</Text>
                    </View>
                  </View>
                  <TextInput
                    value={props.values.cvv}
                    style={styles.input}
                    onChangeText={props.handleChange('cvv')}
                    onBlur={() => props.setFieldTouched('cvv')}
                    onFocus={clearErrorMessage}
                    placeholder="XXX"
                    placeholderTextColor="#666666"
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="number-pad"
                    autoCompleteType="cc-csc"
                    maxLength={4}
                  />
                </View>
                {props.touched.cvv && props.errors.cvv && (
                  <Text style={styles.error}>{props.errors.cvv}</Text>
                )}
              </View>
            </View>
            {state.errorMessage ? (
              <Text style={styles.serverError}>{state.errorMessage}</Text>
            ) : null}
            <TouchableOpacity
              disabled={promiseInProgress}
              style={styles.button}
              onPress={props.handleSubmit}>
              {promiseInProgress ? (
                <ActivityIndicator size="large" color="#FFFFFF" />
              ) : (
                <Text style={styles.buttonText}>MAKE PAYMENT</Text>
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
    width: '70%',
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
  cardDetailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  iconContainer: {
    width: 30,
    alignItems: 'center',
  },
  label: {
    fontFamily: 'TitilliumWeb-Regular',
    fontSize: 14,
    color: '#666',
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
    width: '80%',
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

export default PaymentForm;
