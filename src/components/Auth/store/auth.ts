import _ from 'lodash';
import { Account } from '../../../dto/account/account';

const fakeUserList: Account[] = [];
let isLogin: boolean = false;
let activeAccount: Account;

export function createAccount({ first_name, last_name, username, password }): Promise<Account> {
    console.log('Requesting to register', first_name, last_name, username, password);
    if (!isLogin) {
        return delayPromise(2000).then(() => {
            if (Math.random() > 0.8) {
                return Promise.reject({
                    errorMessage: 'Fails to create account',
                });
            }

            isLogin = true;
            activeAccount = new Account({
                first_name,
                last_name,
                username,
                password,
            });
            fakeUserList.push(activeAccount);
            return activeAccount;
        });
    }

    return Promise.resolve(activeAccount);
}

export function login({ username, password }): Promise<Account> {
    console.log('Requesting to login', username, password);
    if (!isLogin) {
        return delayPromise(2000).then(() => {
            if (Math.random() > 0.8) {
                return Promise.reject({
                    errorMessage: 'Fails to log in',
                });
            }
            isLogin = true;
            activeAccount = _.find(fakeUserList, { username });
            console.log('Successfully loggin in');
            return activeAccount;
        });
    }

    return Promise.resolve(activeAccount);
}

function delayPromise(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
