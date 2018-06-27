Vue.use(VeeValidate);

var checkout = new Vue({
    el: '#vue-portal',
    data: {
        json: false,
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
        },
        settings: {
            steps: [
                {
                    order: 1,
                    name: 'Register',
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
          

        }
    },

    methods: {
       
       
       
        validateBeforeSubmit: function () {
            var _ = this;
            this.$validator.validateAll().then(function (result) {
                if (result) {
                    // eslint-disable-next-line
                    console.log('Form Submitted!');
                        location.href= location.href.replace('index','quiz');
                    return;
                }

                console.log('Correct them errors!');
            });
        }


    },
    created: function () {
        console.log('check user log status');
    },

    // watch:{
    //     checkAnswer: function (where) {
    //         this.user.quiz[_.currentQuiz].answers[where];
    //     }
    // },

    computed: {
       
       

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

