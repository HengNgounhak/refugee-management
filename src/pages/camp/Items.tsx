import { useState } from "react";
import { Package, Download, Plus } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface Item {
  id: string;
  name: string;
  quantityRemaining: number;
  capacity: number;
  unit: string;
  lastUpdated: string;
}

const itemsList: Item[] = [
  { id: "1", name: "អង្ករ (កញ្ចប់ ១០គក)", quantityRemaining: 2450, capacity: 3000, unit: "កញ្ចប់", lastUpdated: "2024-01-25" },
  { id: "2", name: "ប្រេងឆា (២លីត្រ)", quantityRemaining: 1820, capacity: 2000, unit: "ដប", lastUpdated: "2024-01-24" },
  { id: "3", name: "ភួយ", quantityRemaining: 340, capacity: 1000, unit: "សន្លឹក", lastUpdated: "2024-01-23" },
  { id: "4", name: "សម្ភារៈអនាម័យ", quantityRemaining: 890, capacity: 1500, unit: "កញ្ចប់", lastUpdated: "2024-01-22" },
  { id: "5", name: "សម្ភារៈឱសថ", quantityRemaining: 45, capacity: 500, unit: "កញ្ចប់", lastUpdated: "2024-01-21" },
];

export default function Items() {
  const getStockStatus = (item: Item) => {
    const percentage = (item.quantityRemaining / item.capacity) * 100;
    if (percentage < 20) return { label: "ស្តុកទាប", variant: "destructive" as const };
    if (percentage < 40) return { label: "ព្រមាន", variant: "warning" as const };
    return { label: "គ្រប់គ្រាន់", variant: "success" as const };
  };

  const columns = [
    {
      key: "name",
      header: "ឈ្មោះសម្ភារៈ",
      render: (item: Item) => (
        <div className="flex items-center gap-2">
          <Package className="w-4 h-4 text-muted-foreground" />
          <span className="font-medium">{item.name}</span>
        </div>
      ),
    },
    {
      key: "quantityRemaining",
      header: "ចំនួនសល់",
      render: (item: Item) => (
        <span className="font-medium">
          {item.quantityRemaining.toLocaleString()} {item.unit}
        </span>
      ),
    },
    {
      key: "capacity",
      header: "សមត្ថភាពផ្ទុក",
      render: (item: Item) => (
        <span className="text-muted-foreground">
          {item.capacity.toLocaleString()} {item.unit}
        </span>
      ),
    },
    {
      key: "progress",
      header: "កម្រិតស្តុក",
      render: (item: Item) => {
        const percentage = (item.quantityRemaining / item.capacity) * 100;
        const status = getStockStatus(item);
        return (
          <div className="w-32">
            <Progress
              value={percentage}
              className={`h-2 ${status.variant === 'destructive' ? '[&>div]:bg-destructive' : status.variant === 'warning' ? '[&>div]:bg-warning' : '[&>div]:bg-success'}`}
            />
            <span className="text-xs text-muted-foreground">{percentage.toFixed(0)}%</span>
          </div>
        );
      },
    },
    {
      key: "status",
      header: "ស្ថានភាព",
      render: (item: Item) => {
        const status = getStockStatus(item);
        return <Badge variant={status.variant}>{status.label}</Badge>;
      },
    },
    {
      key: "lastUpdated",
      header: "កាលបរិច្ឆេទធ្វើបច្ចុប្បន្នភាព",
      render: (item: Item) => new Date(item.lastUpdated).toLocaleDateString(),
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="សម្ភារៈ"
        description="មើលសម្ភារៈដែលមាន និងកម្រិតស្តុក"
      >
        <div className="flex gap-2">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            ទទួលសម្ភារៈពី PCDM
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            នាំចេញ
          </Button>
        </div>
      </PageHeader>

      {/* Items Table */}
      <DataTable
        columns={columns}
        data={itemsList}
        emptyMessage="រកមិនឃើញសម្ភារៈ"
      />
    </div>
  );
}
