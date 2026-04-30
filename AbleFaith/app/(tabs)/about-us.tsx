// app/about-us.tsx
import React, { useState, useRef } from 'react';
import CustomHeader from '../../components/custom-header';
import { ScrollView, View, Text, StyleSheet, Image, TouchableOpacity, FlatList, Dimensions } from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function AboutUs() {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const testimonials = [
    {
      id: '1',
      name: 'Mady',
      initials: 'M',
      avatarColor: '#c44a0c',
      timeAgo: '3 months ago',
      stars: 5,
      text: 'I was blessed to be able to work with a client today at Able Faith. The concept of the entire place is amazing and I love how welcoming it is. The facility was very clean and I would highly recommend this place to anyone needing a community to connect with 🤍',
    },
    {
      id: '2',
      name: 'Carolyn Howell',
      initials: 'CH',
      avatarColor: '#4a7fc1',
      timeAgo: '10 months ago',
      stars: 5,
      text: 'This is an amazing place to be for people who have disabilities and their respective loved ones. Great community, wonderful values, and looking to get people connected. I have been coming here for 9 months and I love everything about what Jose Martinez and Aaron Akeman do for people like myself is incredible!!',
    },
    {
      id: '3',
      name: 'Natasha Giddings',
      initials: 'N',
      avatarColor: '#6a5acd',
      timeAgo: '10 months ago',
      stars: 5,
      text: 'I am so honored to be a member of Able Faith!! God has truly blessed me to call them family. Able Faith in every way is the epitome of their name. This place and the people exudes love and compassion for everyone. If I could give 10 stars I would ✨',
    },
    {
      id: '4',
      name: 'Megan Hutson',
      initials: 'M',
      avatarColor: '#7b3fa0',
      timeAgo: '11 months ago',
      stars: 5,
      text: 'Able Faith is such a gift and all the staff are awesome! A very welcoming environment of all people with and without disabilities. I would highly recommend to any of my clients seeking a place for community, social engagement, and opportunity to use equipment that may not be accessible at a local or chain gym.',
    },
    {
      id: '5',
      name: 'Summer Love',
      initials: 'SL',
      avatarColor: '#d4872a',
      timeAgo: '11 months ago',
      stars: 5,
      text: 'I am so grateful for this amazing team of fabulous volunteers that help make those with disabilities to find Hope, support, and encouragement to build a healthier body, while loving the Lord Jesus Christ!!! They are truly amazing!!!',
    },
    {
      id: '6',
      name: 'Zoya Effanga',
      initials: 'ZE',
      avatarColor: '#2a7a4b',
      timeAgo: '3 months ago',
      stars: 5,
      text: 'I loved visiting here with my classmates! Everyone was so kind and welcoming! Hope to come back again soon.',
    },
    {
      id: '7',
      name: 'Vinnie Patel',
      initials: 'V',
      avatarColor: '#5a3fa0',
      timeAgo: 'A year ago',
      stars: 5,
      text: 'All the people that work here are absolutely amazing. They are changing lives and instilling positivity in so many families with the work they do here. If you are able, please donate as patients are seen voluntarily. God bless.',
    },
    {
      id: '8',
      name: 'Shonda Jones',
      initials: 'S',
      avatarColor: '#b03060',
      timeAgo: '11 months ago',
      stars: 5,
      text: 'Able Faith is an Amazing Faith Based Facility with Amazing Staff as well. They cater to Individuals w/Neuro Challenges and Caregivers to improve their life 💗💗💗',
    },
    {
      id: '9',
      name: 'Neha Kandi',
      initials: 'NK',
      avatarColor: '#1a6b8a',
      timeAgo: '10 months ago',
      stars: 5,
      text: 'This place is extremely welcoming and is a place where people can come in and feel free. The staff is extremely warm and welcoming and have an extremely positive rapport with everyone who comes here.',
    },
    {
      id: '10',
      name: 'Courtney Mason',
      initials: 'CM',
      avatarColor: '#c44a0c',
      timeAgo: '11 months ago',
      stars: 5,
      text: 'Such an amazing place to connect with people and get involved in fun activities in the community! So looking forward to attending more events soon with my mom! 💗',
    },
  ];

  const handleScroll = (event: any) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / (SCREEN_WIDTH - 32));
    setActiveIndex(index);
  };

  const goToSlide = (index: number) => {
    flatListRef.current?.scrollToIndex({ index, animated: true });
    setActiveIndex(index);
  };

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
        <View style={styles.aboutImageWrapper}>
          <Image
            source={require('../../assets/images/about-us-images/AbleFaithOpening-RibbonCutting1.jpg')}
            style={styles.aboutImage}
            resizeMode="contain"
          />
        </View>
        <View style={styles.aboutImageWrapper}>
          <Image
            source={require('../../assets/images/about-us-images/Thanksgiving1.jpg')}
            style={styles.aboutImage}
            resizeMode="contain"
          />
        </View>
        <View style={styles.aboutImageWrapper}>
          <Image
            source={require('../../assets/images/about-us-images/Thanksgiving-MasonandEmily1.jpg')}
            style={styles.aboutImage}
            resizeMode="contain"
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
            <View style={styles.headshotWrapper}>
              <Image
                source={require('../../assets/images/about-us-images/Brittany_Santos.png')}
                style={styles.headshotImage}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.personName}>Brittany Santos</Text>
            <Text style={styles.personRole}>Executive Coordinator</Text>
          </View>

          <View style={styles.teamCard}>
            <View style={styles.headshotWrapper}>
              <Image
                source={require('../../assets/images/about-us-images/Aaron_Akeman.png')}
                style={styles.headshotImage}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.personName}>Aaron Akeman</Text>
            <Text style={styles.personRole}>Neuro Exercise Specialist</Text>
          </View>
        </View>

        {/* Our Board */}
        <Text style={styles.sectionTitle}>Our Board:</Text>
        <View style={styles.teamRow}>
          <View style={styles.teamCard}>
            <View style={styles.headshotWrapper}>
              <Image
                source={require('../../assets/images/about-us-images/Bethany_Brown.png')}
                style={styles.headshotImage}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.personName}>Bethany Brown</Text>
            <Text style={styles.personRole}></Text>
          </View>

          <View style={styles.teamCard}>
            <View style={styles.headshotWrapper}>
              <Image
                source={require('../../assets/images/about-us-images/Jim_Hemsworth.png')}
                style={styles.headshotImage}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.personName}>Jim Hemsworth</Text>
            <Text style={styles.personRole}></Text>
          </View>

          <View style={styles.teamCard}>
            <View style={styles.headshotWrapper}>
              <Image
                source={require('../../assets/images/about-us-images/Jose_Martinez.png')}
                style={styles.headshotImage}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.personName}>Jose Martinez</Text>
            <Text style={styles.personRole}>Co-Founder</Text>
          </View>

          <View style={styles.teamCard}>
            <View style={styles.headshotWrapper}>
              <Image
                source={require('../../assets/images/about-us-images/Riley_Sprowl.png')}
                style={styles.headshotImage}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.personName}>Riley Sprowl</Text>
            <Text style={styles.personRole}>Co-Founder</Text>
          </View>

          <View style={styles.teamCard}>
            <View style={styles.headshotWrapper}>
              <Image
                source={require('../../assets/images/about-us-images/Reena_Patel.png')}
                style={styles.headshotImage}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.personName}>Reena Patel</Text>
            <Text style={styles.personRole}></Text>
          </View>

          <View style={styles.teamCard}>
            <View style={styles.headshotWrapper}>
              <Image
                source={require('../../assets/images/about-us-images/Bruce_Patel.png')}
                style={styles.headshotImage}
                resizeMode="contain"
              />
            </View>
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

        {/* Testimonials */}
        <Text style={styles.sectionTitle}>What People Say:</Text>
        <View style={styles.testimonialsWrapper}>
          <FlatList
            ref={flatListRef}
            data={testimonials}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            snapToInterval={SCREEN_WIDTH - 32}
            decelerationRate="fast"
            onMomentumScrollEnd={handleScroll}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.testimonialCard}>
                <View style={styles.testimonialHeader}>
                  <View style={[styles.avatarCircle, { backgroundColor: item.avatarColor }]}>
                    <Text style={styles.avatarText}>{item.initials}</Text>
                  </View>
                  <View style={styles.testimonialMeta}>
                    <Text style={styles.testimonialName}>{item.name}</Text>
                    <Text style={styles.testimonialTime}>{item.timeAgo}</Text>
                  </View>
                </View>
                <View style={styles.starsRow}>
                  {Array.from({ length: item.stars }).map((_, i) => (
                    <Text key={i} style={styles.star}>★</Text>
                  ))}
                </View>
                <Text style={styles.testimonialText}>{item.text}</Text>
              </View>
            )}
          />
          <View style={styles.dotsContainer}>
            {testimonials.map((_, i) => (
              <TouchableOpacity key={i} onPress={() => goToSlide(i)}>
                <View style={[styles.dot, i === activeIndex && styles.dotActive]} />
              </TouchableOpacity>
            ))}
          </View>
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
    color: "#000000",
  },

  pageContainer: {
    flex: 1,
    padding: 20,
  },

  // --- Shared grid for both Meet the Team and Our Board ---
  teamRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 24,
  },

  teamCard: {
    alignItems: "center",
    flexBasis: "30%",
    flexGrow: 1,
    maxWidth: "31%",
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#f0f0f0",
    paddingBottom: 6,
  },

  // --- Headshot wrappers for all team/board images ---
  headshotWrapper: {
    width: "100%",
    aspectRatio: 1,
    backgroundColor: "#f0f0f0",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    marginBottom: 6,
  },

  headshotImage: {
    width: "100%",
    height: "100%",
  },

  personName: {
    fontSize: 11,
    fontWeight: "700",
    textAlign: "center",
    paddingHorizontal: 4,
  },

  personRole: {
    fontSize: 10,
    textAlign: "center",
    color: "#444",
    paddingHorizontal: 4,
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
    backgroundColor: "#fff",
  },

  sponsorLogoImage: {
    width: "90%",
    height: "90%",
  },

  testimonialsWrapper: {
    marginBottom: 40,
    overflow: "hidden",
  },

  testimonialCard: {
    width: SCREEN_WIDTH - 32,
    backgroundColor: "#1a1a2e",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },

  testimonialHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  avatarCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  avatarText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },

  testimonialMeta: {
    flex: 1,
  },

  testimonialName: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
  },

  testimonialTime: {
    color: "#aaa",
    fontSize: 12,
    marginTop: 2,
  },

  starsRow: {
    flexDirection: "row",
    marginBottom: 10,
  },

  star: {
    color: "#f5c518",
    fontSize: 16,
    marginRight: 2,
  },

  testimonialText: {
    color: "#ddd",
    fontSize: 14,
    lineHeight: 22,
  },

  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 14,
    gap: 8,
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ccc",
  },

  dotActive: {
    backgroundColor: "#c44a0c",
    width: 20,
    borderRadius: 4,
  },

  // About Us images (top row)
  aboutImageWrapper: {
    flex: 1,
    aspectRatio: 1.5,
    marginHorizontal: 4,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#f0f0f0",
  },

  aboutImage: {
    width: "100%",
    height: "100%",
  },
});
