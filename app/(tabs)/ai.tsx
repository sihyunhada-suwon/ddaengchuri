import React, { useEffect, useState } from 'react';
import { router } from 'expo-router';
import AiPopup from '../../components/AiPopup';

import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const AiScreen = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [hasShownOnce, setHasShownOnce] = useState(false);

  useEffect(() => {
    if (!hasShownOnce) {
      setShowPopup(true);
      setHasShownOnce(true);
    }
  }, []);

  const handleStart = () => {
    setShowPopup(false);
    router.push('/chat'); // chat.tsx로 이동
  };

  return (
    <View style={styles.wrapper}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
      >
        {/* 상단 안내문 */}
        <View style={styles.header}>
          <Text style={styles.title}>
            지금 뭐 먹을지 고민이라면 ?{'\n'}
            <Text style={styles.highlight}>AI가 추천해드려요 ✨</Text>
          </Text>
        </View>

        <View style={styles.separator} />

        {/* 섹션들 */}
        <Section title="📍 지금 위치 기준으로 가까운 가게를 보여드려요">
          <Card
            image={require('../../assets/food/salad.jpg')}
            name="샐러리아 봉담점"
            rating="4.9 (10)"
            distance="4km"
          />
          <Card
            image={require('../../assets/food/poke.jpg')}
            name="나의 유부&포케"
            rating="4.9 (20)"
            distance="4km"
          />
        </Section>

        <Section title="🛒 최근에 자주 주문하신 메뉴를 참고했어요">
          <Card
            image={require('../../assets/food/cozy.jpg')}
            name="The Cozy Cup"
            rating="4.9 (10)"
            distance="1km"
          />
          <Card
            image={require('../../assets/food/brunch.jpg')}
            name="매종브런치"
            rating="4.7 (12)"
            distance="1km"
          />
        </Section>

        <Section title="🕒 이 시간대 인기 많은 가게를 추천 드려요 !">
          <Card
            image={require('../../assets/food/pizza.jpg')}
            name="피자&치킨"
          />
          <Card
            image={require('../../assets/food/mixed.jpg')}
            name="맛집 모음"
          />
        </Section>
      </ScrollView>

      {/* 챗봇 버튼 */}
      <TouchableOpacity
        style={styles.chatbotButton}
        onPress={() => {
          // 챗봇 버튼 클릭 시 팝업은 다시 띄우지 않음
          console.log('AI 챗봇 버튼 클릭'); // 나중에 실제 기능 연결
        }}
      >
        <View style={styles.chatbotLabel}>
          <Text style={styles.chatbotLabelText}>AI 챗봇</Text>
        </View>
        <Image
          source={require('../../assets/ai/bot.png')}
          style={styles.chatbotImage}
        />
      </TouchableOpacity>

      {/* 팝업은 진입 시 1번만 노출 */}
      <AiPopup
        visible={showPopup}
        onClose={() => setShowPopup(false)}
        onStart={handleStart}
      />
    </View>
  );
};

// Section 컴포넌트
const Section = ({ title, children }: any) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {children}
    </ScrollView>
  </View>
);

// Card 컴포넌트
const Card = ({ image, name, rating, distance }: any) => (
  <TouchableOpacity style={styles.card}>
    <Image source={image} style={styles.cardImage} resizeMode="cover" />
    <View style={styles.cardTextContainer}>
      <Text style={styles.cardTitle}>{name}</Text>
      {rating && distance && (
        <Text style={styles.cardSubtitle}>
          ⭐ {rating} · {distance}
        </Text>
      )}
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  wrapper: { flex: 1 },
  container: { flex: 1, backgroundColor: '#fff' },
  scrollContent: { paddingTop: 60, paddingBottom: 120 },
  header: { paddingHorizontal: 20, paddingTop: 20, marginBottom: 10 },
  title: { fontSize: 23, lineHeight: 30, fontWeight: '500', color: '#222' },
  highlight: { fontWeight: 'bold', fontSize: 20, color: '#222' },
  section: { marginBottom: 30 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    paddingHorizontal: 20,
    marginBottom: 10,
    color: '#333',
  },
  separator: { height: 20 },
  card: {
    backgroundColor: '#fff',
    width: 190,
    borderRadius: 12,
    marginLeft: 20,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  cardImage: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  cardTextContainer: { padding: 10 },
  cardTitle: { fontSize: 16, fontWeight: '600', marginBottom: 4 },
  cardSubtitle: { fontSize: 14, color: '#777' },
  chatbotButton: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    width: 66,
    height: 66,
    borderRadius: 33,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 6,
  },
  chatbotImage: {
    width: 48,
    height: 48,
    borderRadius: 35,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 5,
  },
  chatbotLabel: {
    position: 'absolute',
    top: -22,
    backgroundColor: '#115E4B',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  chatbotLabelText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
});

export default AiScreen;
