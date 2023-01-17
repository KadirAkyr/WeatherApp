import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

export default function CityOverView({ navigation, city }) {
  const submit = () => {
    navigation.navigate({
      name: "City",
      params: { city: city },
      merge: true,
    });
  };

  return (
    <View>
      <TouchableOpacity onPressOut={() => submit()} style={styles.container}>
        <Text style={styles.title}>{city}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 36,
    textTransform: "capitalize",
  },
  container: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
