import React,{ useEffect } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import * as Linking from 'expo-linking';

type RootStackParamList = {
  MainPage: undefined;
  DetailPage: undefined;
  AboutPage: undefined;
};

type Props = StackScreenProps<RootStackParamList, 'AboutPage'>;

const AboutPage = ({navigation,route}: Props) => {
    useEffect(()=>{
        navigation.setOptions({
            title: '소개 페이지',
            headerStyle: {
                backgroundColor: '#1F266A',
                shadowColor: "#000",
            },
            headerTintColor: "#fff",
        })
    },[])

    const link = () => {
        Linking.openURL("https://www.instagram.com/suweon_v/")
    }

    return (
            <ScrollView indicatorStyle={"white"} style={styles.container}>
                <View style={styles.innerView}>
                    <Text style={styles.title}>HI! 스파르타코딩 앱개발 반에 오신것을 환영합니다</Text>
                    <View style={styles.innerContainer}>
                            <Image style={styles.thumb} source={{uri:"https://storage.googleapis.com/sparta-image.appspot.com/lecture/about.png"}}/>
                            <Text style={styles.desc01}>많은 내용을 간격하게 담아내려 노력했습니다!</Text>
                            <Text style={styles.desc02}>꼭 완주 하셔서 여러분것으로 만들어가시길 바랍니다</Text>
                            <TouchableOpacity style={styles.buttonBox} onPress={() => link()}><Text style={styles.buttonText}>여러분의 인스타 계정</Text></TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:"#1F266A",
    },
    innerView: {
        alignItems: "center"
    },
    title: {
        color: "#fff",
        fontSize: 30,
        width: 300,
        paddingTop: 50,
        paddingBottom: 50,
        lineHeight: 35
    },
    innerContainer: {
        backgroundColor: "#fff",
        borderRadius: 10,
        width: 300,
        height: 500,
        marginBottom: 50,
        alignItems: 'center',
        justifyContent: "center"
    },
    thumb: {
        width: 150,
        height: 150,
        borderRadius: 15
    },
    desc01: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        padding: 30
    },
    desc02: {
        fontWeight: 'bold',
        padding: 35,
        textAlign: 'center',
        paddingTop: 0
    },
    buttonBox: {
        width: 180,
        padding: 20,
        backgroundColor: 'orange',
        borderRadius: 15,
    },
    buttonText: {
        textAlign: 'center',
        color: "#fff"

    }

})

export default AboutPage;