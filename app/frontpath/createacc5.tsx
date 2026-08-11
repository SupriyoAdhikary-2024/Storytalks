import { db } from '@/config/Firebase';
import { useUser } from '@/context/UserContext';
import { useRouter } from 'expo-router';
import { doc, setDoc } from 'firebase/firestore';
import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function createacc5() {
  const router = useRouter();
  const { username, phone, password, languages } = useUser();
  const [loading, setLoading] = useState(false);

  const handleAgree = async () => {
    setLoading(true);

    // ✅ Debug - check values
    console.log('username:', username);
    console.log('phone:', phone);
    console.log('password:', password);
    console.log('languages:', languages);

    try {
      // ✅ Use phone as document ID but make sure it's not empty
      const docId = phone || `user_${Date.now()}`;
      
      await setDoc(doc(db, "users", docId), {
        username: username,
        phone: phone,
        password: password,
        languages: languages || [],
        agreedToTerms: true,
        createdAt: new Date().toISOString(),
      });

      Alert.alert('Success!', 'Account created ✅');
      router.push('/frontpath/createacc7');
    } catch (error: any) {
      console.log('Firebase error:', error);
      Alert.alert('Error', error.message);
    }
    setLoading(false);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#eefc30' }}>
      <TouchableOpacity
        onPress={() => router.back()}
        style={{ position: 'absolute', top: 50, left: 20, zIndex: 10 }}
      >
        <Text style={{ fontSize: 24 }}>←</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Terms and Conditions</Text>

      <ScrollView style={styles.box}>
        <Text style={styles.termsText}>
          📋 TERMS AND CONDITIONS{'\n\n'}
          1. Introduction{'\n\n'}
          Welcome to our platform. By accessing or using our platform, you agree to follow these Terms and Conditions.{'\n\n'}
          2. User Eligibility{'\n\n'}
          You must be at least 13 years old to create an account.{'\n\n'}
          3. Account Responsibilities{'\n\n'}
          You are responsible for maintaining the security of your account and password.{'\n\n'}
          4. Acceptable Use{'\n\n'}
          You agree not to use our platform for illegal activities.{'\n\n'}
          5. Privacy Policy{'\n\n'}
          We collect and store your data as described in our Privacy Policy.
        </Text>
      </ScrollView>

      <TouchableOpacity
        style={[styles.agreeBtn, loading && { opacity: 0.7 }]}
        onPress={handleAgree}
        disabled={loading}
      >
        <Text style={styles.agreeBtnText}>
          {loading ? 'Creating account...' : 'I Agree and continue'}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'red',
    textAlign: 'center',
    marginTop: 60,
    marginBottom: 20,
  },
  box: {
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    margin: 16,
    padding: 20,
    flex: 1,
  },
  termsText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 22,
  },
  agreeBtn: {
    backgroundColor: '#cc0000',
    margin: 16,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  agreeBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});