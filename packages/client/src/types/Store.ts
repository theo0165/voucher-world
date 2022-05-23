import Voucher from './Voucher';

export default interface Store {
  id: number;
  name: string;
  logo: string;
  vouchers: Voucher[];
}
