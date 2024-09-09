import React, {useContext} from 'react';
import {
  TouchableWithoutFeedback,
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
} from 'react-native';
import {Context as AuthContext} from '../context/AuthContext';
import {trackPromise, usePromiseTracker} from 'react-promise-tracker';

const LogoutModal = ({navigation}) => {
  const {state, logout, closeLogoutModal} = useContext(AuthContext);

  const {promiseInProgress} = usePromiseTracker();

  return (
    <View style={{...styles.modalOverlay}}>
      <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <TouchableWithoutFeedback onPress={() => null}>
            <View style={styles.logoutModal}>
              <Text style={styles.logoutTitle}>LOGOUT CONFIRMATION</Text>
              <Text style={styles.logoutText}>
                ARE YOU SURE THAT YOU WANT TO LOGOUT?
              </Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={{...styles.button, backgroundColor: '#EA1D24'}}
                  onPress={() => navigation.goBack()}>
                  <Text style={styles.buttonText}>NO</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{...styles.button, backgroundColor: '#fff706'}}
                  onPress={() => trackPromise(logout())}>
                  {promiseInProgress ? (
                    <ActivityIndicator size="large" color="#000000" />
                  ) : (
                    <Text style={{...styles.buttonText, color: '#000000'}}>
                      YES
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  logoutModal: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.44,
    shadowRadius: 2.62,
    elevation: 4,
    borderRadius: 5,
    width: '80%',
  },
  logoutTitle: {
    textAlign: 'center',
    color: '#000000',
    fontSize: 20,
    fontFamily: 'TitilliumWeb-Bold',
    marginBottom: 10,
  },
  logoutText: {
    textAlign: 'center',
    color: '#666666',
    fontSize: 16,
    fontFamily: 'TitilliumWeb-Light',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  button: {
    width: '35%',
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
});

export default LogoutModal;
