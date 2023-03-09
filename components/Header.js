import { Text, View, StyleSheet, Dimensions, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Constants from '../constants/Styles';

export default function Header() {
  return (
    <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>MEMO GAME</Text>
      </View>
    </TouchableWithoutFeedback>
  )
}


const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    backgroundColor: Constants.colorPrimary,
    padding: 8,
    width: Dimensions.get('window').width,
    width: '100%',
    marginBottom: 20,
    borderBottomColor: Constants.colorWhite,
    borderBottomWidth: 2,
  },

  header: {
    color: Constants.colorWhite,
    fontSize: Constants.fontLg,
    fontWeight: 'bold',
    fontFamily: Constants.fontPrimaryBold,
  }
});
