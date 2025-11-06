import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Keyboard,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';

const MAX_ITEMS = 10;

export default function Search() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [recent, setRecent] = useState<string[]>([]);
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    const t = setTimeout(() => inputRef.current?.focus(), 100);
    return () => clearTimeout(t);
  }, []);

  const addQuery = (term: string) => {
    const t = term.trim();
    if (!t) return;
    setRecent((prev) =>
      [t, ...prev.filter((x) => x !== t)].slice(0, MAX_ITEMS)
    );
  };

  const clearAll = () => setRecent([]);

  const handleSubmit = (text?: string) => {
    const term = (text ?? query).trim();
    if (!term) return;
    addQuery(term);
    Keyboard.dismiss();
    router.push({ pathname: '/list', params: { q: term } });
  };

  const handleChipPress = (term: string) => {
    setQuery(term);
    handleSubmit(term);
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />

      <View style={styles.container}>
        {/* 🔙 홈으로 이동 */}
        <View style={styles.topBar}>
          <TouchableOpacity
            onPress={() => router.push('/(tabs)/home')}
            style={styles.backBtn}
          >
            <Ionicons name="chevron-back" size={26} color="#111" />
          </TouchableOpacity>

          <View style={styles.inputWrap}>
            <TextInput
              ref={inputRef}
              value={query}
              onChangeText={setQuery}
              onSubmitEditing={() => handleSubmit()}
              placeholder="검색어를 입력해주세요."
              placeholderTextColor="#999"
              returnKeyType="search"
              underlineColorAndroid="transparent"
              style={styles.input}
            />
            {query.length > 0 && (
              <TouchableOpacity
                onPress={() => setQuery('')}
                style={styles.clearBtn}
              >
                <Ionicons name="close-circle" size={18} color="#bbb" />
              </TouchableOpacity>
            )}
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.content}>
          {/* 최근 검색어 */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>최근 검색어</Text>
            {recent.length > 0 && (
              <TouchableOpacity onPress={clearAll}>
                <Text style={styles.clearAll}>전체삭제</Text>
              </TouchableOpacity>
            )}
          </View>

          {recent.length === 0 ? (
            <Text style={styles.emptyText}>최근 검색어가 없습니다.</Text>
          ) : (
            <View style={styles.chipsWrap}>
              {recent.map((item) => (
                <TouchableOpacity
                  key={item}
                  onPress={() => handleChipPress(item)}
                  style={styles.chip}
                  activeOpacity={0.85}
                >
                  <Text style={styles.chipText} numberOfLines={1}>
                    {item}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* 맞춤 검색어 */}
          <Text style={styles.personalizedTitle}>맞춤 검색어</Text>

          <View style={styles.guideRow}>
            <Image
              source={require('../assets/question.png')}
              style={styles.questionIcon}
            />
            <Text style={styles.guideText}>
              최근 탐색/선호 카테고리를 바탕으로 추천돼요.
            </Text>
          </View>

          <View style={styles.recoChipsWrap}>
            <View style={styles.recoRow}>
              {['샐러드', '포케', '도시락', '과일'].map((k) => (
                <TouchableOpacity
                  key={k}
                  style={styles.recoChip}
                  activeOpacity={0.9}
                  onPress={() => handleChipPress(k)}
                >
                  <Text style={styles.recoChipText}>{k}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.recoRow}>
              {['베이커리', '비건'].map((k) => (
                <TouchableOpacity
                  key={k}
                  style={styles.recoChip}
                  activeOpacity={0.9}
                  onPress={() => handleChipPress(k)}
                >
                  <Text style={styles.recoChipText}>{k}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingTop: 70,
    paddingBottom: 14,
    gap: 8,
  },
  backBtn: { padding: 4 },
  inputWrap: {
    height: 42,
    width: 320,
    borderRadius: 12,
    backgroundColor: '#F2F3F4',
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 14,
    color: '#111',
    paddingVertical: 0,
  },
  clearBtn: { paddingLeft: 4 },
  content: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 40,
  },
  sectionHeader: {
    marginTop: 4,
    marginBottom: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontSize: 18,
    color: '#444',
    fontWeight: '600',
    marginLeft: 8,
  },
  clearAll: { fontSize: 13, color: '#ccc', fontWeight: '400', marginRight: 7 },
  emptyText: { marginTop: 6, color: '#777', fontSize: 13, marginLeft: 8 },
  chipsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 7,
    marginLeft: 10,
  },
  chip: {
    minWidth: 60,
    height: 32,
    borderRadius: 16,
    borderWidth: 1.2,
    borderColor: '#CCCCCC',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  chipText: { fontSize: 12, color: '#444', fontWeight: '600' },
  personalizedTitle: {
    marginTop: 28,
    fontSize: 18,
    color: '#444',
    fontWeight: '600',
    marginLeft: 8,
  },
  guideRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    marginTop: 6,
  },
  questionIcon: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
    marginRight: 4,
  },
  guideText: { fontSize: 13, color: '#666' },
  recoChipsWrap: { marginTop: 10, marginLeft: 10, rowGap: 8 },
  recoRow: { flexDirection: 'row', columnGap: 8 },
  recoChip: {
    minWidth: 60,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#99C0B3',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  recoChipText: { fontSize: 12, color: '#fff', fontWeight: '500' },
});
