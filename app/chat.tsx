// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   TextInput,
//   TouchableOpacity,
//   ScrollView,
//   SafeAreaView,
// } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { Stack, router } from 'expo-router';
// import IntroPopup from '../components/Introchatpopup'; // ✅ 추가

// const ChatScreen = () => {
//   const [showIntro, setShowIntro] = useState(true); // ✅ 팝업 상태

//   const messages = [
//     {
//       type: 'bot',
//       avatar: require('../assets/ai/bot.png'),
//       text: '안녕하세요! 챗봇 잇또예요 ✨\n궁금한 건 저한테 물어보시거나\n왼쪽 아래에서 카테고리에서 찾아 보세요!',
//     },
//     {
//       type: 'bot',
//       text: '원하는 주제를 아래에서 선택해 주세요 😊',
//     },
//   ];

//   const categories = [
//     '✓ 지금 이용 가능한 가게',
//     '🌼 내가 구매한 재료로 요리 추천',
//     '🍽️ 남은 재료 활용 요리 추천',
//     '🌱 환경 기여 내역 보기',
//     '🎁 이벤트/쿠폰 확인',
//     '💬 도움이 필요해요',
//   ];

//   return (
//     <SafeAreaView style={styles.container}>
//       <Stack.Screen options={{ headerShown: false }} />

//       {/* ✅ 팝업 닫힌 후에만 보이게 */}
//       {!showIntro && (
//         <>
//           {/* Header */}
//           <View style={styles.header}>
//             <TouchableOpacity onPress={() => router.back()}>
//               <Ionicons name="chevron-back" size={28} color="#115E4B" />
//             </TouchableOpacity>
//             <Text style={styles.headerTitle}>세이브잇 챗봇</Text>
//           </View>

//           {/* Chat Content */}
//           <ScrollView style={styles.chatBox}>
//             {messages.map((msg, idx) => (
//               <View key={idx} style={styles.messageRow}>
//                 {msg.avatar && (
//                   <Image source={msg.avatar} style={styles.avatar} />
//                 )}
//                 <View style={styles.bubble}>
//                   <Text style={styles.bubbleText}>{msg.text}</Text>
//                 </View>
//               </View>
//             ))}

//             {/* Category Buttons */}
//             <View style={styles.categoryContainer}>
//               {categories.map((label, index) => (
//                 <TouchableOpacity key={index} style={styles.categoryButton}>
//                   <Text style={styles.categoryText}>{label}</Text>
//                 </TouchableOpacity>
//               ))}
//             </View>
//           </ScrollView>

//           {/* Input Field */}
//           <View style={styles.inputContainer}>
//             <Ionicons name="menu" size={24} color="#115E4B" />
//             <TextInput
//               style={styles.input}
//               placeholder="메시지를 입력해주세요."
//               placeholderTextColor="#aaa"
//             />
//             <TouchableOpacity>
//               <Image
//                 source={require('../assets/ai/send.png')}
//                 style={styles.sendIcon}
//               />
//             </TouchableOpacity>
//           </View>
//         </>
//       )}
//       {/* ✅ 팝업은 항상 맨 아래에 배치되어 화면 최상단에 오도록 */}
//       {showIntro && <IntroPopup onClose={() => setShowIntro(false)} />}
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FAF9F5',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//     paddingVertical: 15,
//   },
//   headerTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//     marginLeft: 10,
//     color: '#333',
//   },
//   chatBox: {
//     flex: 1,
//     paddingHorizontal: 20,
//   },
//   messageRow: {
//     flexDirection: 'row',
//     alignItems: 'flex-start',
//     marginVertical: 10,
//   },
//   avatar: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     marginRight: 10,
//   },
//   bubble: {
//     backgroundColor: '#fff',
//     borderRadius: 15,
//     padding: 12,
//     shadowColor: '#000',
//     shadowOpacity: 0.05,
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: 4,
//     elevation: 2,
//   },
//   bubbleText: {
//     fontSize: 15,
//     color: '#333',
//   },
//   categoryContainer: {
//     marginTop: 20,
//   },
//   categoryButton: {
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     paddingVertical: 14,
//     paddingHorizontal: 16,
//     marginBottom: 10,
//     shadowColor: '#000',
//     shadowOpacity: 0.04,
//     shadowOffset: { width: 0, height: 1 },
//     shadowRadius: 2,
//     elevation: 1,
//   },
//   categoryText: {
//     fontSize: 15,
//     color: '#111',
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderTopWidth: 1,
//     borderColor: '#eee',
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     backgroundColor: '#fff',
//   },
//   input: {
//     flex: 1,
//     marginHorizontal: 12,
//     fontSize: 14,
//     color: '#333',
//   },
//   sendIcon: {
//     width: 32,
//     height: 32,
//   },
// });

// export default ChatScreen;

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Stack, router } from 'expo-router';
import IntroPopup from '../components/Introchatpopup'; // ✅ 팝업 컴포넌트

const ChatScreen = () => {
  const [showIntro, setShowIntro] = useState(true); // ✅ 팝업 상태

  const messages = [
    {
      type: 'bot',
      avatar: require('../assets/ai/bot.png'),
      text: '안녕하세요! 챗봇 잇또예요 ✨\n궁금한 건 저한테 물어보시거나\n왼쪽 아래에서 카테고리에서 찾아 보세요!',
    },
    {
      type: 'bot',
      text: '원하는 주제를 아래에서 선택해 주세요 😊',
    },
  ];

  const categories = [
    '✓ 지금 이용 가능한 가게',
    '🌼 내가 구매한 재료로 요리 추천',
    '🍽️ 남은 재료 활용 요리 추천',
    '🌱 환경 기여 내역 보기',
    '🎁 이벤트/쿠폰 확인',
    '💬 도움이 필요해요',
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      {/* ✅ 항상 보이는 채팅 UI */}
      <>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={28} color="#115E4B" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>세이브잇 챗봇</Text>
        </View>

        {/* Chat Content */}
        <ScrollView style={styles.chatBox}>
          {messages.map((msg, idx) => (
            <View key={idx} style={styles.messageRow}>
              {msg.avatar && (
                <Image source={msg.avatar} style={styles.avatar} />
              )}
              <View style={styles.bubble}>
                <Text style={styles.bubbleText}>{msg.text}</Text>
              </View>
            </View>
          ))}

          {/* Category Buttons */}
          <View style={styles.categoryContainer}>
            {categories.map((label, index) => (
              <TouchableOpacity key={index} style={styles.categoryButton}>
                <Text style={styles.categoryText}>{label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {/* Input Field */}
        <View style={styles.inputContainer}>
          <Ionicons name="menu" size={24} color="#115E4B" />
          <TextInput
            style={styles.input}
            placeholder="메시지를 입력해주세요."
            placeholderTextColor="#aaa"
          />
          <TouchableOpacity>
            <Image
              source={require('../assets/ai/send.png')}
              style={styles.sendIcon}
            />
          </TouchableOpacity>
        </View>
      </>

      {/* ✅ 팝업은 그 위에만 잠깐 덮이게 */}
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
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 10,
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
  bubble: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  bubbleText: {
    fontSize: 15,
    color: '#333',
  },
  categoryContainer: {
    marginTop: 20,
  },
  categoryButton: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 1,
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
    paddingVertical: 12,
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    marginHorizontal: 12,
    fontSize: 14,
    color: '#333',
  },
  sendIcon: {
    width: 32,
    height: 32,
  },
});

export default ChatScreen;
