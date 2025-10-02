// import React, { useCallback, useMemo, useRef } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   TouchableOpacity,
//   Dimensions,
// } from 'react-native';
// import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
// import { Ionicons } from '@expo/vector-icons';
// import { SharedValue, withTiming } from 'react-native-reanimated';
// import MapFilter from './map_filter';
// import { Store } from '../app/(tabs)/map';

// const { height: SCREEN_HEIGHT } = Dimensions.get('window');
// const MAX_HEIGHT = SCREEN_HEIGHT * 0.5; // 바텀시트 최대 높이 (화면의 50%)

// interface Props {
//   stores: Store[];
//   sheetPosition: SharedValue<number>;
//   locationText: string;
//   filterMode: boolean;
//   setFilterMode: React.Dispatch<React.SetStateAction<boolean>>;
//   onlyDiscounted: boolean | null;
//   setOnlyDiscounted: (val: boolean | null) => void;
//   categories: string[];
//   setCategories: (val: string[]) => void;
//   distance: string;
//   setDistance: (val: string) => void;
//   onApplyFilter: () => void;
// }

// export default function MapBottomSheet({
//   stores,
//   sheetPosition,
//   locationText,
//   filterMode,
//   setFilterMode,
//   onlyDiscounted,
//   setOnlyDiscounted,
//   categories,
//   setCategories,
//   distance,
//   setDistance,
//   onApplyFilter,
// }: Props) {
//   const bottomSheetRef = useRef<BottomSheet>(null);

//   // snapPoints: 최소 120px, 최대 화면의 절반
//   const snapPoints = useMemo(() => [120, MAX_HEIGHT], []);

//   const handleSheetChanges = useCallback(
//     (index: number) => {
//       if (!sheetPosition) return;
//       sheetPosition.value = withTiming(index * 100);
//     },
//     [sheetPosition]
//   );

//   // 음식점 카드 렌더
//   const renderItem = ({ item }: { item: Store }) => {
//     const imageSource = item.image
//       ? { uri: item.image }
//       : require('../assets/default_food.png');
//     return (
//       <View style={styles.cardWrapper}>
//         <Image
//           source={imageSource}
//           style={styles.cardImage}
//           resizeMode="cover"
//         />
//         <View style={styles.cardContentVertical}>
//           <Text style={styles.storeName}>{item.name}</Text>
//           <Text style={styles.rating}>
//             ⭐ {item.rating.toFixed(1)} · {item.totalReviews ?? 0}명 리뷰 ·{' '}
//             {item.distance}m
//           </Text>
//           {item.address && <Text style={styles.address}>{item.address}</Text>}
//           {item.isDiscounted && (
//             <View style={styles.badge}>
//               <Text style={styles.badgeText}>마감 할인중</Text>
//             </View>
//           )}
//         </View>
//       </View>
//     );
//   };

//   return (
//     <BottomSheet
//       ref={bottomSheetRef}
//       index={1}
//       snapPoints={snapPoints}
//       enablePanDownToClose={false}
//       onChange={handleSheetChanges}
//       handleIndicatorStyle={styles.handleBar}
//       backgroundStyle={{ backgroundColor: '#fff' }}
//     >
//       {filterMode ? (
//         <MapFilter
//           onlyDiscounted={onlyDiscounted}
//           setOnlyDiscounted={setOnlyDiscounted}
//           categories={categories}
//           setCategories={setCategories}
//           distance={distance}
//           setDistance={setDistance}
//           onApply={() => {
//             onApplyFilter();
//             setFilterMode(false);
//           }}
//           onClose={() => setFilterMode(false)}
//         />
//       ) : (
//         <View style={{ flex: 1 }}>
//           {/* 헤더 (고정) */}
//           <View style={styles.headerContainer}>
//             <View style={styles.locationRow}>
//               <View style={styles.locationTextBlock}>
//                 <View style={styles.locationMainRow}>
//                   <Ionicons
//                     name="location-sharp"
//                     size={20}
//                     color="#115E4B"
//                     style={{ marginRight: 6 }}
//                   />
//                   <Text style={styles.locationMainText}>{locationText}</Text>
//                   <View style={styles.underline} />
//                 </View>
//                 <Text style={styles.locationSubText}>
//                   주변에서 마감 할인 상품을 찾아보세요 !
//                 </Text>
//               </View>
//               <TouchableOpacity
//                 style={styles.filterIconBox}
//                 onPress={() => setFilterMode(true)}
//               >
//                 <Ionicons name="options-outline" size={22} color="#115E4B" />
//               </TouchableOpacity>
//             </View>
//           </View>

//           {/* 음식점 리스트 (스크롤 가능) */}
//           <BottomSheetFlatList
//             data={stores}
//             renderItem={renderItem}
//             keyExtractor={(item) => item.id.toString()}
//             showsVerticalScrollIndicator={false}
//             contentContainerStyle={{
//               paddingHorizontal: 20,
//               paddingBottom: 40,
//             }}
//           />
//         </View>
//       )}
//     </BottomSheet>
//   );
// }

// const styles = StyleSheet.create({
//   handleBar: {
//     backgroundColor: '#ccc',
//     width: 40,
//     height: 4,
//     borderRadius: 2,
//     alignSelf: 'center',
//     marginVertical: 8,
//   },
//   headerContainer: {
//     paddingHorizontal: 20,
//     paddingTop: 12,
//     paddingBottom: 10,
//     borderBottomWidth: 1,
//     borderColor: '#eee',
//     backgroundColor: '#fff',
//     zIndex: 10,
//   },
//   locationRow: {
//     flexDirection: 'row',
//     alignItems: 'flex-start',
//     justifyContent: 'space-between',
//   },
//   locationTextBlock: { flex: 1 },
//   locationMainRow: { flexDirection: 'row', alignItems: 'center' },
//   locationMainText: { fontSize: 17, fontWeight: 'bold', color: '#333' },
//   underline: {
//     flex: 0.8,
//     height: 2,
//     backgroundColor: '#115E4B',
//     marginLeft: 6,
//     marginTop: 2,
//   },
//   locationSubText: {
//     marginTop: 4,
//     fontSize: 15,
//     color: '#aaa',
//     marginLeft: 26,
//   },
//   filterIconBox: {
//     backgroundColor: '#fff',
//     paddingHorizontal: 12,
//     height: 36,
//     minWidth: 52,
//     borderRadius: 18,
//     borderWidth: 1.3,
//     borderColor: '#ccc',
//     justifyContent: 'center',
//     alignItems: 'center',
//     flexDirection: 'row',
//   },
//   badge: {
//     marginTop: 6,
//     backgroundColor: '#115E4B',
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//     borderRadius: 12,
//     alignSelf: 'flex-start',
//   },
//   badgeText: { color: '#fff', fontSize: 12 },
//   cardWrapper: {
//     marginBottom: 16,
//     borderRadius: 16,
//     backgroundColor: '#F1F3F5',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 6 },
//     shadowOpacity: 0.2,
//     shadowRadius: 10,
//     elevation: 6,
//     overflow: 'hidden',
//   },
//   cardImage: { width: '100%', height: 160 },
//   cardContentVertical: { padding: 12 },
//   storeName: { fontWeight: 'bold', fontSize: 16, marginBottom: 4 },
//   rating: { fontSize: 13, color: '#666' },
//   address: { fontSize: 12, color: '#666', marginTop: 4 },
// });

// components/map_bottomsheet.tsx
import React, { useCallback, useMemo, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  type ListRenderItem,
} from 'react-native';
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { Ionicons } from '@expo/vector-icons';
import Animated, { SharedValue, withTiming } from 'react-native-reanimated';
import MapFilter from './map_filter';
import type { Store } from '../app/(tabs)/map';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const MAX_HEIGHT = SCREEN_HEIGHT * 0.5;

interface Props {
  stores: Store[];
  sheetPosition: SharedValue<number>;
  locationText: string;
  filterMode: boolean;
  setFilterMode: React.Dispatch<React.SetStateAction<boolean>>;
  onlyDiscounted: boolean | null;
  setOnlyDiscounted: (val: boolean | null) => void;
  categories: string[];
  setCategories: (val: string[]) => void;
  distance: string;
  setDistance: (val: string) => void;
  onApplyFilter: () => void;
}

export default function MapBottomSheet({
  stores,
  sheetPosition,
  locationText,
  filterMode,
  setFilterMode,
  onlyDiscounted,
  setOnlyDiscounted,
  categories,
  setCategories,
  distance,
  setDistance,
  onApplyFilter,
}: Props) {
  const bottomSheetRef = useRef<BottomSheet>(null);

  // 최소 120px, 최대 화면의 절반
  const snapPoints = useMemo(() => [120, MAX_HEIGHT], []);

  const handleSheetChanges = useCallback(
    (index: number) => {
      if (!sheetPosition) return;
      sheetPosition.value = withTiming(index * 100);
    },
    [sheetPosition]
  );

  // 음식점 카드 렌더 (명시적 타입)
  const renderItem: ListRenderItem<Store> = ({ item }) => {
    const imageSource = item.image
      ? { uri: item.image }
      : require('../assets/default_food.png');

    return (
      <View style={styles.cardWrapper}>
        <Image
          source={imageSource}
          style={styles.cardImage}
          resizeMode="cover"
        />
        <View style={styles.cardContentVertical}>
          <Text style={styles.storeName}>{item.name}</Text>
          <Text style={styles.rating}>
            ⭐ {item.rating.toFixed(1)} · {item.totalReviews ?? 0}명 리뷰 ·{' '}
            {item.distance}m
          </Text>
          {item.address && <Text style={styles.address}>{item.address}</Text>}
          {item.isDiscounted && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>마감 할인중</Text>
            </View>
          )}
        </View>
      </View>
    );
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={1}
      snapPoints={snapPoints}
      enablePanDownToClose={false}
      onChange={handleSheetChanges}
      handleIndicatorStyle={styles.handleBar}
      backgroundStyle={{ backgroundColor: '#fff' }}
    >
      {filterMode ? (
        <MapFilter
          onlyDiscounted={onlyDiscounted}
          setOnlyDiscounted={setOnlyDiscounted}
          categories={categories}
          setCategories={setCategories}
          distance={distance}
          setDistance={setDistance}
          onApply={() => {
            onApplyFilter();
            setFilterMode(false);
          }}
          onClose={() => setFilterMode(false)}
        />
      ) : (
        <View style={{ flex: 1 }}>
          {/* 헤더 */}
          <View style={styles.headerContainer}>
            <View style={styles.locationRow}>
              <View style={styles.locationTextBlock}>
                <View style={styles.locationMainRow}>
                  <Ionicons
                    name="location-sharp"
                    size={20}
                    color="#115E4B"
                    style={{ marginRight: 6 }}
                  />
                  <Text style={styles.locationMainText}>{locationText}</Text>
                  <View style={styles.underline} />
                </View>
                <Text style={styles.locationSubText}>
                  주변에서 마감 할인 상품을 찾아보세요 !
                </Text>
              </View>
              <TouchableOpacity
                style={styles.filterIconBox}
                onPress={() => setFilterMode(true)}
              >
                <Ionicons name="options-outline" size={22} color="#115E4B" />
              </TouchableOpacity>
            </View>
          </View>

          {/* 리스트 */}
          <BottomSheetFlatList<Store>
            data={stores}
            renderItem={renderItem}
            keyExtractor={(item: Store) => String(item.id)}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}
          />
        </View>
      )}
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  handleBar: {
    backgroundColor: '#ccc',
    width: 40,
    height: 4,
    borderRadius: 2,
    alignSelf: 'center',
    marginVertical: 8,
  },
  headerContainer: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#fff',
    zIndex: 10,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  locationTextBlock: { flex: 1 },
  locationMainRow: { flexDirection: 'row', alignItems: 'center' },
  locationMainText: { fontSize: 17, fontWeight: 'bold', color: '#333' },
  underline: {
    flex: 0.8,
    height: 2,
    backgroundColor: '#115E4B',
    marginLeft: 6,
    marginTop: 2,
  },
  locationSubText: {
    marginTop: 4,
    fontSize: 15,
    color: '#aaa',
    marginLeft: 26,
  },
  filterIconBox: {
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    height: 36,
    minWidth: 52,
    borderRadius: 18,
    borderWidth: 1.3,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  badge: {
    marginTop: 6,
    backgroundColor: '#115E4B',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  badgeText: { color: '#fff', fontSize: 12 },
  cardWrapper: {
    marginBottom: 16,
    borderRadius: 16,
    backgroundColor: '#F1F3F5',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 6,
    overflow: 'hidden',
  },
  cardImage: { width: '100%', height: 160 },
  cardContentVertical: { padding: 12 },
  storeName: { fontWeight: 'bold', fontSize: 16, marginBottom: 4 },
  rating: { fontSize: 13, color: '#666' },
  address: { fontSize: 12, color: '#666', marginTop: 4 },
});
