import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  SafeAreaView,
} from 'react-native';
import Header from '../components/Header';
import SubHeader from '../components/SubHeader';
import ProfileForm from '../forms/ProfileForm';
import Footer from '../components/Footer';
import Hide from 'react-native-hide-with-keyboard';

const ProfileScreen = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        bounces={false}
        contentContainerStyle={{flexGrow: 1}}
        style={{flexGrow: 1}}
        stickyHeaderIndices={[0]}>
        <View style={{backgroundColor: '#FFFFFF'}}>
          <Header />
          <Hide>
            <SubHeader
              label="EDIT PROFILE"
              backArrow={() => navigation.navigate('Account')}
            />
          </Hide>
        </View>

        <KeyboardAvoidingView
          style={{
            flex: 1,
            backgroundColor: '#FFFFFF',
            justifyContent: 'space-around',
          }}
          behavior="padding"
          enabled>
          <ProfileForm />
        </KeyboardAvoidingView>
        <Footer />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  body: {
    flexGrow: 1,
    backgroundColor: '#1b191a',
  },
});

export default ProfileScreen;
