const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

let policies = [
  {
    id: 1,
    name: 'Health Insurance',
    type: 'Health',
    coverage: 100000,
    premium: 1000
  },
  {
    id: 2,
    name: 'Life Insurance',
    type: 'Life',
    coverage: 200000,
    premium: 1500
  }
];

// Please refer the README.md for detailed explanations

app.get('/policy/:id', (req, res) => {
  const policy = policies.find((p) => p.id == req.params.id);
  if (!policy) {
    return res.status(404).json({ message: 'Policy not found' }); // #Problem 4 - use res.json for json responses
  }
  res.json(policy); // #Problem 4 - use res.json for json responses
});

app.post('/policy', (req, res) => {
  // #Problem 2 - request body validation
  const { name, type, coverage, premium } = req.body;
  if (!name || !type || !coverage || !premium) {
    return res.status(400).json({ message: 'all fields required' });
  }
  // #Problem 2 end
  const id = policies.length ? policies[policies.length - 1].id + 1 : 1; // #Problem 1 - avoid duplication
  const policy = {
    id,
    name: req.body.name,
    type: req.body.type,
    coverage: req.body.coverage,
    premium: req.body.premium
  };
  policies.push(policy);
  res.status(201).json(policy); // #Problem 3 - use correct http status codes, #Problem 4 - use res.json for json responses
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
