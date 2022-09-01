/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
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

} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';





const App = ()  => {

  
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
    
        const verification = await response.json();
        console.log(verification)
        };
        
        
    
        
    //---------------------------------------------------------- 
   
        
    getRestaurantInfo()
    
    //postNewEvent()
    //getAllReservations()
  
                    

  return (
    <View>
      <View >
        <Text style={styles.topBar}> Saghna</Text>
      </View>
    </View>
    
  );
};

const styles = StyleSheet.create({
  topBar: {
    backgroundColor: '#E94E1B',
    height: '45%',
    fontSize: 40,
    fontWeight: '600'
  }

});

export default App;
