// import React, { useRef, useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   Image,
//   TextInput,
//   TouchableOpacity,
//   TouchableWithoutFeedback,
//   StatusBar,
//   Platform,
//   Animated,
//   Dimensions,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';

// import { Ionicons, MaterialIcons } from '@expo/vector-icons';
// import SideMenu from '../../components/sidemenu';
// import { router } from 'expo-router'; // ✅ 추가

// const screenWidth = Dimensions.get('window').width;

// export default function Home() {
//   const slideAnim = useRef(new Animated.Value(-screenWidth * 0.75)).current;
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const openMenu = () => {
//     setIsMenuOpen(true);
//     Animated.timing(slideAnim, {
//       toValue: 0,
//       duration: 300,
//       useNativeDriver: false,
//     }).start();
//   };

//   const closeMenu = () => {
//     Animated.timing(slideAnim, {
//       toValue: -screenWidth * 0.75,
//       duration: 300,
//       useNativeDriver: false,
//     }).start(() => setIsMenuOpen(false));
//   };

//   // 주소설정(주소관리) 페이지로 이동
//   const handleLocationPress = () => {
//     router.push('../address'); // address.tsx로 이동!
//   };

//   const handleNotificationPress = () => {
//     console.log('Notification pressed');
//   };

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <ScrollView
//         style={styles.container}
//         contentContainerStyle={styles.content}
//         scrollEnabled={!isMenuOpen}
//       >
//         <StatusBar barStyle="dark-content" />

//         <View style={styles.topBar}>
//           <TouchableOpacity onPress={openMenu}>
//             <MaterialIcons name="menu" size={24} color="black" />
//           </TouchableOpacity>

//           <TouchableOpacity
//             onPress={handleLocationPress}
//             style={styles.locationWrapper}
//           >
//             <Ionicons name="location-sharp" size={18} color="#555" />
//             <Text style={styles.location}>현재 위치를 설정해주세요.</Text>
//             <Ionicons
//               name="chevron-down"
//               size={16}
//               color="#555"
//               style={{ marginLeft: 2 }}
//             />
//           </TouchableOpacity>

//           <TouchableOpacity onPress={handleNotificationPress}>
//             <Ionicons name="notifications-outline" size={24} color="black" />
//           </TouchableOpacity>
//         </View>

//         <View style={styles.searchBox}>
//           <TextInput
//             placeholder="오늘의 임박 상품을 찾아보세요 !"
//             placeholderTextColor="#999"
//             style={styles.searchInput}
//           />
//         </View>

//         <Image
//           source={require('../../assets/food/banner-bag.png')}
//           style={styles.bannerImageFull}
//         />

//         <ScrollView
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           style={styles.categoryScroll}
//         >
//           <CategoryButton label="채식/건강식" />
//           <CategoryButton label="간식/디저트" />
//           <CategoryButton label="패스트푸드" />
//           <CategoryButton label="커피/음료" />
//         </ScrollView>

//         <ScrollView
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           style={styles.recommendScroll}
//         >
//           <View style={styles.recommendCard}>
//             <View style={styles.cardShadow}>
//               <Image
//                 source={require('../../assets/food/salad.jpg')}
//                 style={styles.foodCard}
//               />
//             </View>
//             <Text style={styles.cardTitleSmall}>
//               샐러리아 <Text style={styles.cardInfo}>⭐ 4.9 (10){'\n'}4km</Text>
//             </Text>
//           </View>

//           <View style={styles.recommendCard}>
//             <View style={styles.cardShadow}>
//               <Image
//                 source={require('../../assets/food/poke.jpg')}
//                 style={styles.foodCard}
//               />
//             </View>
//             <Text style={styles.cardTitleSmall}>
//               나의 유부&포케{' '}
//               <Text style={styles.cardInfo}>⭐ 4.9 (14) {'\n'}3.5km</Text>
//             </Text>
//           </View>
//         </ScrollView>

//         <Text style={styles.subTitle}>근처 인기 맛집✨</Text>

//         <ScrollView
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           style={styles.recommendScroll}
//         >
//           <View style={styles.recommendCard}>
//             <View style={styles.cardShadow}>
//               <Image
//                 source={require('../../assets/food/mixed.jpg')}
//                 style={styles.foodCard}
//               />
//             </View>
//             <Text style={styles.cardTitleSmall}>브런치 카페</Text>
//           </View>

//           <View style={styles.recommendCard}>
//             <View style={styles.cardShadow}>
//               <Image
//                 source={require('../../assets/food/pizza.jpg')}
//                 style={styles.foodCard}
//               />
//             </View>
//             <Text style={styles.cardTitleSmall}>수제피자집</Text>
//           </View>
//         </ScrollView>
//       </ScrollView>

//       {isMenuOpen && (
//         <TouchableWithoutFeedback onPress={closeMenu}>
//           <View style={styles.overlay} />
//         </TouchableWithoutFeedback>
//       )}

//       <SideMenu slideAnim={slideAnim} />
//     </SafeAreaView>
//   );
// }

// const CategoryButton = ({ label }: { label: string }) => (
//   <TouchableOpacity style={styles.categoryButton}>
//     <Text style={styles.categoryText}>{label}</Text>
//   </TouchableOpacity>
// );

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: '#fff',
//     paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
//   },
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   content: {
//     padding: 16,
//     paddingBottom: 40,
//   },
//   topBar: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     marginBottom: 16,
//   },
//   locationWrapper: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 4,
//     paddingVertical: 4,
//   },
//   location: {
//     marginLeft: 4,
//     fontSize: 16,
//     color: '#333',
//   },
//   searchBox: {
//     backgroundColor: '#f1f1f1',
//     borderRadius: 12,
//     paddingHorizontal: 12,
//     paddingVertical: 10,
//     marginBottom: 16,
//   },
//   searchInput: {
//     fontSize: 14,
//     color: '#333',
//   },
//   bannerImageFull: {
//     width: '100%',
//     height: 150,
//     borderRadius: 12,
//     marginBottom: 24,
//   },
//   categoryScroll: {
//     marginBottom: 20,
//   },
//   categoryButton: {
//     backgroundColor: '#e8f5e9',
//     paddingVertical: 8,
//     paddingHorizontal: 14,
//     borderRadius: 20,
//     marginRight: 8,
//   },
//   categoryText: {
//     fontSize: 13,
//     color: '#388e3c',
//   },
//   recommendScroll: {
//     marginBottom: 24,
//   },
//   recommendCard: {
//     marginRight: 20,
//     width: 200,
//   },
//   cardShadow: {
//     borderRadius: 12,
//     backgroundColor: '#fff',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.3,
//     shadowRadius: 6,
//     elevation: 8,
//     marginBottom: 6,
//   },
//   foodCard: {
//     width: 200,
//     height: 150,
//     borderRadius: 12,
//   },
//   cardTitleSmall: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   cardInfo: {
//     fontSize: 15,
//     color: '#555',
//   },
//   subTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginTop: 8,
//     marginBottom: 12,
//   },
//   overlay: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     width: screenWidth,
//     height: '100%',
//     backgroundColor: 'rgba(0,0,0,0.2)',
//     zIndex: 5,
//   },
// });

import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StatusBar,
  SafeAreaView,
  Platform,
  Animated,
  Dimensions,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import SideMenu from '../../components/sidemenu';

const screenWidth = Dimensions.get('window').width;

// ✅ 배너 고정 사이즈/간격
const BANNER_W = 354;
const BANNER_H = 161;
const BANNER_RADIUS = 12;
const BANNER_SPACING = 16;
// 가운데 정렬을 위한 좌우 패딩(첫/마지막 배너도 중앙에 오도록)
const SIDE_PADDING = Math.max(0, (screenWidth - BANNER_W) / 2);

export default function Home() {
  const slideAnim = useRef(new Animated.Value(-screenWidth * 0.75)).current;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // ✅ 배너 인덱스 + 자동 슬라이드용 레퍼런스
  const [bannerIndex, setBannerIndex] = useState(1);
  const bannerRef = useRef<FlatList<number>>(null);

  // 배너 배열
  const banners: number[] = [
    require('../../assets/banner1.png'),
    require('../../assets/banner2.png'),
  ];

  // 자동 슬라이드 (3초마다)
  useEffect(() => {
    const interval = setInterval(() => {
      setBannerIndex((prev) => {
        const next = prev === banners.length ? 1 : prev + 1;
        bannerRef.current?.scrollToOffset({
          offset: (next - 1) * (BANNER_W + BANNER_SPACING),
          animated: true,
        });
        return next;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [banners.length]);

  const openMenu = () => {
    setIsMenuOpen(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const closeMenu = () => {
    Animated.timing(slideAnim, {
      toValue: -screenWidth * 0.75,
      duration: 300,
      useNativeDriver: false,
    }).start(() => setIsMenuOpen(false));
  };

  const handleLocationPress = () => {
    console.log('Location dropdown pressed');
  };

  const handleNotificationPress = () => {
    console.log('Notification pressed');
  };

  // 스크롤 위치에서 현재 인덱스 동기화
  const handleBannerScroll = (e: any) => {
    const x = e.nativeEvent.contentOffset.x;
    const index = Math.round(x / (BANNER_W + BANNER_SPACING)) + 1;
    if (index !== bannerIndex) setBannerIndex(index);
  };

  // 성능 최적화: 아이템 레이아웃 고정
  const getItemLayout = (_: any, index: number) => ({
    length: BANNER_W + BANNER_SPACING,
    offset: (BANNER_W + BANNER_SPACING) * index,
    index,
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        scrollEnabled={!isMenuOpen}
      >
        <StatusBar barStyle="dark-content" />

        {/* ✅ 상단바 */}
        <View style={styles.topBar}>
          <TouchableOpacity onPress={openMenu}>
            <Image
              source={require('../../assets/sidemenu.png')}
              style={{ width: 24, height: 24, resizeMode: 'contain' }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleLocationPress}
            style={styles.locationWrapper}
          >
            <Image
              source={require('../../assets/location2.png')}
              style={{
                width: 17,
                height: 17,
                resizeMode: 'contain',
                marginRight: 4,
              }}
            />
            <Text style={styles.location}>주소를 입력해주세요</Text>
            <Ionicons
              name="chevron-down"
              size={16}
              color="#555"
              style={{ marginLeft: 2 }}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={handleNotificationPress}>
            <Ionicons name="notifications-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>

        {/* //✅ 검색창 (입력 불가, 눌렀을 때 /search 이동)
        <Link href="/search" asChild>
          <TouchableOpacity style={styles.searchBox} activeOpacity={0.9}>
            <Image
              source={require('../../assets/search.png')}
              style={styles.searchIcon}
            />
            <Text style={styles.searchPlaceholder}>
              오늘의 임박 상품을 찾아보세요 !
            </Text>
          </TouchableOpacity>
        </Link> */}

        {/* ✅ 배너 */}
        <View style={styles.bannerWrapper}>
          <FlatList
            ref={bannerRef}
            data={banners}
            horizontal
            keyExtractor={(_, i) => String(i)}
            showsHorizontalScrollIndicator={false}
            decelerationRate="fast"
            snapToInterval={BANNER_W + BANNER_SPACING}
            getItemLayout={getItemLayout}
            contentContainerStyle={{
              paddingHorizontal: SIDE_PADDING,
              alignItems: 'center',
            }}
            renderItem={({ item, index }) => (
              <Image
                source={item}
                style={[
                  styles.bannerImage,
                  {
                    marginRight:
                      index === banners.length - 1 ? 0 : BANNER_SPACING,
                  },
                ]}
              />
            )}
            onScroll={handleBannerScroll}
            scrollEventThrottle={16}
          />
          <View style={styles.bannerIndicator}>
            <Text style={styles.bannerIndicatorText}>
              {bannerIndex} / {banners.length}
            </Text>
          </View>
        </View>

        {/* ✅ 카테고리 */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoryScroll}
          contentContainerStyle={styles.categoryScrollContent}
        >
          <CategoryButton label="🥗채식/건강식" />
          <CategoryButton label="🍰간식/디저트" />
          <CategoryButton label="🍔패스트푸드" />
          <CategoryButton label="☕️커피/음료" />
        </ScrollView>

        {/* ✅ 푸드 카드 (1줄째) */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.recommendScroll}
        >
          <View style={styles.recommendCard}>
            <View style={styles.cardClip}>
              <Image
                source={require('../../assets/foodcard1.png')}
                style={styles.foodCard}
              />
            </View>
            <Text style={styles.cardTitleSmall}>
              나의 유부&포케{' '}
              <Text style={styles.cardInfo}>⭐ 4.9 (10) 4km</Text>
            </Text>
          </View>

          <View style={styles.recommendCard}>
            <View style={styles.cardClip}>
              <Image
                source={require('../../assets/foodcard2.png')}
                style={styles.foodCard}
              />
            </View>
            <Text style={styles.cardTitleSmall}>
              샐러리아 봉담점{' '}
              <Text style={styles.cardInfo}>⭐ 4.9 (14) 3.5km</Text>
            </Text>
          </View>
        </ScrollView>

        {/* 섹션 타이틀 */}
        <Text style={styles.subTitle}>‘수원대학교’ 근처 인기 맛집✨</Text>

        {/* ✅ 푸드 카드 (2줄째) */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.recommendScroll}
        >
          <View style={styles.recommendCard}>
            <View style={styles.cardClip}>
              <Image
                source={require('../../assets/foodcard3.png')}
                style={styles.foodCard}
              />
            </View>
            <Text style={styles.cardTitleSmall}>
              브런치 카페 <Text style={styles.cardInfo}>⭐ 4.8 (22) 2km</Text>
            </Text>
          </View>

          <View style={styles.recommendCard}>
            <View style={styles.cardClip}>
              <Image
                source={require('../../assets/foodcard4.png')}
                style={styles.foodCard}
              />
            </View>
            <Text style={styles.cardTitleSmall}>
              수제 피자집 <Text style={styles.cardInfo}>⭐ 4.7 (31) 1.5km</Text>
            </Text>
          </View>
        </ScrollView>
      </ScrollView>

      {isMenuOpen && (
        <TouchableWithoutFeedback onPress={closeMenu}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>
      )}

      <SideMenu slideAnim={slideAnim} />
    </SafeAreaView>
  );
}

/* ✅ CategoryButton */
const CategoryButton = ({ label }: { label: string }) => {
  const [isSelected, setIsSelected] = useState(false);
  return (
    <TouchableOpacity
      onPress={() => setIsSelected(!isSelected)}
      style={[
        styles.categoryButton,
        styles.categoryShadow,
        isSelected && styles.categorySelected,
      ]}
      activeOpacity={0.85}
    >
      <Text style={[styles.categoryText, isSelected && { color: '#388e3c' }]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  locationWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 4,
    paddingVertical: 4,
  },
  location: {
    marginLeft: 4,
    fontSize: 16,
    color: '#333',
  },

  /* 검색창 */
  searchBox: {
    flexDirection: 'row',
    backgroundColor: '#f1f1f1',
    borderRadius: 12,
    alignSelf: 'center',
    paddingHorizontal: 12,
    marginBottom: 16,
    marginTop: 12,
    alignItems: 'center',
    width: 338,
    height: 40,
  },
  searchIcon: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
    marginRight: 6,
  },
  searchPlaceholder: {
    fontSize: 14,
    color: '#999',
  },

  // ✅ 배너 컨테이너
  bannerWrapper: {
    height: BANNER_H,
    marginBottom: 13,
    position: 'relative',
    marginLeft: -17,
    marginRight: -17,
  },
  bannerImage: {
    width: BANNER_W,
    height: BANNER_H,
    borderRadius: BANNER_RADIUS,
    resizeMode: 'cover',
  },
  bannerIndicator: {
    position: 'absolute',
    right: 38,
    bottom: 16,
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  bannerIndicatorText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '400',
  },

  /* ✅ 카테고리 */
  categoryScroll: {
    marginBottom: 20,
    marginLeft: -8,
  },
  categoryScrollContent: {
    paddingLeft: 8,
    paddingRight: 0,
  },
  categoryButton: {
    backgroundColor: '#f5f4f0',
    paddingVertical: 9,
    paddingHorizontal: 13,
    borderRadius: 20,
    marginHorizontal: 6,
    marginBottom: 3,
  },
  categoryShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },
  categorySelected: {
    borderWidth: 1,
    borderColor: '#388e3c',
  },
  categoryText: {
    fontSize: 13,
    color: '#444',
  },

  /* ✅ 푸드 카드 (공통) */
  recommendScroll: {
    marginBottom: 24,
    marginTop: -12,
  },
  recommendCard: {
    marginRight: 12,
    width: 226,
  },
  cardClip: {
    width: 226,
    height: 130,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#fff',
    marginBottom: 6,
    marginTop: 7,
  },
  foodCard: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  cardTitleSmall: {
    fontSize: 15,
    fontWeight: '600',
    color: '#444',
    textAlign: 'center',
  },
  cardInfo: {
    fontSize: 13,
    color: '#444',
    fontWeight: '400',
  },

  subTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 1,
    marginBottom: 17,
    marginLeft: 7,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: screenWidth,
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.2)',
    zIndex: 5,
  },
});
