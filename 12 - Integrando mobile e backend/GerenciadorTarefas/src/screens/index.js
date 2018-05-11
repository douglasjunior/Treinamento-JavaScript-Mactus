import React, { Component } from 'react';
import {
    StackNavigator, DrawerNavigator,
    withNavigation
} from 'react-navigation';
import { TouchableOpacity, View } from 'react-native';

import Icon from '../components/Icon';
import Drawer from '../components/Drawer';
import Colors from '../values/Colors';

import BemVindoScreen from './BemVindoScreen';
import HomeScreen from './HomeScreen';
import LoginScreen from './LoginScreen';
import SplashScreen from './SplashScreen';
import TarefaScreen from './TarefaScreen';
import TarefasScreen from './TarefasScreen';
import UsuarioScreen from './UsuarioScreen';

const MenuButton = withNavigation((props) => {
    const { navigation } = props;
    return (
        <View>
            <TouchableOpacity
                onPress={() => navigation.navigate('DrawerOpen')}
            >
                <View style={{ padding: 8 }}>
                    <Icon
                        family="MaterialIcons"
                        name="menu"
                        size={32}
                        color="#000"
                    />
                </View>
            </TouchableOpacity>
        </View>
    )
});

// const AddButton = withNavigation((props) => {
//     const { navigation } = props;
//     return (
//         <View>
//             <TouchableOpacity
//                 onPress={() => navigation.navigate('Tarefa')}
//             >
//                 <View style={{ padding: 8 }}>
//                     <Icon
//                         family="MaterialIcons"
//                         name="add"
//                         size={32}
//                         color="#000"
//                     />
//                 </View>
//             </TouchableOpacity>
//         </View>
//     )
// });

const StackPrincipal = StackNavigator({
    Splash: {
        screen: SplashScreen,
        navigationOptions: {
            header: () => null,
            drawerLockMode: 'locked-closed',
        },
    },
    BemVindo: {
        screen: BemVindoScreen,
        navigationOptions: {
            header: () => null,
            drawerLockMode: 'locked-closed',
        },
    },
    Home: {
        screen: HomeScreen,
        navigationOptions: {
            title: 'Home',
            headerLeft: (
                <MenuButton />
            )
        },
    },
    Login: {
        screen: LoginScreen,
        navigationOptions: {
            title: 'Login',
            drawerLockMode: 'locked-closed',
        },
    },
    Tarefas: {
        screen: TarefasScreen,
        navigationOptions: {
            title: 'Tarefas',
            drawerLockMode: 'locked-closed',
            // headerRight: (
            //     <AddButton />
            // )
        },
    },
    Tarefa: {
        screen: TarefaScreen,
        navigationOptions: {
            title: 'Tarefa',
            drawerLockMode: 'locked-closed',
        },
    },
    Usuario: {
        screen: UsuarioScreen,
        navigationOptions: {
            title: 'Cadastro',
            drawerLockMode: 'locked-closed',
        },
    },
}, {
        navigationOptions: {
            headerStyle: {
                backgroundColor: Colors.primary,
            },
        },
    }
);

const MenuDrawer = DrawerNavigator(
    {
        HomeStack: {
            screen: StackPrincipal,
        },
    },
    {
        contentComponent: Drawer,
    }
);

export default class AppNavigator extends Component {
    render() {
        return (
            <MenuDrawer />
        )
    }
}