import ReactDOM from 'react-dom';

export function register(root = 'root', fn) {
  let rootElement;
  if (typeof root === 'string') {
    rootElement = document.getElementById(root);
  } else {
    rootElement = root;
  }

  const render = (rootElement => {
    fn((Component) => {
      return ReactDOM.render(Component, rootElement);
    }, rootElement);
  });

  if (rootElement) {
    if (rootElement.length === 1 || rootElement.length === undefined) {
      return render(rootElement);
    } else {
      const collections = Array.from(rootElement);
      return collections.map(rel => render(rel));
    }
  }
};
