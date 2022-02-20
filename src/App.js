import './App.css';
import {React, Component} from 'react';
import ListItems from './ListItems';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faTrash} from '@fortawesome/free-solid-svg-icons';

library.add(faTrash);

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      items: [],
      currentItem: {
        data: '',
        key: ''
      }
    }

    this.handleInputForm = this.handleInputForm.bind(this);
    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.setUpdate = this.setUpdate.bind(this);
  }

  handleInputForm(e){
    this.setState({
      currentItem: {
        data: e.target.value,
        key: Date.now()
      }
    });
  }

  addItem(e){
    e.preventDefault();
    const newItem = this.state.currentItem;

    if(newItem.data!==""){
      const newItems = [...this.state.items, newItem];
      this.setState({
        items: newItems,
        currentItem:{
          data: '',
          key: ''
        }
      })
    }
  }

  deleteItem(key){
    const filteredItems = this.state.items.filter( item => item.key!==key);
    this.setState({
      items: filteredItems
    })
  }

  setUpdate(data, key){
    const items = this.state.items;
    items.map(item=>{
      if(item.key===key){
        item.data = data;
      }
    });

    this.setState({
      items: items
    })
  }

  render(){
    return (
      <div className="App">
        <header className="App-header">
         <form id='load-form' onSubmit={this.addItem}>
           <input 
              type='text' 
              name="loanData" 
              id="loanData" 
              placeholder='Customer Name'
              defaultValue={this.state.currentItem.data}  
              onChange={this.handleInputForm}
            />
           <button type='submit'>Add</button>
         </form>         
        </header>
        <ListItems 
        items={this.state.items}
        deleteItem={this.deleteItem}
        setUpdate={this.setUpdate}
        ></ListItems>
      </div>
    );
  }
}

export default App;
