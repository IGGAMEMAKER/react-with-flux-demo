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
let proposedText = '';
let wannaDelete = {};

const CE = 'CHANGE_EVENT';

class TodoStore extends EventEmitter {
    // addChangeListener(c: Function) {
    //     this.addListener(CE, c);
    // }
    //
    // removeChangeListener(c: Function) {
    //     this.removeListener(CE, c);
    // }
    redrawButton(c: Function){
        this.addListener(CE, c);
    }

    emitChange() {
        this.emit(CE);
    }

    getMarkedIDs(){
        return wannaDelete;
    }
}

const store = new TodoStore();

Dispatcher.register((p) => {
    console.log('dispatcher.register');
    // console.log(p);
    switch (p.actionType) {
        case ADD_TODO:

            store.emitChange();
            break;

        case REMOVE_TODO:
            _lastAnsweredQuestionId = p.id;
            store.emitChange();
            break;

        case REMOVE_LIST:

            store.emitChange();
            break;
        case MARK_DELETED:
            // console.log('I AM MARKING DELETED!!!');
            let index = p.index;
            let value = p.status;

            let was = Object.assign({}, wannaDelete);

            was[index] = value;
            wannaDelete = was;
            console.log('wannaDelete', wannaDelete);
            store.emitChange();
            
            break;

        default:
            console.warn(`TYPE IS FUCKED. Got unexpected type ${p.type}`);
            break;
    }
});

export default store;