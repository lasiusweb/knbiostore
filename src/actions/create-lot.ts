"use server"

export async function createLot(values: any) {
  console.log("Simulating lot creation with:", values);
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  
  // Basic validation or error simulation could go here
  if (!values.lot_number) {
    return { success: false, message: "Lot number is required." };
  }

  return { success: true, message: "Inventory lot created successfully!" };
}
