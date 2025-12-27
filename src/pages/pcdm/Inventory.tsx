import { useState } from "react";
import { Search, Plus, Edit, Package, AlertTriangle, Calendar } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  source: string;
  expiryDate?: string;
  status: "adequate" | "low" | "critical";
}

const inventoryData: InventoryItem[] = [
  { id: "1", name: "អង្ករ (១០គីឡូ)", quantity: 2450, unit: "កញ្ចប់", source: "WFP", status: "adequate" },
  { id: "2", name: "ប្រេងឆា (២លីត្រ)", quantity: 1820, unit: "ដប", source: "UNHCR", status: "adequate" },
  { id: "3", name: "ភួយ", quantity: 340, unit: "សន្លឹក", source: "កាកបាទក្រហម", status: "low" },
  { id: "4", name: "កញ្ចប់ឱសថ", quantity: 45, unit: "កញ្ចប់", source: "WHO", expiryDate: "2024-06-30", status: "critical" },
  { id: "5", name: "កញ្ចប់អនាម័យ", quantity: 890, unit: "កញ្ចប់", source: "UNICEF", status: "adequate" },
  { id: "6", name: "ធុងទឹក", quantity: 156, unit: "ធុង", source: "អ្នកបរិច្ចាគក្នុងស្រុក", status: "low" },
];

export default function Inventory() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const { toast } = useToast();

  const filteredInventory = inventoryData.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.source.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const statusStyles = {
    adequate: "bg-success/10 text-success border-success/20",
    low: "bg-warning/10 text-warning border-warning/20",
    critical: "bg-destructive/10 text-destructive border-destructive/20",
  };

  const statusLabels = {
    adequate: "គ្រប់គ្រាន់",
    low: "ទាប",
    critical: "ធ្ងន់ធ្ងរ",
  };

  const handleAddStock = () => {
    toast({
      title: "បានបន្ថែមស្តុក",
      description: "សន្និធិថ្មីត្រូវបានបន្ថែមដោយជោគជ័យ។",
    });
    setIsAddDialogOpen(false);
  };

  const columns = [
    {
      key: "name",
      header: "ទំនិញ",
      render: (item: InventoryItem) => (
        <div className="flex items-center gap-2">
          <Package className="w-4 h-4 text-muted-foreground" />
          <span className="font-medium">{item.name}</span>
        </div>
      ),
    },
    {
      key: "quantity",
      header: "បរិមាណ",
      render: (item: InventoryItem) => (
        <div>
          <span className="font-bold">{item.quantity.toLocaleString()}</span>
          <span className="text-muted-foreground ml-1">{item.unit}</span>
        </div>
      ),
    },
    { key: "source", header: "ប្រភព" },
    {
      key: "expiryDate",
      header: "កាលផុតកំណត់",
      render: (item: InventoryItem) =>
        item.expiryDate ? (
          <div className="flex items-center gap-1 text-warning">
            <Calendar className="w-4 h-4" />
            <span>{new Date(item.expiryDate).toLocaleDateString()}</span>
          </div>
        ) : (
          <span className="text-muted-foreground">គ្មាន</span>
        ),
    },
    {
      key: "status",
      header: "ស្ថានភាព",
      render: (item: InventoryItem) => (
        <Badge className={statusStyles[item.status]} variant="outline">
          {item.status === "critical" && <AlertTriangle className="w-3 h-3 mr-1" />}
          {statusLabels[item.status]}
        </Badge>
      ),
    },
    {
      key: "actions",
      header: "សកម្មភាព",
      render: () => (
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Edit className="w-4 h-4" />
        </Button>
      ),
    },
  ];

  return (
    <div className="animate-fade-in">
      <PageHeader title="គ្រប់គ្រងសន្និធិ" description="តាមដាន និងគ្រប់គ្រងសម្ភារៈសង្គ្រោះ">
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              បន្ថែមស្តុក
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>បន្ថែមស្តុកថ្មី</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label>ប្រភេទទំនិញ</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="ជ្រើសរើសទំនិញ" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rice">អង្ករ (១០គីឡូ)</SelectItem>
                    <SelectItem value="oil">ប្រេងឆា (២លីត្រ)</SelectItem>
                    <SelectItem value="blankets">ភួយ</SelectItem>
                    <SelectItem value="medicine">កញ្ចប់ឱសថ</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>បរិមាណ</Label>
                <Input type="number" placeholder="បញ្ចូលបរិមាណ" />
              </div>
              <div className="space-y-2">
                <Label>ប្រភព / អ្នកបរិច្ចាគ</Label>
                <Input placeholder="បញ្ចូលប្រភព" />
              </div>
              <div className="space-y-2">
                <Label>កាលផុតកំណត់ (បើមាន)</Label>
                <Input type="date" />
              </div>
              <Button className="w-full" onClick={handleAddStock}>
                <Plus className="w-4 h-4 mr-2" />
                បន្ថែមទៅសន្និធិ
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </PageHeader>

      {/* កាតសង្ខេប */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <Card className="p-4 bg-success/5 border-success/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
              <Package className="w-5 h-5 text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold text-success">
                {inventoryData.filter((i) => i.status === "adequate").length}
              </p>
              <p className="text-sm text-muted-foreground">ស្តុកគ្រប់គ្រាន់</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 bg-warning/5 border-warning/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-warning" />
            </div>
            <div>
              <p className="text-2xl font-bold text-warning">
                {inventoryData.filter((i) => i.status === "low").length}
              </p>
              <p className="text-sm text-muted-foreground">ស្តុកទាប</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 bg-destructive/5 border-destructive/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-destructive" />
            </div>
            <div>
              <p className="text-2xl font-bold text-destructive">
                {inventoryData.filter((i) => i.status === "critical").length}
              </p>
              <p className="text-sm text-muted-foreground">ធ្ងន់ធ្ងរ</p>
            </div>
          </div>
        </Card>
      </div>

      {/* ស្វែងរក និងតារាង */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="ស្វែងរកសន្និធិ..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      <DataTable columns={columns} data={filteredInventory} />
    </div>
  );
}
