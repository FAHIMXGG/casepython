import { ShippingAddress } from "@prisma/client";
import React from "react";
import {
  Body,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";

const OrderReceivedEmail = ({
  shippingAddress,
  orderId,
  orderDate,
}: {
  shippingAddress: ShippingAddress;
  orderId: string;
  orderDate: string;
}) => {
  const baseUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://casepython.vercel.app/";

  return (
    <Html>
      <Head />
      <Preview>Your order summary and estimated delivery date</Preview>
      <Body style={main}>
      <Container style={container}>
        <Section style={message}>
          <Img
            src={`${baseUrl}/snake-3.png`}
            width="63"
            height="73"
            alt="delivery snake"
            style={{ margin: "auto" }}
          />
          <Heading style={global.heading}>Thank you for your order!</Heading>
          <Text style={global.text}>
            Your order has been received and is now being processed. We'll send
            you an email with a tracking number when your order ships.
          </Text>
          <Text style={{ ...global.text, marginTop: "24" }}>
            if you have any questions, please don't hesitate to contact us.
          </Text>
        </Section>
        <Hr style={global.hr} />
        <Section style={global.defaultPadding}>
          <Text style={adressTitle}>Shipping to: {shippingAddress.name}</Text>
          <Text style={{ ...global.text, fontSize: 14 }}>
            {shippingAddress.street}, {shippingAddress.city},{" "}
            {shippingAddress.state} {shippingAddress.postalCode},
            {shippingAddress.country}
          </Text>
        </Section>
        <Hr style={global.hr} />
        <Section style={global.defaultPadding}>
          
            <Row>
              <Text style={global.paragraphWithBold}>Order Number</Text>
              <Text style={track.number}>{orderId}</Text>
            </Row>
            <Row style={{marginTop: 20}}>
              <Text style={global.paragraphWithBold}>Order Date</Text>
              <Text style={track.number}>{orderDate}</Text>
            </Row>
          
        </Section>

        <Hr style={global.hr} />

        <Section style={paddingY}>
          <Row>
            <Text
              style={{
                ...footer.text,
                paddingTop: 30,
                paddingBottom: 30,
              }}
            >
              Please contact us if you have any questions. (If you reply to this
              email, we won't be able to see it.)
            </Text>
          </Row>
          <Row>
            <Text style={footer.text}>
              © CasePython, Inc. All Rights Reserved.
            </Text>
          </Row>
        </Section>
      </Container>
      </Body>
    </Html>
  );
};

export default OrderReceivedEmail;

const paddingX = {
  paddingLeft: "40px",
  paddingRight: "40px",
};

const paddingY = {
  paddingTop: "22px",
  paddingBottom: "22px",
};

const paragraph = {
  margin: "0",
  lineHeight: "2",
};

const global = {
  paddingX,
  paddingY,
  defaultPadding: {
    ...paddingX,
    ...paddingY,
  },
  paragraphWithBold: { ...paragraph, fontWeight: "bold" },
  heading: {
    fontSize: "32px",
    lineHeight: "1.3",
    fontWeight: "700",
    textAlign: "center",
    letterSpacing: "-1px",
  } as React.CSSProperties,
  text: {
    ...paragraph,
    color: "#747474",
    fontWeight: "500",
  },
  button: {
    border: "1px solid #929292",
    fontSize: "16px",
    textDecoration: "none",
    padding: "10px 0px",
    width: "220px",
    display: "block",
    textAlign: "center",
    fontWeight: 500,
    color: "#000",
  } as React.CSSProperties,
  hr: {
    borderColor: "#E5E5E5",
    margin: "0",
  },
};

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "10px auto",
  width: "600px",
  maxWidth: "100%",
  border: "1px solid #E5E5E5",
};

const track = {
  container: {
    padding: "22px 40px",
    backgroundColor: "#F7F7F7",
  },
  number: {
    margin: "12px 0 0 0",
    fontWeight: 500,
    lineHeight: "1.4",
    color: "#6F6F6F",
  },
};

const message = {
  padding: "40px 74px",
  textAlign: "center",
} as React.CSSProperties;

const adressTitle = {
  ...paragraph,
  fontSize: "15px",
  fontWeight: "bold",
};

const footer = {
  policy: {
    width: "166px",
    margin: "auto",
  },
  text: {
    margin: "0",
    color: "#AFAFAF",
    fontSize: "13px",
    textAlign: "center",
  } as React.CSSProperties,
};
