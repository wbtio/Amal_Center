import React, { ReactNode } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, ViewStyle, StyleProp } from 'react-native';

interface Props {
  children: ReactNode;
  contentContainerStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  keyboardVerticalOffset?: number;
}

export const KeyboardAvoidingWrapper = ({
  children,
  contentContainerStyle,
  style,
  keyboardVerticalOffset = Platform.OS === 'ios' ? 90 : 0,
}: Props) => {
  return (
    <KeyboardAvoidingView
      style={[{ flex: 1 }, style]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={keyboardVerticalOffset}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={contentContainerStyle}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode={Platform.OS === 'ios' ? 'interactive' : 'on-drag'}
        automaticallyAdjustKeyboardInsets={Platform.OS === 'ios'}
        bounces={false}
      >
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
