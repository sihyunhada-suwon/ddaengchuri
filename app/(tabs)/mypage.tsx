import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
  StatusBar,
  Image,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import MembershipScreen from '../MembershipScreen';
import { useRouter } from 'expo-router';

export default function MyPage() {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [showMembership, setShowMembership] = useState(false);
  const router = useRouter();

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      setProfileImage(result.assets[0].uri);
    }
  };

  if (showMembership) {
    return <MembershipScreen />;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.greenHeader}>
        <View style={styles.profileRowCentered}>
          <View style={styles.profileRowInner}>
            <TouchableOpacity
              style={styles.profileImageWrapper}
              onPress={pickImage}
            >
              {profileImage ? (
                <Image
                  source={{ uri: profileImage }}
                  style={styles.profileImage}
                />
              ) : (
                <Text style={styles.profileEmoji}>🌱</Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/Login')}>
              <Text style={styles.profileTextLeftAligned}>
                환경을 위한 한걸음,{'\n'}
                지금 로그인하고 시작해보세요! ❯{' '}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.infoBox}>
          <TouchableOpacity
            style={styles.infoItem}
            onPress={() => router.push('/MembershipScreen')}
          >
            <Text style={styles.infoLabel}>등급</Text>
            <Text style={styles.infoValue}>- - -</Text>
          </TouchableOpacity>

          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>적립금</Text>
            <Text style={styles.infoValue}>0원</Text>
          </View>

          <TouchableOpacity
            style={styles.infoItem}
            onPress={() => router.push('/Coupon')} // ✅ 쿠폰 페이지로 이동
          >
            <Text style={styles.infoLabel}>쿠폰</Text>
            <Text style={styles.infoValue}>0장</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.statBoxShadowWrapper}>
        <View style={styles.statBox}>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>CO₂ 배출감소♻️</Text>
            <Text style={styles.statValue}>약 0.0kg</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>줄인 음식물 쓰레기📉</Text>
            <Text style={styles.statValue}>약 0.0g</Text>
          </View>
        </View>
      </View>

      <View style={styles.bannerBox}>
        <View style={styles.bannerTextWrapper}>
          <Text style={styles.bannerTitle}>
            지구도 지키고, 포인트도 챙기세요!
          </Text>
          <View style={styles.bannerSubRow}>
            <Text style={styles.bannerSub}>
              지금 구매하면 환경보호 + 리워드까지!
            </Text>
            <Image
              source={require('../../assets/mypage/reward.png')}
              style={styles.rewardIcon}
              resizeMode="contain"
            />
          </View>
        </View>
        <Image
          source={require('../../assets/mypage/saveearth.png')}
          style={styles.bannerImage}
          resizeMode="contain"
        />
      </View>

      <View style={styles.menuBox}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => router.push('/Favorites')}
        >
          <Image
            source={require('../../assets/mypage/heart.png')}
            style={styles.menuIcon}
          />
          <Text style={styles.menuText}>즐겨찾기</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => router.push('/Review')}
        >
          <Image
            source={require('../../assets/mypage/review.png')}
            style={styles.menuIcon}
          />
          <Text style={styles.menuText}>리뷰 관리</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Image
            source={require('../../assets/mypage/location.png')}
            style={styles.menuIcon}
          />
          <Text style={styles.menuText}>주소 관리</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.separator} />

      <View style={styles.sectionTitleBox}>
        <Text style={styles.sectionTitle}>고객지원</Text>
      </View>
      <View style={styles.supportBox}>
        <TouchableOpacity
          style={styles.bulletRow}
          onPress={() => router.push('/Notice')} // <-- 공지사항으로 이동
        >
          <View style={styles.bullet} />
          <Text style={styles.supportText}>공지사항</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.bulletRow}
          onPress={() => router.push('/Support')} // 선택: 고객센터 페이지가 있다면
        >
          <View style={styles.bullet} />
          <Text style={styles.supportText}>고객센터</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.bulletRow}
          onPress={() => router.push('/Privacy')} // 선택: 개인정보약관 페이지가 있다면
        >
          <View style={styles.bullet} />
          <Text style={styles.supportText}>개인정보약관</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  greenHeader: {
    backgroundColor: '#2d5d38',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight! + 30 : 90,
    paddingBottom: 25,
    paddingHorizontal: 20,
  },
  profileRowCentered: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 25,
  },
  profileRowInner: { flexDirection: 'row', alignItems: 'center' },
  profileImageWrapper: {
    width: 85,
    height: 85,
    borderRadius: 50,
    backgroundColor: '#f5f4f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  profileImage: { width: 80, height: 80, borderRadius: 30 },
  profileEmoji: { fontSize: 40 },
  profileTextLeftAligned: {
    color: '#fff',
    fontSize: 17,
    lineHeight: 23,
    fontWeight: '600',
    textAlign: 'left',
    flexShrink: 1,
  },
  infoBox: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 18,
    marginBottom: 25,
  },
  infoItem: { alignItems: 'center' },
  infoLabel: { marginTop: -10, fontSize: 17, color: '#fff', fontWeight: '600' },
  infoValue: { marginTop: 15, fontSize: 15, fontWeight: '500', color: '#fff' },
  statBoxShadowWrapper: {
    marginHorizontal: 20,
    marginTop: -40,
    zIndex: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
    borderRadius: 12,
    backgroundColor: '#f5f4f0',
  },
  statBox: {
    flexDirection: 'row',
    backgroundColor: '#f5f4f0',
    borderRadius: 10,
    overflow: 'hidden',
  },
  statItem: { flex: 1, padding: 18, alignItems: 'center' },
  statLabel: { fontSize: 13, color: '#444444', fontWeight: 'bold' },
  statValue: {
    marginTop: 5,
    fontWeight: 'bold',
    fontSize: 15,
    color: '#444444',
  },
  divider: {
    width: 0.7,
    backgroundColor: '#ccc',
    height: '70%',
    alignSelf: 'center',
  },
  bannerBox: {
    flexDirection: 'row',
    backgroundColor: '#fff8cc',
    width: 360,
    height: 75,
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20,
    marginHorizontal: 20,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bannerTextWrapper: { flex: 1, marginRight: 12 },
  bannerTitle: {
    fontWeight: '600',
    fontSize: 15,
    color: '#444',
    marginLeft: 17,
  },
  bannerSubRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    marginLeft: 19,
  },
  bannerSub: { fontSize: 12, color: '#666', marginRight: 6 },
  rewardIcon: { width: 14, height: 14, marginLeft: -5 },
  bannerImage: { width: 65, height: 65, marginRight: 20 },
  menuBox: { paddingHorizontal: 20, marginTop: -10 },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  menuIcon: { width: 27, height: 27, resizeMode: 'contain' },
  menuText: { marginLeft: 12, fontSize: 17, color: '#444', fontWeight: '500' },
  separator: {
    height: 1,
    backgroundColor: '#f2f2f2',
    width: '90%',
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 16,
  },
  sectionTitleBox: {
    paddingHorizontal: 20,
    marginTop: 12,
    marginBottom: 10,
    marginLeft: -3,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 17,
    color: '#444',
    marginLeft: 8,
    marginBottom: 10,
  },
  supportBox: { paddingHorizontal: 20, paddingBottom: 50, gap: 10 },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  bullet: {
    width: 5,
    height: 12,
    backgroundColor: '#cccccc',
    marginRight: 15,
    marginLeft: 10,
    borderRadius: 5,
  },
  supportText: {
    fontSize: 17,
    fontWeight: '500',
    paddingVertical: 5,
    color: '#444',
  },
});
