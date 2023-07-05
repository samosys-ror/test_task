
//REST API project for account management

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// In-memory account storage
let accounts = [];

// Get all accounts
app.get('/accounts', (req, res) => {
  res.json(accounts);
});

// Get account by ID
app.get('/accounts/:id', (req, res) => {
  const accountId = req.params.id;
  const account = accounts.find(acc => acc.id === accountId);

  if (!account) {
    res.status(404).json({ error: 'Account not found' });
  } else {
    res.json(account);
  }
});

// Create a new account
app.post('/accounts', (req, res) => {
  const newAccount = req.body;
  accounts.push(newAccount);
  res.status(201).json(newAccount);
});

// Update an existing account
app.put('/accounts/:id', (req, res) => {
  const accountId = req.params.id;
  const updatedAccount = req.body;
  const index = accounts.findIndex(acc => acc.id === accountId);

  if (index === -1) {
    res.status(404).json({ error: 'Account not found' });
  } else {
    accounts[index] = { ...accounts[index], ...updatedAccount };
    res.json(accounts[index]);
  }
});

// Delete an account
app.delete('/accounts/:id', (req, res) => {
  const accountId = req.params.id;
  const index = accounts.findIndex(acc => acc.id === accountId);

  if (index === -1) {
    res.status(404).json({ error: 'Account not found' });
  } else {
    const deletedAccount = accounts.splice(index, 1);
    res.json(deletedAccount[0]);
  }
});




//convert arabic numbers to roman numerals.

function arabicToRoman(number) {
  const romanNumerals = [
    { value: 1000, symbol: 'M' },
    { value: 900, symbol: 'CM' },
    { value: 500, symbol: 'D' },
    { value: 400, symbol: 'CD' },
    { value: 100, symbol: 'C' },
    { value: 90, symbol: 'XC' },
    { value: 50, symbol: 'L' },
    { value: 40, symbol: 'XL' },
    { value: 10, symbol: 'X' },
    { value: 9, symbol: 'IX' },
    { value: 5, symbol: 'V' },
    { value: 4, symbol: 'IV' },
    { value: 1, symbol: 'I' }
  ];

  let romanNumeral = '';
  let remaining = number;

  for (const numeral of romanNumerals) {
    while (remaining >= numeral.value) {
      romanNumeral += numeral.symbol;
      remaining -= numeral.value;
    }
  }

  return romanNumeral;
}

// Test the function
console.log(arabicToRoman(49));   // Output: XLIX
console.log(arabicToRoman(3999)); // Output: MMMCMXCIX


//memoization function
function memoize(func) {
  const cache = {};

  return function memoizedFunc(...args) {
    const key = JSON.stringify(args);

    if (key in cache) {
      return cache[key];
    }

    const result = func(...args);
    cache[key] = result;
    return result;
  };
}

// Example usage

// Original function
function fibonacci(n) {
  if (n <= 1) {
    return n;
  }
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// Memoized version of the function
const memoizedFibonacci = memoize(fibonacci);

// Test the memoized function
console.log(memoizedFibonacci(10)); // Computes and caches the result
console.log(memoizedFibonacci(10)); // Retrieves the cached result



// Start the server
app.listen(3000, () => {
    console.log('Server started on port 3000');
  });