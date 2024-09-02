//Automated testing is a method which will throw when the actual o/p does not match with the expected o/p
function getFullName(fname, lname) {
    return `${fname} ${lname}`
}

const fullname = getFullName('Bharath', 'S')
const expectedFullName = 'Bharath S'

console.log('expectedFullName', expectedFullName);

if (fullname !== expectedFullName) {
    throw new Error(`The fullname ${fullname} is not matching expected full name ${expectedFullName}`)
}
