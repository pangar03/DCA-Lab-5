import { reducer } from './reducer';
import { AppState, Observer } from '../types/store';
import Storage from '../utils/storage'; 

// El estado global
const initialState: AppState = {
    screen: 'DASHBOARD',
    cart: [],
    products: [],
};

export let appState = Storage.get('STORE', initialState);

let observers: Observer[] = [];

const persistStore = (state: any) => {
    Storage.set('STORE', state);
}

// Creamos el dispatch

export const dispatch = (action: any) => {
    const clone = JSON.parse(JSON.stringify(appState)); //Es mejor trabajar con una copia siempre
    const newState = reducer(action, clone);
    
    appState = newState;
    persistStore(appState);

    observers.forEach((observer) => observer.render());
};

// Agregar los observadores para los interesados, los suscritos
export const addObserver = (ref: any) => {
    observers = [...observers, ref];
}