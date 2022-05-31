import Store from '../types/Store';
import Voucher from '../types/Voucher';
import date from 'date-and-time';

const voucherBox: HTMLDivElement | null = document.querySelector('.voucher');

if (!voucherBox) throw new Error('Voucher display box not present');

const closeBtn = voucherBox.querySelector('#voucher-close');
const logo: HTMLImageElement | null =
  voucherBox.querySelector('.voucher-logo img');
const voucherName = voucherBox.querySelector('.voucher-name');
const value = voucherBox.querySelector('.voucher-value');
const dateInterval = voucherBox.querySelector('.voucher-date');
const linkBtn: HTMLButtonElement | null =
  voucherBox.querySelector('.voucher-link');
const link: HTMLAnchorElement | null =
  voucherBox.querySelector('.voucher-link a');

if (
  !closeBtn ||
  !logo ||
  !voucherName ||
  !value ||
  !dateInterval ||
  !link ||
  !linkBtn
)
  throw new Error('Incorrect voucher layout');

closeBtn.addEventListener('click', () =>
  document.body.classList.remove('voucher-open')
);

document.body.classList.add('voucher-open');

const whiteOrBlack = (input: string) => {
  const color = input.charAt(0) === '#' ? input.substring(1, 7) : input;
  const r = parseInt(color.substring(0, 2), 16); // hexToR
  const g = parseInt(color.substring(2, 4), 16); // hexToG
  const b = parseInt(color.substring(4, 6), 16); // hexToB
  return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? '#000000' : '#ffffff';
};

export const updateAndShowVoucher = (store: Store, voucher: Voucher) => {
  voucherBox.style.background = store.primaryColor;
  voucherBox.style.color = whiteOrBlack(store.primaryColor);
  linkBtn.style.background = store.secondaryColor;
  link.style.color = whiteOrBlack(store.secondaryColor);

  logo.src = store.logo;
  voucherName.textContent = voucher.name;
  value.textContent = voucher.value;
  dateInterval.textContent = `Gäller från ${date.format(
    new Date(voucher.startDate),
    'DD/MM/YYYY'
  )} till ${date.format(new Date(voucher.endDate), 'DD/MM/YYYY')}`;
  link.href = voucher.link;

  if (document.body.classList.contains('voucher-open')) {
    document.body.classList.add('voucher-open');
  }
};

export const closeVoucher = () =>
  document.body.classList.remove('voucher-open');
