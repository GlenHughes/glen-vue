new Vue({
    el: '#app',
    data: {
        title: 'Glen\'s Vue App',
        description: 'Messing around with Vue doing some R&D!',
        item: null,
        items: [],
        loading: false,
        alreadyExists: false
    },
    methods: {
        addItem() {
            this.checkExists();
            if (!this.alreadyExists && this.item !== null) {
                this.items.push(this.item);
            }
        },
        removeItem(item) {
            if (item) {
                let index = this.items.indexOf(item);
                if (index > -1) {
                    this.items.splice(index, 1);
                    this.checkExists();
                }
            }
        },
        checkExists() {
            this.alreadyExists = this.items.indexOf(this.item) > -1;
        }
    },
    computed: {
        hasItems() {
            return this.items.length > 0;
        }
    },
    complete: function () {

    }
});