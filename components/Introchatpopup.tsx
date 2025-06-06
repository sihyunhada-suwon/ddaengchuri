// import React from 'react';
// import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

// const IntroPopup = ({ onClose }: { onClose: () => void }) => {
//   return (
//     <View style={styles.overlay}>
//       <View style={styles.popupContainer}>
//         {/* 캐릭터 (말풍선 위에 겹치게) */}
//         <Image
//           source={require('../assets/ai/itddo.png')}
//           style={styles.botImage}
//         />

//         {/* 말풍선 전체 (X 버튼 포함) */}
//         <View style={styles.textBoxWrapper}>
//           <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
//             <Text style={styles.closeText}>✕</Text>
//           </TouchableOpacity>

//           <View style={styles.textBox}>
//             <Text style={styles.textTitle}>
//               안녕하세요 !{'\n'}저는 AI 챗봇 ‘잇또’입니다.
//             </Text>
//             <Text style={styles.textDesc}>
//               지금 궁금한 건 저에게 바로 질문하거나,{'\n'}
//               왼쪽 아래 카테고리에서 찾아보실 수 있어요.
//             </Text>
//           </View>
//         </View>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   overlay: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: 'rgba(0,0,0,0.6)',
//     justifyContent: 'center',
//     alignItems: 'center',
//     zIndex: 99,
//   },
//   popupContainer: {
//     position: 'relative',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   textBoxWrapper: {
//     backgroundColor: '#297A5D',
//     borderRadius: 20,
//     padding: 25,
//     maxWidth: 340,
//     position: 'relative',
//     alignItems: 'flex-start',
//   },
//   textBox: {
//     paddingTop: 10,
//   },
//   closeBtn: {
//     position: 'absolute',
//     top: -16,
//     left: -16,
//     backgroundColor: '#fff',
//     width: 32,
//     height: 32,
//     borderRadius: 16,
//     justifyContent: 'center',
//     alignItems: 'center',
//     zIndex: 2,
//     elevation: 5,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, height: 2 },
//   },
//   closeText: {
//     fontSize: 18,
//     color: '#333',
//   },
//   textTitle: {
//     fontWeight: 'bold',
//     color: '#fff',
//     fontSize: 19,
//     marginBottom: 10,
//   },
//   textDesc: {
//     fontSize: 17,
//     color: '#fff',
//     lineHeight: 20,
//   },
//   botImage: {
//     position: 'absolute',
//     top: -100,
//     right: -5,
//     width: 160,
//     height: 160,
//     zIndex: 1,
//   },
// });

// export default IntroPopup;

import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const IntroPopup = ({ onClose }: { onClose: () => void }) => {
  return (
    <View style={styles.overlay}>
      <View style={styles.popupContainer}>
        {/* ✅ 흐릿하고 왼쪽 위에 있는 X 버튼 */}
        <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
          <Text style={styles.closeText}>✕</Text>
        </TouchableOpacity>

        {/* ✅ 캐릭터 (말풍선 오른쪽 위에 겹쳐지게) */}
        <Image
          source={require('../assets/ai/itddo.png')}
          style={styles.botImage}
        />

        {/* ✅ 말풍선 */}
        <View style={styles.textBoxWrapper}>
          <View style={styles.textBox}>
            <Text style={styles.textTitle}>
              안녕하세요 !{'\n'}저는 AI 챗봇 ‘잇또’입니다.
            </Text>
            <Text style={styles.textDesc}>
              지금 궁금한 건 저에게 바로 질문하거나,{'\n'}
              왼쪽 아래 카테고리에서 찾아보실 수 있어요.
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.65)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 99,
  },
  popupContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  closeBtn: {
    alignSelf: 'flex-start', // ✅ 왼쪽 정렬
    marginBottom: 12,
    marginLeft: 10, // ✅ 왼쪽 여백 조절
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // ✅ 흐릿한 배경
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 3,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 1 },
  },
  closeText: {
    fontSize: 18,
    color: '#333',
  },
  textBoxWrapper: {
    backgroundColor: '#297A5D',
    borderRadius: 20,
    paddingHorizontal: 25,
    paddingVertical: 16,
    maxWidth: 340,
    position: 'relative',
    alignItems: 'flex-start',
  },
  textBox: {
    paddingTop: 4,
  },
  textTitle: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 19,
    marginBottom: 10,
  },
  textDesc: {
    fontSize: 17,
    color: '#fff',
    lineHeight: 20,
  },
  botImage: {
    position: 'absolute',
    top: -60,
    right: -10,
    width: 160,
    height: 160,
    zIndex: 1,
  },
});

export default IntroPopup;
