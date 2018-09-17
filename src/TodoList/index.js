import React, { Component } from "react";
import { render } from "react-dom";
import PropTypes from "prop-types";

let taskId = 0;

const defaultTodo = {
  title: "",
  finished: false
};

const Todo = [
  {
    id: ++taskId,
    title: "taskA",
    finished: false
  },
  {
    id: ++taskId,
    title: "taskB",
    finished: false
  }
];

const FormContainer = ({}, { todo, onChange, onSubmit }) => (
  <form onSubmit={onSubmit}>
    <input type="text" name="title" value={todo.title} onChange={onChange} />
    {todo.id ? <button>update</button> : <button>Add</button>}
  </form>
);

FormContainer.contextTypes = {
  todo: PropTypes.object,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func
};

const ListContainer = ({}, { todos, updateTodo, removeTodo }) => (
  <ul>
    {todos &&
      todos.map(todo => (
        <Item
          key={todo.id}
          todo={todo}
          updateTodo={() => updateTodo(todo)}
          removeTodo={() => removeTodo(todo.id)}
        />
      ))}
  </ul>
);

ListContainer.contextTypes = {
  todos: PropTypes.array,
  updateTodo: PropTypes.func,
  removeTodo: PropTypes.func
};

const Item = ({ todo, updateTodo, removeTodo }) => (
  <div>
    <li onClick={updateTodo}>
      <input
        type="checkbox"
        defaultChecked={todo.finished}
        onChange={e => (todo.finished = !todo.finished)}
      />{" "}
      <a> {todo.title}</a>{" "}
      <button onClick={() => removeTodo(todo.id)}>Remove</button>
    </li>
  </div>
);

export default class App extends Component {
  state = {
    todo: { ...defaultTodo },
    todos: [...Todo]
  };

  getChildContext() {
    return {
      todo: this.state.todo,
      todos: this.state.todos,
      onChange: this.onChange,
      onSubmit: this.onSubmit,
      updateTodo: this.updateTodo,
      removeTodo: this.removeTodo
    };
  }

  onChange = e => {
    const { todo } = this.state;
    todo[e.target.name] = e.target.value;
    this.setState({ todo });
  };

  unfinished = () => {
    const { todos } = this.state;
    return todos.filter(todo => !todo.finished).length;
  };

  findIndex = id => {
    const { todos } = this.state;
    return todos.findIndex(record => record.id === id);
  };

  updateTodo = record => {
    this.setState({ todo: record });
  };

  removeTodo = id => {
    this.setState({
      todos: [...this.state.todos.filter(todo => todo.id !== id)]
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const { todos, todo } = this.state;
    if (todo.id) {
      const index = this.findIndex(todo.id);
      todos[index] = todo;
    } else {
      todo.id = ++taskId;
      todos.push({ ...todo });
    }
    this.setState({ todos, todo: { ...defaultTodo } });
  };

  render() {
    return (
      <div>
        <FormContainer />
        <ListContainer />
        <div>Pending tasks: {this.unfinished()}</div>
      </div>
    );
  }
}

App.childContextTypes = {
  todo: PropTypes.object,
  todos: PropTypes.array,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  updateTodo: PropTypes.func,
  removeTodo: PropTypes.func
};

render(<App />, document.getElementById("root"));
