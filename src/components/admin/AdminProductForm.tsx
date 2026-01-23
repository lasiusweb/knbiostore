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

// Enterprise Components
import { ProductFAQManager } from "./ProductFAQManager"
import { Separator } from "@/components/ui/separator"
import { Sprout, ShieldCheck, HelpCircle } from "lucide-react"

const weightUnitEnum = z.enum(["grams", "kilograms", "milliliter", "liter"])
const packingTypeEnum = z.enum(["box", "bottle", "bucket", "pouch", "tin", "drum", "woven sack bag", "plastic container"])
const formTypeEnum = z.enum(["powder", "liquid", "granules"])

const agriAttributesSchema = z.object({
  microbialCount: z.string().optional(),
  solubility: z.string().optional(),
  soilPHRange: z.string().optional(),
  applicationCoverage: z.string().optional(),
})

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
  agriAttributes: agriAttributesSchema.optional(),
})

export type ProductFormValues = z.infer<typeof productFormSchema>

export function AdminProductForm() {
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: "",
      description: "",
      variants: [{ sku: "", price: 0, weight_value: 0, weight_unit: "grams", packing_type: "box", form_type: "powder" }],
      agriAttributes: {
        microbialCount: "",
        solubility: "",
        soilPHRange: "",
        applicationCoverage: ""
      }
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
    <div className="space-y-8">
      <Card className="w-full border-border/50 shadow-sm">
        <CardHeader className="bg-muted/20 border-b">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <Sprout className="w-5 h-5" />
            </div>
            <div>
              <CardTitle className="text-xl font-black uppercase tracking-tight">Standard SKU Details</CardTitle>
              <CardDescription>Core product identifiers and pricing</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Product Title</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Rhizobium VAM" className="h-11 font-bold" {...field} />
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
                      <FormLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Short Description</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter core benefit or use case" className="h-11" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Separator />

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-black uppercase tracking-widest">SKU Variants & Packaging</h3>
                  <Button type="button" size="sm" variant="outline" className="h-8 font-black text-[10px] uppercase border-dashed" onClick={() => append({ sku: "", price: 0, weight_value: 0, weight_unit: "grams", packing_type: "box", form_type: "powder" })}>
                    Add Variant Row
                  </Button>
                </div>
                <Table className="border rounded-xl">
                  <TableHeader className="bg-muted/30">
                    <TableRow>
                      <TableHead className="text-[9px] font-black uppercase">SKU Code</TableHead>
                      <TableHead className="text-[9px] font-black uppercase text-right">MSRP (₹)</TableHead>
                      <TableHead className="text-[9px] font-black uppercase text-right">Net Wt</TableHead>
                      <TableHead className="text-[9px] font-black uppercase text-center">Unit</TableHead>
                      <TableHead className="text-[9px] font-black uppercase">Packaging</TableHead>
                      <TableHead className="text-[9px] font-black uppercase">Form</TableHead>
                      <TableHead className="text-right"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {fields.map((field, index) => (
                      <TableRow key={field.id} className="group transition-colors">
                        <TableCell>
                          <FormField
                            control={form.control}
                            name={`variants.${index}.sku`}
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input {...field} className="h-9 font-mono text-[11px]" />
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
                                  <Input type="number" {...field} className="h-9 text-right font-black text-primary" />
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
                                  <Input type="number" {...field} className="h-9 text-right font-bold" />
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
                                    <SelectTrigger className="h-9 text-[10px] uppercase font-bold">
                                      <SelectValue placeholder="Unit" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {weightUnitEnum.options.map((unit) => (
                                      <SelectItem key={unit} value={unit} className="text-[10px] uppercase font-bold">{unit}</SelectItem>
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
                                    <SelectTrigger className="h-9 text-[10px] uppercase font-bold">
                                      <SelectValue placeholder="Type" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {packingTypeEnum.options.map((type) => (
                                      <SelectItem key={type} value={type} className="text-[10px] uppercase font-bold">{type}</SelectItem>
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
                                    <SelectTrigger className="h-9 text-[10px] uppercase font-bold">
                                      <SelectValue placeholder="Form" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {formTypeEnum.options.map((type) => (
                                      <SelectItem key={type} value={type} className="text-[10px] uppercase font-bold">{type}</SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </TableCell>
                        <TableCell className="text-right">
                          <Button type="button" variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => remove(index)}>
                            <TrashIcon className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <Separator />

              {/* Enterprise Agri-Science Fields */}
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-primary" />
                  <h3 className="text-sm font-black uppercase tracking-widest italic outline-none border-0">Enterprise Bio-Science Attributes</h3>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <FormField
                    control={form.control}
                    name="agriAttributes.microbialCount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[9px] font-black uppercase tracking-tighter text-muted-foreground">Microbial Count (CFU)</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. 1x10^9" className="h-10 bg-primary/5 border-primary/20 text-xs font-bold" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="agriAttributes.solubility"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[9px] font-black uppercase tracking-tighter text-muted-foreground">Water Solubility (%)</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. 99.9%" className="h-10 bg-primary/5 border-primary/20 text-xs font-bold" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="agriAttributes.soilPHRange"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[9px] font-black uppercase tracking-tighter text-muted-foreground">Soil pH Range</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. 6.5 - 7.5" className="h-10 bg-primary/5 border-primary/20 text-xs font-bold" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="agriAttributes.applicationCoverage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[9px] font-black uppercase tracking-tighter text-muted-foreground">Application Coverage</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. 1kg per Acre" className="h-10 bg-primary/5 border-primary/20 text-xs font-bold" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="pt-8 border-t flex justify-end">
                <Button type="submit" className="h-12 px-12 gradient-primary border-0 text-white font-black uppercase tracking-widest shadow-lg transition-all hover:scale-105">
                  Publish Enterprise SKU
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Technical FAQ Manager Integration */}
      <ProductFAQManager productId="NEW" />
    </div>
  )
}

function TrashIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
}
