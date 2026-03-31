/**
 * Maps old ssk-icon names to Lucide icon component names.
 * Used by Icon.svelte to resolve icon references.
 */
export const iconMap: Record<string, string> = {
	// Navigation
	'outline-bars-3-center-left': 'Menu',
	'outline-magnifying-glass': 'Search',
	'outline-arrow-left': 'ArrowLeft',

	// Notification
	'outline-bell': 'Bell',
	'outline-envelope': 'Mail',
	'outline-information-circle': 'Info',

	// Business
	'outline-building-storefront': 'Store',
	'outline-shopping-bag': 'ShoppingBag',
	'outline-chart-bar-square': 'BarChart3',
	'outline-folder': 'Folder',
	'outline-wallet': 'Wallet',
	'outline-banknotes': 'Banknote',
	'outline-queue-list': 'ListTodo',
	'outline-truck': 'Truck',
	'outline-server-stack': 'Server',

	// People
	'outline-user': 'User',
	'outline-users': 'Users',
	'outline-user-plus': 'UserPlus',

	// Actions
	'outline-plus': 'Plus',
	'outline-pencil': 'Pencil',
	'outline-x-mark': 'X',
	'outline-share': 'Share2',
	'outline-link': 'Link',
	'outline-check-circle': 'CheckCircle2',
	'outline-puzzle-piece': 'Puzzle',
	'outline-shield-check': 'ShieldCheck',
	'outline-cog-8-tooth': 'Settings',

	// Solid variants
	'solid-spinner': 'Loader2',
	'solid-check-circle': 'CheckCircle2',
	'solid-arrow-right-on-rectangle': 'LogOut'
};
