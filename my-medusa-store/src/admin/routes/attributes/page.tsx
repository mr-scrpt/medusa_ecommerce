import { defineRouteConfig } from "@medusajs/admin-sdk";
import { Tag } from "@medusajs/icons";
import { Container, Heading } from "@medusajs/ui";

const AttributesPage = () => {
  return (
    <Container>
      <Heading>Атрибуты</Heading>
      <p>Здесь будут отображаться атрибуты товаров.</p>
    </Container>
  );
};

export const config = defineRouteConfig({
  label: "Атрибуты",
  icon: Tag,
});

export default AttributesPage;
