import { observable, action, decorate} from 'mobx';

class AuthStore {
    access_token = null;
    userId = null;

    setToken = token => [
        this.access_token = token
    ]

    setUserId = userId => {
        this.userId = userId
    }

}

decorate(AuthStore, {
    access_token: observable,
    userId: observable,

    setToken: action,
    setUserId: action,
})

export default AuthStore ;