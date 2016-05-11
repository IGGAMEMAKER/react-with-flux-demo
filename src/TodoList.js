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

    // componentWillMount() {
    //     store.addChangeListener(() => {
    //         console.log('wilmount');
    //     });
    // }

    deleteList = () => {
        console.log('deleteList');

        let list = this.state.wannaDelete;
        let wannaDel = Object.keys(list);

        let obj = [];

        wannaDel.forEach((id) => {
            let isMarked = list[id];
            if (isMarked) obj.push(id);
        });

        let items = this.state.items;
        for (let i = obj.length - 1; i >= 0; i--) {
            let item = obj[i];
            console.log('need to delete ', item);
            //this.deleteItem(item);
            items.splice(item, 1);
        };

        this.setState({ wannaDelete: {}, items });
    };
    getUniqueKey = () => {
        return new Date() + '';
    };
    
    addItem = (text) => {
        return () => {
            if (!text) return;
            let list = this.state.items;
            list.push({ text, key: this.getUniqueKey() });
            this.setState({ items: list, proposedText: '' });
        };
    };

    deleteItem(index) {
        return () => {
            let list = this.state.items;
            list.splice(index, 1);
            this.setState({ items: list });
        };
    };

    addWannaDelete = (index) => {
        return (event) => {
            let status = document.getElementById('wannaDelete' + index).checked;
            actions.markForDeleting(index, status);

            // let targ = document.getElementById('wannaDelete' + index).checked;
            //
            // let was = this.state.wannaDelete;
            //
            // was[index] = targ;
            // this.setState({ wannaDelete: was });
        };
    };

    handleChange = (event) => {
        let value = event.target.value;
        this.setState({ proposedText: value });
    };

    getItemList = () => {
        let items = this.state.items;
        let itemList = <li> No todos, sorry </li>;

        if (this.state.items.length) {
            itemList = items.map((item, index) => {
                let id = 'wannaDelete' + index;
                // let key = index;//+'_'+new Date();
                let key = item.key;
                // console.log(key);
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

    getDeleteListButton = () => {
        const deleteListButton = <input type="button" value="Delete all" onClick={this.deleteList} />;
        let deleteList = '';

        let list = this.state.wannaDelete;
        let wannaDel = Object.keys(list);

        wannaDel.forEach(function (id, index) {
            console.log(id, index);
            let isMarked = list[id];
            if (isMarked) deleteList = deleteListButton;
        });
        return deleteList;
    };

    render() {
        let itemList = this.getItemList();
        let deleteListButton = this.getDeleteListButton();

        let addItemButton = (
            <div>
                <input id="textField" type="text" onChange={this.handleChange} value={this.state.proposedText} />
                <input type="submit" value="Add" onClick={this.addItem(this.state.proposedText)} />
            </div>
        );

        return (
            <div>
                <ul>{itemList}</ul>
                <div>{addItemButton}</div>
                <div>{deleteListButton}</div>
            </div>
        );
    }

}