/**
 * Created by gaginho on 11.05.16.
 */
import { EventEmitter } from 'events';
import Dispatcher from '../dispatcher';
import {
    ADD_TODO,
    REMOVE_TODO,
    REMOVE_LIST,
    MARK_DELETED,
} from '../constants/TodoConstants';

let items = [
    { text: 'txttt', key: 0 },
    { text: 'Тудушка', key: 1 },
    { text: 'Тудушка2', key: 2 },
    { text: 'Тудушка3', key: 3 },
];
let markedIDs = {};

const CE = 'CHANGE_EVENT';

class TodoStore extends EventEmitter {
    addChangeListener(c: Function) {
        this.addListener(CE, c);
    }
    //
    // removeChangeListener(c: Function) {
    //     this.removeListener(CE, c);
    // }
    redraw(c: Function) {
        this.addListener(CE, c);
    }

    // addListener(message, callback){
    //     this.addListener(message, )
    // }

    emitChange() {
        this.emit(CE);
    }

    getMarkedIDs() {
        //return markedIDs;
        return Object.assign({}, markedIDs);
    }

    getItems() {
        return items;
    }

    markedItemsExist() {
        let list = this.getMarkedIDs();
        let wannaDel = Object.keys(list);

        let exists = false;
        wannaDel.forEach(function (id, index) {
            let isMarked = list[id];
            if (isMarked) exists = true;
        });
        return exists;
    }

    getUniqueKey = () => {
        return new Date() + '';
    };
}

const store = new TodoStore();

Dispatcher.register((p) => {
    // console.log('dispatcher.register');
    // console.log(p);
    switch (p.actionType) {
        case ADD_TODO:
            let text = p.text;
            console.log('ADD_TODO', items);

            items.push({ text, key: store.getUniqueKey() });

            store.emitChange();
            break;

        case REMOVE_TODO:
            items.splice(p.index, 1);
            store.emitChange();
            break;

        case REMOVE_LIST:
            console.log('deleteList');

            let obj = [];

            let list = Object.assign({}, markedIDs);
            let wannaDel = Object.keys(list);

            wannaDel.forEach((id) => {
                let isMarked = list[id];
                if (isMarked) obj.push(id);
            });

            for (let i = obj.length - 1; i >= 0; i--) {
                let item = obj[i];
                console.log('need to delete ', item);
                //this.deleteItem(item);
                items.splice(item, 1);
            };
            markedIDs = {};
            store.emitChange();
            break;

        case MARK_DELETED:
            // console.log('I AM MARKING DELETED!!!');
            let index = p.index;
            let value = p.status;

            let was = Object.assign({}, markedIDs);

            was[index] = value;
            markedIDs = was;
            store.emitChange();

            break;

        default:
            console.warn(`TYPE IS FUCKED. Got unexpected type ${p.type}`);
            break;
    }
});

export default store;