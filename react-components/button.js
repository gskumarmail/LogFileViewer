/**
 * Button: A Component that handles to create buttons for Paginate
 * A file will be validate before sending request to the server
 * File extension should be .txt or .log , else Error Box will be shown
 * @author Senthilkumar G
 */

const BUTTON_CLASS_NAME = 'btn btn-default';

class Button extends React.Component {
    render() {
        return (
            React.createElement("a", 
            						{
            							className: BUTTON_CLASS_NAME,
            							href: "#",
            							onClick: this.props.onClick,
            							disabled: this.props.disabled
            						}, this.props.text
            					)
        );
    }
}