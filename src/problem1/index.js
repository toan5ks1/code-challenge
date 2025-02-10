var sum_to_n_a = function (n) {
  // your code here - approach: iterative
  if (n < 0) {
    throw new Error("Input must be a non-negative integer");
  }

  let sum = 0;

  for (let i = 0; i <= n; i++) {
    sum += i;
  }

  return sum;
};

var sum_to_n_b = function (n) {
  // your code here - approach: recursive
  if (n < 0) {
    throw new Error("Input must be a non-negative integer");
  }

  if (n === 0) {
    return 0;
  }

  return n + sum_to_n_b(n - 1);
};

var sum_to_n_c = function (n) {
  // your code here - approach: mathematical (Best approach)
  if (n < 0) {
    throw new Error("Input must be a non-negative integer");
  }

  return ((1 + n) * n) / 2;
};

// console.log("solution_1", sum_to_n_a(5));
// console.log("solution_2", sum_to_n_b(5));
// console.log("solution_3", sum_to_n_c(5));
