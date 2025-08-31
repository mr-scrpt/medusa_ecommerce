import { zodResolver } from "@hookform/resolvers/zod";
import cx from "classnames";
import {
  Controller,
  FormProvider,
  useFieldArray,
  useForm,
  useFormContext,
} from "react-hook-form";
import {
  AttributeRelationCreateForm,
  AttributeRelationCreateFormSchema,
  defaultAttributeRelationCreateForm,
} from "../../domain/from-create.schema";
import { PAGE_ATTRIBUTE_ROUTES } from "../../interface.type";
import { useAttributeCreateHandler } from "./handler/use-attribute-create.handler";
import { ComponentProps } from "react";
import { AttributeNameElement } from "./element/attribute-name.element";
import { Button, Label, Text } from "@medusajs/ui";
import { AttributeHandleElement } from "./element/attribute-handle.element";
import { AttributeTypeElement } from "./element/attribute-type.element";
import { AttributeIsFilterableElement } from "./element/attribute-is-filterable.element";
import { AttributeJSONViewElement } from "./element/attribute-json-view.element";
import { AttributeValueListElement } from "./element/value-list/attribute-vlaue-list.element";
import { Spinner } from "@medusajs/icons";

type AttributeFromCreateProps = ComponentProps<"div"> & {
  onSubmitForm: (data: AttributeRelationCreateForm) => void;
};

export const AttributeFrom = (props: AttributeFromCreateProps) => {
  const { children, className, onSubmitForm, ...rest } = props;
  const form = useForm<AttributeRelationCreateForm>({
    resolver: zodResolver(AttributeRelationCreateFormSchema),
    defaultValues: {
      ...defaultAttributeRelationCreateForm,
    },
  });

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmitForm)}
        className={cx("flex flex-col gap-4", className)}
      >
        {children}
      </form>
    </FormProvider>
  );
};

type AttributeNameElementProps = ComponentProps<"div">;
AttributeFrom.FieldName = (props: AttributeNameElementProps) => {
  const { className } = props;
  const { control } = useFormContext<AttributeRelationCreateForm>();
  return (
    <Controller
      control={control}
      name="attributeData.name"
      render={({ field, fieldState }) => (
        <div className={cx("flex flex-col gap-2", className)}>
          <Label size="small" weight="plus">
            Attribute Name
          </Label>
          <AttributeNameElement {...field} />
          <Text className="text-rose-600">{fieldState.error?.message}</Text>
        </div>
      )}
    />
  );
};

type AttributeHandleElementProps = ComponentProps<"div">;
AttributeFrom.FieldHandle = (props: AttributeHandleElementProps) => {
  const { className } = props;
  const { control } = useFormContext<AttributeRelationCreateForm>();
  return (
    <Controller
      control={control}
      name="attributeData.handle"
      render={({ field, fieldState }) => (
        <div className={cx("flex flex-col gap-2", className)}>
          <Label size="small" weight="plus">
            Attribute Handle
          </Label>
          <AttributeHandleElement {...field} />
          <Text className="text-rose-600">{fieldState.error?.message}</Text>
        </div>
      )}
    />
  );
};

type AttributeTypeElementProps = ComponentProps<"div">;

AttributeFrom.FieldType = (props: AttributeTypeElementProps) => {
  const { className } = props;
  const { control } = useFormContext<AttributeRelationCreateForm>();
  return (
    <Controller
      control={control}
      name="attributeData.type"
      render={({ field, fieldState }) => (
        <div className={cx("flex flex-col gap-2", className)}>
          <Label size="small" weight="plus">
            Attribute Type
          </Label>
          <AttributeTypeElement {...field} />
          <Text className="text-rose-600">{fieldState.error?.message}</Text>
        </div>
      )}
    />
  );
};

type AttributeIsFilterableElementProps = ComponentProps<"div">;
AttributeFrom.FieldIsFilterable = (
  props: AttributeIsFilterableElementProps,
) => {
  const { className } = props;
  const { control } = useFormContext<AttributeRelationCreateForm>();
  return (
    <Controller
      control={control}
      name="attributeData.filterable"
      render={({ field, fieldState }) => (
        <div className={cx("flex flex-col gap-2", className)}>
          <Label size="small" weight="plus">
            Is Filterable?
          </Label>
          <AttributeIsFilterableElement
            id="filterable"
            checked={!!field.value}
            onCheckedChange={(val) => field.onChange(val === true)}
            onBlur={field.onBlur}
            name={field.name}
            ref={field.ref}
          />

          <Text className="text-rose-600">{fieldState.error?.message}</Text>
        </div>
      )}
    />
  );
};

type AttributeJSONViewElementProps = ComponentProps<"div">;

AttributeFrom.FieldJSONView = (props: AttributeJSONViewElementProps) => {
  const { className } = props;
  const { control } = useFormContext<AttributeRelationCreateForm>();
  return (
    <Controller
      control={control}
      name="attributeData.metadata"
      render={({ field, fieldState }) => (
        <div className={cx("flex flex-col gap-2", className)}>
          <Label size="small" weight="plus">
            Attribute JSON View
          </Label>
          <AttributeJSONViewElement
            data={field.value}
            onSave={field.onChange}
          />
          <Text className="text-rose-600">{fieldState.error?.message}</Text>
        </div>
      )}
    />
  );
};

type AttributeValueListElementProps = ComponentProps<"div">;

AttributeFrom.FieldValuesList = (props: AttributeValueListElementProps) => {
  const { className } = props;
  const { control } = useFormContext<AttributeRelationCreateForm>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "valueListData",
  });
  return (
    <div className={cx("flex flex-col gap-2", className)}>
      <Label size="small" weight="plus">
        Attribute Values
      </Label>
      <AttributeValueListElement
        fields={fields}
        onAppend={append}
        onRemove={remove}
      />
    </div>
  );
};
type ButtonSubmitProps = ComponentProps<"button"> & {
  isPending?: boolean;
  submitText: string;
};
AttributeFrom.ButtonSubmit = (props: ButtonSubmitProps) => {
  const { isPending, submitText, ...rest } = props;

  return (
    <Button type="submit" disabled={isPending} {...rest}>
      {isPending && <Spinner className="mr-2 h-4 w-4 animate-spin" />}
      {submitText}
    </Button>
  );
};
