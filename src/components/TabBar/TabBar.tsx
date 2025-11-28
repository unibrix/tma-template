import { useLocation, useNavigate } from 'react-router-dom';
import { hapticFeedback } from '@tma.js/sdk-react';
import { Tabbar } from '@telegram-apps/telegram-ui';
import { useAppStore } from '@/store';

interface Tab {
  path: string;
  label: string;
  icon?: React.ReactNode;
}

interface TabBarProps {
  tabs: Tab[];
}

/**
 * Generic TabBar component with haptic feedback
 *
 * Usage:
 * ```tsx
 * const tabs = [
 *   { path: '/', label: 'Home', icon: <HomeIcon /> },
 *   { path: '/settings', label: 'Settings', icon: <SettingsIcon /> },
 * ];
 *
 * <TabBar tabs={tabs} />
 * ```
 */
export function TabBar({ tabs }: TabBarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const hapticsEnabled = useAppStore((s) => s.hapticsEnabled);

  const handleTabClick = (path: string) => {
    if (location.pathname !== path) {
      if (hapticsEnabled && hapticFeedback.selectionChanged.isAvailable()) {
        hapticFeedback.selectionChanged();
      }
      navigate(path);
    }
  };

  return (
    <div className="tabbar-wrapper">
      <Tabbar>
        {tabs.map((tab) => (
          <Tabbar.Item
            key={tab.path}
            text={tab.label}
            selected={location.pathname === tab.path}
            onClick={() => handleTabClick(tab.path)}
          >
            {tab.icon}
          </Tabbar.Item>
        ))}
      </Tabbar>
    </div>
  );
}
