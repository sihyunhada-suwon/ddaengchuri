import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  StatusBar,
  ScrollView,
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { useCartStore } from '@/stores/cartStore'; // ✅ Zustand 전역 상태 import

type Menu = {
  id: string;
  name: string;
  shopName: string;
  price: number;
  original: number;
  discountPct: number;
  badge?: '마감임박' | '1개 남았어요!';
  image: any;
  category: string;
};

const APP_GREEN = '#2d5d38';
const BORDER = '#e9ecef';
const TEXT_SUB = '#6b7280';
const LIGHT_GREY = '#eeeeee';
const PCT_BG = '#cce0d9';
const HERO_H = 340;

const KRW = (n: number) => n.toLocaleString('ko-KR') + '원';

export default function StorePage() {
  const router = useRouter();
  const { items, totalPrice } = useCartStore(); // ✅ Zustand 상태에서 데이터 가져오기
  const cartCount = items.reduce((sum, i) => sum + i.count, 0);

  const [liked, setLiked] = useState(false);
  const [activeTab, setActiveTab] = useState('전체');

  const shopName = 'NOVA BURGER';

  /** ✅ 인기메뉴 (상단에 노출) */
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
        image: require('@/assets/food/burger1.png'),
        category: '햄버거',
      },
      {
        id: 'm2',
        name: 'Chicken Burger Set',
        shopName,
        original: 12500,
        price: 9800,
        discountPct: 22,
        badge: '마감임박',
        image: require('@/assets/food/burger2.png'),
        category: '세트메뉴',
      },
    ],
    []
  );

  /** ✅ 전체 메뉴 */
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
        image: require('@/assets/food/burger3.png'),
        category: '햄버거',
      },
      {
        id: 'm4',
        name: 'Double Beef Burger',
        shopName,
        original: 13500,
        price: 10200,
        discountPct: 24,
        image: require('@/assets/food/burger4.png'),
        category: '세트메뉴',
      },
      {
        id: 'm5',
        name: 'Coke (R)',
        shopName,
        original: 2500,
        price: 1800,
        discountPct: 28,
        image: require('@/assets/food/coke.png'),
        category: '음료',
      },
    ],
    [popular]
  );

  /** ✅ 탭 필터 */
  const filteredMenus =
    activeTab === '전체'
      ? allMenus
      : allMenus.filter((m) => m.category === activeTab);

  /** ✅ 메뉴 카드 */
  const MenuCard = ({ item }: { item: Menu }) => (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.menuCard}
      onPress={() => router.push(`/product-detail?id=${item.id}`)}
    >
      <View style={styles.menuImage}>
        <Image
          source={item.image}
          style={{ width: '100%', height: '100%', resizeMode: 'cover' }}
        />
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

  /** ✅ 헤더 구성 */
  const Header = (
    <View>
      {/* 상단 이미지 (히어로) */}
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
            },
          ]}
          activeOpacity={0.8}
        >
          <Image
            source={require('@/assets/mypage/heart.png')}
            style={{ width: 23, height: 23, tintColor: '#fff' }}
            resizeMode="contain"
          />
        </TouchableOpacity>

        {/* 페이지 인디케이터 */}
        <View style={styles.pagePill}>
          <Text style={{ color: '#fff', fontWeight: '400', fontSize: 11 }}>
            1 / 3
          </Text>
        </View>
      </View>

      {/* 가게 카드 */}
      <View style={styles.shopCard}>
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

        <TouchableOpacity style={styles.shopInfoBtn} activeOpacity={0.8}>
          <Text style={{ color: '#8b939a', fontWeight: '500', fontSize: 11 }}>
            가게정보
          </Text>
        </TouchableOpacity>
      </View>

      {/* 인기 메뉴 */}
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

      {/* 카테고리 탭 */}
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
                    { color: active ? '#000' : '#c7cfd6' },
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
      {/* ✅ 상단 네비게이션 헤더 제거 */}
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar barStyle="light-content" />

      <FlatList
        data={filteredMenus}
        keyExtractor={(i) => i.id}
        ListHeaderComponent={Header}
        numColumns={2}
        columnWrapperStyle={{ paddingHorizontal: 16, gap: 12 }}
        contentContainerStyle={{ paddingBottom: 100, gap: 12 }}
        renderItem={({ item }) => (
          <View style={{ flex: 1 }}>
            <MenuCard item={item} />
          </View>
        )}
      />

      {/* ✅ 하단 주문 요약바 - Zustand 데이터 표시 */}
      {cartCount > 0 && (
        <View style={styles.orderBar}>
          <Text style={styles.orderText}>
            {cartCount}개 · {totalPrice.toLocaleString()}원
          </Text>
          <TouchableOpacity
            style={styles.orderButton}
            onPress={() => router.push('/cart')}
          >
            <Text style={styles.orderButtonText}>주문하기</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

/* -------------------- styles -------------------- */
const styles = StyleSheet.create({
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
  pagePill: {
    position: 'absolute',
    left: 20,
    bottom: 80,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 18,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  shopCard: {
    marginHorizontal: 16,
    top: HERO_H - 410,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 40,
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeCenter: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: APP_GREEN,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
  },
  badgeText: { color: '#fff', fontWeight: '800', fontSize: 11 },
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
  tabItem: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginRight: 24,
  },
  tabText: { fontWeight: '900', textAlign: 'center' },
  tabUnderline: {
    height: 2,
    backgroundColor: APP_GREEN,
    borderRadius: 2,
    width: 30,
    marginTop: 4,
  },
  /** ✅ 하단 주문바 스타일 */
  orderBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: BORDER,
    paddingHorizontal: 20,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 5,
  },
  orderText: { fontSize: 15, fontWeight: '600', color: '#000' },
  orderButton: {
    backgroundColor: APP_GREEN,
    paddingVertical: 10,
    paddingHorizontal: 22,
    borderRadius: 10,
  },
  orderButtonText: { color: '#fff', fontWeight: '700', fontSize: 15 },
});
