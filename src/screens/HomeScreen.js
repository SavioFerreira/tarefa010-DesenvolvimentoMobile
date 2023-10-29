import React, { useEffect } from 'react';
import { View, SafeAreaView } from 'react-native';
import AppImageButton from '../components/AppImageButton';
import { DatabaseConnection } from '../database/database-connection';
import AppClose from '../components/AppClose';

const db = DatabaseConnection.getConnection();

const HomeScreen = ({ navigation }) => {
  useEffect(() => {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM tarefaDDM WHERE type='table' AND name='table_user'",
        [],
        function (tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS table_user', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS table_user(user_id INTEGER PRIMARY KEY, user_name VARCHAR(20), user_date VARCHAR(20), user_email VARCHAR(30))',
              []
            );
          }
        }
      );
    });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>

            <AppImageButton
              title="Registrar Usuário"
              btnColor='#2992C4'
              btnIcon="user-plus"
              customClick={() => navigation.navigate('Register')}
            />

            <AppImageButton
              title="Atualizar Usuário"
              btnColor='#A45BB9'
              btnIcon="user-circle"
              customClick={() => navigation.navigate('Update')}
            />

            <AppImageButton
              title="Visualizar Usuário"
              btnColor='#F9AD29'
              btnIcon="user"
              customClick={() => navigation.navigate('View')}
            />
            <AppImageButton
              title="Visualizar Todos"
              btnColor='#51DC32'
              btnIcon="users"
              customClick={() => navigation.navigate('ViewAll')}
            />
            <AppImageButton
              title="Excluir Usuário"
              btnColor='#384F62'
              btnIcon="user-times"
              customClick={() => navigation.navigate('Delete')}
            />
             <AppImageButton
              title="FecharApp"
              btnColor='#D1503A'
              btnIcon="close"
              customClick={() => AppClose()}
            />
          </View>
        </View>

      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;