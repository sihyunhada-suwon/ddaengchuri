import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import { Card, Chip } from "react-native-paper";
import { Store } from "./map";

const CATEGORIES = [
  "편의점/마트",
  "프랜차이즈",
  "치킨/피자",
  "족발/보쌈",
  "고기",
  "냉동/즉석식품",
];

type Props = {
  stores: Store[];
};

export default function BottomSheet({ stores }: Props) {
  return (
    <View style={styles.sheetContainer}>
      <Text style={styles.sheetTitle}>마감할인✨</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chipContainer}
      >
        {CATEGORIES.map((cat) => (
          <Chip key={cat} style={styles.chip}>
            {cat}
          </Chip>
        ))}
      </ScrollView>

      <FlatList
        data={stores}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Cover
              source={{ uri: "https://via.placeholder.com/300x150" }}
            />
            <Card.Title title={item.name} subtitle={`${item.distance}m 거리`} />
            <Card.Content>
              <Text>⭐ {item.rating}</Text>
              {item.isDiscounted && (
                <Chip icon="sale" style={styles.discountChip}>
                  마감 할인중
                </Chip>
              )}
            </Card.Content>
          </Card>
        )}
        style={styles.cardList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  sheetContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 12,
    backgroundColor: "#fff",
  },
  sheetTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 8,
  },
  chipContainer: {
    paddingBottom: 12,
  },
  chip: {
    marginRight: 8,
    backgroundColor: "#f1f1f1",
  },
  cardList: {
    flex: 1,
  },
  card: {
    marginBottom: 12,
  },
  discountChip: {
    marginTop: 6,
    backgroundColor: "#DFF6E1",
  },
});
