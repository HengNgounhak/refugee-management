import { useState } from "react";
import { GripVertical, Eye, Settings, Plus, Trash2, User } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface FormField {
  id: string;
  label: string;
  type: string;
  required: boolean;
  visibleTo: string[];
}

const initialFields: FormField[] = [
  { id: "1", label: "ឈ្មោះពេញ", type: "text", required: true, visibleTo: ["camp", "pcdm", "ncdm"] },
  { id: "2", label: "អ៊ីមែល", type: "email", required: true, visibleTo: ["camp", "pcdm", "ncdm"] },
  { id: "3", label: "លេខទូរស័ព្ទ", type: "tel", required: false, visibleTo: ["camp", "pcdm", "ncdm"] },
  { id: "4", label: "តួនាទី", type: "select", required: true, visibleTo: ["pcdm", "ncdm"] },
  { id: "5", label: "ជំរំដែលបានចាត់តាំង", type: "select", required: false, visibleTo: ["pcdm", "ncdm"] },
];

export default function FormBuilderUser() {
  const [fields, setFields] = useState<FormField[]>(initialFields);
  const [previewMode, setPreviewMode] = useState(false);

  const toggleRequired = (id: string) => {
    setFields(fields.map(f => f.id === id ? { ...f, required: !f.required } : f));
  };

  const toggleVisibility = (id: string, role: string) => {
    setFields(fields.map(f => {
      if (f.id !== id) return f;
      const visibleTo = f.visibleTo.includes(role)
        ? f.visibleTo.filter(r => r !== role)
        : [...f.visibleTo, role];
      return { ...f, visibleTo };
    }));
  };

  const removeField = (id: string) => {
    setFields(fields.filter(f => f.id !== id));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="ទម្រង់ចុះឈ្មោះអ្នកប្រើប្រាស់"
        description="កំណត់រចនាសម្ព័ន្ធវាលទម្រង់ចុះឈ្មោះអ្នកប្រើប្រាស់"
      />

      <Tabs defaultValue="builder">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="builder">
              <Settings className="w-4 h-4 mr-2" />
              កម្មវិធីបង្កើត
            </TabsTrigger>
            <TabsTrigger value="preview">
              <Eye className="w-4 h-4 mr-2" />
              មើលជាមុន
            </TabsTrigger>
          </TabsList>
          <Button variant="outline" size="sm">
            <Plus className="w-4 h-4 mr-2" />
            បន្ថែមវាល
          </Button>
        </div>

        <TabsContent value="builder" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                វាលទម្រង់
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {fields.map((field) => (
                <div
                  key={field.id}
                  className="flex items-center gap-4 p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
                >
                  <GripVertical className="w-5 h-5 text-muted-foreground cursor-grab" />
                  <div className="flex-1">
                    <p className="font-medium">{field.label}</p>
                    <p className="text-sm text-muted-foreground">ប្រភេទ៖ {field.type}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Label className="text-xs text-muted-foreground">ចាំបាច់</Label>
                    <Switch checked={field.required} onCheckedChange={() => toggleRequired(field.id)} />
                  </div>
                  {/* <div className="flex gap-1">
                    {["camp", "pcdm", "ncdm"].map((role) => (
                      <Button
                        key={role}
                        variant={field.visibleTo.includes(role) ? "default" : "outline"}
                        size="sm"
                        className="text-xs h-7"
                        onClick={() => toggleVisibility(field.id, role)}
                      >
                        {role.toUpperCase()}
                      </Button>
                    ))}
                  </div> */}
                  <Button variant="ghost" size="icon" onClick={() => removeField(field.id)}>
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preview" className="mt-6">
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle>មើលជាមុនការចុះឈ្មោះអ្នកប្រើប្រាស់</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {fields.filter(f => f.visibleTo.includes("camp")).map((field) => (
                <div key={field.id}>
                  <Label>
                    {field.label} {field.required && <span className="text-destructive">*</span>}
                  </Label>
                  {field.type === "select" ? (
                    <Select>
                      <SelectTrigger><SelectValue placeholder={`ជ្រើសរើស${field.label.toLowerCase()}`} /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="option1">ជម្រើសទី ១</SelectItem>
                        <SelectItem value="option2">ជម្រើសទី ២</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <Input type={field.type} placeholder={`បញ្ចូល${field.label.toLowerCase()}`} />
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
