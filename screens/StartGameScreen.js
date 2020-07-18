import React, { useState } from "react";
import {
      StyleSheet,
      View,
      Text,
      TextInput,
      Button,
      TouchableWithoutFeedback,
      Keyboard,
      Alert
} from "react-native";

import TextBody from '../components/BodyText'
import Card from "../components/Card";
import Colors from "../constants/colors";
import Input from "../components/Input";
import NumberContainer from "../components/NumberContainer";

const StartGameScreen = props => {
      const [enteredValue, setEnteredValue] = useState("");
      const [confirmed, setConfirmed] = useState(false);
      const [selectedNumber, setSelectedNumber] = useState();

      const numberInputHandler = enteredText => {
            setEnteredValue(enteredText.replace(/[^0-9]/g, ""));
      };

      const resetInputHandler = () => {
            setEnteredValue("");
            setConfirmed(false);
      };

      const confirmInputHandler = () => {
            const chosenNumber = parseInt(enteredValue);
            if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
                  Alert.alert(
                        "Invalid number",
                        "Number has to be a number between 1 and 99",
                        [
                              {
                                    text: "Okay",
                                    style: "destructive",
                                    onPress: resetInputHandler
                              }
                        ]
                  );
                  return;
            }
            setConfirmed(true);
            setSelectedNumber(chosenNumber);
            setEnteredValue("");
            Keyboard.dismiss();
      };

      let confirmedOutput;
      if (confirmed) {
            confirmedOutput = (
                  <Card style={styles.summaryContainer}>
                        <TextBody>You selected</TextBody>
                        <NumberContainer>{selectedNumber}</NumberContainer>
                        <Button
                              title="START GAME"
                              onPress={() => props.onStartGame(selectedNumber)}
                        />
                  </Card>
            );
      }

      return (
            <TouchableWithoutFeedback
                  onPress={() => {
                        /* Keyboard es una API */
                        Keyboard.dismiss();
                  }}
            >
                  <View style={styles.screen}>
                        <TextBody style={styles.title}>Start a new game!</TextBody>
                        <Card style={styles.inputContainer}>
                              <TextBody>Select a number</TextBody>
                              <Input
                                    placeholder="Enter the number here"
                                    blurOnSubmit
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    keyboardType="number-pad"
                                    maxLength={2}
                                    style={styles.input}
                                    onChangeText={numberInputHandler}
                                    value={enteredValue}
                              />
                              <View style={styles.buttonContainer}>
                                    <View style={styles.button}>
                                          <Button
                                                title="Reset"
                                                color={Colors.accent}
                                                onPress={resetInputHandler}
                                          />
                                    </View>
                                    <View style={styles.button}>
                                          <Button
                                                title="Confirm"
                                                color={Colors.primary}
                                                onPress={confirmInputHandler}
                                          />
                                    </View>
                              </View>
                        </Card>
                        {confirmedOutput}
                  </View>
            </TouchableWithoutFeedback>
      );
};

const styles = StyleSheet.create({
      screen: {
            flex: 1,
            padding: 10,
            alignItems: "center",
            justifyContent: "flex-start"
      },
      title: {
            fontSize: 20,
            marginVertical: 10,
            fontFamily : 'fira-code-bold'
      },
      inputContainer: {
            width: 300,
            maxWidth: "80%",
            alignItems: "center"
      },
      buttonContainer: {
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
            paddingHorizontal: 15
      },

      input: {
            width: 150,
            textAlign: "center"
      },

      button: {
            width: 100,
            marginVertical: 20
      },

      summaryContainer: {
            marginTop: 20,
            alignItems: "center"
      }
});
export default StartGameScreen;
