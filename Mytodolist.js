import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, ImageBackground } from 'react-native';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [editingText, setEditingText] = useState('');

  const handleAddTodo = () => {
    if (newTodo.trim() !== '') {
      setTodos([...todos, { id: Date.now(), text: newTodo }]);
      setNewTodo('');
    }
  };

  const handleRemoveTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleEditTodo = (id, newText) => {
    setTodos(todos.map(todo => {
      if (todo.id === id) {
        todo.text = newText;
      }
      return todo;
    }));
    setEditingTodoId(null);
    setEditingText('');
  };

  const renderItem = ({ item }) => {
    if (item.id === editingTodoId) {
      return (
        <View style={styles.todoItem}>
          <TextInput
            style={styles.editInput}
            value={editingText}
            onChangeText={text => setEditingText(text)}
            autoFocus
          />
          <View style={styles.editButtons}>
            <Button title="Save" onPress={() => handleEditTodo(item.id, editingText)} />
            <Button title="Cancel" onPress={() => setEditingTodoId(null)} />
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.todoItem}>
          <Text style={styles.todoText}>{item.text}</Text>
          <View style={styles.buttons}>
            <Button title="Edit" onPress={() => {
              setEditingTodoId(item.id);
              setEditingText(item.text);
            }} />
            <Button title="DELETE" onPress={() => handleRemoveTodo(item.id)} />
          </View>
        </View>
      );
    }
  };

  return (
    <ImageBackground
      source={require('./assets/picture04.png')} 
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.heading}>My Todo List</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, { color: 'white' }]}
            value={newTodo}
            onChangeText={text => setNewTodo(text)}
            placeholder="Enter a new todo" 
          />
          <Button title="Add" onPress={handleAddTodo} />
        </View>
        <FlatList
          data={todos}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
        />
      </View>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    padding: 20,
    marginTop: 40,
  },
  heading: {
    fontSize: 33,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
    color: '#f0f8ff',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    marginRight: 10,
    borderWidth: 3,
    borderColor: '#5f9ea0',
    padding: 8,
  },
  todoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#5f9ea0',
    padding: 7,
    marginBottom: 10,
  },
  editInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 10,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 110,
    paddingRight: 8, // Adjusted padding for better spacing between Edit and DELETE
  },
  editButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end', 
    width: 120,
    paddingRight: 20, 
  },
  todoText: {
    color: 'white',
  },
});

export default App;
