// import { zodResolver } from "@hookform/resolvers/zod";
// import { Button, Container, Heading, Input, toast } from "@medusajs/ui";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { useParams } from "react-router-dom";
//
// import { AttributeFieldType } from "@/modules/attribute/domain/type";
// import { useFieldArray } from "react-hook-form";
// import { useEffect } from "react";
// import { useQuery, useMutation } from "@tanstack/react-query";
//
// const EditAttributeSchema = z.object({
//   name: z.string().min(1, "Name is required"),
//   handle: z.string().min(1, "Handle is required"),
//   type: z.nativeEnum(AttributeFieldType),
//   filterable: z.boolean().default(false),
//   metadata: z.string().optional(),
//   values: z.array(
//     z.object({
//       id: z.string().optional(),
//       value: z.string().min(1, "Value is required"),
//       rank: z.number().default(0),
//       metadata: z.string().optional(),
//     }),
//   ),
// });
//
// type EditAttributeForm = z.infer<typeof EditAttributeSchema>;
//
// const fetchAttribute = async (id: string) => {
//   // return sdk.admin.attribute.retrieve(id, { fields: "*" });
// };
//
// const updateAttribute = async (id: string, data: EditAttributeForm) => {
//   // return sdk.admin.attribute.update(id, data);
// };
//
// const AttributeEdit = () => {
//   const { id } = useParams();
//   // const { data, isLoading: isDataLoading } = useQuery({
//   //   queryKey: ["attribute", id],
//   //   queryFn: () => fetchAttribute(id),
//   // });
//
//   const form = useForm<EditAttributeForm>({
//     resolver: zodResolver(EditAttributeSchema),
//   });
//
//   // useEffect(() => {
//   //   if (data?.attribute) {
//   //     form.reset({
//   //       ...data.attribute,
//   //       metadata: data.attribute.metadata
//   //         ? JSON.stringify(data.attribute.metadata)
//   //         : "",
//   //       values: data.attribute.values.map((v) => ({
//   //         ...v,
//   //         metadata: v.metadata ? JSON.stringify(v.metadata) : "",
//   //       })),
//   //     });
//   //   }
//   // }, [data, form]);
//
//   const { fields, append, remove } = useFieldArray({
//     control: form.control,
//     name: "values",
//   });
//
//   // const { mutate, isLoading } = useMutation(updateAttribute, {
//   //   onSuccess: () => {
//   //     toast.success("Attribute updated successfully");
//   //   },
//   //   onError: (err: Error) => {
//   //     toast.error(err.message);
//   //   },
//   // });
//
//   // const onSubmit = form.handleSubmit(async (data) => {
//   //   const payload = {
//   //     ...data,
//   //     metadata: data.metadata ? JSON.parse(data.metadata) : null,
//   //     values: data.values.map((v) => ({
//   //       ...v,
//   //       metadata: v.metadata ? JSON.parse(v.metadata) : null,
//   //     })),
//   //   };
//   //   mutate({ id, ...payload });
//   // });
//   //
//   // if (isDataLoading) {
//   //   return <Container>Loading...</Container>;
//   // }
//
//   return (
//     <Container>
//       <Heading level="h1">Edit Attribute</Heading>
//       <form onSubmit={() => {}} className="flex flex-col gap-y-4">
//         <div className="grid grid-cols-2 gap-4">
//           <Input {...form.register("name")} placeholder="e.g. Color" required />
//           <Input
//             {...form.register("handle")}
//             placeholder="e.g. color"
//             required
//           />
//         </div>
//         <div className="grid grid-cols-2 gap-4">
//           <select {...form.register("type")}>
//             {Object.values(AttributeFieldType).map((type) => (
//               <option key={type} value={type}>
//                 {type}
//               </option>
//             ))}
//           </select>
//           <div className="flex items-center gap-x-2">
//             <input
//               type="checkbox"
//               {...form.register("filterable")}
//               id="filterable"
//             />
//             <label htmlFor="filterable">Filterable</label>
//           </div>
//         </div>
//
//         <Heading level="h2">Values</Heading>
//         <div className="flex flex-col gap-y-4">
//           {fields.map((field, index) => (
//             <div key={field.id} className="grid grid-cols-3 gap-4">
//               <Input
//                 {...form.register(`values.${index}.value`)}
//                 placeholder="e.g. Red"
//                 required
//               />
//               <Input
//                 {...form.register(`values.${index}.rank`, {
//                   valueAsNumber: true,
//                 })}
//                 type="number"
//               />
//               <div className="flex items-end">
//                 <Button
//                   type="button"
//                   onClick={() => remove(index)}
//                   variant="danger"
//                 >
//                   Remove
//                 </Button>
//               </div>
//               {/* <JsonInput */}
//               {/*   {...form.register(`values.${index}.metadata`)} */}
//               {/*   label="Value Metadata" */}
//               {/*   placeholder='{ "key": "value" }' */}
//               {/*   className="col-span-3" */}
//               {/* /> */}
//             </div>
//           ))}
//         </div>
//         <Button
//           type="button"
//           onClick={() => append({ value: "", rank: 0, metadata: {} })}
//         >
//           Add Value
//         </Button>
//
//         <div className="flex justify-end">
//           <Button type="submit" isLoading={isLoading}>
//             Save Attribute
//           </Button>
//         </div>
//       </form>
//     </Container>
//   );
// };
//
// export default AttributeEdit;
