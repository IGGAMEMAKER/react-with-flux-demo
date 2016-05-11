/**
 * Created by gaginho on 11.05.16.
 */
import AppDispatcher from '../dispatcher';
import {
    ADD_TODO,
    REMOVE_TODO,
    REMOVE_LIST,
    MARK_DELETED,
} from '../constants/TodoConstants';


export function addItem(text) {
    AppDispatcher.dispatch({
        actionType: ADD_TODO,
        text,
    });
}

export function removeItem(index) {
    AppDispatcher.dispatch({
        actionType: REMOVE_TODO,
        index,
    });
}

export function markForDeleting(index, status) {
    console.log('markForDeleting', index, status);

    AppDispatcher.dispatch({
        actionType: MARK_DELETED,
        index,
        status,
    });
}

export function removeList() {
    AppDispatcher.dispatch({
        actionType: REMOVE_LIST,
    });
}