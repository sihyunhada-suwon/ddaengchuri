import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Stack, router } from 'expo-router';
import IntroPopup from '../components/Introchatpopup';

const ChatScreen = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      avatar: require('../assets/ai/bot.png'),
      text: '안녕하세요! 챗봇 잇또예요 ✨\n궁금한 건 저한테 물어보시거나\n왼쪽 아래에서 카테고리에서 찾아 보세요!',
    },
    {
      type: 'bot',
      text: '원하는 주제를 아래에서 선택해 주세요 😊',
    },
    {
      type: 'category-list',
      categories: [
        '✓ 지금 이용 가능한 가게',
        '🥦 내가 구매한 재료로 요리 추천',
        '🍽️ 남은 재료 활용 요리 추천',
        '🌱 환경 기여 내역 보기',
        '🎁 이벤트/쿠폰 확인',
        '💬 도움이 필요해요',
      ],
    },
  ]);

  const scrollViewRef = useRef<ScrollView>(null);

  const handleSend = () => {
    if (!inputText.trim()) return;
    const newMessage = {
      type: 'user',
      text: inputText,
    };
    setMessages((prev) => [...prev, newMessage]);
    setInputText('');
  };

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 20 : 0}
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="chevron-back" size={28} color="#115E4B" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>세이브잇 챗봇</Text>
          </View>

          {/* Chat Content */}
          <ScrollView
            style={styles.chatBox}
            ref={scrollViewRef}
            keyboardShouldPersistTaps="handled"
          >
            {messages.map((msg, idx) => (
              <View
                key={idx}
                style={[
                  styles.messageRow,
                  msg.type === 'user' && { justifyContent: 'flex-end' },
                ]}
              >
                {msg.type === 'bot' && msg.avatar ? (
                  <Image source={msg.avatar} style={styles.avatar} />
                ) : msg.type === 'bot' || msg.type === 'category-list' ? (
                  <View style={styles.avatarPlaceholder} />
                ) : null}

                {msg.type === 'bot' || msg.type === 'user' ? (
                  <View
                    style={[
                      styles.bubble,
                      msg.type === 'user' && {
                        backgroundColor: '#DCF8C6',
                        borderTopRightRadius: 2,
                        borderTopLeftRadius: 18,
                        borderBottomRightRadius: 18,
                        borderBottomLeftRadius: 18,
                        alignSelf: 'flex-end',
                      },
                    ]}
                  >
                    <Text style={styles.bubbleText}>{msg.text}</Text>
                  </View>
                ) : msg.type === 'category-list' && msg.categories ? (
                  <View style={styles.bubble}>
                    {msg.categories.map((label, index) => (
                      <TouchableOpacity
                        key={index}
                        style={[
                          styles.categoryItem,
                          index === msg.categories.length - 1 && {
                            borderBottomWidth: 0,
                          },
                        ]}
                        onPress={() => console.log(`${label} 클릭됨`)}
                      >
                        <Text style={styles.categoryText}>{label}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                ) : null}
              </View>
            ))}
          </ScrollView>

          {/* Input Field */}
          <View style={styles.inputContainer}>
            <Ionicons name="menu" size={24} color="#115E4B" />
            <TextInput
              style={styles.input}
              placeholder="메시지를 입력해주세요."
              placeholderTextColor="#aaa"
              value={inputText}
              onChangeText={setInputText}
              multiline
            />
            <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
              <Ionicons name="paper-plane-outline" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>

      {showIntro && <IntroPopup onClose={() => setShowIntro(false)} />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF9F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  headerTitle: {
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  chatBox: {
    flex: 1,
    paddingHorizontal: 20,
  },
  messageRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  avatarPlaceholder: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  bubble: {
    backgroundColor: '#fff',
    padding: 12,
    maxWidth: '80%',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
    borderTopLeftRadius: 2,
    borderTopRightRadius: 18,
    borderBottomRightRadius: 18,
    borderBottomLeftRadius: 18,
  },
  bubbleText: {
    fontSize: 15,
    color: '#333',
  },
  categoryItem: {
    paddingVertical: 14,
    paddingHorizontal: 4,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    alignItems: 'center',
    width: '100%',
  },
  categoryText: {
    fontSize: 15,
    color: '#111',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#eee',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    marginHorizontal: 12,
    fontSize: 16,
    color: '#333',
    paddingVertical: 6,
    minHeight: 30,
    maxHeight: 100,
  },
  sendButton: {
    width: 40,
    height: 40,
    backgroundColor: '#115E4B',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 6,
  },
});

export default ChatScreen;
