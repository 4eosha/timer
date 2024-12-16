import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CountdownScreen from "./components/CountdownScreen";
import AddEventScreen from "./components/AddEventScreen";
import CalendarScreen from "./components/CalendarScreen";
import EventDetailsScreen from "./components/EventDetailsScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function CalendarStack({ events, setEvents }) {
    const handleDelete = (id) => {
        setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
    };

    const handleEdit = (updatedEvent) => {
        setEvents((prevEvents) =>
            prevEvents.map((event) =>
                event.id === updatedEvent.id ? updatedEvent : event
            )
        );
    };

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="CalendarMain"
                options={{ title: "Календарь" }}
            >
                {({ navigation }) => (
                    <CalendarScreen
                        events={events}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        navigation={navigation}
                    />
                )}
            </Stack.Screen>
            <Stack.Screen
                name="EventDetails"
                options={{ title: "Детали события" }}
            >
                {({ route, navigation }) => (
                    <EventDetailsScreen
                        route={{
                            ...route,
                            params: {
                                ...route.params,
                                onDelete: handleDelete,
                                onEdit: handleEdit,
                            },
                        }}
                        navigation={navigation}
                    />
                )}
            </Stack.Screen>
        </Stack.Navigator>
    );
}

function CountdownStack({ events, setEvents }) {
    const handleDelete = (id) => {
        setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
    };

    const handleEdit = (updatedEvent) => {
        setEvents((prevEvents) =>
            prevEvents.map((event) =>
                event.id === updatedEvent.id ? updatedEvent : event
            )
        );
    };

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="CountdownMain"
                options={{ title: "Отсчёт" }}
            >
                {({ navigation }) => (
                    <CountdownScreen
                        events={events}
                        navigation={navigation}
                    />
                )}
            </Stack.Screen>
            <Stack.Screen
                name="EventDetails"
                options={{ title: "Детали события" }}
            >
                {({ route, navigation }) => (
                    <EventDetailsScreen
                        route={{
                            ...route,
                            params: {
                                ...route.params,
                                onDelete: handleDelete,
                                onEdit: handleEdit,
                            },
                        }}
                        navigation={navigation}
                    />
                )}
            </Stack.Screen>
        </Stack.Navigator>
    );
}

export default function App() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const loadEvents = async () => {
            try {
                const storedEvents = await AsyncStorage.getItem("events");
                if (storedEvents) {
                    setEvents(JSON.parse(storedEvents));
                }
            } catch (error) {
                console.error("Ошибка при загрузке событий:", error);
            }
        };
        loadEvents();
    }, []);

    useEffect(() => {
        const saveEvents = async () => {
            try {
                await AsyncStorage.setItem("events", JSON.stringify(events));
            } catch (error) {
                console.error("Ошибка при сохранении событий:", error);
            }
        };
        saveEvents();
    }, [events]);

    const addEvent = (event) => {
        setEvents((prevEvents) => [...prevEvents, event]);
    };

    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => {
                        let iconName;

                        if (route.name === "Countdown") {
                            iconName = "clock-outline";
                        } else if (route.name === "AddEvent") {
                            iconName = "plus-circle-outline";
                        } else if (route.name === "Calendar") {
                            iconName = "calendar-month-outline";
                        }

                        return (
                            <MaterialCommunityIcons
                                name={iconName}
                                size={size}
                                color={color}
                            />
                        );
                    },
                    tabBarActiveTintColor: "#0077b6",
                    tabBarInactiveTintColor: "gray",
                    tabBarLabelStyle: {
                        fontSize: 14,
                        fontWeight: "600",
                    },
                })}
            >
                <Tab.Screen name="Countdown" options={{ title: "Отсчёт" }}>
                    {() => <CountdownStack events={events} setEvents={setEvents} />}
                </Tab.Screen>
                <Tab.Screen
                    name="AddEvent"
                    options={{ title: "Добавление", headerShown: true }}
                >
                    {() => <AddEventScreen addEvent={addEvent} />}
                </Tab.Screen>
                <Tab.Screen name="Calendar" options={{ title: "Календарь" }}>
                    {() => <CalendarStack events={events} setEvents={setEvents} />}
                </Tab.Screen>
            </Tab.Navigator>
        </NavigationContainer>
    );
}
