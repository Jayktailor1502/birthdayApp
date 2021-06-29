import React, { useState, useEffect } from 'react'
import { View, TextInput, StyleSheet, Keyboard, Alert, TouchableOpacity, Text } from 'react-native'
import database from '@react-native-firebase/database'
import FormButton from '../Components/FormButton';
import FormInput from '../Components/FormInput';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const Add = ({ navigation }) => {

    const [text, onChangeText] = useState();
    const [fund, onChangeFund] = useState();
    const [data, setData] = useState({ Name: '', Fund: '' });

    useEffect(() => {
        console.log('In UseEffect')
        if (data.Name !== '' && data.Fund !== '') {
            database().ref(`Employees/Details`)
                .push(data);
            console.log({ data })
            console.log('Data Pushed In useEffect')
        }
    }, [data])

    const yesPressed=()=>{
        setData({Name: '', Fund: ''})
        console.log('in yes pressed')
        console.log({data})
        return;
    }

    const timeFunction=()=>{
         Alert.alert(
                    "Alert ",
                    "Want to add more?",
                    [
                      {
                        text: "No",
                        onPress: () => navigation.navigate("Fund's List"),
                        style: "cancel"
                      },
                      { text: "Yes", onPress:()=> {yesPressed()} }
                    ]
                  );
    }

    const AddBtn = () => {
        setData({ Name: text, Fund: fund })
        console.log("In AddButton")
        console.log(data.Name !== '')
        console.log(data.Fund !== '')
        // database().ref(`Employees/Details/`)
        //     .push(data);
        if (data.Name !== '' && data.Fund !== '') {
            // setTimeout(() => {
            //     timeFunction();
            //     }, 600);        
            console.log('All Good')         
            navigation.navigate("Fund's List")
        }
        else {
            alert('Please enter data properly !!')
        }
    }

    return (
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss();
            console.log('Keyboard dismissed')
        }}>
            <View style={styles.container}>
                {/* <TextInput
                style={styles.input}
                onChangeText={onChangeText}
                value={text}
                placeholder="Employee Name"
            />
            <TextInput
                style={styles.input}
                onChangeText={onChangeFund}
                value={fund}
                placeholder="Fund Contributed"
            /> */}
                <FormInput
                    labelValue={text}
                    onChangeText={(text) => onChangeText(text)}
                    placeholderText="Employee Name"
                    iconType="user"
                    autoCapitalize="none"
                    autoCorrect={false}
                />
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
                    buttonTitle="Add"
                    onPress={AddBtn}
                />

                {/* <TouchableOpacity style={styles.buttonContainer} disabled='true' >
                    <Text style={styles.buttonText}>Add</Text>
                </TouchableOpacity> */}

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
    // input: {
    //     height: 40,
    //     margin: 12,
    //     borderWidth: 1,
    // },
    buttonContainer: {
        width: "100%",
        marginTop: 10,
        // height: windowHeight / 15,
        backgroundColor: '#2e64e5',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ffffff',
        fontFamily: 'Lato-Regular',
    },
})

export default Add

{/* <View style={styles.inputContainer}>
                <TextInput
                    value={text}
                    onChangeText={onChangeText}
                    style={styles.input}
                    numberOfLines={1}
                    placeholder='Employee Name'
                    placeholderTextColor="#666"
                />
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    value={fund}
                    onChangeText={onChangeFund}
                    style={styles.input}
                    numberOfLines={1}
                    placeholder='Fund Contributed'
                    placeholderTextColor="#666"
                />
            </View> */}