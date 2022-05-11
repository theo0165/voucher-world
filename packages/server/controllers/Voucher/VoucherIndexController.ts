import { Request, Response } from 'express';
import { supabase } from '../../utils/supabase';

const VoucherIndexController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const vouchers = await supabase.from('voucher').select(`
    id,
    name,
    value,
    color,
    store (
      id,
      name,
      primary_color,
      secondary_color,
      logo
    )
  `);

  if (vouchers.error) {
    res.json({
      error: vouchers.error.message,
      code: vouchers.status,
      successful: false,
    });

    return;
  }

  res.json({ data: vouchers.data, successful: true });
};

export default VoucherIndexController;
