import { Box, VStack, Input, IconButton, useColorModeValue, Heading, Text, Flex, Spacer } from '@chakra-ui/react';
import { FaPlus, FaTrash } from 'react-icons/fa';
import { useState } from 'react';

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');

  const addTask = () => {
    if (input === '') return;
    const newTask = { id: Date.now(), text: input, isCompleted: false };
    setTasks([...tasks, newTask]);
    setInput('');
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, isCompleted: !task.isCompleted } : task));
  };

  return (
    <Box p={5} bg={useColorModeValue('gray.100', 'gray.700')}>
      <VStack spacing={4}>
        <Heading mb={6}>Todo App</Heading>
        <Flex>
          <Input
            placeholder="Add a new task"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTask()}
          />
          <IconButton
            icon={<FaPlus />}
            onClick={addTask}
            ml={2}
            colorScheme="blue"
            aria-label="Add task"
          />
        </Flex>
        {tasks.map(task => (
          <Flex key={task.id} w="full" p={2} bg={useColorModeValue('white', 'gray.600')}>
            <Text as={task.isCompleted ? 's' : ''} cursor="pointer" onClick={() => toggleTask(task.id)}>
              {task.text}
            </Text>
            <Spacer />
            <IconButton
              icon={<FaTrash />}
              onClick={() => deleteTask(task.id)}
              colorScheme="red"
              aria-label="Delete task"
            />
          </Flex>
        ))}
      </VStack>
    </Box>
  );
};

export default Index;