import React from 'react';
import { SITE_TITLE } from '~/config';
import { cn } from '~/utils/cn';
import { Button } from '../ui';

export interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  companyName?: string;
  navigationItems?: Array<{
    label: string;
    href: string;
  }>;
  showMobileMenu?: boolean;
  onMobileMenuToggle?: () => void;
}

const Header = React.forwardRef<HTMLElement, HeaderProps>(
  (
    {
      className,
      companyName = SITE_TITLE,
      navigationItems = [
        { label: 'Product', href: '#' },
        { label: 'Features', href: '#' },
        { label: 'Marketplace', href: '#' },
        { label: 'Company', href: '#' },
      ],
      showMobileMenu = false,
      onMobileMenuToggle,
      ...props
    },
    ref,
  ) => {
    return (
      <header ref={ref} className={cn('absolute inset-x-0 top-0 z-50', className)} {...props}>
        <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
          <div className="flex lg:flex-1">
            <a href="#">
              <span className="text-lg font-semibold">{companyName}</span>
            </a>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigationItems.map((item, index) => (
              <a key={index} href={item.href} className="text-sm/6 font-semibold text-gray-900">
                {item.label}
              </a>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <Button size="sm">ログイン</Button>
          </div>
        </nav>

        {showMobileMenu && (
          <div className="lg:hidden">
            <div className="fixed inset-0 z-50">
              <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                <div className="flex items-center justify-between">
                  <a href="#">
                    <span className="text-sm/6 font-semibold">{companyName}</span>
                  </a>
                  <button type="button" onClick={onMobileMenuToggle} className="-m-2.5 rounded-md p-2.5 text-gray-700">
                    <span className="sr-only">Close menu</span>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      aria-hidden="true"
                      className="size-6"
                    >
                      <path d="M6 18 18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
                <div className="mt-6 flow-root">
                  <div className="-my-6 divide-y divide-gray-500/10">
                    <div className="space-y-2 py-6">
                      {navigationItems.map((item, index) => (
                        <a
                          key={index}
                          href={item.href}
                          className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                        >
                          {item.label}
                        </a>
                      ))}
                    </div>
                    <div className="py-6">
                      <Button>Log in</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    );
  },
);

Header.displayName = 'Header';

export { Header };
