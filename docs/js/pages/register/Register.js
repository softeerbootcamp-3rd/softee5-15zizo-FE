import Component from "../../core/Component.js";
import DescriptionStage from "./stages/Description.js";
export default class RegisterPage extends Component {
  setup() {
    this.state = { step: 0, data: {} };
    // 예시
    this.stages = [
      DescriptionStage,
      DescriptionStage,
      DescriptionStage,
      DescriptionStage,
    ];
  }

  template() {
    return `
      <div class="register-outer-container">
        <div class="top-app-bar"></div>
        <div class="progress-bar">
          <div style="width:${
            (this.state.step / (this.stages.length - 1)) * 100
          }%"></div>
        </div>
        <div data-component="container" class="register-inner-container"></div>
      </div>
    `;
  }

  mounted() {
    const container = this.target.querySelector('[data-component="container"]');
    // render stage
    new this.stages[this.state.step](container, {
      proceed: (data) => {
        // 데이터 받아서 저장하고 다음 단계로 진행
        this.setState({
          step: this.state.step + 1,
          data: { ...this.state.data, ...data },
        });
      },
      data: this.state.data, // 이전에 작성한 데이터 활용할 수 있도록
    });
  }
}
