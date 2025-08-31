import { AttributeFieldType } from "@/modules/attribute/interface.type";
import { Select } from "@medusajs/ui";
import type { ComponentProps } from "react";

type AttributeNameElementProps = ComponentProps<typeof Select>;

export const AttributeTypeElement = (props: AttributeNameElementProps) => {
  const { children, ...rest } = props;
  return (
    <Select {...rest}>
      <Select.Trigger>
        <Select.Value />
      </Select.Trigger>
      <Select.Content>
        {Object.entries(AttributeFieldType).map(([key, type]) => (
          <Select.Item key={type} value={type}>
            {key}
          </Select.Item>
        ))}
      </Select.Content>
    </Select>
  );
};
