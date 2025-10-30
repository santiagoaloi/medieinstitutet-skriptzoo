const dialog = document.getElementById('animal-dialog');
const dialogImg = document.getElementById('dialog-img');
const closeBtn = document.getElementById('close-dialog');
const dialogName = document.getElementById('dialog-name');
const dialogMeta = document.getElementById('dialog-meta');
const dialogDesc = document.getElementById('dialog-desc');

function showInfo(el) {
  dialogName.textContent = `${el.dataset.name} — ${el.dataset.type}`;
  dialogImg.src = el.querySelector('img').src;
  dialogImg.alt = el.dataset.type;

  // Clear previous meta content
  dialogMeta.innerHTML = '';

  // Type
  const typeText = document.createTextNode(`${el.dataset.type} • `);
  dialogMeta.appendChild(typeText);

  // Birth
  const birthText = document.createTextNode(`Född ${el.dataset.birth} • `);
  dialogMeta.appendChild(birthText);

  // Color span
  const colorSpan = document.createElement('span');
  colorSpan.textContent = el.dataset.color;
  colorSpan.classList.add('color-text');
  colorSpan.classList.add(`color-${el.dataset.color.toLowerCase()}`);
  dialogMeta.appendChild(colorSpan);

  // Description
  dialogDesc.textContent = el.dataset.desc;

  dialog.showModal();
  document.body.style.overflow = 'hidden';
}

// Listeners
closeBtn.addEventListener('click', () => {
  dialog.close();
  document.body.style.overflow = '';
});
