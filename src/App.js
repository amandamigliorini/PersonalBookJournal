import { createElement } from './utils';
import { initRouter } from './router';
import logoSrc from '../public/images/LogoYB.webp';


function Header(mainDiv) {
  const logo = createElement('img', {
    src: logoSrc,
    alt: 'Logo of My Personal Book Journal',
    className: 'logo'
  })

  // nav items
  const home = createElement('a', {
    href: '/#/Home',
    textContent: 'Home',
  });
  const search = createElement('a', {
    href: '/#/SearchBooks',
    textContent: 'Search Books',
  });
  const favorites = createElement('a', {
    href: '/#/Favorites',
    textContent: 'Favorites',
  })

  const nav = createElement('nav', {}, [home, search, favorites]);

  return createElement('header', {}, [logo, nav]);
}

function Footer() {
  const logo = createElement('img', {
    src: logoSrc,
    alt: 'Logo of My Personal Book Journal',
    className: 'logoFooter'
  });

  const name = createElement('h3', {
    textContent: `Amanda C S Migliorini`,
  });

  const copyright = createElement('span', {
    textContent: `Copyright © ${new Date().getFullYear()}`,
  });

  const titleFooter = createElement('div', {
    className: `titleFooter`
  },[name, copyright]);

  return createElement('footer', {}, [logo, titleFooter]);
}

function App() {
  const main = createElement('main', {}, []);

  initRouter(main);

  return createElement('div', {}, [Header(main), main, Footer()]);
}

export default App;