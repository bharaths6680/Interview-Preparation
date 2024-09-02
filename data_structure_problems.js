
//find the factorial number
// 5 * 4 * 3 * 2 * 1 = 120

function factorialNo(number) {
    let result = 1
    for (let index = 2; index <= number; index++) {
        result = result * index
    }
    return result
}
console.log('factorialNo(5)', factorialNo(5));
console.log('factorialNo(0)', factorialNo(0));
console.log('factorialNo(1)', factorialNo(1));

// Prime Number
// Give a natural number N, find the number is prime or not
// A prime number should be greater than 1 that is not product of 2 natural numbers.
// 5 => 1*5 or 5*1 -> prime no
// 4 => 1*4 or 2*2 or 4*1 -> Not prime no

function primeNumber(number) {
    // set final result as 2
   if (number < 2) {
     return false
   }
    for (let index = 2; index < number; index++) {
        if (number % index === 0) {
            return false
        }
    }
    return true
}
console.log('primeNumber(5)', primeNumber(5));
console.log('primeNumber(6)', primeNumber(6));
