import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet, Platform } from 'react-native';
import LikeCard from '../components/LikeCard';
import Card from '../components/Card';
import { firebase_db } from '../firebaseConfig';
import * as Application from 'expo-application';
const isIOS = Platform.OS === 'ios';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
    MainPage: undefined,
    DetailPage: {idx: number};
    AboutPage: undefined;
    LikePage: undefined;
};

type Props = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'DetailPage'>;
}

const LikePage = ({ navigation }: Props) => {
    const [tip, setTip] = useState([])
    const [ready, setReady] = useState(true)

    const getLikeTip = async () => {
        let userUniqueId;
        if (isIOS) {
            let iosId = await Application.getIosIdForVendorAsync();
            userUniqueId = iosId
        } else {
            userUniqueId = Application.androidId
        }
        console.log(userUniqueId)
        firebase_db.ref('/like/' + userUniqueId).once('value').then((snapshot) => {
            console.log("파이어베이스에서 데이터 가져왔습니다!!")
            let tip = snapshot.val();
            let tip_list = Object.values(tip)
            console.log(tip_list)
            if (tip_list && tip_list.length > 0) {
                setTip(tip_list)
                setReady(false)
            }
        })
    }

    useEffect(() => {
        navigation.setOptions({
            title: '꿀팁 찜'
        })
        getLikeTip()
        console.log("꿀팁 페이지")
    },[])
    return (
        <ScrollView style={styles.container}>
            {ready ? <View><Text>로딩 중...</Text></View>
            :
            tip.map((content,i)=>{
                return(<LikeCard key={i} content={content} navigation={navigation} tip={tip} setTip={setTip}/>)
            })
            }
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff"
    }
})

export default LikePage;