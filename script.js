const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then(res => res.json())
        .then(lessonData => displayLesson(lessonData.data))
}
const displayLesson = (lesson) => {
    const lessonContainer = document.getElementById("lesson-container")
    lesson.forEach(element => {
        const div = document.createElement("div")
        div.innerHTML = `
    <button id="lesson-btn-${element.level_no}" onclick="loadPost(${element.level_no})" class="btn btn-outline btn-primary lesson-btn"><i class="fa-solid fa-book-open"></i>lesson-${element.level_no}</button>
    `
        lessonContainer.appendChild(div)

    });
    
}

const removeActive=()=>{
    const lessonBtns = document.querySelectorAll(".lesson-btn");
    lessonBtns.forEach(lessonBtn => {
        lessonBtn.classList.remove("active")
    })
}
const loadPost = (id) => {
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(postData => {
            removeActive();
            const clickBtn = document.getElementById(`lesson-btn-${id}`);
            clickBtn.classList.add("active");
            
            displayPost(postData.data)
        })
}

const displayPost = (words) => {
    const postContainer = document.getElementById("post-container");
    postContainer.innerHTML = "";
    if(words.length==0){
        postContainer.innerHTML=`
        <div id="empty-post" class="col-span-full">
                <div class="text-center space-y-4 py-32">
                    <img src="./assets/alert-error.png" alt="" class="mx-auto">
                    <p class="text-[#79716B] bangla-font">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
                    <h1 class="font-medium text-4xl bangla-font">নেক্সট Lesson এ যান</h1>
                </div>
            </div>
        `
        return;
    }
    words.forEach(element => {
        const div = document.createElement("div");
        div.innerHTML = `
    <div class="bg-[#FFFFFF]  p-12 text-center rounded-lg shadow-sm h-full ">
                    <div class="space-y-3">
                        <h1 class="font-bold text-3xl">${element.word?element.word : "কোন শব্দ পাওয়া যায় নি"}</h1>
                        <p class="font-medium text-xl">Meaning / Pronunciation</p>
                        <p class="bangla-font font-semibold text-xl">"${element.meaning?element.meaning : "কোন অর্থ পাওয়া যায় নি"} / ${element.pronunciation?element.pronunciation : "কোন উচ্চারণ পাওয়া যায় নি"}"</p>
                        <div class="flex justify-between items-center ">
                            <span class="bg-[#1A91FF10] p-4 rounded-xl"><i class="fa-solid fa-circle-info"></i></span><span class="bg-[#1A91FF10] p-4 rounded-xl"><i class="fa-solid fa-volume-high"></i></span>
                        </div>
                    </div>
                    
                </div>
    `
        postContainer.appendChild(div)
    })
}
loadLessons()