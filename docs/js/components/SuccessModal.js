export function SuccessModal(props) {
  return `
    <div class="modal modal-up success">
        <div class="success-comment-container">
            <img src="./img/success.png" />
            <p class="bold-success">${props.name}님과 카팅 성공</p>
            <p>픽업은 차량 소유자가 합니다.</p>
        </div>
        <div class="success-modal-button-container">
            <div class="success-modal-button">
            <img src="./img/fork_right.svg" />
            <p>경로 안내</p>
            </div>
            <div class="success-modal-button blue">
            <img src="./img/car_white.svg" />
            <p>탑승완료</p>
            </div>
        </div>
        </div>
    `;
}
