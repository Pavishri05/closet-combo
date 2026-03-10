import "./globals.css"

export const metadata = {
  title: "Closet Combo Genius",
  description: "AI wardrobe planner",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-[#f4efe7] text-black min-h-screen flex flex-col">

        {/* HEADER */}

        <header className="bg-[#4b2e1f] text-white shadow">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

            <h1 className="text-lg font-bold">
              Closet Combo Genius 👗
            </h1>

            <nav className="flex gap-6 text-sm">
              <a href="/" className="hover:underline">
                Home
              </a>
              <a href="#cupboard" className="hover:underline">
                Cupboard
              </a>
            </nav>

          </div>
        </header>


        {/* MAIN CONTENT */}

        <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-10">

          {children}

        </main>


        {/* FOOTER */}

        <footer className="bg-[#4b2e1f] text-white text-center py-4 text-sm">

          © 2026 Closet Combo Genius

        </footer>

      </body>
    </html>
  )
}