// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   TextInput,
//   StyleSheet,
//   ScrollView,
//   Image,
// } from 'react-native';
// import { Stack, useRouter } from 'expo-router';
// import Checkbox from 'expo-checkbox';
// import { useCartStore } from '@/stores/cartStore';

// export default function OrderScreen() {
//   const router = useRouter();
//   const { items, totalPrice, clearCart } = useCartStore();
//   const [noDisposable, setNoDisposable] = useState(true);
//   const [paymentMethod, setPaymentMethod] = useState<
//     'simple' | 'card' | 'phone'
//   >('card');
//   const [usePoints, setUsePoints] = useState(0);
//   const [request, setRequest] = useState('');

//   const discount = Math.floor(totalPrice * 0.22);
//   const finalPrice = Math.max(totalPrice - discount - usePoints, 0);
//   const savedPoints = Math.floor(finalPrice * 0.022);

//   const handleOrder = () => {
//     alert('주문이 완료되었습니다!');
//     clearCart();
//     router.replace('/store');
//   };

//   return (
//     <View style={{ flex: 1, backgroundColor: '#fff' }}>
//       <Stack.Screen options={{ headerShown: false }} />
//       <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
//         {/* ✅ 상단 헤더 */}
//         <View style={styles.header}>
//           <TouchableOpacity
//             style={styles.backButton}
//             onPress={() => router.back()}
//           >
//             <Text style={styles.backArrow}>‹</Text>
//           </TouchableOpacity>
//           <Text style={styles.headerTitle}>주문하기</Text>
//         </View>

//         {/* ✅ 가게 정보 */}
//         <View style={styles.storeRow}>
//           <Image
//             source={{ uri: 'https://i.imgur.com/Vs5m1N0.png' }}
//             style={styles.storeLogo}
//           />
//           <Text style={styles.storeName}>NOVA BURGER</Text>
//         </View>

//         {/* ✅ 구분선 */}
//         <View style={styles.divider} />

//         {/* ✅ 메뉴명 / 총 주문 금액 (줄 분리됨) */}
//         <View style={styles.menuPriceBlock}>
//           <View style={styles.menuRow}>
//             <Text style={styles.menuText}>
//               {items[0]?.name || '메뉴 없음'} {items.length}건
//             </Text>
//           </View>

//           <View style={styles.priceRow}>
//             <Text style={styles.priceLabel}>총 주문 금액</Text>
//             <Text style={styles.priceValue}>
//               {totalPrice.toLocaleString()}원
//             </Text>
//           </View>
//         </View>

//         {/* ✅ 상품 추가 버튼 */}
//         <TouchableOpacity
//           style={styles.addButton}
//           onPress={() => router.push('/store')}
//         >
//           <Text style={styles.addText}>+ 상품 추가</Text>
//         </TouchableOpacity>

//         {/* ✅ 픽업 시간 */}
//         <Text style={styles.sectionTitle}>픽업 시간</Text>
//         <View style={styles.pickupRow}>
//           <View style={styles.pickupPill}>
//             <Text style={styles.pickupTime}>13:00 ~ 15:00</Text>
//           </View>
//         </View>

//         <TextInput
//           style={styles.input}
//           placeholder="픽업 가능한 시간 내에서 설정해주세요."
//           placeholderTextColor="#ccc"
//         />

//         {/* ✅ 요청사항 */}
//         <Text style={styles.sectionTitle}>요청사항</Text>
//         <Text style={styles.subLabel}>가게 사장님에게</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="요청사항을 입력해주세요."
//           placeholderTextColor="#aaa"
//           value={request}
//           onChangeText={setRequest}
//         />

//         {/* ✅ 일회용품 제외 */}
//         <View style={styles.checkboxRow}>
//           <Checkbox
//             value={noDisposable}
//             onValueChange={setNoDisposable}
//             color={noDisposable ? '#115C3C' : undefined}
//           />
//           <Text style={styles.checkboxLabel}>일회용 수저, 포크는 빼주세요</Text>
//         </View>

//         {/* ✅ 결제수단 */}
//         <Text style={styles.sectionTitle}>결제수단</Text>
//         <View style={styles.paymentRow}>
//           {['간편결제', '카드', '휴대폰'].map((label, i) => {
//             const keys: ('simple' | 'card' | 'phone')[] = [
//               'simple',
//               'card',
//               'phone',
//             ];
//             const active = paymentMethod === keys[i];
//             return (
//               <TouchableOpacity
//                 key={label}
//                 style={[styles.paymentButton, active && styles.paymentActive]}
//                 onPress={() => setPaymentMethod(keys[i])}
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

//         {/* ✅ 할인 */}
//         <Text style={styles.sectionTitle}>할인</Text>
//         <View style={styles.discountRow}>
//           <Text style={styles.label}>쿠폰</Text>
//           <Text style={styles.smallText}>2장 보유</Text>
//         </View>
//         <View style={styles.dropdown}>
//           <Text style={styles.placeholder}>사용 가능한 쿠폰이 없어요.</Text>
//         </View>

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

//         {/* ✅ 결제 금액 요약 */}
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
//           <Text>{savedPoints.toLocaleString()}원</Text>
//         </View>

//         <View style={{ height: 100 }} />
//       </ScrollView>

//       {/* ✅ 하단 결제 버튼 */}
//       <View style={styles.footer}>
//         <TouchableOpacity onPress={handleOrder}>
//           <Text style={styles.footerText}>
//             {finalPrice.toLocaleString()}원 결제하기
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

// /* ---------------- styles ---------------- */
// const styles = StyleSheet.create({
//   container: { paddingHorizontal: 20 },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginTop: 80,
//     marginBottom: 30,
//     position: 'relative',
//   },
//   backButton: { position: 'absolute', left: 0 },
//   backArrow: { fontSize: 38, color: '#115C3C', marginLeft: 10 },
//   headerTitle: { fontSize: 20, fontWeight: '700', color: '#000' },

//   storeRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 10,
//   },
//   storeLogo: {
//     width: 44,
//     height: 44,
//     borderRadius: 22,
//     marginRight: 10,
//     marginLeft: 20,
//   },
//   storeName: {
//     fontSize: 20,
//     fontWeight: '700',
//     color: '#000',
//   },

//   divider: {
//     height: 1,
//     backgroundColor: '#E5E5E5',
//     marginVertical: 16,
//   },

//   menuPriceBlock: { marginBottom: 12 },
//   menuRow: { flexDirection: 'row', justifyContent: 'flex-start' },
//   menuText: { fontSize: 15, color: '#333', fontWeight: '500' },
//   priceRow: {
//     flexDirection: 'row',
//     justifyContent: 'flex-end',
//     marginTop: 4,
//   },
//   priceLabel: { fontSize: 16, color: '#555', marginRight: 6 },
//   priceValue: { fontSize: 16, color: '#000', fontWeight: '700' },

//   addButton: {
//     borderWidth: 1,
//     borderColor: '#E5E5E5',
//     borderRadius: 10,
//     alignItems: 'center',
//     paddingVertical: 20,
//     marginTop: 14,
//   },
//   addText: { color: '#333', fontWeight: '700', fontSize: 20 },

//   sectionTitle: {
//     fontWeight: '700',
//     fontSize: 20,
//     marginTop: 25,
//     marginBottom: 8,
//     color: '#222',
//   },

//   /* ✅ 시간만 pill 안에 */
//   pickupRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   pickupPill: {
//     backgroundColor: '#DCE9E2',
//     borderRadius: 25,
//     paddingHorizontal: 18,
//     paddingVertical: 8,
//     alignSelf: 'flex-start',
//   },
//   pickupTime: {
//     color: '#2D5D38',
//     fontSize: 15,
//     fontWeight: '700',
//   },

//   subLabel: { color: '#444', marginBottom: 5 },
//   input: {
//     borderWidth: 1,
//     borderColor: '#E0E0E0',
//     borderRadius: 10,
//     padding: 12,
//     fontSize: 14,
//     marginBottom: 10,
//   },
//   checkboxRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginVertical: 15,
//   },
//   checkboxLabel: { marginLeft: 8, color: '#333', fontSize: 14 },
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
//   paymentActive: { backgroundColor: '#115C3C' },
//   paymentText: { color: '#333', fontWeight: '600' },
//   paymentTextActive: { color: '#fff' },
//   discountRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginTop: 12,
//   },
//   label: { fontWeight: '600', fontSize: 18 },
//   smallText: { color: '#666', fontSize: 13 },
//   dropdown: {
//     borderWidth: 1,
//     borderColor: '#E0E0E0',
//     borderRadius: 10,
//     padding: 12,
//     marginTop: 6,
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
//     fontSize: 15,
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
//   footerText: { color: '#fff', fontWeight: '700', fontSize: 20 },
// });

import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import Checkbox from 'expo-checkbox';
import { useCartStore } from '@/stores/cartStore';

export default function OrderScreen() {
  const router = useRouter();
  const { items, totalPrice, clearCart } = useCartStore();
  const [noDisposable, setNoDisposable] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState<
    'simple' | 'card' | 'phone'
  >('card');
  const [usePoints, setUsePoints] = useState(0);
  const [request, setRequest] = useState('');

  const discount = Math.floor(totalPrice * 0.22);
  const finalPrice = Math.max(totalPrice - discount - usePoints, 0);
  const savedPoints = Math.floor(finalPrice * 0.022);

  const handleOrder = () => {
    alert('주문이 완료되었습니다!');
    clearCart();
    router.replace('/store');
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* ✅ 상단 헤더 */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Text style={styles.backArrow}>‹</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>주문하기</Text>
        </View>

        {/* ✅ 가게 정보 */}
        <View style={styles.storeRow}>
          <Image
            source={{ uri: 'https://i.imgur.com/Vs5m1N0.png' }}
            style={styles.storeLogo}
          />
          <Text style={styles.storeName}>NOVA BURGER</Text>
        </View>

        {/* ✅ 구분선 */}
        <View style={styles.divider} />

        {/* ✅ 메뉴명 / 총 주문 금액 */}
        <View style={styles.menuPriceBlock}>
          <View style={styles.menuRow}>
            <Text style={styles.menuText}>
              {items[0]?.name || 'Chicken Burger Set'} {items.length || 1}건
            </Text>
          </View>

          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>총 주문 금액</Text>
            <Text style={styles.priceValue}>
              {totalPrice.toLocaleString() || '9,800'}원
            </Text>
          </View>
        </View>

        {/* ✅ 상품 추가 버튼 */}
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => router.push('/store')}
        >
          <Text style={styles.addText}>+ 상품 추가</Text>
        </TouchableOpacity>

        {/* ✅ 픽업 시간 */}
        <Text style={styles.sectionTitle}>픽업 시간</Text>
        <View style={styles.pickupRow}>
          <View style={styles.pickupPill}>
            <Text style={styles.pickupTime}>13:00 ~ 15:00</Text>
          </View>
        </View>
        <TextInput
          style={styles.input}
          placeholder="픽업 가능한 시간 내에서 설정해주세요."
          placeholderTextColor="#bbb"
        />

        {/* ✅ 요청사항 */}
        <Text style={styles.sectionTitle}>요청사항</Text>
        <Text style={styles.subLabel}>가게 사장님에게</Text>
        <TextInput
          style={styles.input}
          placeholder="요청사항을 입력해주세요."
          placeholderTextColor="#aaa"
          value={request}
          onChangeText={setRequest}
        />

        {/* ✅ 일회용품 제외 */}
        <View style={styles.checkboxRow}>
          <Checkbox
            value={noDisposable}
            onValueChange={setNoDisposable}
            color={noDisposable ? '#115C3C' : undefined}
          />
          <Text style={styles.checkboxLabel}>일회용 수저, 포크는 빼주세요</Text>
        </View>

        {/* ✅ 결제수단 */}
        <Text style={styles.sectionTitle}>결제수단</Text>
        <View style={styles.paymentRow}>
          {['간편결제', '카드', '휴대폰'].map((label, i) => {
            const keys: ('simple' | 'card' | 'phone')[] = [
              'simple',
              'card',
              'phone',
            ];
            const active = paymentMethod === keys[i];
            return (
              <TouchableOpacity
                key={label}
                style={[styles.paymentButton, active && styles.paymentActive]}
                onPress={() => setPaymentMethod(keys[i])}
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

        {/* ✅ 할인 */}
        <Text style={styles.sectionTitle}>할인</Text>
        <View style={styles.discountRow}>
          <Text style={styles.label}>쿠폰</Text>
          <Text style={styles.smallText}>2장 보유</Text>
        </View>
        <View style={styles.dropdown}>
          <Text style={styles.placeholder}>사용 가능한 쿠폰이 없어요.</Text>
        </View>

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

        {/* ✅ 결제 금액 요약 */}
        <Text style={styles.sectionTitle}>총 결제 금액</Text>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>총 주문금액</Text>
          <Text style={styles.summaryValue}>
            {totalPrice.toLocaleString() || '12,500'}원
          </Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>
            마감할인 <Text style={styles.discountBadge}>22%</Text>
          </Text>
          <Text style={styles.summaryDiscount}>
            -{discount.toLocaleString() || '2,700'}원
          </Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>포인트</Text>
          <Text style={styles.summaryDiscount}>
            -{usePoints.toLocaleString() || '200'}원
          </Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>예상 적립 포인트</Text>
          <Text style={styles.summaryValue}>
            {savedPoints.toLocaleString()}원
          </Text>
        </View>

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* ✅ 하단 결제 버튼 */}
      <View style={styles.footer}>
        <TouchableOpacity onPress={handleOrder}>
          <Text style={styles.footerText}>
            {finalPrice.toLocaleString() || '9,600'}원 결제하기
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

/* ---------------- styles ---------------- */
const styles = StyleSheet.create({
  container: { paddingHorizontal: 20 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 70,
    marginBottom: 25,
    position: 'relative',
  },
  backButton: { position: 'absolute', left: 0 },
  backArrow: { fontSize: 36, color: '#115C3C', marginLeft: 10 },
  headerTitle: { fontSize: 22, fontWeight: '700', color: '#000' },

  storeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    paddingHorizontal: 10,
  },
  storeLogo: {
    width: 46,
    height: 46,
    borderRadius: 23,
    marginRight: 10,
  },
  storeName: { fontSize: 19, fontWeight: '700', color: '#000' },

  divider: { height: 1, backgroundColor: '#E5E5E5', marginVertical: 18 },

  menuPriceBlock: { marginBottom: 14 },
  menuRow: { flexDirection: 'row', justifyContent: 'flex-start' },
  menuText: { fontSize: 16, color: '#333', fontWeight: '500' },
  priceRow: { flexDirection: 'row', justifyContent: 'flex-end', marginTop: 6 },
  priceLabel: { fontSize: 16, color: '#666', marginRight: 6 },
  priceValue: { fontSize: 16, color: '#000', fontWeight: '700' },

  addButton: {
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 12,
    alignItems: 'center',
    paddingVertical: 14,
    marginTop: 14,
  },
  addText: { color: '#333', fontWeight: '700', fontSize: 16 },

  sectionTitle: {
    fontWeight: '700',
    fontSize: 20,
    marginTop: 28,
    marginBottom: 10,
    color: '#222',
  },

  pickupRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  pickupPill: {
    backgroundColor: '#DCE9E2',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 7,
    alignSelf: 'flex-start',
  },
  pickupTime: { color: '#2D5D38', fontSize: 15, fontWeight: '700' },

  subLabel: { color: '#444', marginBottom: 6, fontSize: 16 },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    padding: 14,
    fontSize: 15,
    marginBottom: 12,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 18,
  },
  checkboxLabel: { marginLeft: 8, color: '#333', fontSize: 17 },
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 22,
  },
  paymentButton: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    borderRadius: 10,
    paddingVertical: 13,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  paymentActive: { backgroundColor: '#115C3C' },
  paymentText: { color: '#333', fontWeight: '600', fontSize: 15 },
  paymentTextActive: { color: '#fff' },
  discountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  label: { fontWeight: '600', fontSize: 16 },
  smallText: { color: '#666', fontSize: 14 },
  dropdown: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    padding: 13,
    marginTop: 6,
  },
  placeholder: { color: '#999', fontSize: 15 },
  pointRow: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
  useAllButton: {
    backgroundColor: '#F2F2F2',
    paddingVertical: 13,
    paddingHorizontal: 22,
    borderRadius: 10,
    marginLeft: 10,
  },
  useAllText: { fontWeight: '600', color: '#333', fontSize: 15 },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  summaryLabel: { fontSize: 15, color: '#333' },
  summaryValue: { fontSize: 15, fontWeight: '600', color: '#000' },
  summaryDiscount: { fontSize: 15, color: '#115C3C', fontWeight: '600' },
  discountBadge: {
    color: '#115C3C',
    fontWeight: '700',
    backgroundColor: '#E0F0E8',
    paddingHorizontal: 6,
    borderRadius: 5,
    fontSize: 14,
  },
  footer: {
    backgroundColor: '#115C3C',
    alignItems: 'center',
    justifyContent: 'center',
    height: 65,
  },
  footerText: { color: '#fff', fontWeight: '700', fontSize: 18 },
});
