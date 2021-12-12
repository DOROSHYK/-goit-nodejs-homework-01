const fs = require('fs').promises;
const path = require('path');
const { randomUUID } = require('crypto');

 
  const contactsPath = path.join(__dirname, "./db/contacts.json");
 

// TODO: задокументировать каждую функцию
async function listContacts() {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

async function getContactById( contactId ) {
  const contacts = await listContacts();
  // console.log(contacts)
  const oneContact = contacts.find(item => item.id === contactId)
  
  if (!oneContact) {
    return null;
    // return `contact with this id ${contactId} is not found`;
  }
  return oneContact;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const idx = contacts.findIndex(item => item.id === contactId)
  if (idx === -1) {
    return null;
  }
  const removeContactById = contacts.splice(idx, 1);
  // const removeContactById = contacts.filter((_, index) => index !==idx)
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return removeContactById;
  // return contacts[idx];
}

async function addContact({ name, email, phone }) {
  const contacts = await listContacts();
  const newContact = {
    id: randomUUID(),
    name,
    email,
    phone

  }
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact
}