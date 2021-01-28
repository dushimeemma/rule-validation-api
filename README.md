[![Build Status](https://travis-ci.com/dushimeemma/rule-validation-api.svg?branch=develop)](https://travis-ci.com/dushimeemma/rule-validation-api) [![Coverage Status](https://coveralls.io/repos/github/dushimeemma/rule-validation-api/badge.svg?branch=develop)](https://coveralls.io/github/dushimeemma/rule-validation-api?branch=develop)

# Flutterwave Challenge

## Simple Rule Validation API

### EndPoints

- Welcome Page: `HTTP GET /`
- Validate Rule: `HTTP POST /validate-rule`

### Examples models

```
{
  "rule": {
    "field": "missions.count",
    "condition": "gte",
    "condition_value": 30
  },
  "data": {
    "name": "James Holden",
    "crew": "Rocinante",
    "age": 34,
    "position": "Captain",
    "missions": {
      "count": 45,
      "successful": 44,
      "failed": 1
    }
  }
}

```

```
{
  "rule": {
    "field": "0",
    "condition": "eq",
    "condition_value": "a"
  },
  "data": "damien-marley"
}
```

```
{
  "rule": {
    "field": "5",
    "condition": "contains",
    "condition_value": "rocinante"
  },
  "data": ["The Nauvoo", "The Razorback", "The Roci", "Tycho"]
}
```
