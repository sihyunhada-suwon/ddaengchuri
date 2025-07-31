// screens/AddressSettingScreen.tsx

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';

type Address = {
  id: string;
  label: string; // ex. 집, 학교, 직장
  address: string;
  selected?: boolean;
  icon?: React.ReactNode;
};

const defaultAddresses: Address[] = [
  {
    id: '1',
    label: '집',
    address: '경기도 화성시 봉담읍 샘마을길 123',
    icon: <Ionicons name="home" size={24} color="#246e43" />,
  },
  {
    id: '2',
    label: '학교',
    address: '경기도 화성시 봉담읍 와우안길 17 수원대학교 IT대학',
    icon: <Ionicons name="location" size={24} color="#246e43" />,
  },
  {
    id: '3',
    label: '직장',
    address: '서울특별시 강남구 테헤란로 123',
    icon: <MaterialIcons name="work" size={24} color="#246e43" />,
  },
];

export default function AddressSettingScreen() {
  const [search, setSearch] = useState('');
  const [addresses, setAddresses] = useState<Address[]>(defaultAddresses);

  // 주소 선택
  const selectAddress = (id: string) => {
    setAddresses((addrs) =>
      addrs.map((a) => ({ ...a, selected: a.id === id }))
    );
  };

  // 주소 삭제
  const deleteAddress = (id: string) => {
    setAddresses((addrs) => addrs.filter((a) => a.id !== id));
  };

  // 주소 수정 (여기서는 예시)
  const editAddress = (id: string, newAddr: string) => {
    setAddresses((addrs) =>
      addrs.map((a) => (a.id === id ? { ...a, address: newAddr } : a))
    );
  };

  // "현재 위치로 찾기" (GPS 연동은 expo-location 참고)
  const handleFindCurrent = () => {
    // TODO: 위치 권한/주소 검색 로직 (지금은 Alert만)
    alert('현 위치 찾기 기능을 구현하세요!');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* 상단 */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="chevron-back" size={28} color="#246e43" />
        </TouchableOpacity>
        <Text style={styles.title}>주소 설정</Text>
      </View>

      {/* 검색 */}
      <View style={styles.searchBox}>
        <Ionicons name="search" size={24} color="#bbb" />
        <TextInput
          placeholder="도로명, 건물명 또는 지번으로 검색"
          value={search}
          onChangeText={setSearch}
          style={styles.input}
        />
      </View>

      {/* 현재 위치로 찾기 */}
      <TouchableOpacity style={styles.locationBtn} onPress={handleFindCurrent}>
        <FontAwesome name="location-arrow" size={20} color="#246e43" />
        <Text style={styles.locationText}>현재 위치로 찾기</Text>
      </TouchableOpacity>

      {/* 주소 리스트 */}
      <FlatList
        data={addresses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.addrCard, item.selected && styles.addrCardActive]}
            onPress={() => selectAddress(item.id)}
          >
            <View style={styles.addrIcon}>{item.icon}</View>
            <View style={{ flex: 1 }}>
              <Text style={styles.addrLabel}>{item.label}</Text>
              <Text style={styles.addrDesc}>{item.address}</Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                /* TODO: 수정 */
              }}
              style={styles.btnSm}
            >
              <Text>수정</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => deleteAddress(item.id)}
              style={styles.btnSm}
            >
              <Text>삭제</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
        style={{ flex: 1 }}
        ListFooterComponent={<View style={{ height: 24 }} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', flex: 1, textAlign: 'center' },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  input: { flex: 1, marginLeft: 12, fontSize: 17 },
  locationBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f4f7f4',
    margin: 18,
    borderRadius: 8,
  },
  locationText: { marginLeft: 8, color: '#246e43', fontWeight: '600' },
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
  addrIcon: { marginRight: 14 },
  addrLabel: { fontWeight: 'bold', fontSize: 16 },
  addrDesc: { color: '#666', marginTop: 3 },
  btnSm: { marginLeft: 6, padding: 4 },
});
