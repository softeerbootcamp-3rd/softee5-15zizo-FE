import Component from "../../../core/Component.js";
export default class Splash2 extends Component {
  setup() {
    this.list = [
      {
        title: "내 모습 그대로 당당하게",
        img: "./img/smile.png",
        description: "성별, 나이, 키워드를 사실대로 올려주세요.",
      },
      {
        title: "안전을 최우선으로",
        img: "./img/first.png",
        description:
          "상대방을 잘 모르는 상태에서<br/>개인 정보를 알려주지 마세요.",
      },
      {
        title: "매너 있는 대화",
        img: "./img/talk.png",
        description: "존중받고 싶은 만큼 존중을 표현해 주세요.",
      },
    ];
  }

  template() {
    return `
      <div class="splash-container">
        <div class="splash-upper-container">
          <div>
            <div class="splash-main">
              <p>카팅에 오신 것을</p>
              <p>환영합니다!</p>
            </div>
            <div class="splash-description">
              <p>아래 세 가지 규칙을 명심해주세요.</p>
            </div>
          </div>
          <div class="splash-descriptions">
          ${this.list
            .map((data) => {
              return `
                  <div class="description">
                      <div class="description-main">
                      <p>${data.title}</p>
                      <img src="${data.img}" />
                      </div>
                      <p>${data.description}</p>
                  </div>       
                  `;
            })
            .join("")}
          </div>
        </div>
        <div data-component="next-btn" class="next-button-container">
          <button class="carting-button clicked" type="button">시작하기</button>
        </div>
      </div>
      `;
  }

  mounted() {
    this.target.querySelector('[data-component="next-btn"]').onclick = () =>
      this.props.proceed();
  }
}
