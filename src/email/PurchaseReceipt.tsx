// For debug: http://localhost:3001/preview/PurchaseReceipt?view=desktop
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Tailwind,
} from "@react-email/components";
import { OrderInformation } from "./components/OrderInformation";

type PurchaseReceiptEmailProps = {
  product: {
    name: string;
    imagePath: string;
    description: string;
  };
  order: { id: string; createdAt: Date; pricePaidInCents: number };
  downloadVerificationId: string;
};

// PreviewProps: Use static data: looks like the figma design
PurchaseReceiptEmail.PreviewProps = {
  product: {
    name: "Product name",
    description: "Some description",
    // copy a img name from  /products/
    imagePath:
      "/products/28e4d52b-9748-44cc-a722-83deea395171-7c09255bb06448d9a7469e712e2ed5e0.png",
  },
  order: {
    id: crypto.randomUUID(),
    createdAt: new Date(),
    pricePaidInCents: 10000,
  },
  downloadVerificationId: crypto.randomUUID(),
} satisfies PurchaseReceiptEmailProps;

export default function PurchaseReceiptEmail({
  product,
  order,
  downloadVerificationId,
}: PurchaseReceiptEmailProps) {
  return (
    // from  react-email/components
    <Html>
      <Preview>Download {product.name} and view receipt</Preview>
      <Tailwind>
        <Head />

        <Body className="font-sans bg-white">
          {/* Container wrap entire email body  */}
          <Container className="max-w-xl">
            <Heading>Purchase Receipt</Heading>

            {/* one order */}
            <OrderInformation
              order={order}
              product={product}
              downloadVerificationId={downloadVerificationId}
            />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
