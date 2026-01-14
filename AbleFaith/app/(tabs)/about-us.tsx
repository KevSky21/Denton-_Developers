// app/about-us.tsx
import React from 'react';
import CustomHeader from '../../components/custom-header';
import { ScrollView, View, Text, StyleSheet, Image } from "react-native";

export default function AboutUs() {
  const sponsorLogos = [
    require('../../assets/images/about-us-images/wingstop.png'),
    require('../../assets/images/about-us-images/benton-luttrell.png'),
    require('../../assets/images/about-us-images/fumct.png'),
    require('../../assets/images/about-us-images/one.png'),
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <CustomHeader/>
      
      <View style={styles.contentContainer}>
        {/* About Us Header */}
        <Text style={styles.sectionTitle}>About us:</Text>

        {/* About Us images */}
        <View style={styles.blueImageBackground}>
          <View style={styles.teamCard}>
            <Image
              source={require('../../assets/images/about-us-images/AbleFaithOpening-RibbonCutting1.jpg')}
              style={styles.headshotPlaceholder}
              resizeMode="cover"
            />
          </View>
          <View style={styles.teamCard}>
            <Image
              source={require('../../assets/images/about-us-images/Thanksgiving1.jpg')}
              style={styles.headshotPlaceholder}
              resizeMode="cover"
            />
          </View>
          <View style={styles.teamCard}>
            <Image
              source={require('../../assets/images/about-us-images/Thanksgiving-MasonandEmily1.jpg')}
              style={styles.headshotPlaceholder}
              resizeMode="cover"
            />
          </View>
        </View>

        {/* Our Mission */}
        <Text style={styles.sectionTitle}>Our Mission:</Text>
        <View style={styles.missionContainer}>
          <Image
            source={require('../../assets/images/about-us-images/Able-Faith-Background.png')}
            style={StyleSheet.absoluteFillObject}
            resizeMode="cover"
          />
          <View style={styles.missionOverlay}>
            <Text style={styles.missionText}>
              Able Faith provides community and life-changing programs for people with
              neurological disabilities and their caregivers.
            </Text>
          </View>
        </View>

        {/* Meet the Team */}
        <Text style={styles.sectionTitle}>Meet the Team:</Text>
        <View style={styles.teamRow}>
          <View style={styles.teamCard}>
            <Image
              source={require('../../assets/images/about-us-images/jose1.png')}
              style={styles.headshotPlaceholder}
              resizeMode="cover"
            />
            <Text style={styles.personName}>Jose Martinez</Text>
            <Text style={styles.personRole}>Co-Founder</Text>
          </View>

          <View style={styles.teamCard}>
            <Image
              source={require('../../assets/images/about-us-images/aaron1.png')}
              style={styles.headshotPlaceholder}
              resizeMode="cover"
            />
            <Text style={styles.personName}>Aaron Brown</Text>
            <Text style={styles.personRole}>Staff</Text>
          </View>

          <View style={styles.teamCard}>
            <Image
              source={require('../../assets/images/about-us-images/brittany1.png')}
              style={styles.headshotPlaceholder}
              resizeMode="cover"
            />
            <Text style={styles.personName}>Brittany Baker</Text>
            <Text style={styles.personRole}>Staff</Text>
          </View>
        </View>

        {/* Our Board */}
        <Text style={styles.sectionTitle}>Our Board:</Text>
        <View style={styles.teamRow}>
          <View style={styles.teamCard}>
            <Image
              source={require('../../assets/images/about-us-images/riley1.png')}
              style={styles.headshotPlaceholder}
              resizeMode="cover"
            />
            <Text style={styles.personName}>Riley Sprowl</Text>
            <Text style={styles.personRole}>Co-Founder</Text>
          </View>

          <View style={styles.teamCard}>
            <Image
              source={require('../../assets/images/about-us-images/jose2.png')}
              style={styles.headshotPlaceholder}
              resizeMode="cover"
            />
            <Text style={styles.personName}>Jose Martinez</Text>
            <Text style={styles.personRole}>Co-Founder</Text>
          </View>

          <View style={styles.teamCard}>
            <Image
              source={require('../../assets/images/about-us-images/bruce1.png')}
              style={styles.headshotPlaceholder}
              resizeMode="cover"
            />
            <Text style={styles.personName}>Bruce Patel</Text>
            <Text style={styles.personRole}>Chairman</Text>
          </View>
        </View>

        {/* Sponsors */}
        <Text style={styles.sectionTitle}>Sponsors:</Text>
        <View style={styles.sponsors}>
          {sponsorLogos.map((logo, index) => (
            <View key={index} style={styles.sponsorLogoWrapper}>
              <Image
                source={logo}
                style={styles.sponsorLogoImage}
                resizeMode="contain"
              />
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
  },

  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",
    marginTop: 24,
    marginBottom: 12,
    color: "#c44a0c",
  },

  blueImageBackground: {
    backgroundColor: "#e0f0ff",
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 12,
    marginBottom: 20,
  },

  missionContainer: {
    position: "relative",
    marginBottom: 20,
    width: "100%",
    height: 200,
    borderRadius: 16,
    overflow: "hidden",
  },

  missionOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },

  missionText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  pageContainer: {
    flex: 1,
    padding: 20,
  },
  teamRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },

  teamCard: {
    alignItems: "center",
    width: "30%",
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#f0f0f0",
    paddingBottom: 6,
  },

  headshotPlaceholder: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 6,
  },

  personName: {
    fontSize: 14,
    fontWeight: "700",
    textAlign: "center",
  },

  personRole: {
    fontSize: 12,
    textAlign: "center",
    color: "#444",
  },

  sponsors: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 40,
  },

  sponsorLogoWrapper: {
    width: "48%",
    height: 70,
    marginBottom: 12,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    backgroundColor: "#fff", // optional
  },

  sponsorLogoImage: {
    width: "90%",
    height: "90%",
  },
});
