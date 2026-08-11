
import { useUser } from "@/context/UserContext";
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

export default function createacc7() {
  const{ username } = useUser();
  const [image,setImage]=useState<string | null >(null);
  const[modalVisible,setmodalVisible]=useState(false);
  
  //Open camera function
  
  const openCamera= async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (permission.granted === false) {
      alert("permission to access camera is required!");
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
    allowsEditing: true,
    aspect: [1, 1],
    quality: 1,
  });
  if (!result.canceled) {
    setImage(result.assets[0].uri);
  }
};

   
  const pickImage = async () => {
    //Ask permission to access media library
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (permission.granted === false) {
        alert("Permission to access media library is required!");
        return;
      }
      //Open gallery
      const result= await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing:true,
        aspect:[1,1], //square crop
        quality:1,  

      });
      if (!result.canceled){
        setImage(result.assets[0].uri);
      }
  };
  const router = useRouter();




  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fffb00" }}>
      <View style={styles.container}>
        <Text style={styles.subtitle}>Upload a profile picture</Text>
        {/*Image upload section*/}
        <TouchableOpacity style={styles.imageContainer} onPress ={() => setmodalVisible(true)}>
          {image?(
            <Image source={{uri:image}} style={styles.profileImage}/>
          ):(
            <View style={styles.placeholder}>
             <Image style={styles.customer} source={require('@/assets/images/customer.png')} />
             
            </View>
          
          )}
      
          
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setmodalVisible(true)}>
           <Image style={styles.placeholderText} source={require('@/assets/images/camera3.png')} />
           </TouchableOpacity>
          {/*single picture button*/}
          <TouchableOpacity style={styles.addBtn} onPress={() => setmodalVisible(true)}>
            <Text style={styles.addBtnText}>
               Add Photo
      
            </Text>
        
          </TouchableOpacity>
          
           
           {/* bottom sheet modal */}
           <Modal
            transparent={true}
            visible={modalVisible}
            animationType="slide"
            onRequestClose={() => setmodalVisible(false)}
            >
              {/* dark background */}
              <TouchableOpacity 
               style={styles.overlay}
               onPress={() => setmodalVisible(false)}
              />
              {/*white card */}
              <View style={styles.bottomsheet}>
                <Text style={styles.sheetTitle}>Add Photo</Text>
                <View style={styles.optionsRow}>
                  {/*Camera*/}
                  <TouchableOpacity style={styles.optionItem} onPress={openCamera}>
                    <View style={styles.optionIcon}>
                      <Image style={styles.optionEmoji} source={require('@/assets/images/camera.png')}></Image>

                    </View>
                    <Text style={styles.optionLabel}>Camera</Text>
                  </TouchableOpacity>
                  {/*Gallery*/}
                  <TouchableOpacity style={styles.optionItem} onPress={pickImage}>
                    <View style={styles.optionIcon}>
                      <Image style={styles.optionEmoji} source={require('@/assets/images/upload.png')}></Image>
                    </View>
                    <Text style={styles.optionLabel}>Upload Image</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
            <Text style={styles.welcome}>Welcome, {username}</Text>
            <Text style={styles.ortext}>---------------- OR ----------------</Text>
            <TouchableOpacity style={ styles.addBtn2} onPress={() =>
              router.push({pathname:"../frontpath/createacc8"})
            }><Text style={styles.addBtnText2}>Continue</Text><Image style={styles.continueIcon} source={require('@/assets/images/continue.png')}></Image></TouchableOpacity>
            

      </View>
     
    
     
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  text:{
    fontSize:30,
    justifyContent:'center',
    alignItems:'center',
    left:80,
    color:'#080808',

    

  },
  continueIcon:{
    width:23,
    height:23,
    left:10,
    top:0.5,
  },

  image:{
    borderRadius:75,
    width:150,
    height:150,
    borderColor:'#797878',
    borderWidth:5,
  },
  editButton:{
    backgroundColor:'#fff',
    borderRadius:24,
    padding:8,
    position:'absolute',
    right:5,
    bottom:5,
  },
  container:{
    flex:1,
    backgroundColor:'#fffb00',
    justifyContent:'center',
    alignItems:'center',
  },
  welcome:{
    fontSize:40,
    color:'#161616',
    fontWeight:'600',
    marginBottom:8,
    bottom:150,
    right:40,
  },
subtitle:{
  fontSize:16,
  color:'#555',
  marginBottom:30,
  bottom:230,

},
imageContainer:{
  width:150,
  height:150,
  borderRadius:75,
  overflow:'hidden',
  backgroundColor:'#ddd',
  justifyContent:'center',
  alignItems:'center',
  borderWidth:3,
  borderColor:'#000000',
  bottom:200,

},
profileImage:{
  width:150,
  height:150,
  borderRadius:75,
},
placeholder:{
  justifyContent:'center',
  alignItems:'center',
},
placeholderText:{
  width:25,
  height:25,
  left:61,
  bottom:295,


},
placeholderLabel:{
  fontSize:12,
  color:'#888',
  marginTop:6,

},
changeBtn:{
  marginTop:16,
  backgroundColor:'#041614',
  paddingVertical:10,
  paddingHorizontal:24,
  borderRadius:10,
},
changeBtnText:{
  color:'#fff',
  fontWeight:'600',
  fontSize:14,
  
},
addBtn:{
 backgroundColor: "#ff0000",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ffffff",
    borderStyle: "solid",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    width:300,
    top: 222,

    

},
addBtnText:{
  color: "#fff",
  fontWeight:'600',
  fontSize:16,
},
addBtnText2:{
  color: "#0000",
  fontWeight:'600',
  fontSize:18,
},
overlay :{
  flex:1,
    backgroundColor:'rgba(214, 203, 203, 0.5)',

},
bottomsheet:{
  backgroundColor:"#fff",
  borderTopLeftRadius:24,
  borderTopRightRadius:24,
  padding:24,
  borderRadius:30,
  height:270,
  
},
sheetTitle: {
  fontSize: 18,
  fontWeight:'bold',
  textAlign:'center',
  marginBottom:24,
  bottom:20,

},
optionsRow:{
  flexDirection:'row',
  justifyContent:'center',
  gap:24,

},
optionItem:{
  alignItems:'center',
  gap:8,
},
optionIcon:{
  width:150,
  height:150,
  borderRadius:16,
  backgroundColor:"#f5f5f5",
  justifyContent : 'center',
  alignItems:'center',
  bottom:40,
  
},
optionEmoji:{
  height:50,
  width:50,
},
optionLabel:{
  fontSize:13,
  fontWeight:'500',
  color:'#333',
  bottom:40,
},
customer: {
  width: 150,
  height: 150,
  top: 10,
},
ortext:{
  fontSize:16,
  alignItems:"center",
  justifyContent:"center",
  top: 180,
},
addBtn2:{
 backgroundColor: "#ffffff",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#6e6d6d",
    borderStyle: "solid",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    width:300,
    top: 200,
},


});
    

