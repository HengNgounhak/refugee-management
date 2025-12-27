import { useState } from "react";
import { Check, Users, Package, BoxIcon, Plus, Trash2 } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface Family {
  id: string;
  name: string;
  householdSize: number;
  confirmed: boolean;
}

interface AllocatedItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
}

interface RequestItem {
  id: string;
  itemType: string;
  quantity: number;
}

const allocatedItems: AllocatedItem[] = [
  { id: "1", name: "អង្ករ (កញ្ចប់ ១០គក)", quantity: 1, unit: "កញ្ចប់" },
  { id: "2", name: "ប្រេងឆា (២លីត្រ)", quantity: 2, unit: "ដប" },
  { id: "3", name: "ភួយ", quantity: 2, unit: "សន្លឹក" },
  { id: "4", name: "សម្ភារៈអនាម័យ", quantity: 1, unit: "កញ្ចប់" },
];

const mockFamilies: Family[] = [
  { id: "FAM-001", name: "គ្រួសារ សុខ សារ៉េត", householdSize: 5, confirmed: false },
  { id: "FAM-002", name: "គ្រួសារ ចាន់ សុភា", householdSize: 3, confirmed: false },
  { id: "FAM-003", name: "គ្រួសារ វណ្ណ ដារ៉ា", householdSize: 7, confirmed: false },
  { id: "FAM-004", name: "គ្រួសារ សុខ មករា", householdSize: 4, confirmed: false },
  { id: "FAM-005", name: "គ្រួសារ រស្មី សុភាព", householdSize: 6, confirmed: false },
];

const itemTypes = [
  "អង្ករ (១០គក)",
  "ប្រេងឆា (២លីត្រ)",
  "ភួយ",
  "សម្ភារៈអនាម័យ",
  "សម្ភារៈឱសថ",
  "ធុងទឹក",
  "សម្ភារៈចម្អិនអាហារ",
  "ក្រណាត់កំបោរ",
  "ពូក",
  "សម្លៀកបំពាក់",
];

export default function ConfirmItems() {
  const [families, setFamilies] = useState<Family[]>(mockFamilies);
  const [items, setItems] = useState<RequestItem[]>([{ id: "1", itemType: "", quantity: 1 }]);
  const { toast } = useToast();

  const toggleConfirm = (id: string) => {
    setFamilies(families.map(family =>
      family.id === id ? { ...family, confirmed: !family.confirmed } : family
    ));
  };

  const addItem = () => {
    setItems([...items, { id: Date.now().toString(), itemType: "", quantity: 1 }]);
  };

  const removeItem = (id: string) => {
    if (items.length > 1) {
      setItems(items.filter((item) => item.id !== id));
    }
  };

  const updateItem = (id: string, field: keyof RequestItem, value: string | number) => {
    setItems(items.map((item) => (item.id === id ? { ...item, [field]: value } : item)));
  };

  const handleSubmit = () => {
    const confirmedCount = families.filter(f => f.confirmed).length;
    if (confirmedCount === 0) {
      toast({
        title: "មិនបានជ្រើសរើស",
        description: "សូមជ្រើសរើសយ៉ាងហោចណាស់មួយគ្រួសារដើម្បីបញ្ជាក់។",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "បានបញ្ជាក់សម្ភារៈដោយជោគជ័យ",
      description: `${confirmedCount} គ្រួសារបានបញ្ជាក់ការទទួលសម្ភារៈ។`,
    });
    setFamilies(families.map(f => ({ ...f, confirmed: false })));
  };

  const confirmedCount = families.filter(f => f.confirmed).length;

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="បញ្ជាក់ការទទួលសម្ភារៈ"
        description="សម្គាល់គ្រួសារដែលបានទទួលសម្ភារៈរបស់ពួកគេ"
      />

      {/* Allocated Items Section - Prominently displayed at top */}
      <Card className="border-2 border-primary/20 bg-primary/5">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-primary">
            <BoxIcon className="w-6 h-6" />
            សម្ភារៈដែលបានបែងចែក
          </CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            គ្រួសារទាំងអស់នឹងទទួលបានសម្ភារៈដូចគ្នា
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {allocatedItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 p-4 bg-background rounded-lg border shadow-sm"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                  <Package className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-sm">{item.name}</p>
                  <p className="text-xs text-muted-foreground">
                    ចំនួន: {item.quantity} {item.unit}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Items Requested Card - copied from RequestItems.tsx */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Package className="w-5 h-5" />
            សម្ភារៈដែលស្នើសុំ
          </CardTitle>
          <Button variant="outline" size="sm" onClick={addItem}>
            <Plus className="w-4 h-4 mr-2" />
            បន្ថែមសម្ភារៈ
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {items.map((item, index) => (
            <div key={item.id} className="flex gap-3 items-end animate-slide-up">
              <div className="flex-1">
                <Label>សម្ភារៈទី {index + 1}</Label>
                <Select
                  value={item.itemType}
                  onValueChange={(value) => updateItem(item.id, "itemType", value)}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="ជ្រើសរើសប្រភេទសម្ភារៈ" />
                  </SelectTrigger>
                  <SelectContent>
                    {itemTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="w-24">
                <Label>ចំនួន</Label>
                <Input
                  type="number"
                  min={1}
                  value={item.quantity}
                  onChange={(e) => updateItem(item.id, "quantity", parseInt(e.target.value) || 1)}
                  className="mt-2"
                />
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeItem(item.id)}
                disabled={items.length === 1}
                className="text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Family List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            បញ្ជីគ្រួសារ
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            ជ្រើសរើសគ្រួសារដែលបានទទួលសម្ភារៈរួចហើយ
          </p>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-muted/50">
                  <th className="text-left p-3 text-xs uppercase tracking-wider font-semibold text-muted-foreground w-12">
                    <Checkbox
                      checked={families.every(f => f.confirmed)}
                      onCheckedChange={(checked) => {
                        setFamilies(families.map(f => ({ ...f, confirmed: !!checked })));
                      }}
                    />
                  </th>
                  <th className="text-left p-3 text-xs uppercase tracking-wider font-semibold text-muted-foreground">
                    លេខសម្គាល់គ្រួសារ
                  </th>
                  <th className="text-left p-3 text-xs uppercase tracking-wider font-semibold text-muted-foreground">
                    ឈ្មោះ
                  </th>
                  <th className="text-center p-3 text-xs uppercase tracking-wider font-semibold text-muted-foreground">
                    ចំនួនសមាជិក
                  </th>
                  <th className="text-center p-3 text-xs uppercase tracking-wider font-semibold text-muted-foreground">
                    ស្ថានភាព
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {families.map((family) => (
                  <tr
                    key={family.id}
                    className={`hover:bg-muted/30 cursor-pointer transition-colors ${family.confirmed ? 'bg-success/10' : ''}`}
                    onClick={() => toggleConfirm(family.id)}
                  >
                    <td className="p-3" onClick={(e) => e.stopPropagation()}>
                      <Checkbox
                        checked={family.confirmed}
                        onCheckedChange={() => toggleConfirm(family.id)}
                      />
                    </td>
                    <td className="p-3 font-mono text-sm">{family.id}</td>
                    <td className="p-3 font-medium">{family.name}</td>
                    <td className="p-3 text-center">{family.householdSize} នាក់</td>
                    <td className="p-3 text-center">
                      {family.confirmed ? (
                        <Badge variant="success">បានបញ្ជាក់</Badge>
                      ) : (
                        <Badge variant="secondary">រង់ចាំ</Badge>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              បានជ្រើសរើស {confirmedCount} នៃ {families.length} គ្រួសារ
            </p>
            <Button onClick={handleSubmit} disabled={confirmedCount === 0}>
              <Check className="w-4 h-4 mr-2" />
              បញ្ជាក់ការទទួល ({confirmedCount})
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
