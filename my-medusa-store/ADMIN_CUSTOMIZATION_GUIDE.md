# Руководство по кастомизации админ-панели Medusa

Это руководство объясняет, как добавлять новые страницы в админ-панель Medusa, сохраняя при этом единый стиль кода и используя те же абстракции, что и в стандартных разделах (например, на странице "Products").

Мы рассмотрим пример создания страницы "Attributes", на которой будет отображаться таблица с данными, поддерживающая сортировку, фильтрацию и пагинацию.

## 1. Структура файлов

Для каждого нового раздела админ-панели рекомендуется создавать следующую структуру файлов. Это повторяет подход, используемый в ядре Medusa.

```
src/admin/
├── routes/
│   └── attributes/
│       └── page.tsx      # Основной компонент страницы
└── hooks/
    ├── api/
    │   └── use-attributes.ts # Хук для загрузки данных
    └── table/
        ├── use-attribute-table-columns.ts # Хук для определения колонок
        ├── use-attribute-table-filters.ts # Хук для определения фильтров
        └── use-attribute-table-query.ts   # Хук для управления параметрами запроса
```

Такое разделение позволяет изолировать логику и упрощает поддержку кода.

## 2. Создание страницы и пункта в меню

Файл `src/admin/routes/attributes/page.tsx` отвечает за отображение страницы и добавление пункта в боковое меню.

```tsx
// src/admin/routes/attributes/page.tsx

import { defineRouteConfig } from "@medusajs/admin-sdk"
import { ChatBubbleLeftRight } from "@medusajs/icons"
import { Container, Heading, DataTable } from "@medusajs/ui"
import { useDataTable } from "@medusajs/ui-kit" // Обратите внимание на импорт

import { useAttributes } from "../../hooks/api/use-attributes"
import { useAttributeTableColumns } from "../../hooks/table/use-attribute-table-columns"
import { useAttributeTableFilters } from "../../hooks/table/use-attribute-table-filters"
import { useAttributeTableQuery } from "../../hooks/table/use-attribute-table-query"

const PAGE_SIZE = 20

const AttributesPage = () => {
  const { searchParams, raw } = useAttributeTableQuery({ pageSize: PAGE_SIZE })
  const { attributes, count, isLoading } = useAttributes(searchParams)

  const filters = useAttributeTableFilters()
  const columns = useAttributeTableColumns()

  const { table } = useDataTable({
    data: attributes || [],
    columns,
    count,
    enablePagination: true,
    pageSize: PAGE_SIZE,
    getRowId: (row) => row.id,
  })

  return (
    <Container>
      <DataTable instance={table} isLoading={isLoading}>
        <DataTable.Toolbar>
          <Heading>Attributes</Heading>
        </DataTable.Toolbar>
        <DataTable.Filter
          filters={filters}
          searchPlaceholder="Search Attributes..."
        />
        <DataTable.Table />
        <DataTable.Pagination />
      </DataTable>
    </Container>
  )
}

// Эта конфигурация добавляет пункт в боковое меню
export const config = defineRouteConfig({
  label: "Attributes",
  icon: ChatBubbleLeftRight,
})

export default AttributesPage
```

## 3. Получение данных (API Hook)

Создадим кастомный хук для загрузки данных об атрибутах. Этот подход аналогичен хуку `useProducts` в ядре Medusa.

### Важные отличия от нативной реализации

При работе с кастомными сущностями есть два ключевых отличия от работы с нативными, такими как Products:

1.  **Типы данных:** Для кастомной сущности `Attribute` не существует готовых типов в `@medusajs/types`. Вам нужно будет создать их самостоятельно (например, в `src/admin/types/attribute.ts`), как мы обсуждали ранее. Это типы `AdminAttribute`, `AdminAttributeListParams` и `AdminAttributeListResponse`.
2.  **Вызов API:** Стандартный `sdk` не имеет метода `sdk.admin.attribute.list()`. Вместо этого, как указано в [официальной документации](https://docs.medusajs.com/resources/js-sdk), для кастомных эндпоинтов следует использовать универсальный метод `sdk.client.fetch()`.

### Реализация хука

Вот как будет выглядеть хук с учетом этих особенностей.

```ts
// src/admin/hooks/api/use-attributes.ts

import { useQuery } from "@tanstack/react-query"
import { sdk } from "../../../lib/config"
import {
  AdminAttribute,
  AdminAttributeListParams,
  AdminAttributeListResponse,
} from "../../types/attribute" // Используем наши кастомные типы

// Утилита для очистки объекта от null/undefined полей
const cleanObject = (obj) => {
  const newObj = {};
  for (const key in obj) {
    if (obj[key] !== null && obj[key] !== undefined) {
      newObj[key] = obj[key];
    }
  }
  return newObj;
};

// Хук для получения списка атрибутов
export const useAttributes = (query: AdminAttributeListParams) => {
  const { data, ...rest } = useQuery({
    queryKey: ["attributes", query],
    queryFn: async () => {
      // Преобразуем объект query в строку параметров
      const params = new URLSearchParams(cleanObject(query));
      // Используем sdk.client.fetch для вызова кастомного эндпоинта
      return sdk.client.fetch<AdminAttributeListResponse>(
        `/admin/attributes?${params.toString()}`
      )
    },
  })

  return { attributes: data?.attributes, count: data?.count, ...rest }
}

// Хук для получения одного атрибута
export const useAttribute = (id: string) => {
  const { data, ...rest } = useQuery({
    queryKey: ["attributes", id],
    queryFn: async () => {
      return sdk.client.fetch<{ attribute: AdminAttribute }>(
        `/admin/attributes/${id}`
      )
    },
  })

  return { attribute: data?.attribute, ...rest }
}
```

В этом коде мы используем `sdk.client.fetch<T>()`, где `<T>` — это тип ожидаемого ответа (`AdminAttributeListResponse` или `{ attribute: AdminAttribute }`). Мы также используем `URLSearchParams` для корректного формирования строки запроса из объекта `query`.

## 4. Управление параметрами запроса (Query Hook)

Этот хук централизует логику работы с параметрами URL (сортировка, фильтры, поиск), как это делает `useProductTableQuery`.

```ts
// src/admin/hooks/table/use-attribute-table-query.ts

import { useQueryParams } from "@medusajs/ui-kit"

export const useAttributeTableQuery = ({
  pageSize = 20,
  prefix,
}: {
  pageSize?: number
  prefix?: string
}) => {
  const raw = useQueryParams(
    ["q", "order", "status", "created_at", "updated_at"],
    prefix
  )

  const searchParams = {
    limit: pageSize,
    offset: raw.offset ? Number(raw.offset) : 0,
    order: raw.order,
    q: raw.q,
    status: raw.status,
    created_at: raw.created_at ? JSON.parse(raw.created_at) : undefined,
    updated_at: raw.updated_at ? JSON.parse(raw.updated_at) : undefined,
  }

  return {
    raw,
    searchParams,
  }
}
```

## 5. Определение колонок (Columns Hook)

Хук для колонок инкапсулирует логику их отображения.

```ts
// src/admin/hooks/table/use-attribute-table-columns.ts

import { createColumnHelper } from "@tanstack/react-table"
import { useMemo } from "react"
import { HttpTypes } from "@medusajs/framework/types"

// Замените на ваш тип атрибута
type Attribute = HttpTypes.AdminAttribute;

const columnHelper = createColumnHelper<Attribute>()

export const useAttributeTableColumns = () => {
  const columns = useMemo(
    () => [
      columnHelper.accessor("name", {
        header: "Name",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("handle", {
        header: "Handle",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("created_at", {
        header: "Created At",
        cell: (info) => new Date(info.getValue()).toLocaleDateString(),
      }),
    ],
    []
  )

  return columns
}
```

## 6. Определение фильтров (Filters Hook)

И, наконец, хук для определения фильтров, которые будут отображаться на панели `DataTable.Filter`.

```ts
// src/admin/hooks/table/use-attribute-table-filters.ts

import { createDataTableFilterHelper } from "@medusajs/ui-kit"
import { useMemo } from "react"

const filterHelper = createDataTableFilterHelper<any>() // Замените any на тип атрибута

export const useAttributeTableFilters = () => {
  const filters = useMemo(
    () => [
      filterHelper.text({
        id: "q",
        label: "Search",
        placeholder: "Search by name or handle...",
      }),
      filterHelper.select({
        id: "status",
        label: "Status",
        options: [
          { value: "active", label: "Active" },
          { value: "draft", label: "Draft" },
        ],
      }),
      filterHelper.date({
        id: "created_at",
        label: "Created At",
      }),
    ],
    []
  )

  return filters
}
```

Следуя этой структуре, вы сможете создавать расширения для админ-панели, которые будут выглядеть и работать так же, как и стандартные разделы, что сделает ваш код чистым, масштабируемым и легким для понимания другими разработчиками.
