import Component from "./core/Component.js";
import { getPage } from "./core/Router.js";

export default class App extends Component {
  setup() {
    this.state = { enabled: false };
  }

  template() {
    return `
      <div data-component="container"></div>
    `;
  }

  mounted() {
    const container = this.target.querySelector('[data-component="container"]');

    // router change event
    window.onhashchange = () => new (getPage())(container);

    // render current route
    new (getPage())(container);
  }
}
