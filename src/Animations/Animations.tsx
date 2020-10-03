import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import Animated, { Easing, set, Clock, useCode, startClock, block, timing, Value, not, cond, eq } from "react-native-reanimated";
import { useClock, useValue } from "react-native-redash";
import ChatBubble from "./ChatBubble";
import { Button, StyleGuide } from "../components";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: StyleGuide.palette.background,
  },
});

const runTiming = (clock: Clock) => {
  const state = {
    finished: new Value(0),
    position: new Value(0),
    frameTime: new Value(0),
    time: new Value(0),
  };
  const config = {
    toValue: new Value(1),
    duration: 3000,
    easing: Easing.inOut(Easing.ease),
  };

  return block([
    timing(
      clock,
      state,
      config
    ),
    cond(eq(state.finished, 1), [
      set(state.finished, 0),
      set(state.frameTime, 1),
      set(state.time, 0),
      set(config.toValue, not(state.position))
    ]),
    state.position]);
}

const Timing = () => {
  const [play, setPlay] = useState(false);
  const clock = useClock();
  const progress = useValue(0);

  useCode(() => [
    startClock(clock),
    set(progress, runTiming(clock))
  ], []);

  return (
    <View style={styles.container}>
      <ChatBubble {...{ progress }} />
      <Button
        label={play ? "Pause" : "Play"}
        primary
        onPress={() => setPlay((prev) => !prev)}
      />
    </View>
  );
};

export default Timing;
