import Voucher from './Voucher';

export default interface Store {
  id: number;
  name: string;
  logo: string;
  primary_color: string;
  secondary_color: string;
  vouchers: Voucher[];
}
