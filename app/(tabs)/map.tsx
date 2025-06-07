import * as Location from 'expo-location';
import { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps';
import type { ComponentRef } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import BottomSheet from '../../components/map_bottomsheet';
import { useSharedValue } from 'react-native-reanimated';
import { GOOGLE_API_KEY } from '../../constants/config';

export type Store = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  category: string;
  distance: number;
  rating: number;
  isDiscounted: boolean;
  image: any;
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
    image: require('../../assets/seven.jpeg'),
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
    image: require('../../assets/food/planb.jpg'),
  },
];

export default function MapScreen() {
  const [region, setRegion] = useState<Region | null>(null);
  const [stores, setStores] = useState<Store[]>(dummyStores);
  const [search, setSearch] = useState('');
  const [locationText, setLocationText] = useState('주소를 불러오는 중...');
  const [filterMode, setFilterMode] = useState(false);
  const sheetPosition = useSharedValue(0);
  const mapRef = useRef<ComponentRef<typeof MapView>>(null);

  const [onlyDiscounted, setOnlyDiscounted] = useState<boolean | null>(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [distance, setDistance] = useState('전체');
  const [predictions, setPredictions] = useState<any[]>([]);

  const fetchPredictions = async (input: string) => {
    if (!input.trim()) {
      setPredictions([]);
      return;
    }
    try {
      const apiKey = GOOGLE_API_KEY;
      const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
        input
      )}&language=ko&key=${apiKey}`;
      const res = await fetch(url);
      const json = await res.json();
      if (json.predictions) {
        setPredictions(json.predictions);
      } else {
        setPredictions([]);
      }
    } catch (e) {
      setPredictions([]);
    }
  };

  const onSelectPrediction = async (prediction: any) => {
    setSearch(prediction.description);
    setPredictions([]);
    const apiKey = GOOGLE_API_KEY;
    const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${prediction.place_id}&key=${apiKey}`;
    try {
      const res = await fetch(detailsUrl);
      const json = await res.json();
      const location = json.result.geometry.location;
      const newRegion: Region = {
        latitude: location.lat,
        longitude: location.lng,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };
      setRegion(newRegion);
      mapRef.current?.animateToRegion(newRegion, 500);
      setLocationText(prediction.description);
    } catch (e) {
      alert('장소 정보를 불러올 수 없습니다.');
    }
  };

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
    try {
      const [address] = await Location.reverseGeocodeAsync(location.coords);
      const formatted = `${address.region ?? ''} ${address.city ?? ''} ${
        address.street ?? ''
      }`;
      setLocationText(formatted.trim());
    } catch (error) {
      console.error('주소 불러오기 실패:', error);
      setLocationText('주소를 불러올 수 없습니다.');
    }
  };

  const searchPlace = async () => {
    if (!search.trim()) return;
    const apiKey = GOOGLE_API_KEY;
    const encoded = encodeURIComponent(search.trim());
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encoded}&key=${apiKey}`;
    try {
      const res = await fetch(url);
      const json = await res.json();
      if (json.results && json.results.length > 0) {
        const { lat, lng } = json.results[0].geometry.location;
        const newRegion: Region = {
          latitude: lat,
          longitude: lng,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        };
        setRegion(newRegion);
        mapRef.current?.animateToRegion(newRegion, 500);
        setLocationText(json.results[0].formatted_address);
      } else {
        alert('검색 결과를 찾을 수 없습니다.');
      }
    } catch (error) {
      alert('장소 검색 중 오류가 발생했습니다.');
    }
  };

  useEffect(() => {
    goToCurrentLocation();
  }, []);

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

      <View style={styles.searchBox}>
        {/* 입력창+검색버튼을 한 줄에 배치 */}
        <View style={styles.rowWrap}>
          <View style={styles.searchInputWrapper}>
            <Icon
              name="magnify"
              size={22}
              color="#999"
              style={styles.searchIcon}
            />
            <TextInput
              placeholder="장소를 입력하세요!"
              value={search}
              onChangeText={(txt) => {
                setSearch(txt);
                fetchPredictions(txt);
              }}
              style={styles.searchInput}
              placeholderTextColor="#999"
            />
          </View>
          <TouchableOpacity style={styles.searchButton} onPress={searchPlace}>
            <Icon name="arrow-right" color="#fff" size={20} />
          </TouchableOpacity>
        </View>

        {/* 자동완성 리스트 */}
        {predictions.length > 0 && (
          <View style={styles.suggestionsWrapper}>
            <FlatList
              data={predictions}
              keyExtractor={(item) => item.place_id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={{
                    padding: 13,
                    borderBottomWidth: 1,
                    borderColor: '#eee',
                  }}
                  onPress={() => onSelectPrediction(item)}
                >
                  <Text style={{ fontSize: 15, color: '#333' }}>
                    {item.description}
                  </Text>
                </TouchableOpacity>
              )}
              keyboardShouldPersistTaps="handled"
            />
          </View>
        )}

        {/* 현재 위치 버튼 */}
        <TouchableOpacity
          style={styles.fixedLocationButtonInBox}
          onPress={goToCurrentLocation}
        >
          <Icon name="crosshairs-gps" size={22} color="#115E4B" />
        </TouchableOpacity>
      </View>

      <BottomSheet
        stores={stores}
        sheetPosition={sheetPosition}
        locationText={locationText}
        filterMode={filterMode}
        setFilterMode={setFilterMode}
        onlyDiscounted={onlyDiscounted}
        setOnlyDiscounted={setOnlyDiscounted}
        categories={categories}
        setCategories={setCategories}
        distance={distance}
        setDistance={setDistance}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  searchBox: {
    position: 'absolute',
    top: 57,
    left: 16,
    right: 16,
    zIndex: 20,
  },
  rowWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInputWrapper: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 11,
    alignItems: 'center',
    paddingLeft: 14,
    paddingRight: 10,
    height: 48,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 6,
  },
  searchIcon: { marginRight: 6 },
  searchInput: { flex: 1, fontSize: 15, paddingVertical: 0, color: '#333' },
  searchButton: {
    marginLeft: 8,
    backgroundColor: '#115E4B',
    width: 44,
    height: 44,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 6,
  },
  suggestionsWrapper: {
    position: 'absolute',
    top: 48,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 11,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 99,
    zIndex: 99,
    maxHeight: 170,
  },
  fixedLocationButtonInBox: {
    position: 'absolute',
    top: 57, // 자동완성 아래에 나오도록 (필요시 조정)
    left: 4,
    width: 40,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    zIndex: 10, // 자동완성(zIndex:99)보다 낮게!
  },
});
