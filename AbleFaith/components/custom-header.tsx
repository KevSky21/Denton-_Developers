// custom header
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Modal } from 'react-native';
import { useRouter, Href } from 'expo-router';

export default function CustomHeader() {
  const router = useRouter();
  const [menuVisible, setMenuVisible] = useState(false);

  const menuItems: { label: string; route: Href }[] = [
    { label: 'DONATE', route: '/donate' },
    { label: 'EQUIPMENT', route: '/equipment' },
    { label: 'ACCOUNT', route: '/account' },
  ];

  const handleNavigate = (route: Href) => {
    setMenuVisible(false);
    router.replace(route);
  };

  return (
    <View style={styles.header}>
      {/* Logo */}
      <TouchableOpacity onPress={() => router.replace('/home')}>
        <Image
          source={require('../assets/images/logo.png')}
          style={styles.logoImage}
        />
      </TouchableOpacity>

      {/* Menu Button */}
      <TouchableOpacity
        style={styles.menuButton}
        onPress={() => setMenuVisible(!menuVisible)}
      >
        <Text style={styles.menuText}>☰</Text>
      </TouchableOpacity>

      {/* Dropdown Menu */}
      {menuVisible && (
        <View style={styles.menuOverlay}>
          <Modal
            visible={menuVisible}
            transparent
            animationType="fade"
          >
            <TouchableOpacity
              style={styles.overlayBackground}
              onPress={() => setMenuVisible(false)}
            />

            <View style={styles.dropdown}>
              {menuItems.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.dropdownItem}
                  onPress={() => handleNavigate(item.route)}
                >
                  <Text style={styles.dropdownText}>{item.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </Modal>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#5DC1E8',
    zIndex: 100,
  },
  logoContainer: {
    width: 40,
    height: 40,
  },
  triangleLogo: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  joinButton: {
    backgroundColor: '#FF9999',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  donateButton: {
    backgroundColor: '#C5E1A5',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  accountButton: {
    backgroundColor: '#87CEEB',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  headerButtonText: {
    fontSize: 12,
    fontWeight: '600',
  },
  logoImage: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  menuButton: {
    padding: 10,
  },
  menuText: {
    fontSize: 22,
    fontWeight: '600',
  },
  dropdown: {
    position: 'absolute',
    top: 80,
    right: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 5,
    width: 150,
    elevation: 10,
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    width: '100%',
  },
  dropdownText: {
    fontSize: 16,
  },
  menuOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 999,
  },
  overlayBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)', 
  },
})
