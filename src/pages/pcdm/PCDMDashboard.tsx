import { MapPin, Package, Users, User, Accessibility, Heart, Baby, Clock, Tent, AlertTriangle, Building2 } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { StatCard } from "@/components/ui/stat-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { StatusBadge } from "@/components/ui/status-badge";

const summaryStats = {
  totalFamilies: 1247,
  people: { total: 5832, male: 2891, female: 2941 },
  disability: { total: 234, male: 112, female: 122 },
  pregnancy: 89,
  children: 2156,
  elderly: 387,
};

interface Camp {
  id: string;
  name: string;
  families: number;
  needs: string;
  status: "active" | "inactive";
}

const camps: Camp[] = [
  { id: "1", name: "ជំរុំអាល់ហ្វា", families: 456, needs: "អង្ករ, ភួយ", status: "active" },
  { id: "2", name: "ជំរុំបេតា", families: 312, needs: "ថ្នាំពេទ្យ, ប្រេង", status: "active" },
  { id: "3", name: "ជំរុំហ្គាម៉ា", families: 189, needs: "កញ្ចប់អនាម័យ", status: "active" },
  { id: "4", name: "ជំរុំដែលតា", families: 290, needs: "គ្មាន", status: "inactive" },
];

export default function PCDMDashboard() {
  const columns = [
    {
      key: "name",
      header: "ឈ្មោះជំរុំ",
      render: (camp: Camp) => (
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-muted-foreground" />
          <span className="font-medium">{camp.name}</span>
        </div>
      )
    },
    {
      key: "families",
      header: "គ្រួសារ",
      render: (camp: Camp) => (
        <span className="font-semibold">{camp.families.toLocaleString()}</span>
      )
    },
    {
      key: "needs",
      header: "តម្រូវការ",
      render: (camp: Camp) => (
        <span className="text-sm text-muted-foreground">{camp.needs}</span>
      )
    },
    {
      key: "status",
      header: "ស្ថានភាព",
      render: (camp: Camp) => <StatusBadge status={camp.status} />
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="ផ្ទាំងគ្រប់គ្រង គ.ជ.អ.រ ខេត្ត"
        description="ទិដ្ឋភាពទូទៅខេត្តនៃជំរុំ និងការគ្រប់គ្រងធនធាន"
      />

      {/* Summary Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <StatCard title="គ្រួសារសរុប" value={summaryStats.totalFamilies.toLocaleString()} icon={Users} />
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <User className="w-4 h-4 text-primary" />
              មនុស្ស
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center p-2 rounded-lg bg-muted/50">
                <p className="text-lg font-bold text-primary">{summaryStats.people.male.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">ប្រុស</p>
              </div>
              <div className="text-center p-2 rounded-lg bg-muted/50">
                <p className="text-lg font-bold text-accent">{summaryStats.people.female.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">ស្រី</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <Accessibility className="w-4 h-4 text-primary" />
              ពិការភាព
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center p-2 rounded-lg bg-muted/50">
                <p className="text-lg font-bold text-primary">{summaryStats.disability.male.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">ប្រុស</p>
              </div>
              <div className="text-center p-2 rounded-lg bg-muted/50">
                <p className="text-lg font-bold text-accent">{summaryStats.disability.female.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">ស្រី</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard title="ផ្ទៃពោះ" value={summaryStats.pregnancy.toLocaleString()} icon={Heart} subtitle="ស្រ្តីមានផ្ទៃពោះ" />
        <StatCard title="កុមារ" value={summaryStats.children.toLocaleString()} icon={Baby} subtitle="អាយុក្រោម ១៦ឆ្នាំ" />
        <StatCard title="មនុស្សចាស់" value={summaryStats.elderly.toLocaleString()} icon={Clock} subtitle="អាយុលើស ៦០ឆ្នាំ" />
      </div>

      {/* Cards Row */}
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard title="ជំរុំសរុប" value="4" icon={Tent} />
        <StatCard title="ស្ថានភាពស្តុក" value="82%" icon={Package} variant="success" subtitle="សម្ភារៈមាន" />
        <StatCard title="សំណើរង់ចាំ" value="25" icon={AlertTriangle} variant="warning" subtitle="រង់ចាំអនុម័ត" />
      </div>

      {/* Map and Table */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              ផែនទី / ទិដ្ឋភាពជំរុំ
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-muted/50 rounded-lg flex items-center justify-center border-2 border-dashed">
              <div className="text-center text-muted-foreground">
                <MapPin className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>ទិដ្ឋភាពផែនទីអន្តរកម្ម</p>
                <p className="text-sm">ទីតាំងជំរុំ និងតំបន់ចែកចាយ</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="w-5 h-5" />
              សេចក្តីសង្ខេបស្តុក
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
              <span>អង្ករ (១០គក)</span>
              <span className="font-semibold text-success">២,៤៥០ ឯកតា</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
              <span>ប្រេងឆា</span>
              <span className="font-semibold text-success">១,៨២០ ឯកតា</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-lg bg-warning/10">
              <span>ភួយ</span>
              <span className="font-semibold text-warning">៣៤០ ឯកតា</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-lg bg-destructive/10">
              <span>កញ្ចប់ថ្នាំពេទ្យ</span>
              <span className="font-semibold text-destructive">៤៥ ឯកតា</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Camps Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="w-5 h-5" />
            បញ្ជីជំរុំ
          </CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={camps} />
        </CardContent>
      </Card>
    </div>
  );
}