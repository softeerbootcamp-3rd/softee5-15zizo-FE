import Component from "../../../core/Component.js";

export default class Splash1 extends Component {
  template() {
    return `
    <div class="splash-container">
    <div class="splash-upper-container">
        <div>
        <div class="splash-main">
            <p>설레는 제주도 여행,</p>
            <p>카팅과 함께해요</p>
        </div>
        <div class="splash-description">
            <p>카팅은 제주도 여행객들의</p>
            <p>친목 도모를 위한 차량 공유 서비스예요</p>
        </div>
        </div>
        <img src="./img/map.svg" style="max-height: 170px" />
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
