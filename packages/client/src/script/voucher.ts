const voucherBox: HTMLDivElement | null = document.querySelector('.voucher');

if (!voucherBox) throw new Error('Voucher display box not present');

const closeBtn = voucherBox.querySelector('#voucher-close');

closeBtn?.addEventListener('click', () =>
  document.body.classList.remove('voucher-open')
);

export {};
