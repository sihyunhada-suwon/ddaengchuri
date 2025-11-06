import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { Stack, useRouter } from 'expo-router';

export default function CartScreen() {
  const router = useRouter();
  const [count, setCount] = useState(1);

  const product = {
    name: '치킨버거단품 + 감자튀김(R) + 콜라(R)',
    original: 12500,
    price: 9800,
    discount: 22,
    image: 'https://i.imgur.com/yxNQYx2.png',
    store: 'NOVA BURGER',
    pickupTime: '13:00 ~ 15:00',
  };

  const total = product.price * count;

  return (
    <SafeAreaView style={styles.safe}>
      <Stack.Screen options={{ headerShown: false }} />

      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 140 }}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Text style={styles.backArrow}>‹</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>장바구니</Text>
        </View>

        {/* Header와 픽업시간 사이 여백 */}
        <View style={{ height: 15 }} />

        {/* 픽업 시간 */}
        <View style={styles.pickupChip}>
          <Text style={styles.pickupChipText}>
            픽업 시간 {product.pickupTime}
          </Text>
        </View>
        <Text style={styles.pickupNotice}>
          픽업 가능 시간 내 반드시 방문 부탁드립니다. {'\n'}
          픽업 가능 시간 이후엔 보관이 어려워 자동 폐기될 수 있어요.
        </Text>

        {/* 굵은 회색 줄 - NOVA BURGER 위 */}
        <View style={styles.dividerThick} />

        {/* 가게 정보 */}
        <View style={styles.storeHeader}>
          <View style={styles.storeInfo}>
            <Image
              source={{ uri: 'https://i.imgur.com/Vs5m1N0.png' }}
              style={styles.storeLogo}
            />
            <Text style={styles.storeName}>{product.store}</Text>
            <TouchableOpacity onPress={() => router.push('/store')}>
              <Text style={styles.arrow}>›</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 얇은 회색 줄 - 상품 위 */}
        <View style={styles.dividerThin} />

        {/* 상품 카드 */}
        <View style={styles.itemBox}>
          <TouchableOpacity style={styles.deleteBtn}>
            <Text style={styles.deleteX}>×</Text>
          </TouchableOpacity>

          {/* 상품 정보 */}
          <View style={styles.itemRow}>
            <Image source={{ uri: product.image }} style={styles.itemImage} />
            <View style={styles.itemContent}>
              <Text style={styles.itemName}>{product.name}</Text>

              <View style={styles.priceRow}>
                <Text style={styles.priceLabel}>가격</Text>
                <Text style={styles.oldPrice}>
                  {product.original.toLocaleString()}원
                </Text>
                <Text style={styles.newPrice}>
                  {product.price.toLocaleString()}원
                </Text>
                <Text style={styles.discountTag}>{product.discount}%</Text>
              </View>
            </View>
          </View>

          {/* 수량 (사진 아래 전체행 차지) */}
          <View style={styles.countRow}>
            <Text style={styles.countLabel}>수량</Text>
            <View style={styles.countControls}>
              <TouchableOpacity
                style={styles.circleBtn}
                onPress={() => setCount(Math.max(1, count - 1))}
              >
                <Text style={styles.countSymbol}>−</Text>
              </TouchableOpacity>
              <Text style={styles.countNum}>{count}</Text>
              <TouchableOpacity
                style={styles.circleBtn}
                onPress={() => setCount(count + 1)}
              >
                <Text style={styles.countSymbol}>＋</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* 굵은 회색 줄 - 주문 상품 수 위 */}
        <View style={styles.dividerThick} />

        {/* 금액 요약 */}
        <View style={styles.amountSection}>
          <View style={styles.amountRow}>
            <Text style={styles.amountLabel}>주문 상품 수</Text>
            <Text style={styles.amountValue}>1건</Text>
          </View>
          <View style={styles.amountRow}>
            <Text style={styles.amountLabel}>총 주문 금액</Text>
            <Text style={styles.amountValue}>{total.toLocaleString()}원</Text>
          </View>

          {/* 얇은 회색 줄 */}
          <View style={styles.dividerThin} />

          <View style={styles.paymentRow}>
            <Text style={styles.paymentLabel}>결제 예정 금액</Text>
            <Text style={styles.paymentValue}>{total.toLocaleString()}원</Text>
          </View>
        </View>
      </ScrollView>

      {/* 하단 버튼 */}
      <TouchableOpacity
        style={styles.orderButton}
        onPress={() => router.push('../order')}
      >
        <Text style={styles.orderText}>주문하기</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  container: { paddingHorizontal: 20, backgroundColor: '#fff' },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 25,
  },
  backButton: { position: 'absolute', left: 0 },
  backArrow: { fontSize: 40, color: '#2D5D38', marginLeft: 10 },
  headerTitle: { fontSize: 22, fontWeight: '700', color: '#000' },

  pickupChip: {
    backgroundColor: '#DCE9E2',
    borderRadius: 25,
    alignSelf: 'flex-start',
    marginTop: 10,
    paddingHorizontal: 18,
    paddingVertical: 8,
  },
  pickupChipText: {
    color: '#2D5D38',
    fontSize: 17,
    fontWeight: '700',
  },
  pickupNotice: {
    marginTop: 10,
    fontSize: 14,
    color: '#888',
    backgroundColor: '#F8F8F8',
    borderRadius: 10,
    padding: 10,
    lineHeight: 20,
  },

  dividerThin: {
    height: 1,
    backgroundColor: '#E5E5E5',
    marginVertical: 20,
    width: '90%',
    alignSelf: 'center',
  },
  dividerThick: {
    height: 10,
    backgroundColor: '#E5E5E5',
    marginVertical: 20,
    width: '112%',
    alignSelf: 'center',
  },

  storeHeader: { flexDirection: 'row', alignItems: 'center' },
  storeInfo: { flexDirection: 'row', alignItems: 'center' },
  storeLogo: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
  storeName: { fontSize: 19, fontWeight: '700', color: '#000' },
  arrow: { fontSize: 25, color: '#999', marginLeft: 5 },

  itemBox: { backgroundColor: '#fff', position: 'relative' },
  deleteBtn: { position: 'absolute', top: 5, right: 5, zIndex: 1 },
  deleteX: { fontSize: 20, color: '#999' },
  itemRow: { flexDirection: 'row', marginTop: 25 },
  itemImage: { width: 100, height: 100, borderRadius: 10 },
  itemContent: { flex: 1, marginLeft: 12 },
  itemName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
    marginBottom: 10,
  },

  priceRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  priceLabel: { fontSize: 17, fontWeight: '700', marginRight: 6 },
  oldPrice: {
    textDecorationLine: 'line-through',
    color: '#999',
    fontSize: 15,
    marginRight: 6,
  },
  newPrice: { fontSize: 17, fontWeight: '700', color: '#000' },
  discountTag: {
    backgroundColor: '#E0EFE8',
    color: '#2D5D38',
    fontWeight: '700',
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
    fontSize: 13,
    marginLeft: 6,
  },

  countRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 12,
    marginRight: 8,
  },
  countLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    marginRight: 10,
  },
  countControls: { flexDirection: 'row', alignItems: 'center' },
  circleBtn: {
    width: 30,
    height: 30,
    borderRadius: 8,
    backgroundColor: '#F3F3F3',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 6,
  },
  countSymbol: { fontSize: 20, color: '#000', fontWeight: '700' },
  countNum: { fontSize: 18, fontWeight: '700', color: '#000' },

  amountSection: { backgroundColor: '#fff', marginTop: 10 },
  amountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  amountLabel: { fontSize: 17, color: '#444', fontWeight: '500' },
  amountValue: { fontSize: 17, color: '#000', fontWeight: '700' },

  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
  },
  paymentLabel: { fontSize: 19, fontWeight: '800', color: '#000' },
  paymentValue: { fontSize: 19, fontWeight: '800', color: '#000' },

  orderButton: {
    backgroundColor: '#2D5D38',
    height: 58,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  orderText: { color: '#fff', fontSize: 20, fontWeight: '800' },
});
