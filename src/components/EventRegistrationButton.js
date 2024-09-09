import React, {useContext} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import FullButton from '../components/FullButton';
import {withNavigation} from 'react-navigation';
import {Context as AuthContext} from '../context/AuthContext';
import events from '../data/eventData';
import memberActive from '../helpers/memberActive';
import {useFocusEffect} from 'react-navigation-hooks';

const EventRegistrationButton = ({id, navigation}) => {
  const {state, registerEvent, getRegisteredEvents} = useContext(AuthContext);

  const eventId = events[id]['attributeId'];

  const today = new Date();
  const date = new Date(events[id]['date']);
  const expireDate = new Date(state.memberExpire);
  const eligible = expireDate >= date;
  const memberStatus = memberActive(state.memberExpire);

  useFocusEffect(
    React.useCallback(() => {
      if (state.loggedInStatus !== 'guest') getRegisteredEvents();
    }, []),
  );

  // Event date has already passed
  if (date < today) {
    return (
      <View style={styles.endedBox}>
        <Text style={styles.endedLabel}>EVENT HAS ENDED</Text>
        <Text style={styles.endedText}>
          Event took place on {events[id]['date']}
        </Text>
      </View>
    );
  } else {
    // Already registered
    if (
      state.loggedInStatus !== 'guest' &&
      state.registeredEvents[eventId] !== ''
    ) {
      return (
        <View>
          <View style={styles.registeredButton}>
            <Text style={styles.registeredTitle}>
              YOU ARE REGISTERED FOR THIS EVENT.
            </Text>
            <Text style={styles.registeredSubtitle}>
              See you in {events[id]['city']}! Good luck!
            </Text>
          </View>
          <TouchableOpacity
            onPress={() =>
              registerEvent({
                id: eventId,
                activity: 'unregister',
              })
            }>
            <Text style={styles.unregisterText}>CLICK HERE TO UNREGISTER</Text>
          </TouchableOpacity>
        </View>
      );
    }
    // Guest account
    if (state.loggedInStatus === 'guest') {
      return (
        <View>
          <FullButton
            destination={() => navigation.navigate('Register')}
            bgColor="yellow"
            label="BECOME A MEMBER TO REGISTER"
          />
        </View>
      );
    } else {
      // Membership expired
      if (memberStatus === 0) {
        return (
          <View>
            <FullButton
              destination={() =>
                navigation.navigate('Payment', {
                  screenTitle: 'RENEW MEMBERSHIP',
                  backScreen: 'EventDetail',
                  id: {id},
                })
              }
              bgColor="red"
              label="RENEW YOUR MEMBERSHIP TO REGISTER"
            />
          </View>
        );
      } else if (memberStatus === 1) {
        if (eligible) {
          // Active member and event is within timeframe of membership
          return (
            <View>
              <FullButton
                destination={() =>
                  registerEvent({
                    id: eventId,
                    activity: 'register',
                  })
                }
                bgColor="yellow"
                label={'REGISTER FOR EVENT' + state.registeredEvents[eventId]}
              />
            </View>
          );
        } else {
          // Active member but event occurs after membership expires
          return (
            <View>
              <FullButton
                destination={() =>
                  navigation.navigate('Payment', {
                    screenTitle: 'EXTEND MEMBERSHIP',
                  })
                }
                bgColor="red"
                label="EXTEND MEMBERSHIP TO REGISTER."
                subLabel={'Your membership is valid thru ' + state.memberExpire}
              />
            </View>
          );
        }
        status = 'active';
      } else {
        // Has account but never became member
        return (
          <View>
            <FullButton
              destination={() =>
                navigation.navigate('Payment', {
                  screenTitle: 'BECOME A MEMBER',
                })
              }
              bgColor="red"
              label="BECOME A MEMBER TO REGISTER"
            />
          </View>
        );
      }
    }
  }
};

const styles = StyleSheet.create({
  endedBox: {
    borderRadius: 5,
    alignSelf: 'center',
    width: '90%',
    paddingVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fa0000',
  },
  endedLabel: {
    fontFamily: 'TitilliumWeb-Bold',
    fontSize: 19,
    color: '#FFF',
  },
  endedText: {
    fontFamily: 'TitilliumWeb-Light',
    fontSize: 16,
    color: '#FFF',
  },
  registeredButton: {
    borderRadius: 5,
    alignSelf: 'center',
    width: '90%',
    paddingVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff706',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.44,
    shadowRadius: 2.62,
    elevation: 4,
  },
  registeredTitle: {
    fontFamily: 'TitilliumWeb-Bold',
    fontSize: 19,
    color: '#000',
  },
  registeredSubtitle: {
    fontFamily: 'TitilliumWeb-Light',
    fontSize: 16,
    color: '#000',
  },
  unregisterText: {
    fontFamily: 'TitilliumWeb-Regular',
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
  },
});

export default withNavigation(EventRegistrationButton);
