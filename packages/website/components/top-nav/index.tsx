import * as React from 'react';
import Link from 'next/link';

import './index.css';

export const TopNav = () => {
  return (
    <div className="flex flew-row justify-between bg-gray-800">
      <span className="m-4 text-3xl">David Zheng</span>
      <nav>
        <ul className="flex flex-row">
          <Link href="/about">
            <a className="nav-btn">About Me</a>
          </Link>
          <Link href="/experience">
            <a className="nav-btn">Experience</a>
          </Link>
          <Link href="/blog">
            <a className="nav-btn">Blog</a>
          </Link>
          <Link href="/contact">
            <a className="nav-btn">Contact</a>
          </Link>
        </ul>
      </nav>
    </div>
  );
};
