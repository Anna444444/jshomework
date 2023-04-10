let searchInput = document.getElementById('search');
let newContactButton = document.getElementById('new-contact');
let exportButton = document.getElementById('export');
let importButton = document.getElementById('import');
let importFile = document.getElementById('import-file');
let contactForm = document.getElementById('contact-form');
let cancelButton = document.getElementById('cancel');
let saveButton = document.getElementById('save');
let contactsBody = document.getElementById('contacts-body');

let contacts = [
    {name: 'Алексей', mobile: '87051001010', cityPhone: '87272865214', address: 'г.Алматы, ул. Кунаева, 10'},
    {name: 'Борис', mobile: '87771028456', cityPhone: '87272658941', address: 'г.Алматы, ул. Жандосова, 204'}
];

searchInput.addEventListener('input', handleSearch);

newContactButton.addEventListener('click', showContactForm);
cancelButton.addEventListener('click', hideContactForm);
saveButton.addEventListener('click', addNewContact);

exportButton.addEventListener('click', downloadCSV);

importButton.addEventListener('click', () => importFile.click());
importFile.addEventListener('change', importContacts);

updateContactsTable();

function handleSearch() {
    let searchValue = searchInput.value.toLowerCase().trim();
    let filteredContacts = contacts.filter(contact =>
        contact.name.toLowerCase().startsWith(searchValue)
    );
    updateContactsTable(filteredContacts);
}

function showContactForm() {
    contactForm.style.display = 'block';
}

function hideContactForm() {
    contactForm.style.display = 'none';
    clearContactForm();
}

function addNewContact() {
    let name = document.getElementById('name').value.trim();
    let mobile = document.getElementById('mobile').value.trim();
    let cityPhone = document.getElementById('city-phone').value.trim();
    let address = document.getElementById('address').value.trim();

    if (name && (mobile || cityPhone)) {
        contacts.push({ name, mobile, cityPhone, address });
        contacts.sort((a, b) => a.name.localeCompare(b.name));
        updateContactsTable();
        hideContactForm();
    } else {
        alert('Заполните обязательные поля: Имя и хотя бы один телефон.');
    }
}

function downloadCSV() {
    let data = contacts.map(contact => 
        Object.values(contact).map(value => 
        value.includes(',') || value.includes('"') ? `"${value.replace(/"/g, '""')}"` : value
        ).join(',')
    ).join('\n');
    
   
    let csvContent = "\uFEFF" + data;  //контент файла с кодировкой UTF-8 и BOM (для корректного отображения кириллицы)
    let blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    let link = document.createElement("a");
    
    if (link.download !== undefined) {
        let url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", "contacts.csv");
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } else {
        window.open(encodeURI("data:text/csv;charset=utf-8," + csvContent));
    }
  }
  
async function importContacts(event) {
    let file = event.target.files[0];
    if (file) {
        let content = await file.text();
        let lines = content.split('\n').slice(1);
        lines.forEach(line => {
            let [name, mobile, cityPhone, address] = line.split(',').map(value => value.replace(/^"|"$/g, '').replace(/""/g, '"'));
            if (name && (mobile || cityPhone)) {
                if (contacts.some(contact => contact.name === name)) {
                    contacts.push({ name: name + ' (imported)', mobile, cityPhone, address });
                } else {
                    contacts.push({ name, mobile, cityPhone, address });
                }
            }
        });
        contacts.sort((a, b) => a.name.localeCompare(b.name));
        updateContactsTable();
    }
    importFile.value = '';
}

function updateContactsTable(filteredContacts = contacts) {
    contactsBody.innerHTML = '';
    filteredContacts.forEach(contact => {
        let tr = document.createElement('tr');
        Object.values(contact).forEach(value => {
            let td = document.createElement('td');
            td.textContent = value;
            tr.appendChild(td);
        });
        contactsBody.appendChild(tr);
    });
}

function clearContactForm() {
    document.getElementById('name').value = '';
    document.getElementById('mobile').value = '';
    document.getElementById('city-phone').value = '';
    document.getElementById('address').value = '';
}