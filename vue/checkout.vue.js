Vue.use(VeeValidate);

var checkout = new Vue({
    el: '#vue-checkout',
    data: {
        json:true,
        currentStep: 1,
        loading: false,
        user: {
            fullname: 'My Name',
            email: 'mail@mail.mail',
            password: 'password',
            password_confirm: 'password',
            terms_agreed: true,
            store: {
                store_name: 'password',
                store_country: 'italy',
                plan: {
                    interval: 'monthly',
                    type: 'digital springboard',
                },
                payment: {
                    method: 'credit card',
                    card: {
                        name: 'name on card',
                        number: '5105105105105100',
                        cvv: '666',
                        expiry_month: '12',
                        expiry_year: '22'
                    }
                },
                // total: ''
            }
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
                    name: 'Select Plan',
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
            countries: [
                'italy',
                'canada',
                'france',
            ],
            store: {
                store_name_valid: false,
                payments: [
                    {
                        method: 'credit card',
                    },
                    {
                        method: 'paypal',
                    },
                    {
                        method: 'stripe',
                    }
                ],
                plan: {
                    intervals: ['monthly', 'yearly'],
                    // intervals: [
                    //     {
                    //         label: 'monthly',
                    //         count: 1
                    //     },
                    //     {
                    //         label: 'yearly',
                    //         count: 12
                    //     }
                    // ],
                    setup: 249,
                    gst: 10,
                    types: [
                        {
                            name: 'digital springboard',
                            subtitle: 'first month free!',
                            fees: {
                                monthly: '69',
                                yearly: '62',
                            },
                            setup: '249',
                            gst: '10',
                        },
                        {
                            name: 'customize it',
                            subtitle: 'first month free!',
                            fees: {
                                monthly: '129',
                                yearly: '116',
                            },
                            setup: '249',
                            gst: '10',
                        },
                        {
                            name: 'everything',
                            subtitle: 'first month free!',
                            fees: {
                                monthly: '199',
                                yearly: '179',
                            },
                            setup: '249',
                            gst: '10',
                        }
                    ]
                },
            }
        }
    },
    methods: {
        goStep: function (nextStep) {
            // console.log('------------------------------------');
            // console.log(nextStep);
            // console.log('------------------------------------');
            this.settings.steps[nextStep - 2].complete = true;
            this.currentStep = nextStep;
            // debugger;
        },
        checkStoreName: function () {
            // debugger;
            var stores_taken = ['store','graple'];
            var _this = this;
            _this.settings.store.store_name_valid = false;
            var name_not_taken = stores_taken.indexOf(_this.user.store.store_name) < 1;

            setTimeout(function () {
                // debugger;
                if (_this.user.store.store_name.length > 2 && name_not_taken) {
                    _this.settings.store.store_name_valid = true;
                }
            }, 1000 * 3)
        },
        // checkCreditCardName: function () {
        //     // method on blur
        //     // debugger;
        //     return this.user.store.payment.card.name.length > 0 && this.user.store.payment.card.name.length < 3
        // },
        // checkCreditCardCVV: function () {
        //     // method on blur
        //     // debugger;
        //     return this.user.store.payment.card.cvv.length === 3
        // },
        resetCard() {
            this.user.store.payment.card.number = '';
            this.user.store.payment.card.cvv = '';
        },
        validateBeforeSubmit() {
            var _this = this;
            this.$validator.validateAll().then(function(result) {
                if (result) {
                    // eslint-disable-next-line
                    console.log('Form ' + _this.currentStep + ' Submitted!');
                    var next = _this.currentStep += 1;
                    // _this.settings.steps[_this.currentStep].complete = true;
                    // debugger;
                    if(next < 4){
                        // debugger;
                        _this.goStep(next);
                    }else{
                        _this.settings.steps.forEach(function(i){
                            i.complete = true;
                            i.clickable = false;
                        })
                        _this.loading = true;
                        setTimeout(function(){
                            _this.loading = false;
                            _this.goStep(4);
                            document.querySelector('[alt="logo"]').setAttribute('src', 'http://cultofthepartyparrot.com/parrots/thumbsupparrot.gif');
                        }, 4 * 1000)
                        console.log('------------------------------------');
                        console.log('last step done');
                        console.log('------------------------------------');
                    }
                    return;
                }

                // alert('Correct them errors!');
            });
            // console.log(this.$validator)
        }
    },
    computed: {

        // checkPassword: function () {
        //     return this.user.password.length > 0 && this.user.password.length < 8
        // },
        // checkPasswordConfirm: function () {
        //     if (
        //         this.user.password.length > 0
        //         && this.user.password_confirm.length > 0
        //         && this.user.password_confirm !== this.user.password
        //     ) {
        //         return false
        //     } else {
        //         return true
        //     }
        // },
        enableButton: function () {
            return true
        },
        enablePayButton: function () {
            return this.user.store.payment.card.number.length == 16 && this.user.store.payment.card.name.length >= 3
        },
        getTotal: function () {
            var interval = this.user.store.plan.interval == 'monthly' ? 1 : 12;

            var user_plan = this.user.store.plan.type;
            var type = this.settings.store.plan.types.filter(function (i) {

                return i.name == user_plan
            });

            this.user.store.total = type[0].fees[this.user.store.plan.interval] * interval;

            return this.user.store.total;
        },
        // checkCreditCard: function () {
        //     return this.user.store.payment.card.number.length > 0 && this.user.store.payment.card.number.length < 16
        // },

    }
})