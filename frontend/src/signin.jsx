import React, { useState } from "react";
import axios from "axios";
import { Link, NavLink } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { Button, Input, Box, Text, Flex, Heading, VStack, FormControl, FormLabel, Center, HStack, Stack, Card, CardBody } from "@chakra-ui/react";


const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleAuth = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/signin/', {
        email: email,
        password: password
      });
      localStorage.setItem("token", response.data.data);
      navigate('/eyedisease');
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
            <Heading fontSize="xl">Sign in to Your Account</Heading>
            <Card bg='#f6f8fa' variant='outline' borderColor='#d8dee4' w='100%'>
              <CardBody>
                <form onSubmit={(e) => { e.preventDefault(); handleAuth(); }}>
                  <Stack spacing='4'>
                    <FormControl>
                      <FormLabel size='sm'>Email</FormLabel>
                      <Input
                        type='email'
                        bg='white'
                        borderColor='#d8dee4'
                        size='sm'
                        borderRadius='6px'
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                      />
                    </FormControl>
                    <FormControl>
                      <HStack justify='space-between'>
                        <FormLabel size='sm'>Password</FormLabel>
                        <Button
                          as={Link}
                          to="/reset"
                          variant='link'
                          size='xs'
                          color='#0969da'
                          fontWeight='500'
                        >
                          Forgot password?
                        </Button>
                      </HStack>
                      <Input
                        type='password'
                        bg='white'
                        borderColor='#d8dee4'
                        size='sm'
                        borderRadius='6px'
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        required
                      />
                    </FormControl>

                    <Button
                      bg='#2da44e'
                      color='white'
                      size='sm'
                      _hover={{ bg: '#2c974b' }}
                      _active={{ bg: '#298e46' }}
                      type="submit"
                    >
                      Sign In
                    </Button>
                  </Stack>
                </form>
              </CardBody>
            </Card>
            {error && <Text color="red.500">{error}</Text>}
            
          </VStack>
        </Center>
        <Center mt="4">
            <Text>New to the website?</Text>
            <Link to="/signup">
            <Button colorScheme="green" variant="link">Create an account</Button>
            </Link>
        </Center>
      </Box>
    </Flex>
  );
};

export default Signin;
