// app/get-involved.tsx
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Animated,
  Linking,
  Alert,
  Platform,
} from 'react-native';
import CustomHeader from '../../components/custom-header';

// ─── Brand Colors ──────────────────────────────────────────────────────────
const C = {
  orange: '#E87D2B',
  orangeLight: '#FEF3E8',
  orangeMid: '#F4A563',
  red: '#D64045',
  green: '#3A9E6F',
  blue: '#2B7BB0',
  dark: '#1A1A2E',
  gray: '#6B7280',
  grayLight: '#F3F4F6',
  grayBorder: '#E5E7EB',
  white: '#FFFFFF',
};

// ─── Data ──────────────────────────────────────────────────────────────────
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const VOLUNTEER_ROLES = [
  {
    id: 'gym',
    label: 'Gym Support Specialist',
    hours: 'Mon–Fri, 9am–2pm',
    description:
      'The Able Center features a gym outfitted with advanced equipment designed for individuals experiencing paralysis. In collaboration with Certified Special Population Trainers, members can enhance their strength and foster greater autonomy. Volunteers aid Trainers with member assistance and equipment oversight.',
  },
  {
    id: 'executive',
    label: 'Executive Assistance',
    hours: 'Mon–Fri, Flexible Hours',
    description:
      'Since its foundation, Able Faith has thrived on volunteer commitment. We now need more help with daily operations including email correspondence, database management, data entry, and coordination tasks to sustain our community services.',
  },
  {
    id: 'facility',
    label: 'Facility Services',
    hours: 'Flexible Days & Times',
    description:
      'Able Faith is committed to supporting individuals with neurological and physical disabilities. Volunteers play a crucial role in maintaining cleanliness at the Able Faith Center and in the upkeep of specialized exercise equipment, guaranteeing optimal workout experiences.',
  },
  {
    id: 'tech',
    label: 'Technical Support & IT',
    hours: 'Flexible Days & Times',
    description:
      'Website accessibility is critical for those with disabilities. Our dedicated volunteers maintain our web presence, ensuring equal access to scheduling, event information, and resources — reflecting our commitment to inclusivity both online and offline.',
  },
  {
    id: 'marketing',
    label: 'Marketing & Communication',
    hours: 'Flexible Days & Times',
    description:
      'Our outreach extends through diverse channels including digital media and public relations to share our mission and events. Volunteers contribute to social media management, content creation, and more, helping foster a welcoming community where all members can thrive.',
  },
];

const HOW_OPTIONS = [
  'Social Media',
  'Friend / Family',
  'Google Search',
  'Church',
  'Doctor / Hospital',
  'Other',
];

// ─── Sub-components ────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: string }) {
  return <Text style={styles.label}>{children}</Text>;
}

function StyledInput({
  placeholder,
  value,
  onChangeText,
  multiline,
  keyboardType,
  autoCapitalize,
}: {
  placeholder: string;
  value: string;
  onChangeText: (v: string) => void;
  multiline?: boolean;
  keyboardType?: any;
  autoCapitalize?: any;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <TextInput
      style={[styles.input, multiline && styles.inputMulti, focused && styles.inputFocused]}
      placeholder={placeholder}
      placeholderTextColor={C.gray}
      value={value}
      onChangeText={onChangeText}
      multiline={multiline}
      numberOfLines={multiline ? 4 : 1}
      keyboardType={keyboardType || 'default'}
      autoCapitalize={autoCapitalize || 'sentences'}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      textAlignVertical={multiline ? 'top' : 'center'}
    />
  );
}

function CheckBox({
  label,
  checked,
  onToggle,
  small,
}: {
  label: string;
  checked: boolean;
  onToggle: () => void;
  small?: boolean;
}) {
  return (
    <TouchableOpacity style={styles.checkRow} onPress={onToggle} activeOpacity={0.7}>
      <View style={[styles.checkbox, checked && styles.checkboxChecked, small && styles.checkboxSmall]}>
        {checked && <Text style={styles.checkmark}>✓</Text>}
      </View>
      <Text style={[styles.checkLabel, small && styles.checkLabelSmall]}>{label}</Text>
    </TouchableOpacity>
  );
}

function RoleCard({ role, selected, onToggle }: { role: typeof VOLUNTEER_ROLES[0]; selected: boolean; onToggle: () => void }) {
  return (
    <TouchableOpacity
      style={[styles.roleCard, selected && styles.roleCardSelected]}
      onPress={onToggle}
      activeOpacity={0.85}
    >
      <View style={styles.roleCardHeader}>
        <View style={[styles.roleCheckbox, selected && styles.roleCheckboxSelected]}>
          {selected && <Text style={styles.roleCheckmark}>✓</Text>}
        </View>
        <View style={styles.roleTitleBlock}>
          <Text style={[styles.roleLabel, selected && styles.roleLabelSelected]}>{role.label}</Text>
          <Text style={styles.roleHours}>{role.hours}</Text>
        </View>
      </View>
      <Text style={styles.roleDesc}>{role.description}</Text>
    </TouchableOpacity>
  );
}

function DropdownSimple({
  value,
  onSelect,
}: {
  value: string;
  onSelect: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <View>
      <TouchableOpacity
        style={[styles.input, styles.dropdown]}
        onPress={() => setOpen(!open)}
        activeOpacity={0.8}
      >
        <Text style={value ? styles.dropdownValue : styles.dropdownPlaceholder}>
          {value || 'Select an option'}
        </Text>
        <Text style={styles.dropdownArrow}>{open ? '▲' : '▼'}</Text>
      </TouchableOpacity>
      {open && (
        <View style={styles.dropdownMenu}>
          {HOW_OPTIONS.map((opt) => (
            <TouchableOpacity
              key={opt}
              style={styles.dropdownItem}
              onPress={() => { onSelect(opt); setOpen(false); }}
            >
              <Text style={[styles.dropdownItemText, value === opt && styles.dropdownItemSelected]}>
                {opt}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

// ─── Main Screen ───────────────────────────────────────────────────────────
export default function GetInvolvedScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(24)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 600, useNativeDriver: true }),
    ]).start();
  }, []);

  // ── Form state ────────────────────────────────────────────────────────────
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [howHeard, setHowHeard] = useState('');
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [firstChoice, setFirstChoice] = useState('');
  const [aboutYou, setAboutYou] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const toggleDay = (d: string) =>
    setSelectedDays((prev) => prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d]);

  const toggleRole = (id: string) =>
    setSelectedRoles((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);

  // ── Submit via mailto ─────────────────────────────────────────────────────
  const handleSubmit = async () => {
    if (!firstName.trim() || !lastName.trim() || !email.trim() || !phone.trim()) {
      Alert.alert('Missing Information', 'Please fill in all required fields (name, email, phone).');
      return;
    }
    if (selectedDays.length === 0) {
      Alert.alert('Missing Information', 'Please select at least one available day.');
      return;
    }
    if (selectedRoles.length === 0) {
      Alert.alert('Missing Information', 'Please select at least one volunteer area.');
      return;
    }

    setSubmitting(true);

    const roleLabels = selectedRoles.map(
      (id) => VOLUNTEER_ROLES.find((r) => r.id === id)?.label ?? id
    );

    const body = [
      `First Name: ${firstName}`,
      `Last Name: ${lastName}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      `How They Heard: ${howHeard || 'Not specified'}`,
      ``,
      `Available Days: ${selectedDays.join(', ')}`,
      ``,
      `Volunteer Interests: ${roleLabels.join(', ')}`,
      selectedRoles.length > 1 ? `First Choice: ${firstChoice || 'Not specified'}` : '',
      ``,
      `About: ${aboutYou || 'Not provided'}`,
    ]
      .filter((l) => l !== undefined)
      .join('\n');

    const subject = encodeURIComponent(`Volunteer Application – ${firstName} ${lastName}`);
    const encodedBody = encodeURIComponent(body);
    const mailtoUrl = `mailto:info@ablefaith.org?subject=${subject}&body=${encodedBody}`;

    try {
      const supported = await Linking.canOpenURL(mailtoUrl);
      if (supported) {
        await Linking.openURL(mailtoUrl);
      } else {
        Alert.alert(
          'Email Not Available',
          'No email app found. Please contact us directly at info@ablefaith.org'
        );
      }
    } catch {
      Alert.alert('Error', 'Could not open email app. Please contact info@ablefaith.org directly.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
      <CustomHeader />

      {/* ── Hero ── */}
      <View style={styles.hero}>
        <View style={styles.heroAccentRow}>
          {[C.red, C.orange, C.green, C.blue].map((c, i) => (
            <View key={i} style={[styles.heroPill, { backgroundColor: c }]} />
          ))}
        </View>
        <Text style={styles.heroEyebrow}>VOLUNTEER WITH US</Text>
        <Text style={styles.heroTitle}>Get Involved</Text>
        <Text style={styles.heroBody}>
          At Able Faith, we're more than an organization — we're a vibrant community dedicated to making a tangible difference in the lives of those affected by neurological disabilities. As a volunteer, you become a crucial part of our journey, contributing to life-changing programs that uplift, educate, and empower.
        </Text>
      </View>

      {/* ── Role Cards ── */}
      <Animated.View style={[styles.section, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
        <View style={styles.sectionHeader}>
          <View style={[styles.sectionAccent, { backgroundColor: C.orange }]} />
          <Text style={styles.sectionTitle}>Volunteer Role Summaries</Text>
        </View>
        <Text style={styles.sectionNote}>
          Volunteers are welcome to contribute their time according to their availability, without the need to commit to every offered day or time slot.
        </Text>
        {VOLUNTEER_ROLES.map((role) => (
          <RoleCard
            key={role.id}
            role={role}
            selected={selectedRoles.includes(role.id)}
            onToggle={() => toggleRole(role.id)}
          />
        ))}
      </Animated.View>

      {/* ── Form ── */}
      <Animated.View style={[styles.section, { opacity: fadeAnim }]}>
        <View style={styles.sectionHeader}>
          <View style={[styles.sectionAccent, { backgroundColor: C.blue }]} />
          <Text style={styles.sectionTitle}>Your Information</Text>
        </View>

        {/* Name row */}
        <View style={styles.row}>
          <View style={styles.halfField}>
            <SectionLabel>First Name *</SectionLabel>
            <StyledInput placeholder="Enter your first name" value={firstName} onChangeText={setFirstName} />
          </View>
          <View style={styles.halfField}>
            <SectionLabel>Last Name *</SectionLabel>
            <StyledInput placeholder="Enter your last name" value={lastName} onChangeText={setLastName} />
          </View>
        </View>

        {/* Email */}
        <SectionLabel>Email *</SectionLabel>
        <StyledInput
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        {/* Phone + How heard */}
        <View style={styles.row}>
          <View style={styles.halfField}>
            <SectionLabel>Phone *</SectionLabel>
            <StyledInput
              placeholder="Enter your phone number"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />
          </View>
          <View style={styles.halfField}>
            <SectionLabel>How did you hear about Able Faith?</SectionLabel>
            <DropdownSimple value={howHeard} onSelect={setHowHeard} />
          </View>
        </View>

        {/* Available days */}
        <SectionLabel>Which days are you available? *</SectionLabel>
        <View style={styles.daysRow}>
          {DAYS.map((d) => (
            <CheckBox
              key={d}
              label={d}
              checked={selectedDays.includes(d)}
              onToggle={() => toggleDay(d)}
              small
            />
          ))}
        </View>

        {/* Volunteer areas */}
        <SectionLabel>In which area are you interested in volunteering your time and skills? *</SectionLabel>
        <Text style={styles.hintText}>(Tap a role card above to select, or use checkboxes below)</Text>
        {VOLUNTEER_ROLES.map((role) => (
          <CheckBox
            key={role.id}
            label={role.label}
            checked={selectedRoles.includes(role.id)}
            onToggle={() => toggleRole(role.id)}
          />
        ))}

        {/* First choice if multiple */}
        {selectedRoles.length > 1 && (
          <>
            <SectionLabel>If you selected multiple areas, what is your first choice?</SectionLabel>
            <StyledInput
              placeholder="e.g. Gym Support Specialist"
              value={firstChoice}
              onChangeText={setFirstChoice}
            />
          </>
        )}

        {/* About */}
        <SectionLabel>A few words about you</SectionLabel>
        <StyledInput
          placeholder="Tell us a bit about yourself"
          value={aboutYou}
          onChangeText={setAboutYou}
          multiline
        />

        {/* Submit */}
        <TouchableOpacity
          style={[styles.submitButton, submitting && styles.submitButtonDisabled]}
          onPress={handleSubmit}
          activeOpacity={0.85}
          disabled={submitting}
        >
          <Text style={styles.submitText}>
            {submitting ? 'Opening Email...' : 'Submit Request →'}
          </Text>
        </TouchableOpacity>

        <Text style={styles.submitNote}>
          Tapping "Submit Request" will open your email app with a pre-filled message to info@ablefaith.org
        </Text>
      </Animated.View>

      {/* ── Footer info ── */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Questions? Reach us at info@ablefaith.org</Text>
        <Text style={styles.footerText}>4350 Sigma Road, Ste 100 · Dallas, TX 75244</Text>
      </View>
    </ScrollView>
  );
}

// ─── Styles ────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: C.grayLight,
  },

  // Hero
  hero: {
    backgroundColor: C.dark,
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 36,
  },
  heroAccentRow: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 18,
  },
  heroPill: {
    width: 26,
    height: 5,
    borderRadius: 3,
  },
  heroEyebrow: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 3,
    color: C.orange,
    marginBottom: 6,
  },
  heroTitle: {
    fontSize: 36,
    fontWeight: '800',
    color: C.white,
    marginBottom: 14,
  },
  heroBody: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.72)',
    lineHeight: 22,
  },

  // Section
  section: {
    backgroundColor: C.white,
    margin: 16,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    gap: 10,
  },
  sectionAccent: {
    width: 4,
    height: 22,
    borderRadius: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: C.dark,
  },
  sectionNote: {
    fontSize: 13,
    color: C.gray,
    fontStyle: 'italic',
    lineHeight: 19,
    marginBottom: 16,
  },

  // Role card
  roleCard: {
    borderWidth: 1.5,
    borderColor: C.grayBorder,
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    backgroundColor: C.grayLight,
  },
  roleCardSelected: {
    borderColor: C.orange,
    backgroundColor: '#FEF3E8',
  },
  roleCardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
    gap: 10,
  },
  roleCheckbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: C.grayBorder,
    backgroundColor: C.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },
  roleCheckboxSelected: {
    borderColor: C.orange,
    backgroundColor: C.orange,
  },
  roleCheckmark: {
    color: C.white,
    fontSize: 13,
    fontWeight: '800',
  },
  roleTitleBlock: {
    flex: 1,
  },
  roleLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: C.dark,
  },
  roleLabelSelected: {
    color: C.orange,
  },
  roleHours: {
    fontSize: 11,
    color: C.gray,
    marginTop: 1,
    fontStyle: 'italic',
  },
  roleDesc: {
    fontSize: 12,
    color: C.gray,
    lineHeight: 18,
  },

  // Form inputs
  label: {
    fontSize: 13,
    fontWeight: '700',
    color: C.dark,
    marginTop: 14,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1.5,
    borderColor: C.grayBorder,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: Platform.OS === 'ios' ? 12 : 8,
    fontSize: 14,
    color: C.dark,
    backgroundColor: C.white,
  },
  inputFocused: {
    borderColor: C.orange,
  },
  inputMulti: {
    height: 100,
    paddingTop: 12,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  halfField: {
    flex: 1,
  },

  // Days checkboxes
  daysRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 4,
  },
  checkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: C.grayBorder,
    backgroundColor: C.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxSmall: {
    width: 18,
    height: 18,
    borderRadius: 4,
  },
  checkboxChecked: {
    borderColor: C.orange,
    backgroundColor: C.orange,
  },
  checkmark: {
    color: C.white,
    fontSize: 12,
    fontWeight: '800',
  },
  checkLabel: {
    fontSize: 14,
    color: C.dark,
  },
  checkLabelSmall: {
    fontSize: 13,
    color: C.dark,
  },

  // Dropdown
  dropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownPlaceholder: {
    color: C.gray,
    fontSize: 14,
    flex: 1,
  },
  dropdownValue: {
    color: C.dark,
    fontSize: 14,
    flex: 1,
  },
  dropdownArrow: {
    fontSize: 10,
    color: C.gray,
    marginLeft: 6,
  },
  dropdownMenu: {
    borderWidth: 1.5,
    borderColor: C.orange,
    borderRadius: 8,
    backgroundColor: C.white,
    marginTop: 4,
    overflow: 'hidden',
    zIndex: 99,
  },
  dropdownItem: {
    paddingHorizontal: 14,
    paddingVertical: 11,
    borderBottomWidth: 1,
    borderBottomColor: C.grayBorder,
  },
  dropdownItemText: {
    fontSize: 14,
    color: C.dark,
  },
  dropdownItemSelected: {
    color: C.orange,
    fontWeight: '700',
  },

  hintText: {
    fontSize: 12,
    color: C.gray,
    fontStyle: 'italic',
    marginBottom: 8,
    marginTop: -6,
  },

  // Submit
  submitButton: {
    backgroundColor: C.orange,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 24,
    shadowColor: C.orange,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 4,
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitText: {
    color: C.white,
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.4,
  },
  submitNote: {
    fontSize: 11,
    color: C.gray,
    textAlign: 'center',
    marginTop: 10,
    lineHeight: 16,
  },

  // Footer
  footer: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 20,
    gap: 4,
  },
  footerText: {
    fontSize: 12,
    color: C.gray,
    textAlign: 'center',
  },
});
