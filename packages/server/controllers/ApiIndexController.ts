import { Request, Response } from 'express';

const ApiIndexController = (req: Request, res: Response): void => {
  res.send('Hello');
};

export default ApiIndexController;
