import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Constants from '../constants/Styles'

const Card = ({ card, handleChoice, choiceOne, choiceTwo, disabled }) => {
    const handleClick = () => {
        if (disabled) { return }
        handleChoice(card)
    }

    return (
        <Text style={styles.card}>
            {
                card.matched || card.id === choiceOne?.id || card.id === choiceTwo?.id ?
                    <View style={[styles.cardBackWrapper, styles.cardFront]}>
                        <Text>{card.front}</Text>
                    </View> :
                    <TouchableOpacity style={[styles.cardBackWrapper, styles.cardBack]} onPress={handleClick}>
                        <Text>{card.back}</Text>
                    </TouchableOpacity>
            }
        </Text>
    )
}

export default Card

const styles = StyleSheet.create({
    card: {
        fontSize: Constants.fontXxl,
        margin: 10,
        position: "relative",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardBackWrapper: {
        width: 140,
        aspectRatio: 1,
        height: 140,
        backgroundColor: Constants.colorPrimaryDark,
        borderRadius: 8,
        borderColor: Constants.colorPrimary,
        borderWidth: 4,
        padding: 4,
        lineHeight: 1,
        textAlignVertical: 'middle',
        justifyContent: 'center',
        alignItems: 'center',
    }
})