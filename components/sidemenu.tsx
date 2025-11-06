// import React from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   Dimensions,
//   Animated,
//   TouchableOpacity,
// } from 'react-native';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import { Ionicons, MaterialCommunityIcons, Feather } from '@expo/vector-icons';

// const screenWidth = Dimensions.get('window').width;

// interface SideMenuProps {
//   slideAnim: Animated.Value;
// }

// export default function SideMenu({ slideAnim }: SideMenuProps) {
//   const insets = useSafeAreaInsets();

//   return (
//     <Animated.View
//       style={[
//         styles.sideMenu,
//         { left: slideAnim, paddingTop: insets.top + 20 },
//       ]}
//     >
//       {/* 프로필 영역 */}
//       <View style={styles.profileSection}>
//         <View style={styles.logoWrapper}>
//           <Text style={styles.emoji}>🌱</Text>
//         </View>

//         <Text style={styles.username}>닉네임을 설정해주세요.</Text>
//         <Text style={styles.subText}>카카오 계정으로 로그인됨</Text>
//       </View>

//       {/* 메뉴 리스트 */}
//       <TouchableOpacity style={styles.menuItem}>
//         <Ionicons
//           name="heart-outline"
//           size={20}
//           color="#333"
//           style={styles.icon}
//         />
//         <Text style={styles.menuText}>찜 내역</Text>
//       </TouchableOpacity>

//       <TouchableOpacity style={styles.menuItem}>
//         <MaterialCommunityIcons
//           name="square-edit-outline"
//           size={20}
//           color="#333"
//           style={styles.icon}
//         />
//         <Text style={styles.menuText}>리뷰 관리</Text>
//       </TouchableOpacity>

//       <TouchableOpacity style={styles.menuItem}>
//         <Ionicons
//           name="location-outline"
//           size={20}
//           color="#333"
//           style={styles.icon}
//         />
//         <Text style={styles.menuText}>주소 관리</Text>
//       </TouchableOpacity>

//       <TouchableOpacity style={styles.menuItem}>
//         <MaterialCommunityIcons
//           name="ticket-percent-outline"
//           size={20}
//           color="#333"
//           style={styles.icon}
//         />
//         <Text style={styles.menuText}>쿠폰함</Text>
//       </TouchableOpacity>

//       <TouchableOpacity style={styles.menuItem}>
//         <Feather name="mail" size={20} color="#333" style={styles.icon} />
//         <Text style={styles.menuText}>고객센터/문의하기</Text>
//       </TouchableOpacity>

//       <TouchableOpacity style={styles.menuItem}>
//         <Feather name="settings" size={20} color="#333" style={styles.icon} />
//         <Text style={styles.menuText}>설정</Text>
//       </TouchableOpacity>
//     </Animated.View>
//   );
// }

// const styles = StyleSheet.create({
//   sideMenu: {
//     position: 'absolute',
//     top: 0,
//     bottom: 0,
//     width: screenWidth * 0.75,
//     backgroundColor: '#fdfdfb',
//     paddingHorizontal: 24,
//     zIndex: 10,
//   },
//   profileSection: {
//     alignItems: 'flex-start', // ✅ 왼쪽 정렬
//     marginBottom: 32,
//   },
//   logoWrapper: {
//     backgroundColor: '#fff',
//     width: 95,
//     height: 95,
//     borderRadius: 45,
//     justifyContent: 'center',
//     alignItems: 'center',
//     elevation: 4,
//     shadowColor: '#000',
//     shadowOpacity: 0.15,
//     shadowRadius: 4,
//     shadowOffset: { width: 0, height: 4 },
//     marginBottom: 25, // 텍스트와 간격
//     marginLeft: 10,
//   },
//   emoji: {
//     fontSize: 50,
//   },
//   username: {
//     backgroundColor: '#0062414D',
//     paddingHorizontal: 18,
//     paddingVertical: 6,
//     borderRadius: 18,
//     color: '#444',
//     fontWeight: 600,
//     fontSize: 18,
//     marginBottom: 10,
//     marginLeft: 1,
//   },
//   subText: {
//     fontSize: 13,
//     color: '#aaa',
//     marginLeft: 3,
//   },
//   menuItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 14,
//   },
//   icon: {
//     marginRight: 12,
//     width: 24,
//     textAlign: 'center',
//   },
//   menuText: {
//     fontSize: 15,
//     color: '#333',
//   },
// });

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router'; // ✅ 추가: 페이지 이동용

const screenWidth = Dimensions.get('window').width;

interface SideMenuProps {
  slideAnim: Animated.Value;
}

export default function SideMenu({ slideAnim }: SideMenuProps) {
  const insets = useSafeAreaInsets();
  const router = useRouter(); // ✅ 라우터 훅 사용

  return (
    <Animated.View
      style={[
        styles.sideMenu,
        { left: slideAnim, paddingTop: insets.top + 20 },
      ]}
    >
      {/* 프로필 영역 */}
      <View style={styles.profileSection}>
        <View style={styles.logoWrapper}>
          <Text style={styles.emoji}>🌱</Text>
        </View>

        <Text style={styles.username}>닉네임을 설정해주세요.</Text>
        <Text style={styles.subText}>카카오 계정으로 로그인됨</Text>
      </View>

      {/* 메뉴 리스트 */}
      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => router.push('/Favorites')} // ✅ 찜 내역 이동
      >
        <Ionicons
          name="heart-outline"
          size={20}
          color="#333"
          style={styles.icon}
        />
        <Text style={styles.menuText}>찜 내역</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => router.push('/Review')} // ✅ 리뷰 관리 이동
      >
        <MaterialCommunityIcons
          name="square-edit-outline"
          size={20}
          color="#333"
          style={styles.icon}
        />
        <Text style={styles.menuText}>리뷰 관리</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => router.push('/address')} // ✅ 주소 관리 이동
      >
        <Ionicons
          name="location-outline"
          size={20}
          color="#333"
          style={styles.icon}
        />
        <Text style={styles.menuText}>주소 관리</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => router.push('/Coupon')} // ✅ 쿠폰함 이동
      >
        <MaterialCommunityIcons
          name="ticket-percent-outline"
          size={20}
          color="#333"
          style={styles.icon}
        />
        <Text style={styles.menuText}>쿠폰함</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => router.push('/Support')} // ✅ 고객센터/문의하기 이동
      >
        <Feather name="mail" size={20} color="#333" style={styles.icon} />
        <Text style={styles.menuText}>고객센터/문의하기</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => router.push('/mypage')} // ✅ 설정 이동
      >
        <Feather name="settings" size={20} color="#333" style={styles.icon} />
        <Text style={styles.menuText}>설정</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  sideMenu: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: screenWidth * 0.75,
    backgroundColor: '#fdfdfb',
    paddingHorizontal: 24,
    zIndex: 10,
  },
  profileSection: {
    alignItems: 'flex-start',
    marginBottom: 32,
  },
  logoWrapper: {
    backgroundColor: '#fff',
    width: 95,
    height: 95,
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 4 },
    marginBottom: 25,
    marginLeft: 10,
  },
  emoji: {
    fontSize: 50,
  },
  username: {
    backgroundColor: '#0062414D',
    paddingHorizontal: 18,
    paddingVertical: 6,
    borderRadius: 18,
    color: '#444',
    fontWeight: '600',
    fontSize: 18,
    marginBottom: 10,
    marginLeft: 1,
  },
  subText: {
    fontSize: 13,
    color: '#aaa',
    marginLeft: 3,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
  },
  icon: {
    marginRight: 12,
    width: 24,
    textAlign: 'center',
  },
  menuText: {
    fontSize: 15,
    color: '#333',
  },
});
