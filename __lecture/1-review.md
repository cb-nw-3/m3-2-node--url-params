# 3.2.0 - Review concepts

---

## EJS

- What's the difference between these two?
  the one with "-" only shows value as HTML
  the one with "=" shows everything

```js
<%- myVar %>
<%= myVar %>
```

_...Why do we have two options?_

---

What is this for?
avoid writing the same code. fetch EJS in a other field and drop it in the spot.

```js
<%- include('<PATH_TO_EJS_FILE', {}) %>
```

_...What makes this so powerful?_
react is very big in this idea

---

What notation do we use to run JS snippets inside of an `.ejs` file?

`const array = ['one', 'two', 'three']`

```js
// Example
<ul>array.forEach(element => {<li>element</li>});</ul>
```

---

## Express

- What express _routing method_ did we use yesterday?
- What are its parameters?
- What is the minimum amount of code to set up an express server?

```js
// Example
```

---

[Next lecture: URL Params](../lecture-1-url-params)
