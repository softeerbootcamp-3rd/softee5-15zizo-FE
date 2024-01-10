export function SuccessModal2(props) {
  return `
  <div class="modal-container">
    <div class="modal modal-center success2">
    <div class="comment">
        <img src="./img/car.png" />
        <div class="comment-text">
        <p>카팅과 함께한 시간 어떠셨나요?</p>
        <p>즐거운 제주도 여행되세요!</p>
        </div>
    </div>
    <div class="button-container">
        <button class="time-button colored" type="button" data-component="reset-btn">
        서비스 계속 이용하기
        </button>
        <button class="time-button" type="button" data-component="logout-btn">서비스 종료하기</button>
    </div>
    </div>
    </div>
    `;
}
