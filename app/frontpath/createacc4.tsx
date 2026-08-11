import { useUser } from '@/context/UserContext';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  Vibration,
  View
} from 'react-native';

const DATA = [
  { id: '1', title: 'English' },
  { id: '2', title: 'hindi' },
  { id: '3', title: 'বাংলা' },
  { id: '4', title: 'తెలుగు' },
  { id: '5', title: 'தமிழ்' },
  { id: '6', title: 'ગુજરાતી' },
  { id: '7', title: 'मराठी' },
  { id: '8', title: 'অসমীয়া' },
];

export default function App() {
  const router = useRouter();  // ✅ moved to top
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const { setLanguages } = useUser();

  const handleNext = () => {
    if (selectedItems.length < 2) {
      Alert.alert('Error', 'Please select at least 2 languages');
      return;
    }

    // ✅ Save language NAMES not IDs
    const selectedLanguageNames = DATA
      .filter(item => selectedItems.includes(item.id))
      .map(item => item.title);

     console.log('saving languages:', selectedLanguageNames); 
    setLanguages(selectedLanguageNames);  // ✅ saves names like ['English', 'हिन्दी']
    router.push('/frontpath/createacc5');
  };

  const toggleSelect = (id: string) => {
    Vibration.vibrate(40);
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter(item => item !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const renderItem = ({ item }: { item: { id: string; title: string } }) => {
    const isSelected = selectedItems.includes(item.id);

    return (
      <TouchableOpacity
        style={[styles.card, isSelected && styles.selectedCard]}
        onPress={() => toggleSelect(item.id)}
      >
        {isSelected && (
          <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>✓</Text>
        )}
        <Text style={[styles.text, isSelected && styles.selectedText]}>
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => router.back()}
        style={{ position: 'absolute', top: -45, left: -2 }}
      >
        <Image
          source={require("@/assets/images/arrow-left.png")}
          style={styles.headerImg}
          resizeMode="cover"
        />
      </TouchableOpacity>

      <Text style={styles.heading}>
        How many languages do you know?
      </Text>
      <Text style={{ color: '#000000', fontSize: 13, fontStyle: 'italic', marginBottom: 20, top: 20 }}>
        Select at least 2 languages
      </Text>

      <View style={styles.box}>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'center' }}
        />
        <TouchableOpacity
          style={[
            styles.nextBtn,
            selectedItems.length < 2 && styles.nextBtnDisabled
          ]}
          onPress={handleNext}
        >
          <Text style={styles.nextText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffefe',
    padding: 20,
    paddingTop: 60,
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
    top: 30,
  },
  card: {
    width: 200,
    height: 100,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    top: 30,
    borderWidth: 2,
    borderColor: 'transparent',
    marginHorizontal: 5,
  },
  selectedCard: {
    backgroundColor: '#c4c6c7',
    borderColor: 'white',
  },
  text: {
    color: '#000000',
    fontSize: 18,
    fontWeight: '600',
  },
  selectedText: {
    color: 'black',
  },
  box: {
    width: 435,
    height: 780,
    backgroundColor: "#6cff5f",
    justifyContent: 'center',
    marginTop: 90,
    borderRadius: 50,
    bottom: 40,
    right: 20,
  },
  nextBtn: {
    position: 'absolute',
    backgroundColor: '#041614',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 12,
    left: 320,
    bottom: 220,
  },
  nextBtnDisabled: {
    backgroundColor: '#999'
  },
  nextText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  langBoxSelected: {
    borderColor: '#000',
    backgroundColor: '#e0ffe0',
  }
});