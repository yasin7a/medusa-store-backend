import { defineRouteConfig } from "@medusajs/admin-sdk";
import { Container, Heading } from "@medusajs/ui";
import { Receipt } from "@medusajs/icons";
function IconComponent() {
  return <Receipt color="#FDB813" />;
}
const CustomPage = () => {
  return (
    <Container className="divide-y p-0">
      <div className="flex items-center justify-between px-6 py-4">
        <Heading level="h2">This is my custom route</Heading>
      </div>
    </Container>
  );
};

export const config = defineRouteConfig({
  label: "POS",
  icon: Receipt,
});

export default CustomPage;
