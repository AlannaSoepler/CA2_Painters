import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
//This is the footer component.
//It is used to display a welcome message at the bottom of the screen.
//It has a very simple design
const Footer: React.FC = () => {
  return (
    <View style={styles.footer}>
      <Text style={styles.footerText}>Welcome all</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    backgroundColor: '#35401A',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  footerText: {
    color: '#FFFFFF',
  },
});

export default Footer;
