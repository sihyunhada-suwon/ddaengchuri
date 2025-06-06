// import React, { useRef } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   Image,
//   TextInput,
//   TouchableOpacity,
//   StatusBar,
//   SafeAreaView,
//   Platform,
//   Animated,
//   Dimensions,
// } from 'react-native';
// import { Ionicons, MaterialIcons } from '@expo/vector-icons';
// import SideMenu from '../../components/sidemenu'; // 경로는 상황에 맞게 수정

// const screenWidth = Dimensions.get('window').width;

// export default function Home() {
//   const slideAnim = useRef(new Animated.Value(-screenWidth * 0.7)).current;

//   const handleMenuPress = () => {
//     Animated.timing(slideAnim, {
//       toValue: 0,
//       duration: 300,
//       useNativeDriver: false,
//     }).start();
//   };

//   const handleLocationPress = () => {
//     console.log('Location dropdown pressed');
//   };

//   const handleNotificationPress = () => {
//     console.log('Notification pressed');
//   };

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <ScrollView
//         style={styles.container}
//         contentContainerStyle={styles.content}
//       >
//         <StatusBar barStyle="dark-content" />

//         {/* 위치 & 알림 */}
//         <View style={styles.topBar}>
//           <TouchableOpacity onPress={handleMenuPress}>
//             <MaterialIcons name="menu" size={24} color="black" />
//           </TouchableOpacity>

//           <TouchableOpacity
//             onPress={handleLocationPress}
//             style={styles.locationWrapper}
//           >
//             <Ionicons name="location-sharp" size={18} color="#555" />
//             <Text style={styles.location}>수원대학교 IT 대학</Text>
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

//         {/* 검색창 */}
//         <View style={styles.searchBox}>
//           <TextInput
//             placeholder="오늘의 임박 상품을 찾아보세요 !"
//             placeholderTextColor="#999"
//             style={styles.searchInput}
//           />
//         </View>

//         {/* 배너 이미지 */}
//         <Image
//           source={require('../../assets/food/banner-bag.png')}
//           style={styles.bannerImageFull}
//         />

//         {/* 카테고리 버튼 */}
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

//         {/* 추천 음식 카드 */}
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
//               샐러리아 봉담점{' '}
//               <Text style={styles.cardInfo}>⭐ 4.9 (10){'\n'}4km</Text>
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

//         {/* 인기 맛집 */}
//         <Text style={styles.subTitle}>‘수원대학교’ 근처 인기 맛집✨</Text>

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

//       {/* 슬라이드 메뉴 추가 */}
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
// });

import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StatusBar,
  SafeAreaView,
  Platform,
  Animated,
  Dimensions,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import SideMenu from '../../components/sidemenu';

const screenWidth = Dimensions.get('window').width;

export default function Home() {
  const slideAnim = useRef(new Animated.Value(-screenWidth * 0.75)).current;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        scrollEnabled={!isMenuOpen}
      >
        <StatusBar barStyle="dark-content" />

        <View style={styles.topBar}>
          <TouchableOpacity onPress={openMenu}>
            <MaterialIcons name="menu" size={24} color="black" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleLocationPress}
            style={styles.locationWrapper}
          >
            <Ionicons name="location-sharp" size={18} color="#555" />
            <Text style={styles.location}>수원대학교 IT 대학</Text>
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

        <View style={styles.searchBox}>
          <TextInput
            placeholder="오늘의 임박 상품을 찾아보세요 !"
            placeholderTextColor="#999"
            style={styles.searchInput}
          />
        </View>

        <Image
          source={require('../../assets/food/banner-bag.png')}
          style={styles.bannerImageFull}
        />

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoryScroll}
        >
          <CategoryButton label="채식/건강식" />
          <CategoryButton label="간식/디저트" />
          <CategoryButton label="패스트푸드" />
          <CategoryButton label="커피/음료" />
        </ScrollView>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.recommendScroll}
        >
          <View style={styles.recommendCard}>
            <View style={styles.cardShadow}>
              <Image
                source={require('../../assets/food/salad.jpg')}
                style={styles.foodCard}
              />
            </View>
            <Text style={styles.cardTitleSmall}>
              샐러리아 봉담점{' '}
              <Text style={styles.cardInfo}>⭐ 4.9 (10){'\n'}4km</Text>
            </Text>
          </View>

          <View style={styles.recommendCard}>
            <View style={styles.cardShadow}>
              <Image
                source={require('../../assets/food/poke.jpg')}
                style={styles.foodCard}
              />
            </View>
            <Text style={styles.cardTitleSmall}>
              나의 유부&포케{' '}
              <Text style={styles.cardInfo}>⭐ 4.9 (14) {'\n'}3.5km</Text>
            </Text>
          </View>
        </ScrollView>

        <Text style={styles.subTitle}>‘수원대학교’ 근처 인기 맛집✨</Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.recommendScroll}
        >
          <View style={styles.recommendCard}>
            <View style={styles.cardShadow}>
              <Image
                source={require('../../assets/food/mixed.jpg')}
                style={styles.foodCard}
              />
            </View>
            <Text style={styles.cardTitleSmall}>브런치 카페</Text>
          </View>

          <View style={styles.recommendCard}>
            <View style={styles.cardShadow}>
              <Image
                source={require('../../assets/food/pizza.jpg')}
                style={styles.foodCard}
              />
            </View>
            <Text style={styles.cardTitleSmall}>수제피자집</Text>
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

const CategoryButton = ({ label }: { label: string }) => (
  <TouchableOpacity style={styles.categoryButton}>
    <Text style={styles.categoryText}>{label}</Text>
  </TouchableOpacity>
);

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
    marginBottom: 16,
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
  searchBox: {
    backgroundColor: '#f1f1f1',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 16,
  },
  searchInput: {
    fontSize: 14,
    color: '#333',
  },
  bannerImageFull: {
    width: '100%',
    height: 150,
    borderRadius: 12,
    marginBottom: 24,
  },
  categoryScroll: {
    marginBottom: 20,
  },
  categoryButton: {
    backgroundColor: '#e8f5e9',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    marginRight: 8,
  },
  categoryText: {
    fontSize: 13,
    color: '#388e3c',
  },
  recommendScroll: {
    marginBottom: 24,
  },
  recommendCard: {
    marginRight: 20,
    width: 200,
  },
  cardShadow: {
    borderRadius: 12,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
    marginBottom: 6,
  },
  foodCard: {
    width: 200,
    height: 150,
    borderRadius: 12,
  },
  cardTitleSmall: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardInfo: {
    fontSize: 15,
    color: '#555',
  },
  subTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 12,
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
