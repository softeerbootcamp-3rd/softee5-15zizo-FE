import Component from "../../../core/Component.js";

export default class ConsentLocationStage extends Component{
    
    template(){
        return `
        <div class="stage-container">
            <div class="provide-location-container">
                <p>카팅에 오신걸 환영해요!</p>
                <p class="ask">제주도에 계신가요?</p>
                <p class="description">
                    carteeng에 현재 위치를 공유하고<br/>
                    주변에 있는 사람들을 확인해 보세요.<br/>
                    위치 정보를 공유하지 않으면<br/>
                    카팅 서비스를 이용할 수 없어요.
                </p>
            </div>
            <div class="circle-container">
                <img class="blur" src="./img/blur_circle.svg"/>
                <img class="inner" src="./img/inner_circle.svg"/>
                <img class="marker" src="./img/marker.svg"/>
            </div>
            <div class="next-button-container">
                <button class="carting-button clicked">허용</button>
            </div>
        </div>
        `;
    }

    mounted(){
        
    }
}