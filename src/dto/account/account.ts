import { v4 } from 'node-uuid';
import _ from 'lodash';

export class Account {
  constructor(options = {}) {
    _.assign(
      {
        id: v4(),
        accessToken: v4(),
        roles: ['volunteer'],
      },
      _.pick(options, ['id', 'first_name', 'last_name', 'username', 'password'])
    );
  }
}
