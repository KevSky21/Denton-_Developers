// app/get-involved.tsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function GetInvolvedScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Get Involved</Text>
      <Text style={styles.description}>
        Find out how you can make a difference in our community.
      </Text>
      {/* Add your get involved content here */}
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