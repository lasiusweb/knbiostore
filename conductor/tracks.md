# Project Tracks

This file tracks all major tracks for the project. Each track has its own detailed plan in its respective folder.

---

- [x] **Track: Create a Server Component at src/components/admin/AdminProductList.tsx.Logic:Import createClient from @/lib/supabase/client. Fetch data from the products table.Crucial: Use a Left Join to fetch the related product_variants. Supabase Syntax: .select('*, product_variants(*)')Map through the products and display them in a Shadcn Table.Columns in the Table:Product Name, SKU (List the first variant's SKU for simplicity), Price (List the first variant's price in INR), Tags,Description, Handle the loading state if data is empty.**
*Link: [./tracks/admin_product_list_20260117/](./tracks/admin_product_list_20260117/)*

---

- [x] **Track: Create a Client Component src/components/admin/InventoryLotForm.tsx. Logic:On load, use createClient from @/lib/supabase/client to fetch all product_variants and their related products name.Query: select('*, products(name)'), Populate a Shadcn Select dropdown with the Variants. Format the label as: "Product Name - SKU".Form Fields:variant_id (The Select dropdown above), lot_number (Input Text),manufacture_date (Input Date),expiry_date (Input Date),initial_quantity (Input Number), warehouse_location (Input Text), Validation:Ensure Lot Number is unique (check locally if possible, otherwise rely on DB error).Ensure expiry_date is after manufacture_date.Use react-hook-form and zod for validation.**
*Link: [./tracks/inventory_lot_form_20260117/](./tracks/inventory_lot_form_20260117/)*

---

- [x] **Track: We need a component that calculates "Days Remaining" based on the expiry_date in the database.Create a Server Component src/components/admin/ExpiryMonitor.tsx. Logic:Import createClient from @/lib/supabase/client. Calculate the date 30 days from now.Query inventory_lots where:expiry_date is between NOW() and NOW() + 30 days. status is 'available'. Join with product_variants and products to get sku, product name, and packing type.Display:Render a Shadcn Table.Columns: Product Name, SKU, Lot Number, Expiry Date, Available Qty.Calculated Column: 'Days Left'. (e.g., (Expiry - Today)).Color Logic:If Days Left < 7: Render a Red Badge.If Days Left < 15: Render a Yellow Badge.Else: Green/Blue Badge.Handle empty states (e.g., 'No items expiring soon').**
*Link: [./tracks/expiry_monitor_20260117/](./tracks/expiry_monitor_20260117/)*

---

- [x] **Track: We need a file that tells the phone: "When I store data, put it in these boxes."Create a file lib/db.ts. Logic:Import Dexie from 'dexie'. Define a class KnBioStoreDB extending Dexie.Call super('knbiostore_pos'). Define the tables using .stores():products: 'id, name, is_active', inventory_lots: 'id, lot_number, expiry_date, available_quantity, variant_id', Export an instance: export const db = new KnBioStoreDB().**
*Link: [./tracks/local_indexeddb_20260117/](./tracks/local_indexeddb_20260117/)*

---

- [x] **Track: Offline Sync Hook (useOfflineSync). Create a hook hooks/useOfflineSync.ts to implement a mechanism for downloading critical data from Supabase and saving it into the local IndexedDB.**
*Link: [./tracks/offline_sync_hook_20260117/](./tracks/offline_sync_hook_20260117/)*

---

- [x] **Track: Generate the Interface. This needs to use useOfflineSync and query db."Create a Client Component components/pos/POSInterface.tsx. Logic:Call useOfflineSync to ensure data is fresh.Use useLiveQuery (from dexie-react-hooks) to watch the inventory_lots table. Example: const lots = useLiveQuery(() => db.inventory_lots.toArray()), Display a list of lots in a Grid layout (Cards). For each lot, show: Lot Number,Expiry Date, Quantity. Add a button 'Add to Cart' to each card.Styling: Use Tailwind for a mobile-friendly look (cards with shadows).**
*Link: [./tracks/pos_interface_20260117/](./tracks/pos_interface_20260117/)*

---

- [x] **Track: We need to add logic to select items and total up the price."Update src/components/pos/POSInterface.tsx. Add State:cart: An array of objects (id, lot_number, quantity, price). showCart: Boolean to toggle the cart view.Functions:addToCart(lot): Check if lot is already in cart. If yes, increment quantity. If no, add new entry. removeFromCart(id): Remove item.calculateTotal(): Sum of (price * quantity). UI Update:Keep the Product Grid. Add a floating "Cart" button (or fixed sidebar) showing number of items.When the button is clicked, show a list of selected items and a 'Checkout' button."**
*Link: [./tracks/pos_cart_logic_ui_20260117/](./tracks/pos_cart_logic_ui_20260117/)*

---

- [x] **Track: When "Checkout" is clicked, we must save this to db.orders so it persists even if the app crashes or they close the browser.We need to update the Dexie Schema to store orders."Update lib/db.ts.Add a new table to the stores definition:orders: 'id, created_at, status, total_amount'."**
*Link: [./tracks/offline_pos_order_persistence_20260117/](./tracks/offline_pos_order_persistence_20260117/)*

---

- [x] **Track: Now we need the logic that runs when "Checkout" is clicked."In src/components/pos/POSInterface.tsx, update the handleCheckout function.Logic: Generate a random UUID for the order ID (use crypto.randomUUID()). Create an order object:id: UUID , created_at: new Date(), status: 'PENDING_SYNC', total_amount: Calculated total from cart, items: The current cart array, Save this to db.orders using await db.orders.add(orderObject)., Alert 'Order Saved Locally' and clear the cart."**
*Link: [./tracks/pos_checkout_logic_20260117/](./tracks/pos_checkout_logic_20260117/)*

---

- [x] **Track: We need a menu so users can switch between the Store, Admin, and POS. "Create a Client Component src/components/layout/Navbar.tsx. Design:A simple fixed header at the top with a white background and shadow.Logo on the left (text: 'KnBioStore').Navigation links on the right: 'Store', 'POS', 'Admin'.Use Shadcn Button (ghost variant) for links.Links should use Next.js Link component to route to /store, /pos, and /admin/products."**
*Link: [./tracks/global_navbar_component_20260117/](./tracks/global_navbar_component_20260117/)*

---

- [x] **Track: Update Navbar to show Login/Logout.We need to update the Navbar so it shows a "Login" button if they are a guest, and their "Email" and a "Logout" button if they are logged in.**

*Link: [./tracks/update_navbar_auth_20260117/](./tracks/update_navbar_auth_20260117/)*

---

- [x] **Track: Update the Navbar (The Mega Menu). We need to replace the simple navbar with one that handles your complex hierarchy.**

*Link: [./tracks/global_navbar_mega_menu_20260118/](./tracks/global_navbar_mega_menu_20260118/)*

---

- [x] **Track: Implement a comprehensive, dynamic, and professional homepage for KN Biosciences (CMS-Ready).**
*Link: [./tracks/mega_homepage_implementation_20260120/](./tracks/mega_homepage_implementation_20260120/)*

---

- [x] **Track: Generate JSON-LD schema markup for the Mega Homepage.**
*Link: [./tracks/homepage_schema_markup_20260120/](./tracks/homepage_schema_markup_20260120/)*

---

- [x] **Track: Generate the Store Product List Component. This component will fetch data from Supabase and display it in a customer-friendly grid.Create a Server Component src/components/store/StoreProductList.tsx. Logic:1. Import createClient from @/lib/supabase/client. 2. Fetch data:Query products table. Join with product_variants to get the price and SKU. Syntax: .select('*, product_variants(*)'). 3. Display a responsive Grid (CSS Grid: grid-cols-1 md:grid-cols-3 gap-6). Card Design (for each product):Create a Card component (Shadcn) for each product. Header: Product Name.Image: Use a placeholder div (gray box 300px height) with text 'Image Upload Coming Soon'.Body: Description text.Footer: Display the price of the first variant (e.g., 'Starting from ₹50'). Add a 'View Details' button.**
*Link: [./tracks/store_product_list_component_20260117/](./tracks/store_product_list_component_20260117/)*

---

- [x] **Track: Fix Runtime TypeError in Carousel Component: api.canScrollPrev is not a function**
*Link: [./tracks/fix_carousel_typeerror_20260122/](./tracks/fix_carousel_typeerror_20260122/)*

---

- [ ] **Track: application experiencing slow page load, add skeleton effect**
*Link: [./tracks/skeleton_loaders_20260122/](./tracks/skeleton_loaders_20260122/)*