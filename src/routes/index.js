import { Router } from 'express';

import { validateRule } from '../middleware';

const router = Router();

router.post('/', validateRule, (req, res) => {
  const { rule, data } = req.body;
  res.status(400).json({
    message: `field ${rule.field} failed validation.`,
    status: 'error',
    data: {
      validation: {
        error: true,
        field: `${rule.field}`,
        field_value: data[`${rule.field}`],
        condition: rule.condition,
        condition_value: rule.condition_value,
      },
    },
  });
});

export default router;
