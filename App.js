import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { 
  ImageBackground,
  StyleSheet, 
  Text, 
  View, 
  SafeAreaView, 
  Image, 
  TextInput,
  TouchableHighlight,
  FlatList, 
  ScrollView,
  ActivityIndicator 
} from 'react-native';

import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';

export default function App() {
  const heroSample = "https://superheroapi.com/api/5816276808414947/226";
  var activePage = 30;
  const bgImage = {uri: "https://i.ibb.co/b5J0hG7/Group-37.png"};
  const logo = {uri: "https://i.ibb.co/qMp21HK/Group-38.png"};
  const [number, onChangeNumber] = React.useState(null);

  const [isLoading, setLoading] = useState(true);
  var [data, setData] = useState([]);
  var listOfHero = [];

      useEffect(() =>{
        setData([])
        for(let i =0 ; i<activePage;i++){
            fetch("https://superheroapi.com/api/5816276808414947/"+(i+1))
              .then((response) => response.json())
              .then((json) => setData(data => [...data,json]))
              // .then((json) => console.log(json.id))
              .catch((error) => console.log(error))
              .finally(() => setLoading(false));
          }
      }, []);
  let [fontsLoaded] = useFonts({
    'Inter-SemiBold': 'https://rsms.me/inter/font-files/Inter-SemiBoldItalic.otf?v=3.12',
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }else{
    if(data){
      return (
        <SafeAreaView style={styles.container}>
          <ImageBackground source={bgImage} style={styles.mainBackGround}>
            <Image source={require('./assets/logo.png')} style={styles.logoSize}></Image>
            <TextInput
              style={styles.input}
              onChangeText={onChangeNumber}
              value={number}
              placeholder="Search a hero"
              keyboardType="default"
            />

            <View style={styles.tabs}>
              <TouchableHighlight onPress={"hey"}>
                <View style={styles.button}>
                  <Text style={styles.tabTextsActive}>All</Text>
                </View>
              </TouchableHighlight>
              <TouchableHighlight onPress={"hey"}>
                <View style={styles.button}>
                  <Text style={styles.tabTexts}>Marvels</Text>
                </View>
              </TouchableHighlight>
              <TouchableHighlight onPress={"hey"}>
                <View style={styles.button}>
                  <Text style={styles.tabTexts}>DC</Text>
                </View>
              </TouchableHighlight>
            </View>
          {/* <Text style={{fontSize: 17}}>Primary Ability</Text> */}
            <ScrollView style={styles.scrollView}>
              {data.map(hey =>{
                    return(
                      <View style={styles.scrollStyle}>
                          <View style={{flexDirection:'column', alignItems: 'center'}}>
                            {/* <View style={styles.verticalLine}></View> */}
                            <Image source={require('./assets/brain.png')} style={{width:30,height:30, marginBottom:7}}></Image>
                            <Image source={require('./assets/shield.png')} style={{width:30,height:30, marginBottom:7}}></Image>
                            <Image source={require('./assets/strength.png')} style={{width:30,height:30, marginBottom:7}}></Image>
                            <View style={styles.verticalLine}></View>
                          </View>
                          <ImageBackground source={{uri:hey.image.url}} style={styles.cardBg} imageStyle={styles.bgBorderRadius}>
                            <Text style={styles.name}>{hey.name}</Text>
                            <Text style={styles.universe}>{hey.biography.publisher}</Text>
                          </ImageBackground>
                      </View>
                    )
                })}
            </ScrollView>
          </ImageBackground>
        </SafeAreaView>
      );
    }
    return null
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingLeft: 20,
    // paddingTop: 30,
    color: "#f1f1f1",
    // alignItems: 'center',
    justifyContent: 'flex-start',
  },
  verticalLine:{
    height: '35%',
    width: 3,
    backgroundColor: '#EBEBEB',
    // marginBottom: 20
  },
  scrollStyle:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1
  },
  name:{
    fontSize: 30,
    fontWeight: 'bold',
    fontFamily: 'Inter-SemiBold',
    textTransform: 'uppercase',
    color: '#fff'
  },
  tabTexts:{
    fontSize: 25,
    fontWeight: 'bold',
    color: '#B4B2B2',
    fontFamily: 'Inter-SemiBold'
  },
  tabTextsActive:{
    fontSize: 25,
    fontWeight: 'bold',
    fontFamily: 'Inter-SemiBold'
  },
  tabs:{
      flexDirection: 'row',
      fontSize: 40,
      justifyContent: 'flex-start'
  },
  button: {
    alignItems: 'flex-start',
    fontSize: 30,
    // backgroundColor: "#DDDDDD",
    padding: 10
  },
  universe:{
    fontSize: 15,
    color: '#ECE50F',
    fontWeight: "900"
  },
  cardBg:{
    width: 320,
    height: 200,
    marginBottom: 30,
    // alignSelf: 'right',
    // flex: 1,
    paddingBottom: 10,
    paddingRight: 20,
    paddingLeft: 20,
    justifyContent: "flex-end",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.03,
    shadowRadius: 6.68,
    elevation: 11,
    fontSize: 15,
    alignSelf: 'flex-end'
  },
  scrollView:{
    // marginVertical: 0
    paddingLeft: 10,
    paddingRight: 10
  },
  bgBorderRadius:{
    borderRadius: 15,
  },
  input:{
    width: "95%",
    marginTop: 40,
    marginBottom: 15,
    backgroundColor: "#fff",
    borderRadius: 20,
    shadowColor: "#000",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom:10,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.03,
    shadowRadius: 6.68,
    elevation: 11,
    fontSize: 15
  },
  fontStyles:{
    fontWeight: 'bold',
    marginBottom: 10
  },
  fontStylesNoSpace:{
    fontWeight: 'bold',
    fontSize: 20
  },
  logoSize:{
    width: 200,
    height: 70
  },  
  mainBackGround:{
    paddingTop: 40,
    paddingBottom: 20,
    paddingRight: 10,
    paddingLeft:10,
    resizeMode: 'cover',
    flex: 1,
    justifyContent: 'flex-start'
  }
  
});
