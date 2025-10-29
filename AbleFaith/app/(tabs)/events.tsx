// app/events.tsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function EventsScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Upcoming Events</Text>
      <Text style={styles.description}>
        Stay updated with our latest events and activities.
      </Text>
      {/* Add your events content here */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
});