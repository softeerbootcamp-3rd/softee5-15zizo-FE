import Component from "../../../core/Component.js";

export default class NameRegister extends Component {
  setup() {
    this.state = {
      name: "",
      modal: false,
    };
  }

  template() {
    return `
            <div class="register-content">
                <div class="question-container">
                    <p class="question">이름이 무엇인가요?</p>
                    <p class="description">저장 후엔 변경할 수 없습니다.</p>
                    <p class="bold">프로필에 표시되는 이름입니다.</p>
                </div>
                <div class="input-name-container">
                    <input data-component="name-input" class="input-name" type="search" name="name" 
                    placeholder="이름을 입력해주세요 (3~5자)" autofocus/>
                </div>
                <div class="next-button-container">
                    <button data-component="next-btn" type="button" class="carting-button ${
                      this.state.name.length > 0 ? "clicked" : "disabled"
                    }" data-component="next-btn">다음</button>
                </div>
            </div>
            ${
              this.state.modal
                ? `
                <div data-component="modal-back" class="modal-container">
                    <div class="modal modal-center">
                        <div class="hi-container">
                            <div class="hi-content">
                                <img src="./img/waving_hand.png" style="width: 44px; height: 44px;">
                                <p class="hi">${this.state.name}님, 반가워요!</p>
                            </div>
                            <p class="hi-description">카팅을 즐기기 위해선<br/>내 정보를 입력해야해요!</p>
                        </div>
                        <div class="hi-button-container">
                            <button data-component="start-btn" class="hi-button color" type="button">지금 시작하기</button>
                            <button data-component="edit-btn" class="hi-button" type="button">이름 수정하기</button>
                        </div>
                    </div>
                </div>
                `
                : ""
            }
        `;
  }

  mounted() {
    const input = document.querySelector('[data-component="name-input"]');
    const nextBtn = document.querySelector('[data-component="next-btn"]');

    input.oninput = (e) => {
      this.setState({ name: e.target.value });
    };

    input.onkeypress = (e) => {
      if (e.keyCode === 13) {
        nextBtn.click();
      }
    };

    nextBtn.onclick = () => {
      if (this.state.name.length != 0) {
        this.setState({ modal: true });
      }
    };

    if (this.state.modal) {
      const startBtn = document.querySelector('[data-component="start-btn"]');
      startBtn.onclick = () => {
        this.props.proceed({ name: this.state.name });
      };

      const editBtn = document.querySelector('[data-component="edit-btn"]');
      editBtn.onclick = () => {
        this.setState({ modal: false });
        input.focus();
      };
    }
  }
}
