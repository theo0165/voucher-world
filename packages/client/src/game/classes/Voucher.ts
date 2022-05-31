import Store from '../../types/Store';
import VoucherType from '../../types/Voucher';
import date from 'date-and-time';

export default class Voucher {
  static voucherBox: HTMLDivElement | null = document.querySelector('.voucher');

  static closeBtn = this.voucherBox?.querySelector('#voucher-close');
  static logo: HTMLImageElement | null | undefined =
    this.voucherBox?.querySelector('.voucher-logo img');
  static voucherName = this.voucherBox?.querySelector('.voucher-name');
  static value = this.voucherBox?.querySelector('.voucher-value');
  static dateInterval = this.voucherBox?.querySelector('.voucher-date');
  static linkBtn: HTMLButtonElement | null | undefined =
    this.voucherBox?.querySelector('.voucher-link');
  static link: HTMLAnchorElement | null | undefined =
    this.voucherBox?.querySelector('.voucher-link a');

  private static whiteOrBlack = (input: string) => {
    const color = input.charAt(0) === '#' ? input.substring(1, 7) : input;
    const r = parseInt(color.substring(0, 2), 16); // hexToR
    const g = parseInt(color.substring(2, 4), 16); // hexToG
    const b = parseInt(color.substring(4, 6), 16); // hexToB
    return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? '#000000' : '#ffffff';
  };

  static updateAndShowVoucher(store: Store) {
    if (document.body.classList.contains('voucher-open')) {
      this.closeVoucher();
    }

    let voucher: VoucherType;

    if (
      !this.voucherBox ||
      !this.closeBtn ||
      !this.logo ||
      !this.voucherName ||
      !this.value ||
      !this.dateInterval ||
      !this.link ||
      !this.linkBtn
    )
      throw new Error('Incorrect voucher layout');

    if (store.vouchers.length > 0) {
      voucher = store.vouchers[0];
    } else {
      return;
    }

    this.voucherBox.style.background = store.primary_color;
    this.voucherBox.style.color = this.whiteOrBlack(store.primary_color);
    this.linkBtn.style.background = store.secondary_color;
    this.link.style.color = this.whiteOrBlack(store.secondary_color);

    this.logo.src = store.logo;
    this.voucherName.textContent = voucher.name;
    this.value.textContent = voucher.value;
    this.dateInterval.textContent = `Gäller från ${date.format(
      new Date(voucher.startDate),
      'DD/MM/YYYY'
    )} till ${date.format(new Date(voucher.endDate), 'DD/MM/YYYY')}`;
    this.link.href = voucher.link;

    document.body.classList.add('voucher-open');
  }

  static closeVoucher = () => document.body.classList.remove('voucher-open');
}
