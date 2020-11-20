import * as React from 'react';
import Link from 'next/link';

export const TopNav = () => {
  return (
    <div className="flex flew-row justify-between bg-gray-800">
      <span className="m-4 text-3xl">David Zheng</span>
      <nav>
        <ul className="flex flex-row">
          <Link href="/about">
            <a className="p-8 hover:bg-gray-900">About Me</a>
          </Link>
          <Link href="/experience">
            <a className="p-8 hover:bg-gray-900">Experience</a>
          </Link>
          <Link href="/blog">
            <a className="p-8 hover:bg-gray-900">Blog</a>
          </Link>
          <Link href="/contact">
            <a className="p-8 hover:bg-gray-900">Contact</a>
          </Link>
        </ul>
      </nav>
    </div>
  );
};
