import React from "react";
import { StyleSheet, View, FlatList, Text, TouchableOpacity } from "react-native";

export default function CountdownScreen({ events, navigation }) {
    const calculateTimeLeft = (date) => {
        const now = new Date();
        const targetDate = new Date(date);
        const diff = targetDate - now;

        if (diff <= 0) return "Событие прошло";

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        return `${days} дн ${hours} ч ${minutes} мин`;
    };

    const handleEventPress = (event) => {
        navigation.navigate("EventDetails", { event });
    };

    const sortedEvents = [...events].sort((a, b) => {
        const timeA = new Date(a.dateTime).getTime();
        const timeB = new Date(b.dateTime).getTime();
        return timeA - timeB;
    });

    return (
        <View style={styles.container}>
            {sortedEvents.length === 0 ? (
                <View style={styles.event}>
                    <Text style={styles.emptyText}>
                        Ещё нет ни одного события. Перейдите на страницу "Добавление", чтобы это изменить.
                    </Text>
                </View>
            ) : (
                <FlatList
                    data={sortedEvents}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => handleEventPress(item)}>
                            <View style={styles.event}>
                                <Text style={styles.title}>{item.title}</Text>
                                <Text style={styles.timeLeft}>
                                    Осталось: {calculateTimeLeft(item.dateTime)}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    event: {
        marginBottom: 15,
        padding: 15,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        backgroundColor: "#f9f9f9",
    },
    emptyText: {
        fontSize: 16,
        color: "#666",
        textAlign: "left",
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
    },
    timeLeft: {
        marginTop: 5,
        color: "#0077b6",
    },
});
