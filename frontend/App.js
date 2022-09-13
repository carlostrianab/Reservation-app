/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */


import React, {useEffect, useState, Component} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  SafeAreaView,
  ScrollView,
  SectionList,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image

} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';





const App = ()  => {
  //APP INITIAL STATE
  const [restaurantName, setName] = useState("initialState");
  const [restaurantCountry, setCountry] = useState("initialState");
  const [restaurantLocality, setLocality] = useState("initialState");
  const [restaurantStreet, setStreet] = useState("initialState");
  const [restaurantPhoto, setPhoto] = useState("initialState");
  const [restaurantReview, setReview] = useState("initialState")
  //POST A NEW RESERVATION IN THE DATABASE 
  const postNewEvent = async () => {
    const body = {
      "name":"testing Event",
    };


    const response = await fetch("http://10.0.2.2:3000/DB/events", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    const json = await response.json();
    console.log(json)
    };

    // GET ALL RESERVATIONS FROM THE DATABASE API
    const getAllReservations = async () => {
      const response = await fetch("http://10.0.2.2:3000/DB/reservations", {
        method: "GET",
      });
      const json = response.json();
      //console.log(json)
      };




    //GET INFORMATION OF RESTAURANTS FROM THE API AND CREATE AN EVENT OBJECT THAT IS SAVED IN THE DB
      const getRestaurantInfo = async () => {
        
        const response = await fetch("http://10.0.2.2:3000/fork", {
          method: "GET"
        });
    
        const json = await response.json();
        console.log(json);
        
        
        const restaurantsObject = {
          "name": json.name,
          'type': json.servesCuisine,
          'location': json.geo,
          'address': json.address,
          'ratings':json.aggregateRatings,
          'photo': json.mainPhoto.source,
          'reservations':{
            'table1':{
              'size' : 4,
              'availability':{
                'monday': true,
                'tuesday': true,
                'wednesday':true,
                'thursday':true,
                'friday':true
              }
              
            },
            'table2':{
              'size' : 2,
              'availability':{
                'monday': true,
                'tuesday': true,
                'wednesday':true,
                'thursday':true,
                'friday':true
              }
            },
            'table3':{
              'size': 4,
              'availability':{
                'monday': true,
                'tuesday': true,
                'wednesday':true,
                'thursday':true,
                'friday':true
              }
            },
          }
          
        };


        const newEvent = await fetch("http://10.0.2.2:3000/DB/events", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(restaurantsObject)
        });
    
        /*const verification = await response.json();
        console.log(verification)
        };*/
        
        };
        
        const getInfo = async () =>{

          const eventInfo = await fetch("http://10.0.2.2:3000/DB/events", {
          method: "GET",
          });
    
       eventJson = await eventInfo.json();
       console.log(eventJson);
       
       setName(eventJson['0'].name);
       setCountry(eventJson['0'].address.country)
       setLocality(eventJson['0'].address.locality)
       setStreet(eventJson['0'].address.street)
       setPhoto(eventJson['0'].photo)
       setReview(eventJson['0'].ratings.thefork.ratingValue)
        }
        
    //---------------------------------------------------------- 
   
        
    getRestaurantInfo()
    getInfo()
    //postNewEvent()
    //getAllReservations()
  
                    

  return (
    <View>
        <View style={styles.topBar} >
          <Image
            style={{width: '50%', height: '50%', position: 'absolute'}}
            source={require('../frontend/public/SaghnaLogo.svg')}
          />
        <Text > Saghna</Text>
        </View>
        <Text style={styles.sectionTitle}> Top Picks</Text>
        <View style={styles.restaurantComponent}>
        <Text style={styles.restaurantTitle}> {restaurantName}</Text>
        <View style={styles.restaurantAddress}>
          <Text style={{fontStyle:'italic', fontSize:16}}>{restaurantLocality}, {restaurantCountry}</Text>
          <Text>{restaurantStreet}</Text>
        </View>
        <Image 
          style={styles.restaurantImage}
          source={{uri: restaurantPhoto}}
          /> 
        <Text style={styles.review}>Review: {restaurantReview}/10</Text>
      </View>
    </View>
    
  );
};

const styles = StyleSheet.create({
  restaurantComponent:{
    marginTop:20,
    alignSelf:'center',
    alignItems: 'center',
    backgroundColor: 'white',
    width:'80%',
    height: '68%',
    borderColor: '#D3D3D3',
    borderRadius:20,
    borderWidth: 3,
  },
  topBar: {
    backgroundColor: '#E94E1B',
    height: '10%',
    fontSize: 40,
    fontWeight: '600',
  },
  sectionTitle:{
    marginTop: 15,
    fontSize: 28,
    alignSelf: 'center',
    color: 'black',
    fontFamily:'poppins',
    fontWeight: '800'
  },
  restaurantTitle:{
    fontSize: 25,
    color: 'black',
    marginTop: 3
  },
  restaurantAddress:{
    marginTop: 5,
    alignItems:'center',
  },
  restaurantImage:{
    marginTop: 20,
    width: '80%',
    height: '65%',
    borderRadius:20
  },
  review:{
    marginTop: 10, 
    fontSize: 15
  }

});

export default App;
