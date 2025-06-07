import React, { useState, useRef } from 'react';
import {
  Modal,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';

const { width } = Dimensions.get('window');

interface AiPopupProps {
  visible: boolean;
  onClose: () => void;
  onStart?: () => void;
}

const slides = [
  {
    title: 'AI가 가게를 똑똑하게 추천해줘요!',
    description:
      '지금 뭐 먹을지 고민이라면 AI가\n내 취향에 맞게 가게를 추천해줘요.',
    image: require('../assets/ai/aipop1.png'),
  },
  {
    title: '장 본 재료로 만들 수 있는 요리,\n알려드릴게요!',
    description:
      '지금 가지고 있는 재료만 입력하면\n잇또 챗봇이 요리 아이디어를 알려줘요.',
    image: require('../assets/ai/aipop2.png'),
  },
  {
    title: '모르는 건 챗봇에게 물어보세요!',
    description:
      'AI 챗봇 ‘잇또’가 가게 추천부터 레시피,\n주문 도움까지 다 알려줘요.',
    image: require('../assets/ai/aipop3.png'),
  },
  {
    title: '당신만을 위한 추천, 지금 만나보세요!',
    description: '',
    image: require('../assets/ai/aipop4.png'),
  },
];

export default function AiPopup({ visible, onClose, onStart }: AiPopupProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / width);
    setCurrentIndex(index);
  };

  const handleStart = () => {
    onClose();
    onStart?.();
  };

  const renderItem = ({ item, index }: any) => (
    <View style={styles.slide}>
      {/* 상단 */}
      <View style={styles.topSection}>
        <Text style={styles.title}>{item.title}</Text>
        <Image source={item.image} style={styles.image} resizeMode="contain" />
      </View>

      {/* 하단 */}
      <View style={styles.bottomSection}>
        {item.description ? (
          <Text style={styles.description}>{item.description}</Text>
        ) : null}

        {/* 마지막 슬라이드일 때만 버튼 */}
        {index === slides.length - 1 && (
          <TouchableOpacity style={styles.button} onPress={handleStart}>
            <Text style={styles.buttonText}>지금 바로 시작하기</Text>
          </TouchableOpacity>
        )}

        {/* 인디케이터 */}
        <View style={styles.dotsContainer}>
          {slides.map((_, i) => (
            <View
              key={i}
              style={[styles.dot, currentIndex === i ? styles.activeDot : null]}
            />
          ))}
        </View>
      </View>
    </View>
  );

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.popup}>
          <FlatList
            ref={flatListRef}
            data={slides}
            keyExtractor={(_, i) => i.toString()}
            renderItem={renderItem}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            scrollEventThrottle={16}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popup: {
    backgroundColor: 'transparent',
    width: '85%',
    borderRadius: 20,
    overflow: 'hidden',
  },
  slide: {
    width: width * 0.85,
    height: 420,
    borderRadius: 20,
    overflow: 'hidden',
  },
  topSection: {
    flex: 1.3,
    backgroundColor: '#115E4B',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 30,
    paddingHorizontal: 20,
  },
  bottomSection: {
    flex: 0.6,
    backgroundColor: '#0B4435',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingBottom: 24,
    paddingTop: 25,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 12,
  },
  image: {
    width: 220,
    height: 220,
  },
  description: {
    fontSize: 18,
    fontWeight: '500',
    color: '#fff',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: -30,
  },
  button: {
    backgroundColor: '#FDE8D4',
    paddingVertical: 7,
    paddingHorizontal: 20,
    borderRadius: 999,
    marginBottom: -30,
  },
  buttonText: {
    color: '#115E4B',
    fontWeight: '600',
    fontSize: 18,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 58,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#fff',
  },
});
