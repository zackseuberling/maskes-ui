import { v4 } from 'node-uuid';
import _ from 'lodash';

export class Account {
  constructor(options) {
    _.assign(
      {
        id: v4(),
        accessToken: v4(),
      },
      _.pick(options, ['id', 'username', 'password'])
    );
  }
}
