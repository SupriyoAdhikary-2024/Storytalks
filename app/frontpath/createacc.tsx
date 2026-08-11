import { db } from '@/config/Firebase';
import { useUser } from '@/context/UserContext';
import { useRouter } from 'expo-router';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useState } from 'react';
import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function createacc()
{

  const [Error ,setError]=useState(false);
  const {setusername} = useUser();
  const [input,setinput] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleNext = async () => {
    if (!input.trim()) {
      setError(true);
      return;
    }
    try {
      const q = query(collection(db, "users"), where("username","==", input.trim()));
      const querySnapshot = await getDocs(q);
      if(!querySnapshot.empty)
      {
        Alert.alert('Username already exists', 'Please choose a different username.');
        return;
      }
    
    

    setError(false);
    setusername(input.trim());
    router.push("../frontpath/createacc2");
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
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
   
     
        
      <Text style={styles.heading}>What should we call you?</Text>

        <View style={styles.container}>
          <View style={styles.form}>
                    <View style={styles.input}>
                      <Text style={styles.inputLabel}> Enter the name you'd like to be called by :-</Text>
                      <TextInput 
                        autoCapitalize='none'
                        autoCorrect={true}
                        maxLength={20}
                        style={[styles.inputcontrol, Error && styles.inputError]}
                        placeholder=' username...'
                        value={input}
                        onChangeText={(text) => {
                          setinput(text);
                          if (text.trim()) setError(false);
                        }}
                        placeholderTextColor='#6b7280'
                      />
                      {Error && (
                        <Text style={styles.errorText}>please enter a username</Text>
                      )}
                    </View>
                                   
                                       
                                       
                                         
                                           
                        <TouchableOpacity onPress={handleNext} style={styles.button}><Text style={styles.buttonText}>
                                                                                                               
                                                                                                                
                                                                                                               
                                                                                                                 Next</Text>
                                                                                                               </TouchableOpacity>
                                         
                                          
                                          
                                      
                                      
                                   
                                  

        </View>
      
        </View>
      

    </View>
    </SafeAreaView>
  )
}



const styles = StyleSheet.create({
  container: {
    width: 435,
    height: 750,
    backgroundColor: "#12fadb",
    justifyContent: 'center',
    marginTop: 100,
    top:40,
    borderRadius: 50,
  },
  errorText: {
    color:'red',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 19,

  },
  inputError:{
    borderWidth: 2,
    borderColor: 'red',
  
  },
  input: {
    marginBottom: 10,
},
form:{
    marginBottom: 24,
    flex:1,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "400",
    color: "#041614",
    marginBottom: 30,
    marginLeft: 20,
    marginTop: 30,
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
  formAction: {
    marginTop: 24,
  },
  button: {
    backgroundColor: "#041614",
    width: 90,
    height: 50,
    borderRadius: 10,
    
      justifyContent: "center",
    alignItems: "center",
  
    left: 330,

  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  headerImg: {
    width: 30,

    height: 30,
    top: 90,
    marginLeft: 20,

   
  },
  heading: {
    color: '#000000',
    fontSize: 34,
    fontWeight: 'bold',
    marginBottom: 20,
    top: 80,
    left: 15,
    
  },
  
});
