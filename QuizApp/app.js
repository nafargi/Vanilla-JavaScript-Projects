const form = document.querySelector('.quiz-form');
const questions = document.querySelectorAll('.question');
const result = document.querySelector('.result');
const correctAnswers = ['D','B','C','B','D'];

form.addEventListener('submit',(e) => {
    let score =0;
    e.preventDefault();
    userAnswers = [form.q1.value, form.q2.value, form.q3.value, form.q4.value,form.q5.value];
    userAnswers.forEach((answers,index) => {
        if(answers === correctAnswers[index]){
            score++;
            questions[index].classList.add('correct-answer');
        }else{
            questions[index].classList.add('wrong-answer');
        }
    });
     scrollTo(0,0);
     result.classList.remove('hide');
     result.firstChild.textContent = `Your score was ${score} points`;
});
