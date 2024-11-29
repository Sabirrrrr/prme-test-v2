import { css } from 'lit';
import { tw } from '../utils/tailwind-utils';

export const leftSideNavbarStyles = css`
  :host {
    ${tw`block fixed left-0 top-0 bg-white border-r border-gray-200 z-50`}
    width: 240px;
    height: 100vh;
  }

  .nav-container {
    ${tw`flex flex-col h-full`}
  }

  .menu-section {
    ${tw`flex flex-col`}
  }

  .nav-section {
    ${tw`p-4 border-b border-gray-100`}
  }

  .section-title {
    ${tw`text-xs text-gray-500 mb-3 font-semibold uppercase tracking-wider`}
  }

  .nav-items {
    ${tw`flex flex-col gap-2`}
  }

  .nav-item {
    ${tw`text-gray-700 no-underline p-2 rounded-md transition-colors duration-200 flex items-center gap-2 hover:bg-gray-100`}
  }

  .nav-item span:first-child {
    ${tw`flex items-center justify-center w-6 h-6`}
  }

  .logo-section {
    ${tw`p-4 border-b border-gray-200`}
  }

  .logo {
    ${tw`text-xl font-bold text-gray-900 no-underline block`}
  }

  .section-divider {
    ${tw`h-px bg-gray-200`}
  }
`;
