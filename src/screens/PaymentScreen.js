import React, {useContext} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import BackHeader from '../components/BackHeader';
import Image from 'react-native-scalable-image';
import PaymentForm from '../forms/PaymentForm';
import Hide from 'react-native-hide-with-keyboard';
import {Context as AuthContext} from '../context/AuthContext';

const PaymentScreen = ({navigation}) => {
  const {state} = useContext(AuthContext);
  const screenTitle = navigation.getParam('screenTitle', null);
  const backScreen = navigation.getParam('backScreen', null);

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        stickyHeaderIndices={[0]}
        bounces={false}>
        <BackHeader label={screenTitle} backScreen={backScreen || 'Account'} />
        <Hide>
          <View style={styles.logo}>
            <Image
              width={Dimensions.get('window').width * 0.6}
              source={require('../../assets/images/logo.png')}
            />
          </View>
        </Hide>
        <View style={{flex: 1}} behavior="padding" enabled>
          <Text style={styles.title}>$50 ANNUAL MEMBERSHIP</Text>
          <Text style={styles.description}>
            Membership gets you into all Challenges Nation-Wide.
          </Text>
          <View style={styles.cardContainer}>
            <Image
              style={styles.cardImage}
              width={Dimensions.get('window').width * 0.08}
              source={require('../../assets/images/visa.png')}
            />
            <Image
              style={styles.cardImage}
              width={Dimensions.get('window').width * 0.08}
              source={require('../../assets/images/amex.png')}
            />
            <Image
              style={styles.cardImage}
              width={Dimensions.get('window').width * 0.08}
              source={require('../../assets/images/mastercard.png')}
            />
            <Image
              style={styles.cardImage}
              width={Dimensions.get('window').width * 0.08}
              source={require('../../assets/images/discover.png')}
            />
            <Image
              style={styles.cardImage}
              width={Dimensions.get('window').width * 0.08}
              source={require('../../assets/images/jcb.png')}
            />
            <Image
              style={styles.cardImage}
              width={Dimensions.get('window').width * 0.08}
              source={require('../../assets/images/diners.png')}
            />
          </View>
          <PaymentForm />
          <Text style={styles.terms}>
            Membership Cards are NON-TRANSFERABLE.
          </Text>
          <Text style={styles.terms}>
            You will be required to provide your own Transportation to and from
            each Challenge.
          </Text>
          <Text style={styles.terms}>
            Refund Policy is{' '}
            <Text style={styles.guarantee}>100% Money back Guarantee</Text>{' '}
            before the 1st Challenge of the (D.C.S.) season. You MUST surrender
            your Membership Card to receive your refund.
          </Text>
        </View>
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
  description: {
    alignSelf: 'center',
  },
  terms: {
    marginTop: 10,
    paddingHorizontal: 30,
  },
  guarantee: {
    fontWeight: 'bold',
  },
  buttonContainer: {
    margin: 25,
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  cardImage: {
    marginHorizontal: 2,
  },
});

export default PaymentScreen;
