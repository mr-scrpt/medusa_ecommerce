import {
  defineMiddlewares,
  validateAndTransformQuery,
} from "@medusajs/framework/http";
import { createFindParams } from "@medusajs/medusa/api/utils/validators";

export const GetAttributesSchema = createFindParams();

export default defineMiddlewares({
  routes: [
    {
      matcher: "/admin/attributes",
      method: "GET",
      middlewares: [
        validateAndTransformQuery(GetAttributesSchema, {
          defaults: [
            "id",
            "name",
            "handle",
            "type",
            "filterable",
            "metadata",
            // "values.*",
          ],
          isList: true,
        }),
      ],
    },
  ],
});
