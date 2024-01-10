import Component from "./core/Component.js";
import { getPage } from "./core/Router.js";

export default class App extends Component {
  setup() {
    this.state = { pageConstructor: getPage() };
  }

  template() {
    return `
      <div data-component="container"></div>
    `;
  }

  mounted() {
    const container = this.target.querySelector('[data-component="container"]');

    // router change event
    window.onhashchange = () => {
      this.force = true;
      this.setState({ pageConstructor: getPage() });
    };

    console.log(this.state);

    // render current route
    new this.state.pageConstructor(container, {});
  }
}
