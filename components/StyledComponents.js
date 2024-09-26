import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: black;
  justify-content: center;
  align-items: center;
`;

export const BackgroundImage = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: black;
`;

export const LoginBox = styled.View`
  background-color: rgba(255, 255, 255, 0.75);
  width: 80%;
  padding: 20px;
  border-radius: 10px;
  elevation: 10;
`;

export const Title = styled.Text`
  font-size: 30px;
  font-weight: bold;
  color: black;
  text-align: center;
  margin-bottom: 20px;
`;

export const Input = styled.TextInput`
  height: 50px;
  border-color: black;
  border-width: 1px;
  border-radius: 5px;
  margin-bottom: 15px;
  padding: 10px;
  color: black;
`;

export const Button = styled.TouchableOpacity`
  background-color: black;
  padding: 15px;
  border-radius: 5px;
  align-items: center;
`;

export const ButtonText = styled.Text`
  color: white;
  font-size: 16px;
`;

export const LinkText = styled.Text`
  color: black;
  text-align: center;
  margin-top: 10px;
`;

export const DashboardBox = styled.View`
  background-color: white;
  padding: 30px;
  border-radius: 15px;
  width: 85%;
  elevation: 10;
  align-items: center;
`;

export const Section = styled.View`
  margin-bottom: 20px;
`;

export const SectionTitle = styled.Text`
  font-size: 18px;
  color: white;
  font-weight: bold;
`;
