"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Home, Map, Package, ShieldAlert, HeartHandshake, Bell } from 'lucide-react';

const mobileNavItems = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Map', href: '/map', icon: Map },
  { name: 'Alerts', href: '/alerts', icon: Bell },
  { name: 'SOS', href: '/family', icon: ShieldAlert },
  { name: 'Resources', href: '/resources', icon: Package },
  { name: 'Assistant', href: '/assistant', icon: HeartHandshake },
];

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden glass-nav border-t border-white/5 sticky bottom-0 z-50 px-2 pb-safe pt-2">
      <div className="flex justify-around items-center h-14">
        {mobileNavItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href));
          const Icon = item.icon;
          
          return (
            <Link key={item.name} href={item.href} className="relative flex flex-col items-center justify-center w-full h-full">
              <div className="relative z-10 flex flex-col items-center gap-1">
                <Icon className={`w-5 h-5 transition-colors ${isActive ? 'text-cyan-400' : 'text-zinc-500'}`} />
                <span className={`text-[10px] font-medium transition-colors ${isActive ? 'text-cyan-400' : 'text-zinc-500'}`}>
                  {item.name}
                </span>
              </div>
              
              {isActive && (
                <motion.div
                  layoutId="mobile-nav-active"
                  className="absolute inset-0 bg-cyan-500/10 rounded-xl mx-1"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
