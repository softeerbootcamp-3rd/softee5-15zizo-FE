export default class Component {
  target;
  props;
  state;

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
    this.target.innerHTML = this.template();
    this.mounted();
  }

  // executed after component mount: attach dom event listeners & add child components
  mounted() {}

  // render is invoked on every setState
  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.render();
  }
}
