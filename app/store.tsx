import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  StatusBar,
  ScrollView, // ✅ 추가
} from 'react-native';
import { Stack, useRouter } from 'expo-router';

type Menu = {
  id: string;
  name: string;
  shopName: string;
  price: number;
  original: number;
  discountPct: number;
  badge?: '마감임박' | '1개 남았어요!';
};

const APP_GREEN = '#2d5d38'; // 리스트 페이지에서 쓰던 초록색 (요청 유지)
const BORDER = '#e9ecef';
const TEXT_SUB = '#6b7280';
const LIGHT_GREY = '#eeeeee';
const PCT_BG = '#cce0d9';
const HERO_H = 340;

const KRW = (n: number) => n.toLocaleString('ko-KR') + '원';

export default function StorePage() {
  const router = useRouter();

  const [liked, setLiked] = useState(false);
  const [activeTab, setActiveTab] = useState('전체');

  const shopName = 'NOVA BURGER';

  const popular = useMemo<Menu[]>(
    () => [
      {
        id: 'm1',
        name: 'Cheese Burger',
        shopName,
        original: 7500,
        price: 5700,
        discountPct: 24,
        badge: '1개 남았어요!',
      },
      {
        id: 'm2',
        name: 'Chicken Burger set',
        shopName,
        original: 12500,
        price: 9800,
        discountPct: 22,
        badge: '마감임박',
      },
    ],
    []
  );

  const allMenus: Menu[] = useMemo(
    () => [
      ...popular,
      {
        id: 'm3',
        name: 'Avocado Burger',
        shopName,
        original: 11000,
        price: 8800,
        discountPct: 20,
      },
      {
        id: 'm4',
        name: 'Double Beef Burger',
        shopName,
        original: 13500,
        price: 10200,
        discountPct: 24,
      },
    ],
    [popular]
  );

  const MenuCard = ({ item }: { item: Menu }) => (
    <TouchableOpacity activeOpacity={0.9} style={styles.menuCard}>
      <View style={styles.menuImage}>
        {item.badge ? (
          <View
            style={[
              styles.badgeCenter,
              item.badge === '마감임박' && { backgroundColor: '#1f2937' },
            ]}
          >
            <Text style={styles.badgeText}>
              {item.badge === '마감임박' ? '마감시간 임박!' : '1개 남았어요!'}
            </Text>
          </View>
        ) : null}
      </View>
      <View style={{ padding: 10 }}>
        <Text style={styles.menuName} numberOfLines={1}>
          {item.name}
        </Text>
        <View style={styles.priceRow}>
          <Text style={styles.originalPrice}>{KRW(item.original)}</Text>
          <Text style={styles.salePrice}>{KRW(item.price)}</Text>
          <View style={styles.pctPill}>
            <Text style={styles.pctText}>{item.discountPct}%</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const Header = (
    <View>
      {/* 상단 히어로 이미지 자리 */}
      <View style={styles.heroWrap}>
        <View style={styles.hero} />

        {/* 뒤로가기 */}
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Text style={{ color: '#fff', fontSize: 20 }}>←</Text>
        </TouchableOpacity>

        {/* 찜 하트 */}
        <TouchableOpacity
          onPress={() => setLiked((v) => !v)}
          style={[
            styles.heartBtn,
            {
              backgroundColor: liked ? 'rgba(0,98,65,0.7)' : 'rgba(0,0,0,0.35)',
            }, // APP_GREEN 70% or dark
          ]}
          activeOpacity={0.8}
        >
          <Image
            source={require('@/assets/mypage/heart.png')}
            style={{ width: 23, height: 23, tintColor: '#fff' }}
            resizeMode="contain"
          />
        </TouchableOpacity>

        {/* 1/3 인디케이터 - 카드에 가려지지 않게 왼쪽 윗부분으로 올림 */}
        <View style={styles.pagePill}>
          <Text style={{ color: '#fff', fontWeight: '400', fontSize: 11 }}>
            1 / 3
          </Text>
        </View>
      </View>

      {/* 가게 정보 카드 - 히어로에 걸쳐 올라오게 */}
      <View style={styles.shopCard}>
        {/* 중앙 원형 로고 (카드 상단 중앙 겹침) */}
        <View style={styles.logoOnCard}>
          <View style={styles.logoCircle}>
            <Text
              style={{
                fontWeight: '600',
                fontSize: 12,
                color: '#f2d98b',
                textAlign: 'center',
              }}
            >
              NOVA{'\n'}BURGER
            </Text>
          </View>
        </View>

        {/* 가운데 정렬된 텍스트들 */}
        <View style={{ width: '100%', alignItems: 'center' }}>
          <Text style={styles.storeTitle}>
            NOVA BURGER <Text style={{ color: '#f5b90b' }}>⭐️ 4.9</Text>{' '}
            <Text style={styles.small}>(10)</Text> 〉
          </Text>
          <Text style={[styles.small, { marginTop: 6, textAlign: 'center' }]}>
            서울시 강남구 테헤란로 123
          </Text>
          <Text style={[styles.small, { marginTop: 10, textAlign: 'center' }]}>
            🕒 영업시간: 11:00 ~ 20:00 (매주 월요일 휴무)
          </Text>
        </View>

        {/* 가게정보 버튼 - 카드 우상단 */}
        <TouchableOpacity style={styles.shopInfoBtn} activeOpacity={0.8}>
          <Text style={{ color: '#8b939a', fontWeight: '500', fontSize: 11 }}>
            가게정보
          </Text>
        </TouchableOpacity>
      </View>

      {/* 인기메뉴 */}
      <View style={{ paddingHorizontal: 16, marginTop: 16 }}>
        <Text style={styles.sectionTitle}>인기메뉴 ✨</Text>
      </View>
      <View style={styles.gridWrap}>
        {popular.map((m) => (
          <View key={`pop-${m.id}`} style={styles.gridItem}>
            <MenuCard item={m} />
          </View>
        ))}
      </View>

      {/* ✅ 탭: 가로 스크롤 + 텍스트 고정 + 밑줄만 이동 */}
      <ScrollView
        style={{ marginTop: 12 }}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 16,
          alignItems: 'flex-end',
        }}
      >
        {['전체', '신메뉴', '햄버거', '세트메뉴', '사이드', '음료', '소스'].map(
          (t) => {
            const active = activeTab === t;
            return (
              <TouchableOpacity
                key={t}
                onPress={() => setActiveTab(t)}
                style={styles.tabItem}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.tabText,
                    { color: active ? '#000' : '#c7cfd6' }, // 텍스트는 위치 고정, 색만 변화
                  ]}
                >
                  {t}
                </Text>
                {active && <View style={styles.tabUnderline} />}
              </TouchableOpacity>
            );
          }
        )}
      </ScrollView>

      <View style={{ height: 8 }} />
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* 상단 시스템 헤더 숨김 */}
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar barStyle="light-content" />

      {/* 단일 FlatList로(ScrollView 중첩 없음) */}
      <FlatList
        data={allMenus}
        keyExtractor={(i) => i.id}
        ListHeaderComponent={Header}
        numColumns={2}
        columnWrapperStyle={{ paddingHorizontal: 16, gap: 12 }}
        contentContainerStyle={{ paddingBottom: 40, gap: 12 }}
        renderItem={({ item }) => (
          <View style={{ flex: 1 }}>
            <MenuCard item={item} />
          </View>
        )}
      />
    </View>
  );
}

/* -------------------- styles -------------------- */
const styles = StyleSheet.create({
  /* 히어로 */
  heroWrap: { position: 'relative', height: HERO_H, backgroundColor: '#000' },
  hero: { flex: 1, backgroundColor: LIGHT_GREY },
  backBtn: {
    position: 'absolute',
    top: 55,
    left: 20,
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  heartBtn: {
    position: 'absolute',
    top: 55,
    right: 20,
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // 인디케이터가 카드에 가리지 않도록 위로 올림
  pagePill: {
    position: 'absolute',
    left: 20,
    bottom: 80, // 카드와 겹치지 않게 충분히 올림
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 18,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },

  /* 가게 정보 카드: 더 크고 중앙 정렬 */
  shopCard: {
    marginHorizontal: 16,
    top: HERO_H - 410, // 히어로에 '걸치도록' 더 당김 (요청 유지)
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 40, // 높이 키움 (요청 유지)
    paddingTop: 50,
    marginBottom: -50,
    borderWidth: 1,
    borderColor: BORDER,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 3,
  },
  logoOnCard: {
    position: 'absolute',
    top: -48,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  logoCircle: {
    width: 85,
    height: 85,
    borderRadius: 50,
    backgroundColor: '#101010',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  storeTitle: { fontSize: 18, fontWeight: '700', textAlign: 'center' },
  small: { color: TEXT_SUB, fontSize: 12 },

  shopInfoBtn: {
    position: 'absolute',
    right: 12,
    top: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: '#f3f5f7',
    borderWidth: 1,
    borderColor: BORDER,
  },

  /* 섹션/그리드 */
  sectionTitle: { fontSize: 16, fontWeight: '800' },
  gridWrap: {
    paddingHorizontal: 16,
    marginTop: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  gridItem: { width: '48%' },

  menuCard: {
    backgroundColor: '#fff',
    borderRadius: 14,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: BORDER,
  },
  menuImage: {
    height: 120,
    backgroundColor: LIGHT_GREY,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeCenter: {
    backgroundColor: APP_GREEN,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 12,
  },
  badgeText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 12,
    textAlign: 'center',
  },
  menuName: { fontWeight: '800', marginTop: 8, textAlign: 'center' },
  priceRow: {
    marginTop: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  originalPrice: { color: TEXT_SUB, textDecorationLine: 'line-through' },
  salePrice: { fontWeight: '900' },
  pctPill: {
    backgroundColor: PCT_BG,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  pctText: { color: APP_GREEN, fontWeight: '800', fontSize: 12 },

  /* ✅ 탭 (수정 완료) */
  tabs: {
    // 기존 styles.tabs는 유지해도 되지만 현재는 ScrollView로 대체됨
    // 남겨둠: 다른 곳에서 재사용할 수 있으므로
    marginTop: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 44,
    borderBottomWidth: 1,
    borderColor: '#e3e6ea',
  },
  tabItem: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginRight: 24, // 탭 사이 간격 유지
  },
  tabText: {
    fontWeight: '900',
    textAlign: 'center', // 가운데 정렬
  },
  tabUnderline: {
    height: 2, // 더 얇게
    backgroundColor: APP_GREEN,
    borderRadius: 2,
    width: 30, // 약간 더 길게 (텍스트 길이에 맞춰 보이도록)
    marginTop: 4,
  },
});
