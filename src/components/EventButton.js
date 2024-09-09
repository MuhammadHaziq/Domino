import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {withNavigation} from 'react-navigation';

const EventButton = ({id, city, state, navigation}) => {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('EventDetail', {id: id})}>
      <Ionicons style={styles.icon} name="ios-pin" size={28} color="#000000" />
      <Text style={styles.title}>
        {city}, {state}
      </Text>
      <FontAwesome name="chevron-right" size={28} color="#000000" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 4,
    backgroundColor: '#FFFFFF',
    borderColor: '#ededed',
    borderWidth: 1,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.44,
    shadowRadius: 2.62,
    elevation: 4,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  icon: {
    paddingRight: 20,
  },
  title: {
    fontFamily: 'TitilliumWeb-SemiBold',
    fontSize: 18,
    flex: 1,
  },
});

export default withNavigation(EventButton);
