// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement("script")

tag.src = "https://www.youtube.com/iframe_api"
var firstScriptTag = document.getElementsByTagName("script")[0]
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
function onYouTubeIframeAPIReady() {
  // <div id="player"></div>
  new YT.Player("player", {
    videoId: "An6LvWQuj_8", // 최초 재생할 유튜브 영샹 ID
    playerVars: {
      // player variable. 각종 변수를 객체로 선언
      autoplay: true, // 자동재생
      loop: true, // 반복재생. 단 true면 밑에 반복재생할 유튜브 id를 목록으로 제공해야됨
      playlist: "An6LvWQuj_8",
    },
    events: {
      onReady: function (event) {
        event.target.mute() // 음소거. onready 즉 영상이 준비되면 함수가 실행됨
      },
    },
  })
}

// 단순 소스코드 복붙은 js로 제어가 안됨(소리,반복재생 등)
// 그래서 유튜브 id값을 이용해 js로 제어하는것
