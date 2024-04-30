import React from 'react'
import { Container,Box,Text } from '@chakra-ui/react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import Login from '../componants/authentication/Login'
import Signup from '../componants/authentication/Signup'

const HomePage = () => {
  return (
    <Container maxW='xl' centerContent>
      <Box 
        d = 'flex'
        justifyContent='center'
        p={3}
        bg={'white'}
        w='100%'
        m= '40px 0 15px 0'
        borderRadius='lg'
        borderWidth='1px'
      >
       <Text fontSize='4xl' fontFamily='Work sans' color={'black'} align={'center'}>Talk-Wave</Text>
      </Box>
      <Box bg={'white'} w='100%' p={4}  borderRadius='lg'  borderWidth='1px' color={'black'}>
        <Tabs isFitted variant='enclosed'colorScheme='red' fontWeight='2px'>
          <TabList mb='1em'>
            <Tab>Log In</Tab>
            <Tab>Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login/>
            </TabPanel>
            <TabPanel>
              <Signup/>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  )
}

export default HomePage

