import './App.css';
import { useState } from 'react';
import Box from '@mui/system/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';

function App() {

  const [inputValue, setInputValue] = useState('');
  const [todos, setTodos] = useState([

  ]);

  const addNewTodo = () => {
    if (inputValue) {
      setTodos((currentTodos) => [...currentTodos,
      {
        text: inputValue,
        isChecked: false,
        id: (Math.random() + 1).toString(36).substring(2)
      }
      ]);
    }

    setInputValue('');
    console.log(todos);
  }
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  }

  const deleteItem = (id) => {
    const newArray = todos.filter((todo) => todo.id !== id);

    setTodos(newArray);
  }

  const deleteAll = () => setTodos([])
  const checkAll = () => {
    const newArray = todos.map((todo) => {
      todo.isChecked = true;

      return todo;
    });

    setTodos(newArray);
  }

  const deleteChecked = () => {
    const newArray = todos.filter((todo) => !todo.isChecked);

    setTodos(newArray);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h2>To do list</h2>

        <Box
          sx={{
            maxWidth: 400,
            width: "100%",
          }}

        >
          <Stack spacing={2} direction="row"></Stack>
          <TextField
            fullwidth
            label="What needs to be done"
            variant="standard"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={(ev) => {
              if (ev.key === 'Enter') {
                addNewTodo();
                ev.preventDefault();
              }
            }}
          />
          <Button variant="outlined" onClick={addNewTodo}>Add</Button>

          {
            todos.map((todo) => (
              <div key={todo.id}>
                <Stack spacing={3} direction="row">
                <Checkbox checked={todo.isChecked} onClick={() =>  (todo.id)} />
                  <Typography
                    variant="span"
                    sx={{
                      textDecoration: todo.isChecked ? 'line-through' : 'none',
                      alignSelf: 'baseline'
                    }}>
                    {todo.text}
                  </Typography>
                  <DeleteIcon
                    onClick={() => deleteItem(todo.id)}
                    sx={{ cursor: 'pointer' }}
                  />
                </Stack>
              </div>
            ))
          }
        </Box>
          <div>
          <br/>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8  }}>
            <Stack spacing={2}>
              <Button variant="outlined" onClick={() => deleteChecked()}>Delete </Button>
              <Button variant="outlined" onClick={() => checkAll()}>Check</Button>
              <Button variant="outlined" onClick={() => deleteAll()}>Delete all</Button>
            </Stack>
          </Box>
        </div>
      </header>
    </div>
  );
}

export default App;