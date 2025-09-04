const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then(res=> res.json())
    .then(lessonData=> displayLesson(lessonData.data))
}
const displayLesson = (lesson)=>{
    const lessonContainer = document.getElementById("lesson-container")
   lesson.forEach(element => {
     const div = document.createElement("div")
    div.innerHTML= `
    <button class="btn btn-outline btn-primary">lesson-${element.level_no}</button>
    `
    lessonContainer.appendChild(div)
   });
}
loadLessons()

