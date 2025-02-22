import { BottomTabIcon } from '@/types';
import { HomeIcon, GlobeIcon, BellIcon } from 'lucide-react-native';
import { ProfileIcon } from '../form/user/assets/icons/profile';

/**
 * Home
 * Feed
 * Notifications
 * Profile
 */
export const BottomTabsList: BottomTabIcon[] = [
	{
		iconName: HomeIcon,
		iconText: 'Home',
		route: '/(app)/index',
	},

	{
		iconName: GlobeIcon,
		iconText: 'Feed',
		route: '/(app)/news-feed',
	},
	{
		iconName: BellIcon,
		iconText: 'Notifications',
	},
	{
		iconName: ProfileIcon,
		iconText: 'Profile',
		route: '/(app)/profile',
	},
];
