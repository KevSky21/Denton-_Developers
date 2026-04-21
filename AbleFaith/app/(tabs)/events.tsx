// app/(tabs)/events.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  Switch,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { useRouter } from "expo-router";
import CustomHeader from "../../components/custom-header";
import * as Notifications from "expo-notifications";

interface EventItem {
  id: string;
  title: string;
  time: string;
  remind: boolean;
}

interface AppNotification {
  id: string;
  title: string;
  body: string;
  date: string;
}

type EventsByDate = Record<string, EventItem[]>;

export default function EventPage() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState("2026-03-03");
  const [notifications, setNotifications] = useState<AppNotification[]>([]);

  const [events, setEvents] = useState<EventsByDate>({
    "2026-04-24": [
      { id: "1", title: "Potluck", time: "2:00 PM", remind: false },
      { id: "2", title: "Game Night", time: "5:00 PM", remind: false },
      { id: "3", title: "Bible Study", time: "6:30 PM", remind: false },
    ],
  });

  const todayEvents = events[selectedDate] || [];

  const toggleReminder = (eventId: string, date: string) => {
    const dayEvents = events[date] || [];

    const updatedDay = dayEvents.map((event) => {
      if (event.id !== eventId) return event;

      if (!event.remind) {
        // Schedule a simulated in-app notification after 5 seconds
        setTimeout(() => {
          const newNotification: AppNotification = {
            id: Date.now().toString(),
            title: "Event Reminder",
            body: `${event.title} is happening soon!`,
            date: new Date().toLocaleString(),
          };

          setNotifications((prev) => [newNotification, ...prev]);

          // Use Alert instead of alert() for React Native compatibility
          Alert.alert(
            "🔔 Event Reminder",
            `${event.title} is happening soon!`,
            [{ text: "OK" }]
          );
        }, 5000); // 5 seconds for testing

        return { ...event, remind: true };
      }

      return { ...event, remind: false };
    });

    setEvents({
      ...events,
      [date]: updatedDay,
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

      {/* In-app notification banner — shows the most recent notification */}
      {notifications.length > 0 && (
        <View style={styles.notificationBanner}>
          <Text style={styles.notificationTitle}>
            🔔 {notifications[0].title}
          </Text>
          <Text style={styles.notificationBody}>{notifications[0].body}</Text>
          <Text style={styles.notificationDate}>{notifications[0].date}</Text>
        </View>
      )}

      <View style={styles.eventsContainer}>
        {todayEvents.length === 0 ? (
          <Text style={styles.noEventsText}>No events for this date.</Text>
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
  notificationBanner: {
    margin: 16,
    padding: 12,
    backgroundColor: "#e8f4fd",
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: "#00adf5",
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0077b6",
    marginBottom: 2,
  },
  notificationBody: {
    fontSize: 14,
    color: "#333",
  },
  notificationDate: {
    fontSize: 12,
    color: "#888",
    marginTop: 4,
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