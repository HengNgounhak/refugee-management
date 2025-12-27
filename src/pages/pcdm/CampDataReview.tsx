import { useState } from "react";
import { Search, Download, CheckCircle, Flag, Plus, Building, MapPin, Phone, Save, Eye, Edit, Trash2 } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { StatusBadge } from "@/components/ui/status-badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface CampRecord {
  id: string;
  campName: string;
  province: string;
  district: string;
  address: string;
  contactPerson: string;
  phone: string;
  capacity: number;
  currentFamilies: number;
  status: "active" | "inactive" | "pending";
}

const camps: CampRecord[] = [
  { id: "1", campName: "ជំរំ អាល់ហ្វា", province: "ភ្នំពេញ", district: "ស្រុកទី ១", address: "ភូមិ ១២៣, សង្កាត់ទី ១", contactPerson: "សុខ សារ៉េត", phone: "012 345 678", capacity: 100, currentFamilies: 75, status: "active" },
  { id: "2", campName: "ជំរំ បេតា", province: "កណ្ដាល", district: "ស្រុកទី ២", address: "ភូមិ ៤៥៦, សង្កាត់ទី ២", contactPerson: "ចាន់ សុភា", phone: "012 456 789", capacity: 150, currentFamilies: 120, status: "active" },
  { id: "3", campName: "ជំរំ ហ្គាម៉ា", province: "កំពង់ចាម", district: "ស្រុកទី ៣", address: "ភូមិ ៧៨៩, សង្កាត់ទី ៣", contactPerson: "វណ្ណ ដារ៉ា", phone: "012 567 890", capacity: 80, currentFamilies: 45, status: "active" },
  { id: "4", campName: "ជំរំ ដែលតា", province: "ភ្នំពេញ", district: "ស្រុកទី ១", address: "ភូមិ ១០១១, សង្កាត់ទី ៤", contactPerson: "សុខ មករា", phone: "012 678 901", capacity: 200, currentFamilies: 0, status: "inactive" },
  { id: "5", campName: "ជំរំ អេប្សាយឡុន", province: "កណ្ដាល", district: "ស្រុកទី ២", address: "ភូមិ ១២១៣, សង្កាត់ទី ៥", contactPerson: "រស្មី សុភាព", phone: "012 789 012", capacity: 50, currentFamilies: 50, status: "inactive" },
];

const provinces = [
  { id: "1", name: "ភ្នំពេញ" },
  { id: "2", name: "កណ្ដាល" },
  { id: "3", name: "កំពង់ចាម" },
];

const districts = [
  { id: "1", name: "ស្រុកទី ១" },
  { id: "2", name: "ស្រុកទី ២" },
  { id: "3", name: "ស្រុកទី ៣" },
];

export default function CampDataReview() {
  const [searchQuery, setSearchQuery] = useState("");
  const [provinceFilter, setProvinceFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isAddCampOpen, setIsAddCampOpen] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    campName: "",
    province: "",
    district: "",
    address: "",
    contactPerson: "",
    phone: "",
    capacity: "",
    notes: "",
  });

  const resetForm = () => {
    setFormData({
      campName: "",
      province: "",
      district: "",
      address: "",
      contactPerson: "",
      phone: "",
      capacity: "",
      notes: "",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.campName || !formData.province || !formData.district) {
      toast({
        title: "កំហុសក្នុងការបញ្ចូល",
        description: "សូមបំពេញគ្រប់ផ្នែកដែលត្រូវការ។",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "បានចុះបញ្ជីជំរំ",
      description: `${formData.campName} ត្រូវបានចុះបញ្ជីដោយជោគជ័យ។`,
    });
    resetForm();
    setIsAddCampOpen(false);
  };

  const filteredCamps = camps.filter((camp) => {
    const matchesSearch = camp.campName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      camp.contactPerson.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesProvince = provinceFilter === "all" || camp.province === provinceFilter;
    const matchesStatus = statusFilter === "all" || camp.status === statusFilter;
    return matchesSearch && matchesProvince && matchesStatus;
  });

  const columns = [
    { key: "campName", header: "ឈ្មោះជំរំ", render: (c: CampRecord) => (
      <div className="flex items-center gap-2">
        <Building className="w-4 h-4 text-muted-foreground" />
        <span className="font-medium">{c.campName}</span>
      </div>
    )},
    { key: "province", header: "ខេត្ត/រាជធានី" },
    { key: "district", header: "ស្រុក/ខណ្ឌ" },
    { key: "contactPerson", header: "អ្នកទំនាក់ទំនង", render: (c: CampRecord) => (
      <div>
        <p className="font-medium">{c.contactPerson}</p>
        <p className="text-xs text-muted-foreground flex items-center gap-1">
          <Phone className="w-3 h-3" />
          {c.phone}
        </p>
      </div>
    )},
    { 
      key: "capacity", 
      header: "សមត្ថភាព",
      className: "text-center",
      render: (c: CampRecord) => (
        <div className="text-center">
          <p className="font-medium">{c.currentFamilies} / {c.capacity}</p>
          <div className="w-full bg-muted rounded-full h-2 mt-1">
            <div 
              className={`h-2 rounded-full ${c.currentFamilies / c.capacity > 0.9 ? 'bg-destructive' : c.currentFamilies / c.capacity > 0.7 ? 'bg-warning' : 'bg-success'}`}
              style={{ width: `${Math.min((c.currentFamilies / c.capacity) * 100, 100)}%` }}
            />
          </div>
        </div>
      )
    },
    { key: "status", header: "ស្ថានភាព", render: (c: CampRecord) => <StatusBadge status={c.status} /> },
    {
      key: "actions",
      header: "សកម្មភាព",
      render: (c: CampRecord) => (
        <div className="flex gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8 text-primary hover:text-primary hover:bg-primary/10">
            <Eye className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-warning hover:text-warning hover:bg-warning/10">
            <Edit className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10">
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="animate-fade-in">
      <PageHeader 
        title="ពិនិត្យទិន្នន័យជំរំ" 
        description="ពិនិត្យ និងគ្រប់គ្រងជំរំទាំងអស់ក្នុងប្រព័ន្ធ"
      >
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            នាំចេញទិន្នន័យ
          </Button>
          <Button onClick={() => setIsAddCampOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            បន្ថែមជំរំ
          </Button>
        </div>
      </PageHeader>

      {/* Add Camp Modal */}
      <Dialog open={isAddCampOpen} onOpenChange={setIsAddCampOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Building className="w-5 h-5" />
              ចុះបញ្ជីជំរំថ្មី
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="campName">ឈ្មោះជំរំ *</Label>
                <Input
                  id="campName"
                  value={formData.campName}
                  onChange={(e) => setFormData({ ...formData, campName: e.target.value })}
                  placeholder="បញ្ចូលឈ្មោះជំរំ"
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="province">ខេត្ត/រាជធានី *</Label>
                  <Select value={formData.province} onValueChange={(v) => setFormData({ ...formData, province: v })}>
                    <SelectTrigger>
                      <SelectValue placeholder="ជ្រើសរើសខេត្ត/រាជធានី" />
                    </SelectTrigger>
                    <SelectContent>
                      {provinces.map((p) => (
                        <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="district">ស្រុក/ខណ្ឌ *</Label>
                  <Select value={formData.district} onValueChange={(v) => setFormData({ ...formData, district: v })}>
                    <SelectTrigger>
                      <SelectValue placeholder="ជ្រើសរើសស្រុក/ខណ្ឌ" />
                    </SelectTrigger>
                    <SelectContent>
                      {districts.map((d) => (
                        <SelectItem key={d.id} value={d.id}>{d.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="address">អាសយដ្ឋាន</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Textarea
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="បញ្ចូលអាសយដ្ឋានពេញ"
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="contactPerson">អ្នកទំនាក់ទំនង</Label>
                  <Input
                    id="contactPerson"
                    value={formData.contactPerson}
                    onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                    placeholder="ឈ្មោះអ្នកគ្រប់គ្រងជំរំ"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">លេខទូរស័ព្ទ</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="លេខទំនាក់ទំនង"
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="capacity">សមត្ថភាពទទួល (គ្រួសារ)</Label>
                <Input
                  id="capacity"
                  type="number"
                  value={formData.capacity}
                  onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                  placeholder="ចំនួនគ្រួសារអតិបរមា"
                />
              </div>

              <div>
                <Label htmlFor="notes">ចំណាំ</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="ចំណាំបន្ថែមអំពីជំរំ"
                />
              </div>
            </div>

            <div className="flex gap-3 justify-end">
              <Button type="button" variant="outline" onClick={() => setIsAddCampOpen(false)}>
                បោះបង់
              </Button>
              <Button type="submit">
                <Save className="w-4 h-4 mr-2" />
                ចុះបញ្ជីជំរំ
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="ស្វែងរកជំរំ..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="ស្ថានភាព" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">ស្ថានភាពទាំងអស់</SelectItem>
                <SelectItem value="active">សកម្ម</SelectItem>
                <SelectItem value="inactive">អសកម្ម</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
              <Building className="w-5 h-5" />
            </div>
            <div>
              <p className="text-2xl font-bold">{filteredCamps.length}</p>
              <p className="text-sm text-muted-foreground">ជំរំសរុប</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold">{filteredCamps.filter(c => c.status === "active").length}</p>
              <p className="text-sm text-muted-foreground">ជំរំសកម្ម</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
              <Flag className="w-5 h-5 text-warning" />
            </div>
            <div>
              <p className="text-2xl font-bold">{filteredCamps.filter(c => c.status === "pending").length}</p>
              <p className="text-sm text-muted-foreground">រង់ចាំពិនិត្យ</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Table */}
      <DataTable columns={columns} data={filteredCamps} />
    </div>
  );
}
