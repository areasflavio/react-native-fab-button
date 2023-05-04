import { Entypo } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View, ViewProps } from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

interface FloatingButtonProps extends ViewProps {
  onPress: () => void;
}

export function FloatingButton({
  onPress,
  style,
  ...rest
}: FloatingButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const animation = useSharedValue(0);

  const rotationAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: withSpring(isOpen ? '45deg' : '0deg'),
        },
      ],
    };
  });

  const pinAnimatedStyle = useAnimatedStyle(() => {
    const translateYAnimation = interpolate(
      animation.value,
      [0, 1],
      [0, -20],
      Extrapolate.CLAMP
    );

    return {
      transform: [
        {
          scale: withSpring(animation.value),
        },
        {
          translateY: withSpring(translateYAnimation),
        },
      ],
    };
  });

  const thumbAnimatedStyle = useAnimatedStyle(() => {
    const translateYAnimation = interpolate(
      animation.value,
      [0, 1],
      [0, -30],
      Extrapolate.CLAMP
    );

    return {
      transform: [
        {
          scale: withSpring(animation.value),
        },
        {
          translateY: withSpring(translateYAnimation),
        },
      ],
    };
  });

  const heartAnimatedStyle = useAnimatedStyle(() => {
    const translateYAnimation = interpolate(
      animation.value,
      [0, 1],
      [0, -40],
      Extrapolate.CLAMP
    );

    return {
      transform: [
        {
          scale: withSpring(animation.value),
        },
        {
          translateY: withSpring(translateYAnimation),
        },
      ],
    };
  });

  const opacityAnimatedStyle = useAnimatedStyle(() => {
    const opacityAnimation = interpolate(
      animation.value,
      [0, 0.5, 1],
      [0, 0, 1],
      Extrapolate.CLAMP
    );

    return {
      opacity: withSpring(opacityAnimation),
    };
  });

  function toggleMenu() {
    onPress();
    setIsOpen((current) => {
      animation.value = current ? 0 : 1;
      return !current;
    });
  }

  return (
    <View style={[styles.container, style]} {...rest}>
      <TouchableOpacity activeOpacity={0.8}>
        <Animated.View
          style={[
            styles.button,
            styles.secondary,
            heartAnimatedStyle,
            opacityAnimatedStyle,
          ]}
        >
          <Entypo name="heart" size={24} color="#f02a4b" />
        </Animated.View>
      </TouchableOpacity>

      <TouchableOpacity activeOpacity={0.8}>
        <Animated.View
          style={[
            styles.button,
            styles.secondary,
            thumbAnimatedStyle,
            opacityAnimatedStyle,
          ]}
        >
          <Entypo name="thumbs-up" size={24} color="#f02a4b" />
        </Animated.View>
      </TouchableOpacity>

      <TouchableOpacity activeOpacity={0.8}>
        <Animated.View
          style={[
            styles.button,
            styles.secondary,
            pinAnimatedStyle,
            opacityAnimatedStyle,
          ]}
        >
          <Entypo name="location-pin" size={24} color="#f02a4b" />
        </Animated.View>
      </TouchableOpacity>

      <TouchableOpacity activeOpacity={0.8} onPress={toggleMenu}>
        <Animated.View
          style={[styles.button, styles.menu, rotationAnimatedStyle]}
        >
          <Entypo name="plus" size={32} color="#ffffff" />
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    position: 'absolute',
    justifyContent: 'center',
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowRadius: 10,
    shadowColor: '#f02a4b',
    shadowOpacity: 0.3,
    shadowOffset: { height: 10, width: 10 },
    elevation: 10,
  },
  menu: {
    backgroundColor: '#f02a4b',
  },
  secondary: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#ffffff',
  },
});
