Vue.use(VeeValidate);

var checkout = new Vue({
    el: '#vue-checkout',
    data: {
        json: true,
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
                    answers: [1, 2, 3, 0]
                },
                {
                    id: 2,
                    status: 'locked',
                    next: false,
                    answers: [1, 2, 3, 0]
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
                    questionsJSON:[],
                    questions: [
                        {
                            title: 'question title',
                            options: [
                                {
                                    text: 'option 1',
                                    correct: false
                                },
                                {
                                    text: 'option 2',
                                    correct: false
                                },
                                {
                                    text: 'option 3',
                                    correct: false
                                },
                                {
                                    text: 'option 4',
                                    correct: true
                                }
                            ]
                        },
                        {
                            title: 'question title 2',
                            options: [
                                {
                                    text: 'option 1',
                                    correct: false
                                },
                                {
                                    text: 'option 2',
                                    correct: false
                                },
                                {
                                    text: 'option 3',
                                    correct: false
                                },
                                {
                                    text: 'option 4',
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

        quizCheck: function() {
            this.$validator.validateAll().then((result) => {
                if (result) {

                    console.log('All Checked!');
                    return;
                }
                console.log('Not completed');
            });
        },

        fetchQuiz: function (level) {
            var _ = this;
            fetch('./../quiz/level-'+ level +'.json')
                .then(function (response) {
                    return response.json();
                })
                .then(function (quiz) {
                    // console.table(quiz);
                    debugger;
                    _.settings.quiz[level -1].questionsJSON.push(quiz);
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

            return  q.length == this.settings.quiz[0].questions.length;
        },


    }
})

