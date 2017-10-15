/**
 * ButtonAddons: A Component that handles the input control and view button to get proper file path/name
 * A file will be validate before sending request to the server
 * File extension should be .txt or .log , else Error Box will be shown
 * @author Senthilkumar G
 */

const SITE_LOGO = './image/logo-main.en_SG.png';
const PLACE_HOLDER = '/path/to/file';
const BUTTON_STYLE = 'btn btn-danger';
const BUTTON_TEXT = 'View Logs';
const INFO_CONTENT = '  Please ensure that the log files are should be valid. For Example, It may contain relative path like URLs (http://www.conversationmarketing.com/log-files-sample/samplelog.txt) OR FILENAME (log.txt, serverlog.txt), Also you can use the same file names or URL for the demo.'

class ButtonAddons extends React.Component {
    
    constructor(props) {
	    super(props);
	    this.state = {
	    	showError: '',
	    	isToggleOn: false
	    };
	    
    }

    /*
	* handleOnKeyPress : Handles keypress event and Errors, 
	* When pressing Enter key form getting submitted
	* @param current event 
    */
    handleOnKeyPress = (e) => {
	    if (e.key === 'Enter' || e.key === ' ') {
	      const errMessage = this.props.onView(this.filePath.value);
	      this.setState({
			showError: errMessage
		  });
	    }
	}

	/*
	* handleAnswerSelected : Handles keypress event and Errors, 
	* When using OnClick form getting submitted
	* @param current event 
    */
    handleAnswerSelected = (e) => {
      const errMessage = this.props.onView(this.filePath.value);
	  this.setState({
		showError: errMessage
	  });
    }
    
    handleClick = () => {
		this.setState({
			isToggleOn: !this.state.isToggleOn
		});
	}
    /*
	* Render react component with creating DOM elements
    */
    render() {
    	const dataToggle = 'data-toggle';
    	const showErrorBox = (this.state.showError) ? React.createElement("div", {className: "alert alert-danger alert-dismissible"}, this.state.showError) : '';
        return (
        	React.createElement("div", {className: ""},
	            React.createElement("div", {className: "well", style:{backgroundColor:'#d9534f'}},
	            	React.createElement("img", {src: SITE_LOGO})
	            ),
				    showErrorBox,
				        React.createElement("div", {className: "form-group"},
				        	React.createElement("div", {className: "input-group"},
				               React.createElement("input",
				               					   {
					               					   className: "form-control",
					               					   type: "text",
					               					   placeholder: PLACE_HOLDER,
					               					   ref: (e) => this.filePath = e,
					               					   onKeyDown: this.handleOnKeyPress
				               					   }
				               	),
				               React.createElement("span", {className: "input-group-btn"},
				               		React.createElement("button", 
				               							{
				               								className: BUTTON_STYLE,
				               								type: "button",
				               								onClick: this.handleAnswerSelected,
				               								onKeyDown: this.handleOnKeyPress
				               							}, BUTTON_TEXT

				               		),
				               		React.createElement("button", 
			    					{
			    						className: "btn btn-info",
			    						onClick: this.handleClick
			    					}, React.createElement("span", {className :"glyphicon glyphicon-info-sign"})
			    					)
				               )
				            )
				        ), (this.state.isToggleOn) ? React.createElement(Info, null) : ''
			)
        );
    }
}

/*
* Info : component handles show the help information to the user
*/
class Info extends React.Component {

    render() {
        return (
           React.createElement("div", {className: "alert alert-info"},
           		React.createElement("span", {className :"glyphicon glyphicon-info-sign"}),
           		INFO_CONTENT
		   )
        );
    }
}

       