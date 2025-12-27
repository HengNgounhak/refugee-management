import { Users, MapPin, Tent, User, Accessibility, Heart, Baby, Clock, BarChart3, PieChart, AlertTriangle } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { StatCard } from "@/components/ui/stat-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const summaryStats = {
  activeCamps: 47,
  provinces: 8,
  totalFamilies: 12498,
  people: { total: 58320, male: 28910, female: 29410 },
  disability: { total: 2340, male: 1120, female: 1220 },
  pregnancy: 890,
  children: 21560,
  elderly: 3870,
};

const alerts = [
  { id: 1, province: "ខេត្តបាត់ដំបង", message: "ខ្វះខាតថ្នាំពេទ្យធ្ងន់ធ្ងរ", severity: "critical" },
  { id: 2, province: "ខេត្តសៀមរាប", message: "ការចុះឈ្មោះកើនឡើងខុសធម្មតា", severity: "warning" },
  { id: 3, province: "ខេត្តកំពង់ចាម", message: "ការពន្យារពេលចែកចាយត្រូវបានរាយការណ៍", severity: "info" },
];

const vulnerabilityData = [
  { label: "ពិការភាព", count: 2340, percentage: 18.7 },
  { label: "មនុស្សចាស់ (៦០+)", count: 3870, percentage: 15.1 },
  { label: "កុមារក្រោម ១៦ឆ្នាំ", count: 21560, percentage: 37.0 },
  { label: "ស្រ្តីមានផ្ទៃពោះ", count: 890, percentage: 7.1 },
];

export default function NCDMDashboard() {
  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="ផ្ទាំងគ្រប់គ្រងជាតិ"
        description="ទិដ្ឋភាពទូទាំងប្រទេសនៃប្រតិបត្តិការចែកចាយសម្ភារៈសង្គ្រោះ"
      />

      {/* Row 1: Camps and Provinces */}
      <div className="grid gap-4 md:grid-cols-2">
        <StatCard title="ជំរុំសកម្ម" value={summaryStats.activeCamps.toString()} icon={Tent} />
        <StatCard title="ខេត្ត" value={summaryStats.provinces.toString()} icon={MapPin} />
      </div>

      {/* Row 2: Families, People, Disability */}
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard title="គ្រួសារសរុប" value={summaryStats.totalFamilies.toLocaleString()} icon={Users} trend={{ value: 5.2, positive: true }} />
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

      {/* Row 3: Pregnancy, Children, Elderly */}
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard title="ផ្ទៃពោះ" value={summaryStats.pregnancy.toLocaleString()} icon={Heart} subtitle="ស្រ្តីមានផ្ទៃពោះ" />
        <StatCard title="កុមារ" value={summaryStats.children.toLocaleString()} icon={Baby} subtitle="អាយុក្រោម ១៦ឆ្នាំ" />
        <StatCard title="មនុស្សចាស់" value={summaryStats.elderly.toLocaleString()} icon={Clock} subtitle="អាយុលើស ៦០ឆ្នាំ" />
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              គំនូសតាងនិន្នាការ
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-muted/50 rounded-lg flex items-center justify-center border-2 border-dashed">
              <div className="text-center text-muted-foreground">
                <BarChart3 className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>និន្នាការចែកចាយប្រចាំខែ</p>
                <p className="text-sm">បង្ហាញនិន្នាការក្នុងរយៈពេល ១២ខែ</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="w-5 h-5" />
              ការបែងចែកភាពងាយរងគ្រោះ
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {vulnerabilityData.map((item) => (
              <div key={item.label} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{item.label}</span>
                  <span className="font-medium">{item.count.toLocaleString()}</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-500"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-warning" />
            ការជូនដំណឹង និងភាពខុសប្រក្រតី
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {alerts.map((alert) => (
              <div key={alert.id} className="flex items-start gap-3 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                <Badge
                  variant="outline"
                  className={
                    alert.severity === "critical"
                      ? "bg-destructive/10 text-destructive border-destructive/20"
                      : alert.severity === "warning"
                      ? "bg-warning/10 text-warning border-warning/20"
                      : "bg-muted text-muted-foreground"
                  }
                >
                  {alert.severity === "critical" ? "ធ្ងន់ធ្ងរ" : alert.severity === "warning" ? "ប្រុងប្រយ័ត្ន" : "ព័ត៌មាន"}
                </Badge>
                <div className="flex-1">
                  <p className="font-medium">{alert.province}</p>
                  <p className="text-sm text-muted-foreground">{alert.message}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}