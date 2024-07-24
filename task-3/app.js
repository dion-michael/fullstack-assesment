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

app.get('/policy/:id', (req, res) => {
  const policy = policies.find((p) => p.id == req.params.id);
  if (!policy) {
    return res.status(404).send('Policy not found');
  }
  res.send(policy);
});

app.post('/policy', (req, res) => {
  const policy = {
    id: policies.length + 1,
    name: req.body.name,
    type: req.body.type,
    coverage: req.body.coverage,
    premium: req.body.premium
  };
  policies.push(policy);
  res.send(policy);
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
