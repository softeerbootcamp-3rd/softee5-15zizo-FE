export default class Component {
  target;
  props;
  state;
  prevTemplate;
  force;

  constructor(target, props) {
    this.target = target;
    this.props = props;
    this.setup();
    this.render();
  }

  // component 생성시 한번만 실행: state init
  setup() {}

  template() {
    return "";
  }

  render() {
    const { target } = this;

    const currentTemplate = this.template().replace(/>\s+</g, "><");
    if (this.force) {
      this.target.innerHTML = currentTemplate;
      this.force = false;
    }

    const newNode = target.cloneNode(true);
    newNode.innerHTML = currentTemplate;

    if (currentTemplate !== this.prevTemplate) {
      const oldChildNodes = [...target.childNodes];
      const newChildNodes = [...newNode.childNodes];
      const max = Math.max(oldChildNodes.length, newChildNodes.length);
      for (let i = 0; i < max; i++) {
        updateElement(target, newChildNodes[i], oldChildNodes[i]);
      }
    }

    this.prevTemplate = currentTemplate;
    requestAnimationFrame(() => this.mounted());
  }

  // executed after component mount: attach dom event listeners & add child components
  mounted() {}

  // render is invoked on every setState
  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.render();
  }
}

function updateAttributes(oldNode, newNode) {
  for (const { name, value } of [...newNode.attributes]) {
    if (value === oldNode.getAttribute(name)) continue;
    oldNode.setAttribute(name, value);
  }
  for (const { name } of [...oldNode.attributes]) {
    if (newNode.getAttribute(name) !== null) continue;
    oldNode.removeAttribute(name);
  }
}

function updateElement(parent, newNode, oldNode) {
  if (
    !(oldNode instanceof Text) &&
    oldNode?.getAttribute("disable-rerender") === ""
  )
    return;

  if (!newNode && oldNode) return oldNode.remove();
  if (newNode && !oldNode) return parent.appendChild(newNode);
  if (newNode instanceof Text && oldNode instanceof Text) {
    if (oldNode.nodeValue === newNode.nodeValue) return;
    oldNode.nodeValue = newNode.nodeValue;
    return;
  }
  if (newNode.nodeName !== oldNode.nodeName) {
    const index = [...parent.childNodes].indexOf(oldNode);
    oldNode.remove();
    parent.appendChild(newNode, index);
    return;
  }
  updateAttributes(oldNode, newNode);

  const newChildren = [...newNode.childNodes];
  const oldChildren = [...oldNode.childNodes];
  const maxLength = Math.max(newChildren.length, oldChildren.length);
  for (let i = 0; i < maxLength; i++) {
    updateElement(oldNode, newChildren[i], oldChildren[i]);
  }
}
