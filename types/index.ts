import { Icon } from '@/components/ui/icon';
import type { LucideIcon } from 'lucide-react-native';

export type MobileHeaderProps = {
	title: string;
};

export type HeaderProps = {
	title: string;
	toggleSidebar: () => void;
};

export type IconLink = {
	iconName: LucideIcon | typeof Icon;
	route?: string;
};

export type BottomTabIcon = IconLink & {
	iconText: string;
};
