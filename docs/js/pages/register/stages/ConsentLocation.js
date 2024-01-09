import Component from "../../../core/Component.js";
import { globalPos } from "../../../main.js";
import { postProfile } from "../../../utils/api.js";

export default class ConsentLocationStage extends Component {
  setup() {
    this.state = {
      complete: false,
    };
  }

  template() {
    return `
            <link rel="stylesheet" href="./css/styles.css" />

            <div class="stage-container">
            <div class="provide-location-container">
                <p>카팅에 오신걸 환영해요!</p>
                <p class="ask">제주도에 계신가요?</p>
                <p class="description">
                carteeng에 현재 위치를 공유하고<br />
                주변에 있는 사람들을 확인해 보세요.<br />
                위치 정보를 공유하지 않으면<br />
                카팅 서비스를 이용할 수 없어요.
                </p>
            </div>
            <div class="circle-container">
                <img class="blur" src="./img/blur_circle.svg" />
                <img class="inner" src="./img/inner_circle.svg" />
                <img class="marker" src="./img/marker.svg" />
            </div>
            <div class="next-button-container">
                <button data-component="next-btn" class="carting-button ${
                  this.state.complete ? "disabled" : "clicked"
                }">허용</button>
            </div>
            </div>
        `;
  }

  mounted() {
    const pos = {
      lat: 0,
      lng: 0,
    };
    const btn = document.querySelector('[data-component="next-btn"]');

    btn.onclick = () => {
      if (!this.state.complete) {
        this.setState({ complete: true });
      }
    };

    if (this.state.complete) {
      const job = async (pos) => {
        const res = await postProfile({
          ...this.props.data,
          location: { lat: pos.lat, lng: pos.lng },
        });

        if (res === undefined) {
          // api 전송 실패 시 버튼 활성화
          this.setState({ complete: false });
        } else this.props.proceed();
      };

      if (globalPos === undefined) {
        // 현재 위치 가져오기
        navigator.geolocation.getCurrentPosition((position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          // api 전송
          job(pos);
        });
      } else {
        job(globalPos);
      }
    }
  }
}
