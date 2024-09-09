import React, {useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Context as AuthContext} from '../context/AuthContext';
import FullButton from '../components/FullButton';
import {withNavigation} from 'react-navigation';

const MemberStatus = ({status, navigation}) => {
  const {state} = useContext(AuthContext);

  const DominoNumber = () => {
    return (
      <>
        <Text>
          <Text style={styles.subHeading}>
            DOMINO NUMBER: {state.dominoNumber}
          </Text>
        </Text>
      </>
    );
  };

  const StatusDetails = () => {
    return (
      <>
        {state.dominoNumber ? <DominoNumber /> : null}
        <Text>
          <Text style={styles.subHeading}>STATUS:</Text> <StatusText />
        </Text>
        {status >= 0 ? (
          <Text>
            <Text style={styles.subHeading}>
              {status === 0 ? 'EXPIRED ON:' : 'EXPIRES ON:'}
            </Text>{' '}
            {state.memberExpire}
          </Text>
        ) : null}
      </>
    );
  };

  const PaymentButton = () => {
    if (status === 1) return null;
    return (
      <View style={{marginTop: 10}}>
        <FullButton
          destination={() =>
            navigation.navigate('Payment', {
              screenTitle:
                status === 0 ? 'RENEW MEMBERSHIP' : 'BECOME A MEMBER',
              backScreen: 'Account',
            })
          }
          bgColor="yellow"
          label={status === 0 ? 'RENEW MEMBERSHIP:' : 'BECOME A MEMBER:'}
        />
      </View>
    );
  };

  const PaymentDetails = () => {
    if (status === -1) {
      return (
        <View>
          <Text style={styles.membershipBenefits}>
            $50 Annual Membership allows you to register for all challenges
            accross the nation.
          </Text>
        </View>
      );
    }
    return (
      <View>
        <Text style={{...styles.heading, marginTop: 20}}>
          RECENT PAYMENT DETAILS
        </Text>
        <Text>
          <Text style={styles.subHeading}>PAYMENT DATE:</Text>{' '}
          {state.paymentDate}
        </Text>
        <Text>
          <Text style={styles.subHeading}>CARD USED:</Text> {state.paymentCard}
        </Text>
        <Text>
          <Text style={styles.subHeading}>TRANSACTION ID:</Text>{' '}
          {state.paymentId}
        </Text>
      </View>
    );
  };

  const StatusText = () => {
    if (status === -1) {
      return <Text style={{...styles.status, color: 'red'}}>INACTIVE</Text>;
    } else if (status === 0) {
      return <Text style={{...styles.status, color: 'red'}}>EXPIRED</Text>;
    }
    return <Text style={{...styles.status, color: 'green'}}>ACTIVE</Text>;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>MEMBERSHIP INFORMATION</Text>
      <StatusDetails />
      <PaymentButton />
      <PaymentDetails />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginVertical: 20,
    flex: 1,
  },
  heading: {
    fontFamily: 'TitilliumWeb-SemiBold',
    fontSize: 18,
    marginBottom: 2,
  },
  subHeading: {
    fontFamily: 'TitilliumWeb-SemiBold',
  },
  status: {
    fontFamily: 'TitilliumWeb-SemiBold',
  },
  membershipBenefits: {
    alignSelf: 'center',
    textAlign: 'center',
  },
});

export default withNavigation(MemberStatus);
