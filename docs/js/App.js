import Component from "./core/Component.js";
import RegisterPage from "./pages/register/register.js";
import GenderStage from "./pages/register/stages/Description.js";

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
    new RegisterPage(container);
  }
}
