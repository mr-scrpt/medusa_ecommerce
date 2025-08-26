import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Container, Heading, Input, toast } from "@medusajs/ui";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { AttributeFieldType } from "@/modules/attributes/domain/type";
import { useFieldArray } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { sdk } from "@/shared/lib/medusa";

const CreateAttributeSchema = z.object({
  name: z.string().min(1, "Name is required"),
  handle: z.string().min(1, "Handle is required"),
  type: z.nativeEnum(AttributeFieldType),
  filterable: z.boolean().default(false),
  metadata: z.string().optional(),
  values: z.array(
    z.object({
      value: z.string().min(1, "Value is required"),
      rank: z.number().default(0),
      metadata: z.string().optional(),
    }),
  ),
});

type CreateAttributeForm = z.infer<typeof CreateAttributeSchema>;

const AttributeCreate = () => {
  const navigate = useNavigate();
  const form = useForm<CreateAttributeForm>({
    resolver: zodResolver(CreateAttributeSchema),
    defaultValues: {
      values: [],
      filterable: false,
      type: AttributeFieldType.SINGLE,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "values",
  });

  // const { mutate, isLoading } = sdk.admin.attribute.create();
  //
  // const onSubmit = form.handleSubmit(async (data) => {
  //   const payload = {
  //     ...data,
  //     metadata: data.metadata ? JSON.parse(data.metadata) : null,
  //     values: data.values.map((v) => ({
  //       ...v,
  //       metadata: v.metadata ? JSON.parse(v.metadata) : null,
  //     })),
  //   };
  //   mutate(payload, {
  //     onSuccess: () => {
  //       toast.success("Attribute created successfully");
  //       navigate("/attributes");
  //     },
  //     onError: (err) => {
  //       toast.error(err.message);
  //     },
  //   });
  // });

  return (
    <Container>
      <Heading level="h1">Create Attribute</Heading>
      <form onSubmit={() => {}} className="flex flex-col gap-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Input {...form.register("name")} placeholder="e.g. Color" required />
          <Input
            {...form.register("handle")}
            placeholder="e.g. color"
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <select {...form.register("type")}>
            {Object.values(AttributeFieldType).map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <div className="flex items-center gap-x-2">
            <input
              type="checkbox"
              {...form.register("filterable")}
              id="filterable"
            />
            <label htmlFor="filterable">Filterable</label>
          </div>
        </div>
        {/* <JsonInput */}
        {/*   {...form.register("metadata")} */}
        {/*   label="Metadata" */}
        {/*   placeholder='{ "key": "value" }' */}
        {/* /> */}

        <Heading level="h2">Values</Heading>
        <div className="flex flex-col gap-y-4">
          {fields.map((field, index) => (
            <div key={field.id} className="grid grid-cols-3 gap-4">
              <Input
                {...form.register(`values.${index}.value`)}
                placeholder="e.g. Red"
                required
              />
              <Input
                {...form.register(`values.${index}.rank`, {
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
          onClick={() => append({ value: "", rank: 0, metadata: "" })}
        >
          Add Value
        </Button>

        <div className="flex justify-end">
          <Button type="submit" isLoading={false}>
            Create Attribute
          </Button>
        </div>
      </form>
    </Container>
  );
};

export default AttributeCreate;
