// import React from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   Image,
//   TextInput,
//   TouchableOpacity,
// } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';

// const orders = [
//   {
//     date: '2025.04.10 (\uBAA9)',
//     store: '브런치랩',
//     menu: '아보카도 샌드위치 1개\n리코타 치즈 샐러드 1개',
//     price: '9,500원',
//     point: 220,
//     image: require('../../assets/food/brunch.jpg'),
//     status: '지금 픽업하기 (13:00)',
//     showReview: false,
//   },
//   {
//     date: '2025.04.05 (\uD1A0)',
//     store: '세븐일레븐',
//     menu: '참치마요 삼각김밥 2개\n11찬 도시락 1개 외 1건',
//     price: '5,800원',
//     point: 120,
//     image: require('../../assets/seven.jpeg'),
//     status: '픽업 완료',
//     showReview: true,
//   },
//   {
//     date: '2025.04.01 (\uD654)',
//     store: '피자포레스트',
//     menu: '콤비네이션 피자 1판',
//     price: '12,000원',
//     point: 300,
//     image: require('../../assets/food/pizza.jpg'),
//     status: '픽업 완료',
//     showReview: false,
//   },
// ];

// const OrderListScreen = () => {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>주문내역</Text>

//       <View style={styles.searchRow}>
//         <View style={styles.searchBar}>
//           <Ionicons
//             name="search"
//             size={18}
//             color="#aaa"
//             style={{ marginRight: 8 }}
//           />
//           <TextInput
//             placeholder="주문했던 메뉴와 가게를 검색해보세요"
//             placeholderTextColor="#aaa"
//             style={styles.searchInput}
//           />
//         </View>
//         <TouchableOpacity
//           style={styles.filterButton}
//           onPress={() => console.log('필터 열기')}
//         >
//           <Ionicons name="options-outline" size={22} color="#297A5D" />
//         </TouchableOpacity>
//       </View>

//       <View style={styles.banner}>
//         <Text style={styles.bannerText}>
//           <Text style={{ fontWeight: 'bold', color: '#297A5D' }}>환경</Text>을
//           지키는 현명한 소비, 이번달{' '}
//           <Text style={{ fontWeight: 'bold', color: '#297A5D' }}>15,000원</Text>{' '}
//           절약했어요
//         </Text>
//         <Ionicons name="checkmark-circle" size={24} color="#6CBE77" />
//       </View>

//       <ScrollView contentContainerStyle={{ paddingBottom: 140 }}>
//         {orders.map((order, index) => (
//           <View key={index} style={styles.cardWrapper}>
//             <Text style={styles.date}>{order.date}</Text>
//             <View style={styles.card}>
//               <View style={styles.cardTop}>
//                 <View style={styles.imageWrapper}>
//                   <Image source={order.image} style={styles.thumbnail} />
//                 </View>
//                 <View style={{ flex: 1 }}>
//                   <View style={styles.cardHeader}>
//                     <TouchableOpacity
//                       style={styles.storeButton}
//                       onPress={() => console.log(`${order.store} 클릭됨`)}
//                     >
//                       <Text style={styles.store}>{order.store}</Text>
//                       <Ionicons name="chevron-forward" size={18} color="#666" />
//                     </TouchableOpacity>
//                     <TouchableOpacity style={styles.detailsBox}>
//                       <Text style={styles.detailsText}>주문상세</Text>
//                     </TouchableOpacity>
//                   </View>
//                   <Text style={styles.menu}>{order.menu}</Text>
//                   <Text style={styles.price}>{order.price}</Text>
//                   <View style={styles.pointBadge}>
//                     <Text style={styles.point}>+ {order.point} 적립 ✨</Text>
//                   </View>
//                 </View>
//               </View>

//               <View style={styles.actionsContainer}>
//                 {order.status === '픽업 완료' ? (
//                   <View style={styles.buttonRow}>
//                     <View style={styles.actionBoxGray}>
//                       <Text style={styles.actionTextGray}>픽업 완료</Text>
//                     </View>
//                     {order.showReview && (
//                       <TouchableOpacity style={styles.actionBoxWhite}>
//                         <Text style={styles.actionTextGreen}>리뷰 작성</Text>
//                       </TouchableOpacity>
//                     )}
//                   </View>
//                 ) : (
//                   <TouchableOpacity style={styles.actionBoxGreenFull}>
//                     <Text style={styles.actionTextWhite}>{order.status}</Text>
//                   </TouchableOpacity>
//                 )}
//               </View>
//             </View>
//           </View>
//         ))}
//       </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     paddingTop: 60,
//     paddingHorizontal: 20,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 16,
//     color: '#222',
//     textAlign: 'center',
//   },
//   searchRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 10,
//     marginBottom: 16,
//   },
//   searchBar: {
//     flex: 1,
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#F4F4F4',
//     borderRadius: 12,
//     paddingHorizontal: 12,
//     paddingVertical: 10,
//   },
//   searchInput: {
//     flex: 1,
//     fontSize: 14,
//     color: '#333',
//   },
//   filterButton: {
//     padding: 10,
//     backgroundColor: '#F4F4F4',
//     borderRadius: 12,
//   },
//   banner: {
//     backgroundColor: '#FFF9DB',
//     borderRadius: 12,
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 14,
//     marginBottom: 20,
//   },
//   bannerText: {
//     flex: 1,
//     fontSize: 13,
//     color: '#444',
//     lineHeight: 18,
//     marginRight: 10,
//   },
//   cardWrapper: {
//     marginBottom: 20,
//   },
//   date: {
//     fontSize: 13,
//     color: '#999',
//     marginBottom: 8,
//   },
//   card: {
//     backgroundColor: '#FAFAFA',
//     borderRadius: 16,
//     padding: 14,
//   },
//   cardTop: {
//     flexDirection: 'row',
//     marginBottom: 12,
//   },
//   imageWrapper: {
//     width: 120,
//     height: 120,
//     borderRadius: 12,
//     backgroundColor: '#fff',
//     marginRight: 14,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.2,
//     shadowRadius: 6,
//     elevation: 6,
//   },
//   thumbnail: {
//     width: '100%',
//     height: '100%',
//     borderRadius: 12,
//   },
//   cardHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 6,
//   },
//   storeButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   store: {
//     fontWeight: 'bold',
//     fontSize: 15,
//     color: '#111',
//     marginRight: 4,
//   },
//   detailsBox: {
//     backgroundColor: '#F4F4F4',
//     borderRadius: 20,
//     paddingVertical: 4,
//     paddingHorizontal: 10,
//   },
//   detailsText: {
//     fontSize: 12,
//     color: '#888',
//   },
//   menu: {
//     fontSize: 13,
//     color: '#333',
//     marginBottom: 2,
//     lineHeight: 18,
//   },
//   price: {
//     fontSize: 14,
//     color: '#222',
//     marginBottom: 8,
//   },
//   pointBadge: {
//     backgroundColor: '#E7F5EC',
//     paddingVertical: 4,
//     paddingHorizontal: 10,
//     alignSelf: 'flex-start',
//     borderRadius: 20,
//   },
//   point: {
//     fontSize: 13,
//     color: '#297A5D',
//   },
//   actionsContainer: {
//     marginTop: 10,
//     alignItems: 'center',
//   },
//   buttonRow: {
//     flexDirection: 'row',
//     gap: 10,
//   },
//   actionBoxGreenFull: {
//     backgroundColor: '#297A5D',
//     borderRadius: 10,
//     paddingVertical: 14,
//     paddingHorizontal: 24,
//     alignItems: 'center',
//     width: '100%',
//   },
//   actionBoxWhite: {
//     flex: 1,
//     borderColor: '#297A5D',
//     borderWidth: 1,
//     borderRadius: 10,
//     paddingVertical: 14,
//     alignItems: 'center',
//   },
//   actionBoxGray: {
//     flex: 1,
//     backgroundColor: '#F4F4F4',
//     borderRadius: 10,
//     paddingVertical: 14,
//     alignItems: 'center',
//   },
//   actionTextWhite: {
//     fontSize: 14,
//     color: '#fff',
//     fontWeight: 'bold',
//   },
//   actionTextGreen: {
//     fontSize: 14,
//     color: '#297A5D',
//     fontWeight: 'bold',
//   },
//   actionTextGray: {
//     fontSize: 14,
//     color: '#444',
//     fontWeight: 'bold',
//   },
// });

// export default OrderListScreen;

import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Animated,
  Easing,
  Dimensions,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

const GREEN = '#2d5d38';
const GRAY_BG = '#F2F2F2';
const SCREEN_H = Dimensions.get('window').height;

/** 기본(축소) 시트 높이 — 네가 줄여둔 사이즈 유지 */
const BASE_SHEET_H = Math.min(470, SCREEN_H * 0.35);
/** ‘직접선택 + iOS 피커 열림’일 때만 확장 */
const EXPANDED_SHEET_H = Math.min(620, SCREEN_H * 0.65);
/** 닫힐 때 translateY로 내릴 거리 (최대 높이 기준) */
const CLOSED_TRANSLATE_Y = Math.max(BASE_SHEET_H, EXPANDED_SHEET_H) + 40;

const LOCALE = 'ko-KR';

/* ================= Types ================= */
type QuickKey = 'custom' | '1m' | '3m' | '6m' | '1y';

interface Order {
  date: string; // 'YYYY.MM.DD (요일)'
  store: string;
  items: string[]; // 전체 품목 리스트
  price: string;
  point: number;
  image: any;
  status: string;
  showReview: boolean;
}

/* ================ Data ================ */
/** 상세에서 보일 전체 품목을 items로 정의 (카드에는 2개만 노출) */
const ORDERS: Order[] = [
  {
    date: '2025.04.10 (\uBAA9)',
    store: '브런치랩',
    items: ['아보카도 샌드위치 1개', '리코타 치즈 샐러드 1개', '콜드브루 1잔'], // 임시 1개 더
    price: '9,500원',
    point: 220,
    image: require('../../assets/order1.png'),
    status: '지금 픽업하기 (13:00)',
    showReview: false,
  },
  {
    date: '2025.04.05 (\uD1A0)',
    store: '세븐일레븐',
    items: ['참치마요 삼각김밥 2개', '11찬 도시락 1개', '바나나 우유 1개'], // 실제 3번째 항목
    price: '5,800원',
    point: 120,
    image: require('../../assets/order2.png'),
    status: '픽업 완료',
    showReview: true,
  },
  {
    date: '2025.04.01 (\uD654)',
    store: '피자포레스트',
    items: ['콤비네이션 피자 1판'],
    price: '12,000원',
    point: 300,
    image: require('../../assets/order3.png'),
    status: '픽업 완료',
    showReview: false,
  },
];

/* ============== Date utils ============== */
const pad2 = (n: number) => (n < 10 ? `0${n}` : `${n}`);
const fmt = (d: Date) =>
  `${d.getFullYear()}.${pad2(d.getMonth() + 1)}.${pad2(d.getDate())}`;
const addMonths = (d: Date, m: number) => {
  const nd = new Date(d.getTime());
  nd.setMonth(nd.getMonth() + m);
  return nd;
};
// '2025.04.10 (목)' → Date(2025-04-10)
const parseOrderDate = (s: string): Date => {
  const y = Number(s.slice(0, 4));
  const mo = Number(s.slice(5, 7)) - 1;
  const d = Number(s.slice(8, 10));
  return new Date(y, mo, d);
};
const ymd = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
const inRange = (d: Date, s: Date, e: Date) => {
  const dt = ymd(d).getTime();
  const st = ymd(s).getTime();
  const et = new Date(
    e.getFullYear(),
    e.getMonth(),
    e.getDate(),
    23,
    59,
    59,
    999
  ).getTime();
  return dt >= st && dt <= et;
};

/* 기타 유틸(임시 주문번호/시간) */
const nowTimeStr = () => {
  const d = new Date();
  return `${pad2(d.getHours())}:${pad2(d.getMinutes())}`;
};
const genOrderNo = (o: Order) => {
  const base = (o.store + o.date)
    .split('')
    .reduce((h, c) => (h << 5) - h + c.charCodeAt(0), 0);
  const n = (Math.abs(base) % 900000) + 100000;
  return `SV${n}`;
};

/* 프리셋 월 오프셋 */
const MONTH_OFFSETS: Record<Exclude<QuickKey, 'custom'>, number> = {
  '1m': -1,
  '3m': -3,
  '6m': -6,
  '1y': -12,
};

/* ======= 센터 오버레이(커스텀 모달) ======= */
function useCenterOverlay() {
  const open = useRef(new Animated.Value(0)).current;
  const [visible, setVisible] = useState(false);

  const show = () => {
    setVisible(true);
    Animated.timing(open, {
      toValue: 1,
      duration: 180,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  };
  const hide = (onHidden?: () => void) => {
    Animated.timing(open, {
      toValue: 0,
      duration: 160,
      easing: Easing.in(Easing.cubic),
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished) {
        setVisible(false);
        onHidden?.();
      }
    });
  };

  const backdropOpacity = open.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.35],
  });
  const scale = open.interpolate({
    inputRange: [0, 1],
    outputRange: [0.95, 1],
  });
  const cardOpacity = open.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return { visible, show, hide, backdropOpacity, scale, cardOpacity };
}

/* ============== Component ============== */
export default function OrderListScreen() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [quick, setQuick] = useState<QuickKey>('custom');
  const [start, setStart] = useState<Date>(addMonths(new Date(), -1));
  const [end, setEnd] = useState<Date>(new Date());
  const [showPickerFor, setShowPickerFor] = useState<null | 'start' | 'end'>(
    null
  );

  /* 조회 모드 + 기간 필터 결과 */
  const [hasSearched, setHasSearched] = useState(false);
  const [dateFiltered, setDateFiltered] = useState<Order[]>([]);

  /* 텍스트 검색어 */
  const [query, setQuery] = useState('');

  /* ===== 상세/영수증 상태 ===== */
  const [detailOrder, setDetailOrder] = useState<Order | null>(null);
  const [detailStep, setDetailStep] = useState<null | 'DETAIL' | 'RECEIPT'>(
    null
  );

  /* 오버레이 훅 */
  const overlay = useCenterOverlay();

  const openDetail = (order: Order) => {
    setDetailOrder(order);
    setDetailStep('DETAIL');
    overlay.show();
  };
  const closeOverlay = () => {
    overlay.hide(() => {
      setDetailStep(null);
      setDetailOrder(null);
    });
  };

  /* ===== bottom sheet animations ===== */
  const slideAnim = useRef(new Animated.Value(0)).current;
  const [sheetHeight, setSheetHeight] = useState<number>(BASE_SHEET_H);

  const translateY = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [CLOSED_TRANSLATE_Y, 0],
  });
  const overlayOpacity = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.35],
  });

  const openSheet = () => {
    setIsFilterOpen(true);
    Animated.timing(slideAnim, {
      toValue: 1,
      duration: 260,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  };
  const closeSheet = () => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 220,
      easing: Easing.in(Easing.cubic),
      useNativeDriver: true,
    }).start(({ finished }) => finished && setIsFilterOpen(false));
  };

  // iOS에서 ‘직접선택’ + 피커 열릴 때만 확장
  useEffect(() => {
    if (Platform.OS === 'ios' && quick === 'custom' && showPickerFor) {
      setSheetHeight(EXPANDED_SHEET_H);
    } else {
      setSheetHeight(BASE_SHEET_H);
    }
  }, [quick, showPickerFor]);

  /* ===== 프리셋 ===== */
  const onQuick = (key: QuickKey) => {
    setQuick(key);
    const today = new Date();
    if (key !== 'custom') {
      setShowPickerFor(null);
      const s = addMonths(today, MONTH_OFFSETS[key]);
      setStart(s);
      setEnd(today);
    }
  };

  /* ===== 기간 필터 ===== */
  const applyDateFilter = (s: Date, e: Date): Order[] =>
    ORDERS.filter((o) => inRange(parseOrderDate(o.date), s, e));

  const onSearch = () => {
    setDateFiltered(applyDateFilter(start, end));
    setHasSearched(true);
    closeSheet();
  };

  /* 초기화 → 원래 화면(배너+전체목록) */
  const onReset = () => {
    setHasSearched(false);
    setDateFiltered([]);
    setQuery('');
  };

  /* 텍스트 필터(2글자 이상) */
  const norm = (s: string) => s.toLowerCase();
  const meetsQuery = (o: Order, q: string) =>
    norm(o.store).includes(norm(q)) ||
    o.items.some((it) => norm(it).includes(norm(q)));

  const baseList: Order[] = hasSearched ? dateFiltered : ORDERS;
  const finalList: Order[] = useMemo(() => {
    const q = query.trim();
    if (q.length >= 2) return baseList.filter((o) => meetsQuery(o, q));
    return baseList;
  }, [baseList, query]);

  const noDateResults = hasSearched && dateFiltered.length === 0;
  const noTextResults =
    !noDateResults && query.trim().length >= 2 && finalList.length === 0;

  /* ===== 작은 UI 컴포넌트 ===== */
  const DateBox = ({
    value,
    onPress,
    disabled,
  }: {
    value: Date;
    onPress: () => void;
    disabled?: boolean;
  }) => (
    <TouchableOpacity
      activeOpacity={disabled ? 1 : 0.85}
      style={styles.dateBox}
      onPress={disabled ? undefined : onPress}
    >
      <Text style={styles.dateText}>{fmt(value)}</Text>
    </TouchableOpacity>
  );

  const handlePick = (field: 'start' | 'end') => (_: any, selected?: Date) => {
    if (Platform.OS === 'android') setShowPickerFor(null);
    if (!selected) return;
    setQuick('custom');
    if (field === 'start') {
      if (selected > end) setEnd(selected);
      setStart(selected);
    } else {
      if (selected < start) setStart(selected);
      setEnd(selected);
    }
  };

  const RangeBar = () => (
    <View style={styles.rangeBar}>
      <Text style={styles.rangeText}>
        조회기간 : {fmt(start)} — {fmt(end)}
      </Text>
      <TouchableOpacity
        onPress={onReset}
        style={styles.resetBtn}
        activeOpacity={0.8}
      >
        <Ionicons name="refresh" size={16} color={GREEN} />
        <Text style={styles.resetText}>초기화</Text>
      </TouchableOpacity>
    </View>
  );

  /* ===== 화면 ===== */
  return (
    <View style={styles.container}>
      <Text style={styles.title}>주문내역</Text>

      {/* 검색 + 필터 */}
      <View style={styles.searchRow}>
        <View style={styles.searchBar}>
          <Ionicons
            name="search"
            size={18}
            color="#aaa"
            style={{ marginRight: 8 }}
          />
          <TextInput
            placeholder="주문했던 메뉴/가게명으로 검색하세요."
            placeholderTextColor="#aaa"
            style={styles.searchInput}
            value={query}
            onChangeText={setQuery}
            returnKeyType="search"
          />
        </View>
        <TouchableOpacity style={styles.filterButton} onPress={openSheet}>
          <Ionicons name="options-outline" size={22} color={GREEN} />
        </TouchableOpacity>
      </View>

      {/* 조회모드면 배너 숨김 + 기간바 표시 */}
      {hasSearched && <RangeBar />}

      {/* 조회 전이며 검색창도 비어있을 때만 배너 표시 */}
      {!hasSearched && query.trim() === '' && (
        <Image
          source={require('../../assets/orderbanner.png')}
          style={styles.bannerImage}
          resizeMode="cover"
        />
      )}

      <ScrollView contentContainerStyle={{ paddingBottom: 140 }}>
        {noDateResults && (
          <View style={styles.emptyWrap}>
            <Ionicons name="file-tray-outline" size={28} color="#9aa0a6" />
            <Text style={styles.emptyText}>
              해당 기간에 조회된 주문 내역이 없습니다.
            </Text>
            <Text style={styles.emptySub}>
              기간을 변경하거나 초기화 후 다시 조회해 보세요.
            </Text>
          </View>
        )}
        {noTextResults && (
          <View style={styles.emptyWrap}>
            <Ionicons name="search" size={28} color="#9aa0a6" />
            <Text style={styles.emptyText}>
              검색어와 일치하는 결과가 없습니다.
            </Text>
            <Text style={styles.emptySub}>다른 키워드로 검색해 보세요.</Text>
          </View>
        )}

        {!noDateResults &&
          !noTextResults &&
          finalList.map((order, index) => {
            const previewItems = order.items.slice(0, 2).join('\n'); // 카드엔 2개만
            return (
              <View key={index} style={styles.cardWrapper}>
                <Text style={styles.date}>{order.date}</Text>
                <View style={styles.card}>
                  <View style={styles.cardTop}>
                    <View style={styles.imageWrapper}>
                      <Image source={order.image} style={styles.thumbnail} />
                    </View>
                    <View style={{ flex: 1 }}>
                      <View style={styles.cardHeader}>
                        <TouchableOpacity
                          style={styles.storeButton}
                          onPress={() => console.log(`${order.store} 클릭됨`)}
                        >
                          <Text style={styles.store}>{order.store}</Text>
                          <Ionicons
                            name="chevron-forward"
                            size={18}
                            color="#666"
                          />
                        </TouchableOpacity>

                        {/* 주문상세 버튼 */}
                        <TouchableOpacity
                          style={styles.detailsBox}
                          onPress={() => openDetail(order)}
                        >
                          <Text style={styles.detailsText}>주문상세</Text>
                        </TouchableOpacity>
                      </View>

                      <Text style={styles.menu}>{previewItems}</Text>
                      <Text style={styles.price}>{order.price}</Text>
                      <View style={styles.pointBadge}>
                        <Text style={styles.point}>
                          + {order.point} 적립 ✨
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.actionsContainer}>
                    {order.status === '픽업 완료' ? (
                      <View style={styles.buttonRow}>
                        <View style={styles.actionBoxGray}>
                          <Text style={styles.actionTextGray}>픽업 완료</Text>
                        </View>
                        {order.showReview && (
                          <TouchableOpacity style={styles.actionBoxWhite}>
                            <Text style={styles.actionTextGreen}>
                              리뷰 작성
                            </Text>
                          </TouchableOpacity>
                        )}
                      </View>
                    ) : (
                      <TouchableOpacity style={styles.actionBoxGreenFull}>
                        <Text style={styles.actionTextWhite}>
                          {order.status}
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              </View>
            );
          })}
      </ScrollView>

      {/* ===== 커스텀 오버레이 (상세/영수증 공용) ===== */}
      {overlay.visible && (
        <View style={styles.centerOverlay} pointerEvents="box-none">
          {/* 배경 */}
          <TouchableWithoutFeedback onPress={closeOverlay}>
            <Animated.View
              style={[
                styles.centerBackdrop,
                { opacity: overlay.backdropOpacity },
              ]}
            />
          </TouchableWithoutFeedback>

          {/* 가운데 카드 */}
          <Animated.View
            style={[
              styles.centerWrap,
              {
                transform: [{ scale: overlay.scale }],
                opacity: overlay.cardOpacity,
              },
            ]}
            pointerEvents="box-none"
          >
            {/* 카드 안쪽을 터치해도 닫히지 않도록 터치 흡수 */}
            <TouchableWithoutFeedback>
              <View
                style={
                  detailStep === 'RECEIPT'
                    ? styles.receiptCard
                    : styles.modalCard
                }
              >
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>
                    {detailStep === 'RECEIPT' ? '영수증' : '주문상세'}
                  </Text>
                  <TouchableOpacity
                    onPress={closeOverlay}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                  >
                    <Ionicons name="close" size={22} color="#666" />
                  </TouchableOpacity>
                </View>

                <View
                  style={
                    detailStep === 'RECEIPT'
                      ? styles.receiptDivider
                      : styles.modalDivider
                  }
                />

                {detailOrder && detailStep === 'DETAIL' && (
                  <>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginBottom: 12,
                      }}
                    >
                      <Image
                        source={detailOrder.image}
                        style={styles.modalThumb}
                      />
                      <View style={{ flex: 1, marginLeft: 12 }}>
                        <Text style={styles.modalStore}>
                          {detailOrder.store}
                        </Text>
                        <Text style={styles.modalDate}>{detailOrder.date}</Text>
                      </View>
                    </View>

                    {/* 전체 품목 */}
                    <Text style={styles.sectionTitle}>주문상품</Text>
                    <View style={{ marginBottom: 10 }}>
                      {detailOrder.items.map((it, idx) => (
                        <View key={idx} style={styles.itemRow}>
                          <View style={styles.itemDot} />
                          <Text style={styles.itemText}>{it}</Text>
                        </View>
                      ))}
                    </View>

                    <View style={styles.modalRow}>
                      <Text style={styles.modalLabel}>결제금액</Text>
                      <Text style={styles.modalValue}>{detailOrder.price}</Text>
                    </View>
                    <View style={styles.modalRow}>
                      <Text style={styles.modalLabel}>적립포인트</Text>
                      <Text style={styles.modalValue}>
                        + {detailOrder.point} P
                      </Text>
                    </View>
                    <View style={styles.modalRow}>
                      <Text style={styles.modalLabel}>주문상태</Text>
                      <Text
                        style={[
                          styles.modalValue,
                          { color: GREEN, fontWeight: '700' },
                        ]}
                      >
                        {detailOrder.status}
                      </Text>
                    </View>

                    <View style={styles.modalBtnRow}>
                      <TouchableOpacity
                        style={styles.modalBtnGhost}
                        onPress={closeOverlay}
                      >
                        <Text style={styles.modalBtnGhostText}>닫기</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.modalBtnPrimary}
                        onPress={() => setDetailStep('RECEIPT')}
                      >
                        <Text style={styles.modalBtnPrimaryText}>
                          영수증 보기
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </>
                )}

                {detailOrder && detailStep === 'RECEIPT' && (
                  <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{ maxHeight: 420 }}
                  >
                    <Text style={styles.receiptStore}>{detailOrder.store}</Text>
                    <Text style={styles.receiptMeta}>
                      주문일시 {detailOrder.date} {nowTimeStr()}
                    </Text>
                    <Text style={styles.receiptMeta}>
                      주문번호 {genOrderNo(detailOrder)}
                    </Text>
                    <Text style={styles.receiptMeta}>
                      결제수단 카드(VISA) ****-****-****-1234
                    </Text>
                    <Text style={[styles.receiptMeta, { marginBottom: 6 }]}>
                      가맹점 (임시) 서울시 어딘가 1-2
                    </Text>

                    {/* 품목 */}
                    <View style={styles.receiptSection}>
                      {detailOrder.items.map((it, idx) => (
                        <View key={idx} style={styles.receiptItemRow}>
                          <Text style={styles.receiptItem}>{it}</Text>
                        </View>
                      ))}
                    </View>

                    <View style={styles.receiptDivider} />

                    {/* 합계 */}
                    <View style={styles.receiptTotalRow}>
                      <Text style={styles.receiptTotalLabel}>결제금액</Text>
                      <Text style={styles.receiptTotalValue}>
                        {detailOrder.price}
                      </Text>
                    </View>
                    <Text style={styles.receiptFoot}>
                      부가세/면세, 할인, 포인트 사용 등은 정식 영수증 화면에서
                      상세 표기 예정입니다.
                    </Text>

                    <View style={[styles.modalBtnRow, { marginTop: 14 }]}>
                      <TouchableOpacity
                        style={styles.modalBtnGhost}
                        onPress={() => setDetailStep('DETAIL')}
                      >
                        <Text style={styles.modalBtnGhostText}>뒤로</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.modalBtnPrimary}
                        onPress={closeOverlay}
                      >
                        <Text style={styles.modalBtnPrimaryText}>확인</Text>
                      </TouchableOpacity>
                    </View>
                  </ScrollView>
                )}
              </View>
            </TouchableWithoutFeedback>
          </Animated.View>
        </View>
      )}

      {/* ===== Bottom Sheet Filter ===== */}
      {isFilterOpen && (
        <>
          <TouchableWithoutFeedback onPress={closeSheet}>
            <Animated.View
              style={[styles.overlay, { opacity: overlayOpacity }]}
            />
          </TouchableWithoutFeedback>

          <Animated.View
            style={[
              styles.sheet,
              { transform: [{ translateY }], height: sheetHeight }, // ← height는 state로
            ]}
          >
            <View style={styles.handleWrap}>
              <View style={styles.handle} />
            </View>

            <View style={styles.sheetHeader}>
              <Text style={styles.sheetTitle}>조회 기간</Text>
              <TouchableOpacity
                style={styles.closeBtn}
                onPress={closeSheet}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Ionicons name="close" size={22} color="#666" />
              </TouchableOpacity>
            </View>

            <View style={styles.headerDivider} />

            {/* 빠른 선택 */}
            <View style={styles.quickRow}>
              {[
                { key: 'custom', label: '직접선택' },
                { key: '1m', label: '1개월' },
                { key: '3m', label: '3개월' },
                { key: '6m', label: '6개월' },
                { key: '1y', label: '1년' },
              ].map((it) => {
                const selected = quick === (it.key as QuickKey);
                return (
                  <TouchableOpacity
                    key={it.key}
                    onPress={() => onQuick(it.key as QuickKey)}
                    style={[styles.quickChip, selected && styles.quickChipOn]}
                    activeOpacity={0.9}
                  >
                    <Text
                      style={[styles.quickText, selected && styles.quickTextOn]}
                    >
                      {it.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* 날짜 범위 박스 (프리셋일 땐 터치 막음) */}
            <View style={styles.rangeBox}>
              <DateBox
                value={start}
                onPress={() => {
                  setQuick('custom');
                  setShowPickerFor('start');
                }}
                disabled={quick !== 'custom'}
              />
              <Text style={styles.rangeDash}>—</Text>
              <DateBox
                value={end}
                onPress={() => {
                  setQuick('custom');
                  setShowPickerFor('end');
                }}
                disabled={quick !== 'custom'}
              />
            </View>

            <TouchableOpacity
              style={styles.searchBtn}
              onPress={onSearch}
              activeOpacity={0.9}
            >
              <Text style={styles.searchBtnText}>검색하기</Text>
            </TouchableOpacity>

            {/* iOS: 직접선택일 때만 스피너 표시 (이때만 높이 확장됨) */}
            {quick === 'custom' && showPickerFor && Platform.OS === 'ios' && (
              <View style={styles.iosPickerWrap}>
                <DateTimePicker
                  value={showPickerFor === 'start' ? start : end}
                  mode="date"
                  display="spinner"
                  onChange={handlePick(showPickerFor)}
                  maximumDate={showPickerFor === 'start' ? end : undefined}
                  minimumDate={showPickerFor === 'end' ? start : undefined}
                  style={{ alignSelf: 'stretch' }}
                  locale={LOCALE}
                />
                <TouchableOpacity
                  style={styles.iosPickerDone}
                  onPress={() => setShowPickerFor(null)}
                >
                  <Text
                    style={{ color: GREEN, fontWeight: '700', fontSize: 15 }}
                  >
                    완료
                  </Text>
                </TouchableOpacity>
              </View>
            )}

            {/* Android: 시스템 달력 — 확장 불필요 */}
            {quick === 'custom' &&
              showPickerFor &&
              Platform.OS === 'android' && (
                <DateTimePicker
                  value={showPickerFor === 'start' ? start : end}
                  mode="date"
                  display="spinner"
                  onChange={handlePick(showPickerFor)}
                  maximumDate={showPickerFor === 'start' ? end : undefined}
                  minimumDate={showPickerFor === 'end' ? start : undefined}
                />
              )}
          </Animated.View>
        </>
      )}
    </View>
  );
}

/* =================== Styles =================== */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 16,
    marginTop: 12,
    color: '#222',
    textAlign: 'center',
  },

  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: GRAY_BG,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  searchInput: { flex: 1, fontSize: 14, color: '#333' },
  filterButton: { padding: 9, backgroundColor: '#F2f2f2', borderRadius: 10 },

  rangeBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F7F9F8',
    borderWidth: 1,
    borderColor: '#E2ECE7',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginBottom: 12,
  },
  rangeText: {
    fontSize: 13,
    color: '#264E3E',
    fontWeight: '500',
    marginLeft: 14,
  },
  resetBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D2E5DE',
    backgroundColor: '#EFF6F3',
  },
  resetText: { fontSize: 12, color: GREEN, fontWeight: '700' },

  bannerImage: { width: 355, height: 58, borderRadius: 12, marginBottom: 12 },

  cardWrapper: { marginBottom: 20 },
  date: { fontSize: 13, color: '#999', marginBottom: 8, marginLeft: 5 },
  card: { backgroundColor: '#f7f7f7', borderRadius: 10, padding: 14 },
  cardTop: { flexDirection: 'row', marginBottom: 12 },
  imageWrapper: {
    width: 120,
    height: 120,
    borderRadius: 10,
    backgroundColor: 'transparent',
    marginRight: 14,
    marginLeft: 4,
    marginTop: 5,
    marginBottom: -5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
  },
  thumbnail: { width: '100%', height: '100%', borderRadius: 12 },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  storeButton: { flexDirection: 'row', alignItems: 'center', marginTop: 12 },
  store: { fontWeight: 'bold', fontSize: 16, color: '#111', marginRight: 4 },
  detailsBox: {
    backgroundColor: '#eaeaea',
    borderRadius: 20,
    width: 52,
    height: 19,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailsText: { fontSize: 10, color: '#888' },
  menu: { fontSize: 13, color: '#333', marginBottom: 2, lineHeight: 18 },
  price: { fontSize: 14, color: '#222', marginBottom: 8 },
  pointBadge: {
    backgroundColor: '#c7d9d2',
    paddingVertical: 5,
    paddingHorizontal: 8,
    alignSelf: 'flex-start',
    borderRadius: 20,
  },
  point: { fontSize: 12, color: GREEN, fontWeight: '600' },
  actionsContainer: { marginTop: 10, alignItems: 'center' },
  buttonRow: { flexDirection: 'row', gap: 10 },
  actionBoxGreenFull: {
    backgroundColor: GREEN,
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 24,
    alignItems: 'center',
    width: '100%',
  },
  actionBoxWhite: {
    flex: 1,
    borderColor: GREEN,
    borderWidth: 1.2,
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
  },
  actionBoxGray: {
    flex: 1,
    backgroundColor: '#eaeaea',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
  },
  actionTextWhite: { fontSize: 14, color: '#fff', fontWeight: 'bold' },
  actionTextGreen: { fontSize: 14, color: GREEN, fontWeight: 'bold' },
  actionTextGray: { fontSize: 14, color: '#444', fontWeight: 'bold' },

  /* ===== Bottom Sheet ===== */
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: '#000' },
  sheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingHorizontal: 20,
    paddingBottom: Platform.select({ ios: 28, android: 20 }),
  },
  handleWrap: { alignItems: 'center', paddingTop: 10, paddingBottom: 6 },
  handle: { width: 42, height: 5, borderRadius: 3, backgroundColor: '#E5E5E5' },

  sheetHeader: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  sheetTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#222',
    textAlign: 'center',
  },
  closeBtn: { position: 'absolute', right: 0, top: 6, padding: 6 },
  headerDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#ECECEC',
    marginTop: 8,
    marginBottom: 14,
  },

  quickRow: { flexDirection: 'row', gap: 10, marginBottom: 16 },
  quickChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 18,
    backgroundColor: '#F1F1F1',
  },
  quickChipOn: {
    backgroundColor: '#E4EDE9',
    borderWidth: 1,
    borderColor: GREEN,
  },
  quickText: { fontSize: 13, color: '#666' },
  quickTextOn: { color: GREEN, fontWeight: '700' },

  rangeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E9E9E9',
    paddingHorizontal: 12,
    paddingVertical: 14,
    marginBottom: 25,
    marginTop: 10,
  },
  dateBox: {
    flex: 1,
    height: 28,
    borderRadius: 5,
    backgroundColor: 'transparent',
    borderWidth: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateText: { fontSize: 14, color: '#222' },
  rangeDash: { marginHorizontal: 10, color: '#777' },

  searchBtn: {
    backgroundColor: GREEN,
    height: 48,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },

  emptyWrap: { alignItems: 'center', paddingVertical: 180, gap: 8 },
  emptyText: { marginTop: 6, fontSize: 14, color: '#5f6368' },
  emptySub: { fontSize: 12, color: '#9aa0a6' },

  iosPickerWrap: {
    marginTop: 16,
    backgroundColor: '#FAFAFA',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#EEE',
    overflow: 'hidden',
  },
  iosPickerDone: {
    alignSelf: 'flex-end',
    paddingHorizontal: 18,
    paddingVertical: 12,
  },

  /* ===== 커스텀 오버레이 ===== */
  centerOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerBackdrop: { ...StyleSheet.absoluteFillObject, backgroundColor: '#000' },
  centerWrap: { width: '88%', maxWidth: 420, alignItems: 'center' },

  /* ===== 주문상세 카드 ===== */
  modalCard: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 18,
    elevation: 12,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  modalTitle: { fontSize: 16, fontWeight: '800', color: '#222' },
  modalDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#ECECEC',
    marginBottom: 12,
  },

  modalThumb: { width: 64, height: 64, borderRadius: 10 },
  modalStore: { fontSize: 15, fontWeight: '700', color: '#111' },
  modalDate: { fontSize: 12, color: '#888', marginTop: 2 },

  sectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#333',
    marginBottom: 6,
    marginTop: 4,
  },
  itemRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  itemDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#C9DCD5',
    marginRight: 8,
  },
  itemText: { fontSize: 13, color: '#222' },

  modalRow: { marginBottom: 10 },
  modalLabel: { fontSize: 12, color: '#666', marginBottom: 4 },
  modalValue: { fontSize: 14, color: '#222', lineHeight: 20 },

  modalBtnRow: { flexDirection: 'row', gap: 10, marginTop: 8 },
  modalBtnGhost: {
    flex: 1,
    height: 44,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F7F7F7',
  },
  modalBtnGhostText: { color: '#333', fontWeight: '700' },
  modalBtnPrimary: {
    flex: 1,
    height: 44,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: GREEN,
  },
  modalBtnPrimaryText: { color: '#fff', fontWeight: '800' },

  /* ===== 영수증 카드 ===== */
  receiptCard: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 18,
    elevation: 12,
  },
  receiptDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#E9E9E9',
    marginVertical: 10,
  },
  receiptStore: {
    fontSize: 15,
    fontWeight: '800',
    color: '#111',
    marginBottom: 10,
  },
  receiptMeta: { fontSize: 12, color: '#777', marginBottom: 2 },
  receiptSection: { marginTop: 8, marginBottom: 8 },
  receiptItemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  receiptItem: { fontSize: 13, color: '#222' },
  receiptTotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  receiptTotalLabel: { fontSize: 13, color: '#333', fontWeight: '700' },
  receiptTotalValue: { fontSize: 16, color: '#111', fontWeight: '800' },
  receiptFoot: {
    fontSize: 11,
    color: '#9aa0a6',
    marginTop: 10,
    lineHeight: 16,
    textAlign: 'left',
  },
});
