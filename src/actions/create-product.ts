"use server"

import { ProductFormValues } from "@/components/admin/AdminProductForm";

export async function createProduct(values: ProductFormValues) {
  console.log("Simulating product creation with:", values);
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return { success: true, message: "Product created successfully!" };
}