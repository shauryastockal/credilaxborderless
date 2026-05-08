import { Outlet, NavLink } from 'react-router-dom';
import { Home, CreditCard, TrendingUp, Send, GraduationCap } from 'lucide-react';
import borderlessLogo from '../assets/logo_borderless.svg';
import credilaLogo from '../assets/credila.svg';

const navItems = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/loan', label: 'Loan', icon: GraduationCap },
  { to: '/send', label: 'Send', icon: Send },
  { to: '/card', label: 'Card', icon: CreditCard },
  { to: '/wealth', label: 'Wealth', icon: TrendingUp },
];

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen max-w-md mx-auto md:max-w-none md:flex-row bg-[#f5f7fa]">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-100 min-h-screen sticky top-0">
        <Header />
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-colors ${
                  isActive
                    ? 'bg-[#e8f0fe] text-[#0062db]'
                    : 'text-gray-500 hover:bg-gray-50'
                }`
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="w-8 h-8 rounded-full bg-[#0062db] flex items-center justify-center text-white text-sm font-bold">A</div>
            <div>
              <p className="text-sm font-semibold text-gray-800">Arjun Mehta</p>
              <p className="text-xs text-gray-400">NYU · New York</p>
            </div>
          </div>
        </div>
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
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex z-50">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `flex-1 flex flex-col items-center py-3 gap-0.5 text-xs font-medium transition-colors ${
                  isActive ? 'text-[#0062db]' : 'text-gray-400'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span>
                    <Icon size={20} />
                  </span>
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

function Header() {
  return (
    <header className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-100 md:border-b-0">
      <div className="flex items-center gap-2.5">
        {/* Real Borderless logo */}
        <img src={borderlessLogo} alt="Borderless" className="h-6 w-auto" />

        {/* Divider */}
        <div className="w-px h-5 bg-gray-200" />

        {/* Real Credila logo */}
        <img src={credilaLogo} alt="Credila" className="h-7 w-auto" />
      </div>

      <button className="w-8 h-8 rounded-full bg-[#0062db] flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
        A
      </button>
    </header>
  );
}

