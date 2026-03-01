// components/Header.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function Header() {
  const handleJoin = () => {
    // Add join functionality here
    console.log('Join pressed');
  };

  const handleDonate = () => {
    // Add donate functionality here
    console.log('Donate pressed');
  };

  return (
    <View style={styles.header}>
      <View style={styles.logoContainer}>
        <View style={styles.triangleLogo}>
          <Text style={styles.logoText}>△</Text>
        </View>
      </View>
      <View style={styles.headerButtons}>
        <TouchableOpacity style={styles.joinButton} onPress={handleJoin}>
          <Text style={styles.headerButtonText}>JOIN</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.donateButton} onPress={handleDonate}>
          <Text style={styles.headerButtonText}>DONATE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    paddingTop: 50, // Add extra padding for status bar
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#5DC1E8',
  },
  logoContainer: {
    width: 40,
    height: 40,
  },
  triangleLogo: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 30,
    color: '#5DC1E8',
  },
  headerButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  joinButton: {
    backgroundColor: '#FF9999',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  donateButton: {
    backgroundColor: '#A8D5BA',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  headerButtonText: {
    fontSize: 12,
    fontWeight: '600',
  },
});