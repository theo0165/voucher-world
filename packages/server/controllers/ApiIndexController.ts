import { Request, Response } from 'express';
import { supabase } from '../utils/supabase';

const ApiIndexController = (req: Request, res: Response): void => {
  res.send('hello');
};

export default ApiIndexController;
