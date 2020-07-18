import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, View, Text, Button, Alert } from "react-native";
import NumberContainer from "../components/NumberContainer";
import Card from "../components/Card";

const generatedRandomBetween = (min, max, excluded) => {
      min = Math.ceil(min);
      max = Math.floor(max);
      const rndNumber = Math.floor(Math.random() * (max - min)) + min;
      if (rndNumber === excluded) {
            return generatedRandomBetween(min, max, excluded);
      } else {
            return rndNumber;
      }
};

const GameScreen = props => {
      const [currentGuess, setCurrentGuess] = useState(
            generatedRandomBetween(1, 100, props.userChoice)
      );

      const [rounds, setRounds] = useState(0);
      const currentLow = useRef(1);
      const currentHigh = useRef(100);

      const {userChoice, onGameOver} = props;

      useEffect(() => {
            if(currentGuess === userChoice){
                  props.onGameOver(rounds);
            }
      }, [currentGuess,userChoice,onGameOver]);

      const nextGuessHandler = direction => {
            if((direction === 'lower' && currentGuess < props.userChoice) || (direction === 'greater' && currentGuess > props.userChoice)){
                  Alert.alert('Don\'t lie!','Lier!',[{text:'Sorry!',style:'cancel'}]);
                  return;
            }

            if(direction === 'lower'){
                  currentHigh.current = currentGuess;
            }else{
                  currentLow.current = currentGuess;
            }

            const nextN = generatedRandomBetween(currentLow.current,currentHigh.current,currentGuess);
            setCurrentGuess(nextN);
            setRounds(rounds => rounds + 1);

      }
      return (
            <View style={styles.screen}>
                  <Text>Opponent's Guess</Text>
                  <NumberContainer>{currentGuess}</NumberContainer>
                  <Card style={styles.buttonContainer}>
                        <Button title="LOWER" onPress={nextGuessHandler.bind(this,'lower')} />
                        <Button title="GREATER" onPress={nextGuessHandler.bind(this,'greater')} />
                  </Card>
            </View>
      );
};

const styles = StyleSheet.create({
      screen: {
            flex: 1,
            padding: 10,
            alignItems: "center"
      },

      buttonContainer: {
            flexDirection: "row",
            justifyContent: "space-around",
            marginTop: 20,
            width: 300,
            maxWidth: "80%"
      }
});
export default GameScreen;
