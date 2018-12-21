var Filter = React.createClass({
    displayName: 'filter',

    propTypes: {
        list:React.PropTypes.arrayOf(
            React.PropTypes.shape({
                word: React.PropTypes.string.isRequired,
                key: React.PropTypes.number.isRequired,
            })
        ),
    },



    getInitialState: function() {
        return {
            valueCheckBox: false,
            activeField: false,
            listWord: this.props.list,
        };
    },



    findWord: function(el, regexp) {
        var list = [];
        el.forEach(element => {
            if(element.word.match(regexp)){
                list.push(element);
            }
        })

        if(list.legth == 0) {
            return this.props.list;
        } else {
            return list
        }
    },

    sortWord: function(list) {
        var newList = list.map(function(el){
            return(el);
        });

        newList.sort(function(a, b){
            if(a.word < b.word) { return -1; }
            if(a.word > b.word) { return 1; }
            return 0;
        });

        return newList;
    },

    sortForNumber: function(list) {
        var newList = list.map(function(el){
            return(el)
        })

        newList.sort(function(a, b){
            return a.key - b.key
        });

        return newList;

    },

    sortList: function(e) {
        var sortList ;   

        if(this.state.activeField) {
            console.log(listWord);//ПОЧЕМУ listWord ДОСТУПЕН ТАКИМ ОБРАЗОМ ТОЖЕ, должем быть доступен только через this.state.listWord?
            sortList = (e.target.checked) ? this.sortWord(this.state.listWord) : this.sortForNumber(this.state.listWord);
        } 
        else {
            sortList = (e.target.checked) ? this.sortWord(this.state.listWord) : this.props.list;

        }

        this.setState({listWord:sortList, valueCheckBox: true});
    },

    changeTextField: function(e) {
        var value = e.target.value;
        var regexp = new RegExp(`${value}`,'ig');
        var newList;
        if (value=='') {

            newList = (this.state.valueCheckBox) ? this.sortWord(this.props.list) : this.props.list;
        } else {

            newList = (this.state.valueCheckBox) ? this.findWord(this.state.listWord, regexp) : this.findWord(this.props.list, regexp);
        }

        this.setState({listWord: newList, activeField:value})
        
    },


    render: function() {
        var listWords = this.state.listWord.map(word => React.DOM.option({key:word.key, className:"wrapper-filter__list-option"},
            word.word)
        );


        return React.DOM.div({className:"wrapper-filter"},
            React.DOM.input({type:"checkbox", className:"wrapper-filter__sort", onChange:this.sortList}),
            React.DOM.input({type:"text", className:"wrapper-filter__field-text", onChange:this.changeTextField}),
            React.DOM.select({className:"wrapper-filter__list", size:5}, listWords),
        );
    }   
});