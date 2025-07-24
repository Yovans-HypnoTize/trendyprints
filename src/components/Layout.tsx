
import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { ThemeProvider } from "./ThemeProvider";
import { ScrollArea } from "@/components/ui/scroll-area";

export function Layout() {
  return (
    <ThemeProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <ScrollArea className="h-[calc(100vh-64px)]">
            <div className="pb-12">
              <Outlet />
            </div>
          </ScrollArea>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
