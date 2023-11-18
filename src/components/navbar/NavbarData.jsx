import { BookOpenIcon, ChatBubbleLeftRightIcon, Squares2X2Icon, UserGroupIcon, } from '@heroicons/react/24/solid';
import React from 'react';
import * as p from '../../pages';

export const NavbarData =  [
  {
    icon: <Squares2X2Icon />,
    text: 'Dashboard',
    link: '/c', 
    elementLabel: <p.Dashboard />,
  },
  {
    icon: <ChatBubbleLeftRightIcon />,
    text: 'Chats',
    link: 'chats', 
    elementLabel: <p.Chats />,
  },
  {
    icon: <UserGroupIcon />,
    text: 'Channel',
    link: 'channels', 
    elementLabel: <p.Channel />,
  },
  {
    icon: <BookOpenIcon />,
    text: 'People',
    link: 'people', 
    elementLabel: <p.People />,
  },
]
