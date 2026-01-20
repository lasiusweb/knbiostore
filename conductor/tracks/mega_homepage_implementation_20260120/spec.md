# SPECIFICATION: MEGA HOMEPAGE IMPLEMENTATION (CMS-READY)

## OVERVIEW
Implement a comprehensive, dynamic, and professional homepage for KN Biosciences. The page will be "CMS-Ready," meaning all content—from the hero slider to the brand story—will be rendered from a structured data model.

## FUNCTIONAL REQUIREMENTS

### 1. CMS-DRIVEN CONTENT ARCHITECTURE
- **MOCK CMS LAYER:** `src/data/mock-home.ts` must include data for all new "Shop By" categories.
- **DYNAMIC SECTIONS:** All grids (Segment, Crop, Problem) must be rendered dynamically.

### 2. HEADER & NAVIGATION
- **TOP COUPON BANNER:** Persistent, high-visibility banner.
- **NAVIGATION:** Include the existing `<Navbar />` component at the very top.

### 3. HERO SECTION (DYNAMIC)
- **COMPONENT:** Shadcn UI Carousel highlighting innovation and products.

### 4. CATEGORY BROWSING (NEW)
- **SHOP BY SEGMENT:**
  - **Layout:** 3-Column Grid.
  - **Items:** Agriculture, Aquaculture, Poultry Healthcare, Animal Healthcare, Bioremediation, Seeds, Organic Farming, Farm Equipment, Testing Lab, Oilpalm.
- **SHOP BY CROP:**
  - **Layout:** 5-Column Grid.
  - **Items:** Paddy, Mango, Banana, Chilli, Cotton, Coffee, Tea, Papaya, Pomegranate, Turmeric.
- **SHOP BY PROBLEM:**
  - **Title:** "Solve Common Problems".
  - **Layout:** 3-Column Grid.
  - **Items:** Thrips, Mites, White Flys, Green Flys, White Grubs, Nutrients Deficiency.
- **FARMING SEGMENT (CHAMPIONS):**
  - **Title:** "For Champions".
  - **Layout:** 4-Column Grid.
  - **Items:** For Crop Champions, For Pond Champions, For Poultry Pros, Organic Newbies.

### 5. THE KN BIOSCIENCES STORY & VALUE PROP
- **BRAND JOURNEY:** The "Since 1997" story and Sudha Reddy spotlight (as defined previously).
- **VALUE PROP:** Text block "Why Choose KNBioStore? We provide certified organic solutions..."

### 6. ENGAGEMENT
- **FLOATING FEEDBACK BUTTON:** Global button in layout.
- **NEWSLETTER SIGNUP:** Action-oriented subscription section.

### 7. FOOTER
- **COLUMNS:** 'Customer Care', 'Quick Links', 'Contact Info'.
- **COPYRIGHT:** Text at the bottom.

## NON-FUNCTIONAL REQUIREMENTS
- **STYLING:** Tailwind CSS + Shadcn UI.
- **RESPONSIVENESS:** Grids must adapt to mobile (e.g., 3-col becomes 1-col).

## ACCEPTANCE CRITERIA
- [ ] "Shop By Segment" displays exactly the 10 listed items in a grid.
- [ ] "Shop By Crop" displays the 10 crops in a 5-column grid.
- [ ] "Shop By Problem" displays the 6 pest/nutrient issues.
- [ ] "For Champions" section links to specific customer personas.
- [ ] All data is sourced from `mock-home.ts`.
