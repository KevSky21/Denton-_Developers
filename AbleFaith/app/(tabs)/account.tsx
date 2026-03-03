// app/account.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import CustomHeader from '../../components/custom-header';
import { auth } from '../../lib/firebase';
import { EmailAuthProvider, reauthenticateWithCredential, updateEmail, updatePassword, updateProfile, linkWithCredential, sendEmailVerification } from 'firebase/auth';

export default function AccountScreen() {
  const [displayName, setDisplayName] = useState('');
  const [currentEmail, setCurrentEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    const user = auth.currentUser;
    if(user) {
      setDisplayName(user.displayName || '');
    }
  }, []);
  
  const updateAccount = async () => {
    try {
      const user = auth.currentUser;

      if (!user) throw new Error("No authenticated user.");

      if (!currentEmail || !currentPassword) {
        throw new Error("Current email and password required.")
      }

      const displayNameChanged = displayName !== (user.displayName || "");
      const emailChanged = newEmail && newEmail !== user.email;
      const passwordChanged = newPassword.length > 0;

      if(!displayNameChanged && !emailChanged && !passwordChanged) {
        Alert.alert("No Changes", "Nothing was updated.");
        return;
      }

      if(displayNameChanged) {
        await updateProfile(user, {displayName});
      }

      if (emailChanged || passwordChanged) {
        const credential = EmailAuthProvider.credential(
          currentEmail,
          currentPassword
        );

        const hasPassword = user.providerData.some(p => p.providerId === "password");
        if(!hasPassword) {
          await linkWithCredential(user, credential);
        }

        await reauthenticateWithCredential(user, credential);

        if(!user.emailVerified) {
          await sendEmailVerification(user);
          Alert.alert("Verify Email", "Please verify your current email before updating account info.");
          return;
        }

        if(emailChanged) {
          await updateEmail(user, newEmail);
        }

        if(passwordChanged) {
          await updatePassword(user, newPassword);
        }
      }

      await user.reload();

      setDisplayName(user.displayName || '');
      setCurrentEmail('');
      setNewEmail('');
      setCurrentPassword('');
      setNewPassword('');

      Alert.alert("Success", "Account updated successfully!");
    } catch (error: any) {
      if(error instanceof Error) {
        Alert.alert("Error", error.message);
      } else {
        Alert.alert("Error", "Something went wrong.");
      }
    }
  };

  return (
    <ScrollView style={styles.container}>
      <CustomHeader/>

      <View style={styles.pageContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Account Settings</Text>
        </View>

        <TextInput
          style={styles.input}
          value={displayName}
          onChangeText={setDisplayName}
          placeholder="Display Name"
          autoCapitalize='none'
        />

        <TextInput 
          style={styles.input}
          value={currentEmail}
          onChangeText={setCurrentEmail}
          placeholder="Current Email"
          autoCapitalize='none'
          keyboardType='email-address'
        />

        <TextInput 
          style={styles.input}
          value={newEmail}
          onChangeText={setNewEmail}
          placeholder="New Email"
          autoCapitalize='none'
          keyboardType='email-address'
        />

        <TextInput 
          style={styles.input}
          value={currentPassword}
          onChangeText={setCurrentPassword}
          placeholder="Current Password"
          autoCapitalize='none'
          secureTextEntry
        />

        <TextInput 
          style={styles.input}
          value={newPassword}
          onChangeText={setNewPassword}
          placeholder="New Password"
          autoCapitalize='none'
          secureTextEntry
        />

        <TouchableOpacity style={styles.saveButton} onPress={updateAccount}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  pageContainer: {
    flex: 1,
    padding: 20,
  },
  titleContainer: {
    flex: 1,
    alignSelf: 'center',
    alignContent: 'center',
    marginBottom: 10
  },
  title: {
    fontSize: 32,
    fontFamily: 'serif',
    alignSelf: 'center',
  },
  input: {
    height: 40,
    width: 300,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    fontSize: 16,
    padding: 10,
    margin: 10,
  },
  saveButton: {
    backgroundColor: '#FF9999',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    borderRadius: 20,
    width: 150,
    marginTop: 10,
    marginLeft: 10,
  },
  saveButtonText: {
    fontSize: 18,
    fontWeight: '600',
  },
});