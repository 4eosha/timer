import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function CustomButton({ title, onPress, style }) {
    return (
        <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#2196f3",
        borderRadius: 10,
        height: 45,
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 10,
        paddingHorizontal: 20,
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
});
