import { StyleSheet, Text, View, TouchableOpacity, FlatList, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import 'react-native-get-random-values'; /* for uuid */
import { v4 as uuidv4 } from 'uuid';
import Constants from '../constants/Styles.js';
import Card from './Card';
import emojis from '../constants/Emojis.js';


const Game = () => {
    const [cardPics, setCardPics] = useState([])
    const [cards, setCards] = useState([])
    const [turns, setTurns] = useState(0)
    const [choiceOne, setChoiceOne] = useState(null)
    const [choiceTwo, setChoiceTwo] = useState(null)
    const [disabled, setDisabled] = useState(false)
    const [winner, setWinner] = useState(false)
    const [startState, setStartState] = useState(false)
    const windowWidth = Dimensions.get('window').width;


    /* elijo emojis al azar */
    const selectEmojis = () => {
        const emojisArray = [...emojis]
        for (let i = 0; i < 6; i++) {
            const randomElement = emojisArray[Math.floor(Math.random() * emojisArray.length)];

            /* si ya existe en el array de cards, busco de nuevo */
            const found = cardPics.find(card => card.front === randomElement)
            if (found) {
                i = i--
                continue;
            }

            setCardPics(cardPics => [...cardPics, { "front": randomElement, "back": "⚛️", "matched": false }])
        }
    }

    /* mezclar cards */
    const shuffleCards = () => {
        /* duplico cards */
        const cards = [...cardPics, ...cardPics]
            /* mezclo al azar con sort */
            .sort(() => Math.random() - 0.5)
            /* retorno un array con ids unicas */
            .map(card => ({ ...card, id: uuidv4() }))

        setStartState(true)
        setWinner(false)
        setCards(cards)
        setChoiceOne(null)
        setChoiceTwo(null)
        setDisabled(false)
        setTurns(0)
    }

    const handleChoice = (card) => {
        choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
    }

    const resetChoice = () => {
        setChoiceOne(null)
        setChoiceTwo(null)
        setTurns(turns => turns + 1)
        setDisabled(false)
    }

    useEffect(() => {
        if (choiceOne && choiceTwo) {
            setDisabled(true)
            if (choiceOne.front === choiceTwo.front) {
                setCards(cards => {
                    return cards.map(card => card.front === choiceOne.front ? { ...card, "matched": true } : card)
                })
                resetChoice()
            } else {
                setTimeout(() => { resetChoice() }, 1000)
            }
        }
    }, [choiceOne, choiceTwo])

    useEffect(() => {
        const everyMatch = cards.length > 0 && cards.every(card => card.matched === true)
        if (everyMatch) {
            setTimeout(() => {
                setWinner(true)
            }, 1000)
        }
    }, [cards])

    useEffect(() => {
        selectEmojis()
    }, [])

    return (
        <View style={styles.gameContainer}>
            {
                !startState ?
                    <TouchableOpacity onPress={shuffleCards}>
                        <Text style={styles.newGame}>Nuevo Juego</Text>
                    </TouchableOpacity> :
                    <>
                        {winner === true ?
                            <>
                                <Text style={styles.winner}>
                                    <Text>🔥</Text>
                                    <Text style={styles.winnerText}>COMPLETADO</Text>
                                    <View><Text style={styles.winnerButtonsText}>Turnos: {turns}</Text></View>
                                </Text>
                                <View style={styles.winnerButtons}>
                                    <TouchableOpacity onPress={shuffleCards} style={styles.winnerButtonsWrapper}>
                                        <Text style={styles.winnerButtonsText}>Nuevo Juego</Text>
                                    </TouchableOpacity>
                                </View>
                            </> :
                            <>
                                <View style={styles.turnsButtonsContainer}>
                                    <View style={styles.turns}>
                                        <Text style={styles.turnsText}>Turnos: {turns}</Text>
                                    </View>

                                    <TouchableOpacity onPress={shuffleCards} style={styles.turns}>
                                        <Text style={styles.turnsText}>Reset</Text>
                                    </TouchableOpacity>

                                </View>
                                {
                                    windowWidth > 1200 ?
                                        <FlatList contentContainerStyle={styles.cardsContainer}
                                            data={cards}
                                            numColumns={4}
                                            renderItem={({ item }) => (
                                                <Card card={item} handleChoice={handleChoice} choiceOne={choiceOne} choiceTwo={choiceTwo} disabled={disabled} />
                                            )}
                                            keyExtractor={card => card.id}
                                        />
                                        : <FlatList contentContainerStyle={styles.cardsContainer}
                                            data={cards}
                                            numColumns={2}
                                            renderItem={({ item }) => (
                                                <Card card={item} handleChoice={handleChoice} choiceOne={choiceOne} choiceTwo={choiceTwo} disabled={disabled} />
                                            )}
                                            keyExtractor={card => card.id}
                                        />
                                }
                            </>}
                    </>
            }
        </View>
    )
}

export default Game

const styles = StyleSheet.create({
    gameContainer: {
        padding: 10,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    newGame: {
        fontSize: Constants.fontXl,
        fontFamily: Constants.fontPrimaryBold,
        padding: 10,
        borderRadius: 4,
        borderWidth: 4,
        borderColor: Constants.colorPrimaryDark,
        backgroundColor: Constants.colorPrimary,
        color: Constants.colorWhite,
        margin: 20,
    },
    winner: {
        fontSize: Constants.fontLg,
        padding: 20,
        borderRadius: 4,
        borderWidth: 4,
        outlineColor: Constants.colorWhite,
        outlineWidth: 2,
        outlineStyle: "solid",
        outlineOffset: 8,
        borderColor: Constants.colorPrimaryDark,
        backgroundColor: Constants.colorPrimary,
        color: Constants.colorWhite,
        margin: 40,
        fontFamily: Constants.fontPrimaryBold,
        wordBreak: 'break-word',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },
    winnerText: {
        display: 'flex',
        margin: 20,
    },
    winnerButtons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        maxWidth: 400,
        minWidth: 320
    },
    winnerButtonsText: {
        fontSize: Constants.fontMd,
        padding: 10,
        borderRadius: 4,
        borderWidth: 4,
        borderColor: Constants.colorPrimaryDark,
        backgroundColor: Constants.colorPrimary,
        color: Constants.colorWhite,
        margin: 4,
        fontFamily: Constants.fontPrimaryBold,
        wordBreak: 'break-word',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
    },
    winnerButtonsWrapper: {
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    turns: {
        borderRadius: 4,
        borderWidth: 4,
        borderColor: Constants.colorPrimaryDark,
        backgroundColor: Constants.colorPrimary,
        margin: 10,
        padding: 10,
        flex: 1
    },
    turnsText: {
        color: Constants.colorWhite,
        fontFamily: Constants.fontPrimary,
        fontSize: Constants.fontMd,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
    },
    turnsButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '40%',
        maxWidth: 400,
        minWidth: 320
    },
    cardsContainer: {
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
})