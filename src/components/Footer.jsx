import { Box, Container, Text, VStack, Stack, Link, Flex } from "@chakra-ui/react";
import { Label } from "reactstrap";

export default function Footer() {
  return (
    <Box bgColor="gray.100"  color="light" w="100%" mt={5}>
      <Container maxW="container.xl" py={4}>
        <Flex direction={{ base: "column", md: "row" }}>
        <Box flex="3">
            <Text fontSize="4xl" fontWeight="bold">DoDooS App</Text>
        </Box>


          <Box flex="2" align="center" spacing={1}>
            <Text fontWeight="bold">Muhammad Yusuf</Text>
            <Link href="https://www.linkedin.com/in/muhammad-yusuf-subhan/">LinkedIn </Link>|
            <Link href="https://github.com/enginoir"> GitHub</Link>
          </Box>

          <Box flex="2" align="center" spacing={1}>
            <Text fontWeight="bold">Evelio Excellenta</Text>
            <Link href="https://www.linkedin.com/in/evelio-excellenta/">LinkedIn </Link>|
            <Link href="https://github.com/evelioexcellenta"> GitHub</Link>
          </Box>
        </Flex>

        <Box textAlign="center" py={3} mt={1} bg="rgba(0, 0, 0, 0.2)" >
          © {new Date().getFullYear()} Copyright:{' '}
          <Link color="black" href='/'>
            DoDooS App
          </Link>
        </Box>
      </Container>
    </Box>
  );
}
