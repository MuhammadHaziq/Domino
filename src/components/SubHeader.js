import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {withNavigation} from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SubHeader = ({backArrow, label, navigation}) => {
  return (
    <View style={styles.body}>
      <View style={styles.container}>
        {backArrow ? (
          <TouchableOpacity onPress={backArrow}>
            <Ionicons
              style={{marginRight: 20}}
              name="md-arrow-back"
              size={32}
              color="#FFFFFF"
            />
          </TouchableOpacity>
        ) : null}
        <View>
          <Text style={styles.label}>{label + ' '}</Text>
          <View style={styles.underline}></View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: 'transparent',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#db0303',
    paddingVertical: 15,
    paddingLeft: 25,
    borderBottomLeftRadius: 14,
    borderBottomRightRadius: 14,
  },
  label: {
    color: '#FFFFFF',
    fontFamily: 'TitilliumWeb-BoldItalic',
    fontSize: 25,
  },
  underline: {
    width: 50,
    height: 3,
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
    marginVertical: 5,
  },
});

export default withNavigation(SubHeader);
