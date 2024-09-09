import React, {useContext} from 'react';
import {useFocusEffect} from 'react-navigation-hooks';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import Header from '../components/Header';
import SubHeader from '../components/SubHeader';
import Footer from '../components/Footer';
import FullButton from '../components/FullButton';
import MemberStatus from '../components/MemberStatus';
import {Context as AuthContext} from '../context/AuthContext';
import memberActive from '../helpers/memberActive';

const AccountScreen = ({navigation}) => {
  const {state, verifyStatus} = useContext(AuthContext);
  const memberStatus = memberActive(state.memberExpire);

  useFocusEffect(
    React.useCallback(() => {
      if (state.loggedInStatus !== 'guest') verifyStatus();
    }, []),
  );

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{backgroundColor: '#FFFFFF'}}>
        <Header />
        <SubHeader
          backArrow={() => navigation.navigate('Home')}
          label="ACCOUNT MANAGEMENT"
        />
      </View>
      <ScrollView
        bounces={false}
        contentContainerStyle={{flexGrow: 1}}
        style={{flexGrow: 1}}>
        <View
          style={{
            flex: 1,
            backgroundColor: '#FFFFFF',
          }}>
          <MemberStatus status={memberStatus} />
          <View>
            <FullButton
              destination={() => navigation.navigate('Profile')}
              bgColor="yellow"
              label="EDIT PROFILE"
              spacing="30"
            />
            <FullButton
              destination={() => navigation.navigate('Logout')}
              bgColor="red"
              label="LOG OUT"
            />
            <TouchableOpacity
              onPress={() => navigation.navigate('ChangePassword')}>
              <Text style={styles.changePass}>CHANGE PASSWORD</Text>
            </TouchableOpacity>
          </View>
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
  changePass: {
    fontFamily: 'TitilliumWeb-Regular',
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
  },
});

export default AccountScreen;
