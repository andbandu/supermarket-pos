import { Sidebar } from "@/components/pos/Sidebar";
import { TopNav } from "@/components/pos/TopNav";

export default function POSLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-20">
        <TopNav pageTitle="Cashier" />
        <main className="pt-20"> {/* Add padding to account for fixed topnav */}
          {children}
        </main>
      </div>
    </div>
  );
}