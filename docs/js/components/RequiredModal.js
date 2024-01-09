import { ProfileButton } from "./ProfileButton.js";

export function RequiredModal(props) {
  return `
    <div class="modal-container clear">
    <div class="modal modal-center required">
        <div class="request-text">
        <div class="request-container">
            <p>요청이 왔어요</p>
        </div>
        <p>${props.name}님에게 요청이 왔어요!<br />프로필을 살펴보세요</p>
        </div>
        <div class="required-inner-container">
        <div class="time-container row">
            <img class="time-img" src="./img/stopwatch.png" />
            <p>23</p>
        </div>
        ${ProfileButton(props)}
        </div>
        <div style="width: 100%">
        <button class="time-button colored" type="button">수락</button>
        <button class="time-button" type="button">거절</button>
        </div>
    </div>
    </div>`;
}
