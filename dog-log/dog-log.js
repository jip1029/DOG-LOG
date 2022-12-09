function read() {
  const txtFile = new XMLHttpRequest();
  txtFile.open("GET", "/dog-log/dog-log.txt", true);
  txtFile.onreadystatechange = function () {
    if (txtFile.readyState === 4) {
      if (txtFile.status === 200) {
        const responseArr = txtFile.responseText
          .split("http")
          .map((x) => {
            return "http" + x;
          })
          .slice(1);
        const imgArr = [];
        const img = document.getElementById("img");
        imgArr.push(img);
        const img2 = document.getElementById("img2");
        imgArr.push(img2);
        const img3 = document.getElementById("img3");
        imgArr.push(img3);
        const img4 = document.getElementById("img4");
        imgArr.push(img4);
        const img5 = document.getElementById("img5");
        imgArr.push(img5);
        let counter = 0;
        let i = 1;
        console.log(responseArr);
        while (counter < responseArr.length) {
          imgArr[counter].src = responseArr[responseArr.length - i];
          imgArr[counter].style.visibility = "visible";
          counter++;
          i++;
        }
      }
    }
  };
  txtFile.send(null);
}

function deleteFile() {
  const deleteReq = new XMLHttpRequest();
  deleteReq.open("GET", "/delete", true);
  location.href = "./";
  deleteReq.send(null);
}
