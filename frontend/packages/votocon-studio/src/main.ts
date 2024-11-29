import { SideNav } from 'votocon-shared';

// Register shared components
customElements.get('side-nav') || customElements.define('side-nav', SideNav);

// Initialize studio app
document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <side-nav></side-nav>
  <div class="ml-60 p-4">
    <h1>Votocon Studio App</h1>
  </div>
`;
