import _ from 'lodash';
import { Account } from './account/account';

const fakeUserList: Account[] = [];
let isLogin: boolean = false;
let activeAccount: Account;

export function createAccount({ password, username }): Promise<Account> {
  if (!isLogin) {
    return delayPromise(2000).then(() => {
      if (Math.random() > 0.8) {
        return Promise.reject({
          errorMessage: 'Fails to create account',
        });
      }

      isLogin = true;
      activeAccount = new Account({
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
    if (Math.random() > 0.5) {
      return Promise.reject({
        errorMessage: 'Fails to log in',
      });
    }
    return delayPromise(2000).then(() => {
      isLogin = true;
      activeAccount = _.find(fakeUserList, { username });
      return activeAccount;
    });
  }

  return Promise.resolve(activeAccount);
}

function delayPromise(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
