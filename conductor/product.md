# Product Definition

## 1. Unified Multi-Channel Sales
To provide a single platform that handles three distinct business models, with the B2C Storefront now functional:
*   **B2B Portal:** For distributors to purchase bulk agricultural microbes at wholesale prices with an approval workflow.
*   **B2C Storefront:** For individual farmers to buy retail quantities online.
*   **Offline Mobile POS:** A web-based app for warehouse staff to manage manual orders and inventory on the floor, specifically designed to work without internet connectivity.

## 2. Precision Inventory & Product Management
To manage the complex lifecycle of biological products:
*   **Variant System:** Handle specific product attributes like Weight (g/kg/ml), Packing (Box/Drum/Bag), and Form (Powder/Liquid/Granules) with specific pricing per variant.
*   **Admin Product Management:** Enabled product creation and variant management through a dedicated admin interface.
    *   Includes a comprehensive list view of all products with variant and tag details.
*   **Batch Tracking:** Track inventory down to the Lot Number and Expiry Date.
*   **Traceability:** Ensure every sale links back to the specific manufactured batch for quality control and regulatory compliance.

## 3. Automated Operations (Zoho & Logistics)
To eliminate manual data entry and errors:
*   **Zoho CRM Integration:** Automatically sync new registrations and allow admins to view customer history (notes/tasks) directly inside the knbiostore Admin Dashboard.
*   **Zoho Books Integration:** Automatically push approved orders as Invoices to Zoho Books for accounting.
*   **Hybrid Shipping:** Automate shipping via Delhivery API while supporting manual tracking for regional carriers (VRL, Navata, Kranti).

## 4. Modern Discovery (SEO & AEO)
To ensure products and expertise are discoverable by modern search engines and AI:
*   **SEO:** Optimize product pages for search rankings using Next.js Server-Side Rendering.
*   **AEO (Answer Engine Optimization):** Implement a CMS that structures content (FAQs, How-To guides) so AI engines can easily parse and answer questions about your microbes.

## 5. Technical Scalability & Security
To build a robust foundation for future growth:
*   **Headless Architecture:** Decouple the frontend (Next.js) from the backend (Supabase) for maximum design flexibility.
*   **Security:** Implement secure OTP authentication (Twilio) and PCI-compliant payments (Easebuzz).
