import Component from "../core/Component.js";

export default class Modal extends Component {
  template() {
    return `<div data-component="container" class="modal-container"><div data-component="modal" class="modal ${
      props.bottom ? "modal-bottom" : ""
    }></div></div>`;
  }

  mounted() {
    const modal = target.querySelector('[data-component="modal"]');
    // render child components
    this.props.renderChildren(modal);
  }
}
