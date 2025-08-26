import { defineRouteConfig } from "@medusajs/admin-sdk";
import { ChatBubbleLeftRight } from "@medusajs/icons";

import {
  Container,
  DataTable,
  DataTableSortingState,
  Heading,
  useDataTable,
} from "@medusajs/ui";
import { useState } from "react";

import {
  useAttributeList,
  useAttributeRelationList,
} from "@/modules/attributes/interface.client";

import { useAttributeTableColumns } from "../../vm/table/columns/use-attribute-table-columns";

const AttributesPage = () => {
  const { columns, order, sorting, limit } = useAttributeTableColumns();
  const { attributeList, count, isLoading } = useAttributeRelationList({
    order,
    limit,
  });
  console.log("output_log:  =>>>", attributeList);

  const table = useDataTable({
    data: attributeList || [],
    columns,
    getRowId: (row) => row.id,
    rowCount: count,
    isLoading,
    sorting,
  });

  return (
    <Container>
      <DataTable instance={table}>
        <DataTable.Toolbar>
          <Heading>Attributes</Heading>
        </DataTable.Toolbar>
        <DataTable.Table />
      </DataTable>
    </Container>
  );
};

export const config = defineRouteConfig({
  label: "Attributes",
  icon: ChatBubbleLeftRight,
});

export default AttributesPage;
