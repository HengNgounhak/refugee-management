import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, AlertCircle, ChevronLeft, ChevronRight, Search, User, Users as UsersIcon } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const steps = [
  { id: 1, title: "ផ្ទៀងផ្ទាត់អត្តសញ្ញាណ", description: "ពិនិត្យអត្តសញ្ញាណប័ណ្ណ និងស្វែងរកស្ទួន" },
  { id: 2, title: "ប្រវត្តិគ្រួសារ", description: "បញ្ចូលព័ត៌មានគ្រួសារ" },
  { id: 3, title: "ពិនិត្យ និងដាក់ស្នើ", description: "បញ្ជាក់ និងចុះឈ្មោះ" },
];

export default function RegisterFamily() {
  const [currentStep, setCurrentStep] = useState(1);
  const [duplicateWarning, setDuplicateWarning] = useState(false);
  const [formData, setFormData] = useState({
    nationalId: "",
    phoneNumber: "",
    headOfHousehold: "",
    peopleMale: 0,
    peopleFemale: 0,
    disabilityMale: 0,
    disabilityFemale: 0,
    pregnancy: 0,
    children: 0,
    elderly: 0,
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleCheckDuplicate = () => {
    // Simulate duplicate check
    if (formData.nationalId === "123456789") {
      setDuplicateWarning(true);
    } else {
      setDuplicateWarning(false);
      toast({
        title: "ការផ្ទៀងផ្ទាត់បានជោគជ័យ",
        description: "រកមិនឃើញកំណត់ត្រាស្ទួនទេ។ អ្នកអាចបន្តបាន។",
      });
    }
  };

  const handleSubmit = () => {
    toast({
      title: "ចុះឈ្មោះគ្រួសារបានជោគជ័យ",
      description: `លេខសម្គាល់គ្រួសារ: FAM-${Date.now().toString().slice(-6)} ត្រូវបានបង្កើត។`,
    });
    navigate("/camp/families");
  };

  return (
    <div className="animate-fade-in">
      <PageHeader 
        title="ចុះឈ្មោះគ្រួសារភៀសខ្លួន" 
        description="បំពេញដំណើរការចុះឈ្មោះសម្រាប់គ្រួសារថ្មី"
      />

      {/* Step Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between max-w-2xl">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "step-indicator",
                    currentStep > step.id && "completed",
                    currentStep === step.id && "active",
                    currentStep < step.id && "pending"
                  )}
                >
                  {currentStep > step.id ? <Check className="w-4 h-4" /> : step.id}
                </div>
                <div className="mt-2 text-center">
                  <p className={cn("text-sm font-medium", currentStep >= step.id ? "text-foreground" : "text-muted-foreground")}>
                    {step.title}
                  </p>
                  <p className="text-xs text-muted-foreground hidden sm:block">{step.description}</p>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className={cn(
                  "w-16 sm:w-24 h-0.5 mx-2 mt-[-1.5rem]",
                  currentStep > step.id ? "bg-success" : "bg-border"
                )} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <Card className="max-w-2xl">
        {currentStep === 1 && (
          <>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="w-5 h-5" />
                ផ្ទៀងផ្ទាត់អត្តសញ្ញាណ
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="nationalId">លេខអត្តសញ្ញាណប័ណ្ណ</Label>
                <Input
                  id="nationalId"
                  placeholder="បញ្ចូលលេខអត្តសញ្ញាណប័ណ្ណ"
                  value={formData.nationalId}
                  onChange={(e) => setFormData({ ...formData, nationalId: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">លេខទូរស័ព្ទ</Label>
                <Input
                  id="phone"
                  placeholder="បញ្ចូលលេខទូរស័ព្ទ"
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                />
              </div>
              <Button onClick={handleCheckDuplicate} variant="secondary" className="w-full">
                <Search className="w-4 h-4 mr-2" />
                ពិនិត្យរកស្ទួន
              </Button>
              {duplicateWarning && (
                <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-destructive">រកឃើញកំណត់ត្រាស្ទួន</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      គ្រួសារដែលមានលេខអត្តសញ្ញាណប័ណ្ណនេះមានរួចហើយក្នុងប្រព័ន្ធ។ សូមផ្ទៀងផ្ទាត់ព័ត៌មានម្តងទៀត។
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </>
        )}

        {currentStep === 2 && (
          <>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                ប្រវត្តិគ្រួសារ
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="head">ឈ្មោះមេគ្រួសារ</Label>
                <Input
                  id="head"
                  placeholder="បញ្ចូលឈ្មោះពេញ"
                  value={formData.headOfHousehold}
                  onChange={(e) => setFormData({ ...formData, headOfHousehold: e.target.value })}
                />
              </div>

              {/* Family Members Section */}
              <div className="space-y-4 p-4 rounded-lg bg-muted/50">
                <h3 className="font-semibold text-foreground">សមាជិកគ្រួសារ</h3>
                
                {/* People (Male / Female) */}
                <div className="space-y-2">
                  <Label>ប្រជាជន (ប្រុស / ស្រី)</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <Label className="text-sm text-muted-foreground">ប្រុស</Label>
                      <Input
                        type="number"
                        min={0}
                        value={formData.peopleMale}
                        onChange={(e) => setFormData({ ...formData, peopleMale: parseInt(e.target.value) || 0 })}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-sm text-muted-foreground">ស្រី</Label>
                      <Input
                        type="number"
                        min={0}
                        value={formData.peopleFemale}
                        onChange={(e) => setFormData({ ...formData, peopleFemale: parseInt(e.target.value) || 0 })}
                      />
                    </div>
                  </div>
                </div>

                {/* Disability (Male / Female) */}
                <div className="space-y-2">
                  <Label>ពិការភាព (ប្រុស / ស្រី)</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <Label className="text-sm text-muted-foreground">ប្រុស</Label>
                      <Input
                        type="number"
                        min={0}
                        value={formData.disabilityMale}
                        onChange={(e) => setFormData({ ...formData, disabilityMale: parseInt(e.target.value) || 0 })}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-sm text-muted-foreground">ស្រី</Label>
                      <Input
                        type="number"
                        min={0}
                        value={formData.disabilityFemale}
                        onChange={(e) => setFormData({ ...formData, disabilityFemale: parseInt(e.target.value) || 0 })}
                      />
                    </div>
                  </div>
                </div>

                {/* Pregnancy */}
                <div className="space-y-2">
                  <Label>ស្ត្រីមានផ្ទៃពោះ</Label>
                  <Input
                    type="number"
                    min={0}
                    value={formData.pregnancy}
                    onChange={(e) => setFormData({ ...formData, pregnancy: parseInt(e.target.value) || 0 })}
                    className="max-w-[200px]"
                  />
                </div>

                {/* Children */}
                <div className="space-y-2">
                  <Label>កុមារ</Label>
                  <Input
                    type="number"
                    min={0}
                    value={formData.children}
                    onChange={(e) => setFormData({ ...formData, children: parseInt(e.target.value) || 0 })}
                    className="max-w-[200px]"
                  />
                </div>

                {/* Elderly */}
                <div className="space-y-2">
                  <Label>មនុស្សចាស់</Label>
                  <Input
                    type="number"
                    min={0}
                    value={formData.elderly}
                    onChange={(e) => setFormData({ ...formData, elderly: parseInt(e.target.value) || 0 })}
                    className="max-w-[200px]"
                  />
                </div>
              </div>
            </CardContent>
          </>
        )}

        {currentStep === 3 && (
          <>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UsersIcon className="w-5 h-5" />
                ពិនិត្យ និងដាក់ស្នើ
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg border divide-y">
                  <div className="flex justify-between p-3">
                    <span className="text-muted-foreground">អត្តសញ្ញាណប័ណ្ណ</span>
                    <span className="font-medium">{formData.nationalId || "—"}</span>
                  </div>
                  <div className="flex justify-between p-3">
                    <span className="text-muted-foreground">លេខទូរស័ព្ទ</span>
                    <span className="font-medium">{formData.phoneNumber || "—"}</span>
                  </div>
                  <div className="flex justify-between p-3">
                    <span className="text-muted-foreground">ឈ្មោះមេគ្រួសារ</span>
                    <span className="font-medium">{formData.headOfHousehold || "—"}</span>
                  </div>
                  <div className="flex justify-between p-3">
                    <span className="text-muted-foreground">ប្រជាជន (ប្រុស / ស្រី)</span>
                    <span className="font-medium">{formData.peopleMale} / {formData.peopleFemale}</span>
                  </div>
                  <div className="flex justify-between p-3">
                    <span className="text-muted-foreground">ពិការភាព (ប្រុស / ស្រី)</span>
                    <span className="font-medium">{formData.disabilityMale} / {formData.disabilityFemale}</span>
                  </div>
                  <div className="flex justify-between p-3">
                    <span className="text-muted-foreground">ស្ត្រីមានផ្ទៃពោះ</span>
                    <span className="font-medium">{formData.pregnancy}</span>
                  </div>
                  <div className="flex justify-between p-3">
                    <span className="text-muted-foreground">កុមារ</span>
                    <span className="font-medium">{formData.children}</span>
                  </div>
                  <div className="flex justify-between p-3">
                    <span className="text-muted-foreground">មនុស្សចាស់</span>
                    <span className="font-medium">{formData.elderly}</span>
                  </div>
                  <div className="flex justify-between p-3 bg-muted/30">
                    <span className="text-muted-foreground font-medium">សមាជិកសរុប</span>
                    <span className="font-bold">{formData.peopleMale + formData.peopleFemale} នាក់</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </>
        )}

        {/* Navigation */}
        <div className="flex justify-between p-6 border-t">
          <Button
            variant="outline"
            onClick={() => setCurrentStep(currentStep - 1)}
            disabled={currentStep === 1}
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            ថយក្រោយ
          </Button>
          {currentStep < 3 ? (
            <Button onClick={() => setCurrentStep(currentStep + 1)}>
              បន្ទាប់
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button onClick={handleSubmit}>
              <Check className="w-4 h-4 mr-2" />
              ដាក់ស្នើការចុះឈ្មោះ
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}
