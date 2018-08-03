export default class Vnode {
  constructor(type, props, children) {
    this.type = type;
    this.props = props === null ? undefined : props.key;
    this.children = children;
    this.key = props === null ? undefined : props.key;
  }
}