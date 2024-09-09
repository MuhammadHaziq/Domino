import React, {useState, useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ActivityIndicator,
  Platform,
  Keyboard,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import Image from 'react-native-scalable-image';
import {Formik} from 'formik';
import * as yup from 'yup';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Context as AuthContext} from '../context/AuthContext';
import {trackPromise, usePromiseTracker} from 'react-promise-tracker';

const phoneRegExp = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;

const registerSchema = yup.object().shape({
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
  email: yup
    .string()
    .required()
    .email()
    .label('Email'),
  playerName: yup
    .string()
    .required()
    .label('Player Name'),
  tshirt: yup
    .string()
    .required()
    .label('T-Shirt'),
  wallet: yup
    .string()
    .required()
    .label('Wallet'),
  password: yup
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
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .label('Confirm Password'),
  terms: yup
    .mixed()
    .oneOf([true], 'You must agree to our terms and conditions'),
});

const RegisterForm = () => {
  const {state, createAccount, clearErrorMessage} = useContext(AuthContext);
  const {promiseInProgress} = usePromiseTracker();

  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [passwordShowIcon, setPasswordShowIcon] = useState('ios-eye');
  const [confirmPasswordVisibility, setConfirmPasswordVisibility] = useState(
    true,
  );
  const [confirmPasswordShowIcon, setConfirmPasswordShowIcon] = useState(
    'ios-eye',
  );

  const [emailContact, setEmailContact] = useState(false);
  const [phoneContact, setPhoneContact] = useState(false);

  const [agreeTerms, setAgreeTerms] = useState(false);
  const [termsVisible, setTermsVisible] = useState(false);

  const [tshirtPickerVisible, setTshirtPickerVisible] = useState(false);
  const [walletPickerVisible, setWalletPickerVisible] = useState(false);
  const [selectedTshirt, setSelectedTshirt] = useState(null);
  const [selectedWallet, setSelectedWallet] = useState(null);

  const tshirtPickerValues = [
    {
      title: 'Large',
      value: 'large',
    },
    {
      title: 'X-Large',
      value: 'x-large',
    },
    {
      title: '2X-Large',
      value: '2x-large',
    },
    {
      title: '3X-Large',
      value: '3x-large',
    },
  ];

  const walletPickerValues = [
    {
      title: 'Cardholder Light',
      value: 'light',
    },
    {
      title: 'Cardholder Dark',
      value: 'dark',
    },
  ];

  const handlePasswordVisibility = () => {
    setPasswordShowIcon(
      passwordShowIcon === 'ios-eye' ? 'ios-eye-off' : 'ios-eye',
    );
    setPasswordVisibility(!passwordVisibility);
  };

  const handleConfirmPasswordVisibility = () => {
    setConfirmPasswordShowIcon(
      confirmPasswordShowIcon === 'ios-eye' ? 'ios-eye-off' : 'ios-eye',
    );
    setConfirmPasswordVisibility(!confirmPasswordVisibility);
  };

  const handleEmailContact = () => {
    setEmailContact(!emailContact);
  };

  const handlePhoneContact = () => {
    setPhoneContact(!phoneContact);
  };

  const handleAgreeTerms = () => {
    setAgreeTerms(!agreeTerms);
  };

  const toggleTerms = () => setTermsVisible(!termsVisible);

  const toggleTshirtPicker = () => setTshirtPickerVisible(!tshirtPickerVisible);
  const toggleWalletPicker = () => setWalletPickerVisible(!walletPickerVisible);

  const setTshirtPickerValue = newValue => {
    setSelectedTshirt(newValue);
    toggleTshirtPicker();
  };
  const setWalletPickerValue = newValue => {
    setSelectedWallet(newValue);
    toggleWalletPicker();
  };

  return (
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        playerName: '',
        tshirt: '',
        wallet: '',
        password: '',
        confirmPassword: '',
        emailContactAllowed: false,
        phoneContactAllowed: false,
        terms: false,
      }}
      validationSchema={registerSchema}
      onReset={clearErrorMessage}
      onSubmit={(values, actions) => {
        Keyboard.dismiss();
        trackPromise(
          createAccount({
            first_name: values.firstName,
            last_name: values.lastName,
            phone: values.phone.replace(/[^0-9]/g, ''),
            email: values.email,
            player_name: values.playerName,
            tshirt: values.tshirt,
            wallet: values.wallet,
            password: values.password,
            ok_with_email: values.emailContactAllowed ? 1 : 0,
            ok_with_text_message: values.phoneContactAllowed ? 1 : 0,
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
                placeholder="Email"
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
            <View
              style={{
                ...styles.inputContainer,
                paddingBottom: Platform.OS === 'android' ? 10 : 3,
                marginTop: Platform.OS === 'android' ? 20 : 10,
              }}>
              <View style={styles.iconContainer}>
                <Ionicons
                  style={styles.icon}
                  name="ios-shirt"
                  size={28}
                  color="#000000"
                />
              </View>
              <TouchableOpacity
                onPress={toggleTshirtPicker}
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                {selectedTshirt ? (
                  <Text
                    style={{
                      ...styles.input,
                      marginLeft: Platform.OS === 'android' ? 10 : 5,
                    }}>
                    {selectedTshirt}
                  </Text>
                ) : (
                  <Text style={styles.pickerPlaceholder}>Choose a T-Shirt</Text>
                )}
                <Ionicons
                  style={styles.icon}
                  name="md-arrow-dropdown"
                  size={28}
                  color="#000000"
                />
              </TouchableOpacity>
            </View>
            {props.touched.tshirt && props.errors.tshirt && (
              <Text style={styles.error}>{props.errors.tshirt}</Text>
            )}
            <View
              style={{
                ...styles.inputContainer,
                paddingBottom: Platform.OS === 'android' ? 10 : 3,
                marginTop: Platform.OS === 'android' ? 20 : 10,
              }}>
              <View style={styles.iconContainer}>
                <Image
                  width={22}
                  source={require('../../assets/images/wallet-icon.png')}
                />
              </View>
              <TouchableOpacity
                onPress={toggleWalletPicker}
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                {selectedWallet ? (
                  <Text
                    style={{
                      ...styles.input,
                      marginLeft: Platform.OS === 'android' ? 10 : 5,
                    }}>
                    {selectedWallet}
                  </Text>
                ) : (
                  <Text style={styles.pickerPlaceholder}>Choose a Wallet</Text>
                )}
                <Ionicons
                  style={styles.icon}
                  name="md-arrow-dropdown"
                  size={28}
                  color="#000000"
                />
              </TouchableOpacity>
            </View>
            {props.touched.wallet && props.errors.wallet && (
              <Text style={styles.error}>{props.errors.wallet}</Text>
            )}
            <Text style={{...styles.sectionText, marginTop: 30}}>
              Select Password:
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
                value={props.values.password}
                style={styles.input}
                onChangeText={props.handleChange('password')}
                onBlur={() => props.setFieldTouched('password')}
                placeholder="Password"
                placeholderTextColor="#666666"
                textContentType="password"
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={passwordVisibility}
              />
              <TouchableOpacity onPress={handlePasswordVisibility}>
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
                placeholder="Confirm Password"
                placeholderTextColor="#666666"
                textContentType="password"
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={confirmPasswordVisibility}
              />
              <TouchableOpacity onPress={handleConfirmPasswordVisibility}>
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
            {state.errorMessage ? (
              <Text style={styles.serverError}>
                {typeof state.errorMessage !== 'object'
                  ? state.errorMessage
                  : null}
              </Text>
            ) : null}
            <View style={{flexDirection: 'row', marginTop: 13}}>
              <TouchableWithoutFeedback
                onPress={() => {
                  props.setFieldValue(
                    'emailContactAllowed',
                    !props.values.emailContactAllowed,
                  );
                  handleEmailContact();
                }}>
                <View style={styles.contactContainer}>
                  <MaterialIcons
                    style={styles.icon}
                    name={
                      emailContact ? 'check-box' : 'check-box-outline-blank'
                    }
                    size={24}
                    color={emailContact ? '#264d00' : '#333333'}
                  />
                  <Text>
                    {emailContact
                      ? 'Permission to contact by email'
                      : 'May we contact you by email?'}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
            <View style={{flexDirection: 'row'}}>
              <TouchableWithoutFeedback
                onPress={() => {
                  props.setFieldValue(
                    'phoneContactAllowed',
                    !props.values.phoneContactAllowed,
                  );
                  handlePhoneContact();
                }}>
                <View style={styles.contactContainer}>
                  <MaterialIcons
                    style={styles.icon}
                    name={
                      phoneContact ? 'check-box' : 'check-box-outline-blank'
                    }
                    size={24}
                    color={phoneContact ? '#264d00' : '#333333'}
                  />
                  <Text>
                    {phoneContact
                      ? 'Permission to contact by text message'
                      : 'May we contact you by text message?'}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
            <View style={{flexDirection: 'row'}}>
              <TouchableWithoutFeedback
                onPress={() => {
                  props.setFieldValue('terms', !props.values.terms);
                  handleAgreeTerms();
                }}>
                <View style={styles.termsContainer}>
                  <MaterialIcons
                    style={styles.icon}
                    name={agreeTerms ? 'check-box' : 'check-box-outline-blank'}
                    size={24}
                    color={agreeTerms ? '#264d00' : '#333333'}
                  />
                  <Text>
                    {agreeTerms ? 'You agreed to our ' : 'Agree to our '}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableOpacity
                style={styles.termsContainer}
                onPress={toggleTerms}>
                <Text style={styles.termsLink}>Terms and Conditions</Text>
              </TouchableOpacity>
            </View>
            {props.touched.terms && props.errors.terms && (
              <Text style={{...styles.error, marginLeft: 15}}>
                {props.errors.terms}
              </Text>
            )}
            <TouchableOpacity
              // disabled={props.isSubmitting || !props.isValid}
              style={styles.button}
              onPress={props.handleSubmit}>
              {promiseInProgress ? (
                <ActivityIndicator size="large" color="#000000" />
              ) : (
                <Text style={styles.buttonText}>REGISTER</Text>
              )}
            </TouchableOpacity>
            <Text style={styles.disclaimer}>
              Payment required to be eligible for event registration
            </Text>

            <Modal
              visible={termsVisible}
              animationType={'fade'}
              transparent={true}
              onRequestClose={() => toggleTerms()}>
              <TouchableWithoutFeedback onPress={toggleTerms}>
                <View style={styles.modalOverlay} />
              </TouchableWithoutFeedback>

              <View style={styles.termsModal}>
                <Text style={styles.termsTitle}>Terms and Conditions</Text>
                <ScrollView>
                  <Text style={styles.termsContent}>
                    The undersigned player hereby agrees as follows:{'\n\n'}
                    <Text style={styles.termsBold}>2Po Inc. Terms.</Text>
                    {'\n'}
                    Membership gets you into all Challenges Nation-Wide.
                    Membership Cards are NON-TRANSFERABLE You will be required
                    to provide your own Transportation to and from each
                    Challenge. Refund Policy is 100% Money back Guarantee before
                    the 1st Challenge of the (D.C.S.) season. You MUST surrender
                    your Membership Card to receive your Refund.{'\n\n'}
                    <Text style={styles.termsBold}>
                      Name, Voice & Likeness Release
                    </Text>
                    {'\n'}Player acknowledges that 2Po Inc. on its own and
                    through authorized third party designees, will be
                    photographing, videotaping, filming and creating other audio
                    and/or visual works of or about “D.C.S. / N.D.T. / W.D.C.”
                    before, during, and after “D.C.S. / N.D.T. / W.D.C.” and
                    that 2Po Inc. and its designees will be using and exploiting
                    the Works in:{'\n\n'}
                    (a) films, television shows, programs and other audio and/or
                    visual programs about “D.C.S. / N/D.T. / W.D.C.” or its host
                    sites;{'\n\n'}
                    (b) merchandise and other materials of any kind or nature
                    bearing the “D.C.S. / N.D.T. / W.D.C.” or 2Po Inc. logo; and
                    {'\n\n'}
                    (c) all types of advertising and promotion for 2Po Inc.
                    “D.C.S. / N.D.T. / W.D.C.” circuit and tournaments,
                    Programs, Merchandise, and host sites, including without
                    limitation print, direct mail, e-mail, Internet, indoor and
                    outdoor signage, radio, and television advertisements.
                    {'\n\n'}
                    Player consents to being photographed, filmed, and taped for
                    “D.C.S. / N.D.T. / W.D.C.” (Including without limitation
                    behind-the-scenes photograph, filmed and audiotape
                    interviews with player).{'\n\n'}Player further consents to
                    2Po Inc. and its designees’ worldwide use and exploitation
                    of Player’s name, voice, likeness, image, caricatures,
                    nicknames, signature, mannerisms, traits, speech, phrases,
                    and other unique personal characteristics as they appear in
                    “D.C.S. / N.D.T. / W.D.C.” and as they appear in any
                    photographs, films or other audio and/or visual works of
                    past or future “D.C.S. / N.D.T. / W.D.C.”.{'\n\n'}Player
                    agrees that he/she will make no claim of any kind against
                    2Po Inc. and its designees as a result of any of the uses
                    described above, and Player irrevocably and unconditionally
                    waives and releases 2Po Inc. its subsidiaries, affiliates,
                    and designees, and each of their respective officers,
                    directors, agents, servants, employees, representatives,
                    insurers, licensees, designees, successors, in interest and
                    invitees, from any and all claims arising out of such use,
                    including, without limitation, any claims for invasion of
                    privacy, infringement of Player’ rights of publicity, false
                    endorsement, defamation and any other personal and/or
                    property rights of any kind or nature. {'\n\n'}
                    <Text style={styles.termsBold}>
                      Ownership of the Performance
                    </Text>
                    {'\n'}
                    Player’s appearance in “D.C.S. / N.D.T. / W.D.C.” hereby
                    grants and assigns to 2Po Inc. all worldwide rights of every
                    kind and nature in and to the Appearance and authorizes the
                    embodiment of Player’s Appearance and Player’s Likeness in
                    the Programs, Merchandise and Promotions. 2Po Inc. shall
                    have the right, on its own and through authorized third
                    parties, to change, alter, revise, edit, add to or subtract
                    from the Appearance in 2Po Inc. sole discretion, as well as
                    the right to combine the Appearance with material furnished
                    or created by others, and to use the Appearance in the
                    Programs, Merchandise and Promotions without any additional
                    approval or review by Player. Player hereby waives any and
                    all “moral rights” the Player may own related to “D.C.S. /
                    N.D.T. / W.D.C.” or the use or exploitation thereof as
                    authorized herein.
                  </Text>
                </ScrollView>
                <TouchableOpacity
                  onPress={() => toggleTerms()}
                  style={styles.termsOption}>
                  <Text style={styles.pickerCancelText}>Close</Text>
                </TouchableOpacity>
              </View>
            </Modal>

            <Modal
              visible={tshirtPickerVisible}
              animationType={'fade'}
              transparent={true}
              onRequestClose={() => toggleTshirtPicker()}>
              <TouchableWithoutFeedback onPress={toggleTshirtPicker}>
                <View style={styles.modalOverlay} />
              </TouchableWithoutFeedback>

              <View style={styles.pickerModal}>
                <Text style={styles.pickerTitle}>Select a T-Shirt</Text>
                {tshirtPickerValues.map((value, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        setTshirtPickerValue(value.title);
                        props.setFieldValue('tshirt', value.title, false);
                      }}
                      style={styles.pickerOption}>
                      <Text style={styles.pickerOptionText}>{value.title}</Text>
                    </TouchableOpacity>
                  );
                })}
                <TouchableOpacity
                  onPress={toggleTshirtPicker}
                  style={styles.pickerOption}>
                  <Text style={styles.pickerCancelText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </Modal>

            <Modal
              visible={walletPickerVisible}
              animationType={'fade'}
              transparent={true}
              onRequestClose={() => toggleWalletPicker()}>
              <TouchableWithoutFeedback onPress={toggleWalletPicker}>
                <View style={styles.modalOverlay} />
              </TouchableWithoutFeedback>

              <View style={styles.pickerModal}>
                <Text style={styles.pickerTitle}>Select a Wallet</Text>
                {walletPickerValues.map((value, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        setWalletPickerValue(value.title);
                        props.setFieldValue('wallet', value.title, false);
                      }}
                      style={styles.pickerOption}>
                      <Text style={styles.pickerOptionText}>{value.title}</Text>
                    </TouchableOpacity>
                  );
                })}
                <TouchableOpacity
                  onPress={toggleWalletPicker}
                  style={styles.pickerOption}>
                  <Text style={styles.pickerCancelText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </Modal>
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
    paddingBottom: 3,
    alignItems: 'center',
    marginTop: 10,
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
    width: '90%',
    backgroundColor: '#fff706',
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
    color: '#000000',
    textAlign: 'center',
    fontFamily: 'TitilliumWeb-Bold',
    fontSize: 19,
  },
  disclaimer: {
    marginTop: 10,
    textAlign: 'center',
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
  pickerModal: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 40,
    paddingVertical: 20,
    marginTop: 200,
    alignSelf: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.44,
    shadowRadius: 2.62,
    elevation: 4,
    borderRadius: 5,
  },
  pickerTitle: {
    color: '#000000',
    fontSize: 22,
    fontFamily: 'TitilliumWeb-Bold',
    marginBottom: 10,
  },
  pickerOption: {
    paddingVertical: 4,
  },
  pickerOptionText: {
    color: '#000000',
    fontSize: 20,
    fontFamily: 'TitilliumWeb-Regular',
  },
  pickerCancelText: {
    color: '#999999',
    fontSize: 20,
    fontFamily: 'TitilliumWeb-Regular',
    marginTop: 10,
  },
  pickerPlaceholder: {
    color: '#666666',
    marginLeft: Platform.OS === 'android' ? 10 : 5,
    fontSize: 18,
    fontFamily: 'TitilliumWeb-Regular',
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  sectionText: {
    color: '#000000',
    fontSize: 20,
    fontFamily: 'TitilliumWeb-Regular',
    textDecorationLine: 'underline',
  },
  contactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 8,
    marginLeft: 3,
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 20,
    marginLeft: 3,
  },
  termsLink: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  termsModal: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 18,
    paddingVertical: 20,
    marginVertical: 22,
    marginHorizontal: 22,
    alignSelf: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.44,
    shadowRadius: 2.62,
    elevation: 4,
    borderRadius: 5,
  },
  termsTitle: {
    fontSize: 20,
    fontFamily: 'TitilliumWeb-SemiBold',
    marginBottom: 5,
  },
  termsContent: {
    fontSize: 16,
    fontFamily: 'TitilliumWeb-Regular',
  },
  termsBold: {
    fontSize: 16,
    fontFamily: 'TitilliumWeb-SemiBold',
  },
});

export default RegisterForm;
