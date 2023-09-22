// 초기화 클릭 시
document.getElementById("delete").addEventListener("click", function () {
    var modal = document.getElementById("team_popup");
    var modalText = document.getElementById("popup-text");
    modalText.innerHTML = ""; // 팝업의 텍스트 설정
    modal.style.display = "block"; // 팝업 보이도록 설정
  });
  
  // 팝업 아니요 버튼 클릭 시
  document
    .getElementsByClassName("no")[0]
    .addEventListener("click", function () {
      document.getElementById("team_popup").style.display = "none"; // 팝업 숨기도록 설정
    });
  
  // 팝업 외부를 클릭 시
  window.addEventListener("click", function (event) {
    if (event.target == document.getElementById("team_popup")) {
      //  팝업 바깥을 클릭한 경우
      document.getElementById("team_popup").style.display = "none"; // 팝업 숨기도록 설정
    }
  });
