// app/(tabs)/events.tsx

import React, { useState } from "react";
import {
  View,
  Text,
  Switch,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { useRouter } from "expo-router";
import CustomHeader from '../../components/custom-header';
import * as Notifications from "expo-notifications";

interface EventItem {
  id: string;
  title: string;
  time: string;
  remind: boolean;
}

type EventsByDate = Record<string, EventItem[]>;

export default function EventPage() {
  const router = useRouter();

  const [selectedDate, setSelectedDate] = useState("2026-03-03");

const [events, setEvents] = useState<EventsByDate>({
  "2026-03-03": [
    { id: "1", title: "Potluck", time: "2:00 PM", remind: false },
    { id: "2", title: "Game Night", time: "5:00 PM", remind: false },
    { id: "3", title: "Bible Study", time: "6:30 PM", remind: false },
  ],
});

  const todayEvents = events[selectedDate] || [];

  const toggleReminder = (eventId: string, date: string) => {
	setEvents((prevEvents) => {
      const dayEvents = prevEvents[date] || [];

      const updatedDay = dayEvents.map((event) =>
        event.id === eventId
          ? { ...event, remind: !event.remind }
          : event
      );

      return {
        ...prevEvents,
        [date]: updatedDay,
      };
    });
  };

return (
  <ScrollView style={styles.container}>
    <CustomHeader />

    <Calendar
      onDayPress={(day) => setSelectedDate(day.dateString)}
      markedDates={{
        [selectedDate]: {
          selected: true,
          selectedColor: "#00adf5",
        },
      }}
    />

    <View style={styles.eventsContainer}>
      {todayEvents.length === 0 ? (
        <Text style={styles.noEventsText}>
          No events for this date.
        </Text>
      ) : (
        todayEvents.map((event) => (
          <View key={event.id} style={styles.eventCard}>
            <Text style={styles.eventTime}>{event.time}</Text>
            <Text style={styles.eventTitle}>{event.title}</Text>

            <Switch
              value={event.remind}
              onValueChange={() => toggleReminder(event.id, selectedDate)}
            />
          </View>
        ))
      )}
    </View>
  </ScrollView>
);
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  eventsContainer: {
    padding: 16,
  },
  noEventsText: {
    fontSize: 16,
    color: "gray",
    textAlign: "center",
    marginTop: 20,
  },
  eventCard: {
    marginBottom: 20,
  },
  eventTime: {
    fontSize: 14,
    color: "#555",
  },
  eventTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 5,
  },
});