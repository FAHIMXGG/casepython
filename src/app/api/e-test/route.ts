// app/api/send-test/route.ts
import OrderReceivedEmail from '@/components/emails/OrderReceivedEmail';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const orderId='32423r4fc5645v657566b7456v45v7467456435123456789';
const orderDate='12/30/25';
const shippingAddress = {
    name: 'John Doe',
    city: 'New York',
    country: 'USA',
    postalCode: '10001',
    street: '123 Main St',
    state: 'NY',
  };

export async function POST() {
  const emailResult = await resend.emails.send({
    from: "CasePython <support@kraito.com>", // Use verified domain
    to: ["hoq788@gmail.com"],
    subject: "Test Email",
    react: OrderReceivedEmail({
        orderId,
        orderDate: orderDate,
        // @ts-ignore
        shippingAddress: {
          name: shippingAddress.name,
          city: shippingAddress.city,
          country: shippingAddress.country,
          postalCode: shippingAddress.postalCode,
          street: shippingAddress.street,
          state: shippingAddress.state,
        },
      }),
  });

  console.log("Test Email Result:", emailResult);
  return Response.json({ success: true, data: emailResult });
}
