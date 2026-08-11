import { useUser } from '@/context/UserContext'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function createacc6()
 {
  const [Error ,setError]=useState(false);
  const router = useRouter()
  const [form, setForm] = useState({ Name: '' })
  const[passwordError,setPasswordError] = useState(false);
  const{setpassword} = useUser();
  
  
  const [password,setPassword] = useState("")
  const [password2,setPassword2] = useState('');
  const [input, setinput] = useState("");
 
   const [showPassword, setShowPassword] = useState(true);
    const [showPassword2 ,setShowPassword2] = useState(true);
     const handleNext = () => {
    if (!password2.trim()) { //empty password
      setError(true);
      return;
    }
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;
    if (!passwordPattern.test(password2)) {
      Alert.alert('weak password', 'Password must be at least 6 characters long and include at least one letter, one number, and one special character.');
      return;
    }
    if (password2 !== password){
      setPasswordError(true);
      return;
    }
    setError(false);
    setPasswordError(false);
    setpassword(password2);
    router.push("../frontpath/createacc4");
    
  };


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
    <View className='flex-1 justify-center bg-white'>
       <TouchableOpacity onPress={() => router.back()} style={{ position: 'absolute', top: -75, left: -2,  }}>
                  <Image 
                    source={require("@/assets/images/arrow-left.png")} 
                    style={styles.headerImg}
                    resizeMode="cover"
                   
                    />
                </TouchableOpacity>
      <Text style={ styles.text2}>Create Password</Text>
      <Text style={ styles.text } >please use #,@ for creating strong password</Text>

        <View style={styles.container}>
          <View style={styles.input2}>
            <Text style={styles.inputLabel2}>create password</Text>
            { password2.length > 0 && (
              <View style={{ marginLeft: 20, marginTop: 10 }}>
              <Text style={{ color: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/.test(password2) ? 'green' : 'red' , fontSize: 12 }}>
                { /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/.test(password2) ? 'Strong password' : 'Weak password' }
              </Text>
            </View> 
            

            )}
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
                <Text style={{ color: 'red', marginTop: 5 , left:20}}>
                  enter or create Password 
                </Text>
              )}
              <TouchableOpacity
                style={styles.icon}
                onPress={() => setShowPassword2(!showPassword2)}
              >
                <Ionicons
                  name={showPassword2 ? "eye-off" : "eye"}
                  size={24}
                  left={20}
                  color="#666"
                />
              </TouchableOpacity>
            </View>
          </View>
         
                      <View style={styles.input}>
            <Text style={styles.inputLabel}>confirm password</Text>
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
              {passwordError
               && (
                <Text style={{ color: 'red', marginTop: 5, left:20 }}>
                  password do not match
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
                  left={20}
                />
              </TouchableOpacity>
            </View>
          </View>
                                  
                                   
                                       
                                       
                                          
                                           <TouchableOpacity onPress={handleNext} style={styles.button}><Text style={styles.buttonText}>
                                                                                                                                                          
                                                                                                                                                           
                                                                                                                                                          
                                            Next</Text>
                                          </TouchableOpacity>
                                                                                    
                                         
                                          
                                      
                                      
                                   
                                  

        </View>
      
        </View>
      

    
    </SafeAreaView>
  )
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
    left:2,
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
form:{
    marginBottom: 24,
    flex:1,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "#041614",
    marginBottom: 50,
    marginLeft: 20,
    marginTop: 20,
    bottom:20,
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
  formAction: {
    marginTop: 24,
  },
  button: {
    backgroundColor: "#041614",
    width: 100,
    height: 50,
    borderRadius: 10,
    
      justifyContent: "center",
    alignItems: "center",
  
    marginLeft: 100,
    left: 215,
    bottom:360,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
   inputWrapper: {
    marginBottom: 320,
    bottom:48,
  },
  inputWrapper2: {
    marginBottom: 8,
    bottom:30,
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
