import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore'

const HomeScreen = ({ user, navigation }) => {
    // console.log(user)
    const [users, setUsers] = useState(null)

    const getUser = async () => {
        const querySnap = await firestore().collection('users').where('uid', '!=', user.uid).get()
        const allUsers = querySnap.docs.map(docSnap => docSnap.data())
        // console.log(allUsers)
        setUsers(allUsers)
    }
    useEffect(() => {
        getUser()
    }, [])


    const RenderCard = ({ item }) => {
        return (
            <TouchableOpacity
                onPress={() => navigation.navigate('Chat', { name: item.name, uid: item.uid })}
            >
                <View style={styles.mycard}>
                    <Image source={{ uri: item.pic }} style={styles.img} />
                    <View>
                        <Text style={styles.text}>
                            {item.name}
                        </Text>
                        <Text style={styles.text}>
                            {item.email}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={users}
                renderItem={({ item }) => { return <RenderCard item={item} /> }}
                keyExtractor={(item) => item.uid}
            />


        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    img: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: "green"
    },
    text: {
        fontSize: 18,
        marginLeft: 15,
    },
    mycard: {
        flexDirection: "row",
        margin: 5,
        padding: 4,
        backgroundColor: "white",
        elevation: 5,
        borderBottomColor: 'grey',
        borderRadius: 10
    },

});


