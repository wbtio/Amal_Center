import { Sidebar } from '@/components/layout/Sidebar';
import { SidebarProvider } from '@/contexts/SidebarContext';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <main className="flex-1 flex flex-col w-full md:max-w-[calc(100vw-16rem)] min-w-0">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
