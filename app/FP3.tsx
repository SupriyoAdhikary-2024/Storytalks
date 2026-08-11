import { db } from '@/config/Firebase';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { useState } from 'react';
import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function FP3() {
  const [Error, setError] = useState(false);
  const router = useRouter();
  const { phoneNumber } = useLocalSearchParams<{ phoneNumber: string }>();
  const [passwordError, setPasswordError] = useState(false);
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  const [showPassword2, setShowPassword2] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleNext = async () => {
    if (!password2.trim()) {
      setError(true);
      return;
    }
    if (password2 !== password) {
      setPasswordError(true);
      return;
    }
    setError(false);
    setPasswordError(false);
    setLoading(true);

    try {
      // ✅ Find user by phone number
      const phone = `+91${phoneNumber}`;
      console.log('Searching for phone:', phone);

      const q = query(
        collection(db, "users"),
        where("phone", "==", phone)
      );
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        Alert.alert('Error', 'No account found with this phone number');
        setLoading(false);
        return;
      }

      // ✅ Update password
      const userDoc = querySnapshot.docs[0];
      await updateDoc(doc(db, "users", userDoc.id), {
        password: password2,
        updatedAt: new Date().toISOString(),
      });

      Alert.alert('Success!', 'Password reset successfully ✅');
      router.push('/');  // ← go to login page

    } catch (error: any) {
      console.log('Error:', error);
      Alert.alert('Error', error.message);
    }
    setLoading(false);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <View className='flex-1 justify-center bg-white'>
        <TouchableOpacity
          onPress={() => router.back()}
          style={{ position: 'absolute', top: -75, left: -2 }}
        >
          <Image
            source={require("@/assets/images/arrow-left.png")}
            style={styles.headerImg}
            resizeMode="cover"
          />
        </TouchableOpacity>

        <Text style={styles.text2}>Reset your Password</Text>
        <Text style={styles.text}>please use #,@ for creating strong password</Text>

        <View style={styles.container}>
          <View style={styles.input2}>
            <Text style={styles.inputLabel2}>New password</Text>
            <View style={styles.inputWrapper2}>
              <TextInput
                secureTextEntry={showPassword2}
                autoCapitalize='none'
                autoCorrect={false}
                style={[styles.inputcontrol2, Error && styles.inputError2]}
                placeholder='******'
                placeholderTextColor='#6b7280'
                value={password2}
                onChangeText={(text2) => {
                  setPassword2(text2);
                  if (text2.trim()) setError(false);
                }}
              />
              {Error && (
                <Text style={{ color: 'red', marginTop: 5, left: 20 }}>
                  Enter new password
                </Text>
              )}
              <TouchableOpacity
                style={styles.icon}
                onPress={() => setShowPassword2(!showPassword2)}
              >
                <Ionicons
                  name={showPassword2 ? "eye-off" : "eye"}
                  size={24}
                  color="#666"
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.input}>
            <Text style={styles.inputLabel}>Confirm password</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                secureTextEntry={showPassword}
                autoCapitalize='none'
                autoCorrect={false}
                style={[styles.inputcontrol, passwordError && styles.inputError]}
                placeholder='******'
                placeholderTextColor='#6b7280'
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  if (text === password2) setPasswordError(false);
                }}
              />
              {passwordError && (
                <Text style={{ color: 'red', marginTop: 5, left: 20 }}>
                  Passwords do not match
                </Text>
              )}
              <TouchableOpacity
                style={styles.icon}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Ionicons
                  name={showPassword ? "eye-off" : "eye"}
                  size={24}
                  color="#666"
                />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            onPress={handleNext}
            style={styles.button}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? 'Resetting...' : 'Reset'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 435,
    height: 750,
    backgroundColor: "#15ff00",
    justifyContent: 'center',
    marginTop: 90,
    borderRadius: 50,
    top: 30,
    left: 2,
  },
  headerImg: {
    width: 30,
    height: 30,
    top: 90,
    marginLeft: 20,
  },
  input: {
    marginBottom: 10,
  },
  input2: {
    marginBottom: 10,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "#041614",
    marginBottom: 50,
    marginLeft: 20,
    marginTop: 20,
    bottom: 20,
  },
  inputLabel2: {
    fontSize: 16,
    fontWeight: "500",
    color: "#041614",
    marginBottom: 50,
    marginLeft: 20,
    marginTop: 10,
  },
  inputcontrol: {
    height: 48,
    width: 400,
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 15,
    fontWeight: "500",
    color: "#222",
    marginLeft: 19,
  },
  inputcontrol2: {
    height: 48,
    width: 400,
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 15,
    fontWeight: "500",
    color: "#222",
    marginLeft: 19,
  },
  button: {
    backgroundColor: "#041614",
    width: 140,
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 100,
    left: 180,
    bottom: 360,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  inputWrapper: {
    marginBottom: 320,
    bottom: 48,
  },
  inputWrapper2: {
    marginBottom: 8,
    bottom: 30,
  },
  icon: {
    marginLeft: 350,
    position: "absolute",
    marginTop: 10,
  },
  inputError: {
    borderWidth: 2,
    borderColor: 'red',
  },
  inputError2: {
    borderWidth: 2,
    borderColor: 'red',
  },
  text: {
    fontSize: 12,
    left: 34,
    top: 70,
  },
  text2: {
    color: '#000000',
    fontSize: 34,
    fontWeight: 'bold',
    marginBottom: 20,
    top: 80,
    left: 30,
  },
});