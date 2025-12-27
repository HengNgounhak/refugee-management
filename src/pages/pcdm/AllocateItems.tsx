import { useState } from "react";
import { Package, Check, MapPin, History, Plus, Trash2, Calendar, Building } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface InventoryItem {
  id: string;
  name: string;
  available: number;
  unit: string;
}

interface Camp {
  id: string;
  name: string;
  province: string;
  district: string;
}

interface AllocationLineItem {
  id: string;
  itemId: string;
  itemName: string;
  quantity: number;
  unit: string;
  maxAvailable: number;
}

interface AllocationHistory {
  id: string;
  campId: string;
  campName: string;
  items: { itemName: string; quantity: number; unit: string }[];
  date: string;
  status: "completed" | "pending" | "cancelled";
}

const inventory: InventoryItem[] = [
  { id: "1", name: "អង្ករ (១០គីឡូ)", available: 2450, unit: "កញ្ចប់" },
  { id: "2", name: "ប្រេងឆា (២លីត្រ)", available: 1820, unit: "ដប" },
  { id: "3", name: "ភួយ", available: 340, unit: "សន្លឹក" },
  { id: "4", name: "កញ្ចប់ថ្នាំពេទ្យ", available: 45, unit: "កញ្ចប់" },
  { id: "5", name: "កញ្ចប់អនាម័យ", available: 890, unit: "កញ្ចប់" },
  { id: "6", name: "ធុងដាក់ទឹក", available: 156, unit: "ដុំ" },
];

const camps: Camp[] = [
  { id: "1", name: "ជំរំ អាល់ហ្វា", province: "ខេត្ត ក", district: "ស្រុក ១" },
  { id: "2", name: "ជំរំ បេតា", province: "ខេត្ត ក", district: "ស្រុក ២" },
  { id: "3", name: "ជំរំ ហ្គាម៉ា", province: "ខេត្ត ខ", district: "ស្រុក ៣" },
  { id: "4", name: "ជំរំ ដែលតា", province: "ខេត្ត ខ", district: "ស្រុក ៤" },
];

const initialHistory: AllocationHistory[] = [
  {
    id: "1",
    campId: "1",
    campName: "ជំរំ អាល់ហ្វា",
    items: [
      { itemName: "អង្ករ (១០គីឡូ)", quantity: 100, unit: "កញ្ចប់" },
      { itemName: "ប្រេងឆា (២លីត្រ)", quantity: 50, unit: "ដប" },
    ],
    date: "2024-01-20",
    status: "completed",
  },
  {
    id: "2",
    campId: "2",
    campName: "ជំរំ បេតា",
    items: [
      { itemName: "ភួយ", quantity: 30, unit: "សន្លឹក" },
      { itemName: "កញ្ចប់ថ្នាំពេទ្យ", quantity: 10, unit: "កញ្ចប់" },
    ],
    date: "2024-01-19",
    status: "completed",
  },
  {
    id: "3",
    campId: "3",
    campName: "ជំរំ ហ្គាម៉ា",
    items: [
      { itemName: "កញ្ចប់អនាម័យ", quantity: 80, unit: "កញ្ចប់" },
    ],
    date: "2024-01-18",
    status: "pending",
  },
  {
    id: "4",
    campId: "1",
    campName: "ជំរំ អាល់ហ្វា",
    items: [
      { itemName: "ធុងដាក់ទឹក", quantity: 25, unit: "ដុំ" },
    ],
    date: "2024-01-17",
    status: "cancelled",
  },
];

export default function AllocateItems() {
  const [selectedCamp, setSelectedCamp] = useState<string>("");
  const [allocationItems, setAllocationItems] = useState<AllocationLineItem[]>([]);
  const [history, setHistory] = useState<AllocationHistory[]>(initialHistory);
  const { toast } = useToast();

  const selectedCampData = camps.find(c => c.id === selectedCamp);

  const getAvailableItems = () => {
    const usedItemIds = allocationItems.map(ai => ai.itemId);
    return inventory.filter(item => !usedItemIds.includes(item.id));
  };

  const handleAddItem = () => {
    const availableItems = getAvailableItems();
    if (availableItems.length === 0) {
      toast({
        title: "គ្មានទំនិញទេ",
        description: "ទំនិញទាំងអស់ត្រូវបានបន្ថែមក្នុងការបែងចែករួចហើយ។",
        variant: "destructive",
      });
      return;
    }

    const firstAvailable = availableItems[0];
    const newItem: AllocationLineItem = {
      id: Date.now().toString(),
      itemId: firstAvailable.id,
      itemName: firstAvailable.name,
      quantity: 1,
      unit: firstAvailable.unit,
      maxAvailable: firstAvailable.available,
    };
    setAllocationItems([...allocationItems, newItem]);
  };

  const handleRemoveItem = (id: string) => {
    setAllocationItems(allocationItems.filter(item => item.id !== id));
  };

  const handleItemChange = (lineId: string, newItemId: string) => {
    const inventoryItem = inventory.find(i => i.id === newItemId);
    if (!inventoryItem) return;

    setAllocationItems(allocationItems.map(item =>
      item.id === lineId
        ? {
            ...item,
            itemId: newItemId,
            itemName: inventoryItem.name,
            unit: inventoryItem.unit,
            maxAvailable: inventoryItem.available,
            quantity: Math.min(item.quantity, inventoryItem.available),
          }
        : item
    ));
  };

  const handleQuantityChange = (lineId: string, quantity: number) => {
    setAllocationItems(allocationItems.map(item =>
      item.id === lineId
        ? { ...item, quantity: Math.max(1, Math.min(quantity, item.maxAvailable)) }
        : item
    ));
  };

  const handleConfirmAllocation = () => {
    if (!selectedCamp) {
      toast({
        title: "កំហុស",
        description: "សូមជ្រើសរើសជំរំមួយ។",
        variant: "destructive",
      });
      return;
    }

    if (allocationItems.length === 0) {
      toast({
        title: "កំហុស",
        description: "សូមបន្ថែមទំនិញយ៉ាងហោចណាស់មួយដើម្បីបែងចែក។",
        variant: "destructive",
      });
      return;
    }

    const newAllocation: AllocationHistory = {
      id: Date.now().toString(),
      campId: selectedCamp,
      campName: selectedCampData?.name || "",
      items: allocationItems.map(item => ({
        itemName: item.itemName,
        quantity: item.quantity,
        unit: item.unit,
      })),
      date: new Date().toISOString().split("T")[0],
      status: "pending",
    };

    setHistory([newAllocation, ...history]);
    setAllocationItems([]);
    setSelectedCamp("");

    toast({
      title: "ការបែងចែកបានបញ្ជាក់រួចហើយ",
      description: `បានបែងចែកទំនិញ ${allocationItems.length} មុខទៅ ${selectedCampData?.name} ដោយជោគជ័យ។`,
    });
  };

  const getStatusStyles = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-success/10 text-success border-success/20";
      case "pending":
        return "bg-warning/10 text-warning border-warning/20";
      case "cancelled":
        return "bg-destructive/10 text-destructive border-destructive/20";
      default:
        return "";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "completed":
        return "បានបញ្ចប់";
      case "pending":
        return "កំពុងរង់ចាំ";
      case "cancelled":
        return "បានលុបចោល";
      default:
        return status;
    }
  };

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="បែងចែក និងចែកចាយទំនិញ"
        description="គ្រប់គ្រងការបែងចែកទំនិញទៅកាន់ជំរំនានា"
      />

      <Tabs defaultValue="allocate" className="space-y-6">
        <TabsList>
          <TabsTrigger value="allocate" className="flex items-center gap-2">
            <Package className="w-4 h-4" />
            បែងចែកទំនិញ
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2">
            <History className="w-4 h-4" />
            ប្រវត្តិការបែងចែក
          </TabsTrigger>
        </TabsList>

        {/* Allocate Tab */}
        <TabsContent value="allocate">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Select Camp */}
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  ជ្រើសរើសជំរំ
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>ជំរំ *</Label>
                  <Select value={selectedCamp} onValueChange={setSelectedCamp}>
                    <SelectTrigger>
                      <SelectValue placeholder="ជ្រើសរើសជំរំមួយ" />
                    </SelectTrigger>
                    <SelectContent>
                      {camps.map((camp) => (
                        <SelectItem key={camp.id} value={camp.id}>
                          {camp.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedCampData && (
                  <div className="p-4 rounded-lg bg-muted/50 space-y-2">
                    <div className="flex items-center gap-2">
                      <Building className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium">{selectedCampData.name}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <p>ខេត្ត: {selectedCampData.province}</p>
                      <p>ស្រុក: {selectedCampData.district}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Select Items */}
            <Card className="lg:col-span-2">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  ជ្រើសរើសទំនិញ
                </CardTitle>
                <Button onClick={handleAddItem} size="sm" disabled={getAvailableItems().length === 0}>
                  <Plus className="w-4 h-4 mr-2" />
                  បន្ថែមទំនិញ
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {allocationItems.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <Package className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>មិនទាន់មានទំនិញបន្ថែមទេ។</p>
                    <p className="text-sm">ចុច "បន្ថែមទំនិញ" ដើម្បីចាប់ផ្តើមបែងចែក។</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="grid grid-cols-12 gap-4 text-sm font-medium text-muted-foreground px-2">
                      <div className="col-span-5">ទំនិញ</div>
                      <div className="col-span-3">មានក្នុងស្តុក</div>
                      <div className="col-span-3">បរិមាណ</div>
                      <div className="col-span-1"></div>
                    </div>

                    {/* Items */}
                    {allocationItems.map((item) => (
                      <div key={item.id} className="grid grid-cols-12 gap-4 items-center p-3 rounded-lg bg-muted/30">
                        <div className="col-span-5">
                          <Select
                            value={item.itemId}
                            onValueChange={(value) => handleItemChange(item.id, value)}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {inventory
                                .filter(inv => inv.id === item.itemId || !allocationItems.some(ai => ai.itemId === inv.id))
                                .map((inv) => (
                                  <SelectItem key={inv.id} value={inv.id}>
                                    {inv.name}
                                  </SelectItem>
                                ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="col-span-3 text-sm">
                          <span className="font-medium">{item.maxAvailable.toLocaleString()}</span>
                          <span className="text-muted-foreground ml-1">{item.unit}</span>
                        </div>
                        <div className="col-span-3">
                          <Input
                            type="number"
                            min={1}
                            max={item.maxAvailable}
                            value={item.quantity}
                            onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 1)}
                          />
                        </div>
                        <div className="col-span-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                            onClick={() => handleRemoveItem(item.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Summary & Confirm */}
                {allocationItems.length > 0 && (
                  <div className="pt-4 border-t space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">ទំនិញសរុប</span>
                      <span className="font-bold text-lg">{allocationItems.length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">បរិមាណសរុប</span>
                      <span className="font-bold text-lg">
                        {allocationItems.reduce((sum, item) => sum + item.quantity, 0).toLocaleString()}
                      </span>
                    </div>
                    <Button
                      className="w-full"
                      onClick={handleConfirmAllocation}
                      disabled={!selectedCamp || allocationItems.length === 0}
                    >
                      <Check className="w-4 h-4 mr-2" />
                      បញ្ជាក់ការបែងចែក
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* History Tab */}
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <History className="w-5 h-5" />
                ប្រវត្តិការបែងចែក
              </CardTitle>
            </CardHeader>
            <CardContent>
              {history.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <History className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>មិនទាន់មានប្រវត្តិការបែងចែកទេ។</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {history.map((record) => (
                    <div
                      key={record.id}
                      className="p-4 rounded-lg border bg-card hover:bg-muted/30 transition-colors"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <MapPin className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-semibold">{record.campName}</h4>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Calendar className="w-3 h-3" />
                              {new Date(record.date).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                        <Badge className={getStatusStyles(record.status)} variant="outline">
                          {getStatusLabel(record.status)}
                        </Badge>
                      </div>

                      <div className="ml-13 pl-13">
                        <div className="text-sm font-medium text-muted-foreground mb-2">
                          ទំនិញដែលបានបែងចែក:
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {record.items.map((item, idx) => (
                            <Badge key={idx} variant="secondary" className="font-normal">
                              {item.itemName}: {item.quantity} {item.unit}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
