import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen flex flex-col bg-zinc-950">
            {/* ========== MAIN CONTENT AREA WITH BACKGROUND ========== */}
            <div className="flex-1 relative overflow-hidden">
                {/* Optimized Background Effects - CSS only, no image */}
                {/* Base gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-purple-950/30 via-zinc-950 to-zinc-950 pointer-events-none" />

                {/* Simplified glow orbs - reduced count and blur for performance */}
                <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-purple-500/25 rounded-full blur-[100px] -translate-y-1/2 pointer-events-none" />
                <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-pink-500/20 rounded-full blur-[80px] -translate-y-1/3 pointer-events-none" />
                <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-blue-600/15 rounded-full blur-[80px] -translate-x-1/2 pointer-events-none" />
                <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-600/15 rounded-full blur-[80px] translate-y-1/3 pointer-events-none" />

                {/* Lightweight grid pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />

                {/* Content */}
                <Navbar />
                <main className="relative z-10">
                    {children}
                </main>
            </div>

            {/* Footer - separate area with solid background */}
            <Footer />
        </div>
    )
}
