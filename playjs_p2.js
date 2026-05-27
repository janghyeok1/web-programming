document.addEventListener("DOMContentLoaded", () => {
    putName();
    let add_img = document.querySelector("#add_img");
    add_img.addEventListener("click", showNoteForm);

    let add_note = document.querySelector("#add_note");
    add_note.addEventListener("click", putNote);

    let getText2 = document.querySelector("#getText2");
    getText2.addEventListener("click", gettArea);

    window.addEventListener("resize", () => {
        const noteForm = document.querySelector("#note_form");
        if (noteForm && noteForm.classList.contains("popup")) changePosition(noteForm);
    });

    const btn1 = document.querySelector("#getText1");
    const tArea = document.querySelector("#textbox");
    btn1.addEventListener("click", async () => {
        const tArea = document.querySelector("#textbox");
        tArea.innerHTML = "";
        const res = await fetch("data.txt");
        const textData = await res.text();
        const data = JSON.parse(textData);
        let tableHTML = ``;
        tableHTML += data.map(student => `
                ${student.name}
        `).join(" ");
        tArea.insertAdjacentHTML('beforeend', tableHTML);
    });

    const dlList = document.querySelectorAll(".accordion");
    dlList.forEach((dl) => {
        const dtList = dl.querySelectorAll("dt");
        const ddList = dl.querySelectorAll("dd");
        closeAll(ddList, dtList);
        dtList.forEach(dt => {
            dt.addEventListener("click", () => {
                closeAll(ddList, dtList);
                clickopen(dt, dt.nextElementSibling);
            });
        });
    });

    const INTERVAL_TIME = 4000;
    const slideShows = document.querySelectorAll(".slideshow");
    slideShows.forEach(container => {
        let timer = null;
        const switching = () => {
            const imgs = container.querySelectorAll("img");
            const [first, second] = imgs;
            first.classList.add("alt");
            second.classList.remove("alt");
            container.appendChild(first);
        };
        const startTimer = () => {
            if (!timer) timer = setInterval(switching, INTERVAL_TIME);
        };
        const stopTimer = () => {
            if (timer) {
                clearInterval(timer);
                timer = null;
            }
        };
        startTimer();
        container.addEventListener("mouseover", stopTimer);
        container.addEventListener("mouseout", startTimer);
    });
});

const gettArea = async () => {
    const tArea = document.querySelector("#textbox");
    tArea.innerHTML = "";
    const res = await fetch("data.txt");
    const textData = await res.text();
    const data = JSON.parse(textData);
    let tableHTML = `
            <table border="1">
                <tr>
                    <th>이름</th>
                    <th>아이디</th>
                    <th>학과</th>
                    <th>수강과목</th>
                </tr>`;
    tableHTML += data.map(student => `
            <tr>
                <td>${student.name}</td>
                <td>${student.id}</td>
                <td>${student.department}</td>
                <td>${student.class.join(", ")}</td>
            </tr>
        `).join(" ");
    tableHTML += `</table>`;
    tArea.insertAdjacentHTML('beforeend', tableHTML);
};


const putName = () => {
    const p = document.querySelector("#footer");
    const date = new Date();
    const year = date.getFullYear();
    const str = `<div><strong>janghyeok, ${year}</strong></div>`;
    p.insertAdjacentHTML("afterbegin", str);
};

const showNoteForm = () => {
    const noteForm = document.querySelector("#note_form");
    noteForm.classList.add("popup");
    noteForm.style.display = "block";
    changePosition(noteForm);
};

const putNote = () => {
    const note_title = document.querySelector("#note_title").value;
    const note_date = document.querySelector("#note_date").value;
    const note_content = document.querySelector("#note_content").value;

    const note = `<div><strong>${note_title}</strong><br><i>${note_date}</i><br>${note_content.replace(/\n/g, `<br>`)}</div>`;
    const id_note = document.querySelector("#note");

    if (id_note) {
        id_note.insertAdjacentHTML("beforeend", note);
    }
    closeNoteForm();
};

const closeNoteForm = () => {
    const noteForm = document.querySelector("#note_form");
    const inputs = noteForm.querySelectorAll("input, textarea");
    noteForm.style.display = "none";
    noteForm.classList.remove("popup");
    inputs.forEach(input => input.value = "");
};

const changePosition = (obj) => {
    obj.classList.add("popup");
    obj.style.display = "block";
    const { innerWidth: winW, innerHeight: winH } = window;
    const { offsetWidth: objW, offsetHeight: objH } = obj;
    const left = (winW - objW) / 2;
    const top = (winH - objH) / 2;
    obj.style.top = `${top}px`;
    obj.style.left = `${left}px`;
};

const closeAll = (dd, dt) => {
    dd.forEach(d => d.classList.add("closed"));
    dt.forEach(t => t.classList.add("closed"));
};

const clickopen = (dt, dd) => {
    if (dt) dt.classList.remove("closed");
    if (dd) dd.classList.remove("closed");
};
