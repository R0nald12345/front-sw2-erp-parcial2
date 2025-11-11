/*El layout significa que todo lo que este aqui se compartira en el carpeta de order el mismo Diseño*/

import Header from "@/src/components/dashboard/Header";
import Sidebar from "@/src/components/dashboard/Sidebar";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <div className="h-screen flex">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto p-5">{children}</main>
        </div>
      </div>
    </>
  );
}
