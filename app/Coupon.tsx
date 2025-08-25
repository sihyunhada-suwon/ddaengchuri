import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  StatusBar,
  ScrollView,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRouter, Stack } from 'expo-router';

export default function Coupon() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'valid' | 'expired'>('valid');

  const validCoupons = [
    {
      id: 1,
      amount: '3,000원 할인 쿠폰',
      desc: '10,000원 이상 구매 시 사용 가능',
      date: '2025.12.31 까지 사용 가능',
    },
    {
      id: 2,
      amount: '첫 주문 20% 할인 🎉',
      desc: '최대 5,000원 할인',
      date: '2025.12.25 까지 사용 가능',
    },
  ];

  const expiredCoupons = [
    {
      id: 3,
      amount: '5% 할인 쿠폰',
      desc: '20,000원 이상 구매 시 사용 가능',
      date: '2025.07.31 까지 사용 가능',
    },
  ];

  const renderCoupon = (item: any) => {
    const isExpired = activeTab === 'expired';

    return (
      <View
        key={item.id}
        style={[styles.couponBox, isExpired && styles.expiredCouponBox]}
      >
        <Text style={[styles.couponTitle, isExpired && styles.expiredText]}>
          {item.amount}
        </Text>
        <Text style={[styles.couponDesc, isExpired && styles.expiredText]}>
          {item.desc}
        </Text>
        <Text style={[styles.couponDate, isExpired && styles.expiredText]}>
          {item.date}
        </Text>
      </View>
    );
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />

      <View style={styles.container}>
        {/* 상단 헤더 */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={{ marginTop: 15 }}
          >
            <Feather name="chevron-left" size={26} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerText}>할인 쿠폰</Text>
          <View style={{ width: 26 }} />
        </View>

        {/* 탭 메뉴 */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === 'valid' && styles.activeTab,
            ]}
            onPress={() => setActiveTab('valid')}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'valid' && styles.activeTabText,
              ]}
            >
              보유 쿠폰
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === 'expired' && styles.activeTab,
            ]}
            onPress={() => setActiveTab('expired')}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'expired' && styles.activeTabText,
              ]}
            >
              만료 쿠폰
            </Text>
          </TouchableOpacity>
        </View>

        {/* 쿠폰 리스트 */}
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {(activeTab === 'valid' ? validCoupons : expiredCoupons).map(
            renderCoupon
          )}
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    paddingBottom: 25,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#444',
    marginTop: 18,
  },
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
  },
  tabText: {
    fontSize: 16,
    color: '#aaa',
  },
  activeTab: {
    borderBottomWidth: 1.5,
    borderBottomColor: '#2d5d38',
  },
  activeTabText: {
    color: '#444',
    fontWeight: 'bold',
  },
  scrollContent: {
    padding: 20,
  },
  couponBox: {
    backgroundColor: '#fff',
    padding: 20,
    height: 120,
    borderRadius: 7,
    marginBottom: 10,
    marginTop: 10,
    borderLeftWidth: 5,
    borderLeftColor: '#2d5d38',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  expiredCouponBox: {
    backgroundColor: '#f5f5f5',
    borderLeftColor: '#cccccc',
  },
  expiredText: {
    color: '#999',
  },
  couponTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2d5d38',
    marginTop: 2,
    marginLeft: 4,
  },
  couponDesc: {
    fontSize: 14,
    marginBottom: 4,
    color: '#444',
    marginLeft: 4,
  },
  couponDate: {
    fontSize: 12,
    color: '#777',
    marginTop: 15,
    marginLeft: 4,
  },
});
