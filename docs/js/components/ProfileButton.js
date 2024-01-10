export function ProfileButton(props) {
  return `
        <div class="compact-profile fade-in" data-component="open-modal" data-order-id=${props.id}>
            <div class="compact-profil-img"></div>
                <p>${props.nickname}님의 프로필</p>
            <img class="arrow-right" src="./img/arrow_right.svg" />
        </div>
    `;
}
