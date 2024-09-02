/*Types of automated Tests:
1. unit test
2. integration test
3. end to end test

Unit test: Its a component level testing,
we can test based on function or class based components
it would be easy to pin point the issues,

integration test: it is nothing but combination of unit test
combination of more than one component test
take more time than unit test

e2e test: focus is on testing entire application flow
involves in a real ui, backend database, real service
take the longes as they cover the most amount of the code
it may also increase cost of usage as the no of api request increases */

//Automated testing is a method which will throw when the actual o/p does not match with the expected o/p
function getFullName(fname, lname) {
    return `${fname} ${lname}`
}

const fullname = getFullName('Bharath', 'S')
const expectedFullName = 'Bharath SS'

if (fullname !== expectedFullName) {
    throw new Error(`The fullname ${fullname} is not matching expected full name ${expectedFullName}`)
}
//syntax of the test file

//test('name of the test', function, timeout (default 5 seconds))

//ex:
//import { render, screen } from '@testing-library/react';
// test('render test name', () => {
//     render(<App />)
//       //check whether the learn react text exist in the component
//     const linkElement = screen.getByText(/learn react/i);
//     expect(linkElement).toBeInTheDocument();
// })

// Test Driven Development (TDD):

// It is nothing but write a test case before writing the software code
// 1. create a test that verify the functionality of the new feature
// 2. write a software code that runs corretcly when we re-executes the testcase
// 3. Refactor the code for optimization while ensuring the test continues to pass
// this method we called red-green testing -> red failed state to is calling to green-state method


//Jest Watch mode

//Jest library helps us to optimize the performance of testing the files
//It will help us to test only recently made changed files instead of executing already committed test cases

// jest filtering
// using cmd 0,p(pattern -> component name), t(test name)
// test.only (will execute only specifical test case instead of running all tests)
// test.skip( maually we can skip test)

// grouping test in jest
// describe function, accepts 2 arguments name, fn 
// describe (name, fn) = > name: group name, fn: function that contains expectations to test
// Inside the describe fn we can declare n number of test case
// also we can write nested describe group with n number of test
// also it supports both only, skip as test case supports

//ex: 
describe('Greet', () => {
    test('render test name', () => {
        render(<Greet />)
        const linkElement = screen.getByText(/hello/i);
        expect(linkElement).toBeInTheDocument();
    })
    test.skip('render test name follwed by label', () => {
        render(<Greet label='bharath' />)
        const linkElement = screen.getByText(/hello bharath/i);
        expect(linkElement).toBeInTheDocument();
    })
    describe('nested', () => {
        test('render test name follwed by label', () => {
            render(<Greet label='bharath' />)
            const linkElement = screen.getByText(/hello bharath/i);
            expect(linkElement).toBeInTheDocument();
        })
    })
})

/* file name conventions for test components 
1. Using .test.tsx or .test.js suffix
2. using .spec.tsx or .spec.js suffix wj=hile creating the test file
3. creating a separate folder __tests__ and add test files under that with suffix .tsx or .js //impact on importing nested files
*/


/* we can use it instead of test method while writing test cases
1. we can use fit instead of test.only
2. we can use eit instead of test.skip (eit => exclude test case)
*/

/* Coverage: It will provide the test coverage reports 
There are 5 types of coverage:
1. Statements Covrage: How many of the statements in the software code have been tested
2. Branches Covrage: how many of the branches structures have been executed
3. Functions Covrage: how many of the functions defines have been called
4. Lines Covrage: how many of the lines source code have been tested.
syntax: need to add a new sript in package.json 
coverage: 'yarn test --coverage'
*/

/* Assertions:
    Assertions are used to verify that our react components are render and behave as expected
    here are the common assertions we use in our test case
    
    1. toBeInTheDocument: verify the element exist in the document
    const linkElement = screen.getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
});
*/
// 2. toHaveTextContent: verify the element contains specific text content
test('renders a button with the correct text', () => {
    render(<button>Click me</button>);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toHaveTextContent('Click me');
});

//3. toHaveClass: checking if the element has a specific class
test('renders a element has a specific class', () => {
    render(<button className="my-class">Click me</button>);
    const buttonElement = screen.getByText('my-class');
    expect(buttonElement).toHaveClass('my-class');
});

//4. toHaveAttribute: checking if the element has a specific attribute
test('renders an input with the correct type', () => {
    render(<input type="password" />);
    const inputElement = screen.getByPlaceholderText('Password');
    expect(inputElement).toHaveAttribute('type', 'password');
});

// 5. toBeVisible: check if the element is visible
test('renders check if the element is visible', () => {
    render(<input style={{ display: 'block' }}>Test Input</input>);
    const inputElement = screen.getByText('Test Input');
    expect(inputElement).toBeVisible();
});

//6. not.toBeInTheDocument: check the element is not exist in the document
test('does not render an element', () => {
    render(<div />);
    const nonExistentElement = screen.queryByText('Non-existent Element');
    expect(nonExistentElement).not.toBeInTheDocument();
});

//7. Checking if a function is called
test('calls onClick handler', () => {
    const handleClick = jest.fn();
    render(<button onClick={handleClick}>Click me</button>);
    const buttonElement = screen.getByText('Click me');
    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
});

//8. 8. Snapshot Testing
test('renders correctly', () => {
    const { asFragment } = render(<MyComponent />);
    expect(asFragment()).toMatchSnapshot();
});


/* What to test? 
1. ensure the component renders
2. ensure the component renders with out any error
3. test the render component with props
4. test the render component when the state changes
5. test the render component reacts with different events
*/

/* what not to test? 
1. Implementation details -> how the functionality is implemented what is the purpose
2. ignore testing the 3rd party library (MUI) instead test the element which uses these library
3. not required to test any common functions (utility functions) instead we can test the element which consumes the utility fun

*/

/* RTL Queries: 
ususally for testing we use following steps:
 1. render the component
 2. find the element is rendered by the component
 3. assertion to check element which we found in the step 2 is pass or fail the test
 by using expect method
*/

/* now will check about find element in the component 
we have couple of methods to implement
getBy.., queryBy.. , findBy.. -> .. represents suffix (these methods are used to get a single element on the page)
getAllBy.., queryAllBy.. , findAllBy.. -> .. represents suffix (these methods are used to get a multiple element on the page)
suffix are: Role, LabelText, Text, PlaceHolderText, AltText, DisplayValue.

*/

/* first method  getBy..  > It will return a single element on the page and it will throw an error if no element exist or if we get more than on element on the page

1. getByRole: Using getByRole in React Testing Library is a powerful way to select elements based on their roles, which align with ARIA (Accessible Rich Internet Applications) roles
2. getByRoles: Using options (if we have multiple elements with same role we can pass use 2nd argument specify the behavior of the element)

for ex: */
<form>
<div>
    <label htmlFor="name">Name</label>
    <input type="text" id="text" aria-label="Name" />  {/* role name = textbox */}
</div>
<div>
    <label htmlFor="bio">Bio</label>
    <textarea type="text" id="textare" aria-label="bio" />  {/* role name = textbox */}
</div>
</form>
// we need to test separately using getRole with options here we can use 3 options to find the desired element to test
// 1. using value, label or the aria-label of the element
const textElement = screen.getByRole('textbox', { name: 'Name'})
const textAreaElement = screen.getByRole('textbox', { name: 'Bio'})
expect(textElement).toBeInTheDocument(); expect(textAreaElement).toBeInTheDocument();

//2. apart from this we can use other options level(heading tag), selected, hide, pressed

/*3. get BY Label text: getByLabelText (find the element using label of the element ) 
we can use options to find the designed element when there are multiple label tags contains same label
options: selector -> to mention the element

4. getByPlaceholderText -> find the desired element using placeholder attribute in the element
5. getByText -> search all the elements that have text node and text content matching with given text
typically it will search for div, paragraph & span tags
6. getByDisplayValue -> returns the input, textarea, selector element that has the matching display value
7. getByAltText -> get the desired element contains alt tag (supports only for input, img, textarea and custom element tags)
8. getByTitle -> returns the element that has matching title attribute
9. getByTestId -> returns the element that has matching data test id attribute

priority order of queries:
getByRole -> getByLabelText -> getByPlaceholderText -> getByText -> getByDisplayValue -> getByAltText -> getByTitle -> getByTestId

10. getByAllRole -> returns an array of all the matching nodes for the query, throws an error if no elements match
test tags: getByAllRole, getByAllLabelText, getByAllPlaceholderText, getByAllText, getByAllDisplayValue, getByAllAltText, getByAllTitle, getByAllTestId

11. queryByRole -> returns the matching node for a query and returns null if no elements match
throw an error if more than one match found, useful for asserting an element if not present

12. queryAllByRole -> return an array of matching node for a query and returns a empty array if no elements match
 
when do we use -> want to test if the element is not exist in the node tree without throwing an error

other alerternatives
getByRole -> getByLabelText -> getByPlaceholderText -> getByText -> getByDisplayValue -> getByAltText -> getByTitle -> getByTestId
queryByRole -> queryByLableText -> queryByPlaceholderText -> queryByText -> queryByDisplayValue -> queryByAltText -> queryByTitle -> queryByTestId
getAllByRole, getAllByLabelText, getAllByPlaceholderText, getAllByText, getAllByDisplayValue, getAllByAltText, getAllByTitle, getAllByTestId
queryAllByRole, queryAllByLabelText, queryAllByPlaceholderText, queryAllByText, queryAllByDisplayValue, queryAllByAltText, queryAllByTitle, queryAllByTestId

getBy, getAllBy -> These queries for assert the elements are present in the dom
queryBy, queryAllBy -> These queries for assert the elements are not present in the dom


How to test a dynamic data using RTL:
what if the elements are not present in the dom initially and will present after some time:
ex: fetching the data from the server will be render only after few ms

In order to handle we need to use findBy, findByALL
findBy: returns a promise which resolve when an element is found matches the given query
the promise is rejected when there is no element found or if more than one element found after a default timeout 1000ms

findBy: returns a promise which resolves ti an array of elements when any elements are found matches the given query
the promise is rejected when there is no elements are found or if no elements are found after a default timeout 1000ms



Manual Queries:
we can test the elements using default dom queries
ex: const { container } = render(<MyApp />);
const element = container.querySelector('[data-for="bar"]')

Test Debugging:
in order to debug and know that which node is failing while executing the test case
ex: use -> screen.debug()

add logging in the test:
use logRoles() to view the logs

user-event are using to test user interactions of the elements in the components

pointer interactions:
convenience apis:
click(), dblClick(), tripleClick(), hover(), unHover()

pointer Apis:
pointer({keys: '[MouseLeft]'})
pointer({keys: '[MouseLeft][MouseRight]'})
pointer('[MouseLeft][MouseRight]')

*/

