import React from 'react';
import { View, Text } from 'react-native';
import { useRouter, useSearchParams } from 'expo-router';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: black;
`;

const DashboardBox = styled.View`
  background-color: white;
  padding: 30px;
  border-radius: 15px;
  width: 85%;
  elevation: 10;
  align-items: center;
`;

const Section = styled.View`
  margin-bottom: 20px;
`;

const Title = styled.Text`
  font-size: 30px;
  font-weight: bold;
  color: black;
  text-align: center;
  margin-bottom: 20px;
`;

const SectionTitle = styled.Text`
  font-size: 18px;
  color: black;
  font-weight: bold;
`;

const Button = styled.TouchableOpacity`
  background-color: black;
  padding: 15px;
  border-radius: 5px;
  align-items: center;
`;

const ButtonText = styled.Text`
  color: white;
  font-size: 16px;
`;

const WelcomeScreen = () => {
  const router = useRouter();
  const { username } = useSearchParams(); // Get username from URL query params

  const handleLogout = () => {
    router.replace('/'); // Navigate back to Login Screen
  };

  return (
    <Container>
      <DashboardBox>
        <Title>Welcome, {username}!</Title>
        <Section>
          <SectionTitle>Logout</SectionTitle>
          <Button onPress={handleLogout}>
            <ButtonText>Logout</ButtonText>
          </Button>
        </Section>
      </DashboardBox>
    </Container>
  );
};

export default WelcomeScreen;
