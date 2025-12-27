import { useParams, useNavigate } from "react-router-dom";
import { QrCode, Users, Calendar, MapPin, Package, ChevronLeft, Download, Trash2 } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { StatusBadge } from "@/components/ui/status-badge";

interface DistributionRecord {
  id: string;
  date: string;
  items: string;
  quantity: number;
  status: "pending" | "approved";
}

const distributionHistory: DistributionRecord[] = [
  { id: "1", date: "2024-01-20", items: "អង្ករ (១០គក), ប្រេង (២លីត្រ)", quantity: 2, status: "approved" },
  { id: "2", date: "2024-01-15", items: "ភួយ", quantity: 3, status: "approved" },
  { id: "3", date: "2024-01-10", items: "សម្ភារៈវេជ្ជសាស្រ្ត", quantity: 1, status: "approved" },
  { id: "4", date: "2024-01-25", items: "សម្ភារៈចម្អិនអាហារ", quantity: 1, status: "pending" },
];

// Mock family data based on registration form
const familyData = {
  headOfHousehold: "សុខ សារ៉ាត់",
  nationalId: "KH-១២៣៤៥៦៧៨៩០",
  phoneNumber: "+៨៥៥ ១២ ៣៤៥ ៦៧៨៩",
  peopleMale: 2,
  peopleFemale: 3,
  disabilityMale: 0,
  disabilityFemale: 1,
  pregnancy: 1,
  children: 2,
  elderly: 1,
  registeredDate: "២០២៤ ១៥ មករា",
  location: "ជំរុំ ក - ប្លុក ៣",
};

export default function FamilyProfile() {
  const { familyId } = useParams();
  const navigate = useNavigate();

  const columns = [
    { key: "date", header: "កាលបរិច្ឆេទ", render: (r: DistributionRecord) => new Date(r.date).toLocaleDateString('km-KH') },
    { key: "items", header: "សម្ភារៈ" },
    { key: "quantity", header: "ចំនួន", className: "text-center" },
    { key: "status", header: "ស្ថានភាព", render: (r: DistributionRecord) => <StatusBadge status={r.status} /> },
  ];

  const totalMembers = familyData.peopleMale + familyData.peopleFemale;

  return (
    <div className="animate-fade-in">
      <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4">
        <ChevronLeft className="w-4 h-4 mr-2" />
        ត្រឡប់ទៅគ្រួសារ
      </Button>

      <PageHeader 
        title={`គ្រួសារ ${familyId}`}
        description="ប្រវត្តិគ្រួសារ និងប្រវត្តិការចែកចាយ"
      >
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          បង្កើតកាត
        </Button>
        <Button variant="destructive">
          <Trash2 className="w-4 h-4 mr-2" />
          លុបចេញ
        </Button>
      </PageHeader>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - QR Code */}
        <div className="space-y-6">
          {/* QR Code Card */}
          <Card>
            <CardContent className="pt-6 flex flex-col items-center">
              <div className="w-40 h-40 bg-muted rounded-xl flex items-center justify-center mb-4 border-2 border-dashed border-border">
                <QrCode className="w-24 h-24 text-muted-foreground" />
              </div>
              <p className="font-mono font-bold text-lg">{familyId}</p>
              <p className="text-sm text-muted-foreground">ស្កេនដើម្បីផ្ទៀងផ្ទាត់អត្តសញ្ញាណ</p>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                ព័ត៌មានគ្រួសារ
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">ឈ្មោះមេគ្រួសារ</p>
                    <p className="font-medium">{familyData.headOfHousehold}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">លេខអត្តសញ្ញាណប័ណ្ណ</p>
                    <p className="font-mono">{familyData.nationalId}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">លេខទូរស័ព្ទ</p>
                    <p className="font-mono">{familyData.phoneNumber}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">កាលបរិច្ឆេទចុះឈ្មោះ</p>
                      <p className="font-medium">{familyData.registeredDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">ទីតាំង</p>
                      <p className="font-medium">{familyData.location}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Family Members Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">សមាជិកគ្រួសារ</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                <div className="p-3 rounded-lg bg-muted/50 text-center">
                  <p className="text-2xl font-bold text-primary">{totalMembers}</p>
                  <p className="text-sm text-muted-foreground">សមាជិកសរុប</p>
                </div>
                <div className="p-3 rounded-lg bg-muted/50 text-center">
                  <p className="text-2xl font-bold">{familyData.peopleMale} / {familyData.peopleFemale}</p>
                  <p className="text-sm text-muted-foreground">ប្រុស / ស្រី</p>
                </div>
                <div className="p-3 rounded-lg bg-muted/50 text-center">
                  <p className="text-2xl font-bold">{familyData.disabilityMale} / {familyData.disabilityFemale}</p>
                  <p className="text-sm text-muted-foreground">ពិការ (ប្រុស/ស្រី)</p>
                </div>
                <div className="p-3 rounded-lg bg-muted/50 text-center">
                  <p className="text-2xl font-bold">{familyData.pregnancy}</p>
                  <p className="text-sm text-muted-foreground">ស្ត្រីមានផ្ទៃពោះ</p>
                </div>
                <div className="p-3 rounded-lg bg-muted/50 text-center">
                  <p className="text-2xl font-bold">{familyData.children}</p>
                  <p className="text-sm text-muted-foreground">កុមារ</p>
                </div>
                <div className="p-3 rounded-lg bg-muted/50 text-center">
                  <p className="text-2xl font-bold">{familyData.elderly}</p>
                  <p className="text-sm text-muted-foreground">មនុស្សចាស់</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Distribution History */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="w-5 h-5" />
                ប្រវត្តិការចែកចាយ
              </CardTitle>
            </CardHeader>
            <CardContent>
              <DataTable columns={columns} data={distributionHistory} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
