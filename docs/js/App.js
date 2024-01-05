import Component from "./core/Component.js";

export default class App extends Component {
  setup() {
    this.state = { enabled: false };
  }

  template() {
    return `<h1 style="transition: color 1s; color: ${
      this.state.enabled ? "red" : "black"
    }">Hello world</h1>`;
  }

  mounted() {
    const title = this.target.querySelector("h1");
    title.onclick = () => {
      console.log(this.state.enabled);
      this.setState({ enabled: !this.state.enabled });
    };
  }
}
