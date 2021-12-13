const contactsOperation = require('./contacts.js')

const argv = require('yargs').argv;

// TODO: рефакторить
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
          const contacts = await contactsOperation.listContacts();
          console.table(contacts);
      break;

    case 'get':
          const contact = await contactsOperation.getContactById(id);
          console.table(contact);
      break;

    case 'add':
          const newContact = await contactsOperation.addContact({ name, email, phone });
      console.table(newContact);
          break;

    case 'remove':
      const removeContact = await contactsOperation.removeContact(id);
    
      console.table(removeContact);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);