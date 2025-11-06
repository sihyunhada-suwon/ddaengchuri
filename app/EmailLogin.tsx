import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Platform,
  StatusBar,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRouter, Stack } from 'expo-router';

export default function EmailLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isError, setIsError] = useState(false);

  const isValid = email !== '' && password !== '';

  const handleLogin = () => {
    const success = email === 'test@example.com' && password === '123456';

    if (!success) {
      setIsError(true);
    } else {
      setIsError(false);
      console.log('로그인 성공!');
      // 로그인 성공 후 로직
    }
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />

      <View style={styles.container}>
        {/* 뒤로가기 버튼 */}
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Feather name="chevron-left" size={28} color="#000" />
        </TouchableOpacity>

        {/* 헤더 중앙 로그인 텍스트 */}
        <Text style={styles.headerTitle}>로그인</Text>

        {/* 입력 및 버튼들 */}
        <View style={styles.contentWrapper}>
          {/* 이메일 입력 */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>이메일</Text>
            <TextInput
              style={styles.input}
              placeholder="이메일주소 입력"
              placeholderTextColor="#aaa"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* 비밀번호 입력 */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>비밀번호</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="비밀번호 입력"
                placeholderTextColor="#aaa"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Image
                  source={require('../assets/eyes.png')}
                  style={[
                    styles.eyeIcon,
                    { tintColor: showPassword ? '#1478ff' : '#aaa' },
                  ]}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* 로그인 실패 시 에러 문구 */}
          {isError && (
            <Text style={styles.errorText}>
              이메일 또는 비밀번호가 일치하지 않습니다.
            </Text>
          )}

          {/* 로그인 버튼 */}
          <TouchableOpacity
            style={[
              styles.loginButton,
              { backgroundColor: isValid ? '#2d5d38' : '#ccc' },
            ]}
            disabled={!isValid}
            onPress={handleLogin}
          >
            <Text style={styles.loginText}>로그인</Text>
          </TouchableOpacity>

          {/* 카카오 로그인 */}
          <TouchableOpacity style={styles.kakaoButton}>
            <Image
              source={require('../assets/kakao.png')}
              style={styles.kakaoIcon}
              resizeMode="contain"
            />
            <Text style={styles.kakaoText}>카카오로 로그인</Text>
          </TouchableOpacity>

          {/* 하단 링크 */}
          <View style={styles.linkRow}>
            <TouchableOpacity onPress={() => router.push('/Signup')}>
              <Text style={styles.linkText}>이메일 가입 </Text>
            </TouchableOpacity>
            <Text style={styles.linkDivider}>|</Text>
            <Text style={styles.linkText}> 이메일 찾기 </Text>
            <Text style={styles.linkDivider}>|</Text>
            <Text style={styles.linkText}> 비밀번호 찾기 </Text>
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.select({
      android: StatusBar.currentHeight || 0,
      ios: 50,
    }),
    backgroundColor: '#fff',
    paddingHorizontal: 30,
  },
  backButton: {
    position: 'absolute',
    top: Platform.select({
      android: (StatusBar.currentHeight || 0) + 10,
      ios: 20,
    }),
    left: 20,
    zIndex: 10,
    marginTop: 50,
  },
  headerTitle: {
    position: 'absolute',
    top: Platform.select({
      android: (StatusBar.currentHeight || 0) + 20,
      ios: 50,
    }),
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: '600',
    color: '#444',
    marginTop: 25,
  },
  contentWrapper: {
    marginTop: 110,
  },
  inputGroup: {
    marginBottom: 25,
  },
  label: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
    marginLeft: 2,
    fontWeight: '500',
  },
  input: {
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    fontSize: 15,
  },
  passwordContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    alignItems: 'center',
  },
  passwordInput: {
    flex: 1,
    height: 50,
    fontSize: 15,
  },
  eyeIcon: {
    width: 24,
    height: 24,
  },
  errorText: {
    color: '#444',
    fontSize: 13,
    marginBottom: 10,
    marginLeft: 2,
  },
  loginButton: {
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    marginTop: 10,
  },
  loginText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  kakaoButton: {
    height: 50,
    borderRadius: 8,
    backgroundColor: '#FEE500',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  kakaoIcon: {
    width: 18,
    height: 18,
    marginRight: 10,
  },
  kakaoText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 65,
  },
  linkRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  linkText: {
    fontSize: 14,
    color: '#333',
    marginHorizontal: 5,
  },
  linkDivider: {
    fontSize: 14,
    color: '#aaa',
  },
});
