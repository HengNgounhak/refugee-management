import { PageHeader } from "@/components/ui/page-header";
import { StatCard } from "@/components/ui/stat-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Users,
  User,
  Baby,
  Heart,
  Accessibility,
  Clock,
  Newspaper,
  Tent,
  MapPin,
} from "lucide-react";

const summaryStats = {
  totalCamps: 24,
  totalProvinces: 8,
  totalFamilies: 1247,
  people: {
    total: 5832,
    male: 2891,
    female: 2941,
  },
  disability: {
    total: 234,
    male: 112,
    female: 122,
  },
  pregnancy: 89,
  childrenUnder16: 2156,
  elderlyAbove60: 387,
};

const newsList = [
  {
    id: 1,
    title: "មជ្ឈមណ្ឌលចែកចាយសម្ភារៈសង្គ្រោះថ្មីបើកនៅស្រុកទី៥",
    date: "2024-01-15",
    excerpt: "មជ្ឈមណ្ឌលចែកចាយថ្មីត្រូវបានបង្កើតឡើងដើម្បីបម្រើគ្រួសារក្នុងតំបន់ខាងកើត...",
  },
  {
    id: 2,
    title: "ការចុះឈ្មោះសម្ភារៈជំនួយរដូវរងាបានបើក",
    date: "2024-01-12",
    excerpt: "គ្រួសារអាចចុះឈ្មោះសម្រាប់សម្ភារៈជំនួយរដូវរងារួមទាំងភួយ និងសម្ភារៈកំដៅ...",
  },
  {
    id: 3,
    title: "កម្មវិធីពិនិត្យសុខភាពនឹងធ org ើឡើងសប្តាហ៍ក្រោយ",
    date: "2024-01-10",
    excerpt: "ការពិនិត្យសុខភាពឥតគិតថ្លៃនឹងមានសម្រាប់គ្រួសារដែលបានចុះឈ្មោះទាំងអស់នៅជំរុំអាល់ហ្វា...",
  },
  {
    id: 4,
    title: "កាលវិភាគចែកចាយអាហារត្រូវបានធ្វើបច្ចុប្បន្នភាព",
    date: "2024-01-08",
    excerpt: "កាលវិភាគចែកចាយអាហារប្រចាំខែត្រូវបានធ្វើបច្ចុប្បន្នភាពសម្រាប់ជំរុំទាំងអស់ក្នុងតំបន់...",
  },
  {
    id: 5,
    title: "លេខទូរស័ព្ទបន្ទាន់ត្រូវបានធ្វើបច្ចុប្បន្នភាព",
    date: "2024-01-05",
    excerpt: "លេខទូរស័ព្ទបន្ទាន់ថ្មីត្រូវបានបង្កើតឡើងសម្រាប់ការឆ្លើយតបរហ័សជាងមុន...",
  },
];

export default function PublicDashboard() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="ផ្ទាំងគ្រប់គ្រងសាធារណៈ"
        description="ទិដ្ឋភាពទូទៅនៃស្ថិតិចែកចាយសម្ភារៈសង្គ្រោះ"
      />

      {/* Row 1: Total Camps, Provinces, Families */}
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard
          title="ជំរុំសរុប"
          value={summaryStats.totalCamps.toLocaleString()}
          icon={Tent}
        />
        <StatCard
          title="ខេត្តសរុប"
          value={summaryStats.totalProvinces.toLocaleString()}
          icon={MapPin}
        />
        <StatCard
          title="គ្រួសារសរុប"
          value={summaryStats.totalFamilies.toLocaleString()}
          icon={Users}
        />
      </div>

      {/* Row 2: Total People & Disability with Gender Breakdown */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <User className="w-5 h-5 text-primary" />
              មនុស្សសរុប
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <span className="text-sm text-muted-foreground">សរុប</span>
                <span className="text-2xl font-bold">
                  {summaryStats.people.total.toLocaleString()}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-muted/50 text-center">
                  <p className="text-2xl font-bold text-primary">
                    {summaryStats.people.male.toLocaleString()}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">ប្រុស</p>
                </div>
                <div className="p-4 rounded-lg bg-muted/50 text-center">
                  <p className="text-2xl font-bold text-accent">
                    {summaryStats.people.female.toLocaleString()}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">ស្រី</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Accessibility className="w-5 h-5 text-primary" />
              ពិការភាពសរុប
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <span className="text-sm text-muted-foreground">សរុប</span>
                <span className="text-2xl font-bold">
                  {summaryStats.disability.total.toLocaleString()}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-muted/50 text-center">
                  <p className="text-2xl font-bold text-primary">
                    {summaryStats.disability.male.toLocaleString()}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">ប្រុស</p>
                </div>
                <div className="p-4 rounded-lg bg-muted/50 text-center">
                  <p className="text-2xl font-bold text-accent">
                    {summaryStats.disability.female.toLocaleString()}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">ស្រី</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Row 3: Pregnancy, Children, Elderly */}
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard
          title="ផ្ទៃពោះសរុប"
          value={summaryStats.pregnancy.toLocaleString()}
          icon={Heart}
          subtitle="ស្រ្តីមានផ្ទៃពោះ"
        />
        <StatCard
          title="កុមារក្រោម ១៦ឆ្នាំ"
          value={summaryStats.childrenUnder16.toLocaleString()}
          icon={Baby}
          subtitle="អាយុក្រោម ១៦ឆ្នាំ"
        />
        <StatCard
          title="មនុស្សចាស់លើស ៦០ឆ្នាំ"
          value={summaryStats.elderlyAbove60.toLocaleString()}
          icon={Clock}
          subtitle="អាយុលើស ៦០ឆ្នាំ"
        />
      </div>

      {/* News & Announcements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Newspaper className="w-5 h-5 text-primary" />
            ព័ត៌មាន និងសេចក្តីប្រកាស
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {newsList.map((news) => (
              <div
                key={news.id}
                className="p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors cursor-pointer"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <h3 className="font-medium">{news.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {news.excerpt}
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {new Date(news.date).toLocaleDateString("km-KH", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}