import React from 'react';
import {View, Image, Text, StyleSheet,TouchableOpacity, Platform, Alert} from 'react-native'
import { firebase_db } from "../firebaseConfig"
import * as Application from 'expo-application';
const isIOS = Platform.OS === 'ios';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  MainPage: undefined,
  DetailPage: {idx: number};
  AboutPage: undefined;
  LikePage: undefined;
};
type data = {
    idx: number,
    category: string,
    title: string,
    image: string,
    desc: string,
    date: string
}

type DetailPageNavigationProp = NativeStackNavigationProp<RootStackParamList, 'DetailPage'>;

type Props = {
  navigation: DetailPageNavigationProp,
  content: data,
  tip: data[],
  setTip: React.Dispatch<React.SetStateAction<data[]>>
}

const LikeCard = ({content, navigation,tip, setTip}: Props) => {
    const remove = async(idx: number) => {
      let userUniqueId;
      if (isIOS) {
          let iosId = await Application.getIosIdForVendorAsync();
          userUniqueId = iosId
      } else {
          userUniqueId = await Application.androidId
      }
      firebase_db.ref('/like/' + userUniqueId + '/' + idx).remove()
      .then(() => {
        Alert.alert("삭제 완료")
        let result = tip.filter((data, i) => {
          return data.idx !== idx
        })
        setTip(result)
      })
      .catch((error) => {
        console.log("Remove failed" + error.message)
      })

    }

    return (
        <View style={styles.card} key={content.idx}>
            <Image style={styles.cardImage} source={{uri:content.image}}/>
            <View style={styles.cardText}>
                <Text style={styles.cardTitle} numberOfLines={1}>{content.title}</Text>
                <Text style={styles.cardDesc} numberOfLines={3}>{content.desc}</Text>
                <Text style={styles.cardDate}>{content.date}</Text>
                <View style={styles.buttonBox}>
                  <TouchableOpacity style={styles.Button} onPress={()=>{navigation.navigate('DetailPage',{idx:content.idx})}}><Text style={styles.buttonText}>자세히보기</Text></TouchableOpacity>
                  <TouchableOpacity style={styles.Button} onPress={()=>remove(content.idx)}><Text style={styles.buttonText}>찜 해제</Text></TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    
    card:{
      flex:1,
      flexDirection:"row",
      margin:10,
      borderBottomWidth:0.5,
      borderBottomColor:"#eee",
      paddingBottom:10
    },
    cardImage: {
      flex:1,
      width:100,
      height:100,
      borderRadius:10,
    },
    cardText: {
      flex:2,
      flexDirection:"column",
      marginLeft:10,
    },
    cardTitle: {
      fontSize:20,
      fontWeight:"700"
    },
    cardDesc: {
      fontSize:15
    },
    cardDate: {
      fontSize:10,
      color:"#A6A6A6",
    },
    buttonBox: {
      flex:1,
      flexDirection:"row",
    },
    Button: {
      flex: 1,
      padding: 10,
      borderStyle: 'solid',
      borderWidth: 1,
      borderColor:"deeppink",
      borderRadius: 10,
      margin:7
    },
    buttonText: {
      textAlign: 'center',
      color: 'deeppink'
    }
});

export default LikeCard;