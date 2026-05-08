import { Outlet, NavLink } from 'react-router-dom';
import { Home, CreditCard, TrendingUp, Send, GraduationCap, Moon, Sun } from 'lucide-react';
import borderlessLogo from '../assets/logo_borderless.svg';
import credilaLogo from '../assets/credila.svg';
import { useTheme } from '../context/ThemeContext';

const desktopNavItems = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/loan', label: 'My Loan', icon: GraduationCap },
  { to: '/card', label: 'Borderless Account', icon: CreditCard },
  { to: '/send', label: 'Send Money', icon: Send },
  { to: '/wealth', label: 'Investing', icon: TrendingUp },
];

const mobileNavItems = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/loan', label: 'My Loan', icon: GraduationCap },
  { to: '/card', label: 'My Account', icon: CreditCard },
  { to: '/send', label: 'Send Money', icon: Send },
  { to: '/wealth', label: 'Investing', icon: TrendingUp },
];

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen max-w-md mx-auto md:max-w-none md:flex-row bg-[#f0f2ff] dark:bg-[#0f1117]">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-white dark:bg-[#1a1d2e] border-r border-gray-100 dark:border-[#252942] h-screen sticky top-0 overflow-y-auto">
        <Header />
        <nav className="flex-1 p-4 space-y-1">
          {desktopNavItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all ${
                  isActive
                    ? 'bg-[#0062db] text-white shadow-sm'
                    : 'text-gray-500 dark:text-gray-400 hover:bg-indigo-50 dark:hover:bg-[#252942] hover:text-gray-700 dark:hover:text-gray-200'
                }`
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>
        <DesktopSidebarFooter />
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col">
        <div className="md:hidden">
          <Header />
        </div>
        <div className="flex-1 overflow-y-auto pb-24 md:pb-0">
          <Outlet />
        </div>

        {/* Mobile bottom nav */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-[#1a1d2e] border-t border-gray-100 dark:border-[#252942] flex z-50">
          {mobileNavItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `flex-1 flex flex-col items-center py-3 gap-0.5 text-xs font-medium transition-colors relative ${
                  isActive ? 'text-[#0062db]' : 'text-gray-400 dark:text-gray-500'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && <div className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-0.5 rounded-full" style={{ background: 'linear-gradient(90deg, #0062db, #6366f1)' }} />}
                  <span><Icon size={20} /></span>
                  <span>{label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </main>
    </div>
  );
}

function DesktopSidebarFooter() {
  const { dark, toggle } = useTheme();
  return (
    <div className="p-4 border-t border-gray-100 dark:border-[#252942]">
      <div className="flex items-center gap-3 px-4 py-3">
        <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold" style={{ background: 'linear-gradient(135deg, #0062db, #6366f1)' }}>S</div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">Shaurya Anand</p>
          <p className="text-xs text-gray-400 dark:text-gray-500">NYU · New York</p>
        </div>
        <button
          onClick={toggle}
          className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-100 dark:bg-[#252942] text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-[#2e3354] transition-colors flex-shrink-0"
          aria-label="Toggle dark mode"
        >
          {dark ? <Sun size={15} /> : <Moon size={15} />}
        </button>
      </div>
    </div>
  );
}

function Header() {
  const { dark, toggle } = useTheme();
  return (
    <header className="flex items-center justify-between px-4 py-3 bg-white dark:bg-[#1a1d2e] border-b border-gray-100 dark:border-[#252942] md:border-b-0">
      <div className="flex items-center gap-2.5">
        {/* Real Borderless logo */}
        <img src={borderlessLogo} alt="Borderless" className="h-6 w-auto" />

        {/* Divider */}
        <div className="w-px h-5 bg-gray-200 dark:bg-[#252942]" />

        {/* Real Credila logo */}
        <img src={credilaLogo} alt="Credila" className="h-7 w-auto" />
      </div>

      <div className="md:hidden flex items-center gap-2">
        <button
          onClick={toggle}
          className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-100 dark:bg-[#252942] text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-[#2e3354] transition-colors"
          aria-label="Toggle dark mode"
        >
          {dark ? <Sun size={15} /> : <Moon size={15} />}
        </button>
        <button className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0" style={{ background: 'linear-gradient(135deg, #0062db, #6366f1)' }}>
          S
        </button>
      </div>
    </header>
  );
}
