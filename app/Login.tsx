import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  StatusBar,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRouter, Stack } from 'expo-router';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const slides = [
  {
    text: ['오늘만 이 가격!', '남은 음식, 절반가격에 즐겨요.'],
    image: require('../assets/Login1.png'),
    imageStyle: { width: 260, height: 260, marginTop: 80, marginRight: 45 },
    textBoxStyle: { top: 50, left: 120 },
  },
  {
    text: ['작은 소비, 큰 기록', '지금까지 아낀 금액과 탄소절감량을 한눈에✨'],
    image: require('../assets/Login2.png'),
    imageStyle: { width: 260, height: 260, marginTop: 50, marginRight: 70 },
    textBoxStyle: { top: 50, left: 30 },
  },
  {
    text: ['매일 달라지는 마감할인 음식,', '지금 확인해보세요!'],
    image: require('../assets/Login5.png'),
    imageStyle: { width: 230, height: 230, marginTop: 80, marginRight: 90 },
    textBoxStyle: { top: 50, left: 130 },
  },
];

export default function LoginPage() {
  const router = useRouter();
  const scrollRef = useRef<ScrollView>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const isAutoScrollingRef = useRef(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isAutoScrollingRef.current) return;
      isAutoScrollingRef.current = true;

      let nextIndex = currentIndex + 1;

      scrollRef.current?.scrollTo({
        x: SCREEN_WIDTH * nextIndex,
        animated: true,
      });

      if (nextIndex === slides.length) {
        setTimeout(() => {
          scrollRef.current?.scrollTo({ x: 0, animated: false });
          setCurrentIndex(0);
          isAutoScrollingRef.current = false;
        }, 400);
      } else {
        setCurrentIndex(nextIndex);
        isAutoScrollingRef.current = false;
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        {/* 상단 뒤로가기 */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Feather name="chevron-left" size={26} color="#000" />
          </TouchableOpacity>
          <View />
        </View>

        {/* 타이틀 */}
        <View style={styles.textBox}>
          <Text style={styles.title}>착한 소비의 시작, 세이브 잇</Text>
          <Text style={styles.subtitle}>로그인 하고 시작해보세요 😊</Text>
        </View>

        {/* 자동 슬라이드 */}
        <ScrollView
          ref={scrollRef}
          horizontal
          pagingEnabled
          scrollEnabled={false}
          showsHorizontalScrollIndicator={false}
          style={styles.sliderContainer}
        >
          {[...slides, slides[0]].map((slide, index) => (
            <View key={index} style={styles.slide}>
              <View style={[styles.priceBoxWrapper, slide.textBoxStyle]}>
                <View style={styles.priceBox}>
                  <Text style={styles.priceText}>{slide.text[0]}</Text>
                  <Text style={styles.priceText}>{slide.text[1]}</Text>
                </View>
              </View>
              <Image
                source={slide.image}
                style={[styles.centerImage, slide.imageStyle]}
                resizeMode="contain"
              />
            </View>
          ))}
        </ScrollView>

        <View style={{ flexGrow: 1 }} />

        {/* 카카오 안내 텍스트 */}
        <View style={styles.kakaoInfoWrapper}>
          <View style={styles.kakaoInfoBox}>
            <Text style={styles.kakaoInfoText}>
              ⚡ 카카오로 빠르게 회원가입!
            </Text>
          </View>
        </View>

        {/* 카카오 버튼 */}
        <TouchableOpacity style={styles.kakaoButton}>
          <Image
            source={require('../assets/kakao.png')}
            style={styles.kakaoIcon}
            resizeMode="contain"
          />
          <Text style={styles.kakaoButtonText}>카카오로 시작하기</Text>
        </TouchableOpacity>

        {/* 이메일 링크 */}
        <View style={styles.emailBox}>
          <TouchableOpacity onPress={() => router.push('/Signup')}>
            <Text style={styles.emailText}>이메일로 회원가입</Text>
          </TouchableOpacity>
          <Text style={styles.emailDivider}> | </Text>
          {/* ✅ 여기가 연동 포인트! */}
          <TouchableOpacity onPress={() => router.push('/EmailLogin')}>
            <Text style={styles.emailText}>이메일로 로그인</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 50,
    backgroundColor: '#fff',
    paddingHorizontal: 25,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginTop: 15,
    marginLeft: -10,
  },
  textBox: {
    marginTop: 12,
    marginBottom: 12,
    marginLeft: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    color: '#888',
  },
  sliderContainer: {
    height: '100%',
  },
  slide: {
    width: SCREEN_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  priceBoxWrapper: {
    position: 'absolute',
  },
  priceBox: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    borderBottomLeftRadius: 0,
    paddingVertical: 12,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  priceText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    lineHeight: 20,
  },
  centerImage: {
    alignSelf: 'center',
  },
  kakaoInfoWrapper: {
    alignItems: 'flex-end',
    marginBottom: 10,
    marginRight: 5,
  },
  kakaoInfoBox: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 7,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 3,
    marginBottom: 6,
  },
  kakaoInfoText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#444',
    textAlign: 'left',
  },
  kakaoButton: {
    backgroundColor: '#FEE500',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    position: 'relative',
  },
  kakaoIcon: {
    width: 20,
    height: 20,
    position: 'absolute',
    left: 20,
  },
  kakaoButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#3D1D1D',
    textAlign: 'center',
  },
  emailBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 60,
  },
  emailText: {
    fontSize: 13,
    color: '#777',
  },
  emailDivider: {
    fontSize: 13,
    color: '#bbb',
    marginHorizontal: 6,
  },
});
