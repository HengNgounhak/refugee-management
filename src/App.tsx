import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Public Pages
import PublicDashboard from "./pages/public/PublicDashboard";

// Camp Pages
import CampDashboard from "./pages/camp/CampDashboard";
import RegisterFamily from "./pages/camp/RegisterFamily";
import FamilyProfiles from "./pages/camp/FamilyProfiles";
import FamilyProfile from "./pages/camp/FamilyProfile";
import ConfirmItems from "./pages/camp/ConfirmItems";
import RequestItems from "./pages/camp/RequestItems";
import Items from "./pages/camp/Items";

// PCDM Pages
import PCDMDashboard from "./pages/pcdm/PCDMDashboard";
import CampDataReview from "./pages/pcdm/CampDataReview";
import ItemRequests from "./pages/pcdm/ItemRequests";
import AllocateItems from "./pages/pcdm/AllocateItems";
import Inventory from "./pages/pcdm/Inventory";
import PCDMUserManagement from "./pages/pcdm/PCDMUserManagement";

// NCDM Pages
import NCDMDashboard from "./pages/ncdm/NCDMDashboard";
import FormManagement from "./pages/ncdm/FormManagement";
import UserManagement from "./pages/ncdm/UserManagement";
import FormBuilderUser from "./pages/ncdm/FormBuilderUser";
import FormBuilderCamp from "./pages/ncdm/FormBuilderCamp";
import FormBuilderFamily from "./pages/ncdm/FormBuilderFamily";
import NCDMCampDataReview from "./pages/ncdm/NCDMCampDataReview";
import NewsManagement from "./pages/ncdm/NewsManagement";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <HashRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          
          {/* Public Routes */}
          <Route path="/public/dashboard" element={<MainLayout><PublicDashboard /></MainLayout>} />
          
          {/* Camp Staff Routes */}
          <Route path="/camp/dashboard" element={<MainLayout><CampDashboard /></MainLayout>} />
          <Route path="/camp/register" element={<MainLayout><RegisterFamily /></MainLayout>} />
          <Route path="/camp/families" element={<MainLayout><FamilyProfiles /></MainLayout>} />
          <Route path="/camp/family/:familyId" element={<MainLayout><FamilyProfile /></MainLayout>} />
          <Route path="/camp/items" element={<MainLayout><Items /></MainLayout>} />
          <Route path="/camp/confirm" element={<MainLayout><ConfirmItems /></MainLayout>} />
          <Route path="/camp/request" element={<MainLayout><RequestItems /></MainLayout>} />
          
          {/* PCDM Routes */}
          <Route path="/pcdm/dashboard" element={<MainLayout><PCDMDashboard /></MainLayout>} />
          <Route path="/pcdm/camps" element={<MainLayout><CampDataReview /></MainLayout>} />
          <Route path="/pcdm/requests" element={<MainLayout><ItemRequests /></MainLayout>} />
          <Route path="/pcdm/allocate" element={<MainLayout><AllocateItems /></MainLayout>} />
          <Route path="/pcdm/inventory" element={<MainLayout><Inventory /></MainLayout>} />
          <Route path="/pcdm/users" element={<MainLayout><PCDMUserManagement /></MainLayout>} />
          
          {/* NCDM Routes */}
          <Route path="/ncdm/dashboard" element={<MainLayout><NCDMDashboard /></MainLayout>} />
          <Route path="/ncdm/camps" element={<MainLayout><NCDMCampDataReview /></MainLayout>} />
          <Route path="/ncdm/form-user" element={<MainLayout><FormBuilderUser /></MainLayout>} />
          <Route path="/ncdm/form-camp" element={<MainLayout><FormBuilderCamp /></MainLayout>} />
          <Route path="/ncdm/form-family" element={<MainLayout><FormBuilderFamily /></MainLayout>} />
          <Route path="/ncdm/forms" element={<MainLayout><FormManagement /></MainLayout>} />
          <Route path="/ncdm/users" element={<MainLayout><UserManagement /></MainLayout>} />
          <Route path="/ncdm/news" element={<MainLayout><NewsManagement /></MainLayout>} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </HashRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
