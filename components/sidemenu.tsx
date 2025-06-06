// import React from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   Dimensions,
//   Animated,
//   TouchableOpacity,
//   Image,
// } from 'react-native';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import {
//   Ionicons,
//   MaterialCommunityIcons,
//   Feather,
//   FontAwesome5,
//   Entypo,
// } from '@expo/vector-icons';

// const screenWidth = Dimensions.get('window').width;

// interface SideMenuProps {
//   slideAnim: Animated.Value;
// }

// export default function SideMenu({ slideAnim }: SideMenuProps) {
//   const insets = useSafeAreaInsets();

//   return (
//     <Animated.View
//       style={[styles.sideMenu, { left: slideAnim, paddingTop: insets.top }]}
//     >
//       {/* 프로필 영역 */}
//       <View style={styles.profileSection}>
//         <Image
//           source={require('../assets/leaf.png')} // ← 여기에 로고 이미지 넣으세요
//           style={styles.profileImage}
//         />
//         <Text style={styles.username}>Sihyunhada</Text>
//         <Text style={styles.subText}>카카오 계정으로 로그인됨</Text>
//       </View>

//       {/* 메뉴 항목들 */}
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
//     alignItems: 'center',
//     marginBottom: 32,
//   },
//   profileImage: {
//     width: 72,
//     height: 72,
//     borderRadius: 36,
//     backgroundColor: '#fff',
//     marginBottom: 8,
//   },
//   username: {
//     backgroundColor: '#b2d8c5',
//     paddingHorizontal: 12,
//     paddingVertical: 4,
//     borderRadius: 12,
//     color: '#fff',
//     fontWeight: 'bold',
//     marginBottom: 4,
//   },
//   subText: {
//     fontSize: 13,
//     color: '#999',
//   },
//   menuItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 14,
//   },
//   icon: {
//     marginRight: 12,
//   },
//   menuText: {
//     fontSize: 16,
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
  Image,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons, Feather } from '@expo/vector-icons';

const screenWidth = Dimensions.get('window').width;

interface SideMenuProps {
  slideAnim: Animated.Value;
}

export default function SideMenu({ slideAnim }: SideMenuProps) {
  const insets = useSafeAreaInsets();

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
          <Image
            source={require('../assets/leaf.png')} // 너의 잎사귀 아이콘 경로로 바꿔줘
            style={styles.profileImage}
          />
        </View>
        <Text style={styles.username}>Sihyunhada</Text>
        <Text style={styles.subText}>카카오 계정으로 로그인됨</Text>
      </View>

      {/* 메뉴 리스트 */}
      <TouchableOpacity style={styles.menuItem}>
        <Ionicons
          name="heart-outline"
          size={20}
          color="#333"
          style={styles.icon}
        />
        <Text style={styles.menuText}>찜 내역</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem}>
        <MaterialCommunityIcons
          name="square-edit-outline"
          size={20}
          color="#333"
          style={styles.icon}
        />
        <Text style={styles.menuText}>리뷰 관리</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem}>
        <Ionicons
          name="location-outline"
          size={20}
          color="#333"
          style={styles.icon}
        />
        <Text style={styles.menuText}>주소 관리</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem}>
        <MaterialCommunityIcons
          name="ticket-percent-outline"
          size={20}
          color="#333"
          style={styles.icon}
        />
        <Text style={styles.menuText}>쿠폰함</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem}>
        <Feather name="mail" size={20} color="#333" style={styles.icon} />
        <Text style={styles.menuText}>고객센터/문의하기</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem}>
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
    alignItems: 'center',
    marginBottom: 32,
  },
  logoWrapper: {
    backgroundColor: '#fff',
    width: 72,
    height: 72,
    borderRadius: 36,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4, // Android 그림자
    shadowColor: '#000', // iOS 그림자
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    marginBottom: 12,
  },
  profileImage: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  username: {
    backgroundColor: '#b2d8c5',
    paddingHorizontal: 14,
    paddingVertical: 4,
    borderRadius: 16,
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 4,
  },
  subText: {
    fontSize: 12,
    color: '#aaa',
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
