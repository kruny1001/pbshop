'use strict';

angular.module('andrewkim').controller('AinfoController', ['$scope',
	function($scope) {
		// Ainfo controller logic
		// ...
        $scope.infos= [
            {
                title:'주보성인',
                content:'1821년 충남 당진군에서 신앙심이 깊은 집안에 태어난 그는 1836년, 15세 때 조선인 사제의 필요성을 느끼고 있던 프랑스 신부 모방의 눈에 띄어 신학생으로 중국 유학길에 오른다. 1844년 12월에 부제품을,이듬해 8월 상해 부근 김가항(金家港)신학교 성당에서 한국 최초의 신부로 사제 서품을 받았다. 1845년 페레올 주교와 함께 비밀리에 입국하여 서울과 지방을 순회하며 전 교활동을 펴다가 뜻하지 않게 신분이 탄로나서 체포되고, 서품받은지 겨우 1 년이 되던 해인 1846년 9월 16일 새남터에서 참수형을 당하게 된다. 뛰어난 학덕과 목숨을 바치면서까지 진리를 증거한 김대건 신부의 순교정신은 오늘날 그리스도를 따르는 우리 모두의 귀감이 되고 있다.',
                img:'modules/andrewkim/img/standrewkim.jpg'
            },

            {
                title:'성당역사'
            },
            {
                title:'역대 신부님'
            },
            {
                title: '사명록',
                content: '하느님의 은혜와 자비로 이 땅에 창립된 천주교 성 김대건 교회는 하느님을 섬기는 미네소타 지역 한인들의 공동체로서 몸과 마음을 다하여 주 예수 그리스도를 사랑하며, 말씀과 기도에 충실하고, 서로 나누고 섬기는 일치의 공동체를 이루며, 복음을 이웃에 전파하고 실천하여 하느님의 영광을 드러낼 것입니다. 또한 성 안드레아 김대건과 103위 순교 성인의 순교 정신을 본받아 후손들의 신앙교육에 힘써 이 공동체를 항구하게 이어 갈 것입니다. 1998년 9월 20일 <br>We, the parishioners of the Church of St. Andrew Kim, the Korean Catholic community in Minnesota, which was founded through the grace and mercy of God, belong to a faith community called by Jesus to love God with all our hearts and minds, to be faithful to the Words of God and life of prayer, and to be one another as a spiritual family that one in faith and love, thereby revealing the glory of God and proclaiming the Good News. Following the example of St. Andrew Kim and his companion martyrs, we will be witness to the Faith for our descendants and our community to flourish forever. September 20, 1998'
            },
            {
                title: '사목지침'
            },
            {title: '단체소개'},
            {title: '공지사항'},
            {title: '전자주보'},
            {title: '성당약도'},
            {title: '사무실 코너'}
        ];
	}
]);