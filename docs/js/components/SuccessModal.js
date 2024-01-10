export function SuccessModal(props) {
  if (props === undefined) {
    return `
    <div class="modal modal-up success">
        <div class="success-comment-container">
            <img src="./img/success.png" />
            <p class="bold-success">이미 카팅을 성공하셨습니다!</p>
            <p>서비스를 다시 이용하고 싶다면 로그아웃 버튼을 눌러주세요.</p>
        </div>
        <div class="success-modal-button-container">
            <div class="success-modal-button blue" data-component="finish-btn">
            <p>로그아웃</p>
            </div>
        </div>
        </div>
    `;
  }
  return `
    <div class="modal modal-up success">
        <div class="success-comment-container">
            <img src="./img/success.png" />
            <p class="bold-success">${props.nickname}님과 카팅 성공</p>
            <p>픽업은 차량 소유자가 합니다.</p>
        </div>
        <div class="success-modal-button-container">
            <div class="success-modal-button" data-component="guide-btn" href="https://map.kakao.com/link/map/${props.nickname}님의 위치,${props.location.lat},${props.location.lng}">
            <img src="./img/fork_right.svg" />
            <p>경로 안내</p>
            </div>
            <div class="success-modal-button blue" data-component="finish-btn">
            <img src="./img/car_white.svg" />
            <p>탑승완료</p>
            </div>
        </div>
        </div>
    `;
}
