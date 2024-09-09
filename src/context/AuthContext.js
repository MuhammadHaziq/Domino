import {Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import createDataContext from './createDataContext';
import dashboard from '../api/dashboard';
import NavigationService from '../../NavigationService';
import stripe from 'tipsi-stripe';
import parseCardExpiration from '../helpers/parseCardExpiration';
import axios from 'axios';
import events from '../data/eventData';

stripe.setOptions({
  publishableKey: '',
});

const stripeClient = 'domino';
const stripeAmount = 5000; // in cents. no decimal
const organizationId = {organization_id: 16};
const playerNameId = 14;
const dominoNumberId = 15;
const tshirtId = 16;
const walletId = 17;
const paymentIdId = 18;
const paymentDateId = 19;
const paymentCardId = 20;
const memberExpireId = 21;
// update event IDs in src/data/eventData.js

const authReducer = (state, action) => {
  switch (action.type) {
    case 'add_error':
      return {
        ...state,
        errorMessage: action.payload,
      };
    case 'login':
      return {
        ...state,
        token: action.payload.token,
        dominoNumber: action.payload.dominoNumber,
        email: action.payload.email,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        loggedInStatus: action.payload.loggedInStatus,
        phone: action.payload.phone,
        playerName: action.payload.playerName,
        paymentId: action.payload.paymentId,
        paymentDate: action.payload.paymentDate,
        paymentCard: action.payload.paymentCard,
        memberExpire: action.payload.memberExpire,
        errorMessage: '',
      };
    case 'logout':
      return {
        ...state,
        token: null,
        dominoNumber: null,
        email: null,
        firstName: null,
        lastName: null,
        loggedInStatus: 'guest',
        phone: null,
        playerName: null,
        paymentId: null,
        paymentDate: null,
        paymentCard: null,
        memberExpire: null,
        registeredEvents: {},
        errorMessage: '',
      };
    case 'change_password':
      return {
        ...state,
        errorMessage: '',
      };
    case 'forgot_password':
      return {
        ...state,
        errorMessage: '',
      };
    case 'get_profile':
      return {
        ...state,
        dominoNumber: action.payload.dominoNumber,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        phone: action.payload.phone,
        playerName: action.payload.playerName,
        errorMessage: '',
      };
    case 'update_profile':
      return {
        ...state,
        dominoNumber: action.payload.dominoNumber,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        phone: action.payload.phone,
        playerName: action.payload.playerName,
        errorMessage: '',
      };
    case 'submit_payment':
      return {
        ...state,
        errorMessage: '',
      };
    case 'verify_status':
      return {
        ...state,
        paymentId: action.payload.paymentId,
        paymentDate: action.payload.paymentDate,
        paymentCard: action.payload.paymentCard,
        memberExpire: action.payload.memberExpire,
        dominoNumber: action.payload.dominoNumber,
      };
    case 'get_registered_events':
      return {
        ...state,
        registeredEvents: action.payload.registeredEvents,
        errorMessage: '',
      };
    case 'register_event':
      return {
        ...state,
        registeredEvents: action.payload.registeredEvents,
        errorMessage: '',
      };
    case 'clear_error_message':
      return {
        ...state,
        errorMessage: '',
      };
    default:
      return state;
  }
};

const createAccount = (dispatch) => async ({
  first_name,
  last_name,
  phone,
  email,
  player_name,
  tshirt,
  wallet,
  password,
  ok_with_email,
  ok_with_text_message,
}) => {
  try {
    const response = await dashboard.post('', {
      request_type: 'add_user',
      first_name,
      last_name,
      phone,
      email,
      role_id: 4,
      ...organizationId,
      password,
    });
    if (response.status === 200) {
      if (response.data.status === 'error') {
        dispatch({type: 'add_error', payload: response.data.message});
      } else {
        // account created.  to add custom fields we need a token so log the user in to get one.
        const loginResponse = await dashboard.post('', {
          username: email,
          password: password,
          ...organizationId,
        });
        if (
          loginResponse.status === 200 &&
          loginResponse.data.access_token &&
          loginResponse.data.user.id
        ) {
          await AsyncStorage.setItem('token', loginResponse.data.access_token);
          const userId = loginResponse.data.user.id;

          // create custom fields object
          const custom_fields = {
            custome_fields: [
              {meta_id: playerNameId, value: player_name},
              {meta_id: tshirtId, value: tshirt},
              {meta_id: walletId, value: wallet},
            ],
          };
          // insert custom fields
          const customResponse = await dashboard.put('', {
            ok_with_text_message,
            ok_with_email,
            ...custom_fields,
          });

          if (customResponse.status === 200) {
            // account created!
            Alert.alert(
              'Thank you for registering!',
              'Your account has been created.  Please login to complete your membership and sign up for events.',
            );
            NavigationService.navigate('Login');
          } else {
            // problem inserting
            dispatch({
              type: 'add_error',
              payload: 'Connection Error.  Try again later.',
            });
          }
        } else {
          // unable to log in
          dispatch({
            type: 'add_error',
            payload: 'Connection Error.  Try again later.',
          });
        }
      }
    } else {
      let message =
        Object.values(response.data.error)[0][0] ||
        'Connection Error.  Try again later.';
      console.log(message);
      dispatch({type: 'add_error', payload: message});
    }
  } catch (error) {
    dispatch({
      type: 'add_error',
      payload: 'Connection Error.  Try again later.',
    });
    console.log('1: ' + error);
  }
};

const tryLocalLogin = (dispatch) => async () => {
  const token = await AsyncStorage.getItem('token');
  const loggedInStatus = await AsyncStorage.getItem('loggedInStatus');

  if (token && loggedInStatus) {
    const dominoNumber = await AsyncStorage.getItem('dominoNumber');
    const email = await AsyncStorage.getItem('email');
    const firstName = await AsyncStorage.getItem('firstName');
    const lastName = await AsyncStorage.getItem('lastName');
    const phone = await AsyncStorage.getItem('phone');
    const playerName = await AsyncStorage.getItem('playerName');
    const paymentId = await AsyncStorage.getItem('paymentId');
    const paymentDate = await AsyncStorage.getItem('paymentDate');
    const paymentCard = await AsyncStorage.getItem('paymentCard');
    const memberExpire = await AsyncStorage.getItem('memberExpire');

    dispatch({
      type: 'login',
      payload: {
        token: token,
        dominoNumber: dominoNumber,
        email: email,
        firstName: firstName,
        lastName: lastName,
        loggedInStatus: loggedInStatus,
        phone: phone,
        playerName: playerName,
        paymentId: paymentId,
        paymentDate: paymentDate,
        paymentCard: paymentCard,
        memberExpire: memberExpire,
      },
    });
    NavigationService.navigate('Home');
  } else {
    NavigationService.navigate('Welcome');
  }
};

const login = (dispatch) => async ({username, password}) => {
  try {
    const loginResponse = await dashboard.post('', {
      ...{username, password},
      ...organizationId,
    });

    if (loginResponse.status === 200) {
      if (loginResponse.data.access_token) {
        await AsyncStorage.setItem('token', loginResponse.data.access_token);
        await AsyncStorage.setItem(
          'refresh_token',
          loginResponse.data.refresh_token,
        );
        await AsyncStorage.setItem(
          'userId',
          loginResponse.data.user.id.toString(),
        );

        const response = await dashboard.patch('');

        if (response.status === 200) {
          const customFields = response.data.data.custome_fields.reduce(
            (acc, item) => {
              acc[item.meta_id] = item.value;
              return acc;
            },
            {},
          );

          await AsyncStorage.setItem(
            'dominoNumber',
            customFields[dominoNumberId],
          );
          await AsyncStorage.setItem('email', response.data.data.email);
          await AsyncStorage.setItem(
            'firstName',
            response.data.data.first_name,
          );
          await AsyncStorage.setItem('lastName', response.data.data.last_name);
          await AsyncStorage.setItem('loggedInStatus', 'registeredUser');
          await AsyncStorage.setItem('phone', response.data.data.phone);
          await AsyncStorage.setItem('playerName', customFields[playerNameId]);
          await AsyncStorage.setItem('paymentId', customFields[paymentIdId]);
          await AsyncStorage.setItem(
            'paymentDate',
            customFields[paymentDateId],
          );
          await AsyncStorage.setItem(
            'paymentCard',
            customFields[paymentCardId],
          );
          await AsyncStorage.setItem(
            'memberExpire',
            customFields[memberExpireId],
          );

          dispatch({
            type: 'login',
            payload: {
              token: response.data.token,
              dominoNumber: customFields[dominoNumberId],
              email: response.data.data.email,
              firstName: response.data.data.first_name,
              lastName: response.data.data.last_name,
              loggedInStatus: 'registeredUser',
              phone: response.data.data.phone,
              playerName: customFields[playerNameId],
              paymentId: customFields[paymentIdId],
              paymentDate: customFields[paymentDateId],
              paymentCard: customFields[paymentCardId],
              memberExpire: customFields[memberExpireId],
            },
          });
          NavigationService.navigate('Home');
        }
      } else {
        dispatch({
          type: 'add_error',
          payload: {login: loginResponse.data.message},
        });
      }
    } else {
      dispatch({
        type: 'add_error',
        payload: {login: loginResponse.data.message},
      });
    }
  } catch (err) {
    dispatch({
      type: 'add_error',
      payload: {login: 'Connection Error.  Try again later.'},
    });
  }
};

const logout = (dispatch) => async () => {
  try {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('refresh_token');
    await AsyncStorage.removeItem('userId');
    await AsyncStorage.removeItem('dominoNumber');
    await AsyncStorage.removeItem('email');
    await AsyncStorage.removeItem('firstName');
    await AsyncStorage.removeItem('lastName');
    await AsyncStorage.removeItem('loggedInStatus');
    await AsyncStorage.removeItem('phone');
    await AsyncStorage.removeItem('playerName');
    await AsyncStorage.removeItem('paymentId');
    await AsyncStorage.removeItem('paymentDate');
    await AsyncStorage.removeItem('paymentCard');
    await AsyncStorage.removeItem('memberExpire');

    dispatch({type: 'logout', payload: ''});

    Alert.alert('Logout Success', 'You have successfully logged out.');
    NavigationService.navigate('ResolveAuth');

    return;
  } catch (error) {
    dispatch({
      type: 'add_error',
      payload: 'Connection Error.  Try again later.',
    });
    console.log('2: ' + error);
  }
};

const getProfile = (dispatch) => async () => {
  try {
    const userId = await AsyncStorage.getItem('userId');
    const response = await dashboard.patch('');

    if (response.status === 200) {
      const customFields = response.data.data.custome_fields.reduce(
        (acc, item) => {
          acc[item.meta_id] = item.value;
          return acc;
        },
        {},
      );

      await AsyncStorage.setItem('firstName', response.data.data.first_name);
      await AsyncStorage.setItem('lastName', response.data.data.last_name);
      await AsyncStorage.setItem('phone', response.data.data.phone);
      await AsyncStorage.setItem('playerName', customFields[playerNameId]);

      dispatch({
        type: 'get_profile',
        payload: {
          firstName: response.data.data.first_name,
          lastName: response.data.data.last_name,
          phone: response.data.data.phone,
          playerName: customFields[playerNameId],
        },
      });
    } else {
      dispatch({type: 'add_error', payload: response.data.message});
    }
  } catch (error) {
    dispatch({
      type: 'add_error',
      payload: 'Connection Error.  Try again later.',
    });
    console.log('3: ' + error);
  }
};

const updateProfile = (dispatch) => async ({
  first_name,
  last_name,
  phone,
  player_name,
}) => {
  try {
    const custom_fields = {
      custome_fields: [{meta_id: playerNameId, value: player_name}],
    };
    const userId = await AsyncStorage.getItem('userId');

    const response = await dashboard.put('', {
      first_name,
      last_name,
      phone,
      ...custom_fields,
    });

    if (response.status === 200) {
      await AsyncStorage.setItem('firstName', response.data.data.first_name);
      await AsyncStorage.setItem('lastName', response.data.data.last_name);
      await AsyncStorage.setItem('phone', response.data.data.phone);
      await AsyncStorage.setItem('playerName', player_name);

      dispatch({
        type: 'update_profile',
        payload: {
          firstName: response.data.data.first_name,
          lastName: response.data.data.last_name,
          phone: response.data.data.phone,
          playerName: player_name,
        },
      });
      Alert.alert(
        'Update Success',
        'You have successfully updated your profile.',
      );
      //NavigationService.navigate("Account");
    } else {
      dispatch({type: 'add_error', payload: response.data.message});
    }
  } catch (error) {
    dispatch({
      type: 'add_error',
      payload: 'Connection Error.  Try again later.',
    });
    console.log('4: ' + error);
  }
};

const changePassword = (dispatch) => async ({
  current_password,
  password,
  password_confirmation,
}) => {
  try {
    const response = await dashboard.post('', {
      current_password,
      password,
      password_confirmation,
    });
    if (response.data.status === 'success') {
      dispatch({type: 'change_password', payload: response.data.message});
      Alert.alert(
        'Password Change Success',
        'You have successfully changed your password.',
      );
      NavigationService.navigate('Account');
    } else {
      console.log(response.data.message);
      dispatch({type: 'add_error', payload: response.data.message});
    }
  } catch (error) {
    dispatch({
      type: 'add_error',
      payload: 'Connection Error.  Try again later.',
    });
    console.log('5: ' + error);
  }
};

const forgotPassword = (dispatch) => async ({email}) => {
  try {
    const response = await dashboard.post('', {
      email,
      ...organizationId,
    });
    if (response.data.status === 'success') {
      Alert.alert(
        'Email Sent',
        'Instructions on how to change your email address have been sent to your email address.',
      );
      NavigationService.goBack();
    } else {
      dispatch({
        type: 'add_error',
        payload: response.data.message,
      });
    }
  } catch (error) {
    dispatch({
      type: 'add_error',
      payload: 'Connection Error.  Try again later.',
    });
    console.log('6: ' + error);
  }
};

const submitPayment = (dispatch) => async ({
  cardNumber,
  cardExpiration,
  cardCvv,
}) => {
  // parse month and year from date
  const exp = parseCardExpiration(cardExpiration);
  const expMonth = exp.cardMonth;
  const expYear = exp.cardYear;

  const cardParams = {
    type: 'card',
    number: cardNumber.replace(/\s/g, ''),
    expMonth: parseInt(expMonth),
    expYear: parseInt(expYear),
    cvc: cardCvv,
  };
  try {
    const getToken = await stripe.createTokenWithCard(cardParams);
    if (getToken) {
      const dominoNumber = await AsyncStorage.getItem('dominoNumber');
      const email = await AsyncStorage.getItem('email');
      const firstName = await AsyncStorage.getItem('firstName');
      const lastName = await AsyncStorage.getItem('lastName');
      const phone = await AsyncStorage.getItem('phone');
      const playerName = await AsyncStorage.getItem('playerName');
      const memberExpire = await AsyncStorage.getItem('memberExpire');

      const form = new FormData();
      form.append('amount', stripeAmount);
      form.append('payment_token', getToken.tokenId);
      form.append('client', stripeClient);
      form.append('receipt_email', email);
      form.append('cf-name', firstName + ' ' + lastName);
      form.append('cf-player_name', playerName);
      form.append('cf-domino_number', dominoNumber);
      form.append('cf-email_address', email);
      form.append('cf-phone_number', phone);

      const response = await axios.post(
        '', // removed stripe client backend URL
        form,
        {
          headers: {'Content-Type': 'multipart/form-data'},
        },
      );
      if (response.data.response === 'success') {
        const d = new Date(response.data.created * 1000);
        const created = d.toLocaleDateString();

        let newExpire;
        if (memberExpire > created) {
          // extend membership
          newExpire = new Date(memberExpire);
        } else {
          // new member or renewal just add 1 year to today.
          newExpire = new Date(created);
        }
        newExpire.setFullYear(newExpire.getFullYear() + 1);
        newExpire = newExpire.toLocaleDateString();

        const custom_fields = {
          custome_fields: [
            {meta_id: paymentIdId, value: response.data.transaction_id},
            {meta_id: paymentDateId, value: created},
            {meta_id: paymentCardId, value: response.data.details},
            {meta_id: memberExpireId, value: newExpire},
          ],
        };
        const userId = await AsyncStorage.getItem('userId');

        const dashResponse = await dashboard.put('', {
          ...custom_fields,
        });

        if (dashResponse.status === 200) {
          await AsyncStorage.setItem('paymentId', response.data.transaction_id);
          await AsyncStorage.setItem('paymentDate', created);
          await AsyncStorage.setItem('paymentCard', response.data.details);
          await AsyncStorage.setItem('memberExpire', newExpire);

          dispatch({
            type: 'submit_payment',
            payload: {
              paymentId: response.data.transaction_id,
              paymentDate: created,
              paymentCard: response.data.details,
              memberExpire: newExpire,
            },
          });
          Alert.alert(
            'Thank You',
            'We have processed your payment and are now eligible to register for any upcoming events.',
          );
          NavigationService.navigate('Account');
        }

        dispatch({
          type: 'add_error',
          payload: response.data.response_text,
        });

        console.log('Success!');
      } else {
        dispatch({
          type: 'add_error',
          payload: response.data.response_text,
        });
        console.log(response.data.response_text);
      }
    }
  } catch (error) {
    dispatch({
      type: 'add_error',
      payload: error.toString(),
    });
  }
};

const verifyStatus = (dispatch) => async () => {
  // update payment date from server prior to viewing profile or registering for event.
  const token = await AsyncStorage.getItem('token');
  const refreshToken = await AsyncStorage.getItem('refresh_token');
  // console.log(token);
  // console.log('xxxxxxxxxxx');
  // console.log(refreshToken);
  try {
    const userId = await AsyncStorage.getItem('userId');
    const response = await dashboard.patch('');
    if (response.status === 200) {
      const customFields = response.data.data.custome_fields.reduce(
        (acc, item) => {
          acc[item.meta_id] = item.value;
          return acc;
        },
        {},
      );
      await AsyncStorage.setItem('paymentId', customFields[paymentIdId]);
      await AsyncStorage.setItem('paymentDate', customFields[paymentDateId]);
      await AsyncStorage.setItem('paymentCard', customFields[paymentCardId]);
      await AsyncStorage.setItem('memberExpire', customFields[memberExpireId]);
      await AsyncStorage.setItem('dominoNumber', customFields[dominoNumberId]);

      dispatch({
        type: 'verify_status',
        payload: {
          paymentId: customFields[paymentIdId],
          paymentDate: customFields[paymentDateId],
          paymentCard: customFields[paymentCardId],
          memberExpire: customFields[memberExpireId],
          dominoNumber: customFields[dominoNumberId],
        },
      });
    } else {
      dispatch({type: 'add_error', payload: response.data.message});
    }
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: 'add_error',
      payload: 'Connection Error.  Try again later.',
    });
    console.log('7: ' + error);
  }
};

const getRegisteredEvents = (dispatch) => async () => {
  try {
    const userId = await AsyncStorage.getItem('userId');
    const response = await dashboard.patch('');

    // create object of event ID's from events data
    const eventIds = events.map((event) => event.attributeId);
    const eventsStatus = eventIds.reduce(function (obj, v) {
      obj[v] = 0;
      return obj;
    }, {});

    if (response.status === 200) {
      const customFields = response.data.data.custome_fields.reduce(
        (acc, item) => {
          acc[item.meta_id] = item.value;
          return acc;
        },
        {},
      );

      // update eventsStatus object
      for (let key in customFields) {
        if (customFields.hasOwnProperty(key)) {
          if (eventsStatus.hasOwnProperty(key))
            eventsStatus[key] = customFields[key];
        }
      }

      dispatch({
        type: 'get_registered_events',
        payload: {
          registeredEvents: eventsStatus,
        },
      });
    } else {
      dispatch({type: 'add_error', payload: response.data.message});
    }
  } catch (error) {
    dispatch({
      type: 'add_error',
      payload: 'Connection Error.  Try again later.',
    });
    console.log('8: ' + error);
  }
};

const registerEvent = (dispatch) => async ({id, activity}) => {
  let status = '';
  if (activity === 'register') status = 'Registered';

  try {
    const custom_fields = {
      custome_fields: [{meta_id: id, value: status}],
    };

    const userId = await AsyncStorage.getItem('userId');

    const response = await dashboard.put('', {
      ...custom_fields,
    });

    // create object of event ID's from events data
    const eventIds = events.map((event) => event.attributeId);
    const eventsStatus = eventIds.reduce(function (obj, v) {
      obj[v] = '';
      return obj;
    }, {});

    if (response.status === 200) {
      const updatedResponse = await dashboard.patch('');
      if (updatedResponse.status === 200) {
        const customFields = updatedResponse.data.data.custome_fields.reduce(
          (acc, item) => {
            acc[item.meta_id] = item.value;
            return acc;
          },
          {},
        );

        // update eventsStatus object
        for (let key in customFields) {
          if (customFields.hasOwnProperty(key)) {
            if (eventsStatus.hasOwnProperty(key))
              eventsStatus[key] = customFields[key];
          }
        }

        if (eventsStatus[id] === '') {
          Alert.alert(
            'Unregister Success',
            'You have successfully unregistered.',
          );
        } else {
          Alert.alert(
            'Registration Success',
            'You have successfully registered.',
          );
        }

        dispatch({
          type: 'register_event',
          payload: {
            registeredEvents: eventsStatus,
          },
        });
      }
    }
  } catch (error) {
    dispatch({
      type: 'add_error',
      payload: 'Connection Error.  Try again later.',
    });
    console.log('9: ' + error);
  }
};

const clearErrorMessage = (dispatch) => () => {
  dispatch({type: 'clear_error_message'});
};

export const {Provider, Context} = createDataContext(
  authReducer,
  {
    createAccount,
    login,
    logout,
    getProfile,
    updateProfile,
    changePassword,
    forgotPassword,
    submitPayment,
    registerEvent,
    tryLocalLogin,
    verifyStatus,
    getRegisteredEvents,
    clearErrorMessage,
  },
  {
    dominoNumber: null,
    email: null,
    errorMessage: '',
    firstName: null,
    lastName: null,
    loggedInStatus: 'guest',
    phone: null,
    playerName: null,
    token: null,
    paymentId: null,
    paymentDate: null,
    paymentCard: null,
    memberExpire: null,
    registeredEvents: {},
  },
);
