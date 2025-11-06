import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  StatusBar,
  Image,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

// onGoBack prop 추가!
const gradeData = [
  { name: 'Earth', icon: '🌍', height: 127 },
  { name: 'Forest', icon: '🌲', height: 108 },
  { name: 'Tree', icon: '🌳', height: 90 },
  { name: 'Sprout', icon: '🌿', height: 74 },
  { name: 'Seed', icon: '🌱', height: 57 },
];

export default function MembershipScreen({
  onGoBack,
}: {
  onGoBack?: () => void;
}) {
  const [selectedGrade, setSelectedGrade] = useState('Earth');

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          {/* ← 버튼에 onGoBack 실행! */}
          <TouchableOpacity onPress={onGoBack}>
            <Feather name="chevron-left" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerText}>등급 혜택</Text>
          <View style={styles.backButton} />
        </View>

        {/* Title */}
        <Text style={styles.outsideGradeTitle}>
          시헌하다 님의 이번 달 등급 ✨
        </Text>

        {/* Grade Card */}
        <View style={styles.gradeCard}>
          <Text style={styles.gradeSubtitle}>
            지구를 구하는 소비 히어로!{'\n'}한 달 동안 최고의 환경 실천가
            입니다.
          </Text>
          <Text style={styles.emoji}>
            {gradeData.find((g) => g.name === selectedGrade)?.icon ?? '🌱'}
          </Text>
          <Text style={styles.gradeName}>{selectedGrade}</Text>

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

        {/* Grade Tabs */}
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
            {gradeData.map((grade, index) => {
              const isSelected = selectedGrade === grade.name;
              return (
                <View key={grade.name} style={styles.tabItemContainer}>
                  <TouchableOpacity
                    style={[
                      styles.tabItem,
                      {
                        height: grade.height,
                        borderTopLeftRadius: 8,
                        borderTopRightRadius: 8,
                        borderBottomLeftRadius: 8,
                        borderBottomRightRadius: 8,
                        marginTop: index * 10, // 계단식 아래로
                      },
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

        {/* Grade Info */}
        {selectedGrade === 'Earth' && (
          <View style={styles.detailBox}>
            <Text style={styles.gradeLabel}>Earth🌏</Text>
            <Text style={styles.detailText}>
              <Text style={styles.detailBold}>혜택</Text>: 1,000원 할인쿠폰 7장
              (5,000원 이상 구매 시)
            </Text>
            <Text style={styles.detailText}>
              <Text style={styles.detailBold}>기준</Text>: 최근 3개월 마감할인
              상품 10회 이상 구매
            </Text>
          </View>
        )}
        {selectedGrade === 'Forest' && (
          <View style={styles.detailBox}>
            <Text style={styles.gradeLabel}>Forest🌲</Text>
            <Text style={styles.detailText}>
              <Text style={styles.detailBold}>혜택</Text>: 1,000원 할인쿠폰 5장
              (5,000원 이상 구매 시)
            </Text>
            <Text style={styles.detailText}>
              <Text style={styles.detailBold}>기준</Text>: 최근 3개월 마감할인
              상품 7회 이상 구매
            </Text>
          </View>
        )}
        {selectedGrade === 'Tree' && (
          <View style={styles.detailBox}>
            <Text style={styles.gradeLabel}>Tree🌳</Text>
            <Text style={styles.detailText}>
              <Text style={styles.detailBold}>혜택</Text>: 1,000원 할인쿠폰 3장
              (5,000원 이상 구매 시)
            </Text>
            <Text style={styles.detailText}>
              <Text style={styles.detailBold}>기준</Text>: 최근 3개월 마감할인
              상품 5회 이상 구매
            </Text>
          </View>
        )}
        {selectedGrade === 'Sprout' && (
          <View style={styles.detailBox}>
            <Text style={styles.gradeLabel}>Sprout🌿</Text>
            <Text style={styles.detailText}>
              <Text style={styles.detailBold}>혜택</Text>: 1,000원 할인쿠폰 1장
              (5,000원 이상 구매 시)
            </Text>
            <Text style={styles.detailText}>
              <Text style={styles.detailBold}>기준</Text>: 최근 3개월 마감할인
              상품 3회 이상 구매
            </Text>
          </View>
        )}
        {selectedGrade === 'Seed' && (
          <View style={styles.detailBox}>
            <Text style={styles.gradeLabel}>Seed🌿</Text>
            <Text style={styles.detailText}>
              <Text style={styles.detailBold}>혜택</Text>: 첫 구매 할인쿠폰
              5000원권 1장 (10,000원 이상 구매 시)
            </Text>
            <Text style={styles.detailText}>
              <Text style={styles.detailBold}>기준</Text>: 최근 3개월 마감할인
              상품 0회 이상 구매
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
  },
  tabItemContainer: {
    alignItems: 'center',
    width: 54,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 54,
    marginHorizontal: 2,
  },
  emojiTab: {
    fontSize: 20,
    marginBottom: 4,
  },
  emojiTabSelected: {
    fontSize: 24,
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
  selectedTabText: {
    color: '#fff',
  },
  unselectedTab: {
    borderWidth: 1,
    borderColor: '#2e694d',
  },
  detailBox: {
    backgroundColor: '#f5f5f5',
    margin: 16,
    padding: 16,
    borderRadius: 12,
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
