import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function OrderCompleteScreen() {
  // 뒤로가기 눌렀을 때 동작
  const handleGoBack = () => {
    Alert.alert('뒤로가기', '이전 화면으로 이동합니다.');
  };

  return (
    <View style={styles.container}>
      {/* 뒤로가기 버튼 */}
      <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
        <Ionicons name="chevron-back" size={24} color="#0A6847" />
      </TouchableOpacity>

      {/* 타이틀 */}
      <Text style={styles.title}>주문이 완료되었어요!</Text>
      <Text style={styles.subtitle}>픽업 시간에 꼭 맞춰 방문해주세요</Text>

      {/* 체크 이미지 */}
      <View style={styles.checkContainer}>
        <Image
          source={require('../assets/check-green.png')}
          style={styles.checkImage}
          resizeMode="contain"
        />
      </View>

      {/* 주문 정보 카드 */}
      <View style={styles.infoBox}>
        <Text style={styles.storeName}>NOVA BURGER</Text>

        <View style={styles.row}>
          <Text style={styles.label}>주소</Text>
          <Text style={styles.value}>서울특별시 강남구 테헤란로 123</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>주문번호</Text>
          <Text style={styles.value}>#202504250021</Text>
        </View>

        <View style={[styles.row, { marginBottom: 10 }]}>
          <Text style={styles.pickupLabel}>픽업 시간</Text>
          <Text style={styles.pickupTime}>13:00 ~ 15:00</Text>
        </View>

        {/* 버튼 */}
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => Alert.alert('지도 보기')}
          >
            <Text style={styles.buttonText}>지도 보기</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => Alert.alert('픽업 알림 설정')}
          >
            <Text style={styles.buttonText}>픽업 알림 설정</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

// 스타일 정의
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#222',
    marginTop: 100,
  },
  subtitle: {
    fontSize: 15,
    color: '#555',
    marginTop: 8,
    marginBottom: 40,
  },
  checkContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  checkImage: {
    width: 140,
    height: 140,
  },
  infoBox: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
    padding: 20,
    borderWidth: 0.5,
    borderColor: '#eee',
  },
  storeName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#222',
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  label: {
    width: 70,
    color: '#666',
    fontWeight: '500',
  },
  value: {
    flex: 1,
    color: '#222',
  },
  pickupLabel: {
    width: 70,
    color: '#666',
    fontWeight: '500',
  },
  pickupTime: {
    backgroundColor: '#DCEBE4',
    color: '#0A6847',
    fontWeight: '600',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    borderTopWidth: 0.5,
    borderTopColor: '#E5E5E5',
    marginTop: 12,
  },
  button: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 14,
    borderRightWidth: 0.5,
    borderRightColor: '#E5E5E5',
  },
  buttonText: {
    fontWeight: '600',
    color: '#333',
  },
});
