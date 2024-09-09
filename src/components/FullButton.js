import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';

const FullButton = ({bgColor, label, subLabel, spacing, destination}) => {
  const backgroundColor = bgColor === 'red' ? '#fa0000' : '#fff706';
  const color = bgColor === 'red' ? '#FFFFFF' : '#000000';
  const marginBottom = spacing ? Number(spacing) : 10;

  return (
    <TouchableOpacity
      onPress={destination}
      style={{
        ...styles.button,
        marginBottom: marginBottom,
        backgroundColor: backgroundColor,
        paddingVertical: subLabel ? 5 : 20,
      }}>
      <Text style={{...styles.label, color: color}}>{label}</Text>
      {subLabel ? (
        <Text>
          <Text style={{...styles.subLabel, color: color}}>{subLabel}</Text>
        </Text>
      ) : null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 5,
    alignSelf: 'center',
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.44,
    shadowRadius: 2.62,
    elevation: 4,
    backgroundColor: '#fa0000',
  },
  label: {
    fontFamily: 'TitilliumWeb-Bold',
    fontSize: 19,
  },
  subLabel: {
    fontFamily: 'TitilliumWeb-Light',
    fontSize: 16,
  },
});

export default FullButton;
