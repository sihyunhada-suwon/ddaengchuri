import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
  StatusBar,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';

export default function Privacy() {
  const router = useRouter();

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        {/* 상단 헤더 */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Feather name="chevron-left" size={26} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>개인정보 처리방침</Text>
          <View style={{ width: 26 }} />
        </View>

        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.updated}>시행일: 2025-08-14</Text>
          <Text style={styles.paragraph}>
            Save It(이하 “회사”)는 이용자의 개인정보를 소중히 여기며, 『개인정보
            보호법』 등 관련 법령을 준수합니다. 본 개인정보 처리방침은 회사가
            서비스를 제공함에 있어 개인정보를 어떻게 수집·이용·보관·파기하는지와
            이용자의 권리를 어떻게 보장하는지 설명합니다.
          </Text>

          {/* 1. 수집 항목 */}
          <Text style={styles.sectionTitle}>1. 수집하는 개인정보 항목</Text>
          <View style={styles.bulletBox}>
            <Text style={styles.bullet}>
              • 회원가입 시: 이메일, 비밀번호, 닉네임(선택), 프로필 이미지(선택)
            </Text>
            <Text style={styles.bullet}>
              • 서비스 이용 시: 주문/결제 이력, 쿠폰/적립금 사용 기록, 즐겨찾기,
              리뷰
            </Text>
            <Text style={styles.bullet}>
              • 위치 기반 기능 사용 시: 기기 위치정보(선택 동의 시)
            </Text>
            <Text style={styles.bullet}>
              • 고객센터 문의 시: 문의 내용, 연락처(이메일/전화번호 등)
            </Text>
            <Text style={styles.bullet}>
              • 자동 수집 정보: 기기식별자, 앱/OS 버전, 접속 일시, 이용 기록,
              광고식별자
            </Text>
          </View>

          {/* 2. 이용 목적 */}
          <Text style={styles.sectionTitle}>2. 개인정보의 이용 목적</Text>
          <View style={styles.bulletBox}>
            <Text style={styles.bullet}>
              • 회원 식별 및 서비스 제공, 로그인/인증
            </Text>
            <Text style={styles.bullet}>
              • 주문 처리, 결제/환불, 쿠폰 및 적립금 관리
            </Text>
            <Text style={styles.bullet}>
              • 위치 기반 매장/상품 추천 및 지도 기능 제공(선택)
            </Text>
            <Text style={styles.bullet}>
              • 고객문의 응대, 공지사항 및 중요 알림 전달
            </Text>
            <Text style={styles.bullet}>
              • 앱 품질 향상, 서비스 개선을 위한 통계/분석
            </Text>
            <Text style={styles.bullet}>• 법령 준수 및 분쟁 대응</Text>
          </View>

          {/* 3. 보유 및 이용기간 */}
          <Text style={styles.sectionTitle}>3. 보유 및 이용기간</Text>
          <Text style={styles.paragraph}>
            회사는 개인정보의 수집·이용 목적이 달성되면 지체 없이 파기합니다.
            다만, 다음의 경우는 예외로 보관합니다.
          </Text>
          <View style={styles.bulletBox}>
            <Text style={styles.bullet}>• 계약/청약철회 기록: 5년</Text>
            <Text style={styles.bullet}>
              • 대금 결제 및 재화 등의 공급 기록: 5년
            </Text>
            <Text style={styles.bullet}>
              • 소비자 불만 또는 분쟁 처리 기록: 3년
            </Text>
            <Text style={styles.bullet}>• 접속 기록(IP 포함): 3개월</Text>
            <Text style={styles.bulletSub}>
              ※ 위 기간은 전자상거래 등 관련 법령에 따릅니다.
            </Text>
          </View>

          {/* 4. 제3자 제공 */}
          <Text style={styles.sectionTitle}>4. 개인정보의 제3자 제공</Text>
          <Text style={styles.paragraph}>
            회사는 이용자의 동의 없이 개인정보를 외부에 제공하지 않습니다. 다만
            법령에 근거가 있거나 수사기관의 적법한 요청이 있는 경우 제공될 수
            있습니다.
          </Text>

          {/* 5. 처리위탁 */}
          <Text style={styles.sectionTitle}>5. 개인정보 처리의 위탁</Text>
          <Text style={styles.paragraph}>
            서비스 운영을 위해 일부 업무를 외부 전문업체에 위탁할 수 있습니다.
            위탁 시 계약 등을 통해 개인정보 보호 관련 법령을 준수하도록
            관리·감독합니다.
          </Text>
          <View style={styles.bulletBox}>
            <Text style={styles.bullet}>
              • 클라우드/서버 운영: (예) AWS, Vercel 등
            </Text>
            <Text style={styles.bullet}>
              • 푸시/알림 발송: (예) Firebase Cloud Messaging
            </Text>
            <Text style={styles.bullet}>• 결제 대행: (예) ○○PG사</Text>
            <Text style={styles.bulletSub}>
              ※ 실제 사용 중인 업체명으로 교체해 주세요.
            </Text>
          </View>

          {/* 6. 이용자 권리 */}
          <Text style={styles.sectionTitle}>
            6. 이용자 및 법정대리인의 권리
          </Text>
          <View style={styles.bulletBox}>
            <Text style={styles.bullet}>
              • 개인정보 열람, 정정/삭제, 처리정지를 요구할 수 있습니다.
            </Text>
            <Text style={styles.bullet}>
              • 회원 탈퇴 시 보관 의무가 없는 정보는 즉시 파기합니다.
            </Text>
            <Text style={styles.bullet}>
              • 권리 행사는 앱 내 설정/문의 또는 아래 연락처로 요청할 수
              있습니다.
            </Text>
          </View>

          {/* 7. 쿠키/유사기술 */}
          <Text style={styles.sectionTitle}>7. 쿠키 및 유사 기술의 이용</Text>
          <Text style={styles.paragraph}>
            회사는 서비스 이용 편의를 위해 쿠키/로컬스토리지 등을 사용할 수
            있습니다. 이용자는 브라우저/기기 설정에서 저장을 거부하거나 삭제할
            수 있으나, 일부 기능 이용에 제한이 있을 수 있습니다.
          </Text>

          {/* 8. 안전성 확보 조치 */}
          <Text style={styles.sectionTitle}>
            8. 개인정보의 안전성 확보 조치
          </Text>
          <View style={styles.bulletBox}>
            <Text style={styles.bullet}>
              • 암호화 저장(비밀번호 등 중요 정보)
            </Text>
            <Text style={styles.bullet}>
              • 접근권한 관리 및 최소화, 정기 점검
            </Text>
            <Text style={styles.bullet}>
              • 보안 솔루션 적용 및 로그 모니터링
            </Text>
            <Text style={styles.bullet}>• 개인정보 취급자 교육</Text>
          </View>

          {/* 9. 해외 이전(해당 시) */}
          <Text style={styles.sectionTitle}>
            9. 국외 이전에 관한 사항(해당 시)
          </Text>
          <Text style={styles.paragraph}>
            해외 클라우드/서비스를 이용하는 경우, 개인정보가 국외 서버로 이전될
            수 있습니다. 이전 국가, 이전 일시/방법, 보유·이용기간 등의 상세
            내용은 서비스 내 별도 공지하거나 개별 동의 절차를 거칩니다.
          </Text>

          {/* 10. 어린이의 개인정보 */}
          <Text style={styles.sectionTitle}>10. 어린이의 개인정보 보호</Text>
          <Text style={styles.paragraph}>
            만 14세 미만 아동의 경우 법정대리인의 동의가 필요한 서비스만
            제공하며, 필요한 경우 법정대리인의 동의를 확인하는 절차를
            마련합니다.
          </Text>

          {/* 11. 방침의 변경 */}
          <Text style={styles.sectionTitle}>11. 개인정보 처리방침의 변경</Text>
          <Text style={styles.paragraph}>
            법령 또는 서비스 변경에 따라 본 방침은 개정될 수 있습니다. 중요한
            변경 사항이 있을 경우 앱 내 공지사항 등을 통해 사전 고지합니다.
          </Text>

          {/* 12. 연락처 */}
          <Text style={styles.sectionTitle}>
            12. 개인정보 보호책임자 및 연락처
          </Text>
          <View style={styles.bulletBox}>
            <Text style={styles.bullet}>
              • 담당자: (예) 개인정보보호책임자 홍길동
            </Text>
            <Text style={styles.bullet}>• 이메일: save-it@save-it.app</Text>
            <Text style={styles.bullet}>• 전화: 02-000-0000</Text>
            <Text style={styles.bullet}>
              • 주소: 서울특별시 ○○구 ○○로 00, 000호
            </Text>
            <Text style={styles.bulletSub}></Text>
          </View>

          <Text style={styles.note}>
            ※ 본 문서는 서비스 상황에 맞춰 쉽게 수정할 수 있는 안내용 예시이며,
            법률 자문이 필요한 경우 전문가 검토를 권장합니다.
          </Text>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight ?? 0 : 50,
    backgroundColor: '#fff',
  },
  header: {
    height: 56,
    paddingHorizontal: 16,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  headerTitle: { fontSize: 18, fontWeight: '600' },
  content: {
    padding: 16,
    paddingBottom: 40,
    gap: 10,
  },
  updated: { fontSize: 12, color: '#777', marginBottom: 8 },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginTop: 14,
    marginBottom: 6,
    color: '#222',
  },
  paragraph: {
    fontSize: 14,
    color: '#444',
    lineHeight: 20,
  },
  bulletBox: { gap: 6, marginTop: 4 },
  bullet: {
    fontSize: 14,
    color: '#444',
    lineHeight: 20,
  },
  bulletSub: {
    fontSize: 12,
    color: '#777',
    lineHeight: 18,
  },
  note: {
    marginTop: 14,
    fontSize: 12,
    color: '#666',
  },
});
