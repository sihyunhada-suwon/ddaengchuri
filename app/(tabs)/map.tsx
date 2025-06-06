import * as Location from 'expo-location';
import { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps';
import type { ComponentRef } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import BottomSheet from '../../components/map_bottomsheet';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

export type Store = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  category: string;
  distance: number;
  rating: number;
  isDiscounted: boolean;
};

const dummyStores: Store[] = [
  {
    id: 1,
    name: '세븐일레븐 수원대점',
    latitude: 37.284,
    longitude: 127.043,
    category: '편의점/마트',
    distance: 150,
    rating: 4.9,
    isDiscounted: true,
  },
  {
    id: 2,
    name: '밀플랜비',
    latitude: 37.283,
    longitude: 127.042,
    category: '프랜차이즈',
    distance: 300,
    rating: 4.5,
    isDiscounted: true,
  },
];

export default function MapScreen() {
  const [region, setRegion] = useState<Region | null>(null);
  const [stores, setStores] = useState<Store[]>(dummyStores);
  const [search, setSearch] = useState('');
  const mapRef = useRef<ComponentRef<typeof MapView>>(null);

  const sheetPosition = useSharedValue(0); // 바텀시트 위치 추적

  const goToCurrentLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') return;

    const location = await Location.getCurrentPositionAsync({});
    const newRegion: Region = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };
    setRegion(newRegion);
    mapRef.current?.animateToRegion(newRegion, 500);
  };

  useEffect(() => {
    goToCurrentLocation();
  }, []);

  const locationButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: -sheetPosition.value }],
    };
  });

  if (!region) return <Text>지도를 불러오는 중입니다...</Text>;

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={StyleSheet.absoluteFillObject}
        region={region}
        showsUserLocation
      >
        {stores.map((store) => (
          <Marker
            key={store.id}
            coordinate={{
              latitude: store.latitude,
              longitude: store.longitude,
            }}
            title={store.name}
            description={`평점 ${store.rating}`}
          />
        ))}
      </MapView>

      {/* ⬇️ 검색창 개선 */}
      <View style={styles.searchBox}>
        <Icon name="magnify" size={22} color="#666" style={styles.searchIcon} />
        <TextInput
          placeholder="수원대학교"
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
          placeholderTextColor="#999"
        />
        <TouchableOpacity style={styles.searchButton}>
          <Icon name="arrow-right" color="#fff" size={20} />
        </TouchableOpacity>
      </View>

      <Animated.View
        style={[styles.currentLocationButton, locationButtonStyle]}
      >
        <TouchableOpacity onPress={goToCurrentLocation}>
          <Icon name="crosshairs-gps" size={22} color="#115E4B" />
        </TouchableOpacity>
      </Animated.View>

      <BottomSheet stores={stores} sheetPosition={sheetPosition} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBox: {
    position: 'absolute',
    top: 50,
    left: 16,
    right: 16,
    backgroundColor: '#fff',
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 14,
    paddingRight: 6,
    height: 48,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 6,
    zIndex: 20,
  },
  searchIcon: {
    marginRight: 6,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    paddingVertical: 0,
  },
  searchButton: {
    backgroundColor: '#115E4B',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  currentLocationButton: {
    position: 'absolute',
    bottom: 100,
    left: 20,
    width: 36,
    height: 36,
    backgroundColor: '#fff',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    zIndex: 20,
  },
});
