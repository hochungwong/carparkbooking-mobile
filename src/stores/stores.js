import UserStore from './UserStore';
import AuthStore from './AuthStore';

const stores = {
    userStore: new UserStore(),
    authStore: new AuthStore(),
}

export default stores;