import { useState } from "react";
import { Newspaper, Plus, MoreVertical, Eye, EyeOff, Trash2, Edit } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

interface News {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  status: "published" | "draft";
}

const mockNews: News[] = [
  { id: "1", title: "មជ្ឈមណ្ឌលចែកចាយសម្ភារៈសង្គ្រោះថ្មីត្រូវបានបើក", date: "2024-01-15", excerpt: "មជ្ឈមណ្ឌលចែកចាយថ្មីត្រូវបានបង្កើតឡើង...", status: "published" },
  { id: "2", title: "ការចុះឈ្មោះសម្ភារៈជំនួយរដូវរងាបានបើក", date: "2024-01-12", excerpt: "គ្រួសារអាចចុះឈ្មោះសម្រាប់សម្ភារៈជំនួយរដូវរងា...", status: "published" },
  { id: "3", title: "កម្មវិធីពិនិត្យសុខភាពនឹងធ្វើឡើង", date: "2024-01-10", excerpt: "ការពិនិត្យសុខភាពឥតគិតថ្លៃនឹងមាន...", status: "draft" },
  { id: "4", title: "កាលវិភាគចែកចាយអាហារត្រូវបានធ្វើបច្ចុប្បន្នភាព", date: "2024-01-08", excerpt: "កាលវិភាគចែកចាយអាហារប្រចាំខែត្រូវបានធ្វើបច្ចុប្បន្នភាព...", status: "published" },
];

export default function NewsManagement() {
  const [news, setNews] = useState<News[]>(mockNews);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();

  const [newArticle, setNewArticle] = useState({
    title: "",
    excerpt: "",
  });

  const handleCreate = () => {
    if (!newArticle.title) {
      toast({ title: "កំហុស", description: "សូមបញ្ចូលចំណងជើង។", variant: "destructive" });
      return;
    }
    const article: News = {
      id: Date.now().toString(),
      title: newArticle.title,
      excerpt: newArticle.excerpt,
      date: new Date().toISOString().split("T")[0],
      status: "draft",
    };
    setNews([article, ...news]);
    setDialogOpen(false);
    setNewArticle({ title: "", excerpt: "" });
    toast({ title: "ព័ត៌មានត្រូវបានបង្កើត", description: "អត្ថបទត្រូវបានរក្សាទុកជាសេចក្តីព្រាង។" });
  };

  const togglePublish = (id: string) => {
    setNews(news.map(n => {
      if (n.id !== id) return n;
      const newStatus = n.status === "published" ? "draft" : "published";
      toast({ title: newStatus === "published" ? "បានផ្សព្វផ្សាយ" : "បានលាក់", description: `អត្ថបទត្រូវបាន${newStatus === "published" ? "ផ្សព្វផ្សាយ" : "លាក់"}។` });
      return { ...n, status: newStatus };
    }));
  };

  const deleteArticle = (id: string) => {
    setNews(news.filter(n => n.id !== id));
    toast({ title: "បានលុប", description: "អត្ថបទត្រូវបានដកចេញ។" });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="គ្រប់គ្រងព័ត៌មាន"
        description="បង្កើត និងគ្រប់គ្រងសេចក្តីប្រកាសព័ត៌មាន"
      />

      <div className="flex items-center justify-end">
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              បង្កើតព័ត៌មាន
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>បង្កើតអត្ថបទព័ត៌មាន</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <Label>ចំណងជើង *</Label>
                <Input
                  value={newArticle.title}
                  onChange={(e) => setNewArticle({ ...newArticle, title: e.target.value })}
                  placeholder="ចំណងជើងអត្ថបទ"
                />
              </div>
              <div>
                <Label>សេចក្តីសង្ខេប</Label>
                <Textarea
                  value={newArticle.excerpt}
                  onChange={(e) => setNewArticle({ ...newArticle, excerpt: e.target.value })}
                  placeholder="សេចក្តីសង្ខេបខ្លីនៃអត្ថបទ..."
                  rows={4}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>បោះបង់</Button>
              <Button onClick={handleCreate}>បង្កើត</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Newspaper className="w-5 h-5" />
            បញ្ជីព័ត៌មាន
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {news.map((article) => (
              <div
                key={article.id}
                className="flex items-start gap-4 p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-medium">{article.title}</h3>
                    <StatusBadge status={article.status === "published" ? "active" : "pending"} />
                  </div>
                  <p className="text-sm text-muted-foreground">{article.excerpt}</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    {new Date(article.date).toLocaleDateString("km-KH", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => togglePublish(article.id)}>
                      {article.status === "published" ? (
                        <>
                          <EyeOff className="w-4 h-4 mr-2" />
                          លាក់
                        </>
                      ) : (
                        <>
                          <Eye className="w-4 h-4 mr-2" />
                          ផ្សព្វផ្សាយ
                        </>
                      )}
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="w-4 h-4 mr-2" />
                      កែសម្រួល
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive" onClick={() => deleteArticle(article.id)}>
                      <Trash2 className="w-4 h-4 mr-2" />
                      លុប
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}