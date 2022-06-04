import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { SCREEN } from "./constants";

export default function App() {
  return (
    <View style={styles.container}>
      <View style={[styles.rowContainer, styles.headerContainer]}>
        <Text>Header</Text>
      </View>
      <View style={[styles.rowContainer, styles.gameContainer]}>
        <Text>Snake with powerups!</Text>
      </View>
      <View style={[styles.rowContainer, styles.controlsContainer]}>
        <Text>Controls</Text>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-between",
  },
  rowContainer: {
    borderStyle: "solid",
    borderColor: "red",
    borderWidth: 5,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    width: SCREEN.WIDTH,
  },
  headerContainer: {
    flex: 1,
  },
  gameContainer: {
    flex: 3,
  },
  controlsContainer: {
    flex: 1,
  },
});
