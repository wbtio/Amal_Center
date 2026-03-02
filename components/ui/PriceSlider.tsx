import React, { useState, useCallback, useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';

interface PriceSliderProps {
  minValue: number;
  maxValue: number;
  currentMin: number;
  currentMax: number;
  onValuesChange: (min: number, max: number) => void;
  step?: number;
  isRTL?: boolean;
  language?: string;
}

const formatPrice = (value: number, language: string = 'ar'): string => {
  if (value >= 1000000) {
    const millions = value / 1000000;
    return language === 'ar' 
      ? `${millions.toFixed(1)} مليون` 
      : `${millions.toFixed(1)}M`;
  } else if (value >= 1000) {
    const thousands = value / 1000;
    return language === 'ar'
      ? `${Math.floor(thousands)} ألف` 
      : `${Math.floor(thousands)}K`;
  }
  return value.toLocaleString('en-US');
};

export const PriceSlider: React.FC<PriceSliderProps> = ({
  minValue = 250,
  maxValue = 500000,
  currentMin,
  currentMax,
  onValuesChange,
  step = 250,
  isRTL = false,
  language = 'ar',
}) => {
  const [tempMin, setTempMin] = useState(currentMin);
  const [tempMax, setTempMax] = useState(currentMax);
  const [isMinSliding, setIsMinSliding] = useState(false);
  const [isMaxSliding, setIsMaxSliding] = useState(false);

  const fillPercentage = useMemo(() => {
    const range = maxValue - minValue;
    const startPercentage = ((tempMin - minValue) / range) * 100;
    const widthPercentage = ((tempMax - tempMin) / range) * 100;
    return { start: startPercentage, width: widthPercentage };
  }, [tempMin, tempMax, minValue, maxValue]);

  const handleMinChange = useCallback((value: number) => {
    const roundedValue = Math.round(value / step) * step;
    if (roundedValue < tempMax - step) {
      setTempMin(roundedValue);
    }
  }, [tempMax, step]);

  const handleMaxChange = useCallback((value: number) => {
    const roundedValue = Math.round(value / step) * step;
    if (roundedValue > tempMin + step) {
      setTempMax(roundedValue);
    }
  }, [tempMin, step]);

  const handleMinStart = useCallback(() => {
    setIsMinSliding(true);
  }, []);

  const handleMinComplete = useCallback((value: number) => {
    setIsMinSliding(false);
    const roundedValue = Math.round(value / step) * step;
    if (roundedValue < tempMax - step) {
      onValuesChange(roundedValue, tempMax);
    }
  }, [tempMax, step, onValuesChange]);

  const handleMaxStart = useCallback(() => {
    setIsMaxSliding(true);
  }, []);

  const handleMaxComplete = useCallback((value: number) => {
    setIsMaxSliding(false);
    const roundedValue = Math.round(value / step) * step;
    if (roundedValue > tempMin + step) {
      onValuesChange(tempMin, roundedValue);
    }
  }, [tempMin, step, onValuesChange]);

  return (
    <View style={styles.container}>
      {/* عرض القيم الحالية */}
      <View style={[styles.valuesContainer, isRTL && styles.valuesContainerRTL]}>
        <View style={[styles.valueBox, isMinSliding && styles.valueBoxActive]}>
          <Text style={styles.valueLabel}>
            {language === 'ar' ? 'من' : 'Min'}
          </Text>
          <View style={styles.valueRow}>
            <Text style={styles.valueText}>
              {formatPrice(tempMin, language)}
            </Text>
            <Text style={styles.currency}>
              {language === 'ar' ? 'د.ع' : 'IQD'}
            </Text>
          </View>
        </View>

        <View style={styles.separator}>
          <View style={styles.separatorLine} />
        </View>

        <View style={[styles.valueBox, isMaxSliding && styles.valueBoxActive]}>
          <Text style={styles.valueLabel}>
            {language === 'ar' ? 'إلى' : 'Max'}
          </Text>
          <View style={styles.valueRow}>
            <Text style={styles.valueText}>
              {formatPrice(tempMax, language)}
            </Text>
            <Text style={styles.currency}>
              {language === 'ar' ? 'د.ع' : 'IQD'}
            </Text>
          </View>
        </View>
      </View>

      {/* المسار المرئي */}
      <View style={styles.trackContainer}>
        <View style={styles.trackBackground} />
        <View 
          style={[
            styles.trackFill,
            {
              left: `${fillPercentage.start}%`,
              width: `${fillPercentage.width}%`,
            }
          ]} 
        />
      </View>

      {/* Container للسلايدرات */}
      <View style={styles.slidersContainer}>
        <Slider
          style={styles.slider}
          minimumValue={minValue}
          maximumValue={maxValue}
          value={tempMin}
          onValueChange={handleMinChange}
          onSlidingStart={handleMinStart}
          onSlidingComplete={handleMinComplete}
          step={step}
          minimumTrackTintColor="transparent"
          maximumTrackTintColor="transparent"
          thumbTintColor="#2E7D32"
          tapToSeek={true}
        />

        <Slider
          style={styles.slider}
          minimumValue={minValue}
          maximumValue={maxValue}
          value={tempMax}
          onValueChange={handleMaxChange}
          onSlidingStart={handleMaxStart}
          onSlidingComplete={handleMaxComplete}
          step={step}
          minimumTrackTintColor="transparent"
          maximumTrackTintColor="transparent"
          thumbTintColor="#2E7D32"
          tapToSeek={true}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
  },
  valuesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  valuesContainerRTL: {
    flexDirection: 'row-reverse',
  },
  valueBox: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
  },
  valueBoxActive: {
    backgroundColor: '#F0FDF4',
    borderColor: '#2E7D32',
  },
  valueLabel: {
    fontFamily: 'IBMPlexSansArabic-Regular',
    fontSize: 10,
    color: '#9CA3AF',
    marginBottom: 2,
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
  },
  valueText: {
    fontFamily: 'IBMPlexSansArabic-Bold',
    fontSize: 14,
    color: '#1B4D2E',
  },
  currency: {
    fontFamily: 'IBMPlexSansArabic-Regular',
    fontSize: 10,
    color: '#6B7280',
  },
  separator: {
    width: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  separatorLine: {
    width: 8,
    height: 2,
    backgroundColor: '#D1D5DB',
    borderRadius: 1,
  },
  trackContainer: {
    height: 4,
    marginHorizontal: 8,
    marginBottom: 4,
    position: 'relative',
  },
  trackBackground: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
  },
  trackFill: {
    position: 'absolute',
    height: 4,
    backgroundColor: '#2E7D32',
    borderRadius: 2,
  },
  slidersContainer: {
    height: 40,
    position: 'relative',
  },
  slider: {
    position: 'absolute',
    width: '100%',
    height: 40,
  },
});

export default PriceSlider;
