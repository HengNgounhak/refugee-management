import { useState } from "react";
import { Search, CheckCircle, XCircle, Edit, Package } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { StatusBadge } from "@/components/ui/status-badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface ItemRequest {
  id: string;
  camp: string;
  item: string;
  requestedQty: number;
  priority: "normal" | "urgent";
  status: "pending" | "approved" | "rejected";
  requestDate: string;
}

const requests: ItemRequest[] = [
  { id: "1", camp: "ជំរំ អាល់ហ្វា", item: "អង្ករ (១០គីឡូ)", requestedQty: 200, priority: "urgent", status: "pending", requestDate: "2024-01-20" },
  { id: "2", camp: "ជំរំ បេតា", item: "ភួយ", requestedQty: 150, priority: "normal", status: "pending", requestDate: "2024-01-19" },
  { id: "3", camp: "ជំរំ អាល់ហ្វា", item: "កញ្ចប់ឱសថ", requestedQty: 50, priority: "urgent", status: "pending", requestDate: "2024-01-18" },
  { id: "4", camp: "ជំរំ ហ្គាម៉ា", item: "ប្រេងឆា (២លីត្រ)", requestedQty: 100, priority: "normal", status: "approved", requestDate: "2024-01-17" },
  { id: "5", camp: "ជំរំ បេតា", item: "កញ្ចប់អនាម័យ", requestedQty: 80, priority: "normal", status: "rejected", requestDate: "2024-01-16" },
];

export default function ItemRequests() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const { toast } = useToast();

  const filteredRequests = requests.filter((request) => {
    const matchesSearch = request.camp.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.item.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || request.status === statusFilter;
    const matchesPriority = priorityFilter === "all" || request.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const handleApprove = (id: string) => {
    toast({
      title: "សំណើត្រូវបានអនុម័ត",
      description: "សំណើទំនិញត្រូវបានអនុម័ត និងបន្ថែមទៅក្នុងជួរបែងចែក។",
    });
  };

  const handleReject = (id: string) => {
    toast({
      title: "សំណើត្រូវបានបដិសេធ",
      description: "សំណើទំនិញត្រូវបានបដិសេធ។",
      variant: "destructive",
    });
  };

  const columns = [
    { key: "camp", header: "ជំរំ" },
    { 
      key: "item", 
      header: "ទំនិញ",
      render: (r: ItemRequest) => (
        <div className="flex items-center gap-2">
          <Package className="w-4 h-4 text-muted-foreground" />
          <span>{r.item}</span>
        </div>
      )
    },
    { 
      key: "requestedQty", 
      header: "បរិមាណស្នើសុំ",
      className: "text-center",
      render: (r: ItemRequest) => <span className="font-semibold">{r.requestedQty}</span>
    },
    { 
      key: "priority", 
      header: "អាទិភាព",
      render: (r: ItemRequest) => <StatusBadge status={r.priority} />
    },
    { 
      key: "status", 
      header: "ស្ថានភាព",
      render: (r: ItemRequest) => <StatusBadge status={r.status} />
    },
    { 
      key: "requestDate", 
      header: "កាលបរិច្ឆេទ",
      render: (r: ItemRequest) => new Date(r.requestDate).toLocaleDateString()
    },
    {
      key: "actions",
      header: "សកម្មភាព",
      render: (r: ItemRequest) => (
        r.status === "pending" ? (
          <div className="flex gap-1">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 text-success hover:text-success hover:bg-success/10"
              onClick={() => handleApprove(r.id)}
            >
              <CheckCircle className="w-4 h-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 text-muted-foreground hover:text-foreground"
            >
              <Edit className="w-4 h-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
              onClick={() => handleReject(r.id)}
            >
              <XCircle className="w-4 h-4" />
            </Button>
          </div>
        ) : (
          <span className="text-sm text-muted-foreground">—</span>
        )
      ),
    },
  ];

  return (
    <div className="animate-fade-in">
      <PageHeader 
        title="សំណើទំនិញ" 
        description="ពិនិត្យ និងគ្រប់គ្រងសំណើទំនិញពីជំរំ"
      />

      {/* តម្រង */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="ស្វែងរកតាមជំរំ ឬទំនិញ..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="អាទិភាព" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">អាទិភាពទាំងអស់</SelectItem>
                <SelectItem value="urgent">បន្ទាន់</SelectItem>
                <SelectItem value="normal">ធម្មតា</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="ស្ថានភាព" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">ស្ថានភាពទាំងអស់</SelectItem>
                <SelectItem value="pending">កំពុងរង់ចាំ</SelectItem>
                <SelectItem value="approved">បានអនុម័ត</SelectItem>
                <SelectItem value="rejected">បានបដិសេធ</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* តារាង */}
      <DataTable columns={columns} data={filteredRequests} />
    </div>
  );
}
