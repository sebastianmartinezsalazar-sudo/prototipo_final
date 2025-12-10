
const SHOW_TIPS_BUTTON = document.getElementById('show-tips-btn');
const TIPS_CONTAINER = document.getElementById('tips');


SHOW_TIPS_BUTTON.addEventListener('click', function() {
  if (TIPS_CONTAINER.classList.contains('hidden')) {
    TIPS_CONTAINER.classList.remove('hidden');
    SHOW_TIPS_BUTTON.textContent = 'Ocultar consejos';
  } else {
    TIPS_CONTAINER.classList.add('hidden');
    SHOW_TIPS_BUTTON.innerHTML = '<i class="fas fa-heart"></i> Mostrar consejos';
  }
});

const CONTACT_FORM = document.getElementById('support-form');
const NAME_INPUT = document.getElementById('name');
const EMAIL_INPUT = document.getElementById('email');
const SUPPORT_TYPE_SELECT = document.getElementById('support-type');
const MESSAGE_TEXTAREA = document.getElementById('message');


function showError(elementId, message) {
  document.getElementById(elementId).textContent = message;
}

function clearErrors() {
  document.querySelectorAll('.error').forEach(el => el.textContent = '');
}

function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}


CONTACT_FORM.addEventListener('submit', function(e) {
  e.preventDefault();
  clearErrors();
  
  let isValid = true;

  if (!NAME_INPUT.value.trim()) {
    showError('name-error', 'Por favor, escribe tu nombre.');
    isValid = false;
  }
  if (!EMAIL_INPUT.value.trim()) {
    showError('email-error', 'El email es obligatorio.');
    isValid = false;
  } else if (!isValidEmail(EMAIL_INPUT.value)) {
    showError('email-error', 'Por favor, escribe un email válido.');
    isValid = false;
  }

  if (SUPPORT_TYPE_SELECT.value === '') {
    showError('support-type-error', 'Por favor, selecciona una opción.');
    isValid = false;
  }

  
  if (!MESSAGE_TEXTAREA.value.trim()) {
    showError('message-error', 'El mensaje no puede estar vacío.');
    isValid = false;
  }

  if (isValid) {
    alert('¡Gracias! Hemos recibido tu solicitud. Pronto te contactaremos.');
    CONTACT_FORM.reset();
  }
});

const journalForm = document.getElementById('journal-form');
const journalList = document.getElementById('journal-list');

function loadJournalEntries() {
  const entries = JSON.parse(localStorage.getItem('journalEntries') || '[]');
  journalList.innerHTML = '';
  entries.forEach((entry, index) => {
    const div = document.createElement('div');
    div.className = 'journal-entry';
    div.innerHTML = `
      <h4>${entry.title}</h4>
      <p>${entry.content}</p>
      <button onclick="deleteEntry(${index})">Eliminar</button>
      <button onclick="editEntry(${index})">Editar</button>
    `;
    journalList.appendChild(div);
  });
}

journalForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const title = document.getElementById('journal-title').value.trim();
  const content = document.getElementById('journal-content').value.trim();
  if (!title || !content) return;

  const entries = JSON.parse(localStorage.getItem('journalEntries') || '[]');
  entries.push({ title, content });
  localStorage.setItem('journalEntries', JSON.stringify(entries));
  journalForm.reset();
  loadJournalEntries();
});

window.deleteEntry = function (index) {
  const entries = JSON.parse(localStorage.getItem('journalEntries') || '[]');
  entries.splice(index, 1);
  localStorage.setItem('journalEntries', JSON.stringify(entries));
  loadJournalEntries();
};

window.editEntry = function (index) {
  const entries = JSON.parse(localStorage.getItem('journalEntries') || '[]');
  const entry = entries[index];
  document.getElementById('journal-title').value = entry.title;
  document.getElementById('journal-content').value = entry.content;

  journalForm.onsubmit = function (e) {
    e.preventDefault();
    entries[index] = {
      title: document.getElementById('journal-title').value.trim(),
      content: document.getElementById('journal-content').value.trim()
    };

    localStorage.setItem('journalEntries', JSON.stringify(entries));
    journalForm.reset();
    loadJournalEntries();
    journalForm.onsubmit = null;
  };
};

function revealOnScroll() {
  const reveals = document.querySelectorAll('.reveal');
  reveals.forEach(el => {
    const top = el.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    if (top < windowHeight - 100) {
      el.classList.add('active');
    }
  });
}

window.addEventListener('scroll', revealOnScroll);
revealOnScroll();

loadJournalEntries();