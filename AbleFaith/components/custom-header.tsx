import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';

export default function CustomHeader() {
  const router = useRouter();
  return (
    <View style={styles.header}>
            <View style={styles.logoContainer}>
              <TouchableOpacity 
                style={styles.triangleLogo}
                onPress={() => router.push('/home')}
              >
                <Image
                  source={require('../assets/images/logo.png')}
                  style={styles.logoImage}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.headerButtons}>
              <TouchableOpacity style={styles.joinButton}>
                <Text style={styles.headerButtonText}>JOIN</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.donateButton}
                onPress={() => router.push('/donate')}
              >
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
    backgroundColor: '#C5E1A5',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  headerButtonText: {
    fontSize: 12,
    fontWeight: '600',
  },
  logoImage: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
})
