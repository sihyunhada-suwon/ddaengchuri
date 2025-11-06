import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router'; // ✅ useRouter 추가

export default function OrderCompleteScreen() {
  const router = useRouter();

  // ✅ 뒤로가기 눌렀을 때 home.tsx로 이동
  const handleGoBack = () => {
    router.replace('/(tabs)/home');
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      {/* 뒤로가기 */}
      <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
        <Ionicons name="chevron-back" size={26} color="#0A6847" />
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

        <View style={[styles.row, { marginBottom: 18 }]}>
          <Text style={styles.pickupLabel}>픽업 시간</Text>
          <View style={styles.pickupTimeBox}>
            <Text style={styles.pickupTime}>13:00 ~ 15:00</Text>
          </View>
        </View>

        {/* 구분선 */}
        <View style={styles.divider} />

        {/* 하단 버튼 */}
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.button, { borderRightWidth: 0.5 }]}
            onPress={() => alert('지도 보기')}
          >
            <Text style={styles.buttonText}>지도 보기</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => alert('픽업 알림 설정')}
          >
            <Text style={styles.buttonText}>픽업 알림 설정</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

/* ---------------- 스타일 ---------------- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 25,
  },
  title: {
    fontSize: 25,
    fontWeight: '700',
    color: '#222',
    marginTop: 150,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginTop: 15,
    marginBottom: 36,
  },
  checkContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 50,
  },
  checkImage: {
    width: 220,
    height: 220,
  },
  infoBox: {
    width: '88%',
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingTop: 22,
    paddingBottom: 0,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 0.5,
    borderColor: '#e9ecef',
  },
  storeName: {
    fontSize: 19,
    fontWeight: '700',
    color: '#222',
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
  },
  label: {
    width: 70,
    color: '#555',
    fontWeight: '600',
  },
  value: {
    flex: 1,
    color: '#222',
    fontSize: 14.5,
  },
  pickupLabel: {
    width: 70,
    color: '#555',
    fontWeight: '600',
  },
  pickupTimeBox: {
    backgroundColor: '#DCEBE4',
    borderRadius: 12,
    paddingVertical: 5,
    paddingHorizontal: 12,
  },
  pickupTime: {
    color: '#0A6847',
    fontWeight: '700',
    fontSize: 14.5,
  },
  divider: {
    height: 0.7,
    backgroundColor: '#E5E5E5',
    marginTop: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 16,
    borderColor: '#E5E5E5',
    borderTopWidth: 0.5,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },
});
