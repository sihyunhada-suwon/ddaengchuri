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
import { getDistance } from 'geolib';

export type Store = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  category: string;
  distance: number;
  rating: number;
  totalReviews: number;
  isDiscounted: boolean;
  image: string | null;
  address?: string;
};

// Google Places types → 우리의 카테고리로 매핑 (우선순위 적용)
const CATEGORY_MAP: { [key: string]: string } = {
  cafe: '카페/음료',
  bakery: '빵/디저트',
  bar: '양식',
  meal_takeaway: '김밥/도시락',
  convenience_store: '편의점/마트',
  supermarket: '편의점/마트',
  korean: '한식',
  chinese: '중식/아시안',
  japanese: '돈까스/회/일식',
  italian: '양식',
  pizza: '치킨/피자',
  chicken: '치킨/피자',
  sandwich: '햄버거/샌드위치',
  hamburger: '햄버거/샌드위치',
  salad: '샐러드/포케',
  dessert: '빵/디저트',
  restaurant: '한식', // fallback
  food: '한식',
};

// types 배열을 보고 가장 우선순위가 높은 카테고리 반환
function getMappedCategory(types: string[]): string {
  for (const t of types) {
    if (CATEGORY_MAP[t]) return CATEGORY_MAP[t];
  }
  return '음식점'; // 매칭 안 되면 기본값
}

export default function MapScreen() {
  const [region, setRegion] = useState<Region | null>(null);
  const [allStores, setAllStores] = useState<Store[]>([]); // 전체 데이터
  const [stores, setStores] = useState<Store[]>([]); // 필터 적용 데이터
  const [search, setSearch] = useState('');
  const [locationText, setLocationText] = useState('주소를 불러오는 중...');
  const [filterMode, setFilterMode] = useState(false);
  const sheetPosition = useSharedValue(0);
  const mapRef = useRef<ComponentRef<typeof MapView>>(null);

  const [onlyDiscounted, setOnlyDiscounted] = useState<boolean | null>(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [distance, setDistance] = useState('전체');
  const [predictions, setPredictions] = useState<any[]>([]);

  /** 내 주변 음식점 불러오기 (사진, 주소, 평점 포함, 거리 계산) */
  const fetchNearbyRestaurants = async (lat: number, lng: number) => {
    const radius = 3000; // 검색 반경 3km
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&type=restaurant&language=ko&key=${GOOGLE_API_KEY}`;
    try {
      const res = await fetch(url);
      const json = await res.json();
      if (json.results) {
        const restaurants: Store[] = json.results.map(
          (item: any, idx: number) => {
            const photoReference = item.photos?.[0]?.photo_reference;
            const imageUrl = photoReference
              ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${GOOGLE_API_KEY}`
              : null;

            const rawTypes = item.types || [];
            console.log('PLACE TYPES:', item.name, rawTypes);
            const mappedCategory = getMappedCategory(rawTypes);

            const dist = getDistance(
              { latitude: lat, longitude: lng },
              {
                latitude: item.geometry.location.lat,
                longitude: item.geometry.location.lng,
              }
            );

            return {
              id: idx,
              name: item.name,
              latitude: item.geometry.location.lat,
              longitude: item.geometry.location.lng,
              category: mappedCategory,
              distance: dist,
              rating: item.rating || 0,
              totalReviews: item.user_ratings_total || 0,
              isDiscounted: false,
              image: imageUrl,
              address: item.vicinity || '주소 정보 없음',
            };
          }
        );

        restaurants.sort((a, b) => a.distance - b.distance);

        setAllStores(restaurants);
        applyFilters(restaurants); // 초기 필터 적용
      }
    } catch (e) {
      console.error('음식점 불러오기 실패:', e);
    }
  };

  /** 필터 적용 로직 */
  const applyFilters = (baseStores: Store[] = allStores) => {
    console.log('------ 필터 적용 시작 ------');
    console.log('전체 가게 수:', baseStores.length);
    console.log('현재 onlyDiscounted:', onlyDiscounted);
    console.log('현재 categories:', categories);
    console.log('현재 distance:', distance);

    let filtered = [...baseStores];

    if (onlyDiscounted) {
      filtered = filtered.filter((store) => store.isDiscounted);
    }

    if (categories.length > 0) {
      filtered = filtered.filter((store) =>
        categories.includes(store.category)
      );
    }

    if (distance !== '전체') {
      const maxDistance = parseInt(distance.replace('km', '')) * 1000;
      filtered = filtered.filter((store) => store.distance <= maxDistance);
    }

    console.log('필터링 결과 개수:', filtered.length);
    console.log('FILTERED STORES:', filtered);
    console.log('------------------------');

    setStores(filtered);
  };

  const fetchPredictions = async (input: string) => {
    if (!input.trim()) {
      setPredictions([]);
      return;
    }
    try {
      const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
        input
      )}&language=ko&key=${GOOGLE_API_KEY}`;
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
    const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${prediction.place_id}&key=${GOOGLE_API_KEY}`;
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
      fetchNearbyRestaurants(location.lat, location.lng);
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

    fetchNearbyRestaurants(location.coords.latitude, location.coords.longitude);

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
    const encoded = encodeURIComponent(search.trim());
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encoded}&key=${GOOGLE_API_KEY}`;
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
        fetchNearbyRestaurants(lat, lng);
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

  useEffect(() => {
    applyFilters();
  }, [onlyDiscounted, categories, distance]);

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
            description={`평점 ${store.rating} (${store.totalReviews}명) · ${store.distance}m`}
          />
        ))}
      </MapView>

      <View style={styles.searchBox}>
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
        onApplyFilter={applyFilters}
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
    top: 57,
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
    zIndex: 10,
  },
});
