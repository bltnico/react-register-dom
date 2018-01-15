## Examples

```javascript
// With DOM id -> #root-login
register('root-login', render => render(<Login />));

// With DOM id -> #root-signup
register('root-signup', (render, rootElement) => {
  // Do something with root element
  const referer = rootElement.dataset.referer;
  render(<Signup referer={referer} />);
});

const likeButtonHTMLCollection = document.getElementsByClassName('root-likebutton');
register(likeButtonHTMLCollection, (render, rootElement) => {
  const id = rootElement.dataset.id;
  render(<LikeButton id={id} />);
});
```
