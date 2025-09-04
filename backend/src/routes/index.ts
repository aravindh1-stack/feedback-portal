import { Router } from 'express';

const router = Router();

router.get('/version', (_req, res) => {
  res.json({ version: 'v1' });
});

export default router;
