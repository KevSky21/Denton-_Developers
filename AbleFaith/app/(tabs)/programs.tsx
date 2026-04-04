// app/programs.tsx
import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  Animated,
  Dimensions,
} from 'react-native';
import CustomHeader from '../../components/custom-header';

const { width } = Dimensions.get('window');

// ─── Color palette from Able Faith brand ───────────────────────────────────
const COLORS = {
  red: '#D64045',
  orange: '#E87D2B',
  green: '#3A9E6F',
  blue: '#2B7BB0',
  lightRed: '#FDECEA',
  lightOrange: '#FEF3E8',
  lightGreen: '#E8F6EF',
  lightBlue: '#E8F2FA',
  dark: '#1A1A2E',
  gray: '#6B7280',
  lightGray: '#F3F4F6',
  white: '#FFFFFF',
};

// ─── Program data ──────────────────────────────────────────────────────────
const PROGRAMS = [
  {
    id: 'connection',
    tag: 'COMMUNITY',
    title: 'Connection Events & Lunches',
    subtitle: 'Find Your Tribe',
    description:
      'Step into a welcoming space where you can increase courage, build confidence, and connect with others. Whether gathering at the Able Faith Center or venturing out as a group, our events are designed to provide a sense of community.',
    quote:
      '"An Able Faith movie event was the first time I really went out of the house after my injury, and it gave me the confidence to get back out in the world again."',
    accent: COLORS.orange,
    light: COLORS.lightOrange,
    ctas: [{ label: 'View Calendar', url: 'https://www.ablefaith.org/calendar' }],
  },
  {
    id: 'smallgroups',
    tag: 'VIRTUAL',
    title: 'Small Groups',
    subtitle: 'A Virtual Haven of Connection & Support',
    description:
      'Looking to build a supportive community with others who truly understand the journey of neurological disabilities? Our virtual small groups offer a welcoming space for individuals and caregivers alike — no transportation needed.',
    details:
      'Each session lasts an hour: the first 30 minutes focus on community, the latter half on faith-based discussion.',
    accent: COLORS.blue,
    light: COLORS.lightBlue,
    ctas: [{ label: 'View Calendar', url: 'https://www.ablefaith.org/calendar' }],
  },
  {
    id: 'respite',
    tag: 'CARE',
    title: 'Respite Meals',
    subtitle: 'Take Some "Me" Time',
    description:
      'Take a pause from the kitchen chaos with Able Faith\'s Respite Meal Program. A sophisticated 3-course family-style dinner crafted by the culinary artisans at ChefNIC & Company — bread, salad, entrée, starch, vegetable, dessert, and a choice of sweet tea or lemonade.',
    quote:
      '"We had conversations with someone who cared and even joined a bible study. Connections mean so much when you\'ve gone from being the life of the party to being isolated for so long."',
    accent: COLORS.red,
    light: COLORS.lightRed,
    ctas: [
      { label: 'Request a Meal', url: 'https://www.ablefaith.org/copy-of-volunteer' },
      { label: 'Donate', url: 'https://ablefaith.networkforgood.com/projects/216640-help-able-faith-make-a-difference-2024' },
    ],
  },
  {
    id: 'grants',
    tag: 'FINANCIAL',
    title: 'Quality of Life Grants',
    subtitle: 'You Are Able & We\'re Here to Help',
    description:
      'If you\'re facing hurdles like medical expenses, adaptive equipment costs, or unforeseen events, the Able Faith Quality of Life Program is designed with you in mind. Our grants are tailored to support your real needs.',
    accent: COLORS.green,
    light: COLORS.lightGreen,

    ctas: [{ label: 'Apply Now', url: 'https://forms.gle/Ztsv7MpzfB7ecB5g9' }],
  },
  {
    id: 'sharethecare',
    tag: 'CAREGIVERS',
    title: 'Share the Care Program',
    subtitle: 'Empowering Caregivers with Community',
    description:
      'Created to empower and foster a strong sense of community among informal caregivers, this program provides a vast array of resources and networks, connecting caregivers with others who understand their journey.',
    quote:
      '"I can\'t express how much Able Faith has helped my son and me get through the last few years."',
    details:
      'We offer emotional well-being support, resource networks, and education — equipping caregivers to care for both their loved ones and themselves.',
    accent: COLORS.orange,
    light: COLORS.lightOrange,
    ctas: [{ label: 'Connect with an Ambassador', url: 'mailto:info@ablefaith.org?subject=Share The Care Program' }],
  },
  {
    id: 'adaptive',
    tag: 'FITNESS',
    title: 'Adaptive Physical Training',
    subtitle: 'Build Strength & Community',
    description:
      'Build strength and community by participating in small group training at the Able Faith Center. Family members can run an errand or just rest while you work out. Programs are tailored to your specific needs.',
    quote:
      '"Adaptive workouts for spinal cord injury patients are essential but extremely expensive. We\'re grateful Able Faith exists to provide resources and trainers to fill in the gap."',
    accent: COLORS.blue,
    light: COLORS.lightBlue,
    ctas: [
      { label: 'Member Login', url: 'https://able-faith-center.gymdesk.com/login' },
      { label: 'Apply', url: 'https://docs.google.com/forms/d/1hWwjMHz7hoPKaAvEnJA0KZTN3S17F8mTZaCfFbeONS8/viewform?edit_requested=true' },
    ],
  },
  {
    id: 'center',
    tag: 'HUB',
    title: 'The Able Faith Center',
    subtitle: 'The Heart of It All',
    description:
      'More than just an office, this space is a hub of support, connection, and hope for individuals with neurological disabilities and their caregivers. A vibrant home for operations, training, and monthly events — designed with you in mind.',
    details: '4350 Sigma Road, Ste 100, Dallas, TX 75244',
    accent: COLORS.red,
    light: COLORS.lightRed,
    ctas: [
      { label: "Let Us Know You're Coming", url: 'mailto:INFO@ABLEFAITH.ORG' },
      { label: 'Donate', url: 'https://ablefaith.networkforgood.com/projects/216640-help-able-faith-make-a-difference-2024' },
    ],
  },
];

// ─── Animated Program Card ─────────────────────────────────────────────────
function ProgramCard({ program, index }: { program: typeof PROGRAMS[0]; index: number }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        delay: index * 80,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        delay: index * 80,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handlePress = (url: string) => {
    Linking.openURL(url).catch(() => {});
  };

  return (
    <Animated.View
      style={[
        styles.card,
        { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
      ]}
    >
      {/* Colored top bar */}
      <View style={[styles.cardTopBar, { backgroundColor: program.accent }]} />

      <View style={styles.cardBody}>
        {/* Tag + Icon row */}
        <View style={styles.cardHeaderRow}>
          <View style={[styles.tagBadge, { backgroundColor: program.light }]}>
            <Text style={[styles.tagText, { color: program.accent }]}>{program.tag}</Text>
          </View>
          <Text style={styles.cardIcon}>{program.icon}</Text>
        </View>

        {/* Title */}
        <Text style={styles.cardTitle}>{program.title}</Text>
        <Text style={[styles.cardSubtitle, { color: program.accent }]}>{program.subtitle}</Text>

        {/* Divider */}
        <View style={[styles.divider, { backgroundColor: program.accent }]} />

        {/* Description */}
        <Text style={styles.cardDescription}>{program.description}</Text>

        {/* Extra details if any */}
        {program.details && (
          <Text style={styles.cardDetails}>{program.details}</Text>
        )}

        {/* Quote block */}
        {program.quote && (
          <View style={[styles.quoteBlock, { borderLeftColor: program.accent, backgroundColor: program.light }]}>
            <Text style={[styles.quoteText, { color: program.accent }]}>{program.quote}</Text>
          </View>
        )}

        {/* CTA Buttons */}
        <View style={styles.ctaRow}>
          {program.ctas.map((cta, i) => (
            <TouchableOpacity
              key={i}
              style={[
                styles.ctaButton,
                i === 0
                  ? { backgroundColor: program.accent }
                  : [styles.ctaButtonOutline, { borderColor: program.accent }],
              ]}
              onPress={() => handlePress(cta.url)}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.ctaButtonText,
                  i !== 0 && { color: program.accent },
                ]}
              >
                {cta.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Animated.View>
  );
}

// ─── Main Screen ───────────────────────────────────────────────────────────
export default function ProgramsScreen() {
  const headerFade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(headerFade, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <CustomHeader />

      {/* Hero Section */}
      <Animated.View style={[styles.hero, { opacity: headerFade }]}>
        {/* Decorative colored pills */}
        <View style={styles.pillRow}>
          {[COLORS.red, COLORS.orange, COLORS.green, COLORS.blue].map((c, i) => (
            <View key={i} style={[styles.pill, { backgroundColor: c }]} />
          ))}
        </View>

        <Text style={styles.heroEyebrow}>ABLE FAITH</Text>
        <Text style={styles.heroTitle}>Discover Our{'\n'}Programs</Text>
        <Text style={styles.heroSubtitle}>
          Community, hope, and support for individuals with neurological disabilities and their caregivers.
        </Text>

        {/* Color-coded category pills */}
        <View style={styles.categoryRow}>
          {[
            { label: 'Community', color: COLORS.orange },
            { label: 'Care', color: COLORS.red },
            { label: 'Fitness', color: COLORS.blue },
            { label: 'Grants', color: COLORS.green },
          ].map((cat) => (
            <View key={cat.label} style={[styles.categoryChip, { backgroundColor: cat.color }]}>
              <Text style={styles.categoryChipText}>{cat.label}</Text>
            </View>
          ))}
        </View>
      </Animated.View>

      {/* Program Cards */}
      <View style={styles.cardsContainer}>
        {PROGRAMS.map((program, index) => (
          <ProgramCard key={program.id} program={program} index={index} />
        ))}
      </View>

      {/* Footer CTA */}
      <View style={styles.footer}>
        <View style={styles.footerAccentBar}>
          {[COLORS.red, COLORS.orange, COLORS.green, COLORS.blue].map((c, i) => (
            <View key={i} style={[styles.footerBarSegment, { backgroundColor: c }]} />
          ))}
        </View>
        <Text style={styles.footerTitle}>Ready to Join Us?</Text>
        <Text style={styles.footerSubtitle}>
          Our mission: helping people with neurological disabilities become more mobile, more engaged, and better supported.
        </Text>
        <TouchableOpacity
          style={styles.footerButton}
          onPress={() => Linking.openURL('https://www.ablefaith.org/join-a-program')}
          activeOpacity={0.85}
        >
          <Text style={styles.footerButtonText}>Join a Program →</Text>
        </TouchableOpacity>
        <Text style={styles.footerContact}>info@ablefaith.org  ·  Dallas, TX</Text>
      </View>
    </ScrollView>
  );
}

// ─── Styles ────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray,
  },

  // ── Hero ──────────────────────────────────────────────────────────────────
  hero: {
    backgroundColor: COLORS.dark,
    paddingHorizontal: 24,
    paddingTop: 36,
    paddingBottom: 40,
  },
  pillRow: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 20,
  },
  pill: {
    width: 28,
    height: 6,
    borderRadius: 3,
  },
  heroEyebrow: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 3,
    color: COLORS.orange,
    marginBottom: 8,
  },
  heroTitle: {
    fontSize: 38,
    fontWeight: '800',
    color: COLORS.white,
    lineHeight: 44,
    marginBottom: 14,
  },
  heroSubtitle: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.7)',
    lineHeight: 22,
    marginBottom: 22,
  },
  categoryRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryChip: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
  },
  categoryChipText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.5,
  },

  // ── Cards ─────────────────────────────────────────────────────────────────
  cardsContainer: {
    padding: 16,
    gap: 16,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  cardTopBar: {
    height: 5,
    width: '100%',
  },
  cardBody: {
    padding: 20,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  tagBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  tagText: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.5,
  },
  cardIcon: {
    fontSize: 28,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.dark,
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 14,
  },
  divider: {
    height: 2,
    width: 36,
    borderRadius: 1,
    marginBottom: 14,
  },
  cardDescription: {
    fontSize: 14,
    color: COLORS.gray,
    lineHeight: 21,
    marginBottom: 12,
  },
  cardDetails: {
    fontSize: 13,
    color: COLORS.gray,
    lineHeight: 19,
    fontStyle: 'italic',
    marginBottom: 12,
  },
  quoteBlock: {
    borderLeftWidth: 3,
    borderRadius: 6,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 16,
  },
  quoteText: {
    fontSize: 13,
    fontStyle: 'italic',
    lineHeight: 20,
    fontWeight: '500',
  },
  ctaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 4,
  },
  ctaButton: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 8,
  },
  ctaButtonOutline: {
    borderWidth: 1.5,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 8,
  },
  ctaButtonText: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: '700',
  },

  // ── Footer ────────────────────────────────────────────────────────────────
  footer: {
    backgroundColor: COLORS.dark,
    margin: 16,
    borderRadius: 16,
    overflow: 'hidden',
    padding: 28,
    marginBottom: 32,
    alignItems: 'center',
  },
  footerAccentBar: {
    flexDirection: 'row',
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
    width: '60%',
    marginBottom: 22,
  },
  footerBarSegment: {
    flex: 1,
  },
  footerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.white,
    textAlign: 'center',
    marginBottom: 10,
  },
  footerSubtitle: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.65)',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 22,
  },
  footerButton: {
    backgroundColor: COLORS.orange,
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 10,
    marginBottom: 16,
  },
  footerButtonText: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  footerContact: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.4)',
  },
});