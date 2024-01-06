import Component from "../../../core/Component.js";
export default class AgeStage extends Component {
  setup() {
    this.state = { age: 25 };
  }

  template() {
    const complete = this.state.age !== undefined;
    return `
      <div class="register-content">
        <div class="question-container">
          <p class="number">2/5</p>
          <p class="question">카팅님의 나이는 어떻게 되시나요?</p>
        </div>
        <div class="age-slider">
          <p>${this.state.age}</p>
          <input data-component="slider" type="range" min="1" max="100" value="25" step="1" />
        </div>
      </div>
      <div class="next-button-container">
        <button data-component="next-btn" class="carting-button ${
          complete ? "clicked" : "disabled"
        }" type="button">다음</button>
      </div>
    `;
  }

  mounted() {
    const complete = this.state.age !== undefined;
    const slider = this.target.querySelector('[data-component="slider"]');
    slider.oninput = (e) => {
      this.setState({ age: e.target.value });
    };

    const btn = this.target.querySelector('[data-component="next-btn"]');
    btn.onclick = () => {
      if (!complete) return;
      this.props.proceed({ age: this.state.age });
    };
  }
}
