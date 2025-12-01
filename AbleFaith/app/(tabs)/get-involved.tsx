// app/get-involved.tsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import CustomHeader from '../../components/custom-header';

export default function GetInvolvedScreen() {
  return (
    <ScrollView style={styles.container}>
      <CustomHeader/>

      <View style={styles.pageContainer}>
        <Text style={styles.title}>Get Involved</Text>
        <Text style={styles.description}>
          Find out how you can make a difference in our community.
        </Text>
        {/* Add your get involved content here */}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  pageContainer: {
    flex: 1,
    padding: 20,
  }
});