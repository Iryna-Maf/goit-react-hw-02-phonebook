import { Component } from 'react';
import { nanoid } from 'nanoid';

import FormAddPhone from './FormAddPhone/FormAddPhone';
import Contacts from './Contacts/Contacts';

import s from './App.module.css';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  addContact = data => {
    if (this.isDublicate(data)) {
      return alert(`${data.name} - ${data.number} is already in phonebook`);
    }

    // console.log(data);
    this.setState(prevState => {
      const newContact = {
        id: nanoid(),
        ...data,
      };

      return {
        contacts: [...prevState.contacts, newContact],
      };
    });
  };

  removeContact = id => {
    this.setState(({ contacts }) => {
      const newContacts = contacts.filter(item => item.id !== id);

      return {
        contacts: newContacts,
      };
    });
  };

  handleFilter = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  isDublicate({ name, number }) {
    const { contacts } = this.state;
    const result = contacts.find(
      item => item.name === name && item.number === number
    );
    return result;
  }

  getFilteredContacts() {
    const { contacts, filter } = this.state;

    if (!filter) {
      return contacts;
    }

    const normalizedFilter = filter.toLowerCase();

    const filteredContacts = contacts.filter(({ name, number }) => {
      const normalizedName = name.toLowerCase();
      const result =
        normalizedName.includes(normalizedFilter) || number.includes(filter);
      return result;
    });

    return filteredContacts;
  }

  render() {
    // const { contacts } = this.state;
    const { addContact, removeContact, handleFilter } = this;

    const contacts = this.getFilteredContacts();

    return (
      <div>
        <h2 className={s.title}>Phonebook</h2>
        <div className={s.container}>
          <FormAddPhone onSubmit={addContact} />
        </div>

        <div>
          <h2 className={s.title}>Contacts</h2>
          <p className={s.paragraph}>Find contacts by name</p>
          <input
            name="filter"
            onChange={handleFilter}
            className={s.input}
            placeholder="Filter"
          />
          <Contacts items={contacts} removeContact={removeContact} />
        </div>
      </div>
    );
  }
}

export default App;
