//Signup.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRouter, Stack } from 'expo-router';

// ... 생략된 import는 동일

export default function Signup() {
  const [email, setEmail] = useState('');
  const [emailDomain, setEmailDomain] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [authCode, setAuthCode] = useState('');
  const [sentCode, setSentCode] = useState('123456');
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [timer, setTimer] = useState(180);
  const [authStatus, setAuthStatus] = useState<'none' | 'success' | 'fail'>(
    'none'
  );

  const router = useRouter();

  const [emailValid, setEmailValid] = useState<'none' | 'valid' | 'invalid'>(
    'none'
  );
  const [passwordStatus, setPasswordStatus] = useState<
    'none' | 'valid' | 'invalid' | 'mismatch'
  >('none');

  const handleSignup = () => {
    console.log('회원가입 요청됨');
  };

  const handleSendCode = () => {
    setIsCodeSent(true);
    setTimer(180);
    setAuthStatus('none');
  };

  const isAuthCodeValid = authCode === sentCode;
  const isFormComplete =
    email.trim() !== '' &&
    emailDomain.trim() !== '' &&
    password.trim() !== '' &&
    confirmPassword.trim() !== '' &&
    phone.trim() !== '' &&
    isAuthCodeValid &&
    password === confirmPassword &&
    passwordStatus === 'valid';

  useEffect(() => {
    if (!isCodeSent || timer <= 0) return;
    const countdown = setInterval(() => setTimer((prev) => prev - 1), 1000);
    return () => clearInterval(countdown);
  }, [isCodeSent, timer]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    const fullEmail = `${email}@${emailDomain}`;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && emailDomain) {
      setEmailValid(regex.test(fullEmail) ? 'valid' : 'invalid');
    } else {
      setEmailValid('none');
    }
  }, [email, emailDomain]);

  useEffect(() => {
    if (!password || !confirmPassword) {
      setPasswordStatus('none');
      return;
    }
    const isValid =
      /(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,20}/.test(
        password
      );
    if (!isValid) {
      setPasswordStatus('invalid');
    } else if (password !== confirmPassword) {
      setPasswordStatus('mismatch');
    } else {
      setPasswordStatus('valid');
    }
  }, [password, confirmPassword]);

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()}>
              <Feather name="chevron-left" size={26} color="#000" />
            </TouchableOpacity>
          </View>

          <Text style={styles.title}>회원가입</Text>

          {/* 이메일 */}
          <View style={{ marginBottom: 40 }}>
            <Text style={styles.label}>이메일</Text>
            <View style={styles.row}>
              <TextInput
                style={styles.input}
                placeholder="이메일"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
              />
              <Text style={styles.at}>@</Text>
              <TextInput
                style={[styles.input, { flex: 1 }]}
                placeholder=""
                value={emailDomain}
                onChangeText={setEmailDomain}
                autoCapitalize="none"
              />
            </View>
            {emailValid === 'valid' && (
              <Text style={styles.validMsg}>사용 가능한 이메일입니다.</Text>
            )}
            {emailValid === 'invalid' && (
              <Text style={styles.errorMsg}>
                올바른 이메일 형식이 아닙니다.
              </Text>
            )}
          </View>

          {/* 비밀번호 */}
          <View style={{ marginBottom: 10 }}>
            <Text style={styles.label}>비밀번호</Text>
            <TextInput
              style={styles.input}
              placeholder="비밀번호"
              value={password}
              onChangeText={setPassword}
            />
          </View>

          {/* 비밀번호 확인 */}
          <View style={{ marginBottom: 40 }}>
            <TextInput
              style={styles.input}
              placeholder="비밀번호 확인"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <Text style={styles.passwordHint}>
              6~20자 / 영문 대문자, 소문자, 숫자, 특수문자 중 2가지 이상 조합
            </Text>

            {passwordStatus === 'valid' && (
              <Text style={styles.validMsg}>사용 가능한 비밀번호입니다.</Text>
            )}
            {passwordStatus === 'invalid' && (
              <Text style={styles.errorMsg}>비밀번호 형식을 확인해주세요.</Text>
            )}
            {passwordStatus === 'mismatch' && (
              <Text style={styles.errorMsg}>비밀번호를 확인해주세요.</Text>
            )}
          </View>

          {/* 휴대폰 번호 */}
          <View style={{ marginBottom: 30 }}>
            <Text style={styles.label}>휴대폰 번호</Text>
            <View style={styles.row}>
              <TextInput
                style={styles.input}
                placeholder="휴대폰 번호"
                keyboardType="phone-pad"
                value={phone}
                onChangeText={setPhone}
              />
              <TouchableOpacity
                style={[
                  styles.verifyBtn,
                  { backgroundColor: phone ? '#006241' : '#f1f1f1' },
                ]}
                disabled={!phone}
                onPress={handleSendCode}
              >
                <Text
                  style={[
                    styles.verifyText,
                    { color: phone ? '#fff' : '#777' },
                  ]}
                >
                  {isCodeSent ? '재전송' : '인증번호 요청'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* 인증번호 입력 */}
          {isCodeSent && (
            <View style={{ marginBottom: 160 }}>
              <Text style={styles.label}>인증번호</Text>
              <View style={styles.row}>
                <TextInput
                  style={styles.input}
                  placeholder="인증번호 입력"
                  keyboardType="numeric"
                  value={authCode}
                  onChangeText={(text) => {
                    setAuthCode(text);
                    if (text.length === 6) {
                      setAuthStatus(text === sentCode ? 'success' : 'fail');
                    } else {
                      setAuthStatus('none');
                    }
                  }}
                />
                <Text style={{ marginLeft: 8, color: '#666', fontSize: 13 }}>
                  {formatTime(timer)}
                </Text>
              </View>
              {authStatus === 'success' && (
                <Text style={[styles.validMsg, { color: '#444' }]}>
                  인증이 완료되었습니다.
                </Text>
              )}
              {authStatus === 'fail' && (
                <Text style={styles.errorMsg}>
                  인증번호가 일치하지 않습니다.
                </Text>
              )}
            </View>
          )}

          {/* 가입 버튼 */}
          <TouchableOpacity
            style={[
              styles.signupBtn,
              { backgroundColor: isFormComplete ? '#006241' : '#ccc' },
            ]}
            onPress={handleSignup}
            disabled={!isFormComplete}
          >
            <Text style={styles.signupText}>가입하기</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 50,
    paddingHorizontal: 25,
    paddingBottom: 60,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  header: {
    marginTop: 15,
    marginBottom: 8,
    marginLeft: -5,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111',
    marginBottom: 50,
    textAlign: 'center',
    marginTop: -28,
  },
  label: {
    fontSize: 13,
    color: '#777',
    marginBottom: 10,
    fontWeight: '500',
  },
  input: {
    width: '100%',
    paddingHorizontal: 14,
    paddingVertical: 13,
    fontSize: 15,
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  at: {
    fontSize: 16,
    marginHorizontal: 4,
    color: '#777',
  },
  verifyBtn: {
    paddingHorizontal: 14,
    paddingVertical: 15,
    borderRadius: 8,
    marginLeft: 7,
  },
  verifyText: {
    fontSize: 13,
    fontWeight: '600',
  },
  passwordHint: {
    fontSize: 12,
    color: '#888',
    marginTop: 10,
    marginLeft: 5,
  },
  signupBtn: {
    paddingVertical: 17,
    borderRadius: 6,
    alignItems: 'center',
  },
  signupText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  validMsg: {
    color: '#006241',
    fontSize: 13,
    marginTop: 10,
    marginLeft: 5,
  },
  errorMsg: {
    color: 'red',
    fontSize: 13,
    marginTop: 10,
    marginLeft: 5,
  },
});
