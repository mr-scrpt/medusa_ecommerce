// src/modules/attributes/vm/table/attribute-table-config.ts
import { AttributeType } from "@/modules/attributes/interface.type";
import {
  createDataTableColumnHelper,
  DataTableSortingState,
} from "@medusajs/ui";
import { useMemo, useState } from "react";

const PAGE_SIZE = 20;
const columnHelper = createDataTableColumnHelper<AttributeType>();

export const useAttributeTableColumns = () => {
  const columns = useMemo(
    () => [
      columnHelper.accessor("name", {
        id: "name",
        header: "Name",
        enableSorting: true,
      }),
      columnHelper.accessor("handle", {
        id: "handle",
        header: "Handle",
        enableSorting: true,
      }),
      columnHelper.accessor("created_at", {
        id: "created_at",
        header: "Created At",
        cell: (info) => new Date(info.getValue()).toLocaleDateString(),
        enableSorting: true,
      }),
    ],
    [],
  );

  const defaultSortKey = useMemo(
    () => columns.find((c) => c.enableSorting)?.id || "",
    [columns],
  );

  const [sorting, setSorting] = useState<DataTableSortingState | null>(null);

  const order = useMemo(() => {
    if (sorting) {
      return `${sorting.desc ? "-" : ""}${sorting.id}`;
    }
    return defaultSortKey;
  }, [sorting, defaultSortKey]);

  return {
    columns,
    sorting: {
      state: sorting,
      onSortingChange: setSorting,
    },
    order,
    limit: PAGE_SIZE,
  };
};

// // Единая конфигурация всех полей таблицы
// const TABLE_FIELDS_CONFIG = {
//   name: {
//     header: "Name",
//     sortable: true,
//     sortLabel: "Name",
//     sortAscLabel: "A-Z",
//     sortDescLabel: "Z-A",
//     accessor: "name" as keyof AttributeType,
//   },
//   handle: {
//     header: "Handle",
//     sortable: true,
//     sortLabel: "Handle",
//     sortAscLabel: "A-Z",
//     sortDescLabel: "Z-A",
//     accessor: "handle" as keyof AttributeType,
//   },
//   created_at: {
//     header: "Created At",
//     sortable: true,
//     sortLabel: "Created At",
//     sortAscLabel: "Oldest first",
//     sortDescLabel: "Newest first",
//     accessor: "created_at" as keyof AttributeType,
//     cell: (info: any) => new Date(info.getValue()).toLocaleDateString(),
//   },
//   type: {
//     header: "Type",
//     sortable: false,
//     accessor: "type" as keyof AttributeType,
//     cell: (info: any) => (
//       <span className="capitalize">{info.getValue()?.replace("_", " ")}</span>
//     ),
//   },
//   filterable: {
//     header: "Filterable",
//     sortable: false,
//     accessor: "filterable" as keyof AttributeType,
//     cell: (info: any) => (
//       <span className={info.getValue() ? "text-green-600" : "text-gray-400"}>
//         {info.getValue() ? "Yes" : "No"}
//       </span>
//     ),
//   },
// } as const;
//
// type FieldKey = keyof typeof TABLE_FIELDS_CONFIG;
//
// export const useAttributeTableColumns = () => {
//   const [sorting, setSorting] = useState<DataTableSortingState>({
//     id: "name",
//     desc: false,
//   });
//
//   // Генерируем order для API из текущей сортировки
//   const order = useMemo(() => {
//     const fieldKey = sorting.id as FieldKey;
//     const fieldConfig = TABLE_FIELDS_CONFIG[fieldKey];
//
//     const direction = sorting.desc ? "-" : "";
//     return `${direction}${fieldConfig.accessor}`;
//   }, [sorting]);
//
//   // Генерируем колонки из конфигурации
//   const columns = useMemo(() => {
//     return Object.entries(TABLE_FIELDS_CONFIG).map(([key, config]) => {
//       const baseConfig = {
//         header: config.header,
//         enableSorting: config.sortable,
//         ...(config.cell && { cell: config.cell }),
//       };
//
//       // Добавляем настройки сортировки только для сортируемых полей
//       if (config.sortable) {
//         Object.assign(baseConfig, {
//           sortLabel: config.sortLabel,
//           sortAscLabel: config.sortAscLabel,
//           sortDescLabel: config.sortDescLabel,
//         });
//       }
//
//       return columnHelper.accessor(config.accessor, baseConfig);
//     });
//   }, []);
//
//   // Возвращаем всё необходимое для таблицы и запросов
//   return {
//     columns,
//     sorting: {
//       state: sorting,
//       onSortingChange: (d: any) => {
//         console.log("output_log: d =>>>", d);
//         setSorting(d);
//       },
//     },
//     order, // Готовый параметр для useAttributeList
//     sortableFields: Object.keys(TABLE_FIELDS_CONFIG).filter(
//       (key) => TABLE_FIELDS_CONFIG[key as FieldKey].sortable,
//     ),
//   };
// };

// import { AttributeType } from "@/modules/attributes/interface.type";
// import { createDataTableColumnHelper } from "@medusajs/ui";
// import { useMemo } from "react";
//
// const columnHelper = createDataTableColumnHelper<AttributeType>();
//
// export const useAttributeTableColumns = () => {
//   const columns = useMemo(
//     () => [
//       columnHelper.accessor("name", {
//         header: "Name",
//         enableSorting: true,
//         sortLabel: "Name",
//         sortAscLabel: "A-Z",
//         sortDescLabel: "Z-A",
//       }),
//       columnHelper.accessor("handle", {
//         header: "Handle",
//         enableSorting: true,
//         sortLabel: "Handle",
//         sortAscLabel: "A-Z",
//         sortDescLabel: "Z-A",
//       }),
//       columnHelper.accessor("created_at", {
//         header: "Created At",
//         cell: (info) => new Date(info.getValue()).toLocaleDateString(),
//       }),
//     ],
//     [],
//   );
//
//   return columns;
// };
