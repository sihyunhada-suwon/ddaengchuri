import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
  StatusBar,
} from 'react-native';
import { MaterialIcons, Entypo } from '@expo/vector-icons';

export default function MyPage() {
  return (
    <ScrollView style={styles.container}>
      {/* 초록 배경 영역 */}
      <View style={styles.greenHeader}>
        <View style={styles.profileRowCentered}>
          <View style={styles.profileRowInner}>
            <View style={styles.profileImageWrapper}>
              <Image
                source={require('../../assets/leaf.png')}
                style={styles.profileImage}
              />
            </View>
            <Text style={styles.profileTextLeftAligned}>
              환경을 위한 한걸음,{'\n'}지금 로그인하고 시작해보세요 !
            </Text>
          </View>
        </View>

        {/* 등급, 적립금, 쿠폰 */}
        <View style={styles.infoBox}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>등급</Text>
            <Text style={styles.infoValue}>---</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>적립금</Text>
            <Text style={styles.infoValue}>0원</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>쿠폰</Text>
            <Text style={styles.infoValue}>0장</Text>
          </View>
        </View>
      </View>

      {/* CO2 배출감소 카드 */}
      <View style={styles.statBoxShadowWrapper}>
        <View style={styles.statBox}>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>CO₂ 배출감소♻️</Text>
            <Text style={styles.statValue}>약 0.0kg</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>줄인 음식물 쓰레기🧾</Text>
            <Text style={styles.statValue}>약 0.0g</Text>
          </View>
        </View>
      </View>

      {/* 리워드 배너 */}
      <View style={styles.bannerBox}>
        <Text style={styles.bannerTitle}>
          지구도 지키고, 포인트도 챙기세요!
        </Text>
        <Text style={styles.bannerSub}>
          지금 구매하면 환경보호 + 리워드까지 !🥕
        </Text>
      </View>

      {/* 메뉴 */}
      <View style={styles.menuBox}>
        <TouchableOpacity style={styles.menuItem}>
          <Entypo name="heart-outlined" size={22} color="#333" />
          <Text style={styles.menuText}>즐겨찾기</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <MaterialIcons name="rate-review" size={22} color="#333" />
          <Text style={styles.menuText}>리뷰 관리</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Entypo name="location-pin" size={22} color="#333" />
          <Text style={styles.menuText}>주소 관리</Text>
        </TouchableOpacity>
      </View>

      {/* 고객지원 */}
      <View style={styles.sectionTitleBox}>
        <Text style={styles.sectionTitle}>고객지원</Text>
      </View>
      <View style={styles.supportBox}>
        <Text style={styles.supportText}>ㆍ공지사항</Text>
        <Text style={styles.supportText}>ㆍ고객센터</Text>
        <Text style={styles.supportText}>ㆍ개인정보약관</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  greenHeader: {
    backgroundColor: '#2d5d38',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight! + 30 : 90,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  profileRowCentered: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  profileRowInner: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImageWrapper: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 50,
  },
  profileTextLeftAligned: {
    marginLeft: 20,
    color: '#fff',
    fontSize: 19,
    lineHeight: 26,
    fontWeight: '600',
    textAlign: 'left',
  },
  infoBox: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
  },
  infoItem: {
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 15,
    color: '#eee',
  },
  infoValue: {
    marginTop: 5,
    fontSize: 17,
    fontWeight: 'bold',
    color: '#fff',
  },
  statBoxShadowWrapper: {
    marginHorizontal: 20,
    marginTop: -20,
    zIndex: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
    borderRadius: 12,
    backgroundColor: '#fff',
  },
  statBox: {
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
    borderRadius: 12,
    overflow: 'hidden',
  },
  statItem: {
    flex: 1,
    padding: 18,
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 15,
    color: '#555',
  },
  statValue: {
    marginTop: 5,
    fontWeight: 'bold',
    fontSize: 16,
  },
  divider: {
    width: 1,
    backgroundColor: '#ccc',
  },
  bannerBox: {
    backgroundColor: '#fff8cc',
    margin: 20,
    padding: 18,
    borderRadius: 10,
  },
  bannerTitle: {
    fontWeight: 'bold',
    fontSize: 17,
  },
  bannerSub: {
    marginTop: 5,
    fontSize: 15,
    color: '#555',
  },
  menuBox: {
    paddingHorizontal: 20,
    marginTop: -10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  menuText: {
    marginLeft: 12,
    fontSize: 18,
    color: '#222',
    fontWeight: '500',
  },
  sectionTitleBox: {
    paddingHorizontal: 20,
    marginTop: 30,
    marginBottom: 8,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 17,
    color: '#222',
  },
  supportBox: {
    paddingHorizontal: 20,
    paddingBottom: 50,
    gap: 10,
  },
  supportText: {
    fontSize: 17,
    paddingVertical: 6,
    color: '#555',
  },
});
