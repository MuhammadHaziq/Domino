import React, {useEffect} from 'react';
import {View, TouchableWithoutFeedback, StyleSheet} from 'react-native';
import ForgotPasswordForm from '../forms/ForgotPasswordForm';

const ForgotPasswordModal = ({navigation}) => {
  return (
    <View style={styles.modalOverlay}>
      <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <TouchableWithoutFeedback onPress={() => null}>
            <View style={styles.forgotPasswordModal}>
              <ForgotPasswordForm />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </View>

    // <View style={styles.modalOverlay}>
    //   <TouchableWithoutFeedback
    //     style={{flex: 1, backgroundColor: 'red'}}
    //     onPress={() => console.log('test')}>
    //     <View style={styles.forgotPasswordModal}>
    //       <ForgotPasswordForm />
    //     </View>
    //   </TouchableWithoutFeedback>
    // </View>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  forgotPasswordModal: {
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
  forgotPasswordTitle: {
    textAlign: 'center',
    color: '#000000',
    fontSize: 20,
    fontFamily: 'TitilliumWeb-Bold',
    marginBottom: 10,
  },
  forgotPasswordText: {
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

export default ForgotPasswordModal;
