import { useState } from "react";
import { Search, Plus, Settings, UserCog, Shield, MapPin, MoreHorizontal } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { StatusBadge } from "@/components/ui/status-badge";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "camp_manager" | "pcdm_staff" | "ncdm_staff";
  location: string;
  status: "active" | "inactive";
}

const users: User[] = [
  { id: "1", name: "John Smith", email: "john@relief.org", role: "ncdm_staff", location: "ការិយាល័យកណ្តាល", status: "active" },
  { id: "2", name: "Maria Garcia", email: "maria@relief.org", role: "pcdm_staff", location: "ខេត្ត ក", status: "active" },
  { id: "3", name: "Ahmed Hassan", email: "ahmed@relief.org", role: "camp_manager", location: "ជំរំ អាល់ផា", status: "active" },
  { id: "4", name: "Sarah Chen", email: "sarah@relief.org", role: "pcdm_staff", location: "ខេត្ត ខ", status: "active" },
  { id: "5", name: "David Kim", email: "david@relief.org", role: "camp_manager", location: "ជំរំ បេតា", status: "inactive" },
  { id: "6", name: "Fatima Ali", email: "fatima@relief.org", role: "admin", location: "ការិយាល័យកណ្តាល", status: "active" },
];

const roleLabels = {
  admin: { label: "អ្នកគ្រប់គ្រង", color: "bg-destructive/10 text-destructive border-destructive/20" },
  camp_manager: { label: "អ្នកគ្រប់គ្រងជំរំ", color: "bg-[hsl(199,89%,48%)]/10 text-[hsl(199,89%,48%)] border-[hsl(199,89%,48%)]/20" },
  pcdm_staff: { label: "បុគ្គលិក PCDM", color: "bg-[hsl(262,83%,58%)]/10 text-[hsl(262,83%,58%)] border-[hsl(262,83%,58%)]/20" },
  ncdm_staff: { label: "បុគ្គលិក NCDM", color: "bg-[hsl(142,76%,36%)]/10 text-[hsl(142,76%,36%)] border-[hsl(142,76%,36%)]/20" },
};

export default function UserManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isPermissionsDialogOpen, setIsPermissionsDialogOpen] = useState(false);
  const { toast } = useToast();

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateUser = () => {
    toast({
      title: "បង្កើតអ្នកប្រើប្រាស់បានជោគជ័យ",
      description: "អ្នកប្រើប្រាស់ថ្មីត្រូវបានបន្ថែមដោយជោគជ័យ។",
    });
    setIsCreateDialogOpen(false);
  };

  const columns = [
    {
      key: "name",
      header: "អ្នកប្រើប្រាស់",
      render: (user: User) => (
        <div>
          <p className="font-medium">{user.name}</p>
          <p className="text-sm text-muted-foreground">{user.email}</p>
        </div>
      ),
    },
    {
      key: "role",
      header: "តួនាទី",
      render: (user: User) => (
        <Badge variant="outline" className={roleLabels[user.role].color}>
          {roleLabels[user.role].label}
        </Badge>
      ),
    },
    {
      key: "location",
      header: "ទីតាំង",
      render: (user: User) => (
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-muted-foreground" />
          <span>{user.location}</span>
        </div>
      ),
    },
    {
      key: "status",
      header: "ស្ថានភាព",
      render: (user: User) => <StatusBadge status={user.status} />,
    },
    {
      key: "actions",
      header: "",
      render: (user: User) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <UserCog className="w-4 h-4 mr-2" />
              កែប្រែអ្នកប្រើប្រាស់
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Shield className="w-4 h-4 mr-2" />
              ផ្លាស់ប្តូរតួនាទី
            </DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">
              បិទដំណើរការ
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <div className="animate-fade-in">
      <PageHeader title="ការគ្រប់គ្រងអ្នកប្រើប្រាស់ និងតួនាទី" description="គ្រប់គ្រងអ្នកប្រើប្រាស់ប្រព័ន្ធ និងសិទ្ធិ">
        <Dialog open={isPermissionsDialogOpen} onOpenChange={setIsPermissionsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">
              <Shield className="w-4 h-4 mr-2" />
              សិទ្ធិតួនាទី
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>តារាងសិទ្ធិតួនាទី</DialogTitle>
            </DialogHeader>
            <div className="pt-4">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 font-medium">សិទ្ធិ</th>
                    <th className="text-center py-2 font-medium">ជំរំ</th>
                    <th className="text-center py-2 font-medium">PCDM</th>
                    <th className="text-center py-2 font-medium">NCDM</th>
                    <th className="text-center py-2 font-medium">អ្នកគ្រប់គ្រង</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {[
                    ["ចុះឈ្មោះគ្រួសារ", true, false, false, true],
                    ["មើលគ្រួសារ", true, true, true, true],
                    ["បញ្ជាក់ទំនិញ", true, false, false, true],
                    ["ស្នើសុំទំនិញ", true, false, false, true],
                    ["អនុម័តសំណើ", false, true, true, true],
                    ["គ្រប់គ្រងស្តុក", false, true, true, true],
                    ["មើលរបាយការណ៍", false, true, true, true],
                    ["គ្រប់គ្រងអ្នកប្រើប្រាស់", false, false, true, true],
                    ["កំណត់រចនាសម្ព័ន្ធទម្រង់", false, false, true, true],
                  ].map(([permission, ...roles], i) => (
                    <tr key={i}>
                      <td className="py-2">{permission}</td>
                      {roles.map((allowed, j) => (
                        <td key={j} className="text-center py-2">
                          {allowed ? (
                            <span className="text-success">✓</span>
                          ) : (
                            <span className="text-muted-foreground">—</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </DialogContent>
        </Dialog>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              បង្កើតអ្នកប្រើប្រាស់
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>បង្កើតអ្នកប្រើប្រាស់ថ្មី</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label>ឈ្មោះពេញ</Label>
                <Input placeholder="បញ្ចូលឈ្មោះពេញ" />
              </div>
              <div className="space-y-2">
                <Label>អាសយដ្ឋានអ៊ីមែល</Label>
                <Input type="email" placeholder="បញ្ចូលអ៊ីមែល" />
              </div>
              <div className="space-y-2">
                <Label>តួនាទី</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="ជ្រើសរើសតួនាទី" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="camp_manager">អ្នកគ្រប់គ្រងជំរំ</SelectItem>
                    <SelectItem value="pcdm_staff">បុគ្គលិក PCDM</SelectItem>
                    <SelectItem value="ncdm_staff">បុគ្គលិក NCDM</SelectItem>
                    <SelectItem value="admin">អ្នកគ្រប់គ្រង</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>ទីតាំង</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="ជ្រើសរើសទីតាំង" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="national">ការិយាល័យកណ្តាល</SelectItem>
                    <SelectItem value="province_a">ខេត្ត ក</SelectItem>
                    <SelectItem value="province_b">ខេត្ត ខ</SelectItem>
                    <SelectItem value="camp_alpha">ជំរំ អាល់ផា</SelectItem>
                    <SelectItem value="camp_beta">ជំរំ បេតា</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="w-full" onClick={handleCreateUser}>
                បង្កើតអ្នកប្រើប្រាស់
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </PageHeader>

      {/* ការស្វែងរក */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="ស្វែងរកអ្នកប្រើប្រាស់..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* តារាង */}
      <DataTable columns={columns} data={filteredUsers} />
    </div>
  );
}
