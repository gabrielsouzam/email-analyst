import AppLogo from "./../assets/logo.svg"

export function Header() {
  return (
    <header className="px-10 py-8 bg-blue-950 flex items-center gap-3 justify-center lg:justify-start">
      <img src={AppLogo} alt="Logo da aplicação" className="w-16 h-auto" />

      <h1 className="text-4xl font-semibold text-zinc-100">
        E-mail Analyst
      </h1>
    </header>
  )
}