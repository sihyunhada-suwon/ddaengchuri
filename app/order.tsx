// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   TextInput,
//   StyleSheet,
//   ScrollView,
// } from 'react-native';
// import { useRouter } from 'expo-router';
// import Checkbox from 'expo-checkbox';

// export default function OrderScreen() {
//   const router = useRouter();
//   const [noDisposable, setNoDisposable] = useState(true);
//   const [paymentMethod, setPaymentMethod] = useState<
//     'simple' | 'card' | 'phone'
//   >('card');
//   const [usePoints, setUsePoints] = useState(200);

//   const totalPrice = 12500;
//   const discount = 2700;
//   const finalPrice = totalPrice - discount - usePoints;
//   const savedPoints = Math.floor(finalPrice * 0.022); // 2.2% 적립 예시

//   return (
//     <View style={{ flex: 1, backgroundColor: '#fff' }}>
//       <ScrollView style={styles.container}>
//         {/* Header */}
//         <View style={styles.header}>
//           <TouchableOpacity onPress={() => router.back()}>
//             <Text style={styles.backArrow}>{'<'}</Text>
//           </TouchableOpacity>
//           <Text style={styles.headerTitle}>주문하기</Text>
//         </View>

//         {/* 요청사항 */}
//         <Text style={styles.sectionTitle}>요청사항</Text>
//         <Text style={styles.subLabel}>가게 사장님에게</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="요청사항을 입력해주세요."
//           placeholderTextColor="#aaa"
//         />

//         {/* 일회용품 제외 */}
//         <View style={styles.checkboxRow}>
//           <Checkbox
//             value={noDisposable}
//             onValueChange={setNoDisposable}
//             color={noDisposable ? '#115C3C' : undefined}
//           />
//           <Text style={styles.checkboxLabel}>일회용 수저, 포크는 빼주세요</Text>
//         </View>

//         {/* 결제수단 */}
//         <Text style={styles.sectionTitle}>결제수단</Text>
//         <View style={styles.paymentRow}>
//           {['간편결제', '카드', '휴대폰'].map((label, index) => {
//             const keys: ('simple' | 'card' | 'phone')[] = [
//               'simple',
//               'card',
//               'phone',
//             ];
//             const active = paymentMethod === keys[index];
//             return (
//               <TouchableOpacity
//                 key={label}
//                 style={[
//                   styles.paymentButton,
//                   active && styles.paymentButtonActive,
//                 ]}
//                 onPress={() => setPaymentMethod(keys[index])}
//               >
//                 <Text
//                   style={[
//                     styles.paymentText,
//                     active && styles.paymentTextActive,
//                   ]}
//                 >
//                   {label}
//                 </Text>
//               </TouchableOpacity>
//             );
//           })}
//         </View>

//         {/* 할인 */}
//         <Text style={styles.sectionTitle}>할인</Text>
//         <View style={styles.discountRow}>
//           <Text style={styles.label}>쿠폰</Text>
//           <Text style={styles.smallText}>2장 보유</Text>
//         </View>
//         <TouchableOpacity style={styles.dropdown}>
//           <Text style={styles.placeholder}>사용 가능한 쿠폰이 없어요.</Text>
//         </TouchableOpacity>

//         <View style={styles.discountRow}>
//           <Text style={styles.label}>포인트</Text>
//           <Text style={styles.smallText}>보유포인트: 750원</Text>
//         </View>
//         <View style={styles.pointRow}>
//           <TextInput
//             style={[styles.input, { flex: 1, marginTop: 0 }]}
//             value={usePoints.toString()}
//             keyboardType="numeric"
//             onChangeText={(t) => setUsePoints(Number(t) || 0)}
//           />
//           <TouchableOpacity
//             style={styles.useAllButton}
//             onPress={() => setUsePoints(750)}
//           >
//             <Text style={styles.useAllText}>모두사용</Text>
//           </TouchableOpacity>
//         </View>

//         {/* 결제 금액 요약 */}
//         <Text style={styles.sectionTitle}>총 결제 금액</Text>
//         <View style={styles.summaryRow}>
//           <Text>총 주문금액</Text>
//           <Text>{totalPrice.toLocaleString()}원</Text>
//         </View>
//         <View style={styles.summaryRow}>
//           <Text>
//             마감할인 <Text style={styles.discountBadge}>22%</Text>
//           </Text>
//           <Text style={{ color: '#115C3C' }}>
//             - {discount.toLocaleString()}원
//           </Text>
//         </View>
//         <View style={styles.summaryRow}>
//           <Text>포인트</Text>
//           <Text style={{ color: '#115C3C' }}>
//             - {usePoints.toLocaleString()}원
//           </Text>
//         </View>
//         <View style={styles.summaryRow}>
//           <Text>예상 적립 포인트</Text>
//           <Text>{savedPoints}원</Text>
//         </View>

//         <View style={{ height: 100 }} />
//       </ScrollView>

//       {/* 하단 결제 버튼 */}
//       <View style={styles.footer}>
//         <Text style={styles.footerText}>
//           {finalPrice.toLocaleString()}원 결제하기
//         </Text>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { paddingHorizontal: 20 },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 50,
//     marginBottom: 15,
//   },
//   backArrow: { fontSize: 22, marginRight: 10, color: '#115C3C' },
//   headerTitle: { fontSize: 18, fontWeight: '600' },
//   sectionTitle: {
//     fontWeight: '700',
//     fontSize: 15,
//     marginTop: 25,
//     marginBottom: 8,
//   },
//   subLabel: { color: '#444', marginBottom: 5 },
//   input: {
//     borderWidth: 1,
//     borderColor: '#E0E0E0',
//     borderRadius: 10,
//     padding: 10,
//     fontSize: 14,
//     marginBottom: 10,
//   },
//   checkboxRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
//   checkboxLabel: { marginLeft: 8, color: '#333' },
//   paymentRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 20,
//   },
//   paymentButton: {
//     flex: 1,
//     backgroundColor: '#F2F2F2',
//     borderRadius: 10,
//     paddingVertical: 12,
//     alignItems: 'center',
//     marginHorizontal: 5,
//   },
//   paymentButtonActive: { backgroundColor: '#115C3C' },
//   paymentText: { color: '#333', fontWeight: '600' },
//   paymentTextActive: { color: '#fff' },
//   discountRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginTop: 10,
//   },
//   label: { fontWeight: '600', fontSize: 14 },
//   smallText: { color: '#666', fontSize: 12 },
//   dropdown: {
//     borderWidth: 1,
//     borderColor: '#E0E0E0',
//     borderRadius: 10,
//     padding: 12,
//     marginTop: 8,
//   },
//   placeholder: { color: '#999' },
//   pointRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
//   useAllButton: {
//     backgroundColor: '#F2F2F2',
//     paddingVertical: 12,
//     paddingHorizontal: 20,
//     borderRadius: 10,
//     marginLeft: 10,
//   },
//   useAllText: { fontWeight: '600', color: '#333' },
//   summaryRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 8,
//   },
//   discountBadge: {
//     color: '#115C3C',
//     fontWeight: '700',
//     backgroundColor: '#E0F0E8',
//     paddingHorizontal: 5,
//     borderRadius: 5,
//   },
//   footer: {
//     backgroundColor: '#115C3C',
//     alignItems: 'center',
//     justifyContent: 'center',
//     height: 60,
//   },
//   footerText: { color: '#fff', fontWeight: '700', fontSize: 16 },
// });

import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import Checkbox from 'expo-checkbox';

export default function OrderScreen() {
  const router = useRouter();
  const [noDisposable, setNoDisposable] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState<
    'simple' | 'card' | 'phone'
  >('card');
  const [usePoints, setUsePoints] = useState(200);

  const totalPrice = 12500;
  const discount = 2700;
  const finalPrice = totalPrice - discount - usePoints;
  const savedPoints = Math.floor(finalPrice * 0.022); // 2.2% 적립 예시

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* ✅ 기본 expo-router 헤더 제거 */}
      <Stack.Screen
        options={{
          headerShown: false,
          title: '',
          headerBackVisible: false,
        }}
      />

      <ScrollView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.backArrow}>{'<'}</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>주문하기</Text>
        </View>

        {/* 요청사항 */}
        <Text style={styles.sectionTitle}>요청사항</Text>
        <Text style={styles.subLabel}>가게 사장님에게</Text>
        <TextInput
          style={styles.input}
          placeholder="요청사항을 입력해주세요."
          placeholderTextColor="#aaa"
        />

        {/* 일회용품 제외 */}
        <View style={styles.checkboxRow}>
          <Checkbox
            value={noDisposable}
            onValueChange={setNoDisposable}
            color={noDisposable ? '#115C3C' : undefined}
          />
          <Text style={styles.checkboxLabel}>일회용 수저, 포크는 빼주세요</Text>
        </View>

        {/* 결제수단 */}
        <Text style={styles.sectionTitle}>결제수단</Text>
        <View style={styles.paymentRow}>
          {['간편결제', '카드', '휴대폰'].map((label, index) => {
            const keys: ('simple' | 'card' | 'phone')[] = [
              'simple',
              'card',
              'phone',
            ];
            const active = paymentMethod === keys[index];
            return (
              <TouchableOpacity
                key={label}
                style={[
                  styles.paymentButton,
                  active && styles.paymentButtonActive,
                ]}
                onPress={() => setPaymentMethod(keys[index])}
              >
                <Text
                  style={[
                    styles.paymentText,
                    active && styles.paymentTextActive,
                  ]}
                >
                  {label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* 할인 */}
        <Text style={styles.sectionTitle}>할인</Text>
        <View style={styles.discountRow}>
          <Text style={styles.label}>쿠폰</Text>
          <Text style={styles.smallText}>2장 보유</Text>
        </View>
        <TouchableOpacity style={styles.dropdown}>
          <Text style={styles.placeholder}>사용 가능한 쿠폰이 없어요.</Text>
        </TouchableOpacity>

        <View style={styles.discountRow}>
          <Text style={styles.label}>포인트</Text>
          <Text style={styles.smallText}>보유포인트: 750원</Text>
        </View>
        <View style={styles.pointRow}>
          <TextInput
            style={[styles.input, { flex: 1, marginTop: 0 }]}
            value={usePoints.toString()}
            keyboardType="numeric"
            onChangeText={(t) => setUsePoints(Number(t) || 0)}
          />
          <TouchableOpacity
            style={styles.useAllButton}
            onPress={() => setUsePoints(750)}
          >
            <Text style={styles.useAllText}>모두사용</Text>
          </TouchableOpacity>
        </View>

        {/* 결제 금액 요약 */}
        <Text style={styles.sectionTitle}>총 결제 금액</Text>
        <View style={styles.summaryRow}>
          <Text>총 주문금액</Text>
          <Text>{totalPrice.toLocaleString()}원</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text>
            마감할인 <Text style={styles.discountBadge}>22%</Text>
          </Text>
          <Text style={{ color: '#115C3C' }}>
            - {discount.toLocaleString()}원
          </Text>
        </View>
        <View style={styles.summaryRow}>
          <Text>포인트</Text>
          <Text style={{ color: '#115C3C' }}>
            - {usePoints.toLocaleString()}원
          </Text>
        </View>
        <View style={styles.summaryRow}>
          <Text>예상 적립 포인트</Text>
          <Text>{savedPoints}원</Text>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* 하단 결제 버튼 */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          {finalPrice.toLocaleString()}원 결제하기
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 20 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 15,
  },
  backArrow: { fontSize: 22, marginRight: 10, color: '#115C3C' },
  headerTitle: { fontSize: 18, fontWeight: '600' },
  sectionTitle: {
    fontWeight: '700',
    fontSize: 15,
    marginTop: 25,
    marginBottom: 8,
  },
  subLabel: { color: '#444', marginBottom: 5 },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    padding: 10,
    fontSize: 14,
    marginBottom: 10,
  },
  checkboxRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  checkboxLabel: { marginLeft: 8, color: '#333' },
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  paymentButton: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  paymentButtonActive: { backgroundColor: '#115C3C' },
  paymentText: { color: '#333', fontWeight: '600' },
  paymentTextActive: { color: '#fff' },
  discountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  label: { fontWeight: '600', fontSize: 14 },
  smallText: { color: '#666', fontSize: 12 },
  dropdown: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    padding: 12,
    marginTop: 8,
  },
  placeholder: { color: '#999' },
  pointRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  useAllButton: {
    backgroundColor: '#F2F2F2',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginLeft: 10,
  },
  useAllText: { fontWeight: '600', color: '#333' },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  discountBadge: {
    color: '#115C3C',
    fontWeight: '700',
    backgroundColor: '#E0F0E8',
    paddingHorizontal: 5,
    borderRadius: 5,
  },
  footer: {
    backgroundColor: '#115C3C',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
  },
  footerText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});
