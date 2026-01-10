import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Alert, ActivityIndicator, Dimensions, Modal, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';
import { useLanguage } from '../../contexts';

interface LocationPickerProps {
  onLocationSelect: (location: { latitude: number; longitude: number; address?: string }) => void;
  initialLocation?: { latitude: number; longitude: number };
  visible: boolean;
  onClose: () => void;
}

const { width, height } = Dimensions.get('window');

export const LocationPicker: React.FC<LocationPickerProps> = ({
  onLocationSelect,
  initialLocation,
  visible,
  onClose
}) => {
  const { language, isRTL } = useLanguage();
  const webViewRef = useRef<WebView>(null);
  const [selectedLocation, setSelectedLocation] = useState<{ latitude: number; longitude: number } | null>(
    initialLocation || null
  );
  const [loading, setLoading] = useState(false);
  const [gettingLocation, setGettingLocation] = useState(false);
  const [mapReady, setMapReady] = useState(false);
  const [addressText, setAddressText] = useState('');
  const [loadingAddress, setLoadingAddress] = useState(false);
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const defaultLat = initialLocation?.latitude || 30.5085; // Basra
  const defaultLng = initialLocation?.longitude || 47.7804;

  useEffect(() => {
    if (initialLocation) {
      setSelectedLocation(initialLocation);
    }
  }, [initialLocation]);

  useEffect(() => {
    let isMounted = true;
    
    const initLocation = async () => {
      if (visible && !initialLocation && isMounted) {
        await getCurrentLocation();
      }
    };
    
    initLocation();
    
    return () => {
      isMounted = false;
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [visible]);

  const updateMapLocation = (location: { latitude: number; longitude: number }) => {
    if (webViewRef.current && mapReady) {
      webViewRef.current.injectJavaScript(`
        updateLocation(${location.latitude}, ${location.longitude});
        true;
      `);
    }
  };

  const fetchAddress = async (location: { latitude: number; longitude: number }) => {
    setLoadingAddress(true);
    try {
      const addressResult = await Location.reverseGeocodeAsync(location);
      if (addressResult[0]) {
        const addr = addressResult[0];
        const parts = [addr.street, addr.district, addr.city].filter(Boolean);
        setAddressText(parts.join('، '));
      } else {
        setAddressText('');
      }
    } catch (e) {
      setAddressText('');
    } finally {
      setLoadingAddress(false);
    }
  };

  const getCurrentLocation = async () => {
    setGettingLocation(true);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          language === 'ar' ? 'تنبيه' : 'Notice',
          language === 'ar' 
            ? 'للحصول على موقعك الحالي، يرجى السماح بالوصول للموقع من الإعدادات'
            : 'To get your current location, please allow location access in settings'
        );
        setGettingLocation(false);
        return;
      }

      // Get last known position first (fast)
      const lastKnown = await Location.getLastKnownPositionAsync();
      if (lastKnown) {
        const quickLocation = {
          latitude: lastKnown.coords.latitude,
          longitude: lastKnown.coords.longitude,
        };
        setSelectedLocation(quickLocation);
        updateMapLocation(quickLocation);
        setAddressText(language === 'ar' ? 'جاري تحديد الموقع بدقة...' : 'Getting precise location...');
      }

      // Then get accurate position
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced
      });
      
      const newLocation = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };

      setSelectedLocation(newLocation);
      updateMapLocation(newLocation);
      await fetchAddress(newLocation);
      
    } catch (error) {
      console.error('Location error:', error);
    } finally {
      setGettingLocation(false);
    }
  };

  const handleMessage = (event: any) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      if (data.type === 'locationSelected') {
        const newLoc = { latitude: data.lat, longitude: data.lng };
        setSelectedLocation(newLoc);
        
        // Show loading state immediately
        setAddressText(language === 'ar' ? 'جاري جلب العنوان...' : 'Loading address...');
        setLoadingAddress(true);
        
        // Debounce the reverse geocoding to avoid too many API calls
        if (debounceTimerRef.current) {
          clearTimeout(debounceTimerRef.current);
        }
        
        debounceTimerRef.current = setTimeout(() => {
          fetchAddress(newLoc);
        }, 500);
        
      } else if (data.type === 'mapReady') {
        setMapReady(true);
        // If we already have a location, update the map
        if (selectedLocation) {
          setTimeout(() => {
            updateMapLocation(selectedLocation);
          }, 300);
        }
      }
    } catch (e) {
      console.error('Error parsing message:', e);
    }
  };

  const handleConfirm = () => {
    if (!selectedLocation) {
      Alert.alert(
        language === 'ar' ? 'تنبيه' : 'Notice',
        language === 'ar' ? 'يرجى تحديد موقعك على الخريطة أولاً' : 'Please select your location on the map first'
      );
      return;
    }

    onLocationSelect({
      ...selectedLocation,
      address: addressText
    });
    onClose();
  };

  const mapHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html, body, #map { width: 100%; height: 100%; }
        .leaflet-control-attribution { display: none; }
        .leaflet-control-zoom { display: none !important; }
      </style>
    </head>
    <body>
      <div id="map"></div>
      <script>
        var map = L.map('map', {
          zoomControl: false
        }).setView([${defaultLat}, ${defaultLng}], 16);
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
        }).addTo(map);

        // Send location when map stops moving
        map.on('moveend', function() {
          var center = map.getCenter();
          window.ReactNativeWebView.postMessage(JSON.stringify({
            type: 'locationSelected',
            lat: center.lat,
            lng: center.lng
          }));
        });

        // Function to update map location from React Native
        function updateLocation(lat, lng) {
          map.setView([lat, lng], 17, { animate: true });
        }

        // Send initial center
        setTimeout(function() {
          var center = map.getCenter();
          window.ReactNativeWebView.postMessage(JSON.stringify({
            type: 'locationSelected',
            lat: center.lat,
            lng: center.lng
          }));
        }, 500);

        window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'mapReady' }));
      </script>
    </body>
    </html>
  `;

  if (!visible) return null;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={false}
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <View style={styles.container}>
        {/* Map WebView - Full Screen */}
        <View style={styles.mapContainer}>
          <WebView
            ref={webViewRef}
            source={{ html: mapHtml }}
            style={styles.map}
            onMessage={handleMessage}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            startInLoadingState={true}
            renderLoading={() => (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#2E7D32" />
                <Text style={styles.loadingText}>
                  {language === 'ar' ? 'جاري تحميل الخريطة...' : 'Loading map...'}
                </Text>
              </View>
            )}
            onError={(syntheticEvent) => {
              const { nativeEvent } = syntheticEvent;
              console.error('WebView error:', nativeEvent);
              Alert.alert(
                language === 'ar' ? 'خطأ' : 'Error',
                language === 'ar' 
                  ? 'فشل تحميل الخريطة. يرجى المحاولة مرة أخرى' 
                  : 'Failed to load map. Please try again'
              );
            }}
          />

          {/* Center Pin - Fixed in center */}
          <View style={styles.centerPin} pointerEvents="none">
            <View style={styles.pinShadow} />
            <View style={styles.pinBody}>
              <Ionicons name="location" size={32} color="#fff" />
            </View>
            <View style={styles.pinPoint} />
          </View>
        </View>

        {/* Top Bar - Floating */}
        <View style={styles.topBar}>
          <TouchableOpacity 
            onPress={onClose} 
            style={styles.closeButton}
          >
            <Ionicons name="close" size={24} color="#333" />
          </TouchableOpacity>
          
          <View style={styles.titleContainer}>
            <Text style={styles.title}>
              {language === 'ar' ? 'حدد موقع التوصيل' : 'Select Delivery Location'}
            </Text>
          </View>
        </View>

        {/* My Location Button - Floating */}
        <TouchableOpacity 
          onPress={getCurrentLocation} 
          style={styles.myLocationButton}
          disabled={gettingLocation}
          activeOpacity={0.8}
        >
          {gettingLocation ? (
            <ActivityIndicator size="small" color="#2E7D32" />
          ) : (
            <Ionicons name="navigate" size={24} color="#2E7D32" />
          )}
        </TouchableOpacity>

        {/* Bottom Card */}
        <View style={styles.bottomCard}>
          {/* Address Display */}
          <View style={[styles.addressContainer, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
            <View style={styles.addressIcon}>
              <Ionicons name="location" size={20} color="#2E7D32" />
            </View>
            <View style={styles.addressTextContainer}>
              <Text style={[styles.addressLabel, { textAlign: isRTL ? 'right' : 'left' }]}>
                {language === 'ar' ? 'موقع التوصيل' : 'Delivery Location'}
              </Text>
              <Text style={[styles.addressText, { textAlign: isRTL ? 'right' : 'left' }]} numberOfLines={2}>
                {addressText || (language === 'ar' ? 'حرّك الخريطة لتحديد الموقع' : 'Move the map to select location')}
              </Text>
            </View>
          </View>

          {/* Confirm Button */}
          <TouchableOpacity
            onPress={handleConfirm}
            disabled={!selectedLocation}
            style={[
              styles.confirmButton,
              { backgroundColor: selectedLocation ? '#2E7D32' : '#ccc' }
            ]}
            activeOpacity={0.8}
          >
            <Ionicons name="checkmark-circle" size={22} color="white" />
            <Text style={styles.confirmButtonText}>
              {language === 'ar' ? 'تأكيد هذا الموقع' : 'Confirm This Location'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  mapContainer: {
    flex: 1,
    position: 'relative',
  },
  map: {
    flex: 1,
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 12,
    fontFamily: 'Cairo_400Regular',
    fontSize: 14,
    color: '#666',
  },
  centerPin: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -24,
    marginTop: -58,
    alignItems: 'center',
    zIndex: 100,
  },
  pinShadow: {
    position: 'absolute',
    bottom: -8,
    width: 24,
    height: 8,
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 12,
  },
  pinBody: {
    width: 48,
    height: 48,
    backgroundColor: '#2E7D32',
    borderRadius: 24,
    borderWidth: 3,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  pinPoint: {
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderTopWidth: 16,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#2E7D32',
    marginTop: -2,
  },
  topBar: {
    position: 'absolute',
    top: 50,
    left: 16,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 10,
  },
  closeButton: {
    width: 44,
    height: 44,
    backgroundColor: '#fff',
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  titleContainer: {
    flex: 1,
    marginLeft: 12,
    backgroundColor: '#fff',
    borderRadius: 22,
    paddingVertical: 10,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  title: {
    fontFamily: 'Cairo_700Bold',
    fontSize: 15,
    color: '#333',
    textAlign: 'center',
  },
  myLocationButton: {
    position: 'absolute',
    bottom: 200,
    right: 16,
    width: 52,
    height: 52,
    backgroundColor: '#fff',
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 10,
  },
  bottomCard: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 34,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
  },
  addressContainer: {
    alignItems: 'center',
    marginBottom: 16,
    padding: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
  },
  addressIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#E8F5E9',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 12,
  },
  addressTextContainer: {
    flex: 1,
  },
  addressLabel: {
    fontFamily: 'Cairo_600SemiBold',
    fontSize: 12,
    color: '#2E7D32',
    marginBottom: 2,
  },
  addressText: {
    fontFamily: 'Cairo_400Regular',
    fontSize: 14,
    color: '#333',
  },
  confirmButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 14,
    gap: 8,
  },
  confirmButtonText: {
    fontFamily: 'Cairo_700Bold',
    fontSize: 16,
    color: '#fff',
  },
});
