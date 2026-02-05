import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform
} from 'react-native';

import { auth, myDb } from './_layout';
import CustomHeader from '../../components/custom-header';

import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  limit,
  onSnapshot,
  where
} from 'firebase/firestore';

export default function ChatScreen() {
  const [myMessages, setMyMessages] = useState<any[]>([]);
  const [myInput, setMyInput] = useState('');

  useEffect(() => {
    // Listen for messages in the global room
    const myQuery = query(
      collection(myDb, 'messages'),
      where("roomId", "==", "global"),
      limit(50)
    );

    const unsubscribe = onSnapshot(myQuery, snapshot => {
      const loaded = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        // Add fallback timestamps for ordering
        createdAtFallback: doc.data().createdAt?.seconds || doc.data().createdAtLocal || Date.now() / 1000
      }));
      setMyMessages(loaded);
    });

    return unsubscribe;
  }, []);

  const mySendMessage = async () => {
    if (!myInput.trim()) return;
    if (myInput.length > 300) return; // spam guard

    const myUser = auth.currentUser;

    // Add message with server timestamp + local fallback
    await addDoc(collection(myDb, 'messages'), {
      text: myInput,
      uid: myUser?.uid,
      email: myUser?.email,
      roomId: "global",
      createdAt: serverTimestamp(),
      createdAtLocal: Date.now() / 1000 // local timestamp for instant display
    });

    setMyInput('');
  };

  // Sort messages: newest first using server timestamp if available, otherwise local fallback
  const sortedMessages = [...myMessages].sort(
    (a, b) => (b.createdAt?.seconds || b.createdAtLocal || b.createdAtFallback) - 
              (a.createdAt?.seconds || a.createdAtLocal || a.createdAtFallback)
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#fff' }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* Header */}
      <CustomHeader/>

      {/* Messages List */}
      <FlatList
        data={sortedMessages}
        inverted
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={[
              styles.myBubble,
              item.uid === auth.currentUser?.uid ? styles.myOwn : styles.myOther
            ]}
          >
            <Text style={styles.myEmail}>{item.email}</Text>
            <Text style={styles.myText}>{item.text}</Text>
          </View>
        )}
      />

      {/* Input Row */}
      <View style={styles.myRow}>
        <TextInput
          style={styles.myInput}
          placeholder="Type your message..."
          value={myInput}
          onChangeText={setMyInput}
          multiline
        />

        <TouchableOpacity
          style={styles.mySend}
          onPress={mySendMessage}
        >
          <Text style={{ fontSize: 18, fontWeight: '600', color: '#000' }}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  myBubble: { 
    margin: 8, 
    padding: 10, 
    borderRadius: 10, 
    maxWidth: '75%' 
  },
  myOwn: { 
    backgroundColor: '#A8D5BA', 
    alignSelf: 'flex-end' 
  },
  myOther: { 
    backgroundColor: '#eee', 
    alignSelf: 'flex-start' 
  },
  myEmail: { 
    fontSize: 10, 
    color: '#555' 
  },
  myText: { 
    fontSize: 16 
  },
  myRow: { 
    flexDirection: 'row', 
    padding: 12,
    borderTopWidth: 1, 
    borderColor: '#ddd', 
    alignItems: 'center', 
    backgroundColor: '#fff',
  },
  myInput: { 
    flex: 1, 
    borderWidth: 1, 
    borderColor: '#ddd', 
    borderRadius: 25, 
    paddingHorizontal: 20, 
    paddingVertical: 12, 
    fontSize: 18, 
    backgroundColor: '#F7F7F7',
  },
  mySend: { 
    marginLeft: 12, 
    justifyContent: 'center', 
    alignItems: 'center', 
    paddingHorizontal: 20, 
    paddingVertical: 12, 
    backgroundColor: '#FF9999', 
    borderRadius: 25, 
    minWidth: 80, 
  },
});
