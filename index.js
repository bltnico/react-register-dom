import React from 'react';
import ReactDOM from 'react-dom';

const COMPONENT_ATTR = '[data-component]';
const PROPS_DATASET = 'props:';

export default function register(root = 'root', fn) {
  let rootElement;
  if (typeof root === 'string') {
    rootElement = document.getElementById(root);
  } else {
    rootElement = root;
  }

  const render = (rootElement => {
    fn((component, callback = () => {}) => {
      return ReactDOM.render(component, rootElement, callback);
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

export function registerComponent(componentName, component, callback = () => {}) {
  const components = document.querySelectorAll(COMPONENT_ATTR);
  if (!components || components.length === 0) {
    return false;
  }

  const rootElements = [...components].filter(component => component.dataset.component === componentName);
  const registerComponentWithProps = rootElement => {
    const dataset = Object.assign({}, rootElement.dataset);
    const datasetProps = Object.keys(dataset).filter(attr => attr.startsWith(PROPS_DATASET));

    let props = {};
    datasetProps.map(key => {
      const propName = key.split(':')[1] || null;
      const propValue = dataset[key];
      props = {
        ...props,
        [propName]: propValue,
      };
    });

    register(rootElement, render => {
      render(React.createElement(
        component,
        props,
        null,
      ), callback);
    });
  };

  if (rootElements.length === 1) {
    return registerComponentWithProps(rootElements[0]);
  } else {
    return rootElements.map(registerComponentWithProps);
  }
};
