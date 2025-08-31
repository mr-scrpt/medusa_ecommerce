import { Container, Heading } from "@medusajs/ui";
import { useAttributeCreateHandler } from "./handler/use-attribute-create.handler";
import { PAGE_ATTRIBUTE_ROUTES } from "../../interface.type";
import { AttributeFrom } from ".";

export const AttributeCreateForm = () => {
  const { handleAttributeCreate, isPending, isError } =
    useAttributeCreateHandler({
      onSuccess: () => {
        console.log("output_log: %%%%%%%%%%%%% =>>> OLOLOLO");
      },
      callbackUrl: PAGE_ATTRIBUTE_ROUTES.BASE,
      onError: () => {
        console.log("output_log: %%%%%%%%%%%%% =>>> OLOLOLO");
      },
    });

  return (
    <Container>
      <Heading level="h1">Create Attribute</Heading>

      <AttributeFrom
        className="flex flex-col gap-y-4"
        onSubmitForm={handleAttributeCreate}
      >
        {/* Первая строка: Name и Handle */}
        <div className="grid grid-cols-2 gap-x-4">
          <AttributeFrom.FieldName />
          <AttributeFrom.FieldHandle />
        </div>

        {/* Вторая строка: Type и Filterable */}
        <div className="grid grid-cols-2 gap-x-4">
          <AttributeFrom.FieldType />
          <AttributeFrom.FieldIsFilterable />
        </div>

        {/* JSON metadata */}
        <AttributeFrom.FieldJSONView />

        {/* Заголовок для значений */}
        <Heading level="h2">Values</Heading>

        {/* Список значений */}
        <AttributeFrom.FieldValuesList />

        {/* Кнопка отправки */}
        <div className="flex justify-end mt-4">
          <AttributeFrom.ButtonSubmit
            isPending={isPending}
            submitText="Create Attribute"
          />
        </div>
      </AttributeFrom>
    </Container>
  );
};
