import React, {useContext} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Dimensions,
  Text,
  TouchableOpacity,
  Linking,
} from 'react-native';
import Header from '../components/Header';
import SubHeader from '../components/SubHeader';
import Footer from '../components/Footer';
import EventRegistrationButton from '../components/EventRegistrationButton';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import events from '../data/eventData';
import Image from 'react-native-scalable-image';
import FullButton from '../components/FullButton';
import callNumber from '../helpers/callNumber';
import {Context as AuthContext} from '../context/AuthContext';

const EventDetailScreen = ({navigation}) => {
  const {state, getRegisteredEvents} = useContext(AuthContext);

  const id = navigation.getParam('id', null);
  const city = events[id]['city'];
  const eventState = events[id]['state'];
  const image = events[id]['image'];
  const nickname = events[id]['nickname'];
  const description = events[id]['description'];
  const date = events[id]['date'];
  const time = events[id]['time'];
  const location = events[id]['location'];
  const address = events[id]['address'];

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView
        style={{flexGrow: 1}}
        stickyHeaderIndices={[0]}
        bounces={false}>
        <View>
          <Header />
          <SubHeader
            backArrow={() => navigation.navigate('EventList')}
            label={city + ', ' + eventState}
          />
        </View>
        <View style={{flex: 1, backgroundColor: '#FFFFFF'}}>
          <Image
            style={styles.cityImage}
            width={Dimensions.get('window').width}
            source={image}
          />
          <View style={styles.textContainer}>
            <Text style={styles.label}>DOMINO CHALLENGE SERIES</Text>
            <View style={styles.underline}></View>
            <Text style={styles.nickname}>"{nickname} Mix-n-Mingle"</Text>
            <Text style={styles.description}>{description}</Text>
            <View style={styles.contactContainer}>
              <Text
                style={styles.url}
                onPress={() =>
                  Linking.openURL('https://www.dcschallenge.com/')
                }>
                www.dcschallenge.com
              </Text>
              <Text> | </Text>
              <Text style={styles.phone} onPress={() => callNumber(7027670841)}>
                702.767.0841
              </Text>
            </View>
            <View style={styles.details}>
              <View style={styles.iconContainer}>
                <Ionicons
                  style={styles.icon}
                  name="ios-calendar"
                  size={17}
                  color="#000000"
                />
              </View>
              <Text>{date}</Text>
            </View>
            <View style={styles.details}>
              <View style={styles.iconContainer}>
                <MaterialCommunityIcons
                  style={styles.icon}
                  name="clock"
                  size={17}
                  color="#000000"
                />
              </View>
              <Text>{time}</Text>
            </View>
            <View style={styles.details}>
              <View style={styles.iconContainer}>
                <Entypo
                  style={styles.icon}
                  name="location-pin"
                  size={22}
                  color="#000000"
                />
              </View>
              <View>
                {location ? <Text>{location}</Text> : null}
                {address ? <Text>{address}</Text> : null}
              </View>
            </View>
          </View>
          <EventRegistrationButton id={id} />
        </View>
        <Footer />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#1b191a',
  },
  cityImage: {
    marginTop: -10,
    borderBottomLeftRadius: 14,
    borderBottomRightRadius: 14,
  },
  textContainer: {
    padding: 20,
  },
  label: {
    fontFamily: 'TitilliumWeb-SemiBold',
    fontSize: 18,
  },
  underline: {
    width: 35,
    height: 3,
    backgroundColor: '#000000',
    borderRadius: 2,
    marginVertical: 3,
  },
  nickname: {
    marginVertical: 8,
    fontSize: 20,
    fontFamily: 'TitilliumWeb-BoldItalic',
    color: '#db0303',
  },
  description: {
    marginTop: 3,
    marginBottom: 8,
    fontFamily: 'TitilliumWeb-Regular',
    fontSize: 14,
    textTransform: 'uppercase',
  },
  details: {
    flexDirection: 'row',
    marginVertical: 4,
    alignItems: 'center',
  },
  contactContainer: {
    flexDirection: 'row',
    marginTop: 5,
    marginBottom: 14,
  },
  url: {
    textDecorationLine: 'underline',
    fontSize: 15,
  },
  phone: {
    fontSize: 15,
  },
  iconContainer: {
    width: 33,
    alignItems: 'center',
  },
});

export default EventDetailScreen;
