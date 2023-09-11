// 이미지 클릭 시
document.getElementById("image").addEventListener("click", function () {
    var modal = document.getElementById("modal");
    var modalText = document.getElementById("modal-text");
    modalText.innerHTML = ""; // 모달 팝업의 텍스트 설정
    modal.style.display = "block"; // 모달 팝업 보이도록 설정
  });
  
  // 모달 팝업 닫기 버튼 클릭 시
  document
    .getElementsByClassName("close")[0]
    .addEventListener("click", function () {
      document.getElementById("modal").style.display = "none"; // 모달 팝업 숨기도록 설정
    });
  
  // 모달 팝업 외부를 클릭 시
  window.addEventListener("click", function (event) {
    if (event.target == document.getElementById("modal")) {
      // 모달 팝업 바깥을 클릭한 경우
      document.getElementById("modal").style.display = "none"; // 모달 팝업 숨기도록 설정
    }
  });