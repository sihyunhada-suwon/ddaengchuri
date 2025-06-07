import React, { useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { Store } from '../app/(tabs)/map';
import { Ionicons } from '@expo/vector-icons';
import { SharedValue, withTiming } from 'react-native-reanimated';
import MapFilter from './map_filter';

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
}: Props) {
  const snapPoints = ['10%', '40%', '80%'];

  const handleSheetChanges = useCallback(
    (index: number) => {
      if (!sheetPosition) return;
      sheetPosition.value = withTiming(
        index === 0 ? 0 : index === 1 ? 150 : 300
      );
    },
    [sheetPosition]
  );

  const renderItem = ({ item }: { item: Store }) => (
    <View style={styles.cardWrapper}>
      <View style={styles.cardVertical}>
        <Image
          source={item.image}
          style={styles.cardImage}
          resizeMode="cover"
        />
        <View style={styles.cardContentVertical}>
          <Text style={styles.storeName}>{item.name}</Text>
          <Text style={styles.rating}>
            ⭐ {item.rating.toFixed(1)} · {item.distance}m
          </Text>
          {item.isDiscounted && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>마감 할인중</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );

  return (
    <BottomSheet
      index={0}
      snapPoints={snapPoints}
      enablePanDownToClose={false}
      onChange={handleSheetChanges}
      handleComponent={null}
    >
      <BottomSheetView style={styles.sheetContent}>
        <View style={styles.handleBarContainer}>
          <View style={styles.handleBar} />
        </View>

        {!filterMode && (
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
        )}

        {filterMode ? (
          <MapFilter
            onlyDiscounted={onlyDiscounted}
            setOnlyDiscounted={setOnlyDiscounted}
            categories={categories}
            setCategories={setCategories}
            distance={distance}
            setDistance={setDistance}
            onApply={() => setFilterMode(false)}
            onClose={() => setFilterMode(false)}
          />
        ) : (
          <FlatList
            data={stores}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}
            showsVerticalScrollIndicator={false}
          />
        )}
      </BottomSheetView>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  sheetContent: { flex: 1 },
  handleBarContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  handleBar: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#ccc',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  locationTextBlock: {
    flex: 1,
  },
  locationMainRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationMainText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#333',
  },
  underline: {
    flex: 0.8,
    height: 2,
    backgroundColor: '#115E4B',
    marginLeft: 6,
    marginTop: 2,
    shadowColor: '#115E4B',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
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
    borderRadius: 18, // ← height: 36의 절반보다 살짝 작은 값으로!
    borderWidth: 1.3,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: -5,
  },
  badge: {
    marginTop: 6,
    backgroundColor: '#115E4B',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
  },
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
  cardVertical: {
    backgroundColor: '#F1F3F5',
  },
  cardImage: {
    width: '100%',
    height: 160,
  },
  cardContentVertical: {
    padding: 12,
  },
  storeName: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  rating: {
    fontSize: 13,
    color: '#666',
  },
});
