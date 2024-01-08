import { ProfileCard } from "./ProfileCard.js";

export function ProfileCardBlue(props) {
  return `
    <div class="profile-container-backround">
        <img class="profile-arrow" src="./img/arrow.svg" />
        ${ProfileCard({ ...props, color: "blue" })}
        </div>
    </div>
    `;
}
