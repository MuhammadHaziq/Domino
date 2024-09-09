import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ContactButton = ({title, subTitle, icon, destination}) => {
  return (
    <TouchableOpacity style={styles.card} onPress={destination}>
      <View style={styles.iconContainer}>
        <Ionicons style={styles.icon} name={icon} size={28} color="#000000" />
      </View>
      <View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subTitle}>{subTitle}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  iconContainer: {
    backgroundColor: '#FFFFFF',
    borderColor: '#dfdfdf',
    borderLeftWidth: 1,
    borderBottomWidth: 3,
    borderRightWidth: 3,
    borderTopWidth: 1,
    borderRadius: 10,
    justifyContent: 'center',
    marginRight: 20,
    width: 100,
    height: 70,
  },
  icon: {
    alignSelf: 'center',
    marginVertical: 20,
    marginHorizontal: 20,
  },
  title: {
    fontFamily: 'TitilliumWeb-SemiBold',
    fontSize: 18,
  },
  subTitle: {
    fontFamily: 'TitilliumWeb-Light',
    fontSize: 16,
  },
});

export default ContactButton;
