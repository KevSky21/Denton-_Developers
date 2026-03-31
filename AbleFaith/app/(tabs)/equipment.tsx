// app/equipment.tsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Linking, TouchableOpacity } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import CustomHeader from '../../components/custom-header';

export default function EquipmentScreen() {
  const requestURL = 'https://ablefaith.networkforgood.com/projects/286715-able-faith-2026-stronger-together';

  const handlePress = async () => {
    const supported = await Linking.canOpenURL(requestURL);
    if (supported) {
      await Linking.openURL(requestURL);
    }
    else {
      alert('Unable to open');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <CustomHeader/>

      <View style={styles.pageContainer}>
        <Text style={styles.title}>Equipment</Text>

        <Text style={styles.subtitle}>
          Scan to fill out our request form
        </Text>

        <TouchableOpacity onPress={handlePress}>
          <View style={styles.qrContainer}>
            <QRCode
              value={requestURL}
              size={200}
              color='#000'
              backgroundColor='#fff'
            >
            </QRCode>
          </View>
        </TouchableOpacity>

        <View style={styles.textBox}>
          <Text style={styles.linkText}
            onPress={handlePress}>
            Or Click Here
          </Text>
        </View>

        <View style={styles.textBox}>
          <Text style={styles.description}>
            Fill out the request form and our team will review your submission.
          </Text>
        </View>

        <View style={styles.textBox}>
          <Text style={styles.description}>
            1. Submit form
          </Text>
          
          <Text style={styles.description}>
            2. We review
          </Text>
            
          <Text style={styles.description}>
            3. We contact you
          </Text>
        </View>
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
    fontSize: 35,
    fontWeight: 'bold',
    color: '#EF5C1C',
    alignSelf: 'center',
    marginBottom: 0,
  },
  description: {
    fontFamily: 'Merriweather',
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    alignSelf: 'center',
    lineHeight: 24,
    marginBottom: 15,
    textAlign: 'center',
  },
  linkText: {
    fontFamily: 'Merriweather',
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1B6EF3',
    alignSelf: 'center',
    lineHeight: 24,
    marginBottom: 15,
    textAlign: 'center',
  },
  qrContainer: {
    alignSelf: 'center',
    marginBottom: 20,
  },
  textBox: {
    alignSelf: 'center',
    alignContent: 'center',
    width: 350,
  },
  pageContainer: {
    flex: 1,
    padding: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
});