import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  onlyDiscounted: boolean | null;
  setOnlyDiscounted: (val: boolean | null) => void;
  categories: string[];
  setCategories: (val: string[]) => void;
  distance: string;
  setDistance: (val: string) => void;
  onApply: () => void;
  onClose: () => void;
}

const ALL_CATEGORIES = [
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

export default function MapFilter({
  onlyDiscounted,
  setOnlyDiscounted,
  categories,
  setCategories,
  distance,
  setDistance,
  onApply,
  onClose,
}: Props) {
  const toggleCategory = (category: string) => {
    if (categories.includes(category)) {
      setCategories(categories.filter((c) => c !== category));
    } else {
      setCategories([...categories, category]);
    }
  };

  const resetFilters = () => {
    setOnlyDiscounted(null);
    setCategories([]);
    setDistance('전체');
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 40 }}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.header}>
        <View style={styles.headerSpacer} />
        <Text style={styles.title}>필터</Text>
        <TouchableOpacity onPress={onClose}>
          <Ionicons name="close" size={28} color="#333" />
        </TouchableOpacity>
      </View>
      <View style={styles.divider} />

      {/* 할인 필터 */}
      <View style={styles.section}>
        <TouchableOpacity
          style={styles.checkboxRow}
          onPress={() => setOnlyDiscounted(true)}
        >
          <Ionicons
            name={
              onlyDiscounted === true ? 'checkbox-outline' : 'square-outline'
            }
            size={22}
            color={onlyDiscounted === true ? '#115E4B' : '#ccc'}
            style={styles.checkboxIcon}
          />
          <Text style={styles.checkboxLabel}>마감할인 상품만 보기</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.checkboxRow}
          onPress={() => setOnlyDiscounted(false)}
        >
          <Ionicons
            name={
              onlyDiscounted === false ? 'checkbox-outline' : 'square-outline'
            }
            size={22}
            color={onlyDiscounted === false ? '#115E4B' : '#ccc'}
            style={styles.checkboxIcon}
          />
          <Text style={styles.checkboxLabel}>판매중인 전체 상품 보기</Text>
        </TouchableOpacity>
      </View>

      {/* 카테고리 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>카테고리</Text>
        <View style={styles.buttonGrid}>
          {ALL_CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.categoryBtn,
                categories.includes(cat) && styles.selectedBtn,
              ]}
              onPress={() => toggleCategory(cat)}
            >
              <Text
                style={
                  categories.includes(cat)
                    ? styles.selectedText
                    : styles.categoryText
                }
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* 거리 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>거리</Text>
        <View style={styles.buttonGrid}>
          {DISTANCES.map((d) => (
            <TouchableOpacity
              key={d}
              style={[styles.categoryBtn, d === distance && styles.selectedBtn]}
              onPress={() => setDistance(d)}
            >
              <Text
                style={
                  d === distance ? styles.selectedText : styles.categoryText
                }
              >
                {d}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* 하단 버튼 */}
      <View style={styles.footerButtons}>
        <TouchableOpacity style={styles.resetBtn} onPress={resetFilters}>
          <Text style={styles.resetText}>초기화</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.applyBtn} onPress={onApply}>
          <Text style={styles.applyText}>적용하기</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerSpacer: {
    width: 28,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginTop: 10,
    marginBottom: 20,
  },
  section: {
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  checkboxIcon: {
    marginRight: 8,
    marginTop: 1,
  },
  checkboxLabel: {
    fontSize: 15,
    color: '#333',
  },
  buttonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  categoryBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#E0E0E0',
    marginBottom: 8,
  },
  selectedBtn: {
    backgroundColor: '#115E4B',
  },
  categoryText: {
    color: '#333',
  },
  selectedText: {
    color: '#fff',
  },
  footerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingBottom: 10,
  },
  resetBtn: {
    padding: 14,
    backgroundColor: '#ccc',
    borderRadius: 8,
    flex: 1,
    marginRight: 8,
  },
  applyBtn: {
    padding: 14,
    backgroundColor: '#115E4B',
    borderRadius: 8,
    flex: 1,
  },
  resetText: {
    textAlign: 'center',
    color: '#333',
    fontWeight: '500',
  },
  applyText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: '600',
  },
});
