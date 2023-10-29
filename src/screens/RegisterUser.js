import React, { useState } from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
} from 'react-native';
import AppTextInput from '../components/AppTextInput';
import AppButton from '../components/AppButton';
import { DatabaseConnection } from '../database/database-connection';

const db = DatabaseConnection.getConnection();

const RegisterUser = ({ navigation }) => {

  let [userId, setUserId] = useState('');
  let [userName, setUserName] = useState('');
  let [userDate, setUserDate] = useState('');
  let [userEmail, setUserEmail] = useState('');

  let register_user = () => {
    console.log(userId, userName, userDate, userEmail);

    if (!userId) {
      alert('Por favor preencha o ID !');
      return;
    }
    if (!userName) {
      alert('Por favor preencha o nome !');
      return;
    }
    if (!userDate) {
      alert('Por favor preencha a data');
      return;
    }
    if (!userEmail) {
      alert('Por favor preencha o email !');
      return;
    }

    db.transaction(function (tx) {
      tx.executeSql(
        'INSERT INTO table_user (user_id, user_name, user_date, user_email) VALUES (?,?,?,?)',
        [userId, userName, userDate, userEmail],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Sucesso',
              'Usuário Registrado com Sucesso !!!',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('HomeScreen'),
                },
              ],
              { cancelable: false }
            );
          } else Alert('Erro ao tentar Registrar o Usuário !!!');
        }
      );
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <KeyboardAvoidingView
              behavior="padding"
              style={{ flex: 1, justifyContent: 'space-between' }}>
              <AppTextInput
                placeholder="Entre com o ID"
                onChangeText={
                  (userId) => setUserId(userId)
                }
                keyboardType="numeric"
                maxLength={10}
                style={{ padding: 10 }}
              />
              <AppTextInput
                placeholder="Entre com o Nome"
                onChangeText={
                  (userName) => setUserName(userName)
                }
                style={{ padding: 10 }}
              />
              <AppTextInput
                placeholder="Entre com a data"
                onChangeText={
                  (userDate) => setUserDate(userDate)
                }
                maxLength={10}
                keyboardType="numeric"
                style={{ padding: 10 }}
              />
              <AppTextInput
                placeholder="Entre com o Email"
                onChangeText={
                  (userEmail) => setUserEmail(userEmail)
                }
                style={{ padding: 10 }}
              />
              <AppButton title="Salvar" customClick={register_user} />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RegisterUser;