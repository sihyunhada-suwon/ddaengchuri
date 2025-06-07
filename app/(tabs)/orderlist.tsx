import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const orders = [
  {
    date: '2025.04.10 (\uBAA9)',
    store: '브런치랩',
    menu: '아보카도 샌드위치 1개\n리코타 치즈 샐러드 1개',
    price: '9,500원',
    point: 220,
    image: require('../../assets/food/brunch.jpg'),
    status: '지금 픽업하기 (13:00)',
    showReview: false,
  },
  {
    date: '2025.04.05 (\uD1A0)',
    store: '세븐일레븐',
    menu: '참치마요 삼각김밥 2개\n11찬 도시락 1개 외 1건',
    price: '5,800원',
    point: 120,
    image: require('../../assets/seven.jpeg'),
    status: '픽업 완료',
    showReview: true,
  },
  {
    date: '2025.04.01 (\uD654)',
    store: '피자포레스트',
    menu: '콤비네이션 피자 1판',
    price: '12,000원',
    point: 300,
    image: require('../../assets/food/pizza.jpg'),
    status: '픽업 완료',
    showReview: false,
  },
];

const OrderListScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>주문내역</Text>

      <View style={styles.searchRow}>
        <View style={styles.searchBar}>
          <Ionicons
            name="search"
            size={18}
            color="#aaa"
            style={{ marginRight: 8 }}
          />
          <TextInput
            placeholder="주문했던 메뉴와 가게를 검색해보세요"
            placeholderTextColor="#aaa"
            style={styles.searchInput}
          />
        </View>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => console.log('필터 열기')}
        >
          <Ionicons name="options-outline" size={22} color="#297A5D" />
        </TouchableOpacity>
      </View>

      <View style={styles.banner}>
        <Text style={styles.bannerText}>
          <Text style={{ fontWeight: 'bold', color: '#297A5D' }}>환경</Text>을
          지키는 현명한 소비, 이번달{' '}
          <Text style={{ fontWeight: 'bold', color: '#297A5D' }}>15,000원</Text>{' '}
          절약했어요
        </Text>
        <Ionicons name="checkmark-circle" size={24} color="#6CBE77" />
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 140 }}>
        {orders.map((order, index) => (
          <View key={index} style={styles.cardWrapper}>
            <Text style={styles.date}>{order.date}</Text>
            <View style={styles.card}>
              <View style={styles.cardTop}>
                <View style={styles.imageWrapper}>
                  <Image source={order.image} style={styles.thumbnail} />
                </View>
                <View style={{ flex: 1 }}>
                  <View style={styles.cardHeader}>
                    <TouchableOpacity
                      style={styles.storeButton}
                      onPress={() => console.log(`${order.store} 클릭됨`)}
                    >
                      <Text style={styles.store}>{order.store}</Text>
                      <Ionicons name="chevron-forward" size={18} color="#666" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.detailsBox}>
                      <Text style={styles.detailsText}>주문상세</Text>
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.menu}>{order.menu}</Text>
                  <Text style={styles.price}>{order.price}</Text>
                  <View style={styles.pointBadge}>
                    <Text style={styles.point}>+ {order.point} 적립 ✨</Text>
                  </View>
                </View>
              </View>

              <View style={styles.actionsContainer}>
                {order.status === '픽업 완료' ? (
                  <View style={styles.buttonRow}>
                    <View style={styles.actionBoxGray}>
                      <Text style={styles.actionTextGray}>픽업 완료</Text>
                    </View>
                    {order.showReview && (
                      <TouchableOpacity style={styles.actionBoxWhite}>
                        <Text style={styles.actionTextGreen}>리뷰 작성</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                ) : (
                  <TouchableOpacity style={styles.actionBoxGreenFull}>
                    <Text style={styles.actionTextWhite}>{order.status}</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#222',
    textAlign: 'center',
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 16,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F4F4F4',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  filterButton: {
    padding: 10,
    backgroundColor: '#F4F4F4',
    borderRadius: 12,
  },
  banner: {
    backgroundColor: '#FFF9DB',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    marginBottom: 20,
  },
  bannerText: {
    flex: 1,
    fontSize: 13,
    color: '#444',
    lineHeight: 18,
    marginRight: 10,
  },
  cardWrapper: {
    marginBottom: 20,
  },
  date: {
    fontSize: 13,
    color: '#999',
    marginBottom: 8,
  },
  card: {
    backgroundColor: '#FAFAFA',
    borderRadius: 16,
    padding: 14,
  },
  cardTop: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  imageWrapper: {
    width: 120,
    height: 120,
    borderRadius: 12,
    backgroundColor: '#fff',
    marginRight: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
  },
  thumbnail: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  storeButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  store: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#111',
    marginRight: 4,
  },
  detailsBox: {
    backgroundColor: '#F4F4F4',
    borderRadius: 20,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  detailsText: {
    fontSize: 12,
    color: '#888',
  },
  menu: {
    fontSize: 13,
    color: '#333',
    marginBottom: 2,
    lineHeight: 18,
  },
  price: {
    fontSize: 14,
    color: '#222',
    marginBottom: 8,
  },
  pointBadge: {
    backgroundColor: '#E7F5EC',
    paddingVertical: 4,
    paddingHorizontal: 10,
    alignSelf: 'flex-start',
    borderRadius: 20,
  },
  point: {
    fontSize: 13,
    color: '#297A5D',
  },
  actionsContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
  },
  actionBoxGreenFull: {
    backgroundColor: '#297A5D',
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 24,
    alignItems: 'center',
    width: '100%',
  },
  actionBoxWhite: {
    flex: 1,
    borderColor: '#297A5D',
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
  },
  actionBoxGray: {
    flex: 1,
    backgroundColor: '#F4F4F4',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
  },
  actionTextWhite: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
  },
  actionTextGreen: {
    fontSize: 14,
    color: '#297A5D',
    fontWeight: 'bold',
  },
  actionTextGray: {
    fontSize: 14,
    color: '#444',
    fontWeight: 'bold',
  },
});

export default OrderListScreen;
