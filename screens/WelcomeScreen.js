import React from 'react';
import { Button, StatusBar } from 'react-native';
import { Container, DashboardBox, Title, Section, SectionTitle } from '../components/StyledComponents';

function WelcomeScreen({ route, navigation }) {
  const { username } = route.params;

  return (
    <Container>
      <DashboardBox>
        <Title>Welcome, {username}!</Title> 
        <Section>
          <SectionTitle>Logout</SectionTitle>
          <Button onPress={() => navigation.navigate('Login')} title="Logout" />
        </Section>
      </DashboardBox>
    </Container>
  );
}

export default WelcomeScreen;
