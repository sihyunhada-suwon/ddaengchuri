declare module 'react-native-google-places-autocomplete' {
  import * as React from 'react';
  import {
    TextInputProps,
    StyleProp,
    ViewStyle,
    TextStyle,
  } from 'react-native';

  export interface GooglePlaceData {
    description: string;
    place_id: string;
    structured_formatting?: {
      main_text?: string;
      secondary_text?: string;
    };
    types?: string[];
  }

  export interface GooglePlaceDetail {
    formatted_address: string;
    geometry: {
      location: { lat: number; lng: number };
      viewport?: any;
    };
    name?: string;
    place_id?: string;
  }

  export interface GooglePlacesAutocompleteProps {
    placeholder?: string;
    query: {
      key: string;
      language?: string;
      components?: string;
      location?: string;
      radius?: number;
      rankby?: 'distance' | 'prominence';
      types?: string;
    };
    fetchDetails?: boolean;
    onPress?: (
      data: GooglePlaceData,
      details: GooglePlaceDetail | null
    ) => void;
    textInputProps?: TextInputProps;
    debounce?: number;
    enablePoweredByContainer?: boolean;
    nearbyPlacesAPI?: 'GooglePlacesSearch' | 'GoogleReverseGeocoding';
    styles?: {
      container?: StyleProp<ViewStyle>;
      textInputContainer?: StyleProp<ViewStyle>;
      textInput?: StyleProp<TextStyle>;
      listView?: StyleProp<ViewStyle>;
      row?: StyleProp<ViewStyle>;
      separator?: StyleProp<ViewStyle>;
      description?: StyleProp<TextStyle>;
      predefinedPlacesDescription?: StyleProp<TextStyle>;
    };
  }

  export const GooglePlacesAutocomplete: React.FC<GooglePlacesAutocompleteProps>;
  export default GooglePlacesAutocomplete;
}
