import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Text, Flex, Box, FormControl, Heading, FormLabel, Center, VStack, Stack, Card, CardBody } from "@chakra-ui/react";

const Reset = () => {
  const [resetEmail, setResetEmail] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleResetPassword = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/reset/", {
        email: resetEmail
      });
      alert(response.data.message);
      setResetEmail('');
      navigate('/signin');
    } catch (error) {
      setError('Error In Resetting Password');
    }
  };

  return (
    <Flex align="center" justify="center" minH="100vh">
      <Box maxW="400px" p="6" borderRadius="xl" boxShadow="md" bg="white">
        <Center>
          <VStack spacing="4">
            <Heading fontSize="3xl" mb="4">Reset Password</Heading>
            <Card bg='#f6f8fa' variant='outline' borderColor='#d8dee4' w='100%'>
              <CardBody>
                <form onSubmit={(e) => { e.preventDefault(); handleResetPassword(); }}>
                  <Stack spacing='4'>
                    <FormControl>
                      <FormLabel size='sm'>Email</FormLabel>
                      <Input
                        placeholder="Email"
                        type='email'
                        bg='white'
                        borderColor='#d8dee4'
                        size='sm'
                        borderRadius='6px'
                        onChange={(e) => setResetEmail(e.target.value)}
                        value={resetEmail}
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
                      Reset Password
                    </Button>
                  </Stack>
                </form>
              </CardBody>
            </Card>
            {error && <Text color="red.500" mb="4">{error}</Text>}
          </VStack>
        </Center>
      </Box>
    </Flex>
  );
};

export default Reset;