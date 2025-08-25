// // screens/AddressSettingScreen.tsx

// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   FlatList,
//   StyleSheet,
//   SafeAreaView,
// } from 'react-native';
// import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';

// type Address = {
//   id: string;
//   label: string; // ex. 집, 학교, 직장
//   address: string;
//   selected?: boolean;
//   icon?: React.ReactNode;
// };

// const defaultAddresses: Address[] = [
//   {
//     id: '1',
//     label: '집',
//     address: '경기도 화성시 봉담읍 샘마을길 123',
//     icon: <Ionicons name="home" size={24} color="#246e43" />,
//   },
//   {
//     id: '2',
//     label: '학교',
//     address: '경기도 화성시 봉담읍 와우안길 17 수원대학교 IT대학',
//     icon: <Ionicons name="location" size={24} color="#246e43" />,
//   },
//   {
//     id: '3',
//     label: '직장',
//     address: '서울특별시 강남구 테헤란로 123',
//     icon: <MaterialIcons name="work" size={24} color="#246e43" />,
//   },
// ];

// export default function AddressSettingScreen() {
//   const [search, setSearch] = useState('');
//   const [addresses, setAddresses] = useState<Address[]>(defaultAddresses);

//   // 주소 선택
//   const selectAddress = (id: string) => {
//     setAddresses((addrs) =>
//       addrs.map((a) => ({ ...a, selected: a.id === id }))
//     );
//   };

//   // 주소 삭제
//   const deleteAddress = (id: string) => {
//     setAddresses((addrs) => addrs.filter((a) => a.id !== id));
//   };

//   // 주소 수정 (여기서는 예시)
//   const editAddress = (id: string, newAddr: string) => {
//     setAddresses((addrs) =>
//       addrs.map((a) => (a.id === id ? { ...a, address: newAddr } : a))
//     );
//   };

//   // "현재 위치로 찾기" (GPS 연동은 expo-location 참고)
//   const handleFindCurrent = () => {
//     // TODO: 위치 권한/주소 검색 로직 (지금은 Alert만)
//     alert('현 위치 찾기 기능을 구현하세요!');
//   };

//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
//       {/* 상단 */}
//       <View style={styles.header}>
//         <TouchableOpacity>
//           <Ionicons name="chevron-back" size={28} color="#246e43" />
//         </TouchableOpacity>
//         <Text style={styles.title}>주소 설정</Text>
//       </View>

//       {/* 검색 */}
//       <View style={styles.searchBox}>
//         <Ionicons name="search" size={24} color="#bbb" />
//         <TextInput
//           placeholder="도로명, 건물명 또는 지번으로 검색"
//           value={search}
//           onChangeText={setSearch}
//           style={styles.input}
//         />
//       </View>

//       {/* 현재 위치로 찾기 */}
//       <TouchableOpacity style={styles.locationBtn} onPress={handleFindCurrent}>
//         <FontAwesome name="location-arrow" size={20} color="#246e43" />
//         <Text style={styles.locationText}>현재 위치로 찾기</Text>
//       </TouchableOpacity>

//       {/* 주소 리스트 */}
//       <FlatList
//         data={addresses}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <TouchableOpacity
//             style={[styles.addrCard, item.selected && styles.addrCardActive]}
//             onPress={() => selectAddress(item.id)}
//           >
//             <View style={styles.addrIcon}>{item.icon}</View>
//             <View style={{ flex: 1 }}>
//               <Text style={styles.addrLabel}>{item.label}</Text>
//               <Text style={styles.addrDesc}>{item.address}</Text>
//             </View>
//             <TouchableOpacity
//               onPress={() => {
//                 /* TODO: 수정 */
//               }}
//               style={styles.btnSm}
//             >
//               <Text>수정</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               onPress={() => deleteAddress(item.id)}
//               style={styles.btnSm}
//             >
//               <Text>삭제</Text>
//             </TouchableOpacity>
//           </TouchableOpacity>
//         )}
//         style={{ flex: 1 }}
//         ListFooterComponent={<View style={{ height: 24 }} />}
//       />
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   header: { flexDirection: 'row', alignItems: 'center', padding: 20 },
//   title: { fontSize: 22, fontWeight: 'bold', flex: 1, textAlign: 'center' },
//   searchBox: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//     marginBottom: 10,
//   },
//   input: { flex: 1, marginLeft: 12, fontSize: 17 },
//   locationBtn: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 16,
//     backgroundColor: '#f4f7f4',
//     margin: 18,
//     borderRadius: 8,
//   },
//   locationText: { marginLeft: 8, color: '#246e43', fontWeight: '600' },
//   addrCard: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#fafafa',
//     marginHorizontal: 16,
//     marginVertical: 7,
//     borderRadius: 12,
//     padding: 16,
//     borderWidth: 2,
//     borderColor: 'transparent',
//   },
//   addrCardActive: { borderColor: '#246e43', backgroundColor: '#f2fff2' },
//   addrIcon: { marginRight: 14 },
//   addrLabel: { fontWeight: 'bold', fontSize: 16 },
//   addrDesc: { color: '#666', marginTop: 3 },
//   btnSm: { marginLeft: 6, padding: 4 },
// });

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  SafeAreaView,
  Modal,
} from 'react-native';
import MapView, { PROVIDER_GOOGLE, Region } from 'react-native-maps';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import * as Location from 'expo-location';
import {
  GooglePlacesAutocomplete,
  type GooglePlaceData,
  type GooglePlaceDetail,
} from 'react-native-google-places-autocomplete';
import { GOOGLE_API_KEY } from '../constants/config';

/** ---------- Types ---------- */
type AddressType = 'home' | 'work' | 'custom';
type Address = {
  id: string;
  label: string;
  address: string;
  selected?: boolean;
  type?: AddressType;
  lat?: number;
  lng?: number;
};
type Mode = 'list' | 'map' | 'register';

/** ---------- 초기 데이터 ---------- */
const defaultAddresses: Address[] = [
  {
    id: '1',
    label: '집',
    address: '경기도 화성시 봉담읍 샘마을길 123',
    selected: true,
    type: 'home',
  },
  {
    id: '2',
    label: '학교',
    address: '경기도 화성시 봉담읍 와우안길 17 수원대학교 IT대학',
  },
  {
    id: '3',
    label: '직장',
    address: '서울특별시 강남구 테헤란로 123',
    type: 'work',
  },
];

/** ---------- Google Geocoding (항상 string 반환) ---------- */
async function googleReverseGeocode(lat: number, lng: number): Promise<string> {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&language=ko&key=${GOOGLE_API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Google Geocoding failed');
  const json = await res.json();
  const item = (json.results || [])[0];
  return item?.formatted_address ?? `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
}

/** ---------- Screen ---------- */
export default function AddressSettingScreen() {
  const [mode, setMode] = useState<Mode>('list');
  const [addresses, setAddresses] = useState<Address[]>(defaultAddresses);

  const [region, setRegion] = useState<Region>({
    latitude: 37.2099,
    longitude: 126.9713,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
  const [pickedAddr, setPickedAddr] = useState<{
    address: string;
    lat: number;
    lng: number;
  } | null>(null);

  const [registerType, setRegisterType] = useState<AddressType>('custom');
  const [registerLabel, setRegisterLabel] = useState<string>('');

  const [editTarget, setEditTarget] = useState<Address | null>(null);
  const [editText, setEditText] = useState<string>('');

  const selectSaved = (id: string) => {
    setAddresses((xs) => xs.map((x) => ({ ...x, selected: x.id === id })));
  };
  const removeSaved = (id: string) => {
    setAddresses((xs) => xs.filter((x) => x.id !== id));
  };
  const openEdit = (addr: Address) => {
    setEditTarget(addr);
    setEditText(addr.address);
  };
  const saveEdit = () => {
    if (!editTarget) return;
    setAddresses((xs) =>
      xs.map((x) => (x.id === editTarget.id ? { ...x, address: editText } : x))
    );
    setEditTarget(null);
  };

  const handleFindCurrent = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('위치 권한이 필요합니다.');
        return;
      }
      const loc = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = loc.coords;
      setRegion((r) => ({ ...r, latitude, longitude }));
      const addr = await googleReverseGeocode(latitude, longitude);
      setPickedAddr({ address: addr, lat: latitude, lng: longitude });
      setMode('map');
    } catch {
      alert('현재 위치를 가져오지 못했습니다.');
    }
  };

  const onRegionChanged = async (r: Region) => {
    setRegion(r);
    try {
      const addr = await googleReverseGeocode(r.latitude, r.longitude);
      setPickedAddr({ address: addr, lat: r.latitude, lng: r.longitude });
    } catch {}
  };

  const goRegisterFromMap = () => {
    if (!pickedAddr) return;
    setRegisterType('custom');
    setRegisterLabel('');
    setMode('register');
  };

  const addAddress = () => {
    if (!pickedAddr) return;
    const newId = Math.random().toString(36).slice(2, 9);
    const labelByType =
      registerType === 'home'
        ? '집'
        : registerType === 'work'
        ? '직장'
        : registerLabel || '직접 입력';
    setAddresses((xs) => [
      ...xs,
      {
        id: newId,
        label: labelByType,
        address: pickedAddr.address,
        type: registerType,
        lat: pickedAddr.lat,
        lng: pickedAddr.lng,
      },
    ]);
    setMode('list');
    setPickedAddr(null);
  };

  const renderSavedCard = ({ item }: { item: Address }) => {
    const leftIcon =
      item.type === 'home' ? (
        <Ionicons name="home" size={22} color="#246e43" />
      ) : item.type === 'work' ? (
        <MaterialIcons name="work" size={22} color="#246e43" />
      ) : (
        <Ionicons name="location" size={22} color="#246e43" />
      );
    return (
      <TouchableOpacity
        onPress={() => selectSaved(item.id)}
        style={[styles.addrCard, item.selected && styles.addrCardActive]}
      >
        <View style={styles.addrIcon}>{leftIcon}</View>
        <View style={{ flex: 1 }}>
          <Text style={styles.addrLabel}>{item.label}</Text>
          <Text style={styles.addrDesc}>{item.address}</Text>
        </View>
        <TouchableOpacity onPress={() => openEdit(item)} style={styles.pillBtn}>
          <Text style={styles.pillTxt}>수정</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => removeSaved(item.id)}
          style={[styles.pillBtn, { marginLeft: 8 }]}
        >
          <Text style={styles.pillTxt}>삭제</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => (mode === 'list' ? null : setMode('list'))}
        >
          <Ionicons name="chevron-back" size={28} color="#246e43" />
        </TouchableOpacity>
        <Text style={styles.title}>주소 설정</Text>
        <View style={{ width: 28 }} />
      </View>

      <View style={styles.searchContainer}>
        <GooglePlacesAutocomplete
          placeholder="도로명, 건물명 또는 지번으로 검색"
          fetchDetails={true}
          onPress={(
            data: GooglePlaceData,
            details: GooglePlaceDetail | null
          ) => {
            if (!details) return;
            const { lat, lng } = details.geometry.location;
            const addr =
              details.formatted_address ??
              data.description ??
              `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
            setRegion((r) => ({ ...r, latitude: lat, longitude: lng }));
            setPickedAddr({ address: addr, lat, lng });
            setMode('map');
          }}
          query={{ key: GOOGLE_API_KEY ?? '', language: 'ko' }}
          enablePoweredByContainer={false}
          debounce={200}
          nearbyPlacesAPI="GooglePlacesSearch"
          // 타입 정의에 없는 prop 이슈 우회
          {...({ predefinedPlaces: [] } as any)}
          textInputProps={{
            onFocus: () => {},
            onBlur: () => {},
            returnKeyType: 'search',
          }}
          styles={{
            container: { flex: 0, zIndex: 10, paddingHorizontal: 16 },
            textInput: {
              height: 44,
              borderRadius: 8,
              borderColor: '#ccc',
              borderWidth: 1,
              paddingHorizontal: 10,
              fontSize: 15,
              backgroundColor: '#fff',
            },
            listView: { backgroundColor: '#fff' },
          }}
        />
      </View>

      <TouchableOpacity style={styles.locationBtn} onPress={handleFindCurrent}>
        <FontAwesome name="location-arrow" size={18} color="#246e43" />
        <Text style={styles.locationText}>현재 위치로 찾기</Text>
      </TouchableOpacity>

      {mode === 'list' && (
        <FlatList
          data={addresses}
          keyExtractor={(it) => it.id}
          renderItem={renderSavedCard}
          contentContainerStyle={{ paddingBottom: 24 }}
        />
      )}

      {mode === 'map' && (
        <View style={{ flex: 1 }}>
          <MapView
            style={StyleSheet.absoluteFillObject}
            provider={PROVIDER_GOOGLE}
            region={region}
            onRegionChangeComplete={onRegionChanged}
          />
          <View style={styles.centerOverlay}>
            <Text style={{ opacity: 0.6, marginBottom: 8 }}>
              지도를 움직여서 위치를 설정해주세요.
            </Text>
            <View style={styles.pinBig} />
          </View>
          <View style={styles.sheet}>
            <Text style={styles.sheetTitle}>
              {pickedAddr?.address ?? '주소 확인 중'}
            </Text>
            <Text style={styles.sheetSub}>
              {pickedAddr
                ? `${pickedAddr.lat.toFixed(5)}, ${pickedAddr.lng.toFixed(5)}`
                : ''}
            </Text>
            <TouchableOpacity
              style={styles.primaryBtn}
              onPress={goRegisterFromMap}
            >
              <Text style={styles.primaryBtnText}>이 위치로 주소 설정</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {mode === 'register' && (
        <View style={{ flex: 1 }}>
          <View style={styles.mockMapSmall} />
          <View style={styles.registerWrap}>
            <Text style={styles.sheetTitle}>{pickedAddr?.address}</Text>
            <Text style={styles.sheetSub}>
              {pickedAddr
                ? `${pickedAddr.lat.toFixed(5)}, ${pickedAddr.lng.toFixed(5)}`
                : ''}
            </Text>
            <View style={styles.typeRow}>
              <TypeTile
                icon={<Ionicons name="home" size={24} />}
                title="집"
                active={registerType === 'home'}
                onPress={() => setRegisterType('home')}
              />
              <TypeTile
                icon={<MaterialIcons name="work" size={24} />}
                title="직장"
                active={registerType === 'work'}
                onPress={() => setRegisterType('work')}
              />
              <TypeTile
                icon={<Ionicons name="location" size={24} />}
                title="직접 입력"
                active={registerType === 'custom'}
                onPress={() => setRegisterType('custom')}
              />
            </View>
            <TextInput
              placeholder="예) 학교, 친구집"
              value={registerType === 'custom' ? registerLabel : ''}
              onChangeText={setRegisterLabel}
              editable={registerType === 'custom'}
              style={[
                styles.memoInput,
                registerType !== 'custom' && {
                  backgroundColor: '#f5f5f5',
                  color: '#999',
                },
              ]}
            />
            <TouchableOpacity
              style={[styles.primaryBtn, { marginTop: 16 }]}
              onPress={addAddress}
            >
              <Text style={styles.primaryBtnText}>주소 등록</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <Modal
        visible={!!editTarget}
        transparent
        animationType="fade"
        onRequestClose={() => setEditTarget(null)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 12 }}>
              주소 수정
            </Text>
            <TextInput
              value={editText}
              onChangeText={setEditText}
              style={styles.editInput}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                marginTop: 12,
              }}
            >
              <TouchableOpacity
                onPress={() => setEditTarget(null)}
                style={styles.modalBtnGhost}
              >
                <Text>취소</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={saveEdit}
                style={[styles.modalBtnGhost, { marginLeft: 8 }]}
              >
                <Text style={{ color: '#246e43', fontWeight: '700' }}>
                  저장
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

function TypeTile({
  icon,
  title,
  active,
  onPress,
}: {
  icon: React.ReactNode;
  title: string;
  active?: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        {
          flex: 1,
          alignItems: 'center',
          paddingVertical: 18,
          borderRadius: 14,
          borderWidth: 1.5,
          borderColor: active ? '#246e43' : '#e6e6e6',
          backgroundColor: active ? '#edf7f1' : '#fff',
        },
      ]}
    >
      <View style={{ marginBottom: 6 }}>{icon}</View>
      <Text style={{ fontWeight: '600' }}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  title: { fontSize: 20, fontWeight: '800', flex: 1, textAlign: 'center' },
  searchContainer: { zIndex: 10, paddingTop: 4 },
  locationBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    backgroundColor: '#f4f7f4',
    marginHorizontal: 16,
    borderRadius: 10,
    marginTop: 8,
    marginBottom: 6,
  },
  locationText: { marginLeft: 8, color: '#246e43', fontWeight: '700' },
  addrCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fafafa',
    marginHorizontal: 16,
    marginVertical: 7,
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  addrCardActive: { borderColor: '#246e43', backgroundColor: '#f2fff2' },
  addrIcon: { marginRight: 12 },
  addrLabel: { fontWeight: '800', fontSize: 16 },
  addrDesc: { color: '#666', marginTop: 3, fontSize: 13 },
  pillBtn: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: '#eee',
    borderRadius: 12,
  },
  pillTxt: { fontSize: 13, fontWeight: '600', color: '#333' },
  centerOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pinBig: {
    width: 28,
    height: 28,
    borderRadius: 28,
    backgroundColor: '#246e43',
  },
  sheet: {
    padding: 16,
    backgroundColor: '#fff',
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  sheetTitle: { fontSize: 18, fontWeight: '800', marginBottom: 6 },
  sheetSub: { color: '#7a7a7a', marginBottom: 12 },
  primaryBtn: {
    backgroundColor: '#246e43',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  primaryBtnText: { color: '#fff', fontWeight: '800' },
  mockMapSmall: { height: 220, backgroundColor: '#eef3ef' },
  registerWrap: { flex: 1, padding: 16 },
  typeRow: { flexDirection: 'row', gap: 12, marginTop: 12 },
  memoInput: {
    marginTop: 14,
    borderWidth: 1,
    borderColor: '#e6e6e6',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalCard: {
    width: '88%',
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
  },
  editInput: {
    borderWidth: 1,
    borderColor: '#e6e6e6',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
  },
  modalBtnGhost: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: '#f3f3f3',
  },
});
