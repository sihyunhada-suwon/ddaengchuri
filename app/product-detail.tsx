import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import { useCartStore } from '@/stores/cartStore';

export default function ProductDetail() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const addItem = useCartStore((state) => state.addItem); // ✅ Zustand addItem 가져오기

  // 🧱 임시 상품 데이터
  const product = {
    id: id?.toString() || 'default',
    name: 'Chicken Burger Set',
    desc: '치킨버거단품 + 감자튀김(R) + 콜라(R)',
    detail:
      '두툼한 치킨 패티와 신선한 야채,\n담백한 번으로 완성한 인기 치킨버거 세트!\n매장에서 직접 튀긴 감자튀김과 음료도 함께 제공돼요.',
    price: 9800,
    original: 12500,
    discount: 22,
    pickupTime: '13:00 ~ 15:00',
    image: require('@/assets/food/burger2.png'),
  };

  const [count, setCount] = useState(1);
  const total = product.price * count;

  // ✅ 장바구니 추가 함수
  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      count: count,
      original: product.original, // ✅ 정가 추가
      discountPct: product.discount, // ✅ 할인율 추가
      storeName: 'NOVA BURGER',
    });

    Alert.alert('장바구니 담기 완료', '상품이 장바구니에 추가되었습니다.', [
      { text: '확인', onPress: () => router.push('/store') },
    ]);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <Stack.Screen
        options={{
          headerShown: false,
          title: '',
          headerBackVisible: false,
        }}
      />

      <ScrollView>
        {/* ✅ 상단 이미지 */}
        <View style={styles.imageContainer}>
          <Image source={product.image} style={styles.image} />
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* ✅ 내용 */}
        <View style={styles.content}>
          <Text style={styles.badge}>인기메뉴🔥</Text>
          <Text style={styles.title}>{product.name}</Text>
          <Text style={styles.subtitle}>{product.desc}</Text>
          <Text style={styles.detail}>{product.detail}</Text>

          {/* ✅ 가격 */}
          <View style={styles.priceRow}>
            <Text style={styles.originalPrice}>
              {product.original.toLocaleString()}원
            </Text>
            <Text style={styles.price}>{product.price.toLocaleString()}원</Text>
            <Text style={styles.discount}>{product.discount}%</Text>
          </View>

          {/* ✅ 수량 */}
          <View style={styles.countRow}>
            <Text style={styles.label}>수량</Text>
            <View style={styles.counter}>
              <TouchableOpacity
                onPress={() => setCount((p) => Math.max(1, p - 1))}
              >
                <Text style={styles.countButton}>−</Text>
              </TouchableOpacity>
              <Text style={styles.countText}>{count}</Text>
              <TouchableOpacity onPress={() => setCount((p) => p + 1)}>
                <Text style={styles.countButton}>＋</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* ✅ 픽업 정보 */}
          <View style={styles.pickupBox}>
            <Text style={styles.pickupLabel}>픽업 시간</Text>
            <Text style={styles.pickupTime}>{product.pickupTime}</Text>
          </View>

          <Text style={styles.pickupNotice}>
            픽업 가능한 시간 내 반드시 방문 부탁드립니다.{'\n'}
            이후엔 자동 폐기될 수 있어요.
          </Text>
        </View>
      </ScrollView>

      {/* ✅ 장바구니 버튼 */}
      <TouchableOpacity style={styles.cartButton} onPress={handleAddToCart}>
        <Text style={styles.cartText}>
          {total.toLocaleString()}원 | 장바구니에 담기
        </Text>
      </TouchableOpacity>
    </View>
  );
}

/* -------------------- Styles -------------------- */
const styles = StyleSheet.create({
  imageContainer: { position: 'relative' },
  image: { width: '100%', height: 330, resizeMode: 'cover' },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    backgroundColor: 'rgba(0,0,0,0.35)',
    borderRadius: 20,
    width: 38,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    marginTop: -25,
    padding: 24,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: '#e1f0e7',
    color: '#2d5d38',
    fontWeight: '600',
    fontSize: 13,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    marginBottom: 8,
  },
  title: { fontSize: 22, fontWeight: '700', color: '#222' },
  subtitle: { fontSize: 15, color: '#555', marginTop: 6 },
  detail: {
    color: '#888',
    marginTop: 12,
    lineHeight: 20,
    fontSize: 13,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 18,
  },
  originalPrice: {
    textDecorationLine: 'line-through',
    color: '#999',
    marginRight: 6,
  },
  price: { fontSize: 18, fontWeight: '700', color: '#000', marginRight: 4 },
  discount: {
    backgroundColor: '#cce0d9',
    color: '#2d5d38',
    fontWeight: '700',
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
    fontSize: 13,
  },
  countRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 22,
    justifyContent: 'space-between',
  },
  label: { fontSize: 15, fontWeight: '600', color: '#222' },
  counter: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f3f3',
    borderRadius: 8,
  },
  countButton: { fontSize: 22, paddingHorizontal: 14, color: '#333' },
  countText: { fontSize: 16, fontWeight: '600', paddingHorizontal: 10 },
  pickupBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e5f0e7',
    justifyContent: 'space-between',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginTop: 24,
  },
  pickupLabel: { fontSize: 14, fontWeight: '600', color: '#333' },
  pickupTime: { fontSize: 15, fontWeight: '700', color: '#1b5e20' },
  pickupNotice: {
    backgroundColor: '#f6f6f6',
    color: '#888',
    fontSize: 12,
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    lineHeight: 18,
  },
  cartButton: {
    backgroundColor: '#1b5e20',
    paddingVertical: 16,
    alignItems: 'center',
  },
  cartText: { color: '#fff', fontSize: 17, fontWeight: '600' },
});
