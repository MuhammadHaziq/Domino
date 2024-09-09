import React, {useContext} from 'react';
import {useFocusEffect} from 'react-navigation-hooks';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Share,
  Linking,
} from 'react-native';
import {withNavigation} from 'react-navigation';
import Image from 'react-native-scalable-image';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Context as AuthContext} from '../context/AuthContext';

const RegisteredLinks = ({navigation}) => {
  return (
    <>
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('Account')}>
        <View style={styles.footerLinks}>
          <View style={styles.footerIconContainer}>
            <MaterialCommunityIcons
              style={styles.icon}
              name="account"
              size={22}
              color="#727272"
            />
          </View>
          <Text style={styles.footerLinkText}>MANAGE ACCOUNT</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('Profile')}>
        <View style={styles.footerLinks}>
          <View style={styles.footerIconContainer}>
            <MaterialCommunityIcons
              style={styles.icon}
              name="account-edit"
              size={22}
              color="#727272"
            />
          </View>
          <Text style={styles.footerLinkText}>EDIT PROFILE</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('Logout')}>
        <View style={styles.footerLinks}>
          <View style={styles.footerIconContainer}>
            <MaterialCommunityIcons
              style={styles.icon}
              name="logout"
              size={26}
              color="#727272"
            />
          </View>
          <Text style={styles.footerLinkText}>LOGOUT</Text>
        </View>
      </TouchableOpacity>
    </>
  );
};

const GuestLinks = ({navigation}) => {
  return (
    <>
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('Register', {backScreen: 'Home'})}>
        <View style={styles.footerLinks}>
          <View style={styles.footerIconContainer}>
            <MaterialCommunityIcons
              style={styles.icon}
              name="account"
              size={22}
              color="#727272"
            />
          </View>
          <Text style={styles.footerLinkText}>REGISTER</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('Login', {backScreen: 'Home'})}>
        <View style={styles.footerLinks}>
          <View style={styles.footerIconContainer}>
            <MaterialCommunityIcons
              style={styles.icon}
              name="account-edit"
              size={22}
              color="#727272"
            />
          </View>
          <Text style={styles.footerLinkText}>LOGIN</Text>
        </View>
      </TouchableOpacity>
    </>
  );
};

const PlayerDetails = () => {
  const {state, verifyStatus} = useContext(AuthContext);
  useFocusEffect(
    React.useCallback(() => {
      if (state.loggedInStatus !== 'guest') {
        verifyStatus();
      }
    }, [state.loggedInStatus]),
  );

  return (
    <>
      <View style={{flexDirection: 'row'}}>
        <View style={styles.headerIconContainer}>
          <Ionicons
            style={styles.icon}
            name="ios-person"
            size={22}
            color="#FFFFFF"
          />
        </View>
        <Text style={styles.playerText}>
          {state.loggedInStatus !== 'guest'
            ? state.playerName
            : 'TEST YOUR SKILLS!'}
        </Text>
      </View>
      {state.loggedInStatus === 'guest' || state.dominoNumber ? (
        <View style={{flexDirection: 'row', marginTop: 6}}>
          <View style={styles.headerIconContainer}>
            <Image
              height={20}
              source={require('../../assets/images/domino-icon-white.png')}
            />
          </View>
          <Text style={styles.dominoText}>
            {state.loggedInStatus !== 'guest'
              ? state.dominoNumber
              : 'REGISTER NOW!'}
          </Text>
        </View>
      ) : null}
    </>
  );
};

const CustomDrawer = ({navigation}) => {
  const {state} = useContext(AuthContext);

  const onShare = () => {
    Share.share({
      message:
        'Domino Challenge Series. Come out and test your skills.\n\nhttps://dcschallenge.com',
      url: 'https://dcschallenge.com',
      title: 'Domino Challenge Series',
    });
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#e0e0e0'}}>
      <View style={styles.header}>
        <Image height={50} source={require('../../assets/images/logo.png')} />
        <View style={styles.infoContainer}>
          <PlayerDetails
            playerName={state.playerName || 'TEST YOUR SKILLS!'}
            dominoNumber={state.dominoNumber || 'REGISTER NOW!'}
          />
        </View>
      </View>
      <View style={styles.body}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('Home')}>
          <View style={styles.bodyLinks}>
            <View style={styles.bodyIconContainer}>
              <Ionicons
                style={styles.icon}
                name="ios-home"
                size={22}
                color="#727272"
              />
            </View>
            <Text style={styles.bodyLinkText}>HOME</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('EventList')}>
          <View style={styles.bodyLinks}>
            <View style={styles.bodyIconContainer}>
              <MaterialIcons
                style={styles.icon}
                name="event-seat"
                size={22}
                color="#727272"
              />
            </View>
            <Text style={styles.bodyLinkText}>EVENTS</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.card}
          onPress={() => {
            Linking.openURL('https://www.dcschallenge.com/da-shop/');
          }}>
          <View style={styles.bodyLinks}>
            <View style={styles.bodyIconContainer}>
              <MaterialIcons
                style={styles.icon}
                name="store"
                size={22}
                color="#727272"
              />
            </View>
            <Text style={styles.bodyLinkText}>MERCHANDISE</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('Contact')}>
          <View style={styles.bodyLinks}>
            <View style={styles.bodyIconContainer}>
              <Ionicons
                style={styles.icon}
                name="md-contacts"
                size={22}
                color="#727272"
              />
            </View>
            <Text style={styles.bodyLinkText}>CONTACT</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card} onPress={() => onShare()}>
          <View style={styles.bodyLinks}>
            <View style={styles.bodyIconContainer}>
              <Ionicons
                style={styles.icon}
                name="md-share"
                size={22}
                color="#727272"
              />
            </View>
            <Text style={styles.bodyLinkText}>SHARE</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.divider} />
        <View style={{...styles.divider, marginTop: 2}} />
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('Rules')}>
          <View style={styles.bodyLinks}>
            <View style={styles.bodyIconContainer}>
              <MaterialCommunityIcons
                style={styles.icon}
                name="playlist-edit"
                size={24}
                color="#727272"
              />
            </View>
            <Text style={styles.bodyLinkText}>RULES</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('Appendices')}>
          <View style={styles.bodyLinks}>
            <View style={styles.bodyIconContainer}>
              <MaterialCommunityIcons
                style={styles.icon}
                name="playlist-plus"
                size={24}
                color="#727272"
              />
            </View>
            <Text style={styles.bodyLinkText}>APPENDIX I & II</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('Terms')}>
          <View style={styles.bodyLinks}>
            <View style={styles.bodyIconContainer}>
              <MaterialCommunityIcons
                style={styles.icon}
                name="book-open-page-variant"
                size={22}
                color="#727272"
              />
            </View>
            <Text style={styles.bodyLinkText}>DOMINO TERMS</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.divider} />
      <View style={styles.footer}>
        {state.loggedInStatus !== 'guest' ? (
          <RegisteredLinks navigation={navigation} />
        ) : (
          <GuestLinks navigation={navigation} />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 134,
    backgroundColor: '#1b191a',
    alignItems: 'center',
    paddingLeft: 14,
    flexDirection: 'row',
  },
  infoContainer: {
    marginLeft: 12,
  },
  headerIconContainer: {
    marginRight: 6,
  },
  playerText: {
    fontFamily: 'TitilliumWeb-Regular',
    fontSize: 16,
    color: '#FFFFFF',
  },
  dominoText: {
    fontFamily: 'TitilliumWeb-Regular',
    fontSize: 16,
    color: '#FFFFFF',
  },
  body: {
    flex: 1,
    paddingLeft: 14,
  },
  bodyLinks: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  bodyIconContainer: {
    marginRight: 10,
  },
  bodyLinkText: {
    fontFamily: 'TitilliumWeb-SemiBold',
    fontSize: 19,
    color: '#1b191a',
  },
  divider: {
    borderTopWidth: 1,
    borderTopColor: '#CCCCCC',
    width: '90%',
    alignSelf: 'center',
  },
  footer: {
    paddingLeft: 14,
    paddingBottom: 20,
  },
  footerLinks: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  footerIconContainer: {
    marginRight: 10,
  },
  footerLinkText: {
    fontFamily: 'TitilliumWeb-SemiBold',
    fontSize: 18,
    color: '#1b191a',
  },
});

export default withNavigation(CustomDrawer);
