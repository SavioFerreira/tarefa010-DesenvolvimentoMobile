import { BackHandler, Alert } from 'react-native';

const AppClose = () => {

    Alert.alert(
        "Alerta!",
        "Deseja mesmo sair do app?",
        [
            {
                text: "Não",
                onPress: () => null,
                style: "cancel"
            },
            {
                text: "Sim",
                onPress: () => {
                    BackHandler.exitApp();
                    
                }
            }
        ]
    );
}

export default AppClose;