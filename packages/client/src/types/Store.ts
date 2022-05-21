import Voucher from './Voucher';

export default interface Store {
  id: number;
  name: string;
  primary_color: string;
  secondary_color: string;
  logo: string;
  vouchers: Voucher[];
}
