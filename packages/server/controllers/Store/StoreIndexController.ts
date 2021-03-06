import { Request, Response } from 'express';
import { supabase } from '../../utils/supabase';

const StoreIndexController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const stores = await supabase.from('store').select(`
    id,
    name,
    primary_color,
    secondary_color,
    logo,
    vouchers: voucher (
      id,
      value,
      startDate,
      endDate,
      link
    )
  `);

  if (stores.error) {
    res.json({
      error: stores.error.message,
      code: stores.status,
      successful: false,
    });

    return;
  }

  res.json({ data: stores.data, successful: true });
};

export default StoreIndexController;
