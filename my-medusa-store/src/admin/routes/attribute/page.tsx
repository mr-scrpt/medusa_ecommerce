import { defineRouteConfig } from "@medusajs/admin-sdk";
import { ChatBubbleLeftRight } from "@medusajs/icons";

import {
  Container,
  DataTable,
  Heading,
  useDataTable,
  Button,
} from "@medusajs/ui";

import { useAttributeList } from "@/modules/attribute/interface.client";

import { useAttributeTableColumns } from "../../vm/table/columns/use-attribute-table-columns";
import { useNavigate } from "react-router-dom";

const AttributesPage = () => {
  const navigate = useNavigate();
  const { columns, order, sorting, limit } = useAttributeTableColumns();
  const { attributeList, count, isLoading } = useAttributeList({
    order,
    limit,
  });
  console.log("output_log: ATTRIBUTES =>>>", attributeList);

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
          <div className="flex items-center gap-x-2 ml-auto">
            <Button
              variant="secondary"
              onClick={() => navigate("/attribute/create")}
            >
              Create Attribute
            </Button>
          </div>
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
