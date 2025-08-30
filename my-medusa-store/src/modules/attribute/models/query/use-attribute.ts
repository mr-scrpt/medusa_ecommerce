import { useQuery } from "@tanstack/react-query";

import { attributeApi } from "../../api/endpoint.api";
import {
  ATTRIBUTE_RELATION_FIELDS,
  AttributeListParams,
  AttributeListResponse,
  AttributeRelationFieldList,
  AttributeResponse,
} from "../../interface.type";

const useAttributeFabric =
  (relations?: AttributeRelationFieldList) => (id: string) => {
    const { data, ...rest } = useQuery({
      queryKey: ["attribute", id, relations],
      queryFn: async () => {
        return attributeApi.get<AttributeResponse>({ id, ...relations });
      },

      enabled: !!id,
    });

    return { attribute: data, ...rest };
  };

export const useAttributeQuery = useAttributeFabric();
export const useAttributeWithValueListQuery = useAttributeFabric(
  ATTRIBUTE_RELATION_FIELDS,
);

const useAttributeListFabric =
  (relations?: AttributeRelationFieldList) => (query: AttributeListParams) => {
    const { data, ...rest } = useQuery({
      queryKey: ["attribute", query, relations],
      queryFn: async () => {
        return attributeApi.getList<AttributeListResponse>({
          ...query,
          ...relations,
        });
      },
    });

    return { ...data, ...rest };
  };

export const useAttributeListQuery = useAttributeListFabric();
export const useAttributeListWithValueListQuery = useAttributeListFabric(
  ATTRIBUTE_RELATION_FIELDS,
);
