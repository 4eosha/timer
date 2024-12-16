import React, { useState } from "react";
import { StyleSheet, View, TextInput, Text } from "react-native";
import DateTimeInput from "./DateTimeInput";
import CustomButton from "./CustomButton";

export default function AddEventScreen({ addEvent }) {
    const [title, setTitle] = useState("");
    const [dateTime, setDateTime] = useState("");
    const [description, setDescription] = useState("");
    const [message, setMessage] = useState({ text: "", type: "" });

    const handleAddEvent = () => {
        if (!title.trim()) {
            setMessage({ text: "Название обязательно для заполнения.", type: "error" });
            return;
        }

        let finalDateTime;

        try {
            const today = new Date();
            const defaultDate = `${String(today.getDate()).padStart(2, "0")}.${String(today.getMonth() + 1).padStart(2, "0")}.${today.getFullYear()}`;

            const inputDate = dateTime.split(" ")[0] || defaultDate;
            const inputTime = dateTime.split(" ")[1] || "00:00";

            const [day, month, year] = inputDate.split(".");
            const isoDateTime = `${year}-${month}-${day}T${inputTime}`;

            finalDateTime = new Date(isoDateTime);
            if (isNaN(finalDateTime)) {
                throw new Error();
            }
        } catch {
            setMessage({ text: "Неверный формат даты или времени.", type: "error" });
            return;
        }

        const newEvent = {
            id: Math.random().toString(),
            title: title.trim(),
            dateTime: finalDateTime,
            description: description.trim(),
        };

        addEvent(newEvent);
        setTitle("");
        setDateTime("");
        setDescription("");
        setMessage({ text: "Событие добавлено!", type: "success" });

        setTimeout(() => setMessage({ text: "", type: "" }), 3000);
    };

    return (
        <View style={styles.container}>
            {message.text ? (
                <Text style={[styles.message, message.type === "success" ? styles.success : styles.error]}>
                    {message.text}
                </Text>
            ) : null}

            <TextInput
                style={styles.input}
                placeholder="Название события"
                value={title}
                onChangeText={setTitle}
            />
            <DateTimeInput
                date={dateTime.split(" ")[0]}
                time={dateTime.split(" ")[1]}
                onDateTimeChange={(dateTimeObj) => {
                    const { date, time } = dateTimeObj;
                    const dateTimeString = date && time ? `${date} ${time}` : date || time;
                    setDateTime(dateTimeString);
                }}
            />
            <TextInput
                style={styles.input}
                placeholder="Описание (опционально)"
                value={description}
                onChangeText={setDescription}
            />
            <View style={styles.buttonContainer}>
                <CustomButton title="Добавить" onPress={handleAddEvent} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 10,
        marginVertical: 5,
        marginHorizontal: 5,
        borderRadius: 5,
        placeholderTextColor: "#888",
    },
    buttonContainer: {
        marginHorizontal: 5,
    },
    message: {
        fontSize: 16,
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
        textAlign: "center",
    },
    success: {
        backgroundColor: "#d4edda",
        color: "#155724",
        borderColor: "#c3e6cb",
        borderWidth: 1,
    },
    error: {
        backgroundColor: "#f8d7da",
        color: "#721c24",
        borderColor: "#f5c6cb",
        borderWidth: 1,
    },
});
