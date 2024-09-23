import Svg, { Path, Rect, Circle } from "react-native-svg";
import { View, StyleSheet } from "react-native";

export default function TruckLoader() {
  return (
    <View style={styles.loader}>
      <View style={styles.truckWrapper}>
        <Svg viewBox="0 0 198 93" style={styles.truckBody}>
          <Path
            strokeWidth="3"
            stroke="#282828"
            fill="#F83D3D"
            d="M135 22.5H177.264C178.295 22.5 179.22 23.133 179.594 24.0939L192.33 56.8443C192.442 57.1332 192.5 57.4404 192.5 57.7504V89C192.5 90.3807 191.381 91.5 190 91.5H135C133.619 91.5 132.5 90.3807 132.5 89V25C132.5 23.6193 133.619 22.5 135 22.5Z"
          />
          <Path
            strokeWidth="3"
            stroke="#282828"
            fill="#7D7C7C"
            d="M146 33.5H181.741C182.779 33.5 183.709 34.1415 184.078 35.112L190.538 52.112C191.16 53.748 189.951 55.5 188.201 55.5H146C144.619 55.5 143.5 54.3807 143.5 53V36C143.5 34.6193 144.619 33.5 146 33.5Z"
          />
          <Circle
            strokeWidth="3"
            stroke="#282828"
            fill="#282828"
            cx="15"
            cy="15"
            r="13.5"
          />
          <Circle fill="#DFDFDF" cx="15" cy="15" r="7" />
        </Svg>

        <View style={styles.truckTires}>
          <Svg viewBox="0 0 30 30" style={styles.tireSvg}>
            <Circle
              strokeWidth="3"
              stroke="#282828"
              fill="#282828"
              cx="15"
              cy="15"
              r="13.5"
            />
            <Circle fill="#DFDFDF" cx="15" cy="15" r="7" />
          </Svg>
          <Svg viewBox="0 0 30 30" style={styles.tireSvg}>
            <Circle
              strokeWidth="3"
              stroke="#282828"
              fill="#282828"
              cx="15"
              cy="15"
              r="13.5"
            />
            <Circle fill="#DFDFDF" cx="15" cy="15" r="7" />
          </Svg>
        </View>

        <View style={styles.road}></View>
        {/* Add other elements like the lampPost */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loader: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  truckWrapper: {
    width: 200,
    height: 100,
    display: "flex",
    flexDirection: "column",
    position: "relative",
    alignItems: "center",
    justifyContent: "flex-end",
    overflow: "hidden",
  },
  truckBody: {
    width: 130,
    height: "auto",
    marginBottom: 6,
  },
  truckTires: {
    width: 130,
    height: "auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    position: "absolute",
    bottom: 0,
  },
  tireSvg: {
    width: 24,
    height: 24,
  },
  road: {
    width: "100%",
    height: 1.5,
    backgroundColor: "#282828",
    position: "absolute",
    bottom: 0,
    alignSelf: "flex-end",
    borderRadius: 3,
  },
});
