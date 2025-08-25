declare module 'react-native-vector-icons/Feather';
// src/types/declarations.d.ts
declare module 'react-native-google-places-autocomplete' {
  export interface GooglePlacesAutocompleteProps {
    predefinedPlaces?: Array<{
      description: string;
      geometry?: { location: { lat: number; lng: number } };
    }>;
    predefinedPlacesAlwaysVisible?: boolean;
  }
}
