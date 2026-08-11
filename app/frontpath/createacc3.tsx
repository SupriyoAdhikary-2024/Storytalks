import OtpInput from '@/components/OtpInput';
import { supabase } from '@/config/supabase';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function createacc3() {
  const router = useRouter();
  const { phoneNumber } = useLocalSearchParams<{ phoneNumber: string}>();
  
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [countdown, setcountdown] = useState(60);
  const [canResend, setcanResend] = useState(false);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setcountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setcanResend(true);
    }
  }, [countdown]);
   
  const resendOTP = async () => {
    setLoading(true);
    try{
      const{ error } = await supabase.auth.signInWithOtp({
        phone: `+91${phoneNumber}`,
      });
      if (error) throw error;
      Alert.alert('OTP Sent!', 'Check your phone');
      setcountdown(60);
      setcanResend(false);
      setOtp('');
    } catch (error: any){
      Alert.alert('Error', error.message);
    }
     setLoading(false)
    };

  // Verify OTP
  const verifyOTP = async () => {
    if (!otp.trim() || otp.length !== 6) {
      Alert.alert('Error', 'Enter valid 6 digit OTP');
      return;
    }
    
    setLoading(true);
    try {
      const { error } = await supabase.auth.verifyOtp({
        phone: `+91${phoneNumber}`,
        token: otp,
        type: 'sms',
      });
      if (error) throw error;
      Alert.alert('Success!', 'Phone verified ✅');
      router.push('/frontpath/createacc6');
    } catch (error: any) {
      Alert.alert('Wrong OTP', error.message);
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
             
                          <Text style={styles.title}>Enter OTP</Text>
                          <Text style={styles.subtitle}>
                            OTP sent to +91 {phoneNumber}
                          </Text>
                        <View style={styles.container}>
                          <View style={{
                            position: 'relative',
                            bottom: 280,
                            alignItems: 'center',
                          }}>
                          <OtpInput
                          
                            
                            value={otp}
                            onChange={setOtp}
                          />
                          {/* countdown timer */}
                            { !canResend ? (
                              <Text style={styles.countdownText}>
                                Resend OTP in {''}
                                <Text style={styles.countdownNumber}>{countdown}s </Text>
                              </Text>
                            ) : (
                                <TouchableOpacity onPress={resendOTP} disabled={loading} style={styles.resendotpBtn}>
                                  <Text style={styles.resendotpText}>{loading ? 'Sending...' : 'Resend OTP'}</Text>
                                </TouchableOpacity>
                            ) }
                          </View>
                          <TouchableOpacity
                            style={styles.button}
                            onPress={verifyOTP}
                            disabled={loading}
                          >
                            <Text style={styles.buttonText}>
                              {loading ? 'Verifying...' : 'Verify OTP'}
                            </Text>
                          </TouchableOpacity>
                        
                          </View>
                        
                
              
                      
                      
                    
                  
                  </SafeAreaView>
     ); 
    }
              
const styles = StyleSheet.create({
  container: {
    width: 435,
    height: 780,
    backgroundColor: "#12fadb",
    justifyContent: 'center',
    marginTop: 100,
    bottom:10,
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
    top: 55,
    left: 40,
  },
  
  
  subtitle: {
    fontSize: 15,
    color: '#666',
    top:40,
    left:40,
  
  

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
    width:300,
    left:65,
    bottom:280,
  },
  button: {
     backgroundColor: "#ff1d1d",
    width: 90,
    height: 50,
    borderRadius: 10,
    
      justifyContent: "center",
    alignItems: "center",
  
  
    left: 175,
    bottom:270,
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
    color: '#ff0000',
    fontSize: 14,
    bottom:347,
    borderBlockColor:'rgba(0, 0, 0, 0.2)',
    left:130,

    
  },
  countdownText: {
    fontSize: 14,
    color: '#666',
    marginTop: 10,
    textAlign: 'center',
    right: 130,
    bottom: 20,
  },
  countdownNumber: {
    color: '#ff470f',
    fontWeight: 'bold',
  },
  resendotpBtn: {
    marginTop: 12,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    
    bottom: 20,
    left: 130,
  },
  resendotpText: {
    color: '#ff470f',
    fontSize: 14,
    fontWeight: '600',
  },
 
});

