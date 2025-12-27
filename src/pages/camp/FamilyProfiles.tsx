import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, QrCode, Download, Filter, CreditCard } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTable } from "@/components/ui/data-table";
import { StatusBadge } from "@/components/ui/status-badge";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Family {
  id: string;
  familyId: string;
  headOfHousehold: string;
  householdSize: number;
  vulnerabilities: string[];
  registeredDate: string;
  status: "active" | "inactive";
}

const mockFamilies: Family[] = [
  {
    id: "1",
    familyId: "FAM-001234",
    headOfHousehold: "សុខ សារ៉េត",
    householdSize: 5,
    vulnerabilities: ["ពិការភាព", "មនុស្សចាស់"],
    registeredDate: "2024-01-15",
    status: "active",
  },
  {
    id: "2",
    familyId: "FAM-001235",
    headOfHousehold: "ចាន់ សុភា",
    householdSize: 3,
    vulnerabilities: ["មានផ្ទៃពោះ"],
    registeredDate: "2024-01-18",
    status: "active",
  },
  {
    id: "3",
    familyId: "FAM-001236",
    headOfHousehold: "វណ្ណ ដារ៉ា",
    householdSize: 7,
    vulnerabilities: ["កុមារក្រោម ៥ឆ្នាំ"],
    registeredDate: "2024-01-20",
    status: "active",
  },
  {
    id: "4",
    familyId: "FAM-001237",
    headOfHousehold: "សុខ មករា",
    householdSize: 2,
    vulnerabilities: [],
    registeredDate: "2024-01-22",
    status: "inactive",
  },
];

export default function FamilyProfiles() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const navigate = useNavigate();

  const filteredFamilies = mockFamilies.filter((family) => {
    const matchesSearch =
      family.familyId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      family.headOfHousehold.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || family.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const columns = [
    {
      key: "familyId",
      header: "លេខសម្គាល់គ្រួសារ",
      render: (family: Family) => (
        <div className="flex items-center gap-2">
          <QrCode className="w-4 h-4 text-muted-foreground" />
          <span className="font-mono font-medium">{family.familyId}</span>
        </div>
      ),
    },
    {
      key: "headOfHousehold",
      header: "ឈ្មោះមេគ្រួសារ",
    },
    {
      key: "householdSize",
      header: "ចំនួន",
      className: "text-center",
      render: (family: Family) => (
        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-muted font-medium">
          {family.householdSize}
        </span>
      ),
    },
    {
      key: "vulnerabilities",
      header: "ភាពងាយរងគ្រោះ",
      render: (family: Family) => (
        <div className="flex flex-wrap gap-1">
          {family.vulnerabilities.length > 0 ? (
            family.vulnerabilities.map((v) => (
              <Badge key={v} variant="secondary" className="text-xs">
                {v}
              </Badge>
            ))
          ) : (
            <span className="text-muted-foreground text-sm">គ្មាន</span>
          )}
        </div>
      ),
    },
    {
      key: "registeredDate",
      header: "កាលបរិច្ឆេទចុះឈ្មោះ",
      render: (family: Family) => new Date(family.registeredDate).toLocaleDateString(),
    },
    {
      key: "status",
      header: "ស្ថានភាព",
      render: (family: Family) => <StatusBadge status={family.status} />,
    },
  ];

  return (
    <div className="animate-fade-in">
      <PageHeader 
        title="គ្រួសារ" 
        description="គ្រប់គ្រងគ្រួសារជនភៀសខ្លួនដែលបានចុះឈ្មោះ"
      >
        <div className="flex gap-2">
          <Button variant="outline">
            <CreditCard className="w-4 h-4 mr-2" />
            បង្កើតកាត
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            នាំចេញ
          </Button>
        </div>
      </PageHeader>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="ស្វែងរកតាមលេខសម្គាល់គ្រួសារ ឬឈ្មោះ..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[160px]">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="ស្ថានភាព" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">ស្ថានភាពទាំងអស់</SelectItem>
              <SelectItem value="active">សកម្ម</SelectItem>
              <SelectItem value="inactive">អសកម្ម</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={filteredFamilies}
        onRowClick={(family) => navigate(`/camp/family/${family.familyId}`)}
        emptyMessage="រកមិនឃើញគ្រួសារដែលត្រូវនឹងលក្ខខណ្ឌរបស់អ្នក"
      />
    </div>
  );
}
