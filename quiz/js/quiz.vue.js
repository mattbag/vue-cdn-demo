Vue.use(VeeValidate);

var checkout = new Vue({
    el: '#vue-quiz',
    data: {
        json: true,
        debugItem: 'user',
        currentStep: 1,
        currentQuiz: 0,
        loading: false,
        completed: false,
        user: {
            firstName: 'first name',
            lastName: 'last name',
            email: 'mail@mail.mail',
            type: 'store',
            partner: 'NSW Partner',
            state: 'NSW',
            branchName: 'Branch',
            brandID: 'ID000',
            password: 'password',
            password_confirm: 'password',
            terms_agreed: true,
            quiz: [
                {
                    id: 0,
                    status: 'passed',
                    // todo,locked,passed
                    // next: false,
                    // index
                    answers: []
                },
                {
                    id: 1,
                    status: 'passed',
                    // next: true,
                    answers: []
                    // answers: [1, 2, 3, 0]
                },
                {
                    id: 2,
                    status: 'todo',
                    // next: false,
                    answers: []
                    // answers: [1, 2, 3, 0]
                },
            ],

        },
        settings: {
            steps: [
                // {
                //     order: 1,
                //     name: 'Register',
                //     complete: false,
                // },
                {
                    order: 1,
                    name: 'Welcome',
                    complete: false,
                },
                {
                    order: 2,
                    name: 'Tutorial',
                    complete: false,
                },
                {
                    order: 3,
                    name: 'Quiz',
                    complete: false,
                }
            ],
            states: [
                'NSW',
                'TAS',
                'VIC',
            ],
            partners: [
                'NSW Partner',
                'TAS Partner',
                'VIC Partner',
            ],
            quiz: [
                {
                    id: 1,
                    title: 'About',
                    // link: 'View',
                    // status: 'todo',
                    checking: false,
                    done: false,
                    questionsJSON: [],
                    questions: [
                        {
                            title: 'question title 1',
                            error: false,
                            explanation: "lorem explanation ipsum",
                            options: [
                                {
                                    text: 'option 11',
                                    correct: false
                                },
                                {
                                    text: 'option 12',
                                    correct: false
                                },
                                {
                                    text: 'option 13',
                                    correct: true
                                },
                                {
                                    text: 'option 14',
                                    correct: false
                                }
                            ]
                        },
                        {
                            title: 'question title 2',
                            options: [
                                {
                                    text: 'option 21',
                                    correct: false
                                },
                                {
                                    text: 'option 22',
                                    correct: false
                                },
                                {
                                    text: 'option 23',
                                    correct: false
                                },
                                {
                                    text: 'option 24',
                                    correct: true
                                }
                            ]
                        }
                    ]
                },
                {
                    id: 2,
                    title: 'Benefits',
                    // link: 'To Do',
                    // status: 'todo',
                    checking: false,
                    done: false,
                    questionsJSON: [],
                    questions: [
                        {
                            title: 'question title2 1',
                            error: false,
                            explanation: "lorem explanation ipsum",
                            options: [
                                {
                                    text: 'option 11',
                                    correct: false
                                },
                                {
                                    text: 'option 12',
                                    correct: false
                                },
                                {
                                    text: 'option 13',
                                    correct: true
                                },
                                {
                                    text: 'option 14',
                                    correct: false
                                }
                            ]
                        },
                        {
                            title: 'question title2 2',
                            options: [
                                {
                                    text: 'option 21',
                                    correct: false
                                },
                                {
                                    text: 'option 22',
                                    correct: false
                                },
                                {
                                    text: 'option 23',
                                    correct: false
                                },
                                {
                                    text: 'option 24',
                                    correct: true
                                }
                            ]
                        }
                    ]
                },
                {
                    id: 3,
                    title: 'How to Sell',
                    // link: 'To Do',
                    // status: 'todo',
                    checking: false,
                    done: false,
                    questionsJSON: [],
                    questions: [
                        {
                            title: 'question title3 1',
                            error: false,
                            explanation: "lorem explanation ipsum",
                            options: [
                                {
                                    text: 'option 11',
                                    correct: false
                                },
                                {
                                    text: 'option 12',
                                    correct: false
                                },
                                {
                                    text: 'option 13',
                                    correct: true
                                },
                                {
                                    text: 'option 14',
                                    correct: false
                                }
                            ]
                        },
                        {
                            title: 'question title3 2',
                            options: [
                                {
                                    text: 'option 21',
                                    correct: false
                                },
                                {
                                    text: 'option 22',
                                    correct: false
                                },
                                {
                                    text: 'option 23',
                                    correct: false
                                },
                                {
                                    text: 'option 24',
                                    correct: true
                                }
                            ]
                        }
                    ]
                },
            ],

        }
    },
    methods: {
        checkQuiz: function () {
            this.settings.quiz[_.currentQuiz].checking = true;
            console.log('checking...');
        },
        setAnswer: function (what, where) {
            // console.log(what,where)
            this.user.quiz[this.currentQuiz].answers[where] = what;
            // debugger;
        },
        goStep: function (nextStep) {
            // console.log('------------------------------------');
            // console.log(nextStep);
            // console.log('------------------------------------');
            // this.settings.steps[nextStep - 2].complete = true;
            this.currentStep = nextStep;
            // debugger;
        },
        nextQuiz: function () {
            this.goStep(1);
            this.currentQuiz++;
            if (this.user.quiz[this.currentQuiz] != undefined) {
                this.user.quiz[this.currentQuiz].status = 'todo';
            } else {
                console.log('finish');
                this.completed = true;
            }
            // this.currentQuiz.status = 'todo';
        },
        checkAnswerErrors: function () {

            // console.table(options);
            var _ = this;
            this.user.quiz[_.currentQuiz].done = true;

            this.user.quiz[_.currentQuiz].answers.forEach(function (answer, aIndex) {

                var q = _.settings.quiz[_.currentQuiz].questions[aIndex];
                // debugger;
                var options = q.options;

                // console.log(options[answer].text + ' is:');

                if (options[answer].correct) {
                    // debugger
                    // console.log('correct at index: ' + answer);
                    q.error = false;
                    // _.user.quiz[_.currentQuiz].done = false;
                    // return
                } else {
                    // debugger
                    // console.log('wrong at index: ' + answer);
                    q.error = true;
                    // console.log(q.error);
                }

            });
            // check if no errors
            var qerr = _.settings.quiz[_.currentQuiz].questions.filter(function (el) {
                // debugger;
                return el.error;
            })
            // console.log(qerr)
            if (qerr.length < 1) {
                _.user.quiz[_.currentQuiz].status = 'passed';

                // _.currentQuiz++;
                // _.user.quiz[_.currentQuiz].status = 'todo';
                // _.currentQuiz.status = 'todo';
            }
        },

        quizCheck: function () {
            this.$validator.validateAll().then((result) => {
                if (result) {

                    console.log('All check -> Check errors');
                    this.checkAnswerErrors();
                    return;
                }
                console.log('Not completed');
            });
        },

        quizReset: function () {
            this.user.quiz[this.currentQuiz].answers = [];
            this.user.quiz[this.currentQuiz].done = false;
            // this.settings.quiz[_.currentQuiz].questions[_.currentQuiz].error = false;
            this.settings.quiz[this.currentQuiz].questions.forEach(function (q) {
                q.error = false;
            })
        },

        fetchQuiz: function (level) {
            var _ = this;
            fetch('./../quiz/level-' + level + '.json')
                .then(function (response) {
                    return response.json();
                })
                .then(function (quiz) {
                    // console.table(quiz);
                    debugger;
                    _.settings.quiz[level - 1].questionsJSON.push(quiz);
                }).catch(function (err) {
                    console.log(err);
                });
        },

        openQuiz: function (index, quiz) {
            // debugger;
            this.goStep(this.currentStep + 1);
            this.currentQuiz = index;
        },
        checkPassed:function(i){
            return !this.completed && this.user.quiz[i].status != 'passed'
        },
        validateBeforeSubmit: function () {
            var _ = this;
            this.$validator.validateAll().then(function (result) {
                if (result) {
                    // eslint-disable-next-line
                    console.log('Form Submitted!');
                    _.goStep(_.currentStep + 1);
                    return;
                }

                console.log('Correct them errors!');
            });
        }


    },
    created: function () {
        // console.log('created');
        // this.fetchQuiz(1);

        // ==
        // set current quix
        var _ = this;
        this.user.quiz.forEach(function(q,i){
            // debugger;
            if(q.status === 'todo'){
            _.currentQuiz = i
            }
        });
    },

    // watch:{
    //     checkAnswer: function (where) {
    //         this.user.quiz[_.currentQuiz].answers[where];
    //     }
    // },

    computed: {
       
        allAnswer: function () {
            var q = this.user.quiz[this.currentQuiz].answers;
            // console.log(this.user.quiz[_.currentQuiz].answers)

            var otherThanNull = q.filter(function (el,i) {
                // debugger;
                return el === null;
            });

            //   console.log(otherThanNull);

            // debugger;
            // console.log(nonulls.length > 0);
            // debugger;
            return q.length == this.settings.quiz[this.currentQuiz].questions.length;
        },

        debugItemComp: function () {
            if (this.debugItem) {
                return this[this.debugItem]
            }
        }

    },
    // directives: {
    //     debugg: {
    //       // directive definition
    //       bind: function (el) {
    //         el.focus()
    //       }
    //     }
    //   }
})

