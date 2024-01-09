export function ProfileCard(props) {
  return `
          <div class="profile-container" data-component="open-modal" data-order-id="${
            props.id
          }">
              <div class="profile-info">
                  <div class="profile-img-container"></div>
                  <div class="name">${props.nickname}</div>
                  <div class="profile-button-container">
                  <button data-component="carting-request" data-order-id="${
                    props.id
                  }" class="profile-button ${
    props.color === "blue" ? "blue" : ""
  }">카팅하기</button>
                  </div>
              </div>
              <div class="profile-line"></div>
              <div class="profile-option-list">
                  <div class="profile-option">
                  <div class="option-title">
                      <img class="option-img" src="./img/option_car.svg" />
                      <p>거리</p>
                  </div>
                  <div class="option-data">
                      <p class="data">${props.distance}</p>
                      <p class="unit">km</p>
                  </div>
                  </div>
                  <div class="profile-option">
                  <div class="option-title">
                      <img class="option-img" src="./img/option_age.svg" />
                      <p>나이</p>
                  </div>
                  <div class="option-data">
                      <p class="data">${props.age}</p>
                      <p class="unit">세</p>
                  </div>
                  </div>
                  <div class="profile-option">
                  <div class="option-title">
                      <img class="option-img" src="./img/option_company.svg" />
                      <p>동행여부</p>
                  </div>
                  <div class="option-data">
                      <p class="data">${companyToString(
                        props.hasCompany,
                        props.companyInfo
                      )}</p>
                  </div>
                  </div>
                  <div class="profile-option">
                  <div class="option-title">
                      <img class="option-img" src="./img/option_gender.png" />
                      <p>성별</p>
                  </div>
                  <div class="option-data">
                      <p class="data">${genderToString(props.gender)}</p>
                  </div>
                  </div>
              </div>
          </div>
      `;
}

export function companyToString(c, cs) {
  if (c) return cs;
  return "없음";
}

export function genderToString(g) {
  if (g === "FEMALE") return "여성";
  return "남성";
}
