import { ChatBubbleLeftIcon, UsersIcon } from '@heroicons/react/24/solid';
import React from 'react';
import * as p from '../pages';

export const NavbarData =  [
  {
    icon: <ChatBubbleLeftIcon />,
    text: 'Chats',
    link: 'chats', 
    elementLabel: <p.Chats />,
  },
  {
    icon: <UsersIcon />,
    text: 'People',
    link: 'people', 
    elementLabel: <p.People />,
  },
]
