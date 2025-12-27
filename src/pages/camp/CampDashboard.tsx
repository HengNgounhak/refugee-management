import { Users, User, Baby, Heart, Accessibility, Clock, Newspaper, MapPin, Building } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { StatCard } from "@/components/ui/stat-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const campInfo = {
  name: "ជំរុំអាល់ហ្វា",
  location: "ខេត្តបាត់ដំបង, ស្រុកសង្កែ",
  address: "ភូមិកំពង់ព្រៃ, ឃុំកំពង់ព្រៃ, ស្រុកសង្កែ",
};

const summaryStats = {
  totalFamilies: 456,
  people: {
    total: 2134,
    male: 1056,
    female: 1078,
  },
  disability: {
    total: 89,
    male: 42,
    female: 47,
  },
  pregnancy: 34,
  children: 892,
  elderly: 156,
};

const newsList = [
  {
    id: 1,
    title: "វដ្តចែកចាយប្រចាំខែនឹងចាប់ផ្តើមថ្ងៃស្អែក",
    date: "2024-01-15",
    excerpt: "គ្រួសារទាំងអស់គួរត្រៀមអត្តសញ្ញាណប័ណ្ណសម្រាប់ការផ្ទៀងផ្ទាត់...",
  },
  {
    id: 2,
    title: "កម្មវិធីពិនិត្យសុខភាពនឹងធ្វើឡើង",
    date: "2024-01-12",
    excerpt: "ការពិនិត្យសុខភាពឥតគិតថ្លៃមានសម្រាប់គ្រួសារដែលបានចុះឈ្មោះទាំងអស់...",
  },
  {
    id: 3,
    title: "សម្ភារៈជំនួយរដូវរងាមាន",
    date: "2024-01-10",
    excerpt: "ភួយ និងសម្ភារៈកំដៅឥឡូវមានសម្រាប់ចែកចាយ...",
  },
];

export default function CampDashboard() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Camp Info Header */}
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
            <Building className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground font-display">{campInfo.name}</h1>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
              <MapPin className="w-4 h-4" />
              <span>{campInfo.location}</span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">{campInfo.address}</p>
          </div>
        </div>
      </div>

      <PageHeader
        title="ផ្ទាំងគ្រប់គ្រងជំរុំ"
        description="ទិដ្ឋភាពទូទៅនៃស្ថិតិ និងប្រតិបត្តិការជំរុំ"
      />

      {/* Summary Stats Row 1 */}
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard
          title="គ្រួសារសរុប"
          value={summaryStats.totalFamilies.toLocaleString()}
          icon={Users}
        />
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <User className="w-4 h-4 text-primary" />
              មនុស្ស
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-2 rounded-lg bg-muted/50">
                <p className="text-xl font-bold text-primary">{summaryStats.people.male.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">ប្រុស</p>
              </div>
              <div className="text-center p-2 rounded-lg bg-muted/50">
                <p className="text-xl font-bold text-accent">{summaryStats.people.female.toLocaleString()}</p>
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
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-2 rounded-lg bg-muted/50">
                <p className="text-xl font-bold text-primary">{summaryStats.disability.male.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">ប្រុស</p>
              </div>
              <div className="text-center p-2 rounded-lg bg-muted/50">
                <p className="text-xl font-bold text-accent">{summaryStats.disability.female.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">ស្រី</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Summary Stats Row 2 */}
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard
          title="ផ្ទៃពោះ"
          value={summaryStats.pregnancy.toLocaleString()}
          icon={Heart}
          subtitle="ស្រ្តីមានផ្ទៃពោះ"
        />
        <StatCard
          title="កុមារ"
          value={summaryStats.children.toLocaleString()}
          icon={Baby}
          subtitle="អាយុក្រោម ១៦ឆ្នាំ"
        />
        <StatCard
          title="មនុស្សចាស់"
          value={summaryStats.elderly.toLocaleString()}
          icon={Clock}
          subtitle="អាយុលើស ៦០ឆ្នាំ"
        />
      </div>

      {/* News List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Newspaper className="w-5 h-5 text-primary" />
            ព័ត៌មាន និងសេចក្តីប្រកាស
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {newsList.map((news) => (
              <div
                key={news.id}
                className="p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors cursor-pointer"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <h3 className="font-medium">{news.title}</h3>
                    <p className="text-sm text-muted-foreground">{news.excerpt}</p>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {new Date(news.date).toLocaleDateString("km-KH", {
                      month: "short",
                      day: "numeric",
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