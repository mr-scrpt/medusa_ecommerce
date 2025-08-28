import {
  AttributeValueCreateForm,
  AttributeCreateForm,
  AttributeRelationCreateForm,
} from "./form.schema";
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
export type AttributeListResponse = MetadataResponse & {
  attributeList: AttributeType[];
};

export type AttributeRelationListResponse = MetadataResponse & {
  attributeList: AttributeRelationType[];
};

export type AttribureResponse = {
  attribute: AttributeType;
};

// Payload
export type AttributeCreatePayload = AttributeCreateForm;
export type AttributeValueCreatePayload = AttributeValueCreateForm;

export type AttributeRelationCreatePayload = AttributeRelationCreateForm;
