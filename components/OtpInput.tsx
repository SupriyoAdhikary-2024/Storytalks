import { useRef} from 'react';
import {TextInput, View, StyleSheet } from 'react-native';

export default function OtpInput({ value, onChange  } : {value: string, onChange:(val: string) => void}) {
    const inputs = useRef<(TextInput | null )[]>([]);
    const handleChange = (text: string, index: number) => {
        const newOtp = value.split('');
        newOtp[index] = text;
        onChange(newOtp.join(''));
        if (text && index < 5) {
            inputs.current[index + 1]?.focus();
        }
    };
    const handleKeyPress = (e:any, index:number) => {
        if (e.nativeEvent.key === 'Backspace' && !value[index] && index > 0) {
            inputs.current[index - 1]?.focus();
        }
    };
    return(
        <View style={styles.otpContainer}>
            {[0,1,2,3,4,5].map((index) =>(
                <TextInput 
                key={index}
                ref={(ref) => { inputs.current[index] = ref; }}
                style={[styles.otpBox, value[index] ? styles.otpBoxFilled : null]}
                maxLength={1}
                keyboardType='number-pad'
                value={value[index] || ''}
                onChangeText={(text) => handleChange(text,index)}
                onKeyPress={(e) => handleKeyPress(e,index)}
                />
            ) )}
        </View>
    );
}
 const styles = StyleSheet.create({
    otpContainer:{
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 10,
        marginBottom: 30,
        marginTop: 20,

    },
    otpBox: {
        width: 45,
        height:55,
        borderRadius: 10,
        backgroundColor: '#fff',
        textAlign:'center',
        fontSize: 22,
        fontWeight:'bold',
        color: '#000',
        borderWidth:2,
        borderColor: '#ddd',

    },
    otpBoxFilled:{
        borderColor: '#12fadb',
        borderWidth: 2,
    }
 })
