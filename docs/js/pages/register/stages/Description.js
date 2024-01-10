import Component from "../../../core/Component.js";

export default class DescriptionStage extends Component {
  setup() {
    this.state = {
      choice: -1,
      text: "",
      modal: false,
    };
  }

  template() {
    const complete =
      (this.state.choice !== -1 && this.state.choice !== 4) ||
      this.state.text.length > 0;
    return `
      <div class="register-content">
        <div class="question-container">
          <p class="question">Q3.</p>
          <p class="question">간단한 소개를 입력해주세요!</p>
          <p class="description">본인을 나타낼 수 있는 짧은 소개면 좋아요!</p>
          <p class="description bold">가고싶은 목적지가 있다면 적어주세요!</p>
        </div>
        <div class="selection" data-component="desc">${choiceToString(
          this.state.choice
        )}</div>
        ${
          this.state.choice === 4
            ? `<div class="input-container"><input data-component="input" class="input-name" value="${this.state.text}"/></div>`
            : ""
        }
      </div>
      <div class="next-button-container">
        <button data-component="next-btn" class="carting-button ${
          complete ? "clicked" : "disabled"
        }" type="button">다음</button>
      </div>
      ${
        this.state.modal
          ? `<div data-component="modal-back" class="modal-container">
              <div data-component="modal" class="modal modal-bottom">
                <p>간단한 소개</p>
                <fieldset>
                ${choices
                  .map(
                    (v, i) =>
                      `<div data-component="field"><input type="radio" name="choices" ${
                        i === this.state.choice ? "checked" : ""
                      }/><span>${v}</span></div>`
                  )
                  .join("")}
                </fieldset>
              </div>
            </div>`
          : ""
      }
      
    `;
  }

  mounted() {
    const complete =
      (this.state.choice !== -1 && this.state.choice !== 4) ||
      this.state.text.length > 0;

    const desc = this.target.querySelector('[data-component="desc"]');
    desc.onclick = () => this.setState({ modal: true });

    const btn = this.target.querySelector('[data-component="next-btn"]');
    btn.onclick = () => {
      if (complete) {
        this.props.proceed({
          info: getText(this.state.choice, this.state.text),
        });
      }
    };

    const modal = this.target.querySelector('[data-component="modal"]');
    if (modal) {
      modal.onclick = (e) => {
        e.stopPropagation();
      };
    }

    const modalBack = this.target.querySelector(
      '[data-component="modal-back"]'
    );
    if (modalBack) {
      modalBack.onclick = () => this.setState({ modal: false });
    }

    const fields = this.target.querySelectorAll('[data-component="field"]');
    fields.forEach((v, i) => {
      v.onclick = () => this.setState({ choice: i, modal: false });
    });

    const input = this.target.querySelector('[data-component="input"]');
    if (input) {
      input.onkeyup = (e) => {
        this.setState({ text: e.target.value });
      };
    }
  }
}

const choices = [
  "밥 같이 먹어요 🍚",
  "카페 같이 가요 ☕",
  "같이 드라이브해요 🚗",
  "같이 놀아요 🎠",
  "직접 입력",
];

function choiceToString(choice) {
  if (choice === -1) return "간단한 소개를 입력해주세요";
  return choices[choice];
}

function getText(choice, fallback) {
  if (choice === -1) return fallback;
  return choices[choice];
}
