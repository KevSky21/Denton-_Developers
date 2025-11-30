// app/home.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <View style={styles.triangleLogo}>
            <Image
              source={require('../../assets/images/logo.png')}
              style={styles.logoImage}
            />
          </View>
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

      {/* Welcome Section */}
      <View style={styles.welcomeSection}>
        <Text style={styles.welcomeTitle}>Welcome to Able Faith</Text>
      </View>

      {/* Bible Verse Section */}
      <View style={styles.verseContainer}>
        <Text style={styles.verseText}>
          "You are the light of the world. A city set on a hill cannot be hidden."
        </Text>
        <Text style={styles.verseReference}>Matthew 5:14</Text>
      </View>

      {/* Navigation Grid */}
      <View style={styles.grid}>
        <TouchableOpacity 
          style={[styles.gridItem, styles.programsBox]}
          onPress={() => router.push('/programs')}
        >
          <Text style={styles.gridText}>Programs</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.gridItem, styles.eventsBox]}
          onPress={() => router.push('/events')}
        >
          <Text style={styles.gridText}>Events</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.gridItem, styles.aboutBox]}
          onPress={() => router.push('/about-us')}
        >
          <Text style={styles.gridText}>About Us</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.gridItem, styles.involvedBox]}
          onPress={() => router.push('/get-involved')}
        >
          <Text style={styles.gridText}>Get Involved</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
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
    backgroundColor: '#C5E1A5',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  headerButtonText: {
    fontSize: 12,
    fontWeight: '600',
  },
  welcomeSection: {
    paddingVertical: 30,
    alignItems: 'center',
  },
  welcomeTitle: {
    fontSize: 32,
    fontFamily: 'serif',
    textAlign: 'center',
  },
  verseContainer: {
    backgroundColor: '#E8F5E9',
    padding: 20,
    marginHorizontal: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  verseText: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#A8D5BA',
    textAlign: 'center',
    marginBottom: 8,
  },
  verseReference: {
    fontSize: 14,
    color: '#A8D5BA',
    textAlign: 'right',
    fontStyle: 'italic',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
    gap: 15,
    justifyContent: 'center',
  },
  gridItem: {
    width: '45%',
    height: 120,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
  },
  programsBox: {
    backgroundColor: '#FF9999',
  },
  eventsBox: {
    backgroundColor: '#87CEEB',
  },
  aboutBox: {
    backgroundColor: '#C5E1A5',
  },
  involvedBox: {
    backgroundColor: '#FFAB91',
  },
  logoImage: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
});