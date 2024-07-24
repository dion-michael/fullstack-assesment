## Task 3

### How to run the app

- run `npm install` on the app directory
- run `npm start`

the code runs normally. However there are potential issues that I found:

### Problem 1

with how the code creates the ID for new policies, it can cause duplicate `id`. suppose we have policies like this:

```
let policies = [ {id: 1, ...}, {id: 3, ...} ]
```

when we create policy by hitting `POST /policies` endpoint, the `id` for the new value will be `3` and the policies value would be like this:

```
let policies = [ {id: 1, ...}, {id: 3, ...}, {id: 3, ...} ] // we don't want duplicate IDs right?
```

the simplest solution would be getting the new `id` from the `last id + 1`.
if the policies is empty, the `id` would be `1`

```
  const id = policies.length ? policies[policies.length - 1].id + 1 : 1
  const policy = {
    id,
    name: req.body.name,
    type: req.body.type,
    coverage: req.body.coverage,
    premium: req.body.premium
  };
  policies.push(policy);
  ...
```

### Problem 2

no request body validation on `POST /policies`. this will accept anything as an input and the value of `name`, `type`, `coverage` and `premium` can be `undefined`. we can add a code to check the required values and return an error if one of them is undefined

```
  const { name, type, coverage, premium } = req.body;
  if (!name || !type || !coverage || !premium) {
    res.status(400).json({ message: 'all fields required' })
  }
  const policy = {
    id: ...,
    ...
  }
```

### Problem 3

use correct HTTP status for the responses. for successful data creation, use `201` instead of `200`

```
  ...
  policies.push(policy);
  res.status(201).json(policy);
```

### Problem 4

use res.json for sending JSON responses

```
res.json(policy)
```
