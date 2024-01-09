import Component from "../../../core/Component.js";
export default class GenderStage extends Component {
  setup() {
    this.state = { gender: undefined };
  }

  template() {
    const complete = this.state.gender !== undefined;
    return `
      <div class="register-content">
        <div class="question-container">
          <p class="number">1/5</p>
          <p class="question">카팅님의 성별은 무엇인가요?</p>
        </div>
        <div class="gender-container">
          <div data-component="F" ${
            this.state.gender === "F" ? 'class="selected"' : ""
          }>여성</div>
          <div data-component="M" ${
            this.state.gender === "M" ? 'class="selected"' : ""
          }>남성</div>
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
    const complete = this.state.gender !== undefined;
    const m = this.target.querySelector('[data-component="M"]');
    m.onclick = () => this.setState({ gender: "M" });

    const f = this.target.querySelector('[data-component="F"]');
    f.onclick = () => this.setState({ gender: "F" });

    const btn = this.target.querySelector('[data-component="next-btn"]');
    btn.onclick = () => {
      if (!complete) return;
      this.props.proceed({ gender: genderToString(this.state.gender) });
    };
  }
}

function genderToString(g) {
  if (g === "M") return "MALE";
  return "FEMALE";
}
