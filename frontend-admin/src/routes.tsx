import React from 'react';

// Admin Imports

// Icon Imports
import {
  MdHome,
  MdLock,
  MdPages,
  MdPerson,
  MdSettings
} from 'react-icons/md';

const routes = [
  {
    name: 'Dashboard',
    layout: '/admin',
    path: 'default',
    icon: <MdHome className="h-6 w-6" />,
  },
  {
    name: 'Konnect',
    layout: '/admin',
    path: 'connect',
    icon: <MdPages className="h-6 w-6" />,
  },
  {
    name: 'Profile',
    layout: '/admin',
    path: 'profile',
    icon: <MdPerson className="h-6 w-6" />,
  },
  {
    name: 'Settings',
    layout: '/auth',
    path: 'sign-in',
    icon: <MdSettings className="h-6 w-6" />,
  },
  {
    name: 'Settings',
    layout: '/nf',
    path: 'sign-in',
    icon: <MdSettings className="h-6 w-6" />,
  },
  {
    name: 'NFT Marketplace',
    layout: '/admin',
    path: 'nft-marketplace',
    // icon: <MdOutlineShoppingCart className="h-6 w-6" />,

    secondary: true,
  },
];
export default routes;
