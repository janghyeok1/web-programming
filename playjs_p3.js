document.addEventListener("DOMContentLoaded", () => {
    putName();
    //이름넣기
    getNotes();
    const addImg = document.querySelector("#add_img");
    addImg.addEventListener("click", showNoteForm);
    const savenote = document.querySelector("#saveNote");
    savenote.addEventListener("click", saveNote);
    window.addEventListener("resize", winResize);
    //스케줄노트
    const dl = document.querySelectorAll(".accordion");
    dl.forEach((dl) => {
        const dt = dl.querySelectorAll("dt");
        const dd = dl.querySelectorAll("dd");
        closeAll(dt, dd);
        dt.forEach(item => {
            item.addEventListener("click", () => {
                closeAll(dt, dd);
                clickopen(item, item.nextElementSibling);
            });
        });
    });
    //information
    const slideshow = document.querySelectorAll(".slideshow");
    slideshow.forEach(item => {
        let timer = null;
        const switching = () => {
            const img = item.querySelectorAll("img");
            img[0].classList.add("alt");
            img[1].classList.remove("alt");
            item.appendChild(img[0]);
        };
        const startTimer = () => {
            if(!timer) timer = setInterval(switching, 4000);
        }
        const stopTimer = () => {
            if(timer) {
                clearInterval(timer);
                timer = null;
            }
        }
        startTimer();
        item.addEventListener("mouseover", stopTimer);
        item.addEventListener("mouseout", startTimer);
    });
    //slideshow
    const gettext1 = document.querySelector("#getText1");
    gettext1.addEventListener("click", getText1);
    const gettext2 = document.querySelector("#getText2");
    gettext2.addEventListener("click", getText2);
    //JSON_test
});
const putName = () => {
    const footer = document.querySelector("#footer");
    const date = new Date();
    const year = date.getFullYear();
    const str = `<div><strong>장혁, ${year}</strong></div>`;
    footer.insertAdjacentHTML("afterbegin", str);
};
//이름넣기
const showNoteForm = () => {
    const noteForm = document.querySelector("#note_form");
    if(!noteForm.classList.contains("popup")) {
        noteForm.classList.add("popup");
        noteForm.style.display = "block";
    }
    const winW = window.innerWidth;
    const winH = window.innerHeight;
    const objW = noteForm.offsetWidth;
    const objH = noteForm.offsetHeight;
    const left = (winW - objW) / 2;
    const top = (winH - objH) / 2;
    noteForm.style.left = `${left}px`;
    noteForm.style.top = `${top}px`;
};
//팝업열기
const closeNoteForm = () => {
    const noteForm = document.querySelector("#note_form");
    const inputs = noteForm.querySelectorAll("input, textarea");
    noteForm.style.display = "none";
    noteForm.classList.remove("popup");
    inputs.forEach(item => item.value = "");
};
//팝업닫기
const saveNote = async () => {
    const title = document.querySelector("#note_title").value;
    const date = document.querySelector("#note_date").value;
    const content = document.querySelector("#note_content").value;
    const note = {
        "title" : title,
        "date": date,
        "content": content
    };
    const res = await fetch("/saveNote", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(note)
    });
    const data = await res.json();
    closeNoteForm();
    printNote(data);
};
//서버에 스케줄노트 내용 보내고, 전체 내용 받아오기
const printNote = (data) => {
    const noteArea = document.querySelector("#note");
    noteArea.innerHTML = "";
    data.forEach(item => {
        if(!item.title) item.title = "(제목없음)";
        if(!item.date) item.date = "None";
        if(!item.content) item.content = "(내용없음)";
    let note = `
        <div>
            <strong>${item.title}</strong><br>
            <i>${item.date}</i>
            <p>${item.content}</p></br>
        </div>`;
    if(noteArea) noteArea.insertAdjacentHTML("beforeend", note);
    });
};
//스케줄노트 갱신 및 출력
const getNotes = async () => {
    const res = await fetch("/getNotes");
    const data = await res.json();
    printNote(data);
};
//스케줄노트 출력
const winResize = () => {
    const noteForm = document.querySelector("#note_form");
    if(noteForm.classList.contains("popup")) showNoteForm();
};
//윈도우 크기 변경시 팝업 크기 조정
const closeAll = (dt, dd) => {
    dt.forEach(item => item.classList.add("closed"));
    dd.forEach(item => item.classList.add("closed"));
};
//dt 전부 닫기
const clickopen = (dt, dd) => {
    dt.classList.remove("closed");
    dd.classList.remove("closed");
};
//클릭한 dt 열기
const getText1 = async () => {
    const textArea = document.querySelector("#textbox");
    textArea.innerHTML = "";
    const res = await fetch("./data/data.txt");
    const textData = await res.text();
    const data = JSON.parse(textData);
    let tableHTML = ``;
    tableHTML += data.map(item => `${item.name}<br>`).join("");
    textArea.insertAdjacentHTML("beforeend", tableHTML);
};
//JSON_test에 이름 불러오기
const getText2 = async () => {
    const textArea = document.querySelector("#textbox");
    textArea.innerHTML = "";
    const res = await fetch("./data/data.txt");
    const textData = await res.text();
    const data = JSON.parse(textData);
    let tableHTML = ``;
    tableHTML = `
        <table border="1">
            <tr>
                <th>이름</th>
                <th>아이디</th>
                <th>학과</th>
                <th>수강과목</th>
                <th>전화번호</th>
            </tr>`;
    tableHTML += data.map(item => 
        `<tr>
            <td>${item.name}</td>
            <td>${item.id}</td>
            <td>${item.department}</td>
            <td>${item.class.join(", ")}</td>
            <td>${item.phone}</td>
        </tr>`).join("");
    tableHTML += `</table>`;
    textArea.insertAdjacentHTML("beforeend", tableHTML);
};
//JSON_test에 표 불러오기