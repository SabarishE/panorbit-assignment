import {
  Box,
  SimpleGrid,
  Text,
  Image,
  VStack,
  chakra,
  HStack,
  useBreakpointValue,
} from "@chakra-ui/react";
import { AuthContext } from "context/userContext";
import { useContext } from "react";
import { UserInterface } from "types/user";
import { Layout } from "components/layout/Layout";
import Loader from "components/Loader";
import Map from "react-map-gl";

export const UserProfile = () => {
  const authContextValues = useContext(AuthContext);
  const isMobile = useBreakpointValue({ base: true, md: false });

  if (!authContextValues) {
    return null;
  }

  const { user } = authContextValues;

  if (!user) {
    return <Loader />;
  }

  return (
    <>
      <Layout title="Profile">
        <SimpleGrid
          templateColumns={["1fr", "0.35fr 1px 0.65fr"]}
          spacing={[4, 10]}
          alignItems="stretch"
        >
          <UserProfileLeftBlock user={user} />
          {!isMobile && <Box bg="#A5A6E4" h="100%" />}
          <UserProfileRightBlock user={user} />
        </SimpleGrid>
      </Layout>
    </>
  );
};

const UserProfileLeftBlock = ({ user }: { user: UserInterface }) => {
  return (
    <VStack alignItems="stretch">
      <Box>
        <Image
          display="block"
          src={user.profilepicture}
          w={["100px", "200px"]}
          borderRadius="50%"
          mx="auto"
        />
      </Box>
      <Box>
        <Text fontSize="18px" fontWeight="semibold" textAlign="center">
          {user.name}
        </Text>
      </Box>
      <VStack fontSize="24px">
        <FieldValuePair field="Username" value={user.username} />
        <FieldValuePair field="Phone" value={user.phone} />
        <FieldValuePair field="Email" value={user.email} />
        <FieldValuePair field="Website" value={user.website} />
      </VStack>
      <Box>
        <Box bg="#A5A6E4" h="1px" w="70%" mx="auto" my={4} />
      </Box>
      <VStack fontSize="24px">
        <Text color="#9A9A9A" fontSize="18px" textAlign="center">
          Company
        </Text>
        <FieldValuePair field="Name" value={user.company.name} />
        <FieldValuePair field="Catchphrase" value={user.company.catchPhrase} />
        <FieldValuePair field="bs" value={user.company.bs} />
      </VStack>
    </VStack>
  );
};

const UserProfileRightBlock = ({ user }: { user: UserInterface }) => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  return (
    <VStack alignItems="stretch">
      <Box>
        <Text color="#9A9A9A" fontSize="18px">
          Address:
        </Text>
        <VStack w="50%" fontSize="24px">
          <FieldValuePair field="Street" value={user.address.street} />
          <FieldValuePair field="Suite" value={user.address.suite} />
          <FieldValuePair field="City" value={user.address.city} />
          <FieldValuePair field="Zipcode" value={user.address.zipcode} />
        </VStack>
      </Box>
      <Map
        initialViewState={{
          longitude: Number(user.address.geo.lng),
          latitude: Number(user.address.geo.lat),
          zoom: 1,
        }}
        style={{ width: isMobile ? 300 : 650, height: isMobile ? 250 : 400 }}
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
        attributionControl={false}
        mapStyle="mapbox://styles/mapbox/streets-v12"
      />
      <HStack fontSize="14px" justifyContent="flex-end">
        <Text color="#9A9A9A">
          Lat : <chakra.span color="black">{user.address.geo.lat}</chakra.span>
        </Text>
        <Text color="#9A9A9A">
          Long : <chakra.span color="black">{user.address.geo.lng}</chakra.span>
        </Text>
      </HStack>
    </VStack>
  );
};

const FieldValuePair = ({
  field,
  value,
}: {
  field: string;
  value: string | number;
}) => {
  return (
    <HStack justifyContent="center" fontSize="18px" w="100%">
      <Text color="#9A9A9A" w="50%" textAlign="right">
        {field}
      </Text>
      <chakra.span px={2}>:</chakra.span>
      <Text w="50%" fontWeight="semibold">
        {value}
      </Text>
    </HStack>
  );
};
