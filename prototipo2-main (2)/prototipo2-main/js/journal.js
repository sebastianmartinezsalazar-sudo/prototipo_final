// Cargar y gestionar entradas del diario
function loadEntries() {
  const entries = JSON.parse(localStorage.getItem('journalEntries') || '[]');
  const list = document.getElementById('journal-list');
  if (!list) return;

  list.innerHTML = '';
  entries.forEach((entry, index) => {
    const div = document.createElement('div');
    div.className = 'journal-entry';
    div.innerHTML = `
      <h4>${entry.title}</h4>
      <p>${entry.content}</p>
      <button onclick="editEntry(${index})">✏️ Editar</button>
      <button onclick="deleteEntry(${index})" style="background:#d32f2f;">🗑️ Eliminar</button>
    `;
    list.appendChild(div);
  });
}

function saveEntry(e) {
  e.preventDefault();
  const title = document.getElementById('journal-title')?.value.trim();
  const content = document.getElementById('journal-content')?.value.trim();
  if (!title || !content) return;

  const entries = JSON.parse(localStorage.getItem('journalEntries') || '[]');
  entries.push({ title, content });
  localStorage.setItem('journalEntries', JSON.stringify(entries));
  document.getElementById('journal-form')?.reset();
  loadEntries();
}

window.deleteEntry = function(index) {
  if (!confirm('¿Segura que deseas eliminar esta entrada?')) return;
  const entries = JSON.parse(localStorage.getItem('journalEntries') || '[]');
  entries.splice(index, 1);
  localStorage.setItem('journalEntries', JSON.stringify(entries));
  loadEntries();
};

window.editEntry = function(index) {
  const entries = JSON.parse(localStorage.getItem('journalEntries') || '[]');
  const entry = entries[index];
  document.getElementById('journal-title').value = entry.title;
  document.getElementById('journal-content').value = entry.content;

  document.getElementById('journal-form').onsubmit = function(e) {
    e.preventDefault();
    entries[index] = {
      title: document.getElementById('journal-title').value.trim(),
      content: document.getElementById('journal-content').value.trim()
    };
    localStorage.setItem('journalEntries', JSON.stringify(entries));
    this.reset();
    loadEntries();
    this.onsubmit = null;
  };
};

// Inicializar
document.getElementById('journal-form')?.addEventListener('submit', saveEntry);
loadEntries();