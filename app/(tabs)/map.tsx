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
import BottomSheet from '../../components/map_filter';
import { useSharedValue } from 'react-native-reanimated';

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
  const [locationText, setLocationText] = useState('주소를 불러오는 중...');
  const mapRef = useRef<ComponentRef<typeof MapView>>(null);

  const sheetPosition = useSharedValue(0);

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

    // 📍 주소 불러오기
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

      {/* 🔍 검색창 */}
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

      {/* 📍 현재 위치 버튼 */}
      <TouchableOpacity
        style={styles.fixedLocationButton}
        onPress={goToCurrentLocation}
      >
        <Icon name="crosshairs-gps" size={22} color="#115E4B" />
      </TouchableOpacity>

      {/* ⬇️ 바텀시트에 주소 전달 */}
      <BottomSheet
        stores={stores}
        sheetPosition={sheetPosition}
        locationText={locationText}
      />
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
  fixedLocationButton: {
    position: 'absolute',
    top: 110,
    left: 20,
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
    zIndex: 20,
  },
});

// import * as Location from 'expo-location';
// import { useEffect, useRef, useState } from 'react';
// import {
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
//   Image,
// } from 'react-native';
// import MapView, { Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps';
// import type { ComponentRef } from 'react';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';

// export type Store = {
//   id: number;
//   name: string;
//   latitude: number;
//   longitude: number;
//   category: string;
//   distance: number;
//   rating: number;
//   isDiscounted: boolean;
// };

// const dummyStores: Store[] = [
//   {
//     id: 1,
//     name: '세븐일레븐 수원대점',
//     latitude: 37.284,
//     longitude: 127.043,
//     category: '편의점/마트',
//     distance: 150,
//     rating: 4.9,
//     isDiscounted: true,
//   },
//   {
//     id: 2,
//     name: '밀플랜비',
//     latitude: 37.283,
//     longitude: 127.042,
//     category: '프랜차이즈',
//     distance: 300,
//     rating: 4.5,
//     isDiscounted: true,
//   },
// ];

// export default function MapScreen() {
//   const [region, setRegion] = useState<Region | null>(null);
//   const [stores, setStores] = useState<Store[]>(dummyStores);
//   const [search, setSearch] = useState('');
//   const [locationText, setLocationText] = useState('주소를 불러오는 중...');
//   const mapRef = useRef<ComponentRef<typeof MapView>>(null);

//   const goToCurrentLocation = async () => {
//     const { status } = await Location.requestForegroundPermissionsAsync();
//     if (status !== 'granted') return;

//     const location = await Location.getCurrentPositionAsync({});
//     const newRegion: Region = {
//       latitude: location.coords.latitude,
//       longitude: location.coords.longitude,
//       latitudeDelta: 0.01,
//       longitudeDelta: 0.01,
//     };
//     setRegion(newRegion);
//     mapRef.current?.animateToRegion(newRegion, 500);

//     try {
//       const [address] = await Location.reverseGeocodeAsync(location.coords);
//       const formatted = `${address.region ?? ''} ${address.city ?? ''} ${
//         address.street ?? ''
//       }`;
//       setLocationText(formatted.trim());
//     } catch (error) {
//       console.error('주소 불러오기 실패:', error);
//       setLocationText('주소를 불러올 수 없습니다.');
//     }
//   };

//   useEffect(() => {
//     goToCurrentLocation();
//   }, []);

//   if (!region) return <Text>지도를 불러오는 중입니다...</Text>;

//   return (
//     <GestureHandlerRootView style={{ flex: 1 }}>
//       <View style={styles.container}>
//         <MapView
//           ref={mapRef}
//           provider={PROVIDER_GOOGLE}
//           style={StyleSheet.absoluteFillObject}
//           region={region}
//           showsUserLocation
//         >
//           {stores.map((store) => (
//             <Marker
//               key={store.id}
//               coordinate={{
//                 latitude: store.latitude,
//                 longitude: store.longitude,
//               }}
//               title={store.name}
//               description={`평점 ${store.rating}`}
//             />
//           ))}
//         </MapView>

//         {/* 🔍 검색창 */}
//         <View style={styles.searchBox}>
//           <Icon
//             name="magnify"
//             size={22}
//             color="#666"
//             style={styles.searchIcon}
//           />
//           <TextInput
//             placeholder="수원대학교"
//             value={search}
//             onChangeText={setSearch}
//             style={styles.searchInput}
//             placeholderTextColor="#999"
//           />
//           <TouchableOpacity style={styles.searchButton}>
//             <Icon name="arrow-right" color="#fff" size={20} />
//           </TouchableOpacity>
//         </View>

//         {/* 📍 현재 위치 버튼 */}
//         <TouchableOpacity
//           style={styles.fixedLocationButton}
//           onPress={goToCurrentLocation}
//         >
//           <Icon name="crosshairs-gps" size={22} color="#115E4B" />
//         </TouchableOpacity>

//         {/* 🧾 BottomSheet (카드 형태 + 스크롤) */}
//         <BottomSheet
//           index={0}
//           snapPoints={['12%', '35%']}
//           enablePanDownToClose={false}
//           backgroundStyle={{ borderRadius: 20 }}
//         >
//           <View style={{ paddingHorizontal: 16 }}>
//             <Text style={{ fontSize: 14, fontWeight: '600', marginBottom: 8 }}>
//               {locationText} 주변 마감 할인 상품을 찾아보세요!
//             </Text>
//             <BottomSheetScrollView
//               horizontal
//               showsHorizontalScrollIndicator={false}
//               contentContainerStyle={{ paddingVertical: 8 }}
//             >
//               {stores.map((store) => (
//                 <View
//                   key={store.id}
//                   style={{
//                     backgroundColor: '#fff',
//                     borderRadius: 12,
//                     width: 180,
//                     marginRight: 12,
//                     padding: 10,
//                     shadowColor: '#000',
//                     shadowOpacity: 0.1,
//                     shadowRadius: 6,
//                     shadowOffset: { width: 0, height: 3 },
//                     elevation: 4,
//                   }}
//                 >
//                   <View
//                     style={{
//                       borderRadius: 10,
//                       overflow: 'hidden',
//                       marginBottom: 6,
//                     }}
//                   >
//                     <Image
//                       source={require('../../assets/food/salad.jpg')}
//                       style={{
//                         width: '100%',
//                         height: 100,
//                         resizeMode: 'cover',
//                       }}
//                     />
//                   </View>
//                   <Text
//                     style={{
//                       fontWeight: 'bold',
//                       fontSize: 15,
//                       marginBottom: 4,
//                     }}
//                   >
//                     {store.name}
//                   </Text>
//                   <Text style={{ fontSize: 13, color: '#555' }}>
//                     ⭐ {store.rating} / {(store.distance / 1000).toFixed(1)}km
//                   </Text>
//                   {store.isDiscounted && (
//                     <Text
//                       style={{
//                         marginTop: 4,
//                         fontSize: 12,
//                         color: '#fff',
//                         backgroundColor: '#388e3c',
//                         alignSelf: 'flex-start',
//                         paddingHorizontal: 6,
//                         paddingVertical: 2,
//                         borderRadius: 4,
//                       }}
//                     >
//                       마감 할인중
//                     </Text>
//                   )}
//                 </View>
//               ))}
//             </BottomSheetScrollView>
//           </View>
//         </BottomSheet>
//       </View>
//     </GestureHandlerRootView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   searchBox: {
//     position: 'absolute',
//     top: 50,
//     left: 16,
//     right: 16,
//     backgroundColor: '#fff',
//     borderRadius: 30,
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingLeft: 14,
//     paddingRight: 6,
//     height: 48,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 3 },
//     shadowOpacity: 0.12,
//     shadowRadius: 6,
//     elevation: 6,
//     zIndex: 20,
//   },
//   searchIcon: {
//     marginRight: 6,
//   },
//   searchInput: {
//     flex: 1,
//     fontSize: 15,
//     paddingVertical: 0,
//   },
//   searchButton: {
//     backgroundColor: '#115E4B',
//     width: 36,
//     height: 36,
//     borderRadius: 18,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   fixedLocationButton: {
//     position: 'absolute',
//     top: 110,
//     left: 20,
//     width: 40,
//     height: 40,
//     backgroundColor: '#fff',
//     borderRadius: 20,
//     justifyContent: 'center',
//     alignItems: 'center',
//     elevation: 6,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 3 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//     zIndex: 20,
//   },
// });
