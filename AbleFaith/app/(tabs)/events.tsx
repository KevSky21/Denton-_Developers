// app/events.tsx
import React, { useState } from "react";
import { View, Text, Switch, StyleSheet, ScrollView } from "react-native";
import { Calendar } from "react-native-calendars";

interface EventItem {
  title: string;
  time: string;
  remind: boolean;
}

export default function EventPage() {
  const [selectedDate, setSelectedDate] = useState("2025-04-10");

  // TEMP hard-coded events (later you can fetch these)
  const events: Record<string, EventItem[]> = {
    "2025-04-10": [
      { title: "Potluck", time: "2:00 PM", remind: true },
      { title: "Game Night", time: "5:00 PM", remind: false },
    ],
  };

  const todayEvents = events[selectedDate] || [];

  const toggleReminder = (index: number) => {
    todayEvents[index].remind = !todayEvents[index].remind;
  };

  return (
    <ScrollView style={styles.container}>
      {/* Calendar */}
      <Calendar
        onDayPress={(day) => setSelectedDate(day.dateString)}
        markedDates={{
          [selectedDate]: { selected: true, selectedColor: "#00adf5" },
        }}
        style={styles.calendar}
      />

      {/* Events section */}
      <View style={styles.eventsContainer}>
        {todayEvents.length === 0 ? (
          <Text style={styles.noEventsText}>No events for this day.</Text>
        ) : (
          todayEvents.map((event, index) => (
            <View key={index} style={styles.eventCard}>
              <View style={styles.eventHeader}>
                <Text style={styles.eventTime}>{event.time}</Text>
                <View style={styles.remindContainer}>
                  <Text style={styles.remindLabel}>Remind me</Text>
                  <Switch
                    value={event.remind}
                    onValueChange={() => toggleReminder(index)}
                  />
                </View>
              </View>

              <Text style={styles.eventTitle}>{event.title}</Text>

              <View style={styles.line} />
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  calendar: {
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  eventsContainer: { padding: 16 },
  noEventsText: {
    fontSize: 16,
    color: "gray",
    textAlign: "center",
    marginTop: 20,
  },
  eventCard: { marginBottom: 20 },
  eventHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  eventTime: { fontSize: 14, color: "#555" },
  remindContainer: { flexDirection: "row", alignItems: "center" },
  remindLabel: { marginRight: 8, fontSize: 14 },
  eventTitle: { fontSize: 20, fontWeight: "600", marginTop: 5 },
  line: {
    marginTop: 10,
    height: 1,
    backgroundColor: "#ccc",
    width: "100%",
  },
});
