"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { createProduct } from "@/actions/create-product";

const weightUnitEnum = z.enum(["grams", "kilograms", "milliliter", "liter"])
const packingTypeEnum = z.enum(["box", "bottle", "bucket", "pouch", "tin", "drum", "woven sack bag", "plastic container"])
const formTypeEnum = z.enum(["powder", "liquid", "granules"])

const variantSchema = z.object({
  sku: z.string().min(1, "SKU is required"),
  price: z.preprocess(
    (a) => parseFloat(z.string().parse(a)),
    z.number().min(0, "Price must be a positive number")
  ),
  weight_value: z.preprocess(
    (a) => parseFloat(z.string().parse(a)),
    z.number().min(0, "Weight value must be a positive number")
  ),
  weight_unit: weightUnitEnum,
  packing_type: packingTypeEnum,
  form_type: formTypeEnum,
})

const productFormSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  description: z.string().optional(),
  variants: z.array(variantSchema).min(1, "At least one variant is required"),
})

export type ProductFormValues = z.infer<typeof productFormSchema>

export function AdminProductForm() {
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: "",
      description: "",
      variants: [{ sku: "", price: 0, weight_value: 0, weight_unit: "grams", packing_type: "box", form_type: "powder" }] // Default initial variant
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "variants",
  })

  async function onSubmit(values: ProductFormValues) {
    const response = await createProduct(values);
    if (response.success) {
      console.log("Saved");
    } else {
      console.error("Failed to save product:", response.message);
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Product Information</CardTitle>
        <CardDescription>
          Manage your product details and variants.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter product name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter product description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Product Variants</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>SKU</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Weight Value</TableHead>
                    <TableHead>Weight Unit</TableHead>
                    <TableHead>Packing Type</TableHead>
                    <TableHead>Form Type</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {fields.map((field, index) => (
                    <TableRow key={field.id}>
                      <TableCell>
                        <FormField
                          control={form.control}
                          name={`variants.${index}.sku`}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </TableCell>
                      <TableCell>
                        <FormField
                          control={form.control}
                          name={`variants.${index}.price`}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input type="number" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </TableCell>
                      <TableCell>
                        <FormField
                          control={form.control}
                          name={`variants.${index}.weight_value`}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input type="number" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </TableCell>
                      <TableCell>
                        <FormField
                          control={form.control}
                          name={`variants.${index}.weight_unit`}
                          render={({ field }) => (
                            <FormItem>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select a unit" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {weightUnitEnum.options.map((unit) => (
                                    <SelectItem key={unit} value={unit}>{unit}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </TableCell>
                      <TableCell>
                        <FormField
                          control={form.control}
                          name={`variants.${index}.packing_type`}
                          render={({ field }) => (
                            <FormItem>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select packing type" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {packingTypeEnum.options.map((type) => (
                                    <SelectItem key={type} value={type}>{type}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </TableCell>
                      <TableCell>
                        <FormField
                          control={form.control}
                          name={`variants.${index}.form_type`}
                          render={({ field }) => (
                            <FormItem>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select form type" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {formTypeEnum.options.map((type) => (
                                    <SelectItem key={type} value={type}>{type}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </TableCell>
                      <TableCell>
                        <Button type="button" variant="destructive" size="sm" onClick={() => remove(index)}>
                          Remove
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Button type="button" onClick={() => append({ sku: "", price: 0, weight_value: 0, weight_unit: "grams", packing_type: "box", form_type: "powder" })}>
                Add Variant Row
              </Button>
            </div>

            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
