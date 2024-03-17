import React, { useContext } from 'react';
import { View, Text, ImageBackground, Image, StyleSheet } from 'react-native';
import {
    DrawerContentComponentProps,
    DrawerContentScrollView,
    DrawerItemList
} from '@react-navigation/drawer';
import Ionicons from '@expo/vector-icons/Ionicons';

import { AuthContext } from '@/context';

export const CustomDrawerNavigator = (props: DrawerContentComponentProps) => {
    const { user, logOut } = useContext(AuthContext);
    return (
        <View style={styles.drawerContainer}>
            <DrawerContentScrollView
                {...props}
                contentContainerStyle={styles.drawerContentBox}
            >
                <ImageBackground
                    source={require('../../../assets/images/backgroundTop.jpeg')}
                    style={styles.imageBackroundBox}
                >
                    <Image
                        alt="Not find"
                        source={require('../../../assets/images/user.png')}
                        style={styles.userAvatar}
                    />
                    <Text style={styles.userName}>{user?.fullName}</Text>
                </ImageBackground>
                <View style={styles.drawerListBox}>
                    <DrawerItemList {...props} />
                </View>
            </DrawerContentScrollView>
            <Ionicons.Button
                name="log-out"
                size={32}
                color="black"
                backgroundColor={'white'}
                activeOpacity={0.9}
                onPress={logOut}
            >
                Sign Out
            </Ionicons.Button>
        </View>
    );
};

const styles = StyleSheet.create({
    drawerContainer: { flex: 1 },
    imageBackroundBox: { padding: 20 },
    userAvatar: {
        height: 67.5,
        width: 67.5,
        borderRadius: 40,
        marginBottom: 10,
        marginTop: 30
    },
    userName: {
        color: '#000',
        fontSize: 18,
        marginBottom: 5,
        fontWeight: 'bold'
    },
    drawerContentBox: {
        backgroundColor: '#9288F9',
        marginTop: -50,
        zIndex: 10
    },
    drawerListBox: { flex: 1, backgroundColor: '#fff', paddingTop: 10 },
    buttonBox: {
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: '#ccc'
    },
    buttonTitle: {
        fontSize: 15,
        marginLeft: 5
    }
});
