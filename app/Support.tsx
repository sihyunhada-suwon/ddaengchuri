//Support.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  StatusBar,
  Image,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRouter, Stack } from 'expo-router';

export default function SupportPage() {
  const router = useRouter();

  const onPressChat = () => {
    // TODO: 채팅 문의 페이지로 이동
    // router.push('/SupportChat');
  };

  const onPressCall = () => {
    // TODO: 전화 문의 액션 (예: tel: 링크 or 안내 페이지)
    // Linking.openURL('tel:010-0000-0000');
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        {/* 헤더 */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Feather name="chevron-left" size={26} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerText}>고객센터</Text>
          <View style={{ width: 26 }} />
        </View>

        {/* 운영시간 안내 */}
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>운영시간: 평일 9:00 ~ 18:00</Text>
          <Text style={styles.infoDesc}>주말 및 공휴일은 휴무입니다</Text>
        </View>

        {/* 카드 리스트 */}
        <View style={styles.list}>
          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.8}
            onPress={onPressChat}
          >
            <View style={styles.iconWrap}>
              <Image
                source={require('../assets/Chat.png')}
                style={styles.icon}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.cardText}>1:1 문의</Text>
            <Feather name="chevron-right" size={22} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.8}
            onPress={onPressCall}
          >
            <View style={styles.iconWrap}>
              <Image
                source={require('../assets/Call.png')}
                style={styles.icon}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.cardText}>전화 문의</Text>
            <Feather name="chevron-right" size={22} color="#9CA3AF" />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const CARD_BG = '#F4F5F7';
const ICON_BG = '#E9ECEF';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:
      Platform.OS === 'android' ? (StatusBar.currentHeight ?? 0) + 8 : 52,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginTop: 6,
  },
  headerText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#444',
  },
  infoBox: {
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 18,
    marginTop: 30,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 6,
  },
  infoDesc: {
    fontSize: 14,
    color: '#6B7280',
  },
  list: {
    paddingHorizontal: 16,
    gap: 14,
    marginTop: 6,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: CARD_BG,
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderRadius: 18,
    marginTop: 1,
  },
  iconWrap: {
    width: 48,
    height: 48,
    borderRadius: 20,
    backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  icon: {
    width: 24,
    height: 24,
  },
  cardText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginLeft: 10,
  },
});
