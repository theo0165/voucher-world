import Voucher from './Voucher';

export default interface Store {
  id: number;
  name: string;
  logo: string;
  primaryColor: string;
  secondaryColor: string;
  vouchers: Voucher[];
}
