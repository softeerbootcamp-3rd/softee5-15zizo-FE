import Component from "../../core/Component.js";
import AgeStage from "./stages/Age.js";
import GenderStage from "./stages/Gender.js";
import CompanyStage from "./stages/Company.js";
import NameRegister from "./stages/Name.js";
import CarStage from "./stages/Car.js";
import ConsentLocationStage from "./stages/ConsentLocation.js";
import Keyword from "./stages/Keyword.js";
import Splash1 from "./stages/Splash1.js";
import Splash2 from "./stages/Splash2.js";

export default class RegisterPage extends Component {
  setup() {
    this.state = { step: 0, data: {} };
    // 예시
    this.stages = [
      Splash1,
      Splash2,
      NameRegister,
      GenderStage,
      AgeStage,
      Keyword,
      CarStage,
      CompanyStage,
      ConsentLocationStage,
    ];
  }

  template() {
    // 첫화면과 마지막 화면에서는 보여주지 않음
    const showProgress =
      this.state.step > 2 && this.state.step < this.stages.length - 1;
    return `
      <div class="register-outer-container">
        <div class="top-app-bar">
          ${
            this.state.step > 1
              ? '<img data-component="before-btn" src="./img/arrow_left.svg">'
              : ""
          }
        </div>
        <div class="progress-bar" style="visibility:${
          showProgress ? "visible" : "hidden"
        }">
          <div style="width:${
            ((this.state.step - 2) / (this.stages.length - 4)) * 100
          }%"></div>
        </div>
        <div data-component="container" class="register-inner-container"></div>
      </div>
    `;
  }

  mounted() {
    console.log(this.state.data);
    const container = this.target.querySelector('[data-component="container"]');

    // render stage
    new this.stages[this.state.step](container, {
      proceed: (data) => {
        // 마지막 단계
        if (this.state.step === this.stages.length - 1) {
          // 성공시 화면 전환
          window.location.hash = "/";
          return;
        }

        // 데이터 받아서 저장하고 다음 단계로 진행
        this.setState({
          step: this.state.step + 1,
          data: { ...this.state.data, ...data },
        });
      },
      data: this.state.data, // 이전에 작성한 데이터 활용할 수 있도록
    });

    const beforeBtn = this.target.querySelector(
      '[data-component="before-btn"]'
    );
    beforeBtn.onclick = () => {
      this.setState({ step: this.state.step - 1 });
    };
  }
}
