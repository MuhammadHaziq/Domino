import React from 'react';
import {Text, StyleSheet, TouchableOpacity, SafeAreaView} from 'react-native';
import {withNavigation} from 'react-navigation';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

// Right icon added to make horizontal alignment simpler.Touchable opacity place on

const Header = ({backScreen, label, navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={{
          paddingLeft: 20,
          paddingRight: 60,
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        accessibilityLabel="Go back"
        accessibilityHint="Navigates to the previous screen"
        onPress={() => {
          backScreen ? navigation.navigate(backScreen) : navigation.goBack();
        }}>
        <FontAwesome name="chevron-left" size={28} color="#FFFFFF" />
      </TouchableOpacity>
      <Text style={styles.title}>{label}</Text>
      {/* Added icon below to aid in spacing */}
      <FontAwesome
        style={{paddingRight: 20, paddingLeft: 60}}
        name="chevron-left"
        size={28}
        color="#1b191a"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 62,
    backgroundColor: '#1b191a',
  },
  title: {
    fontFamily: 'lato-bold',
    fontSize: 20,
    color: '#FFFFFF',
    textAlign: 'center',
  },
});

export default withNavigation(Header);
