Vue.use(VeeValidate);

var checkout = new Vue({
    el: '#vue-quiz',
    data: {
        json: true,
        debug: true,
        debugItem: '',
        currentStep: 3,
        loading: false,
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
                    status: 'done',
                    next: false,
                    // index
                    answers: []
                },
                {
                    id: 1,
                    status: 'todo',
                    next: true,
                    // answers: [1, 2, 3, 0]
                },
                {
                    id: 2,
                    status: 'locked',
                    next: false,
                    // answers: [1, 2, 3, 0]
                },
            ],

        },
        settings: {
            steps: [
                {
                    order: 1,
                    name: 'Register',
                    complete: false,
                    clickable: false,
                },
                {
                    order: 2,
                    name: 'Welcome',
                    complete: false,
                    clickable: true,
                },
                {
                    order: 3,
                    name: 'Payment',
                    complete: false,
                    clickable: true,
                },
                {
                    order: 4,
                    name: 'Done!',
                    complete: false,
                    clickable: false,
                },
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
                    link: 'View',
                    status: 'todo',
                    checking: false,
                    done: false,
                    questionsJSON: [],
                    questions: [
                        {
                            title: 'question title 1',
                            error: false,
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
                    link: 'To Do',
                    status: 'todo'
                },
                {
                    id: 3,
                    title: 'How to Sell',
                    link: 'To Do',
                    status: 'todo'
                },
            ],

        }
    },
    methods: {
        checkQuiz: function () {
            this.settings.quiz[0].checking = true;
            console.log('checking...');
        },
        setAnswer: function (what, where) {
            // console.log(what,where)
            this.user.quiz[0].answers[where] = what;
            // debugger;
        },
        goStep: function (nextStep) {
            // console.log('------------------------------------');
            // console.log(nextStep);
            // console.log('------------------------------------');
            this.settings.steps[nextStep - 2].complete = true;
            this.currentStep = nextStep;
            // debugger;
        },
        checkAnswerErrors: function () {

            // console.table(options);
            var _ = this;
            this.user.quiz[0].done = true;

            this.user.quiz[0].answers.forEach(function (answer, aIndex) {

                var q = _.settings.quiz[0].questions[aIndex];
                // debugger;
                var options = q.options;

                console.log(options[answer].text + ' is:');

                if (options[answer].correct) {
                    // debugger
                    console.log('correct at index: ' + answer);
                    q.error = false;
                    // return
                } else {
                    // debugger
                    console.log('wrong at index: ' + answer);
                    q.error = true;
                    // console.log(q.error);
                }


            });
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
            this.user.quiz[0].answers = [];
            this.user.quiz[0].done = false;
            // this.settings.quiz[0].questions[0].error = false;
            this.settings.quiz[0].questions.forEach(function (q) {
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
        }


    },
    created: function () {
        // console.log('created');
        // this.fetchQuiz(1);

    },

    // watch:{
    //     checkAnswer: function (where) {
    //         this.user.quiz[0].answers[where];
    //     }
    // },

    computed: {

        allAnswer: function () {
            var q = this.user.quiz[0].answers;
            // console.log(this.user.quiz[0].answers)

            // var otherThanNull = q.filter(function (el,i) {
            //     debugger;
            //     return el === null;
            // });

            //   console.log(otherThanNull);

            // debugger;
            // console.log(nonulls.length > 0);

            return q.length == this.settings.quiz[0].questions.length;
        },

        debugItemComp:function(){
            if( this.debugItem){
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

