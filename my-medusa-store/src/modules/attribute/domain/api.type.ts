import { AttributeFormDefaultValues } from "./attribute.schema";
import { AttributeValueFormDefaultValue } from "./attribute-value.schema";
import { AttributeRelationCreateForm } from "./from-create.schema";
import { AttributeRelationType, AttributeType } from "./type";

export type AttributeListParams = {
  q?: string;
  limit?: number;
  offset?: number;
  order?: string;
  created_at?: string;
  updated_at?: string;
  name?: string;
  handle?: string;
};

type MetadataResponse = {
  count: number;
  offset: number;
  limit: number;
};

export type AttributeResponse = {
  attribute: AttributeType;
};

export type AttributeListResponse = MetadataResponse & {
  attributeList: AttributeType[];
};

export type AttributeRelationListResponse = MetadataResponse & {
  attributeList: AttributeRelationType[];
};

// Payload
export type AttributeCreatePayload = AttributeFormDefaultValues;
export type AttributeValueCreatePayload = AttributeValueFormDefaultValue;

export type AttributeRelationCreatePayload = AttributeRelationCreateForm;
