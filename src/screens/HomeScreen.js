import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Linking,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Image from 'react-native-scalable-image';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

const HomeScreen = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView style={{flex: 1}} stickyHeaderIndices={[0]} bounces={false}>
        <Header />
        <View style={styles.body}>
          <Image
            width={Dimensions.get('window').width}
            source={require('../../assets/images/hero.jpg')}
          />
          <View style={styles.titleContainer}>
            <Text style={styles.welcomeText}>WELCOME TO THE</Text>
            <View style={styles.divider}></View>
            <Text style={styles.dominoText}>DOMINO CHALLENGE SERIES</Text>
          </View>
          <TouchableOpacity
            style={styles.eventButton}
            onPress={() => navigation.navigate('EventList')}>
            <Image
              width={Dimensions.get('window').width * 0.9}
              source={require('../../assets/images/btn-events.png')}
            />
          </TouchableOpacity>
          <View style={styles.buttonContainer}>
            <View style={styles.halfButton}>
              <TouchableOpacity
                style={styles.buttonContent}
                onPress={() => navigation.navigate('Contact')}>
                <FontAwesome
                  style={styles.buttonIcon}
                  name="phone"
                  size={36}
                  color="#FFFFFF"
                />
                <Text style={styles.buttonLabel}>CONTACT US</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.halfButton}>
              <TouchableOpacity
                style={styles.buttonContent}
                onPress={() => {
                  Linking.openURL('https://www.dcschallenge.com/da-shop/');
                }}>
                <Ionicons
                  style={styles.buttonIcon}
                  name="ios-shirt"
                  size={42}
                  color="#FFFFFF"
                />
                <Text style={styles.buttonLabel}>MERCHANDISE</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Footer />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  body: {
    paddingTop: 1,
  },
  titleContainer: {
    backgroundColor: '#ffd900',
    marginLeft: '5%',
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderBottomLeftRadius: 10,
    marginBottom: 20,
  },
  welcomeText: {
    color: '#606060',
    fontFamily: 'TitilliumWeb-Regular',
    fontSize: 16,
    marginBottom: 2,
  },
  divider: {
    width: '10%',
    height: 3,
    backgroundColor: '#000000',
    borderRadius: 2,
    marginVertical: 5,
  },
  dominoText: {
    color: '#000000',
    fontFamily: 'TitilliumWeb-BoldItalic',
    fontSize: 25,
  },
  eventButton: {
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.44,
    shadowRadius: 2.62,
    elevation: 4,
    borderRadius: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    alignSelf: 'center',
    marginTop: 20,
  },
  halfButton: {
    width: '48%',
    backgroundColor: '#1b191a',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.44,
    shadowRadius: 2.62,
    elevation: 4,
    flexDirection: 'column',
    alignContent: 'space-between',
    height: 100,
    borderRadius: 10,
  },
  buttonContent: {
    paddingVertical: 18,
    height: '100%',
    justifyContent: 'space-between',
  },
  buttonIcon: {
    alignSelf: 'center',
  },
  buttonLabel: {
    alignSelf: 'center',
    color: '#FFFFFF',
  },
});
export default HomeScreen;
