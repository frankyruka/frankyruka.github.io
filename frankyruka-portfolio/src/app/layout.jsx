import "./globals.css";
import NavBar from "@/components/NavBar";
import CursorFollower from "@/components/CursorComponent";

export const metadata = {
    title: "Frankyruka's Portfolio",
    description: "Artist Portfolio",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" className="h-full">
            <body className="h-full m-0 p-0 overflow-x-hidden">
                <NavBar className="fixed top-0 left-0 w-full z-50" />
                <CursorFollower />
                {children}
            </body>
        </html>
    );
}
