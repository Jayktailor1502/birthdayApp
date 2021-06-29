import { TabRouter } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, StyleSheet, Keyboard } from 'react-native';
import database from '@react-native-firebase/database'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import FormButton from '../Components/FormButton';
import FormInput from '../Components/FormInput';

const Edit = ({ navigation, route }) => {

    const [fund, onChangeFund] = useState();
    const { index } = route.params;

    const EditBtn = () => {
        console.log('edit')
        // database().ref(`Employees/Details/${index}/`).set({
        //     Fund : fund
        // });
        const edit = database().ref(`Employees/Details/${index}/`);
        edit.update({ Fund: fund });
        navigation.navigate("Fund's List")
    }

    return (
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss();
            console.log('Keyboard dismissed')
        }}>
            <View style={styles.container}>
                <FormInput
                    labelValue={fund}
                    onChangeText={(fund) => onChangeFund(fund)}
                    placeholderText="Fund Contributed"
                    iconType="plus"
                    keyboardType="numeric"
                    autoCapitalize="none"
                    autoCorrect={false}
                />
                <FormButton
                    buttonTitle="Done"
                    onPress={EditBtn}
                />
            </View>
        </TouchableWithoutFeedback>

    )
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        alignContent: 'center',
        padding: 20,
        justifyContent: 'center',
    },
})

export default Edit
