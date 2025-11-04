
/*El layout significa que todo lo que este aqui se compartira en el carpeta de order el mismo Diseño*/

import Header from "@/components/dashboard/Header";
import Sidebar from "@/components/dashboard/Sidebar";

// import OrderSidebar from "@/components/order/OrderSidebar";
// import OrderSummary from "@/components/order/OrderSummary";

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode }>) {
    return (
        <>
            <div className="h-screen flex">
                <Sidebar />
                <div className="flex-1 ">
                    <Header />
                    <main className="md:flex-1 md:h-screen md:overflow-y-scroll p-5">
                        {children}
                    </main>


                </div>


                {/* <OrderSummary /> */}
            </div>
        </>
    )
}