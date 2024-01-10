import Component from "../../../core/Component.js";

export default class Keyword extends Component {
  setup() {
    this.state = {
      selected: [],
    };
  }

  template() {
    return `
            <div class="register-content">
            <div class="question-container">
            <p class="question">원하는 키워드를 선택해주세요</p>
            <p class="description">
                프로필에 표시되는 취미, 관심사, MBTI 정보입니다.<br />
                최대 3개까지 선택할 수 있어요.
            </p>
            </div><div class="keyword-list-outer">
            <div class="keyword-list-container">
            ${keywordList
              .map((data) => {
                const exist = this.state.selected.includes(data);
                return `
                    <div document-content="chip" class="chip ${
                      exist ? "checked" : "unchecked"
                    }" id=${data}>
                        <img src="${
                          exist ? "./img/check.svg" : "./img/plus.svg"
                        }"} />
                        <p>${data}</p>
                    </div>`;
              })
              .join("")}
        </div></div>
            <div class="next-button-container">
                <button data-component="next-btn" class="carting-button ${
                  this.state.selected.length > 0 ? "clicked" : "disabled"
                }" type="button">다음</button>
            </div>
        </div>
        `;
  }

  mounted() {
    const chips = document.querySelectorAll('[document-content="chip"]');
    chips.forEach((v, i) => {
      v.onclick = () => {
        // 이미 존재하면 삭제
        if (this.state.selected.includes(keywordList[i])) {
          this.setState({
            selected: this.state.selected.filter(
              (data) => data !== keywordList[i]
            ),
          });
        }
        // 존재하지 않으면 추가
        else if (this.state.selected.length < 3) {
          this.setState({
            selected: [...this.state.selected, keywordList[i]],
          });
        }
      };
    });

    const btn = document.querySelector('[data-component="next-btn"]');
    btn.onclick = () => {
      if (this.state.selected.length > 0) {
        this.props.proceed({ info: this.state.selected.join(" ") });
      }
    };
  }
}

const keywordList = [
  "바다",
  "드라이브",
  "요리",
  "카페",
  "여행",
  "패션",
  "책",
  "해수욕",
  "게스트하우스",
  "영화",
  "커피",
  "흑돼지",
  "고등어회",
  "회",
  "술",
  "애월카페거리",
  "협재",
  "애월",
  "우도",
  "성산일출봉",
  "오름",
  "한라산",
  "ENFP",
  "ESFJ",
  "ESFP",
  "ENFJ",
  "ENTJ",
  "ENTP",
  "ESTJ",
  "ESTP",
  "INFP",
  "INFJ",
  "INTJ",
  "ISTJ",
  "INTP",
  "ISTP",
  "ISFP",
  "ISFJ",
];
