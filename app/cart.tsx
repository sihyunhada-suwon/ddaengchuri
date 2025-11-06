import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';

export default function CartScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backArrow}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>장바구니</Text>
      </View>

      {/* 픽업 시간 */}
      <View style={styles.pickupContainer}>
        <Text style={styles.pickupLabel}>픽업 시간</Text>
        <View style={styles.pickupTime}>
          <Text style={styles.pickupText}>13:00 ~ 15:00</Text>
        </View>
        <Text style={styles.pickupNotice}>
          픽업 가능 시간 내 반드시 방문 부탁드립니다. {'\n'}
          이후엔 보관이 어려워 자동 폐기될 수 있어요.
        </Text>
      </View>

      {/* 상품 */}
      <View style={styles.storeContainer}>
        <View style={styles.storeHeader}>
          <Image
            source={{ uri: 'https://i.imgur.com/Vs5m1N0.png' }}
            style={styles.logo}
          />
          <Text style={styles.storeName}>NOVA BURGER</Text>
        </View>

        <View style={styles.itemCard}>
          <Image
            source={{ uri: 'https://i.imgur.com/yxNQYx2.png' }}
            style={styles.itemImage}
          />
          <View style={{ flex: 1, marginLeft: 10 }}>
            <Text style={styles.itemName}>
              치킨버거단품 + 감자튀김(R) + 콜라(R)
            </Text>
            <View style={styles.priceRow}>
              <Text style={styles.oldPrice}>12,500원</Text>
              <Text style={styles.newPrice}>9,800원</Text>
              <Text style={styles.discount}>22%</Text>
            </View>
            <View style={styles.quantityRow}>
              <TouchableOpacity style={styles.qtyButton}>
                <Text>-</Text>
              </TouchableOpacity>
              <Text style={styles.qtyText}>1</Text>
              <TouchableOpacity style={styles.qtyButton}>
                <Text>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      {/* 총액 */}
      <View style={styles.summary}>
        <View style={styles.summaryRow}>
          <Text>주문 상품 수</Text>
          <Text>1건</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text>총 주문 금액</Text>
          <Text>9,800원</Text>
        </View>
      </View>

      {/* 결제 예정 금액 */}
      <View style={styles.footer}>
        <Text style={styles.footerLabel}>결제 예정 금액</Text>
        <Text style={styles.footerPrice}>9,800원</Text>
        <TouchableOpacity
          style={styles.orderButton}
          onPress={() => router.push('../order')}
        >
          <Text style={styles.orderButtonText}>주문하기</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#fff', flex: 1, paddingHorizontal: 20 },
  header: { flexDirection: 'row', alignItems: 'center', marginTop: 50 },
  backArrow: { fontSize: 22, color: '#000', marginRight: 10 },
  headerTitle: { fontSize: 18, fontWeight: '600' },

  pickupContainer: { marginTop: 20 },
  pickupLabel: { fontWeight: '600', marginBottom: 5 },
  pickupTime: {
    backgroundColor: '#E0F0E8',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 15,
    alignSelf: 'flex-start',
  },
  pickupText: { color: '#1C3C2E', fontWeight: '600' },
  pickupNotice: { color: '#999', fontSize: 12, marginTop: 5 },

  storeContainer: { marginTop: 30 },
  storeHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  logo: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
  storeName: { fontWeight: '700', fontSize: 16 },

  itemCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  itemImage: { width: 80, height: 80, borderRadius: 8 },
  itemName: { fontWeight: '500', fontSize: 13 },
  priceRow: { flexDirection: 'row', alignItems: 'center', marginTop: 3 },
  oldPrice: {
    textDecorationLine: 'line-through',
    color: '#999',
    marginRight: 5,
  },
  newPrice: { fontWeight: '700' },
  discount: { color: 'green', marginLeft: 5 },
  quantityRow: { flexDirection: 'row', alignItems: 'center', marginTop: 5 },
  qtyButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  qtyText: { marginHorizontal: 10, fontWeight: '600' },

  summary: { marginTop: 30 },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },

  footer: { marginTop: 20, alignItems: 'center' },
  footerLabel: { color: '#444', fontSize: 14 },
  footerPrice: { fontSize: 18, fontWeight: '700', marginTop: 3 },
  orderButton: {
    backgroundColor: '#124D37',
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 100,
    marginTop: 15,
  },
  orderButtonText: { color: '#fff', fontWeight: '700' },
});
