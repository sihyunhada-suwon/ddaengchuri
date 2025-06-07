import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { Store } from '../app/(tabs)/map';

interface Props {
  stores: Store[];
  locationText: string;
}

export default function BottomSheet({ stores, locationText }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.locationText}>
        {locationText} 주변 마감 할인 상품을 찾아보세요!
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {stores.map((store) => (
          <View key={store.id} style={styles.card}>
            <View style={styles.imageWrapper}>
              <Image
                source={require('../assets/food/salad.jpg')} // 실제 이미지 매핑 필요
                style={styles.image}
              />
            </View>
            <Text style={styles.name}>{store.name}</Text>
            <Text style={styles.detail}>
              ⭐ {store.rating} / {Math.round(store.distance / 1000)}km
            </Text>
            {store.isDiscounted && (
              <Text style={styles.badge}>마감 할인중</Text>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 16,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
  },
  locationText: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    width: 180,
    marginRight: 12,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  imageWrapper: {
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 6,
  },
  image: {
    width: '100%',
    height: 100,
    resizeMode: 'cover',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 4,
  },
  detail: {
    fontSize: 13,
    color: '#555',
  },
  badge: {
    marginTop: 4,
    fontSize: 12,
    color: '#fff',
    backgroundColor: '#388e3c',
    alignSelf: 'flex-start',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
});
