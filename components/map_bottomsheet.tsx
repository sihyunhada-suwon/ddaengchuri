import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { Store } from '../app/(tabs)/map';
import Icon from 'react-native-vector-icons/Feather';
import { SharedValue, withTiming } from 'react-native-reanimated';

interface Props {
  stores: Store[];
  sheetPosition: SharedValue<number>;
}

const CATEGORIES = [
  '편의점/마트',
  '프랜차이즈',
  '치킨/피자',
  '족발/보쌈',
  '돈까스/회/일식',
  '빵/디저트',
  '카페/음료',
  '한식',
  '샐러드/포케',
  '김밥/도시락',
  '중식/아시안',
  '양식',
  '분식',
  '햄버거/샌드위치',
  '과일/채소',
  '고기',
  '반찬',
  '냉동/즉석식품',
  '스낵/빙과류',
  '면',
];

const DISTANCES = ['전체', '1km', '2km', '3km', '5km', '10km', '15km'];

export default function MapBottomSheet({ stores, sheetPosition }: Props) {
  const snapPoints = ['10%', '40%', '80%'];
  const [showFilter, setShowFilter] = useState(true);
  const [filterMode, setFilterMode] = useState(false);

  const [onlyDiscounted, setOnlyDiscounted] = useState(true);
  const [categories, setCategories] = useState(['편의점/마트', '프랜차이즈']);
  const [distance, setDistance] = useState('1km');

  const toggleCategory = (category: string) => {
    setCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleSheetChanges = useCallback(
    (index: number) => {
      setShowFilter(index !== 0);

      if (!sheetPosition) return;

      if (index === 0) {
        sheetPosition.value = withTiming(0);
      } else if (index === 1) {
        sheetPosition.value = withTiming(150);
      } else {
        sheetPosition.value = withTiming(300);
      }
    },
    [sheetPosition]
  );

  const renderItem = ({ item }: { item: Store }) => (
    <View style={styles.card}>
      <Image
        source={{ uri: 'https://via.placeholder.com/120x80.png?text=Store' }}
        style={styles.thumbnail}
      />
      <View style={styles.cardContent}>
        <Text style={styles.storeName}>{item.name}</Text>
        <Text style={styles.rating}>
          ⭐ {item.rating.toFixed(1)} ({Math.floor(Math.random() * 100)}){' '}
          {item.distance}m
        </Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>마감 할인중</Text>
        </View>
      </View>
    </View>
  );

  return (
    <BottomSheet
      index={0}
      snapPoints={snapPoints}
      enablePanDownToClose={false}
      onChange={handleSheetChanges}
    >
      <BottomSheetView style={styles.sheetContent}>
        <View style={styles.handleBarContainer}>
          <View style={styles.handleBar} />
        </View>

        {showFilter && !filterMode && (
          <TouchableOpacity
            style={styles.filterIconBox}
            onPress={() => setFilterMode(true)}
          >
            <Icon name="sliders" size={22} color="#115E4B" />
          </TouchableOpacity>
        )}

        {!filterMode ? (
          <FlatList
            data={stores}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <ScrollView contentContainerStyle={styles.filterContainer}>
            <View style={styles.header}>
              <Text style={styles.headerText}>필터</Text>
              <TouchableOpacity onPress={() => setFilterMode(false)}>
                <Icon name="x" size={24} color="#333" />
              </TouchableOpacity>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>마감할인</Text>
              <View style={styles.row}>
                <TouchableOpacity
                  style={[styles.checkbox, onlyDiscounted && styles.checkedBox]}
                  onPress={() => setOnlyDiscounted((prev) => !prev)}
                >
                  {onlyDiscounted && (
                    <Icon name="check" size={16} color="#fff" />
                  )}
                </TouchableOpacity>
                <Text style={styles.optionText}>마감할인 상품만 보기</Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>카테고리</Text>
              <View style={styles.tagContainer}>
                {CATEGORIES.map((cat) => (
                  <TouchableOpacity
                    key={cat}
                    onPress={() => toggleCategory(cat)}
                    style={[
                      styles.tag,
                      categories.includes(cat) && styles.activeTag,
                    ]}
                  >
                    <Text
                      style={[
                        styles.tagText,
                        categories.includes(cat) && styles.activeTagText,
                      ]}
                    >
                      {cat}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>거리</Text>
              <View style={styles.tagContainer}>
                {DISTANCES.map((d) => (
                  <TouchableOpacity
                    key={d}
                    onPress={() => setDistance(d)}
                    style={[styles.tag, distance === d && styles.activeTag]}
                  >
                    <Text
                      style={[
                        styles.tagText,
                        distance === d && styles.activeTagText,
                      ]}
                    >
                      {d}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.footer}>
              <TouchableOpacity
                style={styles.resetButton}
                onPress={() => {
                  setOnlyDiscounted(true);
                  setCategories([]);
                  setDistance('전체');
                }}
              >
                <Text style={styles.resetText}>초기화</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.applyButton}
                onPress={() => setFilterMode(false)}
              >
                <Text style={styles.applyText}>적용하기</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        )}
      </BottomSheetView>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  sheetContent: {
    flex: 1,
  },
  handleBarContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 8,
  },
  handleBar: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#ccc',
  },
  filterIconBox: {
    position: 'absolute',
    top: 8,
    right: 20,
    backgroundColor: '#F4F4F4',
    padding: 8,
    borderRadius: 20,
    zIndex: 10,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  filterContainer: {
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkedBox: {
    backgroundColor: '#115E4B',
    borderColor: '#115E4B',
  },
  optionText: {
    fontSize: 14,
    color: '#333',
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  tag: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 10,
  },
  tagText: {
    color: '#666',
    fontSize: 13,
  },
  activeTag: {
    backgroundColor: '#115E4B',
    borderColor: '#115E4B',
  },
  activeTagText: {
    color: '#fff',
  },
  footer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  resetButton: {
    flex: 1,
    backgroundColor: '#eee',
    padding: 14,
    borderRadius: 8,
    marginRight: 10,
    alignItems: 'center',
  },
  resetText: {
    color: '#333',
    fontWeight: 'bold',
  },
  applyButton: {
    flex: 2,
    backgroundColor: '#115E4B',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  applyText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  badge: {
    marginTop: 6,
    backgroundColor: '#115E4B',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
  },
  thumbnail: {
    width: 120,
    height: 80,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardContent: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
  storeName: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  rating: {
    fontSize: 13,
    color: '#666',
  },
});
