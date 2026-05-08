import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ErrorBoundaryProps {
    children: React.ReactNode;
    fallback?: React.ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error('ErrorBoundary caught:', error, errorInfo);
    }

    handleRetry = () => {
        this.setState({ hasError: false, error: null });
    };

    render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <View className="flex-1 bg-gray-50 items-center justify-center p-6">
                    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <View className="w-20 h-20 bg-red-50 rounded-full items-center justify-center mb-6">
                            <Ionicons name="alert-circle-outline" size={48} color="#D32F2F" />
                        </View>
                        <Text className="font-ibm-bold text-xl text-gray-800 text-center mb-3">
                            حدث خطأ غير متوقع
                        </Text>
                        <Text className="font-ibm text-sm text-gray-500 text-center leading-6 mb-8">
                            نعتذر عن هذا الخطأ. يرجى المحاولة مرة أخرى.
                        </Text>
                        <TouchableOpacity
                            className="bg-primary rounded-xl py-3.5 px-8"
                            onPress={this.handleRetry}
                            activeOpacity={0.7}
                        >
                            <Text className="font-ibm-bold text-base text-white">
                                إعادة المحاولة
                            </Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            );
        }

        return this.props.children;
    }
}
