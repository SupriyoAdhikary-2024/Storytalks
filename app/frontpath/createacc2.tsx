import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { supabase } from '@/config/supabase';
import { useUser } from '@/context/UserContext';

export default function createacc2() {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const {setPhone} = useUser();

  // Send OTP
    const sendOTP = async () => {
    if (!phoneNumber.trim() || phoneNumber.length !== 10) {
      Alert.alert('Error', 'Enter valid 10 digit number');
      return;
    }
    setPhone(`+91${phoneNumber}`);
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOtp({
        phone: `+91${phoneNumber}`,
      });
      if (error) throw error;
      setStep(2);
      Alert.alert('OTP Sent!', 'Check your phone'); 
      router.push({
        pathname:'/frontpath/createacc3',
        params: { phoneNumber: phoneNumber}
    });
      
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
    setLoading(false);
  };

 
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <TouchableOpacity onPress={() => router.back()} style={{ position: 'absolute', top: -40, left: -2,  }}>
            <Image 
              source={require("@/assets/images/arrow-left.png")} 
              style={styles.headerImg}
              resizeMode="cover"
             
              />
          </TouchableOpacity>
         
     
            <Text style={styles.title}>Enter Phone Number</Text>
            <Text style={styles.subtitle}>
              We'll send you a verification code
            </Text>
             <View style={styles.container}>
        
           
            <View style={styles.phoneRow}>
              <View style={styles.countryCode}>
                <Text style={styles.countryText}>+91</Text>
              </View>
              <TextInput
                style={styles.phoneInput}
                placeholder='Enter phone number'
                placeholderTextColor='#888'
                keyboardType='phone-pad'
                maxLength={10}
                value={phoneNumber}
                onChangeText={setPhoneNumber}
              />
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={sendOTP}
              disabled={loading}
            >
              <Text style={styles.buttonText}>
                {loading ? 'Sending...' : 'Send OTP'}
              </Text>
            </TouchableOpacity>
          
         

      </View>
    
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    width: 435,
    height: 750,
    backgroundColor: "#12fadb",
    justifyContent: 'center',
    marginTop: 100,
    bottom:30,
    borderRadius: 50,
  },
  headerImg: {
    width: 30,

    height: 30,
    top: 90,
    marginLeft: 20,

   
  },
  title: {
   color: '#000000',
    fontSize: 34,
    fontWeight: 'bold',
    marginBottom: 20,
    top: 60,
    left: 15,
  },
  
  
  subtitle: {
    fontSize: 15,
    color: '#666',
    marginBottom: 30,
    top:48,
    left:20,

  },
  phoneRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  countryCode: {
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    paddingHorizontal: 16,
    justifyContent: 'center',
    height: 50,
    left: 7,
    bottom:250,
  },
  countryText: {
    fontSize: 16,
    fontWeight: '600',
  },
  phoneInput: {
    
    width:350,
    height: 50,
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#000',
    left:6,
    bottom:250,
  },
  otpInput: {
    height: 50,
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 20,
    letterSpacing: 8,
    color: '#000',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
     backgroundColor: "#ff1d1d",
    width: 90,
    height: 50,
    borderRadius: 10,
    
      justifyContent: "center",
    alignItems: "center",
  
    left: 330,
    bottom:250,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  resendBtn: {
    alignItems: 'center',
    marginTop: 10,
  },
  resendText: {
    color: '#e64219',
    fontSize: 14,
  },
});