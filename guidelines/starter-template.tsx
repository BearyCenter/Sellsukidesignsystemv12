/**
 * Sellsuki Design System — Starter Template
 *
 * Copy this file to start a new page/feature with Sellsuki DS.
 *
 * Setup:
 *   npm install @uxuissk/design-system
 *   // Add to your root: import "@uxuissk/design-system/styles.css"
 */

import "@uxuissk/design-system/styles.css";
import {
  // Layout
  TopNavbar,
  Sidebar,
  Divider,

  // Data Entry
  DSButton,
  DSInput,
  SearchField,
  Dropdown,

  // Data Display
  DSTable,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Badge,
  Avatar,
  EmptyState,
  Skeleton,

  // Navigation
  Breadcrumb,
  Tabs,
  Pagination,

  // Feedback
  Alert,
  Modal,
  toast,
  ToastContainer,
  Spinner,
} from "@uxuissk/design-system";
import { useState } from "react";

// ─── Sidebar Config ─────────────────────────────────────────────────────────

const sidebarGroups = [
  {
    label: "เมนูหลัก",
    items: [
      { id: "dashboard", label: "Dashboard", icon: "LayoutDashboard" },
      { id: "orders", label: "ออเดอร์", icon: "ShoppingCart" },
      { id: "products", label: "สินค้า", icon: "Package" },
      { id: "customers", label: "ลูกค้า", icon: "Users" },
    ],
  },
  {
    label: "ตั้งค่า",
    items: [
      { id: "settings", label: "ตั้งค่าร้าน", icon: "Settings" },
    ],
  },
];

// ─── Page Component ─────────────────────────────────────────────────────────

export default function StarterPage() {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("all");

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Top Navigation */}
      <TopNavbar
        brand={{ name: "Sellsuki" }}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Page Title" },
        ]}
        showSearch
        user={{ name: "Admin", avatar: "" }}
      />

      <div className="flex">
        {/* Sidebar */}
        <Sidebar
          brand={{ name: "Sellsuki" }}
          groups={sidebarGroups}
          activeItem="dashboard"
        />

        {/* Main Content */}
        <main className="flex-1 p-6 space-y-8">
          {/* Page Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-[var(--foreground)]">
                Page Title
              </h1>
              <p className="text-[var(--muted-foreground)] mt-1">
                Page description here
              </p>
            </div>
            <DSButton variant="primary" size="md">
              Primary Action
            </DSButton>
          </div>

          {/* Filters */}
          <Card>
            <CardBody>
              <div className="flex gap-4 items-end">
                <SearchField
                  placeholder="ค้นหา..."
                  onSearch={(val) => console.log(val)}
                />
                <Dropdown
                  options={[
                    { value: "all", label: "ทั้งหมด" },
                    { value: "active", label: "Active" },
                    { value: "inactive", label: "Inactive" },
                  ]}
                  placeholder="สถานะ"
                />
              </div>
            </CardBody>
          </Card>

          {/* Content */}
          <Card>
            <CardHeader>
              <Tabs
                tabs={[
                  { id: "all", label: "ทั้งหมด" },
                  { id: "pending", label: "รอดำเนินการ" },
                  { id: "completed", label: "สำเร็จ" },
                ]}
                activeTab={activeTab}
                onChange={setActiveTab}
              />
            </CardHeader>
            <CardBody>
              {loading ? (
                <div className="space-y-4">
                  <Skeleton height={40} />
                  <Skeleton height={40} />
                  <Skeleton height={40} />
                </div>
              ) : (
                <DSTable
                  columns={[
                    { key: "id", label: "ID" },
                    { key: "name", label: "Name" },
                    {
                      key: "status",
                      label: "Status",
                      render: (val: string) => (
                        <Badge variant={val === "active" ? "success" : "secondary"}>
                          {val}
                        </Badge>
                      ),
                    },
                  ]}
                  data={[
                    { id: "001", name: "Item 1", status: "active" },
                    { id: "002", name: "Item 2", status: "inactive" },
                  ]}
                  hoverable
                  striped
                />
              )}
            </CardBody>
            <CardFooter>
              <Pagination
                currentPage={1}
                totalPages={10}
                onPageChange={(page) => console.log(page)}
              />
            </CardFooter>
          </Card>

          {/* Empty State (show when no data) */}
          {/* <EmptyState title="ยังไม่มีข้อมูล" description="เริ่มต้นด้วยการเพิ่มรายการใหม่" /> */}

          {/* Error State (show on error) */}
          {/* <Alert variant="error" title="เกิดข้อผิดพลาด">ไม่สามารถโหลดข้อมูลได้ กรุณาลองใหม่อีกครั้ง</Alert> */}
        </main>
      </div>

      {/* Toast Container — add once at root */}
      <ToastContainer />
    </div>
  );
}
