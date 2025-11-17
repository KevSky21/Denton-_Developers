import { ScrollView, View, Text, StyleSheet } from "react-native";

export default function AboutUs() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      
      {/* About Us Header */}
      <Text style={styles.sectionTitle}>About us:</Text>
      {/* About Us images */}
     <View style={styles.blueImageBackground}>
        {/*<View style={styles.largeImagePlaceholder} />*/}
         <View style={styles.teamCard}>
          <View style={styles.headshotPlaceholder} />
        </View>
        <View style={styles.teamCard}>
          <View style={styles.headshotPlaceholder} />
        </View>
        <View style={styles.teamCard}>
          <View style={styles.headshotPlaceholder} />
        </View>
      </View>

      {/* Our Mission */}
      <Text style={styles.sectionTitle}>Our Mission:</Text>
      <View style={styles.missionContainer}>
        <View style={styles.missionImagePlaceholder} />
        <Text style={styles.missionText}>
          Able Faith provides community and life-changing programs for people with
          neurological disabilities and their caregivers.
        </Text>
      </View>

      {/* Meet the Team */}
      <Text style={styles.sectionTitle}>Meet the Team:</Text>
      <View style={styles.teamRow}>
        <View style={styles.teamCard}>
          <View style={styles.headshotPlaceholder} />
          <Text style={styles.personName}>Joe Haynes</Text>
          <Text style={styles.personRole}>Staff</Text>
        </View>

        <View style={styles.teamCard}>
          <View style={styles.headshotPlaceholder} />
          <Text style={styles.personName}>Aaron Brown</Text>
          <Text style={styles.personRole}>Staff</Text>
        </View>

        <View style={styles.teamCard}>
          <View style={styles.headshotPlaceholder} />
          <Text style={styles.personName}>Brittany Baker</Text>
          <Text style={styles.personRole}>Staff</Text>
        </View>
      </View>

      {/* Our Board */}
      <Text style={styles.sectionTitle}>Our Board:</Text>
      <View style={styles.teamRow}>
        <View style={styles.teamCard}>
          <View style={styles.headshotPlaceholder} />
          <Text style={styles.personName}>Riley Sprowl</Text>
          <Text style={styles.personRole}>Co-Founder</Text>
        </View>

        <View style={styles.teamCard}>
          <View style={styles.headshotPlaceholder} />
          <Text style={styles.personName}>Jose Martinez</Text>
          <Text style={styles.personRole}>Co-Founder</Text>
        </View>

        <View style={styles.teamCard}>
          <View style={styles.headshotPlaceholder} />
          <Text style={styles.personName}>Bruce Patel</Text>
          <Text style={styles.personRole}>Chairman</Text>
        </View>
      </View>

      {/* Sponsors */}
      <Text style={styles.sectionTitle}>Sponsors:</Text>
      <View style={styles.sponsors}>
        <View style={styles.sponsorLogoPlaceholder} />
        <View style={styles.sponsorLogoPlaceholder} />
        <View style={styles.sponsorLogoPlaceholder} />
        <View style={styles.sponsorLogoPlaceholder} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
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
  backgroundColor: "#e0f0ff",  // light blue background (change to any shade)
  padding: 12,
  flexDirection: "row",
  justifyContent: "space-between",
  borderRadius: 12,
  marginBottom: 20,
},

  row: {
    alignItems: "center",
    marginBottom: 20,
  },

  largeImagePlaceholder: {
    width: "100%",
    height: 140,
    backgroundColor: "#e0e0e0",
    borderRadius: 12,
  },

  missionContainer: {
    position: "relative",
    marginBottom: 20,
  },

  missionImagePlaceholder: {
    width: "100%",
    height: 150,
    backgroundColor: "#e0e0e0",
    borderRadius: 12,
  },

  missionText: {
    position: "absolute",
    top: "30%",
    left: "10%",
    right: "10%",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },

  teamRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },

  teamCard: {
    alignItems: "center",
    width: "30%",
  },

  headshotPlaceholder: {
    width: "100%",
    height: 90,
    backgroundColor: "#d9d9d9",
    borderRadius: 8,
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

  sponsorLogoPlaceholder: {
    width: "48%",
    height: 70,
    backgroundColor: "#e0e0e0",
    borderRadius: 10,
    marginBottom: 10,
  },
});
