class PersonalTest {
    constructor(target) {                                                                        //이 안에 각 mbti별로 추천해주는 여행지 목록 써줘.(this.travel = {} 형식으로)
        this.container = document.querySelector(target); // 추후 dom 내용을 바꾸기 위한 선택자
        this.page = 0; // 0: intro, 1: test, 2: result 현재 페이지
        this.progress = 0; // 현재 질문 단계
        this.questions = {
            IE: [{ question: '나는 혼자서 여가를 즐기는 시간이 많다', answer: { a:'그렇다', b: '아니다'} }],
            SN: [{ question: '나는 끊임 없이 생각하는 것을 즐긴다', answer: { a: '그렇다', b: '아니다' } }],
            TF: [{ question: '누군가 나를 싫어하는 걸 알았을 때.', answer: { a: '그래 모두가 날 좋아 할 순 없지', b: '마음의 상처' } }],
            JP: [{ question: '나는 방 청소를 열심히 한다.', answer: { a: '그렇다', b: '아니다' } }],
        }; // 질문 모음
        this.results = []; // 사용자가 선택한 답모음
        this.resultInfors = {
            ISTJ: {title:"태국 코큿", desc: "혼자 노는 걸 좋아한다.<br />개인적이다.<br />돈관리를 잘한다.<br />계획형인간이다.<br />원리원칙을 중요시한다.<br />사람 얼굴, 이름을 잘 기억하지 못한다.<br />남에게 관심 없다.<br />몇몇 물건에 집착한다.<br />이성적인데 감정석이다.<br />무신경하다는 소리를 듣는다."},
            ISFJ: {title:"스페인 바르셀로나", desc: "원칙주의자다.<br />남 눈치 많이 본다.<br />외로움을 많이 타지만 사람들이랑 있는 거 싫어한다.<br />게으른 완벽주의자다.<br />배려심이 많고 공감 잘해준다.<br />아니면 아니고 말면 말자는 마인드<br />속으로 온갖 생각을 많이 한다.<br />겸손하고 칭찬 많이 해준다.<br />성격이 온화하다.<br />계획 세우는 것을 좋아한다."},
            INTJ: {title:"스위스 루체른", desc: "계획이 여행의 전부<br />도시와 자연이 가장 조화로이 공존<br />현대와 중세가 동시에 존재<br />여행은 당신의 계획을 증명하는 시간<br />이제 남은 것은 실행뿐"},
            INFJ: {title:"영국 요크", desc: "너의 행복은 나의 행복.<br />이타주의자.<br />겉으로 웃고 속으로 욕한다.<br />무엇을 듣고 싶은지까지 신경쓰는 당신.<br />시끌벅적 소란스러운 것 싫어.<br />아무 계획도 없는 주말이 가장 행복.<br />"},
            ISTP: {title:"캐나다 알버타", desc: "만사가 귀찮다.<br />오로지 본인에게만 관심이 있다.<br />낯가림이 심하다.<br />자기자랑하는 꼴을 못본다.<br />자기가 제일 잘난줄 안다.<br />호율적인 거 좋아한다.<br />위계질서를 싫어한다.<br />공감능력이 없다.<br />관찰력이 뛰어나다.<br />관종이다."},
            ISFP: {title:"아이슬란드 레이캬비크", desc: "만사가 귀찮다.<br />행동이 느리다.<br />일을 미룰 수 있을 때까지 다 미룬다.<br />집에 가면 연락이 안된다.<br />약속 취소되면 기뻐한다.<br />다이어리 끝까지 못쓴다.<br />갈등, 불화를 싫어한다.<br />조용한 관종이다.<br />사람 만나는거 좋은데 싫다.<br />고집, 자존심이 강하다."},
            INFP: {title:"그리스 산토리니", desc: "말을 너무 쉽게 믿지 말자.<br />게으른 완벽주의자다.<br />뭔가를 하면 시간이 오래 걸린다.<br />여행을 계획할 때 나는 안가라며 초치는 타입.<br />집중이 초기에는 불타지만 금방 식는다.<br />조직생활에서 낯가림이 있다.<br />호불호가 명확하다.<br />남을 잘 믿지 않는다.<br />남의 가치관에 관심 없고 잘 인정해준다.<br />의지하는 것을 싫어힌다."},
            INTP: {title:"캄보디아 앙코르와트", desc:  "알아 두면 쓸데없고 번거로운 잡학박사.<br />모든 일정에 효율성을 따진다.<br />비판적인 태도인데 딱히 계획이 있는 건 아니다.<br />여행지에 대한 방대한 지식을 가지고 있지만 대체로 필요없다."},
            ESFP: {title:"미국 뉴욕", desc: "굉장히 급하다.<br />우주최강오지라퍼다.<br />아무리 걱정이 되도 시간 지나면 잊어버린다.<br />미래의 나에게 맡기는 경우가 많다.<br />지루함을 굉장히 많이 느낀다.<br />침묵을 싫어한다.<br />평화를 사랑한다.<br />사교성이 엄청나다.<br />자존감이 높다.<br />하고싶다고 생각이 들면 무조건 해야 한다."},
            ESTP: {title:"대한민국 제주", desc: "하고 싶은 건 반드시 해야한다.<br />그렇다고 어떤 계획이 있는 건 또 아니다.<br />느낌 따라 여행한다.<br />오늘따라 센치한 기분이라 카페 가야돼 등의 기분파"},
            ENFP: {title:"아프리카 케나 나이로비", desc: "정신산만하다.<br />잡생각이 많다.<br />낯을 좀 가리지만 금방 풀린다.<br />무언가에 쉽게 몰두하고 쉽게 관둔다.<br />거짓말 잘 못한다.<br />외향적이지만 자신만의 시간도 필요하다.<br />남들의 말에 반응을 잘해준다.<br />일 크게 만드는 것을 싫어한다.<br />위로보단 극복 방법을 제시한다.<br />얘기하는 것을 사랑한다."},
            ENTP: {title:"프랑스 파리", desc: "혼자 다니는게 제일 편하다.<br />독립심이 강하다.<br />의견이 다르면 설득하려 한다.<br />나에게 중간은 없다.<br />무식한 사람 이해할 수 없다.<br />계획은 짜지만 잘 안지킴.<br />과정보다 결과를 중요시한다.<br />반복적인 일을 싫어한다.<br />토론, 논쟁할 떄 내 의견으로 끝나야 속이 시원하다.<br />직설적이다."},
            ESTJ: {title:"일본 도쿄", desc: "고집이 강하다<br />이성적이다.br />외로움을 잘 안탄다.<br />내 시간을 방해 받는 것을 싫어한다.<br />공김능력이 없다.<br />한 목표를 세우면 끝까지 간다.<br />누가 잘못했네 잘했네를 따진다.<br />딱딱 떨어지는게 좋다.<br />싸우는 거 싫지만 지긴 싫다.<br />일처리 못하는 거를 싫어한다."},
            ESFJ: {title:"이탈리아 로마", desc: "굉장히 철저하다.<br />책,영화를 좋아한다.<br />술자리를 좋아한다.<br />남 눈치를 많이 본다.<br />상담, 고민 들어주는 거를 잘한다.<br />내 주변 인물들 다 챙긴다.<br />지인들이 불행하면 나도 불행함을 느낀다.<br />어색한 분위기를 참지 못한다.<br />계획을 세우고 틀어지는 것을 싫어한다.<br />다른 사람들의 생각에 맞춰준다."},
            ENFJ: {title:"스위스 그린델발트", desc: "시끄럽다.<br />핵인싸가 되고 싶다.<br />사람들을 이끄는 기질이 있다.<br />단순하다.<br />멘탈이 강하다.<br />약간 마이웨이 기질이 있다.<br />내 스스로를 잘 안다.<br />남 눈치를 잘본다.<br />흥미가 많아서 꿈이 많다.<br />객관적이고 직관적이다."},
            ENTJ: {title:"페루 마추픽추", desc: "시원찮은 팀원을 만나면 답답함을 느끼고 총대를 맨다.<br />굉장히 활동적이다.<br />열등감을 느낀적이 극히 드물다.<br />감정적 공감이 안된다.<br />지인의 고민에는 해결책을 찾아준다.<br />누군가 뭐 못하면 답답하고 이해를 못한다.<br />자기애가 강하다.<br />인생 사는게 쉽다.<br />냉철해지면 끝도 없이 냉철해짐<br />남이 이래라 저래라 하는 꼴을 못본다."},
        }
        this.init();
    }   

    //이 부분은 각 메서드 구현해둔 공간임 -> 여기에 메서드 작성하시오.

    init() { //각 버튼 실행 구현(초기화)
        this.questionArray = this.getQuestion(); 

        const answerAButton = this.container.querySelector('button[data-answer="a"]');
        const answerBButton = this.container.querySelector('button[data-answer="b"]');
        const startButton = this.container.querySelector('button[data-action="start"]');
        

        answerAButton.addEventListener('click', () => this.submitAnswer(answerAButton.innerText)); //answerAButton - a에 대한 클릭 이벤트가 발생할 때 submitAnswer함수 호출
        answerBButton.addEventListener('click', () => this.submitAnswer(answerBButton.innerText));
        startButton.addEventListener('click', this.start.bind(this)); // bind(this)는 이벤트 핸들러 내에서 'this'를 현재 인스턴스로 유지
    
        this.render(); // 초기 상태 렌더링
    }

    start() {
        if(this.progress !== 0) return; 

        this.page = 1;   //start가 실행되면 페이지는 1로 넘어가고 render함수 실행
        this.render();
    }

    

    getQuestion() {  //질문반환
        return Object.entries(this.questions)
        .flatMap(([type, questions]) => questions.map(question => ({ ...question, type })));

      
    }

    getCurrentQuestions() { //현재 프로그레스의 질문 반환
        const currentQuestionIndex = this.progress;
        return this.questionArray[currentQuestionIndex];

       
    }

    submitAnswer(answer) { //사용자가 답변을 제출시 반환되는 메서드 + 결과를 저장하고 페이지를 업데이트 합니다.
        const currentQuestion = this.questionArray[this.progress];

        if (this.questionArray.length <= this.progress + 1) {
            this.page = 2;
            this.render();
        }

        const selectedAnswer = Object.keys(currentQuestion.answer)
        .find(selectedAnswer => currentQuestion.answer[selectedAnswer] === answer);

        this.results.push({
            type: currentQuestion.type,
            answer: selectedAnswer
        });

        this.progress++;
        this.render();

        return this.getCurrentQuestions();

     
    }

    calcResult() {   // 사용자의 답변을 기반으로 mbti결과 계산하는 방법을 가진 메서드
        const totalResult = Object.keys(this.questions).reduce((acc, cur) => {
            acc[cur] = this.results
                .filter(result => result.type === cur)
                .reduce((acc, cur) => {
                acc[cur.answer] = acc[cur.answer] ? acc[cur.answer] + 1 : 1;
                return acc;
            }, {});
            return acc;
        }, {});
        
        return this.createPersonalResult(totalResult);
        
    }

    createPersonalResult(totalResult) {  // 전체 답변을 기반으로 MBTI성향 결과를 반환함. 
        return Object.keys(totalResult).reduce((acc, cur) => {
            const result = totalResult[cur];
            
            if (!result.a) return acc + cur[1];
            if (!result.b) return acc + cur[0];
        
            if (result.a === result.b) {
                return acc + cur[0];
            }
            
            return acc + (result.a > result.b ? cur[0] : cur[1]);
        }, "");
       
    
    }

    render() {   //intro - 첫 시작페이지 test - 질문 나오는 페이지 result - 어떤 mbti인지 나오는 페이지
        const introContainer = this.container.querySelector('.intro_container');
        const testContainer = this.container.querySelector('.test_container');
        const resultContainer = this.container.querySelector('.result_container');

        if (this.page === 0) {
            introContainer.classList.add('active');
            testContainer.classList.remove('active');
            resultContainer.classList.remove('active');

        } else if (this.page === 1) {                                 
            testContainer.classList.add('active');  
            introContainer.classList.remove('active');
            resultContainer.classList.remove('active');

            const progressElement = this.container.querySelector('.progress');
            const questionElement = this.container.querySelector('.question');
            const answerAElement = this.container.querySelector('button[data-answer="a"]');
            const answerBElement = this.container.querySelector('button[data-answer="b"]');
        
            progressElement.textContent = `Q${this.progress + 1}. `;
            questionElement.textContent = this.getCurrentQuestions().question;
            answerAElement.textContent = this.getCurrentQuestions().answer.a;
            answerBElement.textContent = this.getCurrentQuestions().answer.b;

        } else if (this.page === 2) {
            const resultContainer = this.container.querySelector('.result_container');
            resultContainer.classList.add('active');
            introContainer.classList.remove('active');
            testContainer.classList.remove('active');
        
            const resultTextElement = this.container.querySelector('.result_text');
            const resultInforTitleElement = this.container.querySelector('.result_infor_title');
            const resultInforElement = this.container.querySelector('.result_infor');
            const calcResult = this.calcResult();
    
            const resultImagePath = `./src/${calcResult.toLowerCase()}.jpeg`;
    
            resultContainer.style.backgroundImage = `url('${resultImagePath}')`;
            
            resultTextElement.innerHTML = `당신의 MBTI는 <span class="point_text">${calcResult}</span>입니다.`;
            resultInforTitleElement.innerHTML = `[ ${this.resultInfors[calcResult].title} ]`;
        
            resultInforElement.innerHTML = this.resultInfors[calcResult].desc
            .split('<br />')
            .map(el => `<li>${el}</li>`)
            .join('');
        }
        
    }
}