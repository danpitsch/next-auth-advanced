import {
  Body,
  Container,
  Column,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface VerificationEmailProps {
  confirmLink: string;
  name: string;
}
export const VerificationEmail = ({
  confirmLink,
  name
}: VerificationEmailProps) => {
  const httpBody =
    `<Html>
      <Head />
      <Preview>Hi ${name}, We noticed a recent attempt to Register for a 🔐Auth account with your email. If this was you</Preview>
      <Body style="main">
        <Container>
          <Section style="logo">
            <Img src="https://korabi-ecommerce-admin.vercel.app/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdncmjp41z%2Fimage%2Fupload%2Fv1704195942%2Fzxr7vlhj7zsvffcclohc.png&w=1920&q=75" />
          </Section>
          <p/>
          <Section style="content">
            <Img width="620" src="https://korabi-ecommerce-admin.vercel.app/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdncmjp41z%2Fimage%2Fupload%2Fv1704195773%2Fskhemiousn5nzs3vib1d.png&w=1920&q=75" />
            <p/>
            <Row style=" ...boxInfos, paddingBottom: '0' ">
              <Column>
                <Heading
                  style="
                    fontSize: 32,
                    fontWeight: 'bold',
                    textAlign: 'center',
                  "
                >
                  Hi ${name},
                </Heading>
                <p/>
                <Heading
                  as="h2"
                  style="
                    fontSize: 26,
                    fontWeight: 'bold',
                    textAlign: 'start',
                  "
                >
                  <p>We noticed a recent attempt to Register for a 🔐Auth account with your email.</p>
                </Heading>

                <Text style="paragraph">
                  <p>If this was you, click <a href=${confirmLink}>here</a></p>
                </Text>
                <Text style=" ...paragraph, marginTop: -5 ">
                  <p>If this wasn't you, please ignore this email.</p>
                </Text>
              </Column>
            </Row>
          </Section>

          <Section style="containerImageFooter">
            <Img width="620" src="https://korabi-ecommerce-admin.vercel.app/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdncmjp41z%2Fimage%2Fupload%2Fv1704195824%2Fpcgb9zsaecqlryiuwifi.png&w=1920&q=75" />
          </Section>

          <Text
            style="
              textAlign: 'center',
              fontSize: 12,
              color: 'rgb(0,0,0, 0.7)',
            "
          >
            © 2024 | 🔐 Auth 
          </Text>
        </Container>
      </Body>
    </Html>`;
  return httpBody;
};

export default VerificationEmail;

const main = {
  backgroundColor: '#fff',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const paragraph = {
  fontSize: 16,
};

const logo = {
  padding: '30px 20px',
};

const content = {
  border: '1px solid rgb(0,0,0, 0.1)',
  borderRadius: '3px',
  overflow: 'hidden',
};

const boxInfos = {
  padding: '20px 40px',
};

const containerImageFooter = {
  padding: '45px 0 0 0',
};