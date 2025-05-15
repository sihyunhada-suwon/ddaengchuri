// import * as Location from "expo-location";
// import { useEffect, useState } from "react";
// import {
//   Dimensions,
//   FlatList,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import MapView, { Marker, PROVIDER_GOOGLE, Region } from "react-native-maps";
// import { Card, Chip } from "react-native-paper";
// import Icon from "react-native-vector-icons/MaterialCommunityIcons";

// const screen = Dimensions.get("window");

// const CATEGORIES = [
//   "편의점/마트",
//   "프랜차이즈",
//   "치킨/피자",
//   "족발/보쌈",
//   "고기",
//   "냉동/즉석식품",
// ];

// type Store = {
//   id: number;
//   name: string;
//   latitude: number;
//   longitude: number;
//   category: string;
//   distance: number;
//   rating: number;
//   isDiscounted: boolean;
// };

// const dummyStores: Store[] = [
//   {
//     id: 1,
//     name: "세븐일레븐 수원대점",
//     latitude: 37.284,
//     longitude: 127.043,
//     category: "편의점/마트",
//     distance: 150,
//     rating: 4.9,
//     isDiscounted: true,
//   },
//   {
//     id: 2,
//     name: "밀플랜비",
//     latitude: 37.283,
//     longitude: 127.042,
//     category: "프랜차이즈",
//     distance: 300,
//     rating: 4.5,
//     isDiscounted: true,
//   },
// ];

// export default function MapScreen() {
//   const [region, setRegion] = useState<Region | null>(null);
//   const [filteredStores, setFilteredStores] = useState<Store[]>(dummyStores);
//   const [search, setSearch] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
//   const [showOnlyDiscounted, setShowOnlyDiscounted] = useState(true);

//   useEffect(() => {
//     (async () => {
//       const { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== "granted") return;
//       const location = await Location.getCurrentPositionAsync({});
//       setRegion({
//         latitude: location.coords.latitude,
//         longitude: location.coords.longitude,
//         latitudeDelta: 0.01,
//         longitudeDelta: 0.01,
//       });
//     })();
//   }, []);

//   useEffect(() => {
//     let result = dummyStores;
//     if (search) {
//       result = result.filter((store) =>
//         store.name.toLowerCase().includes(search.toLowerCase())
//       );
//     }
//     if (selectedCategory) {
//       result = result.filter((store) => store.category === selectedCategory);
//     }
//     if (showOnlyDiscounted) {
//       result = result.filter((store) => store.isDiscounted);
//     }
//     setFilteredStores(result);
//   }, [search, selectedCategory, showOnlyDiscounted]);

//   if (!region) return <Text>지도를 불러오는 중입니다...</Text>;

//   return (
//     <View style={styles.container}>
//       <MapView
//         provider={PROVIDER_GOOGLE}
//         style={styles.map}
//         region={region}
//         showsUserLocation
//       >
//         {filteredStores.map((store) => (
//           <Marker
//             key={store.id}
//             coordinate={{
//               latitude: store.latitude,
//               longitude: store.longitude,
//             }}
//             title={store.name}
//             description={`평점 ${store.rating}`}
//           />
//         ))}
//       </MapView>

//       <View style={styles.searchBox}>
//         <TextInput
//           placeholder="지역 또는 장소 검색"
//           value={search}
//           onChangeText={setSearch}
//           style={styles.searchInput}
//         />
//         <TouchableOpacity style={styles.searchButton}>
//           <Icon name="arrow-right" color="#fff" size={24} />
//         </TouchableOpacity>
//       </View>

//       <View style={styles.filterToggleContainer}>
//         <Text style={{ fontWeight: "bold" }}>필터</Text>
//         <View style={styles.filterRow}>
//           <Chip
//             selected={showOnlyDiscounted}
//             onPress={() => setShowOnlyDiscounted(!showOnlyDiscounted)}
//             style={styles.chip}
//           >
//             마감할인 상품만 보기
//           </Chip>
//         </View>

//         <ScrollView horizontal showsHorizontalScrollIndicator={false}>
//           {CATEGORIES.map((cat) => (
//             <Chip
//               key={cat}
//               selected={selectedCategory === cat}
//               onPress={() =>
//                 setSelectedCategory(selectedCategory === cat ? null : cat)
//               }
//               style={styles.chip}
//             >
//               {cat}
//             </Chip>
//           ))}
//         </ScrollView>
//       </View>

//       <FlatList
//         data={filteredStores}
//         keyExtractor={(item) => item.id.toString()}
//         renderItem={({ item }) => (
//           <Card style={styles.card}>
//             <Card.Cover
//               source={{ uri: "https://via.placeholder.com/300x150" }}
//             />
//             <Card.Title title={item.name} subtitle={`${item.distance}m 거리`} />
//             <Card.Content>
//               <Text>⭐ {item.rating}</Text>
//               {item.isDiscounted && (
//                 <Chip icon="sale" style={styles.discountChip}>
//                   마감 할인중
//                 </Chip>
//               )}
//             </Card.Content>
//           </Card>
//         )}
//         style={styles.cardList}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   map: {
//     width: screen.width,
//     height: screen.height * 0.45,
//   },
//   searchBox: {
//     position: "absolute",
//     top: 50,
//     left: 15,
//     right: 15,
//     backgroundColor: "white",
//     flexDirection: "row",
//     alignItems: "center",
//     paddingHorizontal: 10,
//     borderRadius: 12,
//     elevation: 4,
//     zIndex: 10,
//   },
//   searchInput: {
//     flex: 1,
//     height: 40,
//   },
//   searchButton: {
//     backgroundColor: "#115E4B",
//     padding: 10,
//     borderRadius: 20,
//   },
//   filterToggleContainer: {
//     paddingHorizontal: 16,
//     paddingTop: 8,
//   },
//   filterRow: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     marginVertical: 8,
//   },
//   chip: {
//     marginRight: 8,
//     marginBottom: 8,
//   },
//   cardList: {
//     flex: 1,
//     paddingHorizontal: 16,
//     marginTop: 8,
//   },
//   card: {
//     marginBottom: 12,
//   },
//   discountChip: {
//     marginTop: 6,
//     backgroundColor: "#DFF6E1",
//   },
// });

import * as Location from "expo-location";
import { useEffect, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE, Region } from "react-native-maps";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import BottomSheet from "./map_bottomsheet";

const screen = Dimensions.get("window");

export type Store = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  category: string;
  distance: number;
  rating: number;
  isDiscounted: boolean;
};

const dummyStores: Store[] = [
  {
    id: 1,
    name: "세븐일레븐 수원대점",
    latitude: 37.284,
    longitude: 127.043,
    category: "편의점/마트",
    distance: 150,
    rating: 4.9,
    isDiscounted: true,
  },
  {
    id: 2,
    name: "밀플랜비",
    latitude: 37.283,
    longitude: 127.042,
    category: "프랜차이즈",
    distance: 300,
    rating: 4.5,
    isDiscounted: true,
  },
];

export default function MapScreen() {
  const [region, setRegion] = useState<Region | null>(null);
  const [stores, setStores] = useState<Store[]>(dummyStores);
  const [search, setSearch] = useState("");

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") return;
      const location = await Location.getCurrentPositionAsync({});
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    })();
  }, []);

  if (!region) return <Text>지도를 불러오는 중입니다...</Text>;

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={region}
        showsUserLocation
      >
        {stores.map((store) => (
          <Marker
            key={store.id}
            coordinate={{
              latitude: store.latitude,
              longitude: store.longitude,
            }}
            title={store.name}
            description={`평점 ${store.rating}`}
          />
        ))}
      </MapView>

      <View style={styles.searchBox}>
        <TextInput
          placeholder="지역 또는 장소 검색"
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
        />
        <TouchableOpacity style={styles.searchButton}>
          <Icon name="arrow-right" color="#fff" size={24} />
        </TouchableOpacity>
      </View>

      <BottomSheet stores={stores} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: screen.width,
    height: screen.height * 0.45,
  },
  searchBox: {
    position: "absolute",
    top: 50,
    left: 15,
    right: 15,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    borderRadius: 12,
    elevation: 4,
    zIndex: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
  },
  searchButton: {
    backgroundColor: "#115E4B",
    padding: 10,
    borderRadius: 20,
  },
});
