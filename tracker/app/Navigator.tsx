import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './(tabs)';
import EkleSayfasi from './eklesayfasi';
import ProgramDetay from './ProgramDetay';
import MyGym from './mygym';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Platform, StatusBar } from 'react-native';

// Tip tanımlamalarını doğrudan burada yapalım
export interface Hareket {
    isim: string;
    setSayisi: number;
}

export interface Program {
    adi: string;
    hareketler: Hareket[];
}

export interface PerformansVerisi {
    tarih: string;
    agirlik: number;
    setProgrami: string;
}

// Tab navigator için tip tanımı
export type TabParamList = {
    Home: undefined;
    Ekle: undefined;
    mygym: undefined;
};

// Stack navigator için tip tanımı
export type RootStackParamList = {
    Main: undefined;
    ProgramDetay: { program: Program };
    EkleSayfasi: undefined;
    HareketGecmisi: {
        hareketAdi: string;
        performansVerileri: PerformansVerisi[];
    };
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

const THEME = {
    primary: '#6366F1', // Modern indigo
    secondary: '#8B5CF6', // Modern purple
    background: '#FFFFFF',
    surface: '#F8FAFC',
    text: {
        primary: '#1E293B',
        secondary: '#64748B',
    },
    border: '#E2E8F0',
};

function TabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    let iconName: keyof typeof MaterialCommunityIcons.glyphMap;

                    switch (route.name) {
                        case 'Home':
                            iconName = 'view-dashboard-outline';
                            break;
                        case 'Ekle':
                            iconName = 'plus-circle-outline';
                            break;
                        case 'mygym':
                            iconName = 'dumbbell';
                            break;
                        default:
                            iconName = 'home';
                    }

                    return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: THEME.primary,
                tabBarInactiveTintColor: THEME.text.secondary,
                tabBarStyle: {
                    height: Platform.OS === 'ios' ? 88 : 64,
                    paddingBottom: Platform.OS === 'ios' ? 30 : 12,
                    paddingTop: 12,
                    backgroundColor: THEME.background,
                    borderTopWidth: 1,
                    borderTopColor: THEME.border,
                    elevation: 0,
                    shadowOpacity: 0,
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: '500',
                    marginTop: 4,
                },
                headerStyle: {
                    backgroundColor: THEME.background,
                    elevation: 0,
                    shadowOpacity: 0,
                    borderBottomWidth: 1,
                    borderBottomColor: THEME.border,
                },
                headerTitleStyle: {
                    fontSize: 18,
                    fontWeight: '600',
                    color: THEME.text.primary,
                },
                headerTitleAlign: 'center',
                headerShadowVisible: false,
            })}
        >
            <Tab.Screen 
                name="Home" 
                component={HomeScreen}
                options={{ 
                    title: 'Antrenmanlar',
                    headerTitle: 'Antrenmanlar',
                }}
            />
            <Tab.Screen 
                name="Ekle" 
                component={EkleSayfasi}
                options={{ 
                    title: 'Program Ekle',
                    headerTitle: 'Program Ekle',
                }}
            />
            <Tab.Screen 
                name="mygym" 
                component={MyGym}
                options={{ 
                    title: 'İstatistikler',
                    headerTitle: 'İstatistikler',
                }}
            />
        </Tab.Navigator>
    );
}

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <StatusBar
                barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
                backgroundColor={THEME.background}
            />
            <Stack.Navigator 
                initialRouteName="Main"
                screenOptions={{ 
                    headerShown: false,
                    animation: Platform.OS === 'ios' ? 'default' : 'slide_from_right',
                    headerStyle: {
                        backgroundColor: THEME.background,
                    },
                    headerTitleStyle: {
                        fontSize: 18,
                        fontWeight: '600',
                        color: THEME.text.primary,
                    },
                    headerTitleAlign: 'center',
                    headerShadowVisible: false,
                    contentStyle: {
                        backgroundColor: THEME.background,
                    },
                    gestureEnabled: true,
                    gestureDirection: 'horizontal',
                    presentation: 'card',
                    animationTypeForReplace: 'push',
                }}
            >
                <Stack.Screen 
                    name="Main" 
                    component={TabNavigator}
                />
                <Stack.Screen 
                    name="ProgramDetay" 
                    component={ProgramDetay}
                    options={{
                        headerShown: false,
                        presentation: 'card',
                    }}
                />
                <Stack.Screen 
                    name="EkleSayfasi" 
                    component={EkleSayfasi}
                    options={{
                        headerShown: false,
                        presentation: 'modal',
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
