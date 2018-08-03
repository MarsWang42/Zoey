import VNode from './VNode';
const EMPTY_CHILDREN = [];

/*
 * Take DOM type, props and children, return VNode.
 * Supporting nested children, will all be flattened and put into array.
 */
export function createElement(type, props) {
  let children = EMPTY_CHILDREN;
  let stack = [];
  let child, simple, lastSimple;

  // Can accepting more than 2 arguments as children
  for (i = arguments.length; i > 2; i -= 1) {
    stack.push(arguments[i]);
  }
  if (props && props.children !== null) {
    if (!stack.length) stack.push(props.children);
    delete props.children;
  }

  while (stack.length) {
    if ((child = stack.pop()) && child.pop !== undefined) {
      for (i = child.length; i > 0; i -= 1)
        stack.push(child[i]);
    } else {
      if (typeof child === 'boolean')
        child = null;

      if (simple = typeof type !== 'function') {
        if (child === null) child = null;
        else if (typeof child === 'number') child = String(child);
        else if (typeof child !== 'string') simple = false;
      }

      // If both current node and previous node is string,
      // concat them.
      if (simple && lastSimple)
        children[children.length - 1] += child;
      else if (children === EMPTY_CHILDREN)
        children = [child]
      else children.push(child);

      lastSimple = simple;
    }
  }

  return new VNode(type, props, children);
}