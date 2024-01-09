import { ProfileCard } from "./ProfileCard.js";

export function ProfileList(props) {
  return `
        <div class="modal-container" data-component="profile-list-modal-background">
        <div class="modal modal-bottom profile-list-modal">
            <div class="home-indicator"></div>
            <div class="profile-list-container">
                <div class="profile-title">
                    <p>근처 카팅인 모아보기</p>
                </div>
                <div class="profile-list">
                ${props.orders
                  .map((order) => {
                    return ProfileCard(order);
                  })
                  .join("")}
                </div>
            </div>
        </div>
        </div>
        `;
}
