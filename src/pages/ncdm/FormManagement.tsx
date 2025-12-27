import { useState } from "react";
import { GripVertical, Eye, Plus, Settings, Trash2, ToggleLeft, Save } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

interface FormField {
  id: string;
  label: string;
  type: string;
  required: boolean;
  visibleTo: string[];
}

const initialFields: FormField[] = [
  { id: "1", label: "National ID", type: "Text", required: true, visibleTo: ["camp", "pcdm", "ncdm"] },
  { id: "2", label: "Head of Household Name", type: "Text", required: true, visibleTo: ["camp", "pcdm", "ncdm"] },
  { id: "3", label: "Phone Number", type: "Phone", required: false, visibleTo: ["camp", "pcdm"] },
  { id: "4", label: "Gender", type: "Radio", required: true, visibleTo: ["camp", "pcdm", "ncdm"] },
  { id: "5", label: "Has Disability", type: "Toggle", required: true, visibleTo: ["camp", "pcdm", "ncdm"] },
  { id: "6", label: "Disability Type", type: "Dropdown", required: false, visibleTo: ["camp", "pcdm"] },
  { id: "7", label: "Household Size", type: "Number", required: true, visibleTo: ["camp", "pcdm", "ncdm"] },
];

const fieldTypes = ["Text", "Number", "Phone", "Email", "Date", "Radio", "Dropdown", "Toggle", "Textarea"];

export default function FormManagement() {
  const [fields, setFields] = useState<FormField[]>(initialFields);
  const [previewRole, setPreviewRole] = useState<"camp" | "pcdm">("camp");
  const { toast } = useToast();

  const toggleRequired = (id: string) => {
    setFields(fields.map(f => 
      f.id === id ? { ...f, required: !f.required } : f
    ));
  };

  const toggleVisibility = (id: string, role: string) => {
    setFields(fields.map(f => {
      if (f.id === id) {
        const visibleTo = f.visibleTo.includes(role)
          ? f.visibleTo.filter(r => r !== role)
          : [...f.visibleTo, role];
        return { ...f, visibleTo };
      }
      return f;
    }));
  };

  const removeField = (id: string) => {
    setFields(fields.filter(f => f.id !== id));
  };

  const handleSave = () => {
    toast({
      title: "Form Saved",
      description: "Registration form configuration has been updated.",
    });
  };

  const visibleFields = fields.filter(f => f.visibleTo.includes(previewRole));

  return (
    <div className="animate-fade-in">
      <PageHeader 
        title="Registration Form Management" 
        description="Configure the family registration form fields"
      >
        <Button onClick={handleSave}>
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </PageHeader>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form Builder */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Form Fields
            </CardTitle>
            <Button variant="outline" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Field
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {fields.map((field) => (
              <div
                key={field.id}
                className="flex items-center gap-3 p-3 rounded-lg border bg-card hover:bg-muted/30 transition-colors"
              >
                <GripVertical className="w-4 h-4 text-muted-foreground cursor-grab" />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{field.label}</span>
                    <Badge variant="secondary" className="text-xs">{field.type}</Badge>
                    {field.required && <Badge variant="outline" className="text-xs">Required</Badge>}
                  </div>
                  <div className="flex gap-2 mt-2">
                    {["camp", "pcdm", "ncdm"].map((role) => (
                      <button
                        key={role}
                        onClick={() => toggleVisibility(field.id, role)}
                        className={`text-xs px-2 py-0.5 rounded transition-colors ${
                          field.visibleTo.includes(role)
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {role.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <ToggleLeft className="w-4 h-4 text-muted-foreground" />
                    <Switch
                      checked={field.required}
                      onCheckedChange={() => toggleRequired(field.id)}
                    />
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                    onClick={() => removeField(field.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Preview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5" />
              Preview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={previewRole} onValueChange={(v) => setPreviewRole(v as "camp" | "pcdm")}>
              <TabsList className="mb-4">
                <TabsTrigger value="camp">Camp View</TabsTrigger>
                <TabsTrigger value="pcdm">PCDM View</TabsTrigger>
              </TabsList>
              <TabsContent value={previewRole} className="space-y-4">
                {visibleFields.map((field) => (
                  <div key={field.id} className="space-y-2">
                    <label className="text-sm font-medium">
                      {field.label}
                      {field.required && <span className="text-destructive ml-1">*</span>}
                    </label>
                    {field.type === "Toggle" ? (
                      <div className="flex items-center gap-2">
                        <Switch disabled />
                        <span className="text-sm text-muted-foreground">Yes / No</span>
                      </div>
                    ) : field.type === "Radio" ? (
                      <div className="flex gap-4">
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded-full border" />
                          <span className="text-sm text-muted-foreground">Option 1</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded-full border" />
                          <span className="text-sm text-muted-foreground">Option 2</span>
                        </div>
                      </div>
                    ) : field.type === "Dropdown" ? (
                      <div className="h-10 rounded-md border bg-muted/50 flex items-center px-3 text-muted-foreground text-sm">
                        Select option...
                      </div>
                    ) : field.type === "Textarea" ? (
                      <div className="h-20 rounded-md border bg-muted/50" />
                    ) : (
                      <div className="h-10 rounded-md border bg-muted/50" />
                    )}
                  </div>
                ))}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
