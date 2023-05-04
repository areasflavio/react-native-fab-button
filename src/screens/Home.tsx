import React, { useState } from 'react';
import { ImageBackground, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

import { FloatingButton } from '../components/FloatingButton';

const AnimatedImageBackground =
  Animated.createAnimatedComponent(ImageBackground);

export function Home() {
  const [modalOpen, setModalOpen] = useState(false);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(modalOpen ? 0.25 : 0.5),
    };
  });

  function onPress() {
    setModalOpen((curr) => !curr);
  }

  return (
    <>
      <AnimatedImageBackground
        source={require('../assets/map.jpg')}
        resizeMode="cover"
        style={[styles.image, animatedStyle]}
      />
      <FloatingButton onPress={onPress} style={{ bottom: 20, right: 20 }} />
    </>
  );
}
const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});
