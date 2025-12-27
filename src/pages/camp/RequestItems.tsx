import { useState } from "react";
import { Package, Plus, Trash2, Send } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface RequestItem {
  id: string;
  itemType: string;
  quantity: number;
}

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

export default function RequestItems() {
  const [requestType, setRequestType] = useState<"family" | "group">("family");
  const [familyId, setFamilyId] = useState("");
  const [priority, setPriority] = useState("normal");
  const [items, setItems] = useState<RequestItem[]>([{ id: "1", itemType: "", quantity: 1 }]);
  const [notes, setNotes] = useState("");
  const { toast } = useToast();

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
    const priorityText = priority === "normal" ? "ធម្មតា" : "បន្ទាន់";
    toast({
      title: "បានដាក់សំណើរួចរាល់",
      description: `សំណើសម្ភារៈត្រូវបានផ្ញើទៅ កធម​ ដើម្បីអនុម័ត។ អាទិភាព: ${priorityText}`,
    });
    setFamilyId("");
    setItems([{ id: "1", itemType: "", quantity: 1 }]);
    setNotes("");
    setPriority("normal");
  };

  return (
    <div className="animate-fade-in">
      <PageHeader 
        title="ស្នើសុំសម្ភារៈ" 
        description="ដាក់សំណើសម្ភារៈសម្រាប់គ្រួសារ ឬក្រុម"
      />

      <div className="max-w-2xl space-y-6">
        {/* Items */}
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

        {/* Priority & Notes */}
        <Card>
          <CardHeader>
            <CardTitle>អាទិភាព និងចំណាំ</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label>កម្រិតអាទិភាព</Label>
              <RadioGroup
                value={priority}
                onValueChange={setPriority}
                className="flex gap-4 mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="normal" id="normal" />
                  <Label htmlFor="normal" className="font-normal">ធម្មតា</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="urgent" id="urgent" />
                  <Label htmlFor="urgent" className="font-normal text-urgent">បន្ទាន់</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label htmlFor="notes">ចំណាំបន្ថែម (ជាជម្រើស)</Label>
              <Textarea
                id="notes"
                placeholder="បន្ថែមបរិបទ ឬមូលហេតុបន្ថែម..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="mt-2"
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Submit */}
        <Button className="w-full" size="lg" onClick={handleSubmit}>
          <Send className="w-4 h-4 mr-2" />
          ដាក់សំណើ
        </Button>
      </div>
    </div>
  );
}
