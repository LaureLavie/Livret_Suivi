import { v4 as uuidv4 } from 'uuid';

export default {
  async beforeCreate(event: any) {
    const { data } = event.params;
    if (!data.tokenAcces) {
      data.tokenAcces = uuidv4();
    }
  },
};