import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { auth, db } from '../../lib/firebase';
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
  const flatListRef = useRef<FlatList<any>>(null);
  const inputRef = useRef<TextInput>(null);

  // Load messages
  useEffect(() => {
    const q = query(
      collection(db, 'messages'),
      where("roomId", "==", "global"),
      limit(50)
    );

    const unsubscribe = onSnapshot(q, snapshot => {
      const loaded = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAtFallback:
          doc.data().createdAt?.seconds ||
          doc.data().createdAtLocal ||
          Date.now() / 1000
      }));
      setMyMessages(loaded);

      // Scroll to bottom after messages load
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    });

    return unsubscribe;
  }, []);

  // Scroll when keyboard shows
  useEffect(() => {
    const showSub = Keyboard.addListener('keyboardDidShow', () => {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    });
    return () => {
      showSub.remove();
    };
  }, []);

  const sendMessage = async () => {
    if (!myInput.trim()) return;
    if (myInput.length > 300) return;

    const user = auth.currentUser;
    await addDoc(collection(db, 'messages'), {
      text: myInput,
      uid: user?.uid,
      displayName: user?.displayName || 'Anonymous',
      roomId: 'global',
      createdAt: serverTimestamp(),
      createdAtLocal: Date.now() / 1000

    });

    // Clear input and dismiss keyboard
    setMyInput('');
    inputRef.current?.clear();
    Keyboard.dismiss();

    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const sortedMessages = [...myMessages].sort(
    (a, b) =>
      (a.createdAt?.seconds || a.createdAtLocal || a.createdAtFallback) -
      (b.createdAt?.seconds || b.createdAtLocal || b.createdAtFallback)
  );

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <CustomHeader />
      
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
        {/* Messages List */}
        <FlatList
          ref={flatListRef}
          data={sortedMessages}
          keyExtractor={(item) => item.id}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.flatListContent}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View
              style={[
                styles.bubble,
                item.uid === auth.currentUser?.uid
                  ? styles.own
                  : styles.other
              ]}
            >
              <Text style={styles.name}>{item.displayName}</Text>
              <Text style={styles.text}>{item.text}</Text>
            </View>
          )}
        />

        {/* Input Row */}
        <View style={styles.inputRow}>
          <TextInput
            ref={inputRef}
            style={styles.input}
            placeholder="Type your message..."
            placeholderTextColor="#999"
            value={myInput}
            onChangeText={setMyInput}
            multiline
            maxLength={300}
            textAlignVertical="top"
            returnKeyType="default"
            blurOnSubmit={false}
          />
          <TouchableOpacity 
            style={styles.send} 
            onPress={sendMessage}
            activeOpacity={0.7}
          >
            <Text style={styles.sendText}>Send</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  keyboardView: {
    flex: 1,
  },
  flatListContent: {
    paddingBottom: 10,
    paddingTop: 10,
  },
  bubble: {
    margin: 8,
    padding: 12,
    borderRadius: 14,
    maxWidth: '78%',
  },
  own: {
    backgroundColor: '#A8D5BA',
    alignSelf: 'flex-end',
  },
  other: {
    backgroundColor: '#eee',
    alignSelf: 'flex-start',
  },
  name: {
    fontSize: 11,
    color: '#555',
    marginBottom: 4,
    fontWeight: '500',
  },
  text: {
    fontSize: 17,
    color: '#000',
  },
  inputRow: {
    flexDirection: 'row',
    padding: 10,
    paddingBottom: 10,
    borderTopWidth: 1,
    borderColor: '#ddd',
    alignItems: 'flex-end',
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 28,
    paddingHorizontal: 18,
    paddingVertical: 14,
    fontSize: 18,
    backgroundColor: '#F7F7F7',
    maxHeight: 120,
    color: '#000',
  },
  send: {
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 22,
    paddingVertical: 14,
    backgroundColor: '#FF9999',
    borderRadius: 28,
  },
  sendText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
});