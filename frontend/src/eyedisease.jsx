import React, { useState } from 'react';
import { Box, Heading, Flex, Button, Input, Text, Image } from '@chakra-ui/react';
import img from './assets/img-icon.png';
import axios from 'axios';

function EyeDisease() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [prediction, setPrediction] = useState("");
  const [desc, setDesc] = useState("");
  const [imageUrl, setImageUrl] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setImageUrl(URL.createObjectURL(event.target.files[0])); 
  };

  const handleImageUpload = async () => {
    if (selectedFile) {
      try {
        const formData = new FormData();
        formData.append('image', selectedFile);

        const response = await axios.post('http://127.0.0.1:8000/eyedisease/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        if (response.status === 200) {
          setPrediction(response.data.prediction);
          setDesc(response.data.desc);
        } else {
          console.error('Error:', response.statusText);
          setPrediction("Error occurred during prediction.");
        }
      } catch (error) {
        console.error('Error:', error);
        setPrediction("Error occurred during prediction.");
      }
    }
  };

  return (
    <Box bg="#FBFBFB" h="100%" p="100px" display="flex" justifyContent="center" gap="32px" alignItems="center">
      <Box
        p="20"
        borderWidth="2px"
        borderRadius="lg"
        w="60%"
        bg="white"
        color="black"
        boxShadow="0px 10px 50px rgba(0, 0, 0, 0.1)"
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Heading mb="8">Upload Image</Heading>
        <Flex h="100px" w="100px" borderRadius="8px" mb="10px" justify="center" align="center" bg="#D6FFDF">
          {imageUrl ? <Image src={imageUrl} alt="Uploaded Graphic" mb="4" /> : <Image src={img} alt="Upload Graphic" mb="4" />}
        </Flex>
        <Input type="file" mb="4" onChange={handleFileChange} />

        <Button colorScheme="green" onClick={handleImageUpload} w="100%" mt="4">
          Predict Disease
        </Button>
      </Box>

      <Box
        p="8"
        borderWidth="2px"
        borderRadius="lg"
        w="50%"
        bg="white"
        color="black"
        boxShadow="0px 10px 50px rgba(0, 0, 0, 0.1)"
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Heading mb="4">Prediction</Heading>
        <Text color="gray.900" mb="4">
          {prediction || "Your prediction will be generated here"}
        </Text>
        <Text color="gray.500">
          {desc || "Description will be shown here"}
        </Text>
      </Box>
    </Box>
  );
}

export default EyeDisease;
