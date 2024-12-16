import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Alert } from "react-native";
import CustomButton from "./CustomButton";
import DateTimeInput from "./DateTimeInput";

export default function EventDetailsScreen({ route, navigation }) {
    const { event, onDelete, onEdit } = route.params;
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(event.title);
    const [description, setDescription] = useState(event.description || "");

    const initialDate = new Date(event.dateTime).toLocaleDateString("ru-RU");
    const initialTime = new Date(event.dateTime).toLocaleTimeString("ru-RU", {
        hour: "2-digit",
        minute: "2-digit",
    });
    const [dateTime, setDateTime] = useState({ date: initialDate, time: initialTime });

    const handleSave = () => {
        if (!title || !dateTime.date || !dateTime.time) {
            Alert.alert("Ошибка", "Пожалуйста, заполните все поля.");
            return;
        }

        const [day, month, year] = dateTime.date.split(".");
        const [hour, minute] = dateTime.time.split(":");
        const finalDateTime = new Date(year, month - 1, day, hour, minute);

        if (isNaN(finalDateTime.getTime())) {
            Alert.alert("Ошибка", "Неверный формат даты или времени.");
            return;
        }

        onEdit({ ...event, title, description, dateTime: finalDateTime.toISOString() });
        setIsEditing(false);
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            {isEditing ? (
                <>
                    <TextInput
                        style={styles.input}
                        placeholder="Название события"
                        value={title}
                        onChangeText={setTitle}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Описание"
                        value={description}
                        onChangeText={setDescription}
                    />
                    <DateTimeInput
                        initialDate={dateTime.date}
                        initialTime={dateTime.time}
                        onDateTimeChange={setDateTime}
                    />
                    <View style={styles.buttonContainer2}>
                        <CustomButton title="Сохранить изменения" onPress={handleSave} />
                    </View>
                </>
            ) : (
                <>
                    <Text style={styles.title}>{event.title}</Text>
                    <Text style={styles.description}>
                        {event.description || "Описание отсутствует"}
                    </Text>
                    <Text style={styles.dateTime}>
                        Дата и время: {new Date(event.dateTime).toLocaleString()}
                    </Text>
                    <View style={styles.buttonContainer}>
                        <CustomButton
                            title="Редактировать"
                            onPress={() => setIsEditing(true)}
                        />
                        <CustomButton
                            title="Удалить"
                            onPress={() => {
                                onDelete(event.id);
                                navigation.goBack();
                            }}
                            style={{ backgroundColor: "#DB393B" }}
                        />
                    </View>
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        marginBottom: 10,
    },
    dateTime: {
        fontSize: 16,
        color: "gray",
    },
    buttonContainer: {
        marginTop: 10,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    buttonContainer2: {
        marginTop: 10,
        marginHorizontal: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
        marginHorizontal: 5,
        placeholderTextColor: "#888",
    },
});
