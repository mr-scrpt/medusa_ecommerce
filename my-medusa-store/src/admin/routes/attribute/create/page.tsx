import { Container, Heading } from "@medusajs/ui";

import { AttributeCreateForm } from "@/modules/attribute/interface.client";

const AttributeCreate = () => {
  return (
    <Container>
      <Heading level="h1">Create Attribute</Heading>
      <AttributeCreateForm />
    </Container>
  );
};

export default AttributeCreate;
