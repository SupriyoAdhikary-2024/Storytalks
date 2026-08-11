import { useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import {
    Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');
const SLIDES = [
    {
        id:'1',
        title:'welcome to StoryTalks',
        description: 'Share your stories with the world and connect with people',
        backgroundColor:'#43e8fd',
        emoji:'0_0'
    },
    {
        id:'2',
        title:'talk in Any language',
        description:'connect with people from different regions ',
        backgroundColor:'#ffea29',
        emoji:'(__('

    },
    {
        id:'3',
        title:'share your moments ',
        description:'Upload photos. Videos , and share your daily moments',
        backgroundColor:'#6cff5f',
        emoji:'*_*'
    },
    {
        id:'4',
        title:'lets get started',
        description:'Your journey begins Now ',
        backgroundColor:'#ff52e2',
        emoji:'%-%'
    },

];

export default function createacc8(){
    
    const router = useRouter();
    const flatListRef = useRef<FlatList<any> | null>(null);
    const [currentIndex , setcurrentIndex]=useState<number>(0);
    const handleNext = () => {
        if (currentIndex < SLIDES.length - 1){
            flatListRef.current?.scrollToIndex({ //go to next slide
                index: currentIndex + 1,
                animated: true,
            });
            setcurrentIndex(currentIndex + 1);

        }else{
            router.push('/home');
        }
    };
    const handleSkip = () => {
        router.push('/home')
    };
    const onViewableItemsChanged = useRef(({ viewableItems}: any) => {
        if (viewableItems.length > 0){
            setcurrentIndex(viewableItems[0].index ?? 0);
        }
    }).current;
    const renderSlide = ({ item }: {item: typeof SLIDES[0] }) => {
        return(
            <View style={[styles.slide, {backgroundColor: item.backgroundColor}]}>
                <Text style={styles.emoji}>{item.emoji}</Text>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
            </View>
        );
    };
    return(
        <SafeAreaView style={[styles.container,{backgroundColor: SLIDES[currentIndex].backgroundColor }]}
        edges={['top','bottom']}>
            {/* skip button*/}
            {currentIndex < SLIDES.length - 1 && (
                <TouchableOpacity style={styles.skipBtn} onPress={handleSkip}>
                    <Text style={styles.skipText}>Skip</Text>
                </TouchableOpacity>
            )}
            {/* slides */}
            <FlatList
            ref={flatListRef}
            data={SLIDES}
            renderItem={renderSlide}
            keyExtractor={(item) => item.id}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onViewableItemsChanged={onViewableItemsChanged}
            viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50}}
            scrollEventThrottle={10}
          

            />
            {/*Bottom section*/}
            
                {/* dots*/}
                <View style={styles.dotsContainer}>
                    {SLIDES.map((_, index) => (
                        <View
                         key={index}
                         style={[
                            styles.dot,
                            currentIndex === index && styles.dotActive
                         ]}
                         />
                    ))}
                </View>
                {/* Next / Get Started button a*/}
                <TouchableOpacity style={styles.nextBtn} onPress={handleNext}>
                    <Text style={styles.nextText}>
                        {currentIndex === SLIDES.length - 1 ? "Get started" : "Next ->"}
                    </Text>
                </TouchableOpacity>
           



        
        </SafeAreaView>
    );
    
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor:'transparent',

    },
    skipBtn: {
        position:'absolute',
        top: 50,
        right: 20,
        zIndex: 10,
        backgroundColor: 'rgba(0,0,0,0.15)',
        paddingVertical: 6,
        paddingHorizontal: 16,
        borderRadius: 20,
    },
    skipText:{
        fontSize: 14,
        fontWeight: '600',
        color:'#000',


    },
    slide:{
        width: width,
        height: '100%',
        flex: 1,
        justifyContent:'center',
        alignItems: 'center',
        padding: 20,
    },
    emoji:{
        fontSize: 100,
        marginBottom: 30,


    },
    title:{
        fontSize: 30,
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'center',
        marginBottom: 16,
    },
    description:{
        fontSize: 16,
        color: ' #333',
        textAlign:'center',
        lineHeight:24,
    },
    bottom:{
        paddingVertical: 16,
        paddingHorizontal: 24,
        paddingBottom:10,
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems:'center',
        backgroundColor: 'transparent',

    },
    dotsContainer:{
        flexDirection:'row',
        gap: 8,
        bottom:50,
        left:20, 
        

    },
    dot:{
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor:'#ffffff',
    },
    dotActive:{
        width: 10,
        height: 10,
        borderRadius: 20,
        backgroundColor: '#041614',


    },
    nextBtn:{
        backgroundColor: '#ff3131',
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderRadius: 12,
        width:100,
        height:50,
        bottom:80,
        alignItems:'center',
        alignContent: 'center',
        borderColor:'#000',
        left: 300,

    },
    nextText:{
        color: '#ffffff',
        fontSize: 16,
        fontWeight:'600'
    },

});