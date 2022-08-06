import { gapi } from "gapi-script";
import { makeAutoObservable, runInAction } from "mobx";
import { GoogleLoginResponse } from "react-google-login";
import { history } from "../..";
import agent from "../api/agent";
import { User, UserFormValues } from "../models/user";
import { store } from "./store";

export default class UserStore {
    user : User | null = null;
    googleAccessToken : string | null = null;
    googleLoading = false;

    constructor() {
        makeAutoObservable(this);
    }

    get isLoggedIn() {
        return !!this.user;
    }

    login = async (creds : UserFormValues) => {
        try{
            const user = await agent.Account.login(creds);
            store.commonStore.setToken(user.token);
            runInAction(() => {
                this.user = user;
            })
            history.push('/activities');
            store.modalStore.closeModal();
        } catch(error) {
            throw error;
        }
    }

    logout = () => {
        store.commonStore.setToken(null);
        window.localStorage.removeItem("jwt");
        this.user = null;
        history.push('/');
    }

    getUser = async () => {
        try{
            const user = await agent.Account.current();
            runInAction(() => {
                this.user = user;
            })
        } catch(error){
            console.log(error);
        }
    }

    register = async (creds : UserFormValues) => {
        try{
            const user = await agent.Account.register(creds);
            store.commonStore.setToken(user.token);
            runInAction(() => {
                this.user = user;
            })
            history.push('/activities');
            store.modalStore.closeModal();
        } catch(error) {
            throw error;
        }
    }

    setImage = (image : string) => {
        if (this.user) this.user.image = image;
    }

    setDisplayName = (name: string) => {
        if (this.user) this.user.displayName = name;
    }

    googleLogin = (response : GoogleLoginResponse) => {
        this.googleLoading = true;

        const apiLogin = (accessToken : string) => {
            agent.Account.googleLogin(accessToken).then(user => {
                store.commonStore.setToken(user.token);
                runInAction(() => {
                    this.user = user;
                    this.googleLoading = false;
                })
                history.push('/activities');
            }).catch(error => {
                console.log(error);
                runInAction(() => this.googleLoading = false);
            })
        }
        
        this.googleAccessToken = response.accessToken;
        if (this.googleAccessToken) {
            apiLogin(this.googleAccessToken);
        }
    }
}