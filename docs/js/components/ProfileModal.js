import { companyToString, genderToString } from "./ProfileCard.js";

export default function ProfileModal(props) {
  const topCardData = [
    {
      icon: "./img/option_car.svg",
      key: "거리",
      value: props.distance,
      unit: "km",
    },
    {
      icon: "./img/option_age.svg",
      key: "나이",
      value: props.age,
      unit: "세",
    },
    {
      icon: "./img/option_gender.png",
      key: "성별",
      value: genderToString(props.gender),
    },
  ];
  const bottomCardData = [
    {
      icon: "./img/option_company.png",
      key: "동행여부",
      value: companyToString(props.hasCompany, props.companyInfo),
    },
  ];

  return `
  <div class="modal-container" data-component="profile-modal-background">
    <div class="modal modal-bottom profile-modal">
      <p class="chip">상대방의 정보</p>
      <div class="profile-modal-content">
        <div class="profile-modal-header">
          <div class="profile"></div>
          <p>${props.nickname}</p>
          <div class="chips">
            ${props.info
              .split(" ")
              .map((v) => `<p class="chip dark">${v}</p>`)
              .join("")}
          </div>
        </div>
        <div class="profile-modal-card-container">
          ${ProfileInfoCard({ data: topCardData })}
          ${ProfileInfoCard({ data: bottomCardData })}
        </div>
      </div>
      <button id="profile-modal-close-btn" class="carting-button close-button">닫기</button>
    </div>
  </div>`;
}

export function ProfileInfoCard(props) {
  return `<div class="profile-modal-card" ${
    props.data.length === 1 ? 'style="justify-content:center;"' : ""
  }>
    ${props.data
      .map((v) => {
        return `
      <div>
        <div>
          <img src="${v.icon}" />
          <p>${v.key}</p>
        </div>
        <div>
          <p>${v.value}</p>
          ${v.unit === undefined ? "" : `<p>${v.unit}</p>`}
        </div>
      </div>
      `;
      })
      .join("")}
</div>`;
}
