import React, { Component } from 'react';
import { StackNavigator, TabNavigator, DrawerNavigator, withNavigation } from 'react-navigation';
import { TouchableOpacity, View } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import HomeScreen from './HomeScreen';
import PerfilScreen from './PerfilScreen';
import ProdutosTab from './ProdutosTab';
import ClientesTab from './ClientesTab';

const MenuButton = withNavigation((props) => {
    const { navigation } = props;
    return (
        <View>
            <TouchableOpacity onPress={() => navigation.navigate('DrawerOpen')}>
                <View style={{ padding: 8 }}>
                    <Icon name="menu" size={32} color="#000" />
                </View>
            </TouchableOpacity>
        </View>
    )
});

const AbasRelatorios = TabNavigator(
    {
        Produtos: {
            screen: ProdutosTab,
            navigationOptions: {
                title: 'Produtos'
            }
        },
        Clientes: {
            screen: ClientesTab,
            navigationOptions: {
                title: 'Clientes'
            }
        }
    }, {
        backBehavior: 'none'
    }
)

const StackPrincipal = StackNavigator({
    Home: {
        screen: HomeScreen,
        navigationOptions: {
            title: 'Home',
            headerLeft: (
                <MenuButton />
            )
        },
    },
    Perfil: {
        screen: PerfilScreen,
        navigationOptions: {
            title: 'Perfil',
        },
    },
    Relatorios: {
        screen: AbasRelatorios,
        navigationOptions: {
            title: 'Relatórios',
        }
    }
});

const MenuDrawer = DrawerNavigator({
    HomeStack: {
        screen: StackPrincipal,
        navigationOptions: {
            drawerLabel: 'Home'
        }
    },
    Perfil: {
        screen: PerfilScreen,
        navigationOptions: {
            drawerLabel: 'Perfil',
        },
    },
    Relatorios: {
        screen: AbasRelatorios,
        navigationOptions: {
            drawerLabel: 'Relatórios',
        }
    }
});

export default class AppNavigator extends Component {
    render() {
        return (
            <MenuDrawer />
        )
    }
}