export default function Footer() {
  return (
    <footer className="border-t border-stone-200 px-6 py-8 md:px-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
        <div className="flex items-center gap-2 text-xs font-medium text-stone-500 md:text-sm">
          <span>© {new Date().getFullYear()}</span>

          <a href="#" className="group mx-1 flex cursor-pointer flex-col outline-none">
            <div className="flex items-end">
              <svg viewBox="0 0 24 24" className="h-[14px] w-[14px] stroke-current text-stone-900">
                <path
                  d="M 3 24 L 12 2 L 21 24"
                  fill="none"
                  strokeWidth="4.5"
                  strokeLinejoin="miter"
                  strokeMiterlimit="10"
                />
              </svg>
              <span className="ml-[1px] translate-y-[1px] text-sm leading-none font-medium tracking-tighter text-stone-500 transition-colors group-hover:text-stone-800">
                dark
              </span>
            </div>
            <div className="mt-1 flex w-full items-center">
              <div className="h-[1.5px] flex-grow bg-stone-300 transition-colors group-hover:bg-stone-800"></div>
              <div className="ml-1 h-1 w-1 rounded-full bg-orange-600"></div>
            </div>
          </a>

          <span>London, UK.</span>
        </div>

        <p className="text-xs font-medium text-stone-400 md:text-sm">Engineered with focus.</p>
      </div>
    </footer>
  )
}
