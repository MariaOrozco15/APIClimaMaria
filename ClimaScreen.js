// Importanciones necesarias
import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import axios from 'axios';

// Defina el componente ClimaScreen como una función que devuelve la
// interfaz de usuario de la lista con el estado del clima de los países.
function ClimaScreen() {
  // Funcion/componente
  const [climaData, setClimaData] = useState(null);
  const countries = [
    //Paises centroamericanos
    'Nicaragua',
    'Costa Rica',
    'El Salvador',
    'Guatemala',
    'Honduras',
    'Panama',
    
  ];

  useEffect(() => {
    const fetchClimaData = async () => {
      try {
        const responsePromise = countries.map(country =>
          axios.get(
            `http://api.weatherapi.com/v1/current.json?key=e77d9d34a153473ab66195709233006=${country}&lang=es`,
          ),
        );
        const responses = await Promise.all(responsePromise);
        const climaDataArray = responses.map(response => response.data);
        setClimaData(climaDataArray);
      } catch (error) {
        console.error(error);
      }
    };
    fetchClimaData();
  }, []);

  // En caso que los datos del clima obtenidos sean “null” se mostrara (retornará)
  // un mensaje de “Cargando...”.

  if (!climaData) {
    return (
      <View>
        <Text>Cargando...</Text>
      </View>
    );
  }
  // Retorne la lista de países con su estado del clima.
  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <View>
        <View style={styles.containerTitle}>
          <Text style={styles.title}>Clima de los países Centroamericanos</Text>
        </View>
  
        {climaData.map((clima, index) => {
          const { name, country } = clima.location;
          const { temp_c, temp_f, condition, wind_mph, pressure_in, humidity } = clima.current;
  
          return (
            <View style={styles.container} key={index}>
              <Text style={styles.DescriptionExtra}
              >-----------------------------------------------------------------------
              </Text>

              <Text style={styles.descriptionLocation}>
                {name}, {country}
              </Text>

              <Text style={styles.descriptionTemp}>
                {temp_c} °C | {temp_f} °F
              </Text>

              <Text 
              style={styles.descriptionCondition}>{condition.text}
              </Text>

              <Text style={styles.DescriptionExtra}>
                Viento: {wind_mph} Presión: {pressure_in} Humedad: {humidity}
              </Text>

              <Text style={styles.DescriptionExtra}
              >-----------------------------------------------
              </Text>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
    containerTitle: {
      alignItems: 'center',
      marginTop: 20,
      marginBottom: 10,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    container: {
      paddingHorizontal: 20,
      paddingBottom: 10,
      marginBottom: 10,
      backgroundColor: '#f0f0f0',
    },
    DescriptionExtra: {
      fontSize: 12,
      textAlign: 'center',
      marginVertical: 5,
      color: 'gray',
    },
    descriptionLocation: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    descriptionTemp: {
      fontSize: 14,
      marginBottom: 3,
    },
    descriptionCondition: {
      fontSize: 14,
      marginBottom: 3,
    },
  });
  
export default ClimaScreen;
