import React, { useEffect, useState } from 'react';
import {
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { GOOGLE_API_KEY } from '../constants/config';

interface Props {
  onPlaceSelected: (
    address: string,
    latitude: number,
    longitude: number
  ) => void;
}

export default function PlacesAutocomplete({ onPlaceSelected }: Props) {
  const [query, setQuery] = useState('');
  const [predictions, setPredictions] = useState<any[]>([]);

  const fetchPredictions = async (input: string) => {
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
      input
    )}&key=${GOOGLE_API_KEY}&language=ko&components=country:kr`;

    try {
      const res = await fetch(url);
      const json = await res.json();
      setPredictions(json.predictions || []);
    } catch (error) {
      console.error('Autocomplete fetch error:', error);
    }
  };

  const fetchPlaceDetails = async (placeId: string) => {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${GOOGLE_API_KEY}`;

    try {
      const res = await fetch(url);
      const json = await res.json();
      const location = json.result.geometry.location;
      const address = json.result.formatted_address;
      onPlaceSelected(address, location.lat, location.lng);
    } catch (error) {
      console.error('Place details fetch error:', error);
    }
  };

  useEffect(() => {
    if (query.length > 1) {
      fetchPredictions(query);
    } else {
      setPredictions([]);
    }
  }, [query]);

  return (
    <View style={styles.autocompleteContainer}>
      <View style={styles.inputWrapper}>
        <Icon name="magnify" size={22} color="#999" style={styles.icon} />
        <TextInput
          placeholder="장소를 입력하세요!"
          value={query}
          onChangeText={setQuery}
          style={styles.input}
          placeholderTextColor="#999"
        />
      </View>
      {predictions.length > 0 && (
        <FlatList
          data={predictions}
          keyExtractor={(item) => item.place_id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.suggestion}
              onPress={() => fetchPlaceDetails(item.place_id)}
            >
              <Text>{item.description}</Text>
            </TouchableOpacity>
          )}
          style={styles.suggestionsList}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  autocompleteContainer: {
    position: 'absolute',
    top: 57,
    left: 16,
    right: 16,
    zIndex: 20,
  },
  inputWrapper: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 11,
    alignItems: 'center',
    paddingLeft: 14,
    paddingRight: 10,
    height: 48,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 6,
  },
  icon: { marginRight: 6 },
  input: { flex: 1, fontSize: 15, color: '#333' },
  suggestionsList: {
    backgroundColor: '#fff',
    marginTop: 6,
    borderRadius: 11,
    maxHeight: 200,
  },
  suggestion: {
    padding: 12,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
});
