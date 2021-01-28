export const validateRule = (req, res, next) => {
  const { rule, data } = req.body;

  //validating inputs

  if (typeof req.body !== 'object') {
    return res.status(400).json({
      message: 'Invalid JSON payload passed.',
      status: 'error',
      data: null,
    });
  }
  if (!rule)
    return res
      .status(400)
      .json({ message: 'rule is required.', status: 'error', data: null });

  if (typeof rule !== 'object')
    return res.status(400).json({
      message: 'rule should be an object.',
      status: 'error',
      data: null,
    });

  if (!rule.field)
    return res.status(400).json({
      message: 'rule.field is required.',
      status: 'error',
      data: null,
    });

  if (!rule.condition)
    return res.status(400).json({
      message: 'rule.condition is required.',
      status: 'error',
      data: null,
    });

  if (!rule.condition_value)
    return res.status(400).json({
      message: 'rule.condition_value is required.',
      status: 'error',
      data: null,
    });

  if (!data)
    return res
      .status(400)
      .json({ message: 'data is required.', status: 'error', data: null });

  if (typeof data !== 'object' && typeof data !== 'string')
    return res.status(400).json({
      message: 'data should be an object, an array or string.',
      status: 'error',
      data: null,
    });

  //fields validation

  if (typeof data === 'string')
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

  const getRuleField = rule.field.split('.');

  if (!(`${getRuleField[0]}` in data)) {
    return res.status(400).json({
      message: `field ${getRuleField[0]} is missing from data.`,
      status: 'error',
      data: null,
    });
  }

  if (typeof data[`${getRuleField[0]}`] !== 'object') {
    if (
      (data[`${rule.field}`] >= rule.condition_value &&
        rule.condition === 'gte') ||
      (data[`${rule.field}`] > rule.condition_value &&
        rule.condition === 'gt') ||
      (data[`${rule.field}`] === rule.condition_value &&
        rule.condition === 'eq') ||
      (data[`${rule.field}`] !== rule.condition_value &&
        rule.condition === 'neq') ||
      (rule.condition_value.toString().indexOf(`${data[`${rule.field}`]}`) &&
        rule.condition === 'contains')
    ) {
      return res.status(200).json({
        message: `field ${rule.field} successfully validated.`,
        status: 'success',
        data: {
          validation: {
            error: false,
            field: `${rule.field}`,
            field_value: data[`${rule.field}`],
            condition: rule.condition,
            condition_value: rule.condition_value,
          },
        },
      });
    }
  } else {
    if (`${getRuleField[1]}` in data[`${getRuleField[0]}`]) {
      const newData = data[`${getRuleField[0]}`];
      if (
        (newData[`${getRuleField[1]}`] >= rule.condition_value &&
          rule.condition === 'gte') ||
        (newData[`${getRuleField[1]}`] > rule.condition_value &&
          rule.condition === 'gt') ||
        (newData[`${getRuleField[1]}`] === rule.condition_value &&
          rule.condition === 'eq') ||
        (newData[`${getRuleField[1]}`] !== rule.condition_value &&
          rule.condition === 'neq') ||
        (rule.condition_value
          .toString()
          .indexOf(`${newData[`${getRuleField[1]}`]}`) &&
          rule.condition === 'contains')
      ) {
        return res.status(200).json({
          message: `field ${getRuleField[1]} successfully validated.`,
          status: 'success',
          data: {
            validation: {
              error: false,
              field: `${getRuleField[1]}`,
              field_value: data[`${getRuleField[1]}`],
              condition: rule.condition,
              condition_value: rule.condition_value,
            },
          },
        });
      }
    }
  }

  next();
};
