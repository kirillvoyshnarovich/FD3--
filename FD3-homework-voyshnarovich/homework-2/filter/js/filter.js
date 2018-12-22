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

    sortFilterWord: function(data) {
        var newList = null;

        sortWord = function(list) {
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

        findWord = function(list) {
            var newList = [];
            list.forEach(element => {
                if(element.word.match(regexp)){
                    newList.push(element);
                }
            })

            return newList
        }

        if(typeof(data)=='boolean') {

            if(this.state.activeField) {
                var regexp = this.state.activeField;
                newList= (data) ? findWord(sortWord(this.props.list)) : findWord(this.props.list);
            } 
            else {
                newList = (data) ? sortWord(this.props.list) : this.props.list;
            }

        } else {

            if (data=='') {

                newList = (this.state.valueCheckBox) ? sortWord(this.props.list) : this.props.list;
            } else {
                var regexp = data;

                newList = (this.state.valueCheckBox) ? findWord(sortWord(this.props.list)) : findWord(this.props.list);
            }
        }


        if(typeof(data)=='boolean') {
            this.setState({listWord:newList, valueCheckBox:data})
        } else {
            this.setState({listWord:newList, activeField:data})
        } 
    },


    changeCheckBox: function(e) {
        this.sortFilterWord(e.target.checked)
    },

    changeTextField: function(e) {
        var value = e.target.value;
        var regexp = new RegExp(`${value}`,'ig');
        this.sortFilterWord(regexp)      
    },


    render: function() {
        var listWords = this.state.listWord.map(word => React.DOM.option({key:word.key, className:"wrapper-filter__list-option"},
            word.word)
        );


        return React.DOM.div({className:"wrapper-filter"},
            React.DOM.input({type:"checkbox", className:"wrapper-filter__sort", onChange:this.changeCheckBox}),
            React.DOM.input({type:"text", className:"wrapper-filter__field-text", onChange:this.changeTextField}),
            React.DOM.select({className:"wrapper-filter__list", size:5}, listWords),
        );
    }   
});