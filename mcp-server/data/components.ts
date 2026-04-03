export interface ComponentProp {
  name: string;
  type: string;
  default?: string;
  description: string;
}

export interface ComponentInfo {
  name: string;
  displayName: string;
  category: "form" | "display" | "navigation" | "feedback" | "layout";
  description: string;
  imports: string[];
  props: ComponentProp[];
  example: string;
}

export const components: Record<string, ComponentInfo> = {
  DSButton: {
    name: "DSButton",
    displayName: "Button",
    category: "form",
    description: "Primary action button with 6 variants, 4 sizes, loading state, icons",
    imports: ["DSButton", "IconButton", "ButtonGroup"],
    props: [
      { name: "variant", type: '"primary" | "secondary" | "outline" | "ghost" | "destructive" | "link"', default: '"primary"', description: "Visual style variant" },
      { name: "size", type: '"sm" | "md" | "lg" | "xl"', default: '"md"', description: "Button size" },
      { name: "loading", type: "boolean", default: "false", description: "Show loading spinner" },
      { name: "loadingText", type: "string", description: "Text shown during loading" },
      { name: "leftIcon", type: "ReactNode", description: "Icon before text" },
      { name: "rightIcon", type: "ReactNode", description: "Icon after text" },
      { name: "fullWidth", type: "boolean", default: "false", description: "Full width button" },
      { name: "active", type: "boolean", default: "false", description: "Active/pressed state" },
      { name: "disabled", type: "boolean", default: "false", description: "Disabled state" },
    ],
    example: `<DSButton variant="primary" size="md" leftIcon={<Plus size={16} />}>
  Create Order
</DSButton>

<DSButton variant="outline" loading loadingText="Saving...">
  Save
</DSButton>

<ButtonGroup>
  <DSButton variant="outline">Cancel</DSButton>
  <DSButton variant="primary">Confirm</DSButton>
</ButtonGroup>`,
  },

  DSInput: {
    name: "DSInput",
    displayName: "Input",
    category: "form",
    description: "Text input with 4 variants, 3 sizes, validation states, prefix/suffix, clearable, password toggle",
    imports: ["DSInput", "DSTextarea"],
    props: [
      { name: "label", type: "string", description: "Input label" },
      { name: "inputSize", type: '"sm" | "md" | "lg"', default: '"md"', description: "Input size" },
      { name: "variant", type: '"default" | "outlined" | "filled" | "ghost"', default: '"default"', description: "Visual variant" },
      { name: "state", type: '"default" | "error" | "success" | "warning"', default: '"default"', description: "Validation state" },
      { name: "errorMessage", type: "string", description: "Error message text" },
      { name: "successMessage", type: "string", description: "Success message text" },
      { name: "helperText", type: "string", description: "Helper text below input" },
      { name: "leftIcon", type: "ReactNode", description: "Icon inside left" },
      { name: "rightIcon", type: "ReactNode", description: "Icon inside right" },
      { name: "prefix", type: "string", description: "Text prefix (e.g. https://)" },
      { name: "suffix", type: "string", description: "Text suffix (e.g. .com)" },
      { name: "clearable", type: "boolean", default: "false", description: "Show clear button" },
      { name: "showPasswordToggle", type: "boolean", default: "false", description: "Password visibility toggle" },
      { name: "fullWidth", type: "boolean", default: "false", description: "Full width" },
      { name: "required", type: "boolean", default: "false", description: "Required field" },
    ],
    example: `<DSInput
  label="Email"
  helperText="We'll never share your email"
  inputSize="md"
  leftIcon={<Mail size={16} />}
  clearable
  required
/>

<DSInput
  label="Password"
  type="password"
  showPasswordToggle
  state="error"
  errorMessage="Password must be at least 8 characters"
/>

<DSTextarea
  label="Description"
  maxLength={500}
  rows={4}
/>`,
  },

  DSCheckbox: {
    name: "DSCheckbox",
    displayName: "Checkbox",
    category: "form",
    description: "Checkbox with 3 sizes, indeterminate state, disabled, error display, and CheckboxGroup",
    imports: ["DSCheckbox", "CheckboxGroup"],
    props: [
      { name: "label", type: "string", description: "Checkbox label" },
      { name: "checked", type: "boolean", description: "Controlled checked state" },
      { name: "indeterminate", type: "boolean", default: "false", description: "Indeterminate state" },
      { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Checkbox size" },
      { name: "disabled", type: "boolean", default: "false", description: "Disabled state" },
      { name: "error", type: "string", description: "Error message" },
      { name: "onChange", type: "(checked: boolean) => void", description: "Change handler" },
    ],
    example: `<DSCheckbox label="Accept terms" size="md" />

<CheckboxGroup label="Permissions" layout="vertical">
  <DSCheckbox label="Read" />
  <DSCheckbox label="Write" />
  <DSCheckbox label="Admin" />
</CheckboxGroup>`,
  },

  DSRadio: {
    name: "DSRadio",
    displayName: "Radio",
    category: "form",
    description: "Radio button with 3 sizes, RadioGroup with horizontal/vertical layout",
    imports: ["DSRadio", "RadioGroup"],
    props: [
      { name: "label", type: "string", description: "Radio label" },
      { name: "value", type: "string", description: "Radio value" },
      { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Radio size" },
      { name: "disabled", type: "boolean", default: "false", description: "Disabled state" },
    ],
    example: `<RadioGroup value={selected} onChange={setSelected} label="Payment Method">
  <DSRadio value="credit" label="Credit Card" />
  <DSRadio value="bank" label="Bank Transfer" />
  <DSRadio value="cod" label="Cash on Delivery" />
</RadioGroup>`,
  },

  Switch: {
    name: "Switch",
    displayName: "Switch",
    category: "form",
    description: "Toggle switch with 3 sizes, 4 colors, description text",
    imports: ["Switch"],
    props: [
      { name: "checked", type: "boolean", description: "Controlled checked state" },
      { name: "onChange", type: "(checked: boolean) => void", description: "Change handler" },
      { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Switch size" },
      { name: "color", type: '"primary" | "success" | "warning" | "danger"', default: '"primary"', description: "Track color when on" },
      { name: "label", type: "string", description: "Label text" },
      { name: "description", type: "string", description: "Helper description" },
      { name: "disabled", type: "boolean", default: "false", description: "Disabled state" },
    ],
    example: `<Switch
  label="Dark Mode"
  description="Toggle dark theme"
  checked={darkMode}
  onChange={setDarkMode}
  color="primary"
/>`,
  },

  DatePicker: {
    name: "DatePicker",
    displayName: "DatePicker",
    category: "form",
    description: "Full-featured date picker with single/range modes, time picker, month/year selection",
    imports: ["DatePicker"],
    props: [
      { name: "value", type: "Date | null", description: "Selected date" },
      { name: "onChange", type: "(date: Date | null) => void", description: "Date change handler" },
      { name: "mode", type: '"single" | "range"', default: '"single"', description: "Selection mode" },
      { name: "showTime", type: "boolean", default: "false", description: "Include time picker" },
      { name: "minDate", type: "Date", description: "Minimum selectable date" },
      { name: "maxDate", type: "Date", description: "Maximum selectable date" },
      { name: "placeholder", type: "string", description: "Placeholder text" },
      { name: "disabled", type: "boolean", default: "false", description: "Disabled state" },
    ],
    example: `<DatePicker
  value={date}
  onChange={setDate}
  placeholder="Select date"
/>

<DatePicker
  mode="range"
  showTime
  value={dateRange}
  onChange={setDateRange}
/>`,
  },

  SearchField: {
    name: "SearchField",
    displayName: "Search",
    category: "form",
    description: "Search input with suggestions dropdown, keyboard navigation, debounce",
    imports: ["SearchField"],
    props: [
      { name: "value", type: "string", description: "Search value" },
      { name: "onChange", type: "(value: string) => void", description: "Value change handler" },
      { name: "suggestions", type: "string[]", description: "Suggestion list" },
      { name: "onSelect", type: "(suggestion: string) => void", description: "Suggestion select handler" },
      { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Input size" },
      { name: "variant", type: '"default" | "filled" | "ghost"', default: '"default"', description: "Visual variant" },
      { name: "loading", type: "boolean", default: "false", description: "Loading state" },
      { name: "clearable", type: "boolean", default: "true", description: "Show clear button" },
    ],
    example: `<SearchField
  value={query}
  onChange={setQuery}
  suggestions={filteredItems}
  onSelect={handleSelect}
  placeholder="Search products..."
/>`,
  },

  Dropdown: {
    name: "Dropdown",
    displayName: "Dropdown / Select",
    category: "form",
    description: "Select/multi-select dropdown with search, create new, option groups",
    imports: ["Dropdown"],
    props: [
      { name: "options", type: "DropdownOption[]", description: "Options list" },
      { name: "value", type: "string | string[]", description: "Selected value(s)" },
      { name: "onChange", type: "(value: string | string[]) => void", description: "Change handler" },
      { name: "multiple", type: "boolean", default: "false", description: "Multi-select mode" },
      { name: "searchable", type: "boolean", default: "false", description: "Enable search" },
      { name: "creatable", type: "boolean", default: "false", description: "Allow creating new options" },
      { name: "label", type: "string", description: "Label text" },
      { name: "placeholder", type: "string", description: "Placeholder text" },
      { name: "disabled", type: "boolean", default: "false", description: "Disabled state" },
    ],
    example: `<Dropdown
  label="Category"
  options={[
    { value: "electronics", label: "Electronics" },
    { value: "clothing", label: "Clothing" },
    { value: "food", label: "Food & Beverage" },
  ]}
  value={category}
  onChange={setCategory}
  searchable
  placeholder="Select category"
/>`,
  },

  TagInput: {
    name: "TagInput",
    displayName: "Tag Input",
    category: "form",
    description: "Tag entry field with Enter to add, Backspace to remove, max tags",
    imports: ["TagInput"],
    props: [
      { name: "tags", type: "string[]", description: "Current tags" },
      { name: "onChange", type: "(tags: string[]) => void", description: "Tags change handler" },
      { name: "placeholder", type: "string", description: "Placeholder text" },
      { name: "maxTags", type: "number", description: "Maximum number of tags" },
      { name: "variant", type: '"default" | "outline" | "filled"', default: '"default"', description: "Visual variant" },
      { name: "disabled", type: "boolean", default: "false", description: "Disabled state" },
    ],
    example: `<TagInput
  tags={tags}
  onChange={setTags}
  placeholder="Add tag and press Enter"
  maxTags={5}
/>`,
  },

  ColorPicker: {
    name: "ColorPicker",
    displayName: "Color Picker",
    category: "form",
    description: "Color selection with presets, custom input, format switching",
    imports: ["ColorPicker"],
    props: [
      { name: "value", type: "string", description: "Selected color (hex)" },
      { name: "onChange", type: "(color: string) => void", description: "Color change handler" },
      { name: "presets", type: "string[]", description: "Preset color swatches" },
      { name: "showInput", type: "boolean", default: "true", description: "Show hex input" },
    ],
    example: `<ColorPicker
  value={color}
  onChange={setColor}
  presets={["#32a9ff", "#059669", "#e11d48", "#d97706", "#f97316"]}
/>`,
  },

  Rating: {
    name: "Rating",
    displayName: "Rating",
    category: "form",
    description: "Star/heart/thumb rating with 3 sizes, read-only mode",
    imports: ["Rating"],
    props: [
      { name: "value", type: "number", description: "Current rating" },
      { name: "onChange", type: "(value: number) => void", description: "Rating change handler" },
      { name: "max", type: "number", default: "5", description: "Maximum rating value" },
      { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Icon size" },
      { name: "icon", type: '"star" | "heart" | "thumb"', default: '"star"', description: "Rating icon type" },
      { name: "readOnly", type: "boolean", default: "false", description: "Read-only mode" },
    ],
    example: `<Rating value={4} onChange={setRating} max={5} icon="star" />`,
  },

  FileUpload: {
    name: "FileUpload",
    displayName: "File Upload",
    category: "form",
    description: "Dropzone, button, and avatar upload variants with preview",
    imports: ["FileUpload"],
    props: [
      { name: "variant", type: '"dropzone" | "button" | "avatar"', default: '"dropzone"', description: "Upload UI variant" },
      { name: "accept", type: "string", description: "Accepted file types (e.g. image/*)" },
      { name: "maxSize", type: "number", description: "Max file size in bytes" },
      { name: "multiple", type: "boolean", default: "false", description: "Allow multiple files" },
      { name: "onUpload", type: "(files: File[]) => void", description: "Upload handler" },
      { name: "disabled", type: "boolean", default: "false", description: "Disabled state" },
    ],
    example: `<FileUpload
  variant="dropzone"
  accept="image/*"
  maxSize={5 * 1024 * 1024}
  multiple
  onUpload={handleUpload}
/>`,
  },

  TransferList: {
    name: "TransferList",
    displayName: "Transfer List",
    category: "layout",
    description: "Dual-list transfer with search, select, move items between lists",
    imports: ["TransferList"],
    props: [
      { name: "sourceItems", type: "TransferItem[]", description: "Left list items" },
      { name: "targetItems", type: "TransferItem[]", description: "Right list items" },
      { name: "onChange", type: "(source: TransferItem[], target: TransferItem[]) => void", description: "Change handler" },
      { name: "sourceTitle", type: "string", default: '"Available"', description: "Left list title" },
      { name: "targetTitle", type: "string", default: '"Selected"', description: "Right list title" },
      { name: "searchable", type: "boolean", default: "false", description: "Enable search in lists" },
    ],
    example: `<TransferList
  sourceItems={available}
  targetItems={selected}
  onChange={(src, tgt) => { setAvailable(src); setSelected(tgt); }}
  sourceTitle="Available Roles"
  targetTitle="Assigned Roles"
  searchable
/>`,
  },

  DSTable: {
    name: "DSTable",
    displayName: "Table",
    category: "display",
    description: "Data table with column definitions, sorting, row selection, striped/bordered/hoverable",
    imports: ["DSTable"],
    props: [
      { name: "columns", type: "ColumnDef[]", description: "Column definitions" },
      { name: "data", type: "T[]", description: "Data rows" },
      { name: "sortable", type: "boolean", default: "false", description: "Enable column sorting" },
      { name: "selectable", type: "boolean", default: "false", description: "Enable row selection" },
      { name: "selectionMode", type: '"single" | "multi"', default: '"multi"', description: "Selection mode" },
      { name: "striped", type: "boolean", default: "false", description: "Striped rows" },
      { name: "bordered", type: "boolean", default: "false", description: "Bordered cells" },
      { name: "hoverable", type: "boolean", default: "true", description: "Hover effect on rows" },
      { name: "stickyHeader", type: "boolean", default: "false", description: "Sticky header" },
    ],
    example: `<DSTable
  columns={[
    { key: "name", header: "Name", sortable: true },
    { key: "price", header: "Price", sortable: true, render: (v) => \`฿\${v}\` },
    { key: "status", header: "Status", render: (v) => <Badge variant={v}>{v}</Badge> },
  ]}
  data={products}
  sortable
  selectable
  hoverable
  striped
/>
// ⚠️ Column field is "header" not "label"`,
  },

  Badge: {
    name: "Badge",
    displayName: "Badge",
    category: "display",
    description: "Status badge with 6 variants, 3 sizes, dot indicator, removable",
    imports: ["Badge"],
    props: [
      { name: "variant", type: '"default" | "secondary" | "outline" | "destructive" | "success" | "warning"', default: '"default"', description: "Badge variant" },
      { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Badge size" },
      { name: "dot", type: "boolean", default: "false", description: "Show dot indicator" },
      { name: "removable", type: "boolean", default: "false", description: "Show remove button" },
      { name: "onRemove", type: "() => void", description: "Remove handler" },
    ],
    example: `<Badge variant="success">Active</Badge>
<Badge variant="warning" dot>Pending</Badge>
<Badge variant="destructive" removable onRemove={handleRemove}>Error</Badge>`,
  },

  Tag: {
    name: "Tag",
    displayName: "Tag",
    category: "display",
    description: "Categorization tag with 6 colors, 3 sizes, optional icon and close button",
    imports: ["Tag"],
    props: [
      { name: "color", type: '"default" | "primary" | "success" | "warning" | "destructive" | "info"', default: '"default"', description: "Tag color" },
      { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Tag size" },
      { name: "icon", type: "ReactNode", description: "Leading icon" },
      { name: "closable", type: "boolean", default: "false", description: "Show close button" },
      { name: "onClose", type: "() => void", description: "Close handler" },
    ],
    example: `<Tag color="primary">Electronics</Tag>
<Tag color="success" closable onClose={handleClose}>In Stock</Tag>`,
  },

  Avatar: {
    name: "Avatar",
    displayName: "Avatar",
    category: "display",
    description: "User avatar with image, initials fallback, status indicator, and AvatarGroup",
    imports: ["Avatar", "AvatarGroup"],
    props: [
      { name: "src", type: "string", description: "Image URL" },
      { name: "name", type: "string", description: "Name for initials fallback" },
      { name: "size", type: '"xs" | "sm" | "md" | "lg" | "xl"', default: '"md"', description: "Avatar size" },
      { name: "status", type: '"online" | "offline" | "busy" | "away"', description: "Status indicator" },
    ],
    example: `<Avatar src="/user.jpg" name="John Doe" size="md" status="online" />

<AvatarGroup max={3}>
  <Avatar name="Alice" />
  <Avatar name="Bob" />
  <Avatar name="Charlie" />
  <Avatar name="Dave" />
</AvatarGroup>`,
  },

  Statistic: {
    name: "Statistic",
    displayName: "Statistic",
    category: "display",
    description: "Metric display with trend indicator (Statistic), and standalone stat card (StatCard)",
    imports: ["Statistic", "StatCard"],
    props: [
      { name: "title", type: "string", description: "Metric label/title" },
      { name: "value", type: "string | number", description: "Metric value" },
      { name: "trend", type: "{ direction: 'up' | 'down' | 'neutral', value: number }", description: "Trend object — value is a number, % sign added automatically" },
      { name: "trendLabel", type: "string", description: "Optional trend label text" },
      { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Display size" },
      { name: "icon", type: "ReactNode", description: "Leading icon" },
    ],
    example: `// Statistic — standalone metric display
<Statistic title="Revenue" value="฿125,400" trend={{ direction: "up", value: 8 }} />

// StatCard — card wrapper with same props as Statistic (not a wrapper, standalone)
<StatCard title="Total Orders" value={1284} trend={{ direction: "up", value: 12 }} trendLabel="vs last month" />`,
  },

  Timeline: {
    name: "Timeline",
    displayName: "Timeline",
    category: "display",
    description: "Event timeline with left/right/alternate layout, custom icons, status colors",
    imports: ["Timeline"],
    props: [
      { name: "items", type: "TimelineItem[]", description: "Timeline events" },
      { name: "layout", type: '"left" | "right" | "alternate"', default: '"left"', description: "Layout direction" },
      { name: "compact", type: "boolean", default: "false", description: "Compact mode" },
    ],
    example: `<Timeline
  items={[
    { title: "Order Placed", description: "Order #1234", time: "10:00 AM", status: "completed" },
    { title: "Payment Confirmed", description: "Via credit card", time: "10:05 AM", status: "completed" },
    { title: "Shipping", description: "In transit", time: "2:00 PM", status: "active" },
    { title: "Delivered", time: "", status: "pending" },
  ]}
/>`,
  },

  Tree: {
    name: "Tree",
    displayName: "Tree",
    category: "display",
    description: "Hierarchical tree view with expand/collapse, selection, connector lines",
    imports: ["Tree"],
    props: [
      { name: "data", type: "TreeNode[]", description: "Tree data" },
      { name: "selectable", type: "boolean", default: "false", description: "Enable selection" },
      { name: "showLines", type: "boolean", default: "false", description: "Show connector lines" },
      { name: "defaultExpanded", type: "string[]", description: "Initially expanded node IDs" },
      { name: "onSelect", type: "(node: TreeNode) => void", description: "Selection handler" },
    ],
    example: `<Tree
  data={[
    { id: "1", label: "Electronics", children: [
      { id: "1-1", label: "Phones" },
      { id: "1-2", label: "Laptops" },
    ]},
    { id: "2", label: "Clothing" },
  ]}
  selectable
  showLines
/>`,
  },

  Skeleton: {
    name: "Skeleton",
    displayName: "Skeleton",
    category: "display",
    description: "Loading placeholder with text, circular, rectangular variants, and preset composites",
    imports: ["Skeleton", "SkeletonCard", "SkeletonTable", "SkeletonList"],
    props: [
      { name: "variant", type: '"text" | "circular" | "rectangular"', default: '"text"', description: "Shape variant" },
      { name: "width", type: "string | number", description: "Width" },
      { name: "height", type: "string | number", description: "Height" },
      { name: "lines", type: "number", default: "1", description: "Number of text lines" },
      { name: "animate", type: "boolean", default: "true", description: "Enable pulse animation" },
    ],
    example: `{loading ? <SkeletonCard /> : <Card>...</Card>}
{loading ? <SkeletonTable rows={5} /> : <DSTable ... />}`,
  },

  Card: {
    name: "Card",
    displayName: "Card",
    category: "display",
    description: "Content card with header, body, footer sections, elevation levels",
    imports: ["Card", "CardHeader", "CardBody", "CardFooter"],
    props: [
      { name: "elevation", type: '"none" | "sm" | "md"', default: '"sm"', description: "Shadow elevation" },
      { name: "hoverable", type: "boolean", default: "false", description: "Hover lift effect" },
      { name: "bordered", type: "boolean", default: "true", description: "Show border" },
    ],
    example: `<Card hoverable>
  <CardHeader>
    <h3>Order #1234</h3>
    <Badge variant="success">Completed</Badge>
  </CardHeader>
  <CardBody>
    <p>Order details here...</p>
  </CardBody>
  <CardFooter>
    <DSButton variant="outline" size="sm">View Details</DSButton>
  </CardFooter>
</Card>`,
  },

  ImagePreview: {
    name: "ImagePreview",
    displayName: "Image Preview",
    category: "display",
    description: "Image gallery lightbox with zoom, navigation, thumbnail strip",
    imports: ["ImagePreview"],
    props: [
      { name: "images", type: "string[]", description: "Image URLs" },
      { name: "initialIndex", type: "number", default: "0", description: "Starting image index" },
    ],
    example: `<ImagePreview images={["/product1.jpg", "/product2.jpg", "/product3.jpg"]} />`,
  },

  EmptyState: {
    name: "EmptyState",
    displayName: "Empty State",
    category: "feedback",
    description: "Empty data placeholder with icon, title, description, action button",
    imports: ["EmptyState"],
    props: [
      { name: "icon", type: "ReactNode", description: "Illustration or icon" },
      { name: "title", type: "string", description: "Title text" },
      { name: "description", type: "string", description: "Description text" },
      { name: "action", type: "ReactNode", description: "Action button or link" },
    ],
    example: `<EmptyState
  icon={<Package size={48} />}
  title="No products yet"
  description="Start by adding your first product"
  action={<DSButton variant="primary">Add Product</DSButton>}
/>`,
  },

  Tabs: {
    name: "Tabs",
    displayName: "Tabs",
    category: "navigation",
    description: "Tab navigation with 4 variants, 3 sizes, badges, animated indicator",
    imports: ["Tabs"],
    props: [
      { name: "tabs", type: "TabItem[]", description: "Tab items — each item: { id: string, label: string, content?: ReactNode, badge?: string, disabled?: boolean }" },
      { name: "activeTab", type: "string", description: "Controlled active tab id" },
      { name: "defaultTab", type: "string", description: "Default active tab id (uncontrolled)" },
      { name: "onChange", type: "(id: string) => void", description: "Tab change handler" },
      { name: "variant", type: '"default" | "bordered" | "pills" | "underline"', default: '"default"', description: "Tab style" },
      { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Tab size" },
      { name: "fullWidth", type: "boolean", default: "false", description: "Full width tabs" },
    ],
    example: `<Tabs
  tabs={[
    { id: "all", label: "All Orders", badge: "128" },
    { id: "pending", label: "Pending", badge: "24" },
    { id: "completed", label: "Completed" },
  ]}
  activeTab={activeTab}
  onChange={setActiveTab}
  variant="underline"
/>`,
  },

  Pagination: {
    name: "Pagination",
    displayName: "Pagination",
    category: "navigation",
    description: "Page navigation with customizable sibling count, page size selector, info display",
    imports: ["Pagination"],
    props: [
      { name: "currentPage", type: "number", description: "Current page" },
      { name: "totalPages", type: "number", description: "Total pages" },
      { name: "onPageChange", type: "(page: number) => void", description: "Page change handler" },
      { name: "siblingCount", type: "number", default: "1", description: "Pages shown around current" },
      { name: "showFirstLast", type: "boolean", default: "false", description: "Show first/last page buttons (single prop, not showFirst/showLast)" },
      { name: "pageSize", type: "number", description: "Items per page" },
      { name: "onPageSizeChange", type: "(size: number) => void", description: "Page size change handler" },
      { name: "variant", type: '"default" | "outlined" | "filled" | "minimal"', default: '"default"', description: "Pagination style" },
    ],
    example: `<Pagination
  currentPage={page}
  totalPages={20}
  onPageChange={setPage}
  pageSize={10}
  onPageSizeChange={setPageSize}
/>`,
  },

  Breadcrumb: {
    name: "Breadcrumb",
    displayName: "Breadcrumb",
    category: "navigation",
    description: "Breadcrumb trail with custom separator, max items with collapse",
    imports: ["Breadcrumb"],
    props: [
      { name: "items", type: "BreadcrumbItem[]", description: "Breadcrumb items" },
      { name: "separator", type: '"chevron" | "slash" | "dot" | "arrow"', default: '"chevron"', description: "Separator style" },
      { name: "maxItems", type: "number", description: "Max visible items before collapse" },
      { name: "onItemClick", type: "(item: BreadcrumbItem, index: number) => void", description: "Item click handler" },
    ],
    example: `<Breadcrumb
  items={[
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "Electronics", href: "/products/electronics" },
    { label: "iPhone 15" },
  ]}
  separator="chevron"
/>`,
  },

  Sidebar: {
    name: "Sidebar",
    displayName: "Sidebar",
    category: "navigation",
    description: "Side navigation with groups, active states, badges, collapse to icon-only mode with DS Tooltip on hover",
    imports: ["Sidebar"],
    props: [
      { name: "brand", type: "SidebarBrand", description: "Brand logo and name" },
      { name: "groups", type: "SidebarGroup[]", description: "Navigation groups" },
      { name: "activeItem", type: "string", description: "Active item ID" },
      { name: "onNavigate", type: "(item: SidebarItem) => void", description: "Navigation handler" },
      { name: "collapsed", type: "boolean", default: "false", description: "Collapsed mode (icon only, shows tooltip on hover)" },
      { name: "onCollapsedChange", type: "(collapsed: boolean) => void", description: "Collapse toggle handler" },
      { name: "showCollapseToggle", type: "boolean", default: "true", description: "Show footer collapse button. Set false when controlled from TopNavbar burger" },
      { name: "width", type: "string", default: "256px", description: "Expanded sidebar width" },
      { name: "className", type: "string", description: "Additional class name" },
    ],
    example: `const [collapsed, setCollapsed] = useState(false);

// Controlled by TopNavbar burger (recommended pattern):
<TopNavbar onSidebarToggle={() => setCollapsed(c => !c)} ... />
<Sidebar
  collapsed={collapsed}
  onCollapsedChange={setCollapsed}
  showCollapseToggle={false}
  brand={{ name: "Sellsuki", logo: "/logo.svg" }}
  groups={[
    { label: "Main", items: [
      { id: "dashboard", label: "Dashboard", icon: <BarChart3 size={18} /> },
      { id: "orders", label: "Orders", icon: <ShoppingCart size={18} />, badge: "12" },
      { id: "products", label: "Products", icon: <Package size={18} /> },
    ]},
  ]}
  activeItem="orders"
  onNavigate={(item) => navigate(item.id)}
/>`,
  },

  TopNavbar: {
    name: "TopNavbar",
    displayName: "Top Navbar",
    category: "navigation",
    description: "Top navigation bar with brand, breadcrumbs, search, notifications, user avatar, and sidebar burger toggle",
    imports: ["TopNavbar"],
    props: [
      { name: "brand", type: "TopNavbarBrand", description: "Brand logo and name" },
      { name: "breadcrumbs", type: "BreadcrumbItem[]", description: "Breadcrumb trail" },
      { name: "title", type: "string", description: "Page title shown after brand" },
      { name: "showSearch", type: "boolean", default: "false", description: "Show search bar" },
      { name: "user", type: "TopNavbarUser", description: "User avatar and name" },
      { name: "notificationCount", type: "number", description: "Notification badge count" },
      { name: "onNotificationClick", type: "() => void", description: "Notification click handler" },
      { name: "onSidebarToggle", type: "() => void", description: "Sidebar burger toggle — shows Menu icon always visible, use to collapse/expand sidebar" },
      { name: "onMobileMenuClick", type: "() => void", description: "Mobile menu toggle (legacy, prefer onSidebarToggle)" },
      { name: "onUserClick", type: "() => void", description: "User avatar click handler" },
      { name: "actions", type: "ReactNode", description: "Custom right-side actions slot" },
      { name: "height", type: "string", default: "72px", description: "Navbar height" },
    ],
    example: `const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

<TopNavbar
  brand={{ name: "Sellsuki", logo: "/logo.svg" }}
  breadcrumbs={[{ label: "Home" }, { label: "Orders" }]}
  showSearch
  user={{ name: "John Doe", avatar: "/john.jpg" }}
  notificationCount={3}
  onNotificationClick={() => setShowNotif(true)}
  onSidebarToggle={() => setSidebarCollapsed(c => !c)}
/>`,
  },

  Menu: {
    name: "Menu",
    displayName: "Menu",
    category: "navigation",
    description: "Context menu / dropdown menu with sub-menus, dividers, shortcuts, portal-based",
    imports: ["Menu"],
    props: [
      { name: "items", type: "MenuItem[]", description: "Menu items" },
      { name: "trigger", type: "ReactNode", description: "Trigger element" },
      { name: "onSelect", type: "(item: MenuItem) => void", description: "Item select handler" },
    ],
    example: `<Menu
  trigger={<DSButton variant="outline">Actions</DSButton>}
  items={[
    { label: "Edit", icon: <Edit size={14} /> },
    { label: "Duplicate", icon: <Copy size={14} /> },
    { type: "divider" },
    { label: "Delete", icon: <Trash size={14} />, destructive: true },
  ]}
  onSelect={handleAction}
/>`,
  },

  Stepper: {
    name: "Stepper",
    displayName: "Stepper",
    category: "navigation",
    description: "Step progress indicator with horizontal/vertical, clickable steps",
    imports: ["Stepper"],
    props: [
      { name: "steps", type: "StepDefinition[]", description: "Step definitions" },
      { name: "current", type: "number", description: "Current step index (0-based)" },
      { name: "orientation", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "Layout direction" },
      { name: "onStepClick", type: "(index: number) => void", description: "Step click handler" },
    ],
    example: `<Stepper
  steps={[
    { title: "Cart", description: "Review items" },
    { title: "Shipping", description: "Select address" },
    { title: "Payment", description: "Enter payment" },
    { title: "Confirm", description: "Place order" },
  ]}
  current={1}
  onStepClick={setStep}
/>`,
  },

  Alert: {
    name: "Alert",
    displayName: "Alert / Toast",
    category: "feedback",
    description: "Inline alert with 4 variants, dismissible, plus toast system for notifications",
    imports: ["Alert", "ToastContainer", "toast"],
    props: [
      { name: "variant", type: '"info" | "success" | "warning" | "error"', default: '"info"', description: "Alert type" },
      { name: "title", type: "string", description: "Alert title" },
      { name: "dismissible", type: "boolean", default: "false", description: "Show dismiss button" },
      { name: "onDismiss", type: "() => void", description: "Dismiss handler" },
    ],
    example: `<Alert variant="success" title="Order saved!" dismissible>
  Your order has been saved successfully.
</Alert>

{/* Toast system */}
<ToastContainer />
toast.success("Product added!")
toast.error("Failed to save")
toast.info("Processing...")`,
  },

  Modal: {
    name: "Modal",
    displayName: "Modal",
    category: "feedback",
    description: "Dialog modal with 5 sizes, header/footer, close on overlay, and ConfirmDialog",
    imports: ["Modal", "ConfirmDialog"],
    props: [
      { name: "open", type: "boolean", description: "Open state" },
      { name: "onClose", type: "() => void", description: "Close handler" },
      { name: "title", type: "string", description: "Modal title" },
      { name: "size", type: '"sm" | "md" | "lg" | "xl" | "full"', default: '"md"', description: "Modal size" },
      { name: "closeOnOverlay", type: "boolean", default: "true", description: "Close on overlay click" },
      { name: "footer", type: "ReactNode", description: "Footer content" },
    ],
    example: `<Modal open={isOpen} onClose={() => setOpen(false)} title="Edit Product" size="lg">
  <DSInput label="Name" value={name} onChange={setName} />
  <DSTextarea label="Description" value={desc} onChange={setDesc} />
</Modal>

<ConfirmDialog
  open={showConfirm}
  title="Delete Product"
  message="Are you sure? This cannot be undone."
  confirmText="Delete"
  variant="destructive"
  onConfirm={handleDelete}
  onCancel={() => setShowConfirm(false)}
/>`,
  },

  Notification: {
    name: "Notification",
    displayName: "Notification",
    category: "feedback",
    description: "Notification with types, actions, and NotificationCenter panel",
    imports: ["Notification", "NotificationCenter"],
    props: [
      { name: "type", type: '"info" | "success" | "warning" | "error"', default: '"info"', description: "Notification type" },
      { name: "title", type: "string", description: "Title text" },
      { name: "message", type: "string", description: "Message text" },
      { name: "action", type: "ReactNode", description: "Action button" },
      { name: "dismissible", type: "boolean", default: "true", description: "Can be dismissed" },
    ],
    example: `<Notification
  type="info"
  title="New Order"
  message="Order #1234 has been placed"
  action={<DSButton size="sm" variant="outline">View</DSButton>}
/>`,
  },

  Spinner: {
    name: "Spinner",
    displayName: "Spinner",
    category: "feedback",
    description: "Loading spinner with 4 sizes, customizable color",
    imports: ["Spinner"],
    props: [
      { name: "size", type: '"sm" | "md" | "lg" | "xl"', default: '"md"', description: "Spinner size" },
      { name: "color", type: "string", default: '"var(--primary)"', description: "Spinner color" },
    ],
    example: `<Spinner size="md" />
{loading && <Spinner size="lg" />}`,
  },

  ProgressBar: {
    name: "ProgressBar",
    displayName: "Progress Bar",
    category: "feedback",
    description: "Progress indicator with sizes, indeterminate mode, custom color",
    imports: ["ProgressBar"],
    props: [
      { name: "value", type: "number", description: "Progress value (0-100)" },
      { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Bar height" },
      { name: "color", type: "string", default: '"var(--primary)"', description: "Bar color" },
      { name: "indeterminate", type: "boolean", default: "false", description: "Indeterminate animation" },
      { name: "showLabel", type: "boolean", default: "false", description: "Show percentage label" },
    ],
    example: `<ProgressBar value={75} showLabel />
<ProgressBar indeterminate />`,
  },

  Tooltip: {
    name: "Tooltip",
    displayName: "Tooltip",
    category: "feedback",
    description: "Hover/focus tooltip with 4 placements",
    imports: ["Tooltip"],
    props: [
      { name: "content", type: "string", description: "Tooltip text" },
      { name: "placement", type: '"top" | "bottom" | "left" | "right"', default: '"top"', description: "Tooltip position" },
      { name: "children", type: "ReactNode", description: "Trigger element" },
    ],
    example: `<Tooltip content="Edit this item" placement="top">
  <IconButton><Edit size={16} /></IconButton>
</Tooltip>`,
  },

  Popover: {
    name: "Popover",
    displayName: "Popover",
    category: "feedback",
    description: "Click-triggered popup with title and content",
    imports: ["Popover"],
    props: [
      { name: "trigger", type: "ReactNode", description: "Trigger element" },
      { name: "title", type: "string", description: "Popover title" },
      { name: "content", type: "ReactNode", description: "Popover content" },
      { name: "placement", type: '"top" | "bottom" | "left" | "right"', default: '"bottom"', description: "Position" },
    ],
    example: `<Popover
  trigger={<DSButton variant="outline" size="sm">Filter</DSButton>}
  title="Filter Options"
  content={
    <div>
      <DSCheckbox label="In Stock" />
      <DSCheckbox label="On Sale" />
    </div>
  }
/>`,
  },

  Drawer: {
    name: "Drawer",
    displayName: "Drawer",
    category: "feedback",
    description: "Side panel drawer with 4 sides, 3 sizes, header/footer",
    imports: ["Drawer"],
    props: [
      { name: "open", type: "boolean", description: "Open state" },
      { name: "onClose", type: "() => void", description: "Close handler" },
      { name: "title", type: "string", description: "Drawer title" },
      { name: "side", type: '"left" | "right" | "top" | "bottom"', default: '"right"', description: "Slide direction" },
      { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Drawer width/height" },
      { name: "footer", type: "ReactNode", description: "Footer content" },
    ],
    example: `<Drawer
  open={isOpen}
  onClose={() => setOpen(false)}
  title="Order Details"
  side="right"
  size="md"
  footer={
    <div className="flex gap-2">
      <DSButton variant="outline" onClick={() => setOpen(false)}>Cancel</DSButton>
      <DSButton variant="primary">Save</DSButton>
    </div>
  }
>
  {/* Drawer content */}
</Drawer>`,
  },

  Divider: {
    name: "Divider",
    displayName: "Divider",
    category: "layout",
    description: "Content divider with label, orientation, style variants",
    imports: ["Divider"],
    props: [
      { name: "label", type: "string", description: "Center label text" },
      { name: "orientation", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "Direction" },
      { name: "variant", type: '"solid" | "dashed" | "dotted"', default: '"solid"', description: "Line style" },
    ],
    example: `<Divider />
<Divider label="OR" />
<Divider variant="dashed" />`,
  },

  AdvancedDataTable: {
    name: "AdvancedDataTable",
    displayName: "Advanced DataTable",
    category: "display",
    description: "Server-side DataTable with pagination, sorting, selection, bulk actions, expandable rows, frozen columns, column toggle",
    imports: ["AdvancedDataTable"],
    props: [
      { name: "columns", type: "AdvancedColumn<T>[]", description: "Column definitions with sortable, frozen, hideable, render" },
      { name: "data", type: "T[]", description: "Row data" },
      { name: "rowKey", type: "string", default: '"id"', description: "Field used as unique row key" },
      { name: "pagination", type: "PaginationMeta", description: "Server-side: { page, pageSize, totalCount }" },
      { name: "sortBy", type: "string", description: "Currently sorted column key" },
      { name: "sortOrder", type: '"asc" | "desc"', description: "Current sort direction" },
      { name: "onPageChange", type: "(page, pageSize) => void", description: "Called when page or pageSize changes" },
      { name: "onSortChange", type: "(sortBy, sortOrder) => void", description: "Called when sort column/direction changes" },
      { name: "selectable", type: "boolean", default: "false", description: "Enable row checkboxes" },
      { name: "selectedRows", type: "Set<string | number>", description: "Controlled selection" },
      { name: "onSelectionChange", type: "(selected, rows) => void", description: "Called when selection changes" },
      { name: "bulkActions", type: "BulkAction[]", description: "Actions shown in bulk bar when rows selected" },
      { name: "expandedRowRender", type: "(row) => ReactNode", description: "Render function for expanded row detail" },
      { name: "showColumnToggle", type: "boolean", default: "false", description: "Show column visibility toggle button" },
      { name: "loading", type: "boolean", default: "false", description: "Show skeleton loading rows" },
      { name: "loadingRows", type: "number", default: "5", description: "Number of skeleton rows" },
      { name: "error", type: "string", description: "Error message to display" },
      { name: "emptyMessage", type: "string", default: '"No data found"', description: "Empty state message" },
    ],
    example: `<AdvancedDataTable
  rowKey="id"
  columns={[
    { key: "id", header: "ID", frozen: true, sortable: true },
    { key: "name", header: "Company", sortable: true },
    { key: "status", header: "Status", render: (v) => <Badge>{v}</Badge> },
    { key: "revenue", header: "Revenue", align: "right", sortable: true },
  ]}
  data={pagedData}
  pagination={{ page, pageSize, totalCount: 120 }}
  sortBy="name" sortOrder="asc"
  onPageChange={(p, ps) => fetchPage(p, ps)}
  onSortChange={(col, dir) => fetchSorted(col, dir)}
  selectable
  selectedRows={selected}
  onSelectionChange={(keys) => setSelected(keys)}
  bulkActions={[
    { label: "Export", onClick: (keys) => exportRows(keys) },
    { label: "Delete", variant: "destructive", onClick: (keys) => deleteRows(keys) },
  ]}
  expandedRowRender={(row) => <div>Details for {row.name}</div>}
  showColumnToggle
  stickyHeader
/>`,
  },

  FormField: {
    name: "FormField",
    displayName: "Form Field",
    category: "form",
    description: "Generic form field wrapper with label, error, helper text. Wraps any input component.",
    imports: ["FormField", "FormLabel", "FormError", "FormHelperText"],
    props: [
      { name: "label", type: "string", description: "Field label text" },
      { name: "error", type: "string", description: "Error message" },
      { name: "helperText", type: "string", description: "Helper text below input" },
      { name: "required", type: "boolean", default: "false", description: "Show required indicator" },
      { name: "children", type: "ReactNode", description: "Input component" },
    ],
    example: `<FormField label="Email" error={errors.email} required>
  <DSInput placeholder="you@example.com" state={errors.email ? "error" : "default"} />
</FormField>

<FormField label="Bio" helperText="Max 200 characters">
  <DSTextarea maxLength={200} />
</FormField>`,
  },

  PageHeader: {
    name: "PageHeader",
    displayName: "Page Header",
    category: "layout",
    description: "Page title bar with breadcrumb node, title, subtitle, and action buttons",
    imports: ["PageHeader"],
    props: [
      { name: "title", type: "string", description: "Page title" },
      { name: "subtitle", type: "string", description: "Optional subtitle below title (not 'description')" },
      { name: "breadcrumb", type: "ReactNode", description: "Breadcrumb node — pass <Breadcrumb items={...} /> directly (not an array)" },
      { name: "actions", type: "ReactNode", description: "Action buttons (right side)" },
      { name: "backHref", type: "string", description: "Back button URL" },
    ],
    example: `<PageHeader
  title="Order Management"
  subtitle="View and manage all customer orders"
  breadcrumb={<Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Orders" }]} />}
  actions={<DSButton leftIcon={<Plus size={16} />}>New Order</DSButton>}
/>`,
  },

  FilterBar: {
    name: "FilterBar",
    displayName: "Filter Bar",
    category: "layout",
    description: "Search + filter combo toolbar for admin panels. Supports text search, dropdown filters, date range.",
    imports: ["FilterBar"],
    props: [
      { name: "filters", type: "FilterConfig[]", description: "Array of filter definitions" },
      { name: "values", type: "FilterBarValue", description: "Current filter values" },
      { name: "onChange", type: "(values: FilterBarValue) => void", description: "Called when any filter changes" },
      { name: "searchPlaceholder", type: "string", description: "Search input placeholder" },
    ],
    example: `<FilterBar
  searchPlaceholder="Search orders..."
  filters={[
    { key: "status", label: "Status", type: "select", options: [
      { label: "Active", value: "active" },
      { label: "Pending", value: "pending" },
    ]},
    { key: "date", label: "Date", type: "date" },
  ]}
  values={filterValues}
  onChange={setFilterValues}
/>`,
  },

  NumberInput: {
    name: "NumberInput",
    displayName: "Number Input",
    category: "form",
    description: "Numeric input with increment/decrement buttons, min/max, step, formatting",
    imports: ["NumberInput"],
    props: [
      { name: "value", type: "number", description: "Current value" },
      { name: "onChange", type: "(value: number) => void", description: "Change handler" },
      { name: "min", type: "number", description: "Minimum value" },
      { name: "max", type: "number", description: "Maximum value" },
      { name: "step", type: "number", default: "1", description: "Increment step" },
      { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Input size" },
    ],
    example: `<NumberInput value={qty} onChange={setQty} min={1} max={100} step={1} />`,
  },

  OTPInput: {
    name: "OTPInput",
    displayName: "OTP Input",
    category: "form",
    description: "One-Time Password input with individual digit boxes, auto-focus, paste support",
    imports: ["OTPInput"],
    props: [
      { name: "value", type: "string", description: "Current OTP value" },
      { name: "onChange", type: "(value: string) => void", description: "Change handler" },
      { name: "length", type: "number", default: "6", description: "Number of digits" },
      { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Input size" },
    ],
    example: `<OTPInput value={otp} onChange={setOtp} length={6} />`,
  },

  Accordion: {
    name: "Accordion",
    displayName: "Accordion",
    category: "layout",
    description: "Collapsible content with single/multiple expand mode",
    imports: ["Accordion", "AccordionItem"],
    props: [
      { name: "type", type: '"single" | "multiple"', default: '"single"', description: "Expand mode" },
      { name: "value", type: "string | string[]", description: "Controlled expanded item(s)" },
      { name: "onChange", type: "(value: string | string[]) => void", description: "Change handler" },
    ],
    example: `<Accordion type="single">
  <AccordionItem title="Shipping Info" value="shipping">
    Free shipping on orders over ฿500
  </AccordionItem>
  <AccordionItem title="Return Policy" value="returns">
    30-day return policy
  </AccordionItem>
</Accordion>`,
  },
};

export const componentCategories = {
  form: "Form Controls",
  display: "Data Display",
  navigation: "Navigation",
  feedback: "Feedback",
  layout: "Layout",
  chart: "Charts",
  shell: "Shell / Layout Engine",
};

/* ─── Stage 2.5+ — New Components ───────────────────────────────────────────── */

export const newComponents: Record<string, ComponentInfo> = {
  LineChart: {
    name: "LineChart",
    displayName: "Line Chart",
    category: "display",
    description: "SVG line chart with multiple series, tooltips, grid, legend — no external deps",
    imports: ["LineChart"],
    props: [
      { name: "series", type: "ChartSeries[]", description: "Array of { name, data: { label, value }[], color? }" },
      { name: "height", type: "number", default: "240", description: "Chart height in px" },
      { name: "showDots", type: "boolean", default: "true", description: "Show dots on data points" },
      { name: "smooth", type: "boolean", default: "false", description: "Catmull-rom curve smoothing" },
      { name: "showGrid", type: "boolean", default: "true", description: "Show Y-axis grid lines" },
      { name: "showLegend", type: "boolean", default: "true", description: "Show series legend" },
      { name: "showTooltip", type: "boolean", default: "true", description: "Show tooltip on hover" },
    ],
    example: `<LineChart
  series={[
    { name: "Revenue", data: [{ label: "Jan", value: 42000 }, { label: "Feb", value: 38500 }] },
  ]}
  smooth
  height={240}
/>`,
  },

  AreaChart: {
    name: "AreaChart",
    displayName: "Area Chart",
    category: "display",
    description: "SVG area chart (filled line) with gradient — extends LineChart props",
    imports: ["AreaChart"],
    props: [
      { name: "series", type: "ChartSeries[]", description: "Chart series data" },
      { name: "fillOpacity", type: "number", default: "0.15", description: "Fill area opacity" },
      { name: "smooth", type: "boolean", default: "true", description: "Smooth curves" },
    ],
    example: `<AreaChart series={[{ name: "Orders", data: monthlyData }]} smooth fillOpacity={0.2} />`,
  },

  BarChart: {
    name: "BarChart",
    displayName: "Bar Chart",
    category: "display",
    description: "SVG bar chart with grouped or stacked series, rounded corners",
    imports: ["BarChart"],
    props: [
      { name: "series", type: "ChartSeries[]", description: "Chart series data" },
      { name: "stacked", type: "boolean", default: "false", description: "Stack bars (multiple series)" },
      { name: "radius", type: "number", default: "4", description: "Bar corner radius" },
    ],
    example: `<BarChart
  series={[
    { name: "Shopee", data: [{ label: "Jan", value: 420 }] },
    { name: "Lazada", data: [{ label: "Jan", value: 310 }] },
  ]}
  stacked
/>`,
  },

  DonutChart: {
    name: "DonutChart",
    displayName: "Donut Chart",
    category: "display",
    description: "SVG donut/pie chart with legend, hover highlight, center label",
    imports: ["DonutChart"],
    props: [
      { name: "data", type: "{ label, value, color? }[]", description: "Segments" },
      { name: "size", type: "number", default: "200", description: "Outer diameter (px)" },
      { name: "innerRatio", type: "number", default: "0.6", description: "0=pie, 0.6=donut" },
      { name: "centerLabel", type: "string", description: "Center text label" },
      { name: "centerValue", type: "string", description: "Center numeric value" },
    ],
    example: `<DonutChart
  data={[
    { label: "Delivered", value: 820 },
    { label: "Processing", value: 280 },
    { label: "Pending", value: 48 },
  ]}
  centerLabel="Total"
  centerValue="1,148"
/>`,
  },

  MiniSparkline: {
    name: "MiniSparkline",
    displayName: "Mini Sparkline",
    category: "display",
    description: "Inline SVG sparkline for stat cards — line, area, or bar type",
    imports: ["MiniSparkline"],
    props: [
      { name: "values", type: "number[]", description: "Data values" },
      { name: "type", type: '"line" | "area" | "bar"', default: '"line"', description: "Sparkline type" },
      { name: "width", type: "number", default: "80", description: "Width (px)" },
      { name: "height", type: "number", default: "32", description: "Height (px)" },
      { name: "showValue", type: "boolean", default: "false", description: "Show last value as label" },
      { name: "trend", type: '"up" | "down" | "neutral"', description: "Override auto-computed trend direction" },
    ],
    example: `<MiniSparkline values={[40, 55, 48, 62, 58, 74, 71]} type="area" showValue />`,
  },

  DateRangePicker: {
    name: "DateRangePicker",
    displayName: "Date Range Picker",
    category: "form",
    description: "Dual-calendar date range picker with presets: today, 7d, 30d, thisMonth, custom",
    imports: ["DateRangePicker"],
    props: [
      { name: "value", type: "DateRange", description: "{ from: Date | null, to: Date | null }" },
      { name: "onChange", type: "(range: DateRange, preset?) => void", description: "Change handler" },
      { name: "presets", type: "DateRangePreset[]", default: '["today","last7","last30","custom"]', description: "Preset buttons" },
      { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Component size" },
      { name: "clearable", type: "boolean", default: "true", description: "Show clear button" },
    ],
    example: `const [range, setRange] = useState<DateRange>({ from: null, to: null });
<DateRangePicker value={range} onChange={setRange} presets={["today","last7","last30","custom"]} />`,
  },

  TimePicker: {
    name: "TimePicker",
    displayName: "Time Picker",
    category: "form",
    description: "Time picker with scroll columns — supports 12h/24h, optional seconds",
    imports: ["TimePicker"],
    props: [
      { name: "value", type: "TimeValue", description: "{ hours: number, minutes: number, seconds?: number }" },
      { name: "onChange", type: "(time: TimeValue) => void", description: "Change handler" },
      { name: "format", type: '"12h" | "24h"', default: '"24h"', description: "Display format" },
      { name: "showSeconds", type: "boolean", default: "false", description: "Show seconds column" },
      { name: "minuteStep", type: "number", default: "1", description: "Minute step increment" },
    ],
    example: `<TimePicker value={{ hours: 9, minutes: 30 }} onChange={setTime} format="24h" />`,
  },

  DateTimePicker: {
    name: "DateTimePicker",
    displayName: "Date Time Picker",
    category: "form",
    description: "Combined calendar + time picker — for scheduling, appointments",
    imports: ["DateTimePicker"],
    props: [
      { name: "value", type: "Date", description: "Selected date and time" },
      { name: "onChange", type: "(date: Date) => void", description: "Change handler" },
      { name: "format", type: '"12h" | "24h"', default: '"24h"', description: "Time format" },
    ],
    example: `<DateTimePicker value={new Date()} onChange={setDate} format="24h" />`,
  },

  ChoiceCard: {
    name: "ChoiceCard",
    displayName: "Choice Card",
    category: "form",
    description: "Clickable selection card with icon, title, description, and arrow/check indicator",
    imports: ["ChoiceCard", "ChoiceCardGroup"],
    props: [
      { name: "value", type: "string", description: "Unique card value" },
      { name: "title", type: "string", description: "Card title" },
      { name: "description", type: "string", description: "Subtitle / description" },
      { name: "icon", type: "ReactNode", description: "Leading icon or image" },
      { name: "selected", type: "boolean", description: "Selection state" },
      { name: "showCheck", type: "boolean", default: "false", description: "Show checkmark instead of arrow" },
      { name: "layout", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "Card layout" },
    ],
    example: `<ChoiceCardGroup value={selected} onChange={setSelected}>
  <ChoiceCard value="standard" title="Standard" description="3-5 days" icon={<Truck />} />
  <ChoiceCard value="express" title="Express" description="1-2 days" icon={<Package />} badge="Popular" />
</ChoiceCardGroup>`,
  },

  RadioCard: {
    name: "RadioCard",
    displayName: "Radio Card",
    category: "form",
    description: "Radio group rendered as selectable cards with icon slots — grid or list layout",
    imports: ["RadioCard"],
    props: [
      { name: "options", type: "RadioCardOption[]", description: "{ value, title, description?, icon?, badge?, disabled? }[]" },
      { name: "value", type: "string", description: "Selected value" },
      { name: "onChange", type: "(value: string) => void", description: "Change handler" },
      { name: "columns", type: "1 | 2 | 3 | 4", default: "2", description: "Grid columns" },
    ],
    example: `<RadioCard
  options={[
    { value: "card", title: "Credit Card", icon: <CreditCard />, description: "Visa, Mastercard" },
    { value: "transfer", title: "Bank Transfer", icon: <QrCode />, badge: "Instant" },
  ]}
  value={selected}
  onChange={setSelected}
/>`,
  },

  RepeatableFieldList: {
    name: "RepeatableFieldList",
    displayName: "Repeatable Field List",
    category: "form",
    description: "Dynamic add/remove rows — each row has multiple field columns with custom render",
    imports: ["RepeatableFieldList"],
    props: [
      { name: "columns", type: "RepeatableFieldColumn[]", description: "{ key, label, render(value, onChange) }[]" },
      { name: "value", type: "RepeatableFieldRow[]", description: "{ id, values: Record<string, unknown> }[]" },
      { name: "onChange", type: "(rows: RepeatableFieldRow[]) => void", description: "Change handler" },
      { name: "addLabel", type: "string", default: '"Add row"', description: "Add button label" },
      { name: "sortable", type: "boolean", default: "false", description: "Enable drag reorder" },
      { name: "minRows", type: "number", default: "0", description: "Min rows (disables remove at min)" },
      { name: "maxRows", type: "number", description: "Max rows (hides add at max)" },
    ],
    example: `<RepeatableFieldList
  columns={[
    { key: "name", label: "Product", render: (v, set) => <DSInput value={v} onChange={e => set(e.target.value)} /> },
    { key: "qty", label: "Qty", width: "80px", render: (v, set) => <NumberInput value={v} onChange={set} /> },
  ]}
  value={rows}
  onChange={setRows}
  addLabel="Add product"
  sortable
/>`,
  },

  RichTextEditor: {
    name: "RichTextEditor",
    displayName: "Rich Text Editor",
    category: "form",
    description: "ContentEditable rich text editor with toolbar (format, list, align, link, block, history) + fullscreen",
    imports: ["RichTextEditor"],
    props: [
      { name: "value", type: "string", description: "HTML content" },
      { name: "onChange", type: "(html: string) => void", description: "Change handler" },
      { name: "toolbar", type: 'ToolbarGroup[]', default: '["history","format","list","align","link","block"]', description: "Toolbar groups" },
      { name: "minHeight", type: "number", default: "160", description: "Minimum editor height (px)" },
      { name: "fullscreen", type: "boolean", default: "true", description: "Allow fullscreen toggle" },
      { name: "readOnly", type: "boolean", default: "false", description: "Read-only mode (no toolbar)" },
    ],
    example: `<RichTextEditor
  value={html}
  onChange={setHtml}
  toolbar={["format", "list", "link"]}
  placeholder="Describe your product…"
/>`,
  },

  ImageGallery: {
    name: "ImageGallery",
    displayName: "Image Gallery",
    category: "display",
    description: "Grid/list image gallery with lightbox, selectable mode, upload, delete",
    imports: ["ImageGallery"],
    props: [
      { name: "images", type: "GalleryImage[]", description: "{ id, src, alt?, name?, size? }[]" },
      { name: "selectable", type: "boolean", default: "false", description: "Enable selection checkmarks" },
      { name: "selectedIds", type: "string[]", description: "Controlled selected IDs" },
      { name: "lightbox", type: "boolean", default: "true", description: "Enable lightbox on click" },
      { name: "uploadable", type: "boolean", default: "false", description: "Show upload button" },
      { name: "onDelete", type: "(id: string) => void", description: "Delete handler (shows X button)" },
      { name: "columns", type: "2|3|4|5|6", default: "4", description: "Grid columns" },
    ],
    example: `<ImageGallery
  images={productImages}
  selectable
  selectedIds={selected}
  onSelectChange={setSelected}
  columns={3}
  onDelete={handleDelete}
/>`,
  },

  ThumbnailCell: {
    name: "ThumbnailCell",
    displayName: "Thumbnail Cell",
    category: "display",
    description: "Table cell component: small image + title + subtitle — use in product/order tables",
    imports: ["ThumbnailCell"],
    props: [
      { name: "src", type: "string", description: "Image source URL" },
      { name: "caption", type: "string", description: "Title text" },
      { name: "subCaption", type: "string", description: "Subtitle (muted)" },
      { name: "size", type: '"xs" | "sm" | "md"', default: '"sm"', description: "Thumbnail size" },
    ],
    example: `<ThumbnailCell
  src="/products/iphone.jpg"
  caption="iPhone 15 Pro"
  subCaption="SKU: IP15P-128"
  size="sm"
/>`,
  },

  FeaturePageScaffold: {
    name: "FeaturePageScaffold",
    displayName: "Feature Page Scaffold",
    category: "layout",
    description: "Layout engine for feature pages — 7 variants: list, detail, settings, wizard, dashboard, form, report",
    imports: ["FeaturePageScaffold", "ScaffoldSection", "ScaffoldKPIRow"],
    props: [
      { name: "layout", type: '"list"|"detail"|"settings"|"wizard"|"dashboard"|"form"|"report"', default: '"list"', description: "Layout variant" },
      { name: "header", type: "ReactNode", description: "PageHeader component" },
      { name: "content", type: "ReactNode", description: "Main content area" },
      { name: "stats", type: "ReactNode", description: "Stat cards row (list/report)" },
      { name: "filters", type: "ReactNode", description: "FilterBar (list)" },
      { name: "main", type: "ReactNode", description: "Left column (detail)" },
      { name: "aside", type: "ReactNode", description: "Right panel (detail)" },
      { name: "form", type: "ReactNode", description: "Form body (wizard/form)" },
      { name: "actions", type: "ReactNode", description: "Sticky action bar (wizard/form)" },
      { name: "charts", type: "ReactNode", description: "Charts section (report/dashboard)" },
      { name: "dateRange", type: "ReactNode", description: "DateRangePicker (report)" },
    ],
    example: `<FeaturePageScaffold
  layout="list"
  header={<PageHeader title="Orders" primaryAction={{ label: "Create" }} />}
  stats={<ScaffoldKPIRow><StatCard title="Revenue" value="฿284K" /></ScaffoldKPIRow>}
  filters={<FilterBar ... />}
  content={<AdvancedDataTable ... />}
  footer={<Pagination ... />}
/>`,
  },

  AppShellProvider: {
    name: "AppShellProvider",
    displayName: "AppShell Provider",
    category: "layout",
    description: "Context provider for shell state: sidebar, breadcrumbs, user, product, async nav",
    imports: ["AppShellProvider", "useAppShell", "useBreadcrumbs"],
    props: [
      { name: "user", type: "ShellUser", description: "Authenticated user for the session" },
      { name: "product", type: "ProductBrandConfig", description: "Product brand config (drives theme)" },
      { name: "navResolver", type: "NavResolver", description: "Async nav resolver (permission-filtered)" },
      { name: "sidebarOpen", type: "boolean", description: "Controlled sidebar state" },
      { name: "defaultSidebarOpen", type: "boolean", default: "true", description: "Initial sidebar state" },
    ],
    example: `// App root:
<AppShellProvider user={currentUser} product={sellsukiBrandConfig} navResolver={myNavResolver}>
  <TopNavbar ... />
  <Sidebar ... />
  <main><FeaturePageScaffold ... /></main>
</AppShellProvider>

// Feature page:
function OrderPage() {
  const { user, setBreadcrumbs } = useAppShell();
  useBreadcrumbs([{ label: "Orders", href: "/orders" }, { label: "#1234" }]);
  return <div>...</div>;
}`,
  },
};

// Merge into main components object
Object.assign(components, newComponents);
