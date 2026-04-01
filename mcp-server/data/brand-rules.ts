export const brandIdentity = {
  product: "Sellsuki — E-commerce management platform for Thai merchants",
  personality: "Professional yet approachable, clean, trustworthy, efficient",
  mood: "Light, airy, functional — prioritizes clarity over decoration",
  fontCharacter: "DB HeaventRounded gives a soft, friendly, Thai-first feel — rounded terminals create warmth without sacrificing readability",
};

export const doRules = [
  'Always import CSS first: import "@uxuissk/design-system/styles.css"',
  "Use DS components — never create custom buttons, inputs, modals when DS has them",
  "Use semantic color tokens — bg-primary, text-secondary, not raw hex",
  "Use DB HeaventRounded for ALL text — headings, body, labels, buttons, badges, nav, table — NEVER use Inter",
  "Use radius-md (8px) as default border-radius for components",
  "Use elevation-sm sparingly — prefer flat design with borders",
  'Use Sky-500 (#32a9ff) as the primary action color',
  'Use Gray-800 (#1f2937) as primary text color',
  'Use Gray-500 (#6b7280) as secondary/muted text color',
  'Size "md" is the default for all components unless specified',
  "Support dark mode — always use CSS variables, never hardcode colors",
  "Always handle loading (Skeleton/Spinner), empty (EmptyState), and error (Alert) states",
];

export const dontRules = [
  "Don't use colors outside the defined palette — stick to Sky/Gray/Rose/Emerald/Amber/Orange",
  "Don't use heavy shadows — only elevation-sm exists",
  "Don't use bold decorative fonts — DB HeaventRounded is already rounded and friendly",
  "Don't hardcode hex values — always reference tokens",
  "Don't create custom form components — use DSInput, DSTextarea, Dropdown, DSCheckbox, etc.",
  "Don't use more than 1 primary button per view — rest use secondary/outline/ghost",
  "Don't skip loading/empty/error states — use Skeleton, EmptyState, Alert",
];

export const layoutPatterns = {
  "Page padding (desktop)": "24px (Spacing-5xl)",
  "Page padding (mobile)": "16px (Spacing-3xl)",
  "Card gap": "16px between cards",
  "Form field gap": "16px (Spacing-3xl) between fields",
  "Section gap": "32px (Spacing-6xl) between sections",
};

export const buttonSystem = {
  variants: [
    { variant: "primary", bg: "Sky-500", border: "Sky-500", text: "White", hover: "Sky-600" },
    { variant: "secondary", bg: "—", border: "—", text: "Gray-500", hover: "—" },
    { variant: "outline", bg: "transparent", border: "Sky-500", text: "Sky-500", hover: "border→Sky-600" },
    { variant: "ghost", bg: "transparent", border: "none", text: "Sky-500", hover: "text→Sky-600" },
    { variant: "destructive", bg: "Rose-600", border: "Rose-600", text: "White", hover: "Rose-700" },
    { variant: "link", bg: "transparent", border: "none", text: "Sky-500", hover: "—" },
    { variant: "solid_light", bg: "White", border: "Gray-200", text: "Gray-800", hover: "border→Gray-300" },
  ],
  sizes: [
    { size: "sm", height: "32px" },
    { size: "md", height: "36px" },
    { size: "lg", height: "40px" },
    { size: "xl", height: "44px" },
  ],
};

export const quickStartTemplate = `// 1. Import CSS (once at root)
import "@uxuissk/design-system/styles.css";

// 2. Import components
import {
  DSButton,
  DSInput,
  DSTable,
  Card, CardHeader, CardBody, CardFooter,
  Badge,
  Modal,
  Alert,
  toast, ToastContainer,
  Dropdown,
  Tabs,
  Pagination,
  Avatar,
  Sidebar,
  TopNavbar,
} from "@uxuissk/design-system";

// 3. Use in your component
function MyPage() {
  return (
    <div>
      <TopNavbar brand={{ name: "Sellsuki", logo: "/logo.svg" }} />
      <div style={{ display: "flex" }}>
        <Sidebar groups={[...]} />
        <main style={{ padding: "24px", flex: 1 }}>
          <Card>
            <CardHeader>Order Management</CardHeader>
            <CardBody>
              <DSInput label="Search orders" inputSize="md" leftIcon={<SearchIcon />} />
              <DSTable columns={[...]} data={[...]} hoverable striped />
            </CardBody>
            <CardFooter>
              <Pagination currentPage={1} totalPages={10} onPageChange={() => {}} />
            </CardFooter>
          </Card>
        </main>
      </div>
      <ToastContainer />
    </div>
  );
}`;

export const resources = {
  npm: "npm install @uxuissk/design-system",
  storybook: "https://sellsukidesignsystemv12.vercel.app",
  preview: "https://sellsukidesignsystemv12-2bee.vercel.app",
  figma: "https://www.figma.com/design/GhT0HmOM9vlRZ8hWVZyhm7/Design-System-Components",
};
