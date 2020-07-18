import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { AppLoading } from "expo";
import * as Font from "expo-font";

import Header from "./components/Header";
import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";

const fetchFonts = () => {
    return Font.loadAsync({
        "fira-code": require("./assets/fonts/FiraCode-Light.ttf"),
        "fira-code-retina": require("./assets/fonts/FiraCode-Retina.ttf"),
        "fira-code-bold": require("./assets/fonts/FiraCode-Bold.ttf")
    });
    
};

export default function App() {
    const [userNumber, setUserNumber] = useState();
    const [gueesRounds, setGuessRounds] = useState(0);
    const [dataLoaded, setDataLoaded] = useState(false);

    if (!dataLoaded) {
        console.log("Loading");

        return (
            <AppLoading
                startAsync={fetchFonts}
                onFinish={() => setDataLoaded(true)}
                onError={(err) => console.log(err)}
            />
        );
    }

    const configureNewGame = () => {
        setGuessRounds(0);
        setUserNumber(null);
    };

    const startGameHandler = (selectedNumber) => {
        console.log("Start Game");
        setUserNumber(selectedNumber);
        setGuessRounds(0);
    };

    const gameOverHandler = (nRounds) => {
        setGuessRounds(nRounds);
    };

    let content = <StartGameScreen onStartGame={startGameHandler} />;
    if (userNumber && gueesRounds <= 0)
        content = (
            <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />
        );
    else if (gueesRounds > 0) {
        content = (
            <GameOverScreen
                roundsNumber={gueesRounds}
                userNumber={userNumber}
                onRestart={configureNewGame}
            />
        );
    }

    return (
        <View style={styles.screen}>
            <Header title="Guess a number" />
            {content}
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "#dedede",
    },
});
