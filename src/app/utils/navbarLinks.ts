import notifications from '../../../public/notifications.svg';
import account from '../../../public/account.svg';
import logout from '../../../public/logout.svg';

export const navbarLinks = [
    {
        src: notifications,
        alt: 'Notifications',
        href: '/notifications',
        isButton: false
    },
    {
        src: account,
        alt: 'Account',
        href: '/account',
        isButton: false
    },
    {
        src: logout,
        alt: 'Logout',
        href: '',
        isButton: true
    }
];
