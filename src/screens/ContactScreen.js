import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Linking,
  SafeAreaView,
} from 'react-native';
import Header from '../components/Header';
import SubHeader from '../components/SubHeader';
import Footer from '../components/Footer';
import ContactButton from '../components/ContactButton';
import callNumber from '../helpers/callNumber';
import {NavigationEvents} from 'react-navigation';

const ContactScreen = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{backgroundColor: '#FFFFFF'}}>
        <Header />
        <SubHeader label="CONTACT US" backArrow={() => navigation.goBack()} />
      </View>
      <ScrollView
        bounces={false}
        contentContainerStyle={{flexGrow: 1}}
        style={{flexGrow: 1}}>
        <View style={{flex: 1, backgroundColor: '#FFFFFF'}}>
          <ContactButton
            icon="ios-globe"
            title="WEBSITE"
            subTitle="TAP TO VISIT OUR WEBSITE"
            destination={() => {
              Linking.openURL('http://dcschallenge.com/');
            }}
          />
          <View style={styles.divider}></View>
          <ContactButton
            icon="logo-instagram"
            title="INSTAGRAM"
            subTitle="FOLLOW US ON INSTAGRAM"
            destination={() => {
              Linking.openURL('https://www.instagram.com/dcseries1/');
            }}
          />
          <View style={styles.divider}></View>
          <ContactButton
            icon="logo-facebook"
            title="FACEBOOK"
            subTitle="LIKE US ON FACEBOOK"
            destination={() => {
              Linking.openURL('https://www.facebook.com/dcseries1/');
            }}
          />
          <View style={styles.divider}></View>
          <ContactButton
            icon="logo-twitter"
            title="TWITTER"
            subTitle="FOLLOW US ON TWITTER"
            destination={() => {
              Linking.openURL('https://twitter.com/dcseries1');
            }}
          />
          <View style={styles.divider}></View>
          <ContactButton
            icon="md-phone-portrait"
            title="CALL"
            subTitle="TAP TO CALL US"
            destination={() => callNumber(7027670841)}
          />
          <View style={styles.divider}></View>
          <ContactButton
            icon="ios-mail"
            title="EMAIL"
            subTitle="TAP TO SEND US AN EMAIL"
            destination={() => {
              Linking.openURL('mailto:dcseries1@yahoo.com');
            }}
          />
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
  divider: {
    backgroundColor: '#5c5c5c',
    height: 1,
    width: '90%',
    alignSelf: 'center',
  },
});

export default ContactScreen;
