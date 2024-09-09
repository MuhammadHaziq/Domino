import React from 'react';
import {View, StyleSheet} from 'react-native';

const Footer = ({label}) => {
  return (
    <View style={styles.footer}>
      <View style={styles.footerTop}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    backgroundColor: '#1b191a',
    height: 100,
  },
  footerTop: {
    backgroundColor: '#FFFFFF',
    height: 40,
    borderBottomLeftRadius: 14,
    borderBottomRightRadius: 14,
  },
});

export default Footer;
