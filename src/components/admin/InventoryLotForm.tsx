"use client";

import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { createClient } from '@/lib/supabase/client';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const inventoryLotSchema = z.object({
  variant_id: z.string().min(1, "Variant is required"),
  lot_number: z.string().min(1, "Lot number is required"),
  manufacture_date: z.date({
    required_error: "Manufacture date is required",
  }),
  expiry_date: z.date({
    required_error: "Expiry date is required",
  }),
  initial_quantity: z.coerce.number().min(1, "Initial quantity must be at least 1"),
  warehouse_location: z.string().min(1, "Warehouse location is required"),
});

type InventoryLotFormValues = z.infer<typeof inventoryLotSchema>;

const InventoryLotForm = () => {
  const [variants, setVariants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<InventoryLotFormValues>({
    resolver: zodResolver(inventoryLotSchema),
    defaultValues: {
      variant_id: "",
      lot_number: "",
      initial_quantity: 0,
      warehouse_location: "",
    },
  });

  useEffect(() => {
    const fetchVariants = async () => {
      try {
        const supabase = createClient();
        const { data, error: fetchError } = await supabase
          .from('product_variants')
          .select('*, products(name)');

        if (fetchError) throw fetchError;
        setVariants(data || []);
      } catch (err: any) {
        console.error('Error fetching variants:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVariants();
  }, []);

  async function onSubmit(values: InventoryLotFormValues) {
    console.log(values);
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Add New Inventory Lot</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="variant_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Variant</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a variant" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {variants.map((variant) => (
                        <SelectItem key={variant.id} value={variant.id}>
                          {variant.products?.name} - {variant.sku}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lot_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lot Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter lot number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="initial_quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Initial Quantity</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Enter initial quantity" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="warehouse_location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Warehouse Location</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter warehouse location" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={loading}>
              {loading ? "Loading..." : "Submit"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default InventoryLotForm;
