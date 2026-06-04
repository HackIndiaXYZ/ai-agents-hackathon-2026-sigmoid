"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { ShieldAlert, Home, Map, Package, HeartHandshake, BookOpen, Users, Bell, UserCircle } from 'lucide-react';

const NAV_ITEMS = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Map', href: '/map', icon: Map },
  { name: 'Alerts', href: '/alerts', icon: Bell },
  { name: 'Resources', href: '/resources', icon: Package },
  { name: 'Family', href: '/family', icon: ShieldAlert },
  { name: 'Community', href: '/community', icon: Users },
  { name: 'Assistant', href: '/assistant', icon: HeartHandshake },
];

export default function TopNav() {
  const pathname = usePathname();

  return (
    <header className="hidden md:flex glass-nav sticky top-0 z-50 w-full h-16 items-center px-6">
      <div className="flex items-center gap-3 w-48">
        <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center border border-cyan-500/30 shadow-cyan-glow">
          <ShieldAlert className="w-4 h-4 text-cyan-400" />
        </div>
        <span className="font-display font-bold text-white tracking-wide">Raksha AI</span>
      </div>

      <nav className="flex-1 flex justify-center items-center gap-2">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href));
          return (
            <Link key={item.name} href={item.href} className="relative px-3 py-2 rounded-lg group transition-colors">
              <span className={`text-sm font-medium z-10 relative flex items-center gap-2 ${isActive ? 'text-cyan-400' : 'text-zinc-400 group-hover:text-zinc-200'}`}>
                {item.name}
              </span>
              {isActive && (
                <motion.div
                  layoutId="topnav-active"
                  className="absolute inset-0 bg-cyan-500/10 rounded-lg border border-cyan-500/20"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="w-48 flex justify-end">
        <Link href="/impact" className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors">
          <UserCircle className="w-6 h-6" />
        </Link>
      </div>
    </header>
  );
}
