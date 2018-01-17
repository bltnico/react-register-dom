# React register DOM

A simple method to mount React Component inside your website.
It's wrap `ReactDOM.render` and mount your Component only if his root element is in DOM ! Perfect for website that combines HTML or template engine with a few React Component.

## Usage

### Install from npm:
`npm i --save react-register-dom`

### Integrate into your app:

#### Javascript api

```javascript
register(root: string | HTMLCollection, fn: Function)
```

*index.html*
```html
(...)

  <div class="container">
    <span id="root-login"></span>
    <span id="root-signup" data-referer="https://hostname/path/name"></span>
  </div>

(...)

  <article>
    <h4>...</h4>
    <span class="root-likebutton" data-id="37"></span>
  </article>

  <article>
    <h4>...</h4>
    <span class="root-likebutton" data-id="38"></span>
  </article>

  <article>
    <h4>...</h4>
    <span class="root-likebutton" data-id="39"></span>
  </article>

(...)
```

*app.js*
```javascript
import register from 'react-register-dom';

import Login from './components/Login';
import Signup from './components/Signup';
import LikeButton from './components/LikeButton';

// With DOM id -> #root-login
register('root-login', render => render(<Login />));

// With DOM id -> #root-signup
register('root-signup', (render, rootElement) => {

  // Do something with root element
  const referer = rootElement.dataset.referer;
  render(<Signup referer={referer} />, () => {
    // Signup mounted or updated
    (...)
  });
});

const likeButtonHTMLCollection = document.getElementsByClassName('root-likebutton');

register(likeButtonHTMLCollection, (render, rootElement) => {
  const id = rootElement.dataset.id;
  render(<LikeButton id={id} />);
});
```

Or in component file like *HomeDropdown.js*
```javascript
import React, { Component } from 'react';
import register from 'react-register-dom';

class HomeDropdown extends Component {
  (...)
}

register('root-homedropdown', r => r(<HomeDropdown />));
```

#### With HTML data attribute

```javascript
registerComponent(componentName: string, component: React.ComponentType, callback?: Function)
```

*index.html*

```html
(...)

  <span
    data-component="UserProfil"
    data-props:id="56"
    data-props:username="bltnico"
    data-props:premium="false">
  </span>

(...)
```

*UserProfil.js*
```javascript
import React, { Component } from 'react';
import { registerComponent } from 'react-register-dom';

class UserProfil extends Component {

  componentDidMount() {
    const { id, username, premium } = this.props;
  }

  (...)
}

registerComponent('UserProfil', UserProfil);
```

----
**Pull request is welcomed ! :coffee:**
