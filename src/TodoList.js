import React, { Component } from 'react';
import TodoItem from './TodoItem';

import * as actions from '../actions/TodoActions';
import store from '../stores/TodoStore';

export default class TodoList extends Component {
    state = {
        items: [
            { text: 'txttt', key: 0 },
            { text: 'Тудушка', key: 1 },
            { text: 'Тудушка2', key: 2 },
            { text: 'Тудушка3', key: 3 },
        ],
        proposedText: '',
        wannaDelete: {}
    };

    componentWillMount() {
        store.redrawButton(() => {
            this.setState({
                wannaDelete: store.getMarkedIDs(),
                items: store.getItems(),
            });
        });
        // store.addChangeListener(() => {
        //     console.log('redrawList');
        //     this.setState({ items: store.getItems() });
        // });
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
            let list = this.state.items;
            list.splice(index, 1);
            this.setState({ items: list });
        };
    };

    // handleChange = (event) => {
    //     let value = event.target.value;
    //     this.setState({ proposedText: value });
    // };

    getItemList = () => {
        let items = this.state.items;
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