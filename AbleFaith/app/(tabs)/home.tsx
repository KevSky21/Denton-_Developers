// app/home.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import CustomHeader from '../../components/custom-header';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Header */}
      <CustomHeader/>

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
          onPress={() => router.replace('/programs')}
        >
          <Text style={styles.gridText}>Programs</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.gridItem, styles.eventsBox]}
          onPress={() => router.replace('/events')}
        >
          <Text style={styles.gridText}>Events</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.gridItem, styles.aboutBox]}
          onPress={() => router.replace('/about-us')}
        >
          <Text style={styles.gridText}>About Us</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.gridItem, styles.involvedBox]}
          onPress={() => router.replace('/get-involved')}
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
});