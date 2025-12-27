import { useState } from "react";
import { Users, Plus, MoreVertical, Shield, UserX } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

interface User {
  id: string;
  name: string;
  role: string;
  camp: string;
  province: string;
  district: string;
  status: "active" | "inactive";
}

const mockUsers: User[] = [
  { id: "1", name: "John Smith", role: "អ្នកគ្រប់គ្រងជំរំ", camp: "ជំរំ អាល់ហ្វា", province: "ខេត្ត ក", district: "ស្រុក ១", status: "active" },
  { id: "2", name: "Sarah Johnson", role: "បុគ្គលិកចែកចាយ", camp: "ជំរំ អាល់ហ្វា", province: "ខេត្ត ក", district: "ស្រុក ១", status: "active" },
  { id: "3", name: "Mike Chen", role: "អ្នកគ្រប់គ្រងជំរំ", camp: "ជំរំ បេតា", province: "ខេត្ត ក", district: "ស្រុក ២", status: "active" },
  { id: "4", name: "Emily Davis", role: "បុគ្គលិកចុះឈ្មោះ", camp: "ជំរំ ហ្គាម៉ា", province: "ខេត្ត ក", district: "ស្រុក ៣", status: "inactive" },
];

export default function PCDMUserManagement() {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();

  const [newUser, setNewUser] = useState({
    name: "",
    role: "",
    camp: "",
    province: "",
    district: "",
  });

  const filteredUsers = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.role.toLowerCase().includes(search.toLowerCase()) ||
    u.camp.toLowerCase().includes(search.toLowerCase())
  );

  const handleCreateUser = () => {
    if (!newUser.name || !newUser.role) {
      toast({ title: "កំហុស", description: "សូមបំពេញវាលដែលត្រូវការ។", variant: "destructive" });
      return;
    }
    const user: User = {
      id: Date.now().toString(),
      ...newUser,
      status: "active",
    };
    setUsers([user, ...users]);
    setDialogOpen(false);
    setNewUser({ name: "", role: "", camp: "", province: "", district: "" });
    toast({ title: "បានបង្កើតអ្នកប្រើប្រាស់", description: `${user.name} ត្រូវបានបន្ថែម។` });
  };

  const toggleStatus = (id: string) => {
    setUsers(users.map(u => u.id === id ? { ...u, status: u.status === "active" ? "inactive" : "active" } : u));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="គ្រប់គ្រងអ្នកប្រើប្រាស់"
        description="គ្រប់គ្រងបុគ្គលិកជំរំ និងតួនាទីរបស់ពួកគេ"
      />

      <div className="flex items-center justify-between gap-4">
        <Input
          placeholder="ស្វែងរកអ្នកប្រើប្រាស់..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
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
            <div className="space-y-4 py-4">
              <div>
                <Label>ឈ្មោះ *</Label>
                <Input
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  placeholder="ឈ្មោះពេញ"
                />
              </div>
              <div>
                <Label>តួនាទី *</Label>
                <Select value={newUser.role} onValueChange={(v) => setNewUser({ ...newUser, role: v })}>
                  <SelectTrigger><SelectValue placeholder="ជ្រើសរើសតួនាទី" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="អ្នកគ្រប់គ្រងជំរំ">អ្នកគ្រប់គ្រងជំរំ</SelectItem>
                    <SelectItem value="បុគ្គលិកចែកចាយ">បុគ្គលិកចែកចាយ</SelectItem>
                    <SelectItem value="បុគ្គលិកចុះឈ្មោះ">បុគ្គលិកចុះឈ្មោះ</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>ជំរំ</Label>
                <Select value={newUser.camp} onValueChange={(v) => setNewUser({ ...newUser, camp: v })}>
                  <SelectTrigger><SelectValue placeholder="ជ្រើសរើសជំរំ" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ជំរំ អាល់ហ្វា">ជំរំ អាល់ហ្វា</SelectItem>
                    <SelectItem value="ជំរំ បេតា">ជំរំ បេតា</SelectItem>
                    <SelectItem value="ជំរំ ហ្គាម៉ា">ជំរំ ហ្គាម៉ា</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>ខេត្ត</Label>
                  <Input
                    value={newUser.province}
                    onChange={(e) => setNewUser({ ...newUser, province: e.target.value })}
                    placeholder="ខេត្ត"
                  />
                </div>
                <div>
                  <Label>ស្រុក</Label>
                  <Input
                    value={newUser.district}
                    onChange={(e) => setNewUser({ ...newUser, district: e.target.value })}
                    placeholder="ស្រុក"
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>បោះបង់</Button>
              <Button onClick={handleCreateUser}>បង្កើតអ្នកប្រើប្រាស់</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            អ្នកប្រើប្រាស់
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-muted/50">
                  <th className="text-left p-3 text-xs uppercase tracking-wider font-semibold text-muted-foreground">ឈ្មោះ</th>
                  <th className="text-left p-3 text-xs uppercase tracking-wider font-semibold text-muted-foreground">តួនាទី</th>
                  <th className="text-left p-3 text-xs uppercase tracking-wider font-semibold text-muted-foreground">ជំរំ</th>
                  <th className="text-left p-3 text-xs uppercase tracking-wider font-semibold text-muted-foreground">ខេត្ត</th>
                  <th className="text-left p-3 text-xs uppercase tracking-wider font-semibold text-muted-foreground">ស្រុក</th>
                  <th className="text-left p-3 text-xs uppercase tracking-wider font-semibold text-muted-foreground">ស្ថានភាព</th>
                  <th className="text-right p-3 text-xs uppercase tracking-wider font-semibold text-muted-foreground">សកម្មភាព</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-muted/30">
                    <td className="p-3 font-medium">{user.name}</td>
                    <td className="p-3 text-sm">{user.role}</td>
                    <td className="p-3 text-sm">{user.camp}</td>
                    <td className="p-3 text-sm">{user.province}</td>
                    <td className="p-3 text-sm">{user.district}</td>
                    <td className="p-3"><StatusBadge status={user.status} /></td>
                    <td className="p-3 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Shield className="w-4 h-4 mr-2" />
                            កំណត់តួនាទី
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => toggleStatus(user.id)}>
                            <UserX className="w-4 h-4 mr-2" />
                            {user.status === "active" ? "បិទដំណើរការ" : "បើកដំណើរការ"}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
