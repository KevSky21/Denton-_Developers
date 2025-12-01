// app/about-us.tsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import CustomHeader from '../../components/custom-header';

export default function AboutUsScreen() {
  return (
    <ScrollView style={styles.container}>
      <CustomHeader/>

      <View style={styles.pageContainer}>
        <Text style={styles.title}>About Able Faith</Text>
        <Text style={styles.description}>
          Learn more about our mission, vision, and values.
        </Text>
        {/* Add your about us content here */}
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