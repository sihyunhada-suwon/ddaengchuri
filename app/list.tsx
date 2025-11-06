// app/list.tsx
import React, { useMemo, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  TextInput,
} from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

type Store = {
  id: string;
  name: string;
  rating: number;
  reviews: number;
  hours: string;
  distance: string;
  sale?: boolean;
};

type MenuItem = {
  id: string;
  store: string;
  name: string;
  price: number; // 원가
  salePrice: number; // 할인 가격
  discountPct: number; // 30 -> 30%
};

const GREEN = '#2d5d38';

const bannerCards = [
  { id: 'b1', title: 'The Cozy Cup', distance: '1km' },
  { id: 'b2', title: '메종 브런치', distance: '1km' },
  { id: 'b3', title: '카페 로라', distance: '1.2km' },
];

const stores: Store[] = [
  {
    id: '1',
    name: 'Cafe Scent',
    rating: 4.9,
    reviews: 30,
    hours: '10:00 ~ 20:00',
    distance: '1km',
    sale: true,
  },
  {
    id: '2',
    name: '브레디',
    rating: 4.9,
    reviews: 30,
    hours: '11:00 ~ 20:00',
    distance: '1km',
  },
  {
    id: '3',
    name: '슬로우 데이',
    rating: 4.9,
    reviews: 30,
    hours: '12:00 ~ 21:00',
    distance: '1.5km',
  },
  {
    id: '4',
    name: 'Leafy',
    rating: 4.9,
    reviews: 30,
    hours: '10:00 ~ 19:00',
    distance: '2km',
    sale: true,
  },
];

// ✅ 메뉴 탭에 표시할 임의 데이터
const menuItems: MenuItem[] = [
  {
    id: 'm1',
    store: 'The Cozy Cup',
    name: '허니버터 크루아상',
    price: 4800,
    salePrice: 3400,
    discountPct: 29,
  },
  {
    id: 'm2',
    store: '메종 브런치',
    name: '리코타 샐러드',
    price: 9200,
    salePrice: 6900,
    discountPct: 25,
  },
  {
    id: 'm3',
    store: '카페 로라',
    name: '에그샌드위치',
    price: 6500,
    salePrice: 4900,
    discountPct: 24,
  },
];

const C = {
  bg: '#ffffff',
  text: '#111827',
  sub: '#6B7280',
  line: '#E5E7EB',
  gray: '#E9EEF2',
  chip: '#F3F4F6',
  green: GREEN,
};

type FilterKey = 'sort' | 'category' | 'distance';

const SORT_OPTS = ['가까운순', '할인율 높은순', '리뷰많은순'];
const CATEGORY_OPTS = [
  '모든가게',
  '음식점/프랜차이즈',
  '편의점',
  '마트/슈퍼',
  '백화점',
];
const DIST_OPTS = ['전체 거리', '1km 미만', '2km', '3km 이상'];

export default function ListPage() {
  const router = useRouter();
  const { q } = useLocalSearchParams<{ q?: string }>();

  const [keyword, setKeyword] = useState(q ?? '카페');
  const [tab, setTab] = useState<'store' | 'menu'>('store');

  const [sortLabel, setSortLabel] = useState(SORT_OPTS[0]);
  const [categoryLabel, setCategoryLabel] = useState(CATEGORY_OPTS[0]);
  const [distanceLabel, setDistanceLabel] = useState(DIST_OPTS[0]);
  const [openFilter, setOpenFilter] = useState<FilterKey | null>(null);

  const storeCount = useMemo(() => stores.length, []);
  const menuCount = menuItems.length;

  const onSelect = (key: FilterKey, value: string) => {
    if (key === 'sort') setSortLabel(value);
    if (key === 'category') setCategoryLabel(value);
    if (key === 'distance') setDistanceLabel(value);
    setOpenFilter(null);
  };

  const DropdownCard = ({
    items,
    selected,
    onPick,
  }: {
    items: string[];
    selected: string;
    onPick: (v: string) => void;
  }) => (
    <View style={styles.dropdownCard}>
      {items.map((t, i) => (
        <View key={t}>
          <TouchableOpacity
            style={styles.optionRow}
            activeOpacity={0.8}
            onPress={() => onPick(t)}
          >
            <View style={{ width: 22 }}>
              {t === selected && (
                <Ionicons name="checkmark" size={18} color={C.text} />
              )}
            </View>
            <Text style={styles.optionText}>{t}</Text>
          </TouchableOpacity>
          {i !== items.length - 1 && <View style={styles.optionDivider} />}
        </View>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: C.bg }}>
      <Stack.Screen options={{ headerShown: false }} />

      {/* 상단 헤더 */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.push('/search')}
          style={styles.backBtn}
        >
          <Ionicons name="chevron-back" size={26} color="#111" />
        </TouchableOpacity>

        <View style={styles.headerInputWrap}>
          <TextInput
            value={keyword}
            onChangeText={setKeyword}
            placeholder="검색어를 입력해주세요."
            placeholderTextColor="#999"
            returnKeyType="search"
            style={styles.headerInput}
          />
        </View>

        <TouchableOpacity
          onPress={() => setKeyword('')}
          style={styles.clearBtn}
        >
          <Ionicons name="close-circle" size={20} color="#bbb" />
        </TouchableOpacity>
      </View>

      {/* 탭 */}
      <View>
        <View style={styles.tabsRow}>
          <TouchableOpacity
            onPress={() => setTab('store')}
            style={styles.tabHalf}
            activeOpacity={0.8}
          >
            <Text
              style={[styles.tabText, tab === 'store' && styles.tabTextActive]}
            >
              가게({storeCount})
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setTab('menu')}
            style={styles.tabHalf}
            activeOpacity={0.8}
          >
            <Text
              style={[styles.tabText, tab === 'menu' && styles.tabTextActive]}
            >
              메뉴({menuCount})
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.splitUnderlineWrap}>
          <View
            style={[
              styles.splitUnderline,
              tab === 'store' ? styles.ulineActive : styles.ulineInactive,
            ]}
          />
          <View
            style={[
              styles.splitUnderline,
              tab === 'menu' ? styles.ulineActive : styles.ulineInactive,
            ]}
          />
        </View>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
        {/* 마감시간 배너 타이틀 */}
        <View style={styles.bannerTitleRow}>
          <Text style={{ fontSize: 16, marginRight: 6 }}>⏰</Text>
          <Text style={{ fontSize: 16, fontWeight: '700', color: C.text }}>
            마감시간 임박! 지금 바로 담아가세요
          </Text>
        </View>

        {/* 가로 배너 카드 */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16 }}
        >
          {bannerCards.map((b) => (
            <View key={b.id} style={styles.bannerCard}>
              <View style={styles.bannerImage}>
                <View style={styles.bannerBottomBadge}>
                  <Text style={styles.bannerBottomText}>마감시간 임박!</Text>
                </View>
              </View>
              <View style={styles.bannerInfoCentered}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={styles.bannerName}>{b.title}</Text>
                  <Text style={styles.bannerDist}> {b.distance}</Text>
                </View>
              </View>
              <View style={styles.bannerRatingCenter}>
                <Text style={styles.bannerRatingText}>⭐ 4.9 (10)</Text>
              </View>
            </View>
          ))}
          <View style={{ width: 8 }} />
        </ScrollView>

        {/* 구분선 */}
        <View style={styles.divider} />

        {/* 필터 칩 */}
        <View style={styles.filterRow}>
          <Chip
            label={sortLabel}
            caret
            onPress={() => setOpenFilter(openFilter === 'sort' ? null : 'sort')}
          />
          <Chip
            label={categoryLabel}
            caret
            onPress={() =>
              setOpenFilter(openFilter === 'category' ? null : 'category')
            }
          />
          <Chip
            label={distanceLabel}
            caret
            onPress={() =>
              setOpenFilter(openFilter === 'distance' ? null : 'distance')
            }
          />
        </View>

        {/* 드롭다운 (고정) */}
        {openFilter && (
          <View style={styles.absoluteDropdownWrap}>
            {openFilter === 'sort' && (
              <View style={[styles.inlineDropdownSlot, { left: 20 }]}>
                <DropdownCard
                  items={SORT_OPTS}
                  selected={sortLabel}
                  onPick={(v) => onSelect('sort', v)}
                />
              </View>
            )}
            {openFilter === 'category' && (
              <View style={[styles.inlineDropdownSlot, { left: 135 }]}>
                <DropdownCard
                  items={CATEGORY_OPTS}
                  selected={categoryLabel}
                  onPick={(v) => onSelect('category', v)}
                />
              </View>
            )}
            {openFilter === 'distance' && (
              <View style={[styles.inlineDropdownSlot, { left: 250 }]}>
                <DropdownCard
                  items={DIST_OPTS}
                  selected={distanceLabel}
                  onPick={(v) => onSelect('distance', v)}
                />
              </View>
            )}
          </View>
        )}

        {/* ===== 리스트 ===== */}
        {tab === 'store' ? (
          <FlatList
            data={stores}
            keyExtractor={(i) => i.id}
            scrollEnabled={false}
            contentContainerStyle={{ paddingHorizontal: 14 }}
            ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
            renderItem={({ item }) => (
              // ✅ 가게 카드 터치 시 /store 로 이동
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => router.push('/store')}
                style={[
                  styles.storeRow,
                  { paddingHorizontal: 5, marginTop: 12 },
                ]}
              >
                <View style={styles.thumb} />
                <View style={{ flex: 1, paddingRight: 8 }}>
                  <Text style={styles.storeName}>{item.name}</Text>
                  <View style={styles.ratingRow}>
                    <Text style={styles.star}>⭐</Text>
                    <Text style={styles.ratingText}>
                      {item.rating.toFixed(1)} ({item.reviews})
                    </Text>
                    <Text style={styles.hours}> {item.hours}</Text>
                    <Text style={styles.distance}> {item.distance}</Text>
                  </View>
                </View>
                {item.sale && (
                  <View style={styles.salePillRight}>
                    <Text style={styles.salePillText}>마감할인중</Text>
                  </View>
                )}
              </TouchableOpacity>
            )}
          />
        ) : (
          // ✅ 메뉴 탭: 칩스 밑에 표시
          <FlatList
            data={menuItems}
            keyExtractor={(i) => i.id}
            scrollEnabled={false}
            contentContainerStyle={{ paddingHorizontal: 14, paddingTop: 6 }}
            ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
            renderItem={({ item }) => (
              <View style={styles.menuRow}>
                {/* ✅ 썸네일 (조금 더 큼) + 하단 배지(허니버터만) */}
                <View style={styles.menuThumbWrap}>
                  <View style={styles.menuThumb} />
                  {item.id === 'm1' && (
                    <View style={styles.menuBottomBadge}>
                      <Text style={styles.menuBottomText}>1개 남았어요!</Text>
                    </View>
                  )}
                </View>

                {/* 우측 정보 */}
                <View style={{ flex: 1 }}>
                  <Text style={styles.menuStoreSmall}>{item.store}</Text>
                  <Text style={styles.menuName}>{item.name}</Text>
                  <View style={styles.menuPriceRow}>
                    <Text style={styles.menuOrigPrice}>
                      {item.price.toLocaleString()}원
                    </Text>
                    <Text style={styles.menuSalePrice}>
                      {item.salePrice.toLocaleString()}원
                    </Text>
                    <View style={styles.discountBadge}>
                      <Text style={styles.discountText}>
                        {item.discountPct}%
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            )}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

/* Chip */
function Chip({
  label,
  caret,
  onPress,
}: {
  label: string;
  caret?: boolean;
  onPress?: () => void;
}) {
  return (
    <TouchableOpacity style={styles.chip} activeOpacity={0.9} onPress={onPress}>
      <Text style={{ fontWeight: '500', color: C.text }}>{label}</Text>
      {caret && (
        <Ionicons
          name="chevron-down"
          size={12}
          color={C.text}
          style={{ marginLeft: 4 }}
        />
      )}
    </TouchableOpacity>
  );
}

/* Styles */
const styles = StyleSheet.create({
  header: {
    height: 64,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    gap: 8,
    marginTop: 6,
  },
  backBtn: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerInputWrap: { flex: 1 },
  headerInput: { fontSize: 16, color: C.text, paddingVertical: 6 },
  clearBtn: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },

  tabsRow: { flexDirection: 'row', alignItems: 'center' },
  tabHalf: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  tabText: { fontSize: 16, color: C.sub, fontWeight: '600' },
  tabTextActive: { color: C.text, fontWeight: '600' },
  splitUnderlineWrap: {
    flexDirection: 'row',
    width: '100%',
    height: 2,
    marginTop: 6,
    marginBottom: 12,
  },
  splitUnderline: { flex: 1 },
  ulineActive: { backgroundColor: C.green },
  ulineInactive: { backgroundColor: C.line },

  bannerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    marginBottom: 10,
  },
  bannerCard: { width: 157, marginTop: 12, marginRight: 15 },
  bannerImage: {
    width: 157,
    height: 118,
    backgroundColor: C.gray,
    borderRadius: 12,
    overflow: 'hidden',
  },

  // 하단 초록색 박스 (투명도 70%)
  bannerBottomBadge: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(45,93,56,0.7)',
    alignItems: 'center',
    paddingVertical: 6,
  },
  bannerBottomText: { color: '#fff', fontWeight: '700', fontSize: 13 },

  bannerInfoCentered: {
    width: 157,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 13,
  },
  bannerName: {
    fontSize: 14,
    fontWeight: '600',
    color: C.text,
    textAlign: 'center',
  },
  bannerDist: {
    fontSize: 12,
    color: C.sub,
    fontWeight: '600',
    textAlign: 'center',
  },
  bannerRatingCenter: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  bannerRatingText: { fontSize: 12, color: C.text, fontWeight: '600' },

  divider: {
    height: 1,
    backgroundColor: '#f5f4f0',
    marginTop: 20,
    marginBottom: 8,
  },
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    gap: 8,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: '#F3F4F6',
    borderRadius: 20,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#E5E7EB',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 8,
  },

  absoluteDropdownWrap: {
    position: 'absolute',
    top: 265,
    left: 0,
    right: 0,
    zIndex: 50,
  },
  inlineDropdownSlot: { position: 'absolute', width: 180 },
  dropdownCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 4,
    width: 180,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 14,
  },
  optionText: { fontSize: 16, color: '#111' },
  optionDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#ECECEC',
    marginLeft: 14,
  },

  // 가게 리스트
  storeRow: { flexDirection: 'row', alignItems: 'center' },
  thumb: {
    width: 110,
    height: 90,
    borderRadius: 12,
    backgroundColor: C.gray,
    marginRight: 17,
  },
  storeName: {
    fontSize: 15,
    fontWeight: '600',
    color: C.text,
    flexShrink: 1,
    marginBottom: 4,
  },
  ratingRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  star: { fontSize: 12, marginRight: 4 },
  ratingText: { color: C.text, fontWeight: '500' },
  hours: { color: C.sub, marginLeft: 4, fontSize: 11 },
  distance: { color: C.sub, marginLeft: 4, fontSize: 11 },
  salePillRight: {
    alignSelf: 'center',
    backgroundColor: C.green,
    paddingHorizontal: 11,
    paddingVertical: 6,
    borderRadius: 18,
    marginLeft: 'auto',
    marginBottom: 60,
  },
  salePillText: { color: '#fff', fontWeight: '500', fontSize: 11 },

  // ✅ 메뉴 탭 카드
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F7F7',
    borderRadius: 12,
    padding: 12,
  },
  // 썸네일 래퍼(배지 오버레이용)
  menuThumbWrap: {
    width: 124,
    height: 100,
    borderRadius: 12,
    overflow: 'hidden',
    marginRight: 20,
    position: 'relative',
    backgroundColor: 'transparent',
  },
  menuThumb: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
    backgroundColor: C.gray,
  },
  // 허니버터(첫 카드) 하단 배지
  menuBottomBadge: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(45,93,56,0.7)',
    alignItems: 'center',
    paddingVertical: 5,
  },
  menuBottomText: { color: '#fff', fontWeight: '700', fontSize: 12 },

  menuStoreSmall: { fontSize: 12, color: C.sub, marginBottom: 2 },
  menuName: { fontSize: 16, fontWeight: '600', color: C.text, marginBottom: 8 },
  menuPriceRow: { flexDirection: 'row', alignItems: 'center' },
  menuOrigPrice: {
    fontSize: 13,
    color: '#888',
    textDecorationLine: 'line-through',
    marginRight: 8,
  },
  menuSalePrice: {
    fontSize: 15,
    fontWeight: '600',
    color: C.text,
    marginRight: 8,
  },
  discountBadge: {
    backgroundColor: '#cce0d9',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  discountText: { color: C.green, fontWeight: '600', fontSize: 12 },
});
