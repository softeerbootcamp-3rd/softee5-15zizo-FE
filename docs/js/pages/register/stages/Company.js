import Component from "../../../core/Component.js";
export default class CompanyStage extends Component {
  setup() {
    this.state = { company: undefined, companyInfo: "" };
  }

  template() {
    const complete =
      this.state.company === "single" || this.state.companyInfo.length > 0;
    return `
      <div class="register-content">
        ${
          this.state.company === "double"
            ? `<div class="question-container">
                <p class="number">5/5</p>
                <p class="question">동행자에 대한 간단한 정보를 입력해주세요</p>
              </div>
              <div class="input-name-container">
                <input data-component="info-input" class="input-name" type="search" placeholder="간단한 정보를 입력해주세요" value="${this.state.companyInfo}"/>
              </div>`
            : `<div class="question-container">
                <p class="number">5/5</p>
                <p class="question">현재 동행 중이신가요?</p>
              </div>
              <div class="two-option-container">
                <div data-component="single" class="option ${
                  this.state.company === "single" ? "selected" : ""
                }">
                  <img src="/img/person_single.png" />
                  <p>혼자예요</p>
                </div>
                <div data-component="double" class="option ${
                  this.state.company === "double" ? "selected" : ""
                }">
                  <img src="/img/person_double.png" />
                  <p>둘이에요</p>
                </div>
              </div>`
        }
      </div>
      <div class="next-button-container">
        <button data-component="next-btn" class="carting-button ${
          complete ? "clicked" : "disabled"
        }" type="button">다음</button>
      </div>
    `;
  }

  mounted() {
    const complete =
      this.state.company === "single" || this.state.companyInfo.length > 0;

    const single = this.target.querySelector('[data-component="single"]');
    if (single) single.onclick = () => this.setState({ company: "single" });

    const double = this.target.querySelector('[data-component="double"]');
    if (double) double.onclick = () => this.setState({ company: "double" });

    const btn = this.target.querySelector('[data-component="next-btn"]');
    btn.onclick = () => {
      if (!complete) return;
      this.props.proceed({ company: this.state.company });
    };

    const input = document.querySelector('[data-component="info-input"]');
    if (input) {
      input.onkeyup = (e) => {
        this.setState({ companyInfo: e.target.value });
      };
    }
  }
}
