import React, { useEffect, useRef } from 'react';
import { 
  View, 
  TouchableOpacity, 
  Dimensions, 
  StyleSheet, 
  BackHandler,
  PanResponder,
  Modal,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

interface BottomSheetProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  maxHeight?: number | string;
}

export const BottomSheet: React.FC<BottomSheetProps> = ({
  visible,
  onClose,
  children,
  maxHeight = '85%',
}) => {
  const translateY = useSharedValue(SCREEN_HEIGHT);
  const backdropOpacity = useSharedValue(0);
  const startY = useRef(0);

  const maxHeightValue = typeof maxHeight === 'string' 
    ? (parseFloat(maxHeight) / 100) * SCREEN_HEIGHT 
    : maxHeight;

  const closeSheet = () => {
    translateY.value = withTiming(SCREEN_HEIGHT, { duration: 200 });
    backdropOpacity.value = withTiming(0, { duration: 150 }, () => {
      runOnJS(onClose)();
    });
  };

  const openSheet = () => {
    backdropOpacity.value = withTiming(1, { duration: 150 });
    translateY.value = withTiming(0, { duration: 200 });
  };

  useEffect(() => {
    if (visible) {
      translateY.value = SCREEN_HEIGHT;
      backdropOpacity.value = 0;
      openSheet();
    }
  }, [visible]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (visible) {
        closeSheet();
        return true;
      }
      return false;
    });

    return () => backHandler.remove();
  }, [visible]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dy) > 5;
      },
      onPanResponderGrant: () => {
        startY.current = translateY.value;
      },
      onPanResponderMove: (_, gestureState) => {
        const newY = startY.current + gestureState.dy;
        if (newY >= 0) {
          translateY.value = newY;
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 80 || gestureState.vy > 0.5) {
          closeSheet();
        } else {
          translateY.value = withTiming(0, { duration: 150 });
        }
      },
    })
  ).current;

  const animatedSheetStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const animatedBackdropStyle = useAnimatedStyle(() => ({
    opacity: backdropOpacity.value,
  }));

  if (!visible) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={closeSheet}
      statusBarTranslucent
    >
      <View style={styles.container}>
        {/* Backdrop - fade animation */}
        <TouchableOpacity 
          style={StyleSheet.absoluteFill} 
          activeOpacity={1} 
          onPress={closeSheet}
        >
          <Animated.View style={[styles.backdrop, animatedBackdropStyle]} />
        </TouchableOpacity>

        {/* Sheet - slide animation */}
        <Animated.View 
          style={[
            styles.sheet, 
            animatedSheetStyle,
            { maxHeight: maxHeightValue }
          ]}
        >
          {/* Handle - draggable */}
          <View {...panResponder.panHandlers} style={styles.handleContainer}>
            <View style={styles.handle} />
          </View>
          
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  sheet: {
    backgroundColor: 'white',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: 'hidden',
  },
  handleContainer: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: '#D1D5DB',
    borderRadius: 2,
  },
});

export default BottomSheet;
