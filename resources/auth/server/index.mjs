import * as alt from 'alt';
import bcrypt from 'bcryptjs';
import { Database,fetchDatabaseInstance } from 'simplymongo';

new Database('mongodb://localhost:27017', "gta", ['accounts']);
alt.onClient('auth:Try', handleAuthAttempt);

async function handleAuthAttempt(player, username, password, email) {
    alt.log('handleAuthAttempt',player, username, password, email);
    if (username == '' || username == null) {
        return
    }
    if (password == '' || password == null) {
        return
    }
    if (email == '') {
        return
    }
    if (email) { 
       await handleRegister(...arguments)
    }else{
       await  handleLogin(...arguments)
    }
}
async function handleLogin(player, username, password) {
    alt.log('login', username, password);
    const db = await fetchDatabaseInstance()
    const usernames = await db.fetchAllByField('username', username,'accounts')
    if (usernames.length<=0) {
        alt.emitClient(player,'auth:Error','Пользователя с таким именем не существует')
    }
    if (usernames[0]&&usernames[0].password&&bcrypt.compareSync(password, usernames[0].password)) {
        alt.log('verifyPassword')
        alt.emitClient(player,'auth:Done','Вход выполнен');
        alt.log('spawn')
        player.model ='s_m_y_airworker'
        player.spawn(...SPAWN);
        alt.emit('player:Spawn', player)
    }else{
         alt.emitClient(player,'auth:Error','Неверный пароль')
    }
}
async function handleRegister(player, username, password, email) {
    alt.log('reg', username, password, email);
    const db = await fetchDatabaseInstance();
    const emails = await db.fetchAllByField('email', email, 'accounts')
    alt.log(1)
    if (emails.length >= 1) {
        alt.emitClient(player, 'auth:Error', 'Аккаунт с такие емайл уже существует')
        return false
    }
    alt.log(2)
    const usernames = await db.fetchAllByField('username', username, 'accounts')
    if (usernames.length >= 1) {
        alt.emitClient(player, 'auth:Error', 'Аккаунт с такие username уже существует')
        return false
    }
    const data = {
        username,
        email,
        password: bcrypt.hashSync(password, 8) 
    }
    const dbData = await db.insertData(data, 'accounts', true)
    alt.emitClient(player, 'auth:Done', 'Регистрация выполнена');
    await handleLogin(...arguments)
}
const SPAWN = [
    925.329, 46.152, 80.908
]
alt.on('playerConnect', (player) => {

    alt.emitClient(player, "auth:Open");

    // player.model ='s_m_y_airworker'
    //player.spawn(...SPAWN);
});
