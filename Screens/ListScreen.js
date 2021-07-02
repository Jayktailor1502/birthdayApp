import React, { useContext, useEffect, useState } from 'react'
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import { AuthContext } from '../Navigation/AuthProvider'
import database from '@react-native-firebase/database'
import auth from '@react-native-firebase/auth';
import { FAB } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Entypo';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import prompt from 'react-native-prompt-android';

const ListScreen = ({ navigation }) => {

    const [data, setData] = useState([]);
    const { currentUser } = auth();
    const [show, setShow] = useState();
    const { logout } = useContext(AuthContext);
    const [fund, onChangeFund] = useState('');

    const getFundList = () => {
        database().ref('Employees/Details/').on('value', function (snapshot) {
            setData(Object.values(snapshot.val()));
        });
    };

    useEffect(() => {
        if (currentUser.displayName === "Jay Kumar Tailor") setShow(true)
        else setShow(false)
        // 
        database().ref('Employees/Details/').on('value', function (snapshot) {
            setData(Object.values(snapshot.val()));
        });
    }, []);

    const deleteBtn = (index, item) => {
        var query = database().ref('Employees/Details/').orderByKey();
        query.once("value")
            .then(function (snapshot) {
                snapshot.forEach(function (childSnapshot) {
                    var pkey = childSnapshot.key;
                    console.log(childSnapshot.val().Name);
                    if (childSnapshot.val().Name == item.Name) {
                        database().ref().child(`Employees/Details/${pkey}`).remove();
                        console.log('run')
                        console.log(pkey)
                        console.log(index)
                        return true;
                    }
                });
            });
    }

    const editBtn = (index,item)=>{
        var query = database().ref('Employees/Details/').orderByKey();
        let name = item.Name
        query.once("value")
            .then(function (snapshot) {
                snapshot.forEach(function (childSnapshot) {
                    var pkey = childSnapshot.key;
                    console.log(childSnapshot.val().Name);
                    if (childSnapshot.val().Name == item.Name) {
                        console.log('run')
                        console.log(pkey)
                        console.log(index)
                        navigation.navigate("Edit Details",{pkey , name })
                    }
                    console.log(pkey)
                });
            });
    }

    const renderItem = ({ item, index }) => {
        return (
            <View style={styles.item}>
                <Text style={styles.list}>Employee Name : {item.Name}</Text>
                <Text style={styles.list}>Contribution        : {item.Fund}</Text>
                {show ?
                    <TouchableOpacity
                        onPress={() => { deleteBtn(index, item) }}
                        style={styles.edit}
                    >
                        <Icon1
                            name="delete"
                            size={20}
                            color="#111"
                        />
                    </TouchableOpacity>
                    :
                    <TouchableOpacity
                        onPress={() => { editBtn(index, item) }}
                        style={styles.edit}
                    >
                        <Icon
                            name="edit"
                            size={20}
                            color="#111"
                        />
                    </TouchableOpacity>
                }
            </View>
        )
    }

    const addBtn = () => {
        console.log("Add btn Clicked")
        navigation.navigate("Add Details")
        console.log("In Add Details")
    }

    return (
        <View style={{ flex: 1 }}>

            <FlatList
                data={data}
                keyExtractor={(item, index) => 'item' + index}
                renderItem={renderItem}
            />

            {show ? <FAB
                style={styles.fab}
                small
                icon="plus"
                onPress={addBtn}
            /> : null}

            <Button
                title="Sign Out"
                onPress={() => logout()}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    list: {
        fontSize: 18,
        fontWeight: '300',
        color: '#123',
        fontFamily: 'Lato-Regular',
    },
    item: {
        backgroundColor: '#4562',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 8,
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 25,
        backgroundColor: '#456'
    },
    edit: {
        position: "absolute",
        right: 20,
        bottom: 40,
    }
})

export default ListScreen
{/* <TouchableOpacity
                style={{
                    borderWidth: 1,
                    borderColor: 'rgba(0,0,0,0.2)',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 70,
                    position: 'absolute',
                    bottom: 10,
                    right: 10,
                    height: 70,
                    backgroundColor: '#fff',
                    borderRadius: 100,
                }}
            >
                <Icon name='plus' size={30} color='#01a699' />
            </TouchableOpacity> */}