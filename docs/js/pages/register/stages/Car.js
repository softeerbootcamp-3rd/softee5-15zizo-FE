import Component from "../../../core/Component.js";

export default class CarStage extends Component {
  setup() {
    this.state = {
      vehicle: "",
    };
  }

  template() {
    return `
        <div class="register-content">
            <div class="question-container">
                <p class="number">5/5</p>
                <p class="question">현재 차량으로 이동중이신가요?</p>
            </div>
            <div class="two-option-container">
                <div data-component="car" class="option ${
                  this.state.vehicle === "car" ? "selected" : ""
                }">
                    <img src="./img/car.png" />
                    <p>차가 있어요</p>
                </div>
                <div data-component="foot" class="option ${
                  this.state.vehicle === "foot" ? "selected" : ""
                }">
                    <img src="./img/walking.png" />
                    <p>뚜벅이에요</p>
                </div>
            </div>
            </div>
            <div class="next-button-container">
                <button data-component="next-btn" class="carting-button ${
                  this.state.vehicle !== "" ? "clicked" : "disabled"
                }" type="button">다음</button>
        </div>
        `;
  }

  mounted() {
    const carBtn = document.querySelector('[data-component="car"]');
    carBtn.onclick = () => {
      this.setState({ vehicle: "car" });
    };

    const footBtn = document.querySelector('[data-component="foot"]');
    footBtn.onclick = () => {
      this.setState({ vehicle: "foot" });
    };

    const nextBtn = document.querySelector('[data-component="next-btn"]');
    nextBtn.onclick = () => {
      this.props.proceed({ hasCar: vehicleToBoolean(this.state.vehicle) });
    };
  }
}

function vehicleToBoolean(v) {
  if (v === "car") return true;
  return false;
}
