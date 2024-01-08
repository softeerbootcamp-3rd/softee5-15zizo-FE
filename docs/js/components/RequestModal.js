import Component from "../core/Component.js";

export default class RequestModal extends Component {
  setup() {
    this.state = {
      tooltip: true,
    };
  }

  template() {
    return `
        <div class="modal-container clear">
        <div class="modal modal-center time">
            <div class="request-container">
            <p>요청을 보냈어요</p>
            </div>
            <div class="time-container">
            <img class="time-img" src="./img/stopwatch.png" />
            <p>${this.props.data.time}</p>
            </div>
            ${
              this.state.tooltip
                ? `
                <div class="tooltip">
                <p>카팅이 매칭되면 더 이상 취소할 수 없어요</p>
                <button data-component="x-btn" type="button">X</button>
                </div>`
                : ``
            }
            <button data-component="cancle-btn" class="time-button" type="button">요청 취소하기</button>
        </div>
        </div>
        `;
  }

  mounted() {
    const btn = document.querySelector('[data-component="x-btn"]');
    if (btn) {
      btn.onclick = () => {
        this.setState({ tooltip: false });
      };
    }

    if (!this.state.tooltip) {
      const cancleBtn = document.querySelector('[data-component="cancle-btn"]');
      cancleBtn.onclick = () => {
        console.log("cancel");
      };
    }
  }
}
