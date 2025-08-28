import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Container, Heading, Input, Select } from "@medusajs/ui";
import { useForm } from "react-hook-form";

import { AttributeFieldType } from "@/modules/attribute/domain/type";
import { useAttributeCreate } from "@/modules/attribute/interface.client";
import { JsonViewSection } from "@/shared/ui/kit/json-view-section/json-view-section";
import { useFieldArray } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import AttributeCreate from "@/admin/routes/attribute/create/page";
import {
  AttributeRelationCreateForm,
  AttributeRelationCreateFormSchema,
} from "../../domain/form.schema";

export const AttributeCreateForm = () => {
  const navigate = useNavigate();
  const form = useForm<AttributeRelationCreateForm>({
    resolver: zodResolver(AttributeRelationCreateFormSchema),
    defaultValues: {
      attributeData: {
        name: "",
        handle: "",
        type: AttributeFieldType.SINGLE,
        filterable: false,
        metadata: JSON.parse("{}"),
      },
      valueListData: [
        { name: "", value: "", rank: 0, metadata: JSON.parse("{}") },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "valueListData",
  });

  const { mutateAsync: createAttribute, isPending } = useAttributeCreate();

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      const payload = {
        ...data,
      };

      await createAttribute(payload);

      navigate("/attributes"); // ваш путь списка атрибутов
    } catch {
      // onError уже покажет toast
    }
  });

  return (
    <Container>
      <Heading level="h1">Create Attribute</Heading>
      <form onSubmit={onSubmit} className="flex flex-col gap-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Input
            {...form.register("attributeData.name")}
            placeholder="e.g. Color"
            required
          />
          <Input
            {...form.register("attributeData.handle")}
            placeholder="e.g. color"
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Select>
            <Select.Trigger>
              <Select.Value placeholder="Select a currency" />
            </Select.Trigger>

            <Select.Content>
              {Object.entries(AttributeFieldType).map(([key, type]) => (
                <Select.Item key={type} value={type}>
                  {key}
                </Select.Item>
              ))}
            </Select.Content>
          </Select>
          <div className="flex items-center gap-x-2">
            <input
              type="checkbox"
              {...form.register("attributeData.filterable")}
              id="filterable"
            />
            <label htmlFor="filterable">Filterable</label>
          </div>
        </div>
        <JsonViewSection
          title="Metadata"
          data={form.watch("attributeData.metadata")}
          editable={true}
          onSave={(value) => form.setValue("attributeData.metadata", value)}
        />

        <Heading level="h2">Values</Heading>
        <div className="flex flex-col gap-y-4">
          {fields.map((field, index) => (
            <div key={field.id} className="grid grid-cols-3 gap-4">
              <Input
                {...form.register(`valueListData.${index}.value`)}
                placeholder="e.g. Red"
                required
              />
              <Input
                {...form.register(`valueListData.${index}.rank`, {
                  valueAsNumber: true,
                })}
                type="number"
                defaultValue={0}
              />
              <div className="flex items-end">
                <Button
                  type="button"
                  onClick={() => remove(index)}
                  variant="danger"
                >
                  Remove
                </Button>
              </div>
            </div>
          ))}
        </div>
        <Button
          type="button"
          onClick={() =>
            append({ name: "", value: "", rank: 0, metadata: JSON.parse("{}") })
          }
        >
          Add Value
        </Button>

        <div className="flex justify-end">
          <Button type="submit" isLoading={isPending}>
            Create Attribute
          </Button>
        </div>
      </form>
    </Container>
  );
};

export default AttributeCreate;
