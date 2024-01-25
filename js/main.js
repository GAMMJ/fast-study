// header 검색창

const searchEl = document.querySelector(".search")
const searchInputEl = searchEl.querySelector("input")

searchEl.addEventListener("click", function () {
  searchInputEl.focus()
})

searchInputEl.addEventListener("focus", function () {
  searchEl.classList.add("focused")
  searchInputEl.setAttribute("placeholder", "통합검색")
})

searchInputEl.addEventListener("blur", function () {
  searchEl.classList.remove("focused")
  searchInputEl.setAttribute("placeholder", "")
})

// header badge
// lodash를 이용한 스크롤 부하방지 _.trottle(함수,시간)
// gsap을 이용한 애니메이션 gsap.to(요소, 지속시간(s), 옵션(object))
// opacity 뿐만 아니라 display로 확실히 없애기 --> opacity만 하면 눈에만 안보이지 클릭은 됨
// up button

const badgeEl = document.querySelector("header .badges")
const toTopEl = document.querySelector("#to-top")

window.addEventListener(
  "scroll",
  _.throttle(function () {
    if (window.scrollY > 500) {
      gsap.to(badgeEl, 0.6, {
        opacity: 0,
        display: "none",
      })
      gsap.to(toTopEl, 0.2, {
        x: 0,
      })
    } else {
      gsap.to(badgeEl, 0.6, {
        opacity: 1,
        display: "block",
      })
      gsap.to(toTopEl, 0.2, {
        x: 100,
      })
    }
  }, 300)
)

toTopEl.addEventListener("click", function () {
  // 페이지 위치를 최상단으로 부드럽게(0.7초 동안) 이동.
  gsap.to(window, 0.7, {
    scrollTo: 0,
  })
})
// visual fade

const fadeEls = document.querySelectorAll(".visual .fade-in")

fadeEls.forEach(function (fadeEl, index) {
  gsap.to(fadeEl, 1, {
    delay: (index + 1) * 0.7, // 그냥 .7만 하면 전체가 0.7딜레이임. index+1을 곱해줌으로써 0.7 1.4 2.1 2.8 순으로 딜레이가 걸림
    opacity: 1,
  })
})

// swiper
// new Swiper(선택자, 옵션)
// 공지사항 swiper
new Swiper(".notice-line .swiper", {
  direction: "vertical",
  autoplay: true,
  loop: true,
})

// promotion swiper

new Swiper(".promotion .swiper", {
  // direction : "horizontal" 기본값
  slidesPerView: 3, // 한번에 보여줄 슬라이드 개수
  spaceBetween: 10, // 슬라이드 사이 여백
  centeredSlides: true, // 1번 슬라이드가 가운데 보이기
  loop: true,
  autoplay: {
    // 기본값 3000ms. 객체로 delay값 수정가능
    delay: 5000,
  },
  pagination: {
    el: ".promotion .swiper-pagination", // 페이지 번호 요소 선택자
    clickable: true, // 사용자의 페이지 번호 요소 제어 가능 여부
  },
  navigation: {
    prevEl: ".promotion .swiper-prev",
    nextEl: ".promotion .swiper-next",
  },
})

// awards swiper

new Swiper(".awards .swiper", {
  autoplay: true,
  loop: true,
  spaceBetween: 30,
  slidesPerView: 5,
  navigation: {
    prevEl: ".awards .swiper-prev",
    nextEl: ".awards .swiper-next",
  },
})

// toggle-promotion 을 눌렀을때 펼쳐지는 promotion

const promotionEl = document.querySelector(".promotion")
const promotionToggleBtn = document.querySelector(".toggle-promotion")
let isHidePromotion = false // 현재 promotion이 보이는지. 다시보이게 될때 true로 바꾸기위한 let사용

promotionToggleBtn.addEventListener("click", function () {
  isHidePromotion = !isHidePromotion // ture값과 false값을 바꿔주기위함
  if (isHidePromotion) {
    promotionEl.classList.add("hide")
  } else {
    promotionEl.classList.remove("hide")
  }
})

// youtube 영상위 떠다니는 아이콘

// 범위 랜덤 함수(소수점 2자리까지). 이걸 이용해서 아이콘을 다 다르게 애니메이션 넣기
function random(min, max) {
  // `.toFixed()`를 통해 반환된 문자 데이터를,
  // `parseFloat()`을 통해 소수점을 가지는 숫자 데이터로 변환
  return parseFloat((Math.random() * (max - min) + min).toFixed(2))
}

function floatingObject(selector, delay, size) {
  gsap.to(selector, random(1.5, 2.5), {
    y: size,
    repeat: -1, // 무한반복
    yoyo: true, // 다시 뒤로 재생
    //gsap easing
    ease: "power1.inOut",
    delay: random(0, delay),
  })
}

floatingObject(".floating1", 1, 15)
floatingObject(".floating2", 0.5, 15)
floatingObject(".floating3", 1.5, 20)

// scroll magic

const spyEls = document.querySelectorAll("section.scroll-spy")
spyEls.forEach(function (spyEl) {
  new ScrollMagic.Scene({
    triggerElement: spyEl, // 보여짐 여부를 감시할 요소를 지정
    triggerHook: 0.8, // viewport 맨위가 0 맨아래가 1인데 0.8지점에 훅이 걸림
  })
    .setClassToggle(spyEl, "show") // 토글할요소, 클래스이름
    .addTo(new ScrollMagic.Controller()) // 우리가 추가한 옵션들을 내부의 컨트롤러에 내용을 할당해 실제로 동작할수 있는 구조를 만듬
})

// footer 날짜 계산

const thisYear = document.querySelector(".this-year")
thisYear.textContent = new Date().getFullYear()
