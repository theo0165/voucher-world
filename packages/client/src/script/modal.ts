const openModalBtn = document.querySelector('#openBtn');
const closeModalBtn = document.querySelector('#closeBtn');
const modal = document.querySelector('.modal');
const modalContent = document.querySelector('.modal-content');

const closeModal = () => {
  if (document.body.classList.contains('modalOpen')) {
    document.body.classList.remove('modalOpen');
  }
};

const openModal = () => {
  if (!document.body.classList.contains('modalOpen')) {
    document.body.classList.add('modalOpen');
  }
};

if (openModalBtn) {
  openModalBtn.addEventListener('click', () => {
    openModal();
  });
}

if (closeModalBtn) {
  closeModalBtn.addEventListener('click', () => {
    closeModal();
  });
}

if (modal) {
  //Close modal if the you click anywhere but the modal content box
  modal.addEventListener('click', function (this: HTMLElement, e: Event) {
    if (this === e.target) {
      closeModal();
    }
  });
}

export default {};
