import React, { useEffect, useRef } from 'react';
import { 
  View, 
  TouchableOpacity, 
  StyleSheet, 
  BackHandler,
  PanResponder,
  Modal,
  useWindowDimensions,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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
  const { height: screenHeight } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const translateY = useSharedValue(screenHeight);
  const backdropOpacity = useSharedValue(0);
  const startY = useRef(0);

  const maxHeightValue = typeof maxHeight === 'string' 
    ? (parseFloat(maxHeight) / 100) * screenHeight 
    : maxHeight;

  const closeSheet = () => {
    translateY.value = withTiming(screenHeight, { duration: 200 });
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
      translateY.value = screenHeight;
      backdropOpacity.value = 0;
      openSheet();
    }
  }, [visible, screenHeight]);

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
            {
              maxHeight: Math.min(maxHeightValue, screenHeight - insets.top - 12),
              paddingBottom: Math.max(insets.bottom, 12),
            }
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
