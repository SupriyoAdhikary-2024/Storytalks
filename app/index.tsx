import { db } from '@/config/Firebase';
import { useUser } from '@/context/UserContext';
import { Ionicons } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useRef, useState } from 'react';
import { Alert, Animated, Image, Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import "./globals.css";

export default function Example() {
 const [usernameError, setUsernameError] = useState(false);
const [passwordError, setPasswordError] = useState(false);
const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { setusername } = useUser();
  const [showPassword, setShowPassword] = useState(true);
  const [password, setPassword] = useState("");
  const [input, setinput] = useState("");

  // Animation values
  const logoHeight = useRef(new Animated.Value(300)).current;
  const logoOpacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const show = Keyboard.addListener('keyboardDidShow', () => {
      Animated.parallel([
        Animated.timing(logoHeight, {
          toValue: 80,
          duration: 250,
          useNativeDriver: false,
        }),
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 250,
          useNativeDriver: false,
        }),
      ]).start();
    });

    const hide = Keyboard.addListener('keyboardDidHide', () => {
      Animated.parallel([
        Animated.timing(logoHeight, {
          toValue: 300,
          duration: 250,
          useNativeDriver: false,
        }),
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 250,
          useNativeDriver: false,
        }),
      ]).start();
    });

    return () => {
      show.remove();
      hide.remove();
    };
  }, []);

  const handleNext = async () => {
    //reset errors
    setUsernameError(false);
    setPasswordError(false);
    //empty fields check
    if (!input.trim()) {
      setUsernameError(true);
      return;
    }
    if (!password.trim()) {
      setPasswordError(true);
      return;
    }
    try {
      setLoading(true);
       const q = query(collection(db, "users"), where("username","==",input.trim())
      );
      const querySnapshot = await getDocs(q);
      //username not found
      if (querySnapshot.empty){
        setUsernameError(true);
        setLoading(false);
        return;
      }
      const user = querySnapshot.docs[0].data();
      //password mismatch
      if (user.password !== password){
        setPasswordError(true);
        setLoading(false);
        return;
      }
      //successful login
      setusername(user.username);
      router.push("/home");
    } catch (error) {
      console.error("Error during login:", error);
      Alert.alert("Login Error", "An error occurred during login. Please try again.");
    } 
  };
 
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#eefc30" }}>
      <View style={styles.container}>

        {/* Logo - shrinks when keyboard opens */}
        <Animated.View style={{ height: logoHeight, opacity: logoOpacity, overflow: 'hidden' }}>
          <Image
            source={require("@/assets/images/story_talks.png")} 
            style={styles.headerImg}
            resizeMode="contain"
          />
        </Animated.View>

        {/* Form */}
        <View style={styles.form}>
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Username</Text>
            <TextInput 
              autoCapitalize='none'
              autoCorrect={false}
              maxLength={20}
              style={[styles.inputcontrol, usernameError && styles.inputError]}
              placeholder='enter your username'
              placeholderTextColor='#6b7280'
              value={input}
              onChangeText={(text) => {
                setinput(text);
                if (text.trim()) setUsernameError(false);
              }}
            />
            {usernameError && (
              <Text style={{ color: 'red', marginTop: 5 }}>
                Username is required
              </Text>
            )}
          </View>
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Password</Text>
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
                  if (text.trim()) setPasswordError(false);
                }}
              />
              {passwordError && (
                <Text style={{ color: 'red', marginTop: 5 }}>
                  Password is required
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
          <Text className='ml-[70%]'><Link href='/FP'>forgot password?</Link></Text>
          <View style={styles.formAction}>
            <TouchableOpacity onPress={handleNext} style={styles.button}>
              <Text style={styles.buttonText}>
                {loading ? 'Signing in...' : 'Sign in'}
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={{ marginTop: 'auto' }}>
            <Text className='text-2xl font-bold text-black ml-[32%]'>
              <Link href='../frontpath/createacc'>create account</Link>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
  },
  inputError: {
    borderWidth: 2,
    borderColor: 'red',
  },
  headerImg: {
    width: '100%',
    height: '100%',
    alignSelf: "center",
  },
  input: {
    marginBottom: 10,
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: "500",
    color: "#041614",
    marginBottom: 9,
  },
  inputcontrol: {
    height: 44,
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 15,
    fontWeight: "500",
    color: "#222",
  },
  inputWrapper: {
    marginBottom: 8,
  },
  icon: {
    marginLeft: 350,
    position: "absolute",
    marginTop: 10,
  },
  form: {
    marginBottom: 24,
    flex: 1,
  },
  formAction: {
    marginVertical: 24,
  },
  button: {
    backgroundColor: "#e64219",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#f03e08",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 15,
  },
});