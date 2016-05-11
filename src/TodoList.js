import React, { Component } from 'react';
import TodoItem from './TodoItem';

import * as actions from '../actions/TodoActions';
import store from '../stores/TodoStore';

export default class TodoList extends Component {
    state = {};

    componentWillMount() {
        store.redraw(() => {
            this.setState({
                markedIDs: store.getMarkedIDs(),
                items: store.getItems(),
            });
        });
    }

    deleteList = () => {
        actions.removeList();
    };

    addItem = () => {
        let text = document.getElementById('textField').value;
        if (!text) return;
        document.getElementById('textField').value = '';
        actions.addItem(text);
    };

    addWannaDelete = (index) => {
        return (event) => {
            let status = document.getElementById('wannaDelete' + index).checked;
            actions.markForDeleting(index, status);
        };
    };

    deleteItem(index) {
        return () => {
            actions.removeItem(index);
        };
    };

    getItemList = () => {
        let items = store.getItems();
        let itemList = <li> No todos, sorry </li>;

        if (items.length) {
            itemList = items.map((item, index) => {
                let id = 'wannaDelete' + index;
                let key = item.key;
                return (
                    <li key={key}>
                        <input type="checkbox" id={id} name="wannaDelete" onChange={this.addWannaDelete(index)} />
                        <TodoItem item={item} />
                        <a href="#" onClick={this.deleteItem(index)}> X </a>
                    </li>
                );
            });
        }
        return itemList;
    };

    render() {
        let itemList = this.getItemList();

        //let deleteListButton = this.getDeleteListButton();
        let deleteListButton = store.markedItemsExist() ?
            <input type="button" value="Delete all" onClick={this.deleteList} /> :
            '';

        return (
            <div>
                <ul>{itemList}</ul>
                <div>
                    <input id="textField" type="text" />
                    <input type="submit" value="Add" onClick={this.addItem} />
                </div>
                <div>{deleteListButton}</div>
            </div>
        );
    }

}