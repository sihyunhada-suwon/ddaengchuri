//MembershipScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Platform,
  StatusBar,
  Image,
  StyleSheet,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, Stack } from 'expo-router';

const gradeData = [
  {
    name: 'Earth',
    icon: '🌍',
    height: 127,
    benefit: '전 상품 3% 추가 할인',
    condition: '최근 3개월 15회 이상 구매',
  },
  {
    name: 'Forest',
    icon: '🌲',
    height: 108,
    benefit: '2,000원 할인쿠폰 1장 (7,000원 이상 구매 시)',
    condition: '최근 3개월 10회 이상 구매',
  },
  {
    name: 'Tree',
    icon: '🌳',
    height: 90,
    benefit: '1,000원 할인쿠폰 1장 (6,000원 이상 구매 시)',
    condition: '최근 3개월 6회 이상 구매',
  },
  {
    name: 'Sprout',
    icon: '🌿',
    height: 74,
    benefit: '700원 할인쿠폰 1장 (5,000원 이상 구매 시)',
    condition: '최근 3개월 3회 이상 구매',
  },
  {
    name: 'Seed',
    icon: '🌱',
    height: 57,
    benefit: '300원 할인쿠폰 1장 (3,000원 이상 구매 시)',
    condition: '최근 3개월 1회 이상 구매',
  },
];

export default function MembershipScreen() {
  const [selectedGrade, setSelectedGrade] = useState('Earth');
  const selected = gradeData.find((g) => g.name === selectedGrade);
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Screen options={{ headerShown: false }} />

      <ScrollView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Feather name="chevron-left" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerText}>등급 혜택</Text>
          <View style={styles.backButton} />
        </View>

        <Text style={styles.outsideGradeTitle}>
          시헌하다 님의 이번 달 등급 ✨
        </Text>

        <View style={styles.gradeCard}>
          <Text style={styles.gradeSubtitle}>
            지구를 구하는 소비 히어로!{'\n'}한 달 동안 최고의 환경 실천가
            입니다.
          </Text>
          <Text style={styles.emoji}>🌍</Text>
          <Text style={styles.gradeName}>Earth</Text>

          <TouchableOpacity style={styles.couponButton}>
            <View style={styles.couponContent}>
              <Text style={styles.couponText}>멤버십 쿠폰받기</Text>
              <Image
                source={require('../assets/mypage/download.png')}
                style={styles.downloadIcon}
              />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.gradeSection}>
          <Text style={styles.gradeTitle}>멤버십 등급 및 혜택</Text>
          <View style={styles.gradeDescRow}>
            <Image
              source={require('../assets/mypage/question.png')}
              style={styles.questionIcon}
            />
            <Text style={styles.gradeDesc}>
              등급을 선택하면 혜택과 정보를 확인할 수 있어요.
            </Text>
          </View>

          <View style={styles.tabs}>
            {gradeData.map((grade) => {
              const isSelected = selectedGrade === grade.name;
              return (
                <View key={grade.name} style={styles.tabItemContainer}>
                  <TouchableOpacity
                    style={[
                      styles.tabItem,
                      { height: grade.height },
                      isSelected ? styles.selectedTab : styles.unselectedTab,
                    ]}
                    onPress={() => setSelectedGrade(grade.name)}
                  >
                    <Text
                      style={[
                        styles.emojiTab,
                        isSelected && styles.emojiTabSelected,
                      ]}
                    >
                      {grade.icon}
                    </Text>
                  </TouchableOpacity>
                  <Text style={styles.tabLabelText}>{grade.name}</Text>
                </View>
              );
            })}
          </View>
        </View>

        {selected && (
          <View style={styles.detailBox}>
            <Text style={styles.gradeLabel}>
              {selected.name} {selected.icon}
            </Text>
            <Text style={styles.detailText}>
              <Text style={styles.detailBold}>혜택</Text>: {selected.benefit}
            </Text>
            <Text style={styles.detailText}>
              <Text style={styles.detailBold}>기준</Text>: {selected.condition}
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
  },
  headerText: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    flex: 1,
  },
  backButton: {
    width: 24,
    height: 24,
  },
  outsideGradeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 35,
    marginTop: 30,
    marginBottom: 8,
    color: '#444',
  },
  gradeCard: {
    width: 334,
    height: 235,
    backgroundColor: '#f5f4f0',
    borderRadius: 10,
    alignSelf: 'center',
    padding: 20,
    alignItems: 'center',
    marginTop: 11,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
  },
  gradeSubtitle: {
    textAlign: 'center',
    marginBottom: 14,
    marginTop: 3,
    fontSize: 13,
    fontWeight: '700',
    color: '#444',
    lineHeight: 17,
  },
  gradeName: {
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 12,
    color: '#444',
  },
  emoji: {
    fontSize: 65,
    marginBottom: 4,
  },
  couponButton: {
    backgroundColor: '#2d5d38',
    borderRadius: 30,
    width: 115,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  couponContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  couponText: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 12,
    marginRight: 5,
    marginLeft: 5,
  },
  downloadIcon: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
    marginLeft: -5,
  },
  gradeSection: {
    marginTop: 30,
    paddingHorizontal: 16,
  },
  gradeTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
    marginLeft: 18,
    color: '#444',
  },
  gradeDescRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 14,
    marginBottom: 10,
  },
  questionIcon: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
    marginRight: 3,
  },
  gradeDesc: {
    fontSize: 13,
    color: '#ccc',
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 8,
    alignItems: 'flex-end',
  },
  tabItemContainer: {
    alignItems: 'center',
    width: 54,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'flex-start', // 이모지 상단으로!
    width: 54,
    marginHorizontal: 2,
    paddingTop: 6, // 이모지와 위 간격 조정
    backgroundColor: '#fff',

    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomLeftRadius: 2,
    borderBottomRightRadius: 2,

    // 그림자
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  emojiTab: {
    fontSize: 18,
    marginBottom: 4,
    marginTop: 3,
    textShadowColor: '#000',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
    color: '#888',
  },
  emojiTabSelected: {
    fontSize: 18,
    textShadowColor: '#000',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
    color: '#000',
  },
  tabLabelText: {
    fontSize: 12,
    color: '#444',
    textAlign: 'center',
    marginTop: 4,
  },
  selectedTab: {
    backgroundColor: '#124f32',
  },
  unselectedTab: {
    borderWidth: 1,
    borderColor: '#2e694d',
  },
  detailBox: {
    backgroundColor: '#ffffff',
    margin: 19,
    padding: 25,
    marginTop: 20,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  gradeLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  detailText: {
    fontSize: 13,
    color: '#444',
    marginBottom: 5,
    lineHeight: 18,
  },
  detailBold: {
    fontWeight: 'bold',
    color: '#333',
  },
});
