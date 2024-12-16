import React, { useEffect } from "react";
import { StyleSheet, TextInput, View } from "react-native";

export default function DateTimeInput({
    onDateTimeChange,
    initialDate = "",
    initialTime = "",
}) {
    const [date, setDate] = React.useState(initialDate);
    const [time, setTime] = React.useState(initialTime);

    useEffect(() => {
        setDate(initialDate);
        setTime(initialTime);
    }, [initialDate, initialTime]);

    const handleDateChange = (input) => {
        let formatted = input.replace(/\D/g, "");
        if (formatted.length > 2) {
            formatted = `${formatted.slice(0, 2)}.${formatted.slice(2)}`;
        }
        if (formatted.length > 5) {
            formatted = `${formatted.slice(0, 5)}.${formatted.slice(5, 9)}`;
        }
        setDate(formatted);

        onDateTimeChange({ date: formatted, time });
    };

    const handleTimeChange = (input) => {
        let formatted = input.replace(/\D/g, "");
        if (formatted.length > 2) {
            formatted = `${formatted.slice(0, 2)}:${formatted.slice(2, 4)}`;
        }
        setTime(formatted);

        onDateTimeChange({ date, time: formatted });
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                value={date}
                placeholder="ДД.ММ.ГГГГ"
                keyboardType="numeric"
                maxLength={10}
                onChangeText={handleDateChange}
            />
            <TextInput
                style={styles.input}
                value={time}
                placeholder="ЧЧ:ММ"
                keyboardType="numeric"
                maxLength={5}
                onChangeText={handleTimeChange}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 10,
        marginVertical: 5,
        marginHorizontal: 5,
        borderRadius: 5,
        placeholderTextColor: "#888",
    },
});
