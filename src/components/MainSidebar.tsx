'use client'

import { HomeIcon, UserIcon, X } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'

const Sidebar = () => {
  return (
    <aside className="bg-white shadow-inner p-4 max-w-xs h-full relative">


      <Button>
        sad
      </Button>

      <div className="h-16 flex items-center justify-center font-bold text-xl">
        My Dashboard
      </div>

      <nav>
        <ul>
          <li className="mb-4">
            <Link href="/users" className="flex items-center gap-2 text-gray-500 hover:text-red-500">
                <HomeIcon className="h-6 w-6" />
                <span>Home</span>
            </Link>
          </li>
          <li className="mb-4">
            <Link href="/profile" className="flex items-center gap-2 text-gray-500 hover:text-red-500">
                <UserIcon className="h-6 w-6" />
                <span>Profile</span>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar