import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import Animated, { interpolate } from "react-native-reanimated";
import { Button, Card, StyleGuide, cards, CARD_WIDTH } from "../components";
import { useTransition, mix } from "react-native-redash";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: StyleGuide.palette.background,
    justifyContent: "flex-end",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    padding: StyleGuide.spacing * 4,
  },
});
const alpha = Math.PI / 6;

const UseTransition = () => {
  const [toggled, setToggle] = useState(false);

  const transition = useTransition(toggled, {
    duration: 300
  });

  return (
    <View style={styles.container}>
      {cards.slice(0, 3).map((card, index) => {
        const rotate = mix(transition, 0, (index - 1) * alpha);
        // transform: [{translateX: -CARD_WIDTH/2}, { rotate }, {translateX: CARD_WIDTH/2}],

        return (
          <Animated.View
            key={card}
            style={[
              styles.overlay,
              {
                transform: [{ translateX: -CARD_WIDTH / 2 }, { rotate }, { translateX: CARD_WIDTH / 2 }],
              },
            ]}
          >
            <Card {...{ card }} />
          </Animated.View>
        );
      })}
      <Button
        label={toggled ? "Reset" : "Start"}
        primary
        onPress={() => setToggle((prev) => !prev)}
      />
    </View>
  );
};

export default UseTransition;
