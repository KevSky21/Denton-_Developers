// app/donation.tsx
import { HeaderTitle } from '@react-navigation/elements';
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Linking, TouchableOpacity } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

export default function DonateScreen() {
  const donateURL = 'https://ablefaith.networkforgood.com/projects/245315-2025-help-able-faith-make-a-difference';

  const handlePress = async () => {
    const supported = await Linking.canOpenURL(donateURL);
    if (supported) {
      await Linking.openURL(donateURL);
    }
    else {
      alert('Unable to open');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Donate</Text>

      <TouchableOpacity onPress={handlePress}>
        <View style={styles.qrContainer}>
          <QRCode
            value={donateURL}
            size={200}
            color='#000'
            backgroundColor='#fff'
          >
          </QRCode>
        </View>
      </TouchableOpacity>

      <View style={styles.textBox}>
        <Text style={styles.description}>
          Able Faith is all about growth and empowerement for those with neurological disorders.
        </Text>
      </View>

      <View style={styles.textBox}>
        <Text style={styles.description}>
          Check out our QR code for more info on how you can help.
        </Text>
      </View>
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
    fontSize: 35,
    fontWeight: 'bold',
    color: '#EF5C1C',
    alignSelf: 'center',
    marginBottom: 15,
  },
  description: {
    fontFamily: 'Merriweather',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
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
    width: 300,
  },
});