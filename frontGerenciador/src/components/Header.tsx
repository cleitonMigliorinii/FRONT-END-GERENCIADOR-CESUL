import { Box, Flex, Heading, HStack, Spacer } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {


    return (

        <Box bg="blue.500" p={5} color='#fff' w='100%' top={0} as="header" >

            <Flex align='center'>

                <Heading size='md'>CESUL</Heading>
                <Spacer/>

                <HStack spacing={4} align='flex-end'>
                    <Link to="/">Home</Link>
                    <Link to="/ies">IES</Link>
                    <Link to="/disciplina">Disciplinas</Link>
                </HStack>

            </Flex>
        </Box>

    )


}

export default Header;