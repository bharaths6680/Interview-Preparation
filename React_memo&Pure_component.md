### **Pure Components in React**

**Pure Components** in React are a type of class component that implements a shallow comparison on the component's state and props to prevent unnecessary re-renders. If the state and props do not change, a Pure Component will not re-render.

React provides a built-in `PureComponent` class that you can extend to create such components. `PureComponent` automatically implements a `shouldComponentUpdate()` method with a shallow prop and state comparison, which optimizes the component rendering.

### **What is a Pure Component?**

- A **Pure Component** in React extends `React.PureComponent` instead of `React.Component`.
- It performs a shallow comparison between the previous and the next state/props to decide whether the component should update.
- Pure Components avoid unnecessary re-renders when the component's state or props do not change.

### **Example of a Pure Component:**

```jsx
import React, { PureComponent } from 'react';

class Counter extends PureComponent {
  render() {
    console.log('Counter component rendered!');
    return <h1>Count: {this.props.count}</h1>;
  }
}

class App extends React.Component {
  state = {
    count: 0,
    text: ''
  };

  incrementCount = () => {
    this.setState({ count: this.state.count + 1 });
  };

  updateText = (e) => {
    this.setState({ text: e.target.value });
  };

  render() {
    return (
      <div>
        {/* Counter is a PureComponent, it will only re-render if `count` prop changes */}
        <Counter count={this.state.count} />
        <button onClick={this.incrementCount}>Increment</button>
        <input type="text" onChange={this.updateText} />
      </div>
    );
  }
}

export default App;
```

### **Explanation:**
- **`Counter`** is a Pure Component that extends `React.PureComponent`.
- **Optimization:** `Counter` will only re-render if the `count` prop changes. If `text` changes, `Counter` will not re-render because `text` is not a prop of `Counter`.

### **React.memo vs Pure Components:**

Both `React.memo` and `PureComponent` are used to optimize components by preventing unnecessary re-renders, but they are used in different contexts.

| Feature                | `React.memo` (Functional Component)               | `PureComponent` (Class Component)                 |
|------------------------|--------------------------------------------------|--------------------------------------------------|
| Type                   | Higher-order component (HOC)                     | Base class for creating class components         |
| Applicable to          | Functional components                            | Class components                                 |
| Comparison             | Shallow comparison of props                      | Shallow comparison of props and state            |
| Usage                  | Used as a wrapper around functional components   | Used by extending `React.PureComponent`          |
| Re-render Control      | Only re-renders if props have changed            | Only re-renders if state or props have changed   |
| Custom Comparison      | Allows custom comparison function as second argument | Does not allow custom comparison                |

### **Example of `React.memo` vs `PureComponent`**

Let's illustrate the difference between `React.memo` and `PureComponent` with two similar components:

#### **Example Using `React.memo` (Functional Component):**

```jsx
import React, { useState, memo } from 'react';

// Functional component wrapped with React.memo
const Counter = memo(({ count }) => {
  console.log('Functional Counter component rendered!');
  return <h1>Count: {count}</h1>;
});

const App = () => {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');

  return (
    <div>
      {/* Counter component is wrapped with React.memo */}
      <Counter count={count} />
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <input type="text" onChange={(e) => setText(e.target.value)} />
    </div>
  );
};

export default App;
```

#### **Example Using `PureComponent` (Class Component):**

```jsx
import React, { PureComponent } from 'react';

// Class component that extends PureComponent
class Counter extends PureComponent {
  render() {
    console.log('Class Counter component rendered!');
    return <h1>Count: {this.props.count}</h1>;
  }
}

class App extends React.Component {
  state = {
    count: 0,
    text: ''
  };

  incrementCount = () => {
    this.setState({ count: this.state.count + 1 });
  };

  updateText = (e) => {
    this.setState({ text: e.target.value });
  };

  render() {
    return (
      <div>
        {/* Counter component is a PureComponent */}
        <Counter count={this.state.count} />
        <button onClick={this.incrementCount}>Increment</button>
        <input type="text" onChange={this.updateText} />
      </div>
    );
  }
}

export default App;
```

### **Explanation:**

1. **Functional Component with `React.memo`**:
   - The `Counter` component is wrapped with `React.memo` to prevent re-rendering if its `count` prop has not changed.
   - `React.memo` provides the optimization for functional components.

2. **Class Component with `PureComponent`**:
   - The `Counter` component extends `PureComponent` to achieve the same optimization.
   - `PureComponent` avoids re-rendering if the `count` prop remains unchanged.

### **Key Differences in Practice:**

- **Usage**: 
  - Use `React.memo` for optimizing functional components.
  - Use `PureComponent` for optimizing class components.

- **Custom Comparison**: 
  - `React.memo` allows you to provide a custom comparison function if the shallow comparison is not sufficient. 
  - `PureComponent` does not allow a custom comparison function; it always uses a shallow comparison.

- **State Management**: 
  - `React.memo` only considers props changes.
  - `PureComponent` considers both state and props changes.

### **When to Use `React.memo` or `PureComponent`?**

- Use **`React.memo`** when:
  - Working with functional components.
  - You want to prevent re-renders for components that only depend on props.
  - You need custom comparison logic for props.

- Use **`PureComponent`** when:
  - Working with class components.
  - You want to prevent re-renders for components based on state and props changes.

Would you like more details or examples on any specific point?
