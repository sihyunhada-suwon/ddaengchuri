import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const AiScreen = () => {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent} // ✅ 여백 조절
    >
      {/* 상단 안내문 */}
      <View style={styles.header}>
        <Text style={styles.title}>
          지금 뭐 먹을지 고민이라면 ?{'\n'}
          <Text style={styles.highlight}>AI가 추천해드려요 ✨</Text>
        </Text>
      </View>
      <View style={styles.separator} /> {/* 👈 여백 박스 추가 */}
      {/* 섹션 1: 위치 기준 */}
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
      {/* 섹션 2: 최근 주문 */}
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
      {/* 섹션 3: 시간대 인기 */}
      <Section title="🕒 이 시간대 인기 많은 가게를 추천 드려요 !">
        <Card image={require('../../assets/food/pizza.jpg')} name="피자&치킨" />
        <Card image={require('../../assets/food/mixed.jpg')} name="맛집 모음" />
      </Section>
    </ScrollView>
  );
};

// 섹션 컴포넌트
const Section = ({ title, children }: any) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {children}
    </ScrollView>
  </View>
);

// 카드 컴포넌트
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
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    paddingTop: 60, // ✅ 상단 여백 추가
    paddingBottom: 80, // ✅ 하단 여백도 확보 (탭바 안 가리도록)
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20, // ✅ 추가 여백은 scrollContent에서 담당
    marginBottom: 10,
  },
  title: {
    fontSize: 23,
    lineHeight: 30,
    fontWeight: '500',
    color: '#222',
  },
  highlight: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#222',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    paddingHorizontal: 20,
    marginBottom: 10,
    color: '#333',
  },
  separator: {
    height: 20, // 👈 문장 사이 여백
  },
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
  cardTextContainer: {
    padding: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#777',
  },
});

export default AiScreen;
