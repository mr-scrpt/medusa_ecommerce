import { sdk } from "@/shared/lib/medusa";
import { useQuery } from "@tanstack/react-query";

import { createQueryParamsString } from "@/shared/lib/react-router";
import {
  ATTRIBUTE_RELATION_FIELDS,
  AttributeListParams,
  AttributeListResponse,
  AttributeType,
} from "../../interface.type";

export const useAttributeList = (query: AttributeListParams) => {
  const { data, ...rest } = useQuery({
    queryKey: ["attributes", query],
    queryFn: async () => {
      const params = createQueryParamsString({
        query,
      });

      return sdk.client.fetch<AttributeListResponse>(
        `/admin/attributes?${params}`,
      );
    },
  });

  return { ...data, ...rest };
};

export const useAttributeRelationList = (query: AttributeListParams) => {
  const { data, ...rest } = useQuery({
    queryKey: ["attributes", query],
    queryFn: async () => {
      const params = createQueryParamsString({
        query,
        relations: ATTRIBUTE_RELATION_FIELDS,
      });

      return sdk.client.fetch<AttributeListResponse>(
        `/admin/attributes?${params}`,
      );
    },
  });

  return { ...data, ...rest };
};

export const useAttribute = (id: string) => {
  const { data, ...rest } = useQuery({
    queryKey: ["attributes", id],
    queryFn: async () => {
      return sdk.client.fetch<AttributeType>(`/admin/attributes/${id}`);
    },
  });

  return { attribute: data, ...rest };
};
