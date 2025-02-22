import { BellIcon } from '@/components/ui/icon';
import { GlobeIcon } from '../assets/icons/globe';
import { HomeIcon } from '../assets/icons/home';
import { IconLink } from '@/types';

const list: IconLink[] = [
	{
		iconName: HomeIcon,
		route: '/',
	},
	{
		iconName: GlobeIcon,
		route: '/news-feed',
	},
	{
		iconName: BellIcon,
		route: '/notifications',
	},
];
