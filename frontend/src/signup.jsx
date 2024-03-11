import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input, Box, Text, Flex, Heading, VStack, FormControl, FormLabel, Center, Stack, Card, CardBody } from "@chakra-ui/react";

const Signup = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    age: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/signup/", data);
      console.log(response.message);
      alert(response.data.message);
      navigate("/signin");
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.error);
      }
    }
  };

  return (
    <Flex align="center" justify="center" minH="100vh">
      <Box maxW="400px" p="6" borderRadius="xl" boxShadow="md" bg="white">
        <Center>
          <VStack spacing="4">
            <Heading fontSize="xl">Create an Account</Heading>
            <Card bg='#f6f8fa' variant='outline' borderColor='#d8dee4' w='100%'>
              <CardBody>
                <form onSubmit={handleSubmit}>
                  <Stack spacing='4'>
                    <FormControl>
                      <FormLabel size='sm'>Name</FormLabel>
                      <Input
                        type='text'
                        bg='white'
                        borderColor='#d8dee4'
                        size='sm'
                        borderRadius='6px'
                        onChange={handleChange}
                        value={data.name}
                        name="name"
                        required
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel size='sm'>Age</FormLabel>
                      <Input
                        type='number'
                        bg='white'
                        borderColor='#d8dee4'
                        size='sm'
                        borderRadius='6px'
                        onChange={handleChange}
                        value={data.age}
                        name="age"
                        min="1"
                        required
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel size='sm'>Email</FormLabel>
                      <Input
                        type='email'
                        bg='white'
                        borderColor='#d8dee4'
                        size='sm'
                        borderRadius='6px'
                        onChange={handleChange}
                        value={data.email}
                        name="email"
                        required
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel size='sm'>Password</FormLabel>
                      <Input
                        type='password'
                        bg='white'
                        borderColor='#d8dee4'
                        size='sm'
                        borderRadius='6px'
                        onChange={handleChange}
                        value={data.password}
                        name="password"
                        required
                        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                        title="Password must contain at least one number, one uppercase letter, one lowercase letter, and be at least 8 characters long."
                      />
                    </FormControl>
                    {error && <Text color="red.500" mt="2">{error}</Text>}
                    <Button
                      bg='#2da44e'
                      color='white'
                      size='sm'
                      _hover={{ bg: '#2c974b' }}
                      _active={{ bg: '#298e46' }}
                      type="submit"
                    >
                      Sign Up
                    </Button>
                  </Stack>
                </form>
              </CardBody>
            </Card>
          </VStack>
        </Center>
        <Center mt="4">
          <Text>Already have an account?</Text>
          <Link to="/signin">
            <Button colorScheme="green" variant="link">Sign In</Button>
          </Link>
        </Center>
      </Box>
    </Flex>
  );
};

export default Signup;
