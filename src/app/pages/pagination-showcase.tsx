import { useState } from "react";
import { Layers, ChevronRight } from "lucide-react";
import { Pagination } from "../../lib/components/ds-pagination";
import { useI18n } from "../i18n";
import { Section, DemoCard, fontBody, fontLabel } from "./_showcase-factory";

export function PaginationShowcase() {
  const { t } = useI18n();
  const [page1, setPage1] = useState(1);
  const [page2, setPage2] = useState(5);
  const [page3, setPage3] = useState(1);
  const [pageSize3, setPageSize3] = useState(20);
  const [page4, setPage4] = useState(3);
  const [page5, setPage5] = useState(1);
  const [page6, setPage6] = useState(7);

  const totalItems3 = 487;
  const totalPages3 = Math.ceil(totalItems3 / pageSize3);

  return (
    <div className="space-y-14">
      <div>
        <div className="flex items-center gap-2 text-primary mb-2 caption">
          <Layers size={14} /><span>{t("breadcrumb.components")}</span><ChevronRight size={12} /><span>{t("page.pagination.title")}</span>
        </div>
        <h2 className="text-foreground" style={{ fontFamily: "var(--font-label)", fontSize: "var(--text-h2)", fontWeight: "700", lineHeight: "1.2" }}>{t("page.pagination.title")}</h2>
        <p className="text-muted-foreground mt-1 max-w-2xl" style={fontBody}>
          {t("page.pagination.desc")}
        </p>
      </div>

      <Section
        title="Variants"
        description="Four visual variants to match different table and list contexts."
        code={`import { Pagination } from "./components/ds-pagination";

<Pagination currentPage={page} totalPages={20} onPageChange={setPage} variant="default" />
<Pagination currentPage={page} totalPages={20} onPageChange={setPage} variant="outlined" />
<Pagination currentPage={page} totalPages={20} onPageChange={setPage} variant="filled" />
<Pagination currentPage={page} totalPages={20} onPageChange={setPage} variant="minimal" />`}
      >
        <div className="space-y-6">
          <DemoCard label="Default"><Pagination currentPage={page1} totalPages={20} onPageChange={setPage1} variant="default" /></DemoCard>
          <DemoCard label="Outlined"><Pagination currentPage={page1} totalPages={20} onPageChange={setPage1} variant="outlined" /></DemoCard>
          <DemoCard label="Filled"><Pagination currentPage={page1} totalPages={20} onPageChange={setPage1} variant="filled" /></DemoCard>
          <DemoCard label="Minimal"><Pagination currentPage={page1} totalPages={20} onPageChange={setPage1} variant="minimal" /></DemoCard>
        </div>
      </Section>

      <Section
        title="Sizes"
        description="Three sizes for different density layouts — tables, lists, and mobile views."
        code={`<Pagination currentPage={page} totalPages={10} onPageChange={setPage} size="sm" />
<Pagination currentPage={page} totalPages={10} onPageChange={setPage} size="md" />
<Pagination currentPage={page} totalPages={10} onPageChange={setPage} size="lg" />`}
      >
        <div className="space-y-6">
          <DemoCard label="Small"><Pagination currentPage={page2} totalPages={10} onPageChange={setPage2} size="sm" /></DemoCard>
          <DemoCard label="Medium"><Pagination currentPage={page2} totalPages={10} onPageChange={setPage2} size="md" /></DemoCard>
          <DemoCard label="Large"><Pagination currentPage={page2} totalPages={10} onPageChange={setPage2} size="lg" /></DemoCard>
        </div>
      </Section>

      <Section
        title="With Page Size Selector & Item Info"
        description="Full enterprise table pagination with rows-per-page, item range, and page info."
        code={`const [page, setPage] = useState(1);
const [pageSize, setPageSize] = useState(20);
const totalItems = 487;
const totalPages = Math.ceil(totalItems / pageSize);

<Pagination
  currentPage={page}
  totalPages={totalPages}
  onPageChange={setPage}
  showPageSize
  pageSizeOptions={[10, 20, 50, 100]}
  pageSize={pageSize}
  onPageSizeChange={(size) => { setPageSize(size); setPage(1); }}
  showItemsInfo
  totalItems={totalItems}
  showPageInfo
  showFirstLast
/>`}
      >
        <Pagination
          currentPage={page3}
          totalPages={totalPages3}
          onPageChange={setPage3}
          showPageSize
          pageSizeOptions={[10, 20, 50, 100]}
          pageSize={pageSize3}
          onPageSizeChange={(size) => { setPageSize3(size); setPage3(1); }}
          showItemsInfo
          totalItems={totalItems3}
          showPageInfo
          showFirstLast
        />
      </Section>

      <Section
        title="First / Last Jump Buttons"
        description="Quick navigation to the first and last page for large datasets."
        code={`<Pagination
  currentPage={page}
  totalPages={50}
  onPageChange={setPage}
  showFirstLast
  siblingCount={2}
/>`}
      >
        <Pagination
          currentPage={page4}
          totalPages={50}
          onPageChange={setPage4}
          showFirstLast
          siblingCount={2}
        />
      </Section>

      <Section
        title="States"
        description="Disabled state and various page counts."
        code={`// Disabled
<Pagination currentPage={1} totalPages={10} onPageChange={() => {}} disabled />

// Few pages (no dots)
<Pagination currentPage={page} totalPages={5} onPageChange={setPage} />

// Many pages
<Pagination currentPage={page} totalPages={100} onPageChange={setPage} showFirstLast />`}
      >
        <div className="space-y-6">
          <DemoCard label="Disabled"><Pagination currentPage={3} totalPages={10} onPageChange={() => {}} disabled /></DemoCard>
          <DemoCard label="Few Pages (no ellipsis)"><Pagination currentPage={page5} totalPages={5} onPageChange={setPage5} /></DemoCard>
          <DemoCard label="Many Pages"><Pagination currentPage={page6} totalPages={100} onPageChange={setPage6} showFirstLast /></DemoCard>
        </div>
      </Section>

      <Section
        title="Custom Labels"
        description="Replace arrow icons with text labels for accessibility."
        code={`<Pagination
  currentPage={page}
  totalPages={20}
  onPageChange={setPage}
  prevLabel="← Previous"
  nextLabel="Next →"
  showPageInfo
/>`}
      >
        <Pagination
          currentPage={page1}
          totalPages={20}
          onPageChange={setPage1}
          prevLabel={<span style={{ fontFamily: "var(--font-button)", fontSize: "var(--text-button)", fontWeight: "var(--weight-button)" }}>← Prev</span>}
          nextLabel={<span style={{ fontFamily: "var(--font-button)", fontSize: "var(--text-button)", fontWeight: "var(--weight-button)" }}>Next →</span>}
          showPageInfo
        />
      </Section>
    </div>
  );
}
