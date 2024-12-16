import React from "react";
import { StyleSheet, View, Alert } from "react-native";
import { Calendar } from "react-native-calendars";
import { useNavigation } from "@react-navigation/native";

export default function CalendarScreen({ events, onEdit, onDelete }) {
    const navigation = useNavigation();

    const markedDates = events.reduce((acc, event) => {
        let dateObject;
        if (typeof event.dateTime === "string") {
            dateObject = new Date(event.dateTime);
        } else {
            dateObject = event.dateTime; 
        }

        if (dateObject instanceof Date && !isNaN(dateObject)) {
            const date = dateObject.toISOString().split("T")[0];
            acc[date] = { marked: true, dotColor: "blue" };
        }
        return acc;
    }, {});

    const handleDayPress = (day) => {
        const event = events.find((e) => {
            const dateObject =
                typeof e.dateTime === "string" ? new Date(e.dateTime) : e.dateTime;

            if (dateObject instanceof Date && !isNaN(dateObject)) {
                return dateObject.toISOString().split("T")[0] === day.dateString;
            }
            return false;
        });

        if (event) {
            navigation.navigate("EventDetails", {
                event,
                onEdit,
                onDelete,
            });
        } else {
            Alert.alert("Нет событий", "На выбранную дату событий нет.");
        }
    };

    return (
        <View style={styles.container}>
            <Calendar
                markedDates={markedDates}
                onDayPress={handleDayPress}
                enableSwipeMonths={true}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
});
