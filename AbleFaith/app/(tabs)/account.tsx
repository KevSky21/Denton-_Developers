// app/account.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import CustomHeader from '../../components/custom-header';
import { auth } from '../../lib/firebase';
import { EmailAuthProvider, reauthenticateWithCredential, updateEmail, updatePassword, updateProfile, linkWithCredential, sendEmailVerification } from 'firebase/auth';
import { useRouter } from 'expo-router';

export default function AccountScreen() {
  const router = useRouter();
  const [displayName, setDisplayName] = useState('');
  const [currentEmail, setCurrentEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const displayNameChanged = displayName !== (auth.currentUser?.displayName || "");

  const wantsSecurityChange = newEmail.length > 0 || newPassword.length > 0;

  const canSubmitSecurity = wantsSecurityChange && currentEmail.length > 0 && currentPassword.length > 0;

  useEffect(() => {
    const user = auth.currentUser;
    if(user) {
      setDisplayName(user.displayName || '');
    }
  }, []);

  const updateDisplayName = async () => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("No authenticated user.");

      if (displayName === (user.displayName || "")) {
        Alert.alert("No Changes", "Display name is the same.");
        return;
      }

      await updateProfile(user, { displayName });
      await user.reload();

      setDisplayName(user.displayName || '');

      Alert.alert("Success", "Display name updated!");

      router.replace('/account');
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };
  
  const updateSecurity = async () => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("No authenticated user.");

      const emailChanged = newEmail.length > 0 && newEmail !== user.email;
      const passwordChanged = newPassword.length > 0;

      if (!emailChanged && !passwordChanged) {
        Alert.alert("No Changes", "Nothing to update.");
        return;
      }

      if (!currentEmail || !currentPassword) {
        throw new Error("Current email and password required.");
      }

      const credential = EmailAuthProvider.credential(
        currentEmail,
        currentPassword
      );

      const hasPassword = user.providerData.some(
        (p) => p.providerId === "password"
      );

      if (!hasPassword) {
        await linkWithCredential(user, credential);
      }

      await reauthenticateWithCredential(user, credential);

      if (!user.emailVerified) {
        await sendEmailVerification(user);
        Alert.alert(
          "Verify Email",
          "Please verify your current email before updating."
        );
        return;
      }

      if (emailChanged) {
        await updateEmail(user, newEmail);
      }

      if (passwordChanged) {
        await updatePassword(user, newPassword);
      }

      await user.reload();

      setCurrentEmail("");
      setCurrentPassword("");
      setNewEmail("");
      setNewPassword("");

      Alert.alert("Success", "Security settings updated!");
      
      router.replace('/account');
    } catch (error: any) {
      Alert.alert("Error", error.message);
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
        />

        <TouchableOpacity
          style={[
            styles.saveDisplayButton,
            !displayNameChanged && styles.disabledButton
          ]}
          onPress={updateDisplayName}
          disabled={!displayNameChanged}
        >
          <Text style={styles.saveButtonText}>Save Display Name</Text>
        </TouchableOpacity>
        
        <View style={styles.divider} />

        <Text style={styles.sectionTitle}>Security</Text>

        <Text style={styles.helperText}>
          Updating email or password requires your current credentials.
        </Text>

        <TextInput
          style={styles.input}
          value={currentEmail}
          onChangeText={setCurrentEmail}
          placeholder="Current Email"
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <TextInput
          style={styles.input}
          value={currentPassword}
          onChangeText={setCurrentPassword}
          placeholder="Current Password"
          secureTextEntry
        />

        <TextInput
          style={styles.input}
          value={newEmail}
          onChangeText={setNewEmail}
          placeholder="New Email"
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <TextInput
          style={styles.input}
          value={newPassword}
          onChangeText={setNewPassword}
          placeholder="New Password"
          secureTextEntry
        />

        <TouchableOpacity
          style={[
            styles.saveSecurityButton,
            !canSubmitSecurity && styles.disabledButton
          ]}
          onPress={updateSecurity}
          disabled={!canSubmitSecurity}
        >
          <Text style={styles.saveButtonText}>Save Security Changes</Text>
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
  saveSecurityButton: {
    backgroundColor: '#C5E1A5',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    borderRadius: 20,
    width: 190,
    marginTop: 10,
    marginLeft: 10,
    alignContent: 'center',
  },
  saveDisplayButton: {
    backgroundColor: '#C5E1A5',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    borderRadius: 20,
    width: 170,
    marginTop: 10,
    marginLeft: 10,
    alignContent: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  sectionTitle: {
  fontSize: 22,
  fontWeight: '600',
  marginTop: 20,
  marginBottom: 5,
  },
  helperText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 25,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
});